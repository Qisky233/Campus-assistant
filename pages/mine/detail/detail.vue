<template>
 <view class="container">
   <!-- 头部信息 -->
   <view class="header">
     <image class="avatar" src="/static/images/mine/avatar.jpg" mode="aspectFill"/>
     <view class="user-info">
	   <text class="name">{{ userInfo.xm }}</text><br />
       <!-- <text class="meta">{{ userInfo.age }}岁</text><br /> -->
       <text class="meta">{{ userInfo.yxb }}</text><br />
       <text class="meta" style="margin-right: 20rpx;">{{ userInfo.bjmc }}</text>
     </view>
     <icon type="camera" size="20" class="camera"/>
   </view>
   <!-- 双列信息布局 -->
   <view class="info-grid">
     <view class="info-item">
       <text class="label">学号</text>
       <view class="value-group">
         <text>{{ userInfo.yhxh }}</text>
         <!-- <image src="/icons/lock.svg" class="lock-icon"/> -->
       </view>
     </view>
     
     <view class="info-item">
       <text class="label">入学日期</text>
       <text class="value">{{ userInfo.bdtime }}</text>	
     </view>
 
   </view>
   <view class="info-item">
     <text class="label">地址</text>
     <text>{{ userInfo.txdz }}</text>
   </view>
 </view>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		data() {
			return {
				
			};
		},
		computed: {
			...mapState(['userInfo']) // 将 store 中的 userInfo 映射为组件的计算属性
		},
	}
</script>

<style lang="less">
.container {
  background: #FAFAFA;
  padding: 24rpx;
  background: #FAFAFA;
  height: 100vh;
}
.header {
  display: flex;
  align-items: center;
  background: #FFF;
  padding: 32rpx;
  border-radius: 16rpx;
  margin-bottom: 32rpx;
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.05);
}

.avatar {
 width: 200rpx;
 height: 240rpx;
  border-radius: 16rpx;
}

.user-info {
  flex: 1;
  margin-left: 32rpx;
}

.name {
  font-size: 36rpx;
  font-weight: 500;
  display: block;
  color: #333;
}

.meta {
  color: #999;
  font-size: 28rpx;
  margin-top: 8rpx;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24rpx;
}

.info-item {
  background: #FFF;
  padding: 32rpx;
  border-radius: 16rpx;
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.05);
  margin-bottom: 20rpx;
}

.label {
  color: #666;
  font-size: 28rpx;
  display: block;
  margin-bottom: 16rpx;
}

.value {
  color: #333;
  font-size: 30rpx;
  font-weight: 500;
}

.value-group {
  display: flex;
  align-items: center;
}

.lock-icon {
  width: 28rpx;
  height: 28rpx;
  margin-left: 16rpx;
  opacity: 0.6;
}
</style>
