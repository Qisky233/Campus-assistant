<template>
	<view class="container">
		<image class="logo" src="/static/logo.png"></image> <!-- Logo 单独放在顶部 -->

		<view class="header">
			<view class="title">欢迎使用校园助手</view>
			<view class="subtitle">Beta版本</view>
		</view>

		<!-- 优化后的 introduction 部分 -->
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
			<view class="notice-description">
				<text>目前的登录API比较臃肿，所以可能会因为同时登录人数过多出现登录延迟非常长的情况。</text>
				<text>不过这个会随着程序的不断维护逐渐完善的，希望大家理解多多支持！</text>
			</view>
		</view>

		<!-- 恢复原来的页尾样式 -->
		<view class="footer">
			<view class="footer-item">
				<text class="footer-text">{{ hitokoto }}</text>
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
				hitokoto: "加载中..." // 初始值
			};
		},
		onLoad() {
			this.fetchHitokoto(); // 页面加载时调用接口获取一言
		},
		methods: {
			// 获取一言的接口
			fetchHitokoto() {
				const apiUrls = [
					"https://v1.hitokoto.cn/", // 主接口
					"https://v1.hitokoto.cn/?c=b", // 第一备用接口
					"https://v1.hitokoto.cn/?c=f&encode=text" // 第二备用接口
				];

				// 递归尝试接口
				const tryNextApi = (index) => {
					if (index >= apiUrls.length) {
						// 所有接口都失败
						this.hitokoto = "加载一言失败，请稍后再试";
						return;
					}

					uni.request({
						url: apiUrls[index], // 当前尝试的接口
						success: (res) => {
							if (res.statusCode === 200) {
								// 获取成功
								this.hitokoto = res.data.hitokoto || res.data; // 兼容纯文本返回
							} else {
								// 当前接口失败，尝试下一个
								tryNextApi(index + 1);
							}
						},
						fail: () => {
							// 当前接口失败，尝试下一个
							tryNextApi(index + 1);
						}
					});
				};

				// 开始尝试第一个接口
				tryNextApi(0);
			}
		}
	};
</script>

<style>
	.container {
		padding: 20rpx;
		height: calc(100vh - 30px);
		background-color: #f5f5f5;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		display: block;
	}

	.header {
		text-align: center;
	}

	.title {
		font-size: 40rpx;
		font-weight: bold;
		color: #2d8cf0;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
	}

	.subtitle {
		font-size: 28rpx;
		color: #999;
	}

	.introduction {
		background: white;
		border-radius: 16rpx;
		padding: 30rpx;
		margin: 30rpx 0;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
		width: 90%;
	}

	.intro-item {
		display: flex;
		align-items: center;
		margin-bottom: 30rpx;
	}

	.intro-icon {
		font-size: 40rpx;
		margin-right: 20rpx;
	}

	.intro-text {
		font-size: 30rpx;
		color: #333;
		line-height: 1.6;
	}

	.content-box {
		background: white;
		border-radius: 16rpx;
		padding: 30rpx;
		margin: 30rpx 0;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
		width: 90%;
		text-align: center;
	}

	.notice-description {
		text-indent: 2rem;
		font-size: 28rpx;
		color: #666;
		line-height: 1.6;
		margin-bottom: 50rpx;
		text-align: left;
	}

	.footer {
		width: 100%;
		padding: 20rpx 0;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.footer-item {
		margin: 10rpx 0;
	}

	.footer-text {
		font-size: 24rpx;
		color: #999;
	}
</style>