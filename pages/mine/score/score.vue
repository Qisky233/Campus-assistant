<template>
  <view class="container">
    <view class="header">
     <view class="message">
		 <view class="subtitle" >姓名: {{ userInfo.xm }}</view>
		  <view class="subtitle">学号: {{ userInfo.yhxh }}</view>
		 <view class="subtitle">学院:{{ userInfo.yxb }}</view>
		  <view class="subtitle">班级:{{ userInfo.bjmc }}</view>
     </view>
	 <image class="avatar" src="/static/images/mine/avatar.jpg" mode="aspectFill"/>
    </view>
    <view v-for="(semesterData, index) in score" :key="index" class="semester">
	  <text class="semester-title">{{ semesterData.semester }}</text>
	  <view class="table">
		<view class="table-row">
		  <view class="table-cell">课程</view>
		  <view class="table-cell">类型</view>
		  <view class="table-cell">学分</view>
		  <view class="table-cell">成绩</view>
		</view>
		<view
		  v-for="(item, gradeIndex) in semesterData.data"
		  :key="gradeIndex"
		  class="table-row"
		>
		  <view class="table-cell">{{ item['课程/环节'] }}</view>
		  <view class="table-cell">{{ item['类别'] }}</view>
		  <view class="table-cell">{{ item['学分'] }}</view>
		  <view class="table-cell">{{ item['综合成绩'] }}</view>
		</view>
	  </view>
	</view>
	</view>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
	computed: {
    ...mapGetters([
      'isLoggedIn',
      'getJsessionid',
      'getUserInfo',
	  'getTgt',
	  'getTicket'
    ]),
    jsessionid() {
      return this.getJsessionid;
    },
    userInfo() {
      return this.getUserInfo;
    },
	tgt() {
		return this.getTgt;
	},
	ticket() {
		return this.getTicket
	}
  },
  data() {
    return {
      score: []
    };
  },
  created() {
	  this.getScore()
	  if(this.userInfo.xm == '未登录') {
		  uni.showToast({
		  	title: '请先登录',
		  	icon: 'none',
		  	duration: 2000 // 提示显示的时长（毫秒）
		  });
		    
		  // 使用 setTimeout 来延迟跳转
		  setTimeout(() => {
		  	// 提示关闭后跳转到登录页面
		  	uni.navigateTo({
		  		url: '/pages/login/login' // 假设登录页面路径为 pages/login/login
		  	});
		  }, 2000); // 延迟时间与提示框的 duration 保持一致
		  return;
	  }
  },
  methods: {
	  getScore() {
		if (!this.isLoggedIn) {
			console.error('用户未登录');
			return;
		}
		if (!this.userInfo || !this.userInfo.rxnj) {
			console.error('用户信息不完整');
			return;
		}
		uni.request({
			url: `https://proxy-login.aluo18.top/score?jsessionid=${this.jsessionid}&rxnj=${this.userInfo.rxnj}`,
			method: 'GET',
			success: (res) => {
				if (res.statusCode === 200) {
					this.score = res.data;
					console.log('成绩获取成功', this.score);
				} else {
					console.error('请求失败，状态码：', res.statusCode);
				}
			},
			fail: (err) => {
				console.error('请求失败', err);
			}
		});
	}
  }
}
</script>

<style lang="less">
.container {
   padding: 24rpx 0; 
    margin: 0;
    background: #D3E7FF;
    min-height: 100vh;
}
.header {
  background: linear-gradient(135deg, #8BCBFF 0%, #B8E3FF 100%);
  margin: 0 32rpx;
  padding: 24rpx;
  border-radius:16rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.08);
  display: flex;
}
.message{
	width: 60%;
}
.avatar{
	width: 200rpx;
	height: 240rpx;
	border-radius: 16rpx;
	// flex: 1;
	margin-left: 20rpx;
	// border:1px solid #000000
	
}
.header-content {
  display: flex;
  align-items: center;
  margin-bottom: 24rpx;
}

.subtitle {
  font-size: 30rpx;
  color: #2D3742;
  font-weight: 500;
}

.buttons {
  display: flex;
  gap: 20rpx;
  justify-content: flex-end;
}

.button {
  padding: 12rpx 32rpx;
  border-radius: 48rpx;
  background: rgba(255,255,255,0.9);
  border: 2rpx solid #D3E7FF; 
  font-size: 26rpx;
  color: #3A8BFF; 
  box-shadow: 0 4rpx 12rpx rgba(58,139,255,0.15);
}

.semester {
  background: white;
  border-radius: 24rpx;
  margin: 32rpx;
  padding: 24rpx;
  box-shadow: 0 4rpx 24rpx rgba(0,0,0,0.04);
  position: relative;
  overflow: visible; 
  // 左侧半圆缺口
  &::before {
    content: '';
    position: absolute;
    left: -24rpx;
    top: 10%;
    width: 48rpx;
    height: 48rpx;
    background:#D3E7FF; 
    border-radius: 0 24rpx 24rpx 0;
    transform: translateY(-10%);
    box-shadow: 4rpx 0 8rpx rgba(0,0,0,0.06); 
  }
  // 右侧半圆缺口
  &::after {
    content: '';
    position: absolute;
    right: -24rpx;
    top: 10%;
    width: 48rpx;
    height: 48rpx;
    background:#D3E7FF;
    border-radius: 24rpx 0 0 24rpx;
    transform: translateY(-10%);
    box-shadow: -4rpx 0 8rpx rgba(0,0,0,0.06);
  }
}

.semester-title {
  color: #1A2942;
  font-size: 32rpx;
  font-weight: 600;
  margin-bottom: 24rpx;
  letter-spacing: 2rpx; 
  display: block;
  text-align: center;
}
.table {
  border: 1rpx solid #F0F4F7;
  border-radius: 16rpx;
  overflow: hidden;
  position: relative;  // 新增定位基准
  
  // 移除原生虚线边框
  border-top: none;
  
  // 自定义圆点虚线（顶部）
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3rpx;  // 虚线高度
    background-image: linear-gradient(
      to right,
      #485868 20%,  // 圆点颜色及显示比例
      transparent 30%  // 透明间隔占70%
    );
    background-size: 10rpx 1rpx;  // 控制圆点间距（10rpx为间隔宽度）
    background-repeat: repeat-x;
    z-index: 1;
  }
}

.table-row {
  display: flex;
  height: 88rpx;
  align-items: center;
  background: white;
   // border-top: 1rpx dashed  #000000;
  
  &.table-header {
    background: #F8FBFF; 
    border-bottom: 4rpx solid #E7F3FF;
  }
}

.table-cell {
  flex: 1;
  font-size: 28rpx;
  color: #485868;
  padding: 0 8rpx;
  
  &:nth-child(1) { flex: 1.5; }
  &:nth-child(4) { 
    font-weight: 500;
    color: #2D3742;
  }
}
</style>
