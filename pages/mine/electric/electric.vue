<template>
	<view>
		<view class="container">
		  <view class="header">
		    <text>学生宿舍电费查询</text>
		  </view>
		  
		  <view class="form-group">
		    <text class="label">楼寓</text>
			    <picker 
			      :range="buildingList" 
			      :value="buildingIndex" 
			      @change="buildingChange"
			      class="picker">
			      <view class="picker-text">
			        {{ buildingList[buildingIndex] }}
			      </view>
			    </picker>
		      <view class="picker-text">
		      </view>
		    </picker>
		  </view>
		
		  <view class="form-group">
		    <text class="label">宿舍号：</text>
		    <input 
		      type="text" 
		      placeholder="请输入宿舍号" 
		      bindinput="dormitoryInput"
		      class="input" />
		  </view>
		
		  <view class="form-group">
		    <text class="label">校验码：</text>
		    <view class="captcha-box">
		      <input 
		        type="text" 
		        placeholder="输入验证码" 
		        class="captcha-input"
		        bindinput="captchaInput" />
		      <image 
		        src="/images/captcha.png" 
		        class="captcha-img"
		        bindtap="refreshCaptcha" />
		    </view>
		  </view>
		
		  <button 
		    type="primary" 
		    bindtap="handleQuery"
		    class="submit-btn">查询</button>
		</view>
	</view>
</template>

<script>
export default {
  data() {
    return {
      buildingList: ['男生1号楼', '男生2号楼', '女生3号楼'],
      buildingIndex: 0,
      dormitory: '',
      captcha: '',
      captchaUrl: '/images/captcha.png?t=' + Date.now(), 
      loading: false
    };
  },
  methods: {
    // 楼栋选择事件
    buildingChange(e) {
      this.setData({
        buildingIndex: e.detail.value
      });
    },

    // 宿舍号输入事件
    dormitoryInput(e) {
      this.setData({
        dormitory: e.detail.value.replace(/[^\dA-Za-z]/g, '') // 过滤非法字符
      });
    },

    // 验证码输入事件
    captchaInput(e) {
      this.setData({
        captcha: e.detail.value.toUpperCase() // 自动转大写
      });
    },

    // 刷新验证码
    refreshCaptcha() {
      this.setData({
        captchaUrl: `/images/captcha.png?t=${Date.now()}` // 加时间戳防止缓存
      });
    },

    // 提交查询
    async handleQuery() {
      // 防抖处理
      if (this.loading) return;
      this.setData({ loading: true });
      
      // 表单验证
      if (!this.validateForm()) {
        this.setData({ loading: false });
        return;
      }
   // 调用接口逻辑
      try {
        const res = await this.request('/api/query', {
          building: this.data.buildingList[this.data.buildingIndex],
          dormitory: this.data.dormitory,
          captcha: this.data.captcha
        });
        if (res.code === 200) {
          wx.navigateTo({
            url: `/pages/result/result?balance=${res.data.balance}`
          });
        } else {
          this.showError(res.msg);
          this.refreshCaptcha(); 
        }
      } catch (err) {
        this.showError('网络异常，请稍后重试');
      } finally {
        this.setData({ loading: false });
      }
    },

    // 表单验证
    validateForm() {
      if (!this.data.dormitory) {
        this.showError('请输入宿舍号');
        return false;
      }
      if (!/^\d{3,4}$/.test(this.data.dormitory)) {
        this.showError('宿舍号需为3-4位数字');
        return false;
      }
      if (!this.data.captcha) {
        this.showError('请输入验证码');
        return false;
      }
      return true;
    },

    // 封装请求方法
    request(url, data) {
      return new Promise((resolve, reject) => {
        wx.request({
          url: `https://yourdomain.com${url}`,
          method: 'POST',
          data,
          header: {
            'Content-Type': 'application/json'
          },
          success: (res) => {
            if (res.statusCode === 200) {
              resolve(res.data);
            } else {
              reject(res);
            }
          },
          fail: reject
        });
      });
    },

    // 错误提示
    showError(msg) {
      wx.showToast({
        title: msg,
        icon: 'none',
        duration: 2000
      });
    }
  },
  
  // 生命周期
  onLoad() {
    this.refreshCaptcha(); // 初始化验证码
  }
};
</script>

<style lang="less">
.container {
  padding: 20rpx;
  background-color: #f4f4f9;
  min-height: 100vh;
  box-sizing: border-box;
}

.header {
  text-align: center;
  font-size: 36rpx;
  color: #333;
  padding: 40rpx 0;
}

.form-group {
  margin-bottom: 30rpx;
  background: #fff;
  padding: 20rpx;
  border-radius: 12rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05);
}

.label {
  display: block;
  font-size: 28rpx;
  color: #555;
  margin-bottom: 15rpx;
}

.picker {
  width: 100%;
  height: 80rpx;
  line-height: 80rpx;
  background: #f8f8f8;
  border-radius: 8rpx;
  padding: 0 20rpx;
}

.picker-text {
  color: #333;
}

.input {
  width: 100%;
  height: 80rpx;
  background: #f8f8f8;
  border-radius: 8rpx;
  padding: 0 20rpx;
  font-size: 28rpx;
}

.captcha-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.captcha-input {
  width: 60%;
  height: 80rpx;
  background: #f8f8f8;
  border-radius: 8rpx;
  padding: 0 20rpx;
}

.captcha-img {
  width: 200rpx;
  height: 80rpx;
  border-radius: 8rpx;
}

.submit-btn {
  margin-top: 60rpx;
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  font-size: 32rpx;
  background: #5c6bc0;
  color: white;
  border-radius: 44rpx;
}

.submit-btn:active {
  background: #3f51b5;
}
</style>
