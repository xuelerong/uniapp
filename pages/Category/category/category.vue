<template>
	<view>
		<scroll-view class="scroddtop">
			<view class="searchbg">
				<navigator url="/pages/search/search">
					<search></search>
				</navigator>
			</view>

			<scroll-view scroll-x class="scrolltop" show-scrollbar>
				<view class="categoryimg">
					<view v-for="(item,index) in categoryimg">
						<view class="caregoryitems" @click="sousuotiao(item)">
							<image :src="item.image"></image>
							<view>{{item.name}}</view>
						</view>
					</view>
				</view>
			</scroll-view>

			<view class="remen">热门 &nbsp &nbsp &nbsp最新</view>

			<view class="leftright">
				<scroll-view scroll-y class="scrotop">
					<view v-for="(item,index) in categorylist" :key="index" class="itemheight">
						<view class="catrgoryitem" :class="{active:currindex === index}" @click="itemactive(index)">{{item.cat_name}}</view>
					</view>
				</scroll-view>

				<scroll-view scroll-y class="scrotoptwo" @scroll="scroll" :scroll-top="scrolltop">
					<view v-for="(item,index) in categorylistright.children" :key="index" class="floatfuji">
						<view class="rightitems">{{item.cat_name}}</view>
						<view v-for="(item1,index) in item.children" :key="index" class="justitems">

							<image @click="imglist(item1)" :src="item1.cat_icon"></image>
							<view>{{item1.cat_name}}</view>
						</view>
					</view>
				</scroll-view>


			</view>
		</scroll-view>



	</view>
</template>

<script>
	import search from "../../../components/searchmini/searchmini"

	export default {
		components: {
			search
		},
		onLoad() {
			this.getuserlist()
		},
		data() {
			return {
				categoryimg: [{
						image: "https://gw.alicdn.com/tfs/TB1eRWn1kT2gK0jSZFkXXcIQFXa-800-800.png_170x10000.jpg_.webp",
						name: "大牌手机",
						id:191
			 
					}, {
						image: "https://gw.alicdn.com/imgextra/O1CN01xweQm61kW4BRbjCFS_!!6000000004690-2-yinhe.png_170x10000.jpg_.webp",
						name: "大牌女装",
						id:926
					},
					{
						image: "https://gw.alicdn.com/tfs/TB1qx3SmzMZ7e4jSZFOXXX7epXa-800-800.png_170x10000.jpg_.webp",
						name: "医保药健",
						id:551
					},
					{
						image: "https://gw.alicdn.com/tfs/TB16R33ZpT7gK0jSZFpXXaTkpXa-800-800.png_170x10000.jpg_.webp",
						name: "大牌美妆",
						id:1112
					},

					{
						image: "https://gw.alicdn.com/tfs/TB19GfmpBFR4u4jSZFPXXanzFXa-800-800.png_170x10000.jpg_.webp",
						name: "精品家具",
						id:449
					},
					{
						image: "https://gw.alicdn.com/imgextra/i4/1790973264/O1CN014Mq4J51ZyxN8kzmeI_!!1790973264.png_170x10000.jpg_.webp",
						name: "天猫超市",
						id:1420
					},
					{
						image: "https://gw.alicdn.com/tfs/TB1V3C.nipE_u4jSZKbXXbCUVXa-800-800.png_170x10000.jpg_.webp",
						name: "品质家电",
						id:465
					},
					{
						image: "https://gw.alicdn.com/tfs/TB1IBoMqGNj0u4jSZFyXXXgMVXa-800-800.png_170x10000.jpg_.webp",
						name: "厂供家装",
						id:1463
					},
					{
						image: "https://gw.alicdn.com/tfs/TB1wzGa1XY7gK0jSZKzXXaikpXa-800-800.png_170x10000.jpg_.webp",
						name: "苏宁精选",
						id:19
					},
					{
						image: "https://gw.alicdn.com/tfs/TB1RPhMmCslXu8jSZFuXXXg7FXa-1280-1280.png_170x10000.jpg_.webp",
						name: "美妆洗护",
						id:1121
					}
				],
				categorylist: [],
				categorylistright: [],
				// 左侧选中的按钮
				currindex: 0,
				// 点击选项卡 右侧回到顶部
				scrolltop: 0,
				itemout: null
			};
		},
		methods: {
			async getuserlist(callback) {
				let {
					data
				} = await this.$usershop({
					url: "/categories"
				})
				this.categorylist = data.message
				this.categorylistright = data.message[this.currindex]
				console.log(this.categorylistright)
				callback && callback()
			},
			// 把滚动的到位置保存起来然后再点击左边选项按钮时把scrolltop值清空 实现回到顶部
			// 使用防抖 不然一直在记录滚动高度 手机会出现卡顿
			scroll(e) {
				clearTimeout(this.itemout)
				this.itemout = setTimeout(() => {
					this.scrolltop = e.detail.scrollTop
				}, 300)
			},
			// 点击左侧按钮
			itemactive(index) {
				this.currindex = index
				this.getuserlist(() => {
					// 这里把回到顶部已回调函数方式传过去是因为 有时候页面回到顶部数据还没请求过来 
					this.scrolltop = 0
				})
			},
			// 点击右侧图片跳转goodslist 页面
			imglist(item1){
				uni.navigateTo({
					url:"../../goodsList/goodsList?id="+item1.cat_id
				})
			},
			sousuotiao(item){
				uni.navigateTo({
					url:"../../goodsList/goodsList?id="+ item.id
				})
	 
			}

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f2f2f2;
	}

	.categoryimg {
		display: flex;
		width: 220%;
		padding: 20rpx 0;

		image {
			width: 140rpx;
			height: 140rpx;
			border-radius: 100%;
		}
	}

	.remen {
		position: relative;
		top: 240rpx;
		left: 30rpx;
		color: #ee7c30;
		font-weight: 600;
		letter-spacing: 2rpx;
		font-size: 32rpx;
	}

	.searchbg {
		left: 0;
		right: 0;
		top: 0;
		z-index: 100000;
		position: fixed;
		height: 172rpx;
		width: 100%;

	}

	.scrolltop {
		margin: 0 auto;
		width: 96%;
		background-color: #FFFFFF;
		height: 226rpx;
		border-radius: 20rpx;
		position: relative;
		top: 220rpx;
	}

	.caregoryitems {
		display: flex;
		align-items: center;
		flex-direction: column;
		margin-right: 16rpx;

	}

	// 隐藏ios端的滚动条
	/deep/.uni-scroll-view::-webkit-scrollbar {
		display: none
	}

	.leftright {
		position: relative;
		top: 260rpx;
		width: 96%;
		border-radius: 10rpx;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		background-color: #FFFFFF;
	}


	.catrgoryitem {
		margin: 30rpx 0;
		font-weight: 600;
		font-size: 32rpx;
		color: #9a9a9a;
	}

	.scrotop {
		width: 26%;
		height: calc(100vh - 530rpx);
		text-align: center;

	}

	.scrotoptwo {


		height: calc(100vh - 530rpx);


	}

	.itemheight {}

	.active {
		color: #ee7c30;
	}

	.scroddtop {
		height: 100vh;
	}

	.rightitems {
		padding-top: 30rpx;
		margin-bottom: 20rpx;
		text-align: center;
		font-weight: bolder;
		font-size: 34rpx;
		letter-spacing: 2rpx;
	}

	image {
		width: 100rpx;
		height: 100rpx;
	}

	.floatfuji {
		overflow: hidden;
	}

	.justitems {
		text-align: center;
		width: 33%;
		float: left;
	}
</style>
