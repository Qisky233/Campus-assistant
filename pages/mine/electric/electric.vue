<template>
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
    </view>
    
    <view class="form-group">
      <text class="label">宿舍号：</text>
      <input 
        type="text" 
        placeholder="请输入宿舍号" 
        @input="dormitoryInput"
        class="input" />
    </view>
    
    <view class="form-group">
      <text class="label">校验码：</text>
      <view class="captcha-box">
        <input 
          type="text" 
          placeholder="输入验证码" 
          class="captcha-input"
          @input="captchaInput" />
        <image 
          :src="captchaUrl" 
          class="captcha-img"
          @tap="refreshCaptcha" />
      </view>
    </view>
    
    <button 
      type="primary" 
      @tap="handleQuery"
      class="submit-btn"
      :loading="loading">查询</button>
  </view>
</template>

<script>
import iconv from 'iconv-lite';

export default {
  data() {
    return {
      buildingList: ['男生1号楼', '男生2号楼', '男生3号楼', '女生1号楼', '女生2号楼', '女生3号楼', '女生4号楼', '女生5号楼'],
      buildingIndex: 0,
      dormitory: '',
      captcha: '',
      captchaUrl: '', // 初始验证码图片链接为空，通过请求动态获取
      loading: false,
      jsessionid: '', // 用于存储 JSESSIONID
    };
  },
  methods: {
    buildingChange(e) {
      this.buildingIndex = e.detail.value;
    },
    dormitoryInput(e) {
      this.dormitory = e.detail.value;
    },
    captchaInput(e) {
      this.captcha = e.detail.value;
    },
    async refreshCaptcha() {
      try {
        this.loading = true; // 显示加载状态
        const res = await uni.request({
          url: 'https://e-loc.hnuu.edu.cn/image.jsp',
          method: 'GET',
          responseType: 'arraybuffer'
        });

        if (res.statusCode === 200) {
          const base64 = uni.arrayBufferToBase64(res.data);
          this.captchaUrl = `data:image/jpeg;base64,${base64}`;

          // 获取 JSESSIONID
          const cookies = res.header['Set-Cookie'];
          if (cookies) {
            const cookieArray = cookies.split(';');
            for (let cookie of cookieArray) {
              const [key, value] = cookie.split('=');
              if (key.trim() === 'JSESSIONID') {
                this.jsessionid = value.trim();
                break;
              }
            }
          }
        } else {
          throw new Error('验证码加载失败');
        }
      } catch (error) {
        console.error('请求验证码时出错:', error);
        uni.showToast({
          title: '验证码加载失败，请检查网络或链接',
          icon: 'none'
        });
        this.refreshCaptcha(); // 自动重试刷新验证码
      } finally {
        this.loading = false; // 隐藏加载状态
      }
    },
    async handleQuery() {
      const buildingCode = this.getBuildingCode(this.buildingList[this.buildingIndex]);
      const queryUrl = `https://proxy-login.aluo18.top/electric?ly=${buildingCode}&ss=${this.dormitory}&rand=${this.captcha}&jsessionid=${this.jsessionid}`;

      try {
        this.loading = true; // 显示加载状态
        const res = await uni.request({
          url: queryUrl,
          method: 'GET',
          header: {
            'Cookie': `JSESSIONID=${this.jsessionid}`,
            'Content-Type': 'application/json'
          }
        });

        if (res.statusCode === 200) {
          const result = res.data;
          if (result.dormitory === '未找到' || result.remainingElectricity === '未找到') {
            uni.showModal({
              title: '查询结果',
              content: '宿舍不存在或验证码错误，请重新输入',
              showCancel: false
            });
          } else {
            uni.showModal({
              title: '查询结果',
              content: `宿舍号：${result.dormitory}\n剩余电费：${result.remainingElectricity}`,
              showCancel: false
            });
          }
        } else {
          throw new Error('查询失败');
        }
      } catch (error) {
        console.error('查询时出错:', error);
        uni.showToast({
          title: '查询失败，请检查网络或链接',
          icon: 'none'
        });
      } finally {
        this.loading = false; // 隐藏加载状态
        this.clearForm(); // 清空表单
      }
    },
    getBuildingCode(buildingName) {
      const buildingMap = {
        '男生1号楼': '1-01',
        '男生2号楼': '2-01',
        '男生3号楼': '3-01',
        '女生1号楼': '4-01',
        '女生2号楼': '5-01',
        '女生3号楼': '6-01',
        '女生4号楼': '7-01',
        '女生5号楼': '8-01'
      };
      return buildingMap[buildingName];
    },
    clearForm() {
      this.dormitory = '';
      this.captcha = '';
      this.captchaUrl = '';
      this.refreshCaptcha(); // 刷新验证码
    }
  },
  mounted() {
    this.refreshCaptcha(); // 页面加载时自动获取验证码
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