<template>
  <view class="content">
    <view class="table-header">
      <view class="header-cell">时间</view>
      <view class="header-cell">周一</view>
      <view class="header-cell">周二</view>
      <view class="header-cell">周三</view>
      <view class="header-cell">周四</view>
      <view class="header-cell">周五</view>
      <view class="header-cell">周六</view>
      <view class="header-cell">周日</view>
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
        <block v-for="(row, rowIndex) in tableData" :key="rowIndex">
          <block v-if="rowIndex > 0">
            <block v-for="(cell, colIndex) in row" :key="colIndex">
              <block v-if="colIndex > 0 && cell">
                <view class="course-block" :style="{ top: `${(rowIndex - 1) * 180}rpx`, height: '180rpx', left: `${(colIndex - 1) * 12.5}%`, width: '12.5%' }">
                  {{ cell }}
                  <text class="course-location">{{ cell.split(' ')[1] }}</text>
                </view>
              </block>
            </block>
          </block>
        </block>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      tableData: []
    };
  },
  computed: {
    ...mapState(['jsessionid'])
  },
  methods: {
    ...mapActions(['fetchUserInfo']),
    async fetchCourseData() {
      if (!this.jsessionid) {
            console.error("未获取到 JSESSIONID");
			//	uni.showToast({
      		// 	title: '请先登录',
      		// 	icon: 'none',
      		// 	duration: 2000 // 提示显示的时长（毫秒）
      		// });
      
      		// // 使用 setTimeout 来延迟跳转
      		// setTimeout(() => {
      		// 	// 提示关闭后跳转到登录页面
      		// 	uni.navigateTo({
      		// 		url: '/pages/login/login' // 假设登录页面路径为 pages/login/login
      		// 	});
      		// }, 2000); // 延迟时间与提示框的 duration 保持一致
      		return;
          }

      try {
        const response = await uni.request({
          url: `https://proxy-login.aluo18.top/cource?rxnj=2023&bjmc=23级计算机应用技术1&jsessionid=${this.jsessionid}`,
          method: "GET"
        });

        if (response.statusCode === 200) {
          this.tableData = response.data.table_data;
        } else {
          throw new Error(`请求失败，状态码: ${response.statusCode}`);
        }
      } catch (err) {
        console.error("请求失败:", err);
        uni.showToast({
          title: '获取课程表失败，请检查网络或链接是否正确',
          icon: 'none'
        });
      }
    }
  },
  created() {
	  if (!this.jsessionid) {
	    console.error("未获取到 JSESSIONID");
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
  mounted() {
    this.fetchCourseData();
  }
};
</script>
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
  color: #333;
    font-size: 22rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.1);
  overflow: hidden;
  
  .course-text {
	  white-space: nowrap;
	  overflow: hidden;
	  text-overflow: ellipsis;
	  display: block;
  }
  
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