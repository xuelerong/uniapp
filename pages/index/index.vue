<template>
	<view class="content">
		<!-- 标题 -->
		<view class="login_text">My-Shopping</view>
		<view class="login_textmini" @click="more">更多</view>
		<!-- 头像 -->
		<view class="login_img">
			<u-circle-progress bg-color="#ffffff" width=260 border-width=20 inactive-color="#ed7830" class="color_login"
			 :active-color="color" :percent="loginspeed" duration="200">
				<view class="u-progress-content">
					<view class='u-progress-info'>
						<view v-if="inlinrmy">我的商城</view>
						<view v-else>登陆中...</view>
					</view>
				</view>
			</u-circle-progress>
		</view>
		<!-- 表单 -->
		<view class="login_from">
			<u-field class="one_from" v-model="user.username" label="账号 :" placeholder="请填写账号">
			</u-field>
			<u-field class="one_from" v-model="user.password" label="密码 :" placeholder="请填写密码" type="password">
			</u-field>
		</view>
		<!-- 按钮 -->
		<view class="login_button">
			<u-button class="custom-style" shape="circle" :ripple="true" ripple-bg-color="#ed7830" @click="push_home">登录</u-button>
		</view>
		<view class="loginmore" @click="show = true">更多登录方式</view>
		<view>
			<u-popup v-model="show" mode="bottom" border-radius="14" height="420">
				<view class="tanchu">
					<view class="tanchuone">
						<view class="tanchuoness" @click="get_home">获取登录账号</view>
						<view class="tanchuonemm" @click="get_homes">扫脸登录</view>
						<view class="tanchuonekk" @click="get_homesss">取消</view>
					</view>

				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	import {
		userlogin
	} from "../../servers/login.js"
	export default {
		data() {
			return {
				user: {
					username: "",
					password: "",
				},
				loginspeed: 0,
				color: "#ed7830",
				show: false,
				inlinrmy: true
			}
		},
		onLoad() {

		},
		onShow() {},
		methods: {
			// 获取用户 token 判断是否满足条件 进行跳转
			async push_home() {
				let {
					data
				} = await userlogin(this.user)
				uni.setStorageSync("usertoken", !data.data ? "" : data.data.token)
				let usermessage = uni.getStorageSync('usertoken')
				if (!usermessage) {
					uni.showModal({
						title: "账号或密码错误",
						success: res => {
							if (res.confirm) {
								this.user.username = "",
									this.user.password = ""
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
				} else {
					this.color = "#19be6b"
					this.loginspeed = 100
					this.inlinrmy = false
					setTimeout(() => {
						uni.switchTab({
							url: "/pages/Home/home/home"
						})
					}, 600)
				}
			},
			// 点击获取 账号密码
			get_home() {
				this.show = false
				this.user.username = this.$store.state.username
				this.user.password = this.$store.state.password
			},
			//点击 扫脸
			get_homes() {
				uni.showToast({
					title: "暂未开通",
					duration: 1000
				})
			},
			// 点击取消
			get_homesss() {
				this.show = false
			},
			// //点击跟多方式登录
			more() {
				this.show = true
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;

		.content {
			height: 100%;
			overflow: hidden;

			.login_text {
				position: fixed;
				color: #ed7830;
				top: 110rpx;
				font-weight: bolder;
				font-family: 华文行楷;
				font-size: 60rpx;
				left: 30rpx;
			}

			.login_textmini {
				position: fixed;
				color: #333333;
				font-weight: bolder;
				font-size: 30rpx;
				top: 130rpx;
				right: 50rpx;
				letter-spacing: 2rpx;
			}

			.login_img {
				position: fixed;
				width: 240rpx;
				height: 240rpx;
				margin: 160rpx auto;
				left: 50%;
				top: 150rpx;
				transform: translateX(-50%);
			}

			.login_from {
				position: fixed;
				width: 100%;
				top: 630rpx;

				.one_from {
					color: #FFFFFF;
					border-radius: 20rpx;
					margin: 0 auto;
					background-color: #ed7830;
					margin-bottom: 20rpx;
					width: 88%;
				}
			}

			.login_button {
				position: fixed;
				left: 50%;
				transform: translateX(-50%);
				top: 880rpx;
				width: 88%;
				font-weight: 600;

				.custom-style {
					color: #ed7830;
					border: 3px solid #ed7830;
				}
			}
		}
	}

	.u-progress-info {
		color: #e56048;
		font-size: 34rpx;
		font-weight: 600;
		letter-spacing: 2rpx
	}

	.loginmore {
		color: #66666e;
		position: fixed;
		top: 1010rpx;
		left: 50%;
		transform: translateX(-50%);
		font-weight: bolder;
		font-size: 30rpx;
		letter-spacing: 2px;
	}

	.tanchu {

		background-color: #666666;
		color: #5b97ff;
		height: 100%;
		text-align: center;

		width: 100%;

		.tanchuone {
			width: 96%;
			border-radius: 22rpx;
			position: absolute;
			height: 220rpx;
			background-color: #404040;
			left: 50%;
			transform: translateX(-50%);
		}
	}

	.tanchuoness {
		left: 50%;
		transform: translateX(-50%);
		position: absolute;
		top: 24rpx;
		font-size: 40rpx;
		letter-spacing: 2rpx;
		font-weight: 500;

	}

	.tanchuonemm {
		width: 100%;
		padding-top: 24rpx;
		border-top: 1rpx solid #595959;
		left: 50%;
		transform: translateX(-50%);
		position: absolute;
		top: 110rpx;
		font-size: 40rpx;
		letter-spacing: 2rpx;
		font-weight: 500;
	}

	.tanchuonekk {
		background-color: #2c2c2d;
		width: 100%;
		height: 100rpx;
		border-radius: 22rpx;
		left: 50%;
		transform: translateX(-50%);
		position: absolute;
		padding-top: 20rpx;
		top: 236rpx;
		font-size: 40rpx;
		letter-spacing: 2rpx;
		letter-spacing: 2rpx;
		font-weight: 500;
	}
</style>
