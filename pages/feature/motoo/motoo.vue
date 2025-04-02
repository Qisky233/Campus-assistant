<template>
  <view class="hitokoto-container">
    <!-- 主展示区 -->
    <view class="hitokoto-card" @click="refreshHitokoto">
      <view class="hitokoto-content">
        <text class="hitokoto-text" :class="{ 'animate-text': isRefreshing }">{{ displayText }}</text>
      </view>
      <view class="hitokoto-footer">
        <text class="hitokoto-from" v-if="hitokoto.from">{{ hitokoto.from }}</text>
        <text class="hitokoto-author" v-if="hitokoto.from_who">—— {{ hitokoto.from_who }}</text>
      </view>
    </view>
    
    <!-- 刷新按钮 -->
    <view class="refresh-btn" @click="refreshHitokoto">
      <text class="refresh-icon">🔄</text>
      <text class="refresh-text">换一句</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      hitokoto: {},
      displayText: '加载中...',
      isRefreshing: false,
      apiUrls: [
        "https://v1.hitokoto.cn/",
        "https://v1.hitokoto.cn/?c=b",
        "https://v1.hitokoto.cn/?c=f",
        "https://v1.hitokoto.cn/?c=d",
        "https://v1.hitokoto.cn/?c=k"
      ]
    }
  },
  created() {
    this.fetchHitokoto();
  },
  methods: {
    async fetchHitokoto() {
      this.isRefreshing = true;
      this.displayText = '加载中...';
      
      // 尝试所有API接口
      for (let i = 0; i < this.apiUrls.length; i++) {
        try {
          const res = await this.tryApi(this.apiUrls[i]);
          if (res && res.hitokoto) {
            this.hitokoto = res;
            this.animateDisplay(res.hitokoto);
            return;
          }
        } catch (e) {
          console.log(`API ${i} 请求失败:`, e);
        }
      }
      
      // 所有API都失败
      this.displayText = '获取一言失败，点击重试';
      this.isRefreshing = false;
    },
    
    tryApi(url) {
      return new Promise((resolve, reject) => {
        uni.request({
          url: url,
          success: (res) => {
            if (res.statusCode === 200 && res.data && res.data.hitokoto) {
              resolve(res.data);
            } else {
              reject(new Error('无效响应'));
            }
          },
          fail: reject
        });
      });
    },
    
    animateDisplay(text) {
      let index = 0;
      const speed = 50; // 打字速度(ms)
      this.displayText = '';
      
      const timer = setInterval(() => {
        if (index < text.length) {
          this.displayText += text.charAt(index);
          index++;
        } else {
          clearInterval(timer);
          this.isRefreshing = false;
        }
      }, speed);
    },
    
    refreshHitokoto() {
      if (!this.isRefreshing) {
        this.fetchHitokoto();
      }
    }
  }
}
</script>

<style>
.hitokoto-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40rpx;
}

.hitokoto-card {
  width: 90%;
  min-height: 300rpx;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  border-radius: 24rpx;
  padding: 40rpx;
  box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
  position: relative;
  overflow: hidden;
}

.hitokoto-card::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  transform: rotate(30deg);
}

.hitokoto-content {
  margin-bottom: 30rpx;
}

.hitokoto-text {
  font-size: 36rpx;
  line-height: 1.6;
  font-weight: 500;
  text-shadow: 0 2rpx 4rpx rgba(0,0,0,0.2);
}

.animate-text {
  border-right: 2rpx solid white;
  /* animation: blink 0.7s infinite; */
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.hitokoto-footer {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.hitokoto-from {
  font-size: 26rpx;
  opacity: 0.8;
  margin-bottom: 10rpx;
}

.hitokoto-author {
  font-size: 28rpx;
  font-style: italic;
}

.refresh-btn {
  margin-top: 40rpx;
  padding: 20rpx 40rpx;
  background-color: #fff;
  border-radius: 50rpx;
  display: flex;
  align-items: center;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.1);
}

.refresh-icon {
  font-size: 36rpx;
  margin-right: 10rpx;
}

.refresh-text {
  font-size: 28rpx;
  color: #6e8efb;
  font-weight: 500;
}
</style>