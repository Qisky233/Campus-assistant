<template>
	<view class="container">
		<image class="logo" src="/static/logo.png"></image>

		<view class="header">
			<view class="title">欢迎使用校园助手</view>
			<view class="subtitle">Beta版本</view>
		</view>

		<view class="introduction">
			<view class="intro-item">
				<text class="intro-icon">🎉</text>
				<text class="intro-text">欢迎来到校园助手小程序！</text>
			</view>
			<view class="intro-item">
				<text class="intro-icon">📚</text>
				<text class="intro-text">在这里，你可以轻松获取校园资讯、活动信息、课程安排等。</text>
			</view>
			<view class="intro-item">
				<text class="intro-icon">💡</text>
				<text class="intro-text">目前小程序仍处于试用阶段，欢迎反馈使用体验！</text>
			</view>
		</view>

		<view class="content-box">
			<view class="function-title">快捷功能</view>
			<view class="function-row">
				<!-- 查课表 -->
				<view class="function-item" @click="navigateTo('course')">
					<image class="function-icon" src="/static/images/index/课表.png" mode="aspectFit"></image>
					<text class="function-text">查课表</text>
				</view>
				
				<!-- 查成绩 -->
				<view class="function-item" @click="navigateTo('score')">
					<image class="function-icon" src="/static/images/index/成绩.png" mode="aspectFit"></image>
					<text class="function-text">查成绩</text>
				</view>
				
				<!-- 查电费 -->
				<view class="function-item" @click="navigateTo('electric')">
					<image class="function-icon" src="/static/images/index/电表.png" mode="aspectFit"></image>
					<text class="function-text">查电费</text>
				</view>
				
				<!-- 寻物启事 -->
				<view class="function-item" @click="navigateTo('lost')">
					<image class="function-icon" src="/static/images/index/失物招领.png" mode="aspectFit"></image>
					<text class="function-text">寻物</text>
				</view>
			</view>
		</view>

		<view class="footer">
			<view class="footer-item">
				<text class="footer-text" @click="navigateTo('motoo')">{{ hitokoto }}</text>
			</view>
			<view class="footer-item">
				<text class="footer-text">版权所有 © 校园助手</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				hitokoto: "加载中..."
			};
		},
		onLoad() {
			this.fetchHitokoto();
		},
		methods: {
			fetchHitokoto() {
				const apiUrls = [
					"https://v1.hitokoto.cn/",
					"https://v1.hitokoto.cn/?c=b",
					"https://v1.hitokoto.cn/?c=f&encode=text"
				];

				const tryNextApi = (index) => {
					if (index >= apiUrls.length) {
						this.hitokoto = "加载一言失败，请稍后再试";
						return;
					}

					uni.request({
						url: apiUrls[index],
						success: (res) => {
							if (res.statusCode === 200) {
								this.hitokoto = res.data.hitokoto || res.data;
							} else {
								tryNextApi(index + 1);
							}
						},
						fail: () => {
							tryNextApi(index + 1);
						}
					});
				};

				tryNextApi(0);
			},
			
			navigateTo(page) {
				const routes = {
					course: '/pages/mine/course/course',
					score: '/pages/mine/score/score',
					electric: '/pages/mine/electric/electric',
					lost: '/pages/feature/lost/lost',
					motoo: '/pages/feature/motoo/motoo'
				};
				
				if (routes[page]) {
					uni.navigateTo({
						url: routes[page]
					});
				}
			}
		}
	};
</script>

<style>
	.container {
		padding: 20rpx;
		min-height: 100vh;
		background-color: #f5f5f5;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.logo {
		height: 160rpx;
		width: 160rpx;
		margin-top: 40rpx;
		margin-bottom: 20rpx;
	}

	.header {
		text-align: center;
		margin-bottom: 30rpx;
	}

	.title {
		font-size: 36rpx;
		font-weight: bold;
		color: #2d8cf0;
	}

	.subtitle {
		font-size: 24rpx;
		color: #999;
		margin-top: 10rpx;
	}

	.introduction {
		background: white;
		border-radius: 16rpx;
		padding: 30rpx;
		margin: 20rpx 0;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
		width: 92%;
	}

	.intro-item {
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
	}

	.intro-icon {
		font-size: 36rpx;
		margin-right: 16rpx;
	}

	.intro-text {
		font-size: 28rpx;
		color: #333;
		line-height: 1.5;
	}

	.content-box {
		background: white;
		border-radius: 16rpx;
		padding: 30rpx;
		margin: 20rpx 0;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
		width: 92%;
	}
	
	.function-title {
		font-size: 30rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 30rpx;
		text-align: center;
	}
	
	.function-row {
		display: flex;
		justify-content: space-between;
	}
	
	.function-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 22%; /* 留出间距空间 */
	}
	
	.function-icon {
		width: 80rpx;
		height: 80rpx;
		margin-bottom: 15rpx;
	}
	
	.function-text {
		font-size: 24rpx;
		color: #555;
		text-align: center;
	}

	.footer {
		width: 100%;
		padding: 40rpx 0 20rpx;
		margin-top: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.footer-item {
		margin: 8rpx 0;
	}

	.footer-text {
		font-size: 22rpx;
		color: #999;
	}
</style>