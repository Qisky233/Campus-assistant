<template>
  <view class="content">
    <view class="table-header">
      <view class="header-cell">时间</view>
      <view class="header-cell">周一<br>03-10</view>
      <view class="header-cell">周二<br>03-11</view>
      <view class="header-cell">周三<br>03-12</view>
      <view class="header-cell">周四<br>03-13</view>
      <view class="header-cell">周五<br>03-14</view>
      <view class="header-cell">周六<br>03-15</view>
      <view class="header-cell">周日<br>03-16</view>
    </view>
    <view class="time-container">
      <view class="time-column">
        <view class="time-slot">08:00<br>08:40</view>
        <view class="time-slot">08:50<br>09:30</view>
        <view class="time-slot">09:40<br>10:20</view>
        <view class="time-slot">10:30<br>11:10</view>
        <view class="time-slot">11:20<br>12:00</view>
        <view class="time-slot">14:30<br>15:10</view>
        <view class="time-slot">15:20<br>16:00</view>
        <view class="time-slot">16:10<br>16:50</view>
        <view class="time-slot">17:00<br>17:40</view>
        <view class="time-slot">17:50<br>18:30</view>
        <view class="time-slot">19:00<br>17:40</view>
        <view class="time-slot">19:50<br>20:30</view>
      </view>
      <view class="course-container">
        <view class="course-block course-1" 
              style="top: 0; height: 180rpx;">
          无线网络传感技术
          <text class="course-location">E0306</text>
        </view>
		<view class="course-block course-4"
		      style="top: 0; left:12.5%;height: 180rpx;">
		  无线网络传感技术
		  <text class="course-location">E0306</text>
		</view>
		<view class="course-block course-3"
		      style="top: 180rpx; height: 180rpx;">
		  无线网络传感技术
		  <text class="course-location">E0306</text>
		</view>
      </view>
	  
    </view>
  </view>
</template>

<style lang="less">
.content {
  padding: 20rpx;
  position: relative;
}
.table-header {
  display: flex;
  background: #f8f8f8;
  border-radius: 8rpx 8rpx 0 0;
  
  .header-cell {
    flex: 1;
    text-align: center;
    padding: 24rpx 0;
    font-size: 28rpx;
    color: #333;
    border-right: 1rpx solid #eee;
    
    &:last-child {
      border-right: none;
    }
  }
}
.time-container {
  display: flex;
  position: relative;
}
.time-column {
  width: 12.5%;
  
  .time-slot {
    height: 50rpx;
    padding: 20rpx;
    font-size: 24rpx;
    color: #666;
    background: #f8f8f8;
    border-bottom: 1rpx solid #eee;
  }
}
.course-container {
  flex: 1;
  position: relative;
  border-left: 1rpx solid #eee;
}
.course-block {
  position: absolute;
  width: 12.5%;
  border-radius: 2rpx;
  color: white;
    font-size: 22rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.1);
  
  .course-location {
    display: block;
    font-size: 22rpx;
    margin-top: 8rpx;
    opacity: 0.9;
  }
}
.course-1 { background: #FFB6C1; }
.course-2 { background: #98FB98; }
.course-3 { background: #87CEEB; }
.course-4 { background: #FFA07A; }
.course-5 { background: #DDA0DD; }
.course-6 { background: #20B2AA; }
</style>