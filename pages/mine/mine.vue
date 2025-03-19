<template>
  <div class="container">
    <!-- 头部：背景栏、头像和用户名 -->
    <div class="header">
      <img src="/static/images/mine/avatar.jpg" class="avatar" alt="avatar" />
      <div class="user-info">
        <div class="username">{{ xm }}</div>
        <div class="tag">未实名认证</div>
      </div>
      <div class="homepage-button" @click="navigateToDetail">
        个人信息
        <img src="/static/images/mine/arrow-right（write）.png" class="arrow" alt="arrow" />
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
    <div v-if="!jsessionid" class="login-container">
      <button @click="goToLogin" class="login-button">登录</button>
    </div>

    <!-- 已登录时显示退出登录按钮 -->
    <div v-else class="logout-container">
      <button @click="logout" class="logout-button">退出登录</button>
    </div>
    <div class="logout-container">
      <div>{{ jsessionid }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      xm: "未登录", // 用户名，默认值为“未登录”
      jsessionid: "", // 用于存储 jsessionid
      ticket: "",
      tgt: ""
    };
  },
  created() {
    this.checkLoginStatus();
  },
  methods: {
    /**
     * 检查登录状态
     */
    checkLoginStatus() {
      const jsessionid = this.$store.state.globalData.jsessionid || null; // 从全局状态中获取 jsessionid
      this.jsessionid = jsessionid;

      if (jsessionid) {
        // 如果有 jsessionid，请求获取用户基本信息
        this.fetchUserInfo();
      } else {
        // 如果没有 jsessionid，显示“未登录”
        this.xm = "未登录";
      }
    },

    /**
     * 请求获取用户基本信息
     */
    fetchUserInfo() {
      const jsessionid = this.jsessionid;

      if (!jsessionid) {
        console.error("未获取到 JSESSIONID");
        return;
      }

      this.$http
        .get("https://jwgl.hnuu.edu.cn/hnlhdxjw/frame/home/js/SetMainInfo.jsp?v=230519", {
          headers: {
            Cookie: `JSESSIONID=${jsessionid}` // 携带 JSESSIONID 作为 Cookie
          }
        })
        .then(response => {
          const scriptContent = response.data;
          const scriptRegex = /var _userName\s*=\s*'([^']+)';/;
          const match = scriptRegex.exec(scriptContent);

          if (match && match[1]) {
            const userName = match[1]; // 提取用户名
            this.xm = userName;
          } else {
            console.error("未找到用户名信息");
            this.xm = "未知用户";
          }
        })
        .catch(err => {
          console.error("请求失败:", err);
          this.xm = "请求失败";
        });
    },

	/**
	 * 跳转到个人信息页面
	 */
	navigateToDetail() {
	 //  if (!this.jsessionid) {
		// this.$toast("请先登录");
		// return;
	 //  }
	  uni.navigateTo({
		url: '/pages/mine/detail/detail'
	  });
	},

	/**
	 * 跳转到我的课表页面
	 */
	goToCourse() {
	 //  if (!this.jsessionid) {
		// this.$toast("请先登录");
		// return;
	 //  }
	  uni.navigateTo({
		url: '/pages/mine/course/course'
	  });
	},

	/**
	 * 跳转到查电费页面
	 */
	goToElctric() {
	 //  if (!this.jsessionid) {
		// this.$toast("请先登录");
		// return;
	 //  }
	  uni.navigateTo({
		url: '/pages/mine/electric/electric'
	  });
	},

	/**
	 * 跳转到学期成绩页面
	 */
	goToScore() {
	 //  if (!this.jsessionid) {
		// this.$toast("请先登录");
		// return;
	 //  }
	  uni.navigateTo({
		url: '/pages/mine/score/score'
	  });
	},

	/**
	 * 跳转到登录页面
	 */ 
	goToLogin() {
	  uni.navigateTo({
		url: '/pages/login/login'
	  });
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