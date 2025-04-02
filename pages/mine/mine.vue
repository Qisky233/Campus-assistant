<template>
  <div class="container">
    <!-- 头部：背景栏、头像和用户名 -->
    <div class="header">
      <img src="/static/images/mine/avatar.jpg" class="avatar" alt="avatar" />
      <div class="user-info">
        <div class="username">{{ userInfo.xm }}</div>
        <div class="tag">未实名认证</div>
      </div>
      <div class="homepage-button" @click="navigateToDetail">
        个人信息
        <img src="/static/images/mine/arrow-right_write.png" class="arrow" alt="arrow" />
      </div>
    </div>

    <!-- 功能选项列表 -->
    <div class="menu">
      <div class="menu-item" @click="goToCourse">
        <img src="/static/images/mine/课表.png" class="icon" alt="course" />
        <div class="menu-text">我的课表</div>
        <img src="/static/images/mine/arrow-right.png" class="arrow" alt="arrow" />
      </div>
      <div class="menu-item" @click="goToScore">
        <img src="/static/images/mine/成绩.png" class="icon" alt="score" />
        <div class="menu-text">学期成绩</div>
        <img src="/static/images/mine/arrow-right.png" class="arrow" alt="arrow" />
      </div>
      <div class="menu-item" @click="goToElctric">
        <img src="/static/images/mine/电表.png" class="icon" alt="electricity" />
        <div class="menu-text">查电费</div>
        <img src="/static/images/mine/arrow-right.png" class="arrow" alt="arrow" />
      </div>
    </div>

    <!-- 未登录时显示登录按钮 -->
    <div v-if="!isLoggedIn" class="login-container">
      <button @click="goToLogin" class="login-button">登录</button>
    </div>

    <!-- 已登录时显示退出登录按钮 -->
    <div v-else class="logout-container">
      <button @click="logout" class="logout-button">退出登录</button>
    </div>
	<!-- <div class="logout-container">
      <div>{{ jsessionid }}</div>
    </div>
    <div class="logout-container">
      <div>{{ tgt }}</div>
    </div>
    <div class="logout-container">
      <div>{{ ticket }}</div>
    </div> -->
  </div>
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
  created() {
    this.checkLoginStatus();
  },
  methods: {
    ...mapActions(['fetchUserInfo']),
    
    checkLoginStatus() {
      if (this.isLoggedIn) {
        this.fetchUserInfo();
      }
    },
    
    navigateToDetail() {
      uni.navigateTo({
        url: '/pages/mine/detail/detail'
      });
    },
    
    goToCourse() {
      uni.navigateTo({
        url: '/pages/mine/course/course'
      });
    },
    
    goToScore() {
      uni.navigateTo({
        url: '/pages/mine/score/score'
      });
    },
    
    goToElctric() {
      uni.navigateTo({
        url: '/pages/mine/electric/electric'
      });
    },
    
    goToLogin() {
      uni.navigateTo({
        url: '/pages/login/login'
      });
    },
    
    logout() {
      this.$store.commit('clearAuth');
      // 如果需要清除本地存储
      uni.removeStorageSync('jsessionid');
      uni.removeStorageSync('tgt');
      uni.removeStorageSync('ticket');
    }
  }
};
</script>

<style lang="less">
.container {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 0 20px;
}

/* 头部样式 */
.header {
  background-color: #0099ff; /* 浅蓝色背景 */
  padding: 16px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 153, 255, 0.3); /* 阴影效果 */
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid #fff;
}

.user-info {
  margin-left: 15px;
  flex: 1;
}

.username {
  font-size: 18px;
  color: #fff;
  display: block;
}

.tag {
  background-color: #ffcc00; /* 黄色标签 */
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 10px;
  color: #fff;
  margin-top: 5px;
  display: inline-block;
}

.homepage-button {
  color: #fff; /* 白色文字 */
  font-size: 13px;
  text-decoration: none; /* 去掉下划线 */
  cursor: pointer; /* 鼠标指针样式 */
  margin-left: auto; /* 靠右对齐 */
}

/* 功能选项样式 */
.menu {
  background-color: #fff;
  margin-top: 20px;
  padding: 0 15px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* 阴影效果 */
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.menu-item:last-child {
  border-bottom: none;
}

.icon {
  width: 24px;
  height: 24px;
  margin: 0 10px;
}

.menu-text {
  font-size: 16px;
  color: #333;
  flex: 1;
}

.arrow {
  width: 13px;
  height: 13px;
}

/* 登录按钮样式 */
.login-container {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}

.login-button {
  width: 220px;
  background-color: #0099ff; /* 浅蓝色背景 */
  color: #fff; /* 白色文字 */
  font-size: 16px;
  padding: 3px 24px;
  border-radius: 15px; /* 圆角按钮 */
  border: none;
  box-shadow: 0 4px 10px rgba(0, 153, 255, 0.3); /* 阴影效果 */
  transition: background-color 0.3s ease; /* 过渡效果 */
}

.login-button:active {
  background-color: #0066cc; /* 按钮按下时的背景色 */
}

/* 退出登录按钮样式 */
.logout-container {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}

.logout-button {
  width: 220px;
  background-color: #ff4d4f; /* 浅蓝色背景 */
  color: #fff; /* 白色文字 */
  font-size: 16px;
  padding: 3px 24px;
  border-radius: 15px; /* 圆角按钮 */
  border: none;
  box-shadow: 0 4px 10px rgba(255, 77, 79, 0.3); /* 阴影效果 */
  transition: background-color 0.3s ease; /* 过渡效果 */
}

.logout-button:active {
  background-color: #cc3335; /* 按钮按下时的背景色 */
}
</style>