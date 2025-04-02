<template>
  <view class="login-container">
    <view class="form-container">
      <view class="input-wrapper">
        <text class="input-label">学号</text>
        <input
          class="input-field"
          type="text"
          placeholder="请输入学号"
          v-model="studentId"
        />
      </view>
      <view class="input-wrapper">
        <text class="input-label">密码</text>
        <input
          class="input-field"
          type="password"
          placeholder="请输入密码"
          v-model="password"
        />
      </view>
      <view class="captcha-wrapper">
        <text class="input-label">验证码</text>
        <view class="captcha-container">
          <input
            class="captcha-input"
            type="text"
            placeholder="请输入验证码"
            v-model="captcha"
          />
          <image
            class="captcha-image"
            :src="captchaImage"
            @click="refreshCaptcha"
            mode="aspectFit"
          />
        </view>
      </view>
      <button class="login-button" @click="onLogin">登录</button>
    </view>
  </view>
</template>

<script>
import { encryptedString, key } from './RSA.js'
export default {
  data() {
    return {
      studentId: '202380310106',
      password: 'yyj2005.',
      captcha: '',
      captchaImage: '',
      captchaUid: ''
    }
  },
  created() {
    this.getCaptcha()
  },
  methods: {
    // 获取验证码
    async getCaptcha() {
      const timestamp = Date.now();
      try {
        const res = await uni.request({
          url: 'https://cas.hnuu.edu.cn/lyuapServer/kaptcha',
          method: 'GET',
          data: { _t: timestamp }
        });
        
        // uni.request返回的是数组 [err, res]
        if (res && res.data) {
          const { content, uid } = res.data;
          this.captchaImage = content;
          this.captchaUid = uid;
		  console.log(res.data)
        } else {
          uni.showToast({
            title: '获取验证码失败',
            icon: 'none'
          });
        }
      } catch (error) {
        uni.showToast({
          title: '网络错误，请重试',
          icon: 'none'
        });
        console.error('获取验证码失败:', error);
      }
    },
    
    // 刷新验证码
    refreshCaptcha() {
      this.getCaptcha();
    },
	
	// RSA 加密密码
	encryptPassword(password) {
	  try {
		// 调用 RSA 模块的加密方法
		return encryptedString(key, password)
	  } catch (e) {
		console.error('密码加密失败:', e)
		return password // 加密失败返回明文（实际项目应该处理失败情况）
	  }
	},
		
	async onLogin() {
	  // 第一步：表单验证
	  if (!this.studentId || !this.password || !this.captcha) {
	    return uni.showToast({ title: '请填写完整信息', icon: 'none' });
	  }
	
	  try {
	    uni.showLoading({ title: '登录中...' });
	    console.log('开始登录流程...');
	
	    // ==================== 第一步：获取TGT和Ticket ====================
	    console.log('正在获取TGT和Ticket...');
	    const authRes = await new Promise((resolve, reject) => {
	      uni.request({
	        url: 'https://cas.hnuu.edu.cn/lyuapServer/v1/tickets',
	        method: 'POST',
	        data: {
	          username: this.studentId,
	          password: this.encryptPassword(this.password),
	          service: 'http://jwgl.hnuu.edu.cn/hnlhdxjw/caslogin',
	          loginType: '',
	          id: this.captchaUid,
	          code: this.captcha
	        },
	        header: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	        },
	        success: (res) => {
	          console.log('认证响应:', res);
	          resolve(res);
	        },
	        fail: (err) => {
	          console.error('认证请求失败:', err);
	          reject(err);
	        }
	      });
	    });
	
	    // 检查认证响应状态
	    if (!authRes.statusCode || authRes.statusCode !== 200) {
	      const errorMsg = authRes.data?.message || '获取认证票据失败';
	      console.error('认证失败:', errorMsg);
	      throw new Error(errorMsg);
	    }
	
	    if (!authRes.data || !authRes.data.tgt || !authRes.data.ticket) {
	      console.error('响应数据不完整:', authRes.data);
	      throw new Error('获取的票据数据不完整');
	    }
	
	    const { tgt, ticket } = authRes.data;
	    console.log('获取到TGT和Ticket:', { tgt, ticket: ticket.substring(0, 10) + '...' });
	
	    // 保存认证信息到Vuex
	    this.$store.dispatch('updateTgt', tgt);
	    this.$store.dispatch('updateTicket', ticket);
	
	    // ==================== 第二步：获取JSESSIONID ====================
	    console.log('正在获取JSESSIONID...');
	    const proxyUrl = `https://proxy-login.aluo18.top/get_jsessionid?url=http://jwgl.hnuu.edu.cn/hnlhdxjw/caslogin?ticket=${ticket}`;
	    console.log('请求代理接口URL:', proxyUrl);
	
	    const proxyResponse = await new Promise((resolve, reject) => {
	      uni.request({
	        url: proxyUrl,
	        method: 'GET',
	        success: resolve,
	        fail: reject
	      });
	    });
	
	    console.log('代理接口响应:', proxyResponse);
	
	    // 检查代理接口响应状态
	    if (!proxyResponse.statusCode || proxyResponse.statusCode !== 200) {
	      const errorMsg = proxyResponse.data?.message || '获取JSESSIONID失败';
	      console.error('代理接口请求失败:', errorMsg);
	      throw new Error(errorMsg);
	    }
	
	    // 提取JSESSIONID
	    const jsessionId = proxyResponse.data?.JSESSIONID;
	    if (!jsessionId) {
	      console.error('代理接口响应数据不完整:', proxyResponse.data);
	      throw new Error('获取JSESSIONID失败');
	    }
	
	    console.log('获取到JSESSIONID:', jsessionId.substring(0, 10) + '...');
	    this.$store.dispatch('updateJsessionid', jsessionId);
	
	    // 验证登录是否成功
	    // 这里可以根据实际需求决定是否还需要验证教务系统页面内容
	    // 如果代理接口返回了有效的JSESSIONID，可以认为登录成功
	
	    // 登录成功，跳转到首页
	    console.log('登录流程完成，跳转到首页');
	    uni.reLaunch({ url: '/pages/mine/mine' });
	
	  } catch (error) {
	    console.error('登录错误:', error);
	    uni.showToast({
	      title: error.message || '登录失败',
	      icon: 'none',
	      duration: 3000
	    });
	    this.refreshCaptcha();
	  } finally {
	    uni.hideLoading();
	  }
	}
  }
}
</script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
}
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
}
.input-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
}
.input-label {
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
}
.input-field {
  width: 100%;
  height: 40px;
  padding: 0 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  box-sizing: border-box;
}
.captcha-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
}
.captcha-container {
  display: flex;
  align-items: center;
  gap: 10px;
}
.captcha-input {
  flex: 1;
  height: 40px;
  padding: 0 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  box-sizing: border-box;
}
.captcha-image {
  width: 88px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: #f8f8f8;
  cursor: pointer;
}
.login-button {
  width: 100%;
  height: 40px;
  background-color: #0099ff;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 153, 255, 0.3);
  cursor: pointer;
}
.login-button:active {
  background-color: #0077cc;
}
</style>