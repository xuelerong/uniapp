<template>
	<view>
		<view class="searchbg">
			<navigator url="/pages/search/search">
				<search></search>
			</navigator>
		</view>

		<!-- 滚动区域 -->
		<scroll-view class="scrollheight" scroll-y="true" show-scrollbar="false" @scrolltolower="getData">
			<!-- 轮播图 -->
			<view class="wrappertop">
				<u-swiper :list="banner" :effect3d="true" height=330 effect3d-previous-margin=60 bg-color="#ffffff"></u-swiper>
			</view>
			<view class="recommedImg">
				<view v-for="(item,index) in recommed" :key="index">
					<image :src="item.image_src" @click="recommedImg(index)"></image>
				</view>
			</view>
			<view class="shopImg">
				<image src="http://gw.alicdn.com/tfs/TB1tkugZXY7gK0jSZKzXXaikpXa-406-120.png?getAvatar_450x10000.jpg"></image>
			</view>
			<view class="shuangshiyi">
				<view class="shuangshiyione">
					<view>
						<image src="https://s10.mogucdn.com/mlcdn/c45406/180914_4921efc52gh5l6f716dcge3e8e96a_120x120.gif"></image>
					</view>
					<view class="text">先买先到手</view>
					<view>
						<image src="https://s10.mogucdn.com/mlcdn/c45406/180907_5a44gk3j2b2ge59ack8j67h9d936d_180x180.gif"></image>
					</view>
				</view>
				<view class="shuangshiyiteo">
					<view class="shuangshiyiteoreadio">
						<image src="https://s3.mogucdn.com/mlcdn/c45406/180227_069ci8he1419k16did4c1lk9l5j3g_120x120.jpg"></image>
					</view>
					<view class="shuangshiyiteoreadio">
						<image src="https://s10.mogucdn.com/mlcdn/c45406/180613_8e6kff08j0c21ael803ebc6cgkel6_180x180.jpg"></image>
					</view>
					<view class="shuangshiyiteoreadio">
						<image src="https://s3.mogucdn.com/mlcdn/c45406/180307_6j14ah0j70a3gcd1c10aaj8bi4led_130x130.jpg"></image>
					</view>
					<view class="shuangshiyiteoreadio">
						<image src="http://s16.mogucdn.com/p1/160422/upload_ie4tcytgmu4tomzrhazdambqgqyde_130x130.jpg"></image>
					</view>
				</view>
			</view>
			<!-- 首页商品 -->
			<shopitem @godetail="godetail" :homeitems="homeitems" class="searchgoods"></shopitem>
		</scroll-view>

		<view>
			<u-toast ref="uToast" />
		</view>

	</view>
</template>

<script>
	import {
		shoprequest
	} from "../../../servers/natework.js"
	import search from "../../../components/search/search"
	import shopitem from "../../../components/shopitem/shopitem"
	export default {
		data() {
			return {
				banner: [],
				recommed: [],
				homeitems: [],
				//当前第几页的商品
				page: 0,
			};
		},
		components: {
			search,
			shopitem
		},
		onLoad() {
			this.getHomewrapper()
			this.getData()
			this.getDatarecomed()
		},
		onShow() {

		},
		methods: {
			getHomewrapper() {
				shoprequest({
					url: "/home/multidata"
				}, res => {
					this.banner = res.data.data.banner.list;
				})
			},
			//进页面 请求数据  包含 上拉加载数据
			getData() {
				this.isshow = false
				this.page += 1
				this.$shoprequest({
					url: "/home/data?type=pop&page=" + this.page
				}, res => {
					this.homeitems = [...this.homeitems, ...res.data.data.list]
				})
				// if (this.page > 1) {
				// 	this.$refs.uToast.show({
				// 		title: '加载成功',
				// 		type: 'success',
				// 		position: "bottom",
				// 		duration: 1000
				// 	})
				// }
			},
			async getDatarecomed() {
				let {
					data
				} = await this.$usershop({
					url: "/home/catitems"
				})
				this.recommed = data.message
			},
			//点击recommed 图片
			recommedImg(index) {
				uni.navigateTo({
					url:"../../goodsList/goodsList?id="+ index+10
				})
			},
			//点击商品跳转详情页
			godetail(index) {
				let title = index.title.slice(0, 10)
				let id = index.iid
				uni.navigateTo({
					url: `/pages/detail/detail? + ${title} ${id}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.searchbg {
		left: 0;
		right: 0;
		top: 0;
		z-index: 100000;
		position: fixed;
		height: 172rpx;
		width: 100%;
		background-color: #f7d7e1;
		background: url(../../../static/icons/one.png);
	}

	.wrappertop {
		margin-top: 174rpx;
	}

	.recommedImg {
		padding-top: 12rpx;
		display: flex;
		justify-content: space-around;

		image {
			width: 180rpx;
			height: 180rpx;
		}
	}

	.shopImg {

		padding-top: 4rpx;
		display: flex;
		justify-content: center;

		image {
			width: 270rpx;
			height: 80rpx;
		}
	}

	.shuangshiyi {
		border: 10rpx solid #e15d75;
		margin-top: -36rpx;
		width: 92%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-left: 29rpx;
		height: 300rpx;
		border-radius: 30rpx;

		.shuangshiyione {
			width: 100%;
			height: 150rpx;
			border-bottom: 6rpx solid #e15d75;
			display: flex;
			justify-content: space-around;
			align-items: center;

			image {
				width: 140rpx;
				height: 130rpx;
			}

			.text {
				font-size: 36rpx;
				width: 200rpx;
				letter-spacing: 2rpx;
				height: 60rpx;
				text-align: center;
				line-height: 60rpx;
				border-radius: 30rpx;
				background-color: #e15d75;
				color: #FFFFFF;
				font-weight: bolder;
			}
		}

		.shuangshiyiteo {
			background-color: #e15d75;
			display: flex;
			width: 100%;
			height: 130rpx;
			justify-content: space-around;

			image {
				width: 130rpx;
				height: 110rpx;
			}

			view {
				border: 4rpx solid #FFFFFF;
			}
		}
	}

	.shuangshiyiteoreadio {
		background-color: #FFFFFF;
		border-radius: 20rpx;
		width: 150rpx;
		height: 130rpx;
	}

	.scrollheight {
		height: 100vh;
	}
	.searchgoods{
		margin-top: 26rpx;
	}
	// 隐藏ios端的滚动条
	/deep/.uni-scroll-view::-webkit-scrollbar {
		display: none
	}
</style>
