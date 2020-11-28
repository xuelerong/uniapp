<template>
	<view>
		<view class="stop">
			<view class="sinput">
				<input v-model="myinput" @input="valuse" placeholder="点击搜索商品" placeholder-style="color:#9e9e9e;" />
			</view>
			<view class="squxiao" @click="quxiaomessage">取消</view>`
		</view>


		 
			<view @click="todetail(item.goods_id)" class="stext" v-for="(item,index) in usergoods" :key="index">{{item.goods_name}}</view>
 

		<view class="moretarbar" v-show="getmore">
			<view class="unisub">
				<u-subsection active-color="#ffffff" bg-color="#ffffff" button-color="#ff9900" :list="list" :current="curren"
				 @change="changea"></u-subsection>
			</view>

			<view>
				<swiper class="searchbottom" @change="change" :current="curren" acceleration>
					<swiper-item>
						<scroll-view scroll-y class="scrollheight" @scrolltolower="scroll">
							<view class="itemsalong">
								<view class="searchitems" v-for="(item,index) in  goodsList.pop.list" :key="index">
									<view @click="imgitem(item)">
										<image :src="item.show.img"></image>
									</view>
									<view class="itemstext">
										<view class="biaotitext">疯狂怕我开发的恐怕开发商开发恐怕</view>
										<view class="itemstextss">
											<view class="itempic">￥49</view>
											<view class="fukuan">4886人付款</view>
											<view>...</view>
										</view>
									</view>
								</view>

							</view>
						</scroll-view>
					</swiper-item>

					<swiper-item>
						<scroll-view scroll-y class="scrollheight" @scrolltolower="scrolltwo">
							<view class="itemsalong">
								<view class="searchitems" v-for="(item,index) in  goodsList.new.list" :key="index">
									<view  @click="imgitem(item)">
										<image :src="item.showLarge.img"></image>
									</view>
									<view class="itemstext">
										<view class="biaotitext">2019发骄傲售价骄傲019发骄傲售价骄傲售骄傲售骄傲售佛山</view>
										<view class="itemstextss">
											<view class="itempic">￥49</view>
											<view class="fukuan">4886人付款</view>
											<view>...</view>
										</view>
									</view>
								</view>

							</view>
						</scroll-view>
					</swiper-item>

					<swiper-item>
						<scroll-view scroll-y class="scrollheight" @scrolltolower="scrollthree">
							<view class="itemsalong">
								<view class="searchitems" v-for="(item,index) in  goodsList.sell.list" :key="index">
									<view  @click="imgitem(item)">
										<image :src="item.showLarge.img"></image>
									</view>
									<view class="itemstext">
										<view class="biaotitext">2019发骄傲售价骄傲019发骄傲售价骄傲售骄傲售骄傲售佛山</view>
										<view class="itemstextss">
											<view class="itempic">￥49</view>
											<view class="fukuan">4886人付款</view>
											<view>...</view>
										</view>
									</view>
								</view>

							</view>
						</scroll-view>
					</swiper-item>


				</swiper>
			</view>
			<view class="moregoods">—— 更多商品-敬请期待 ——</view>
		</view>



	</view>
</template>

<script>
	export default {
		data() {
			return {
				myinput: "",
				isshow: false,
				list: ["\xa0 \xa0 流行 \xa0 \xa0", "\xa0 \xa0新款 \xa0 \xa0", "\xa0 \xa0精选 \xa0 \xa0"],
				curren: 0,
				goodsList: {
					'pop': {
						page: 0,
						list: []
					},
					'new': {
						page: 0,
						list: []
					},
					'sell': {
						page: 0,
						list: []
					}
				},
				usergoods: [],
				timer: null
			}
		},
		computed: {
			getmore() {
				if (this.myinput) {
					return this.isshow = false
				} else {
					return this.isshow = true
				}
			}
		},
		onLoad() {
			this.moreMessage('pop')
			this.moreMessage('new')
			this.moreMessage('sell')
		},
		methods: {
			quxiaomessage() {
				uni.switchTab({
					url: "../Home/home/home"
				})
			},
			// 滑块触发事件
			change(e) {
				this.curren = e.detail.current

			},
			// 按钮点击事件
			changea(e) {
				this.curren = e

			},
			// 搜索框值
			 async valuse(e) {
				let query = e.detail.value
			 
		 
					 let datas = await this.$usershop({
						url: "/goods/qsearch",
						data: {
							query
						}
					})
					this.usergoods = datas.data.message
					console.log(this.usergoods)
		 

				
			},
			// 搜索值点击跳转
			todetail(id){
				let ids = id.toString().slice(0,1)
				uni.navigateTo({
					url:"../goodsList/goodsList?id="+ ids
				})
			},
			// 商品数据
			async moreMessage(type) {
				let page = this.goodsList[type].page + 1
				let {data} = await this.$shopdetail({
					url: "/home/data",
					data: {
						type,
						page
					}
				});
				this.goodsList[type].page += 1

				this.goodsList[type].list.push(...data.data.list)
			},
			// 滚动到底部加载   
			scroll() {
				this.moreMessage('pop')
			},
			scrolltwo() {
				this.moreMessage('new')
			},
			scrollthree() {
				this.moreMessage('sell')
			},
			imgitem(item){
				
				let title = item.title.slice(0,10)
				let id = item.iid
				uni.navigateTo({
					url: `/pages/detail/detail? + ${title} ${id}`
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fafafa;
	}

	.stop {
		position: fixed;
		left: 0;
		right: 0;
		padding-top: 100rpx;
		background-color: #FFFFFF;
		padding-bottom: 10rpx;
		z-index: 1000000000000000;
		display: flex;
		justify-content: space-between;
	}

	.sinput {
		flex: 4;
		border: 6rpx solid #ff9900;
		padding-left: 16rpx;
		margin: 16rpx 60rpx;
		border-radius: 14rpx;
		height: 60rpx;
		padding-right: 100rpx;
		background-color: #FFFFFF;

	}

	.squxiao {
		margin: 16rpx 10rpx;
		height: 64rpx;
		position: relative;
		left: -30rpx;
		flex: 1;
		line-height: 54rpx;
		border-radius: 26rpx;
		width: 100rpx;
		background-color: #FFFFFF;
		border: 6rpx solid #ff9900;
		text-align: center;
		color: red;
	}
	.stext {
		height: 90rpx;
		line-height: 90rpx;
		background-color: #FFFFFF;
		font-size: 32rpx;
		overflow: hidden;
		position: relative;
		top: 220rpx;
		width: 94%;
		margin: 0 auto;
		text-overflow: ellipsis;
		white-space: nowrap;
		border-bottom: 2rpx solid #dcdedb;
	}

	.moretarbar {
		position: relative;
		top: 260rpx;
	}

	.unisub {
		justify-content: space-around;
		display: flex;
	}

	.searchbottom {
		width: 96%;
		position: relative;
		top: 40rpx;
		margin: 0 auto;
		border-radius: 30rpx;
		height: 67vh;
		padding-bottom: 20rpx;
		background-color: #FFFFFF;
	}

	.moregoods {
		position: relative;
		top: 80rpx;
		text-align: center;
		color: #ff9900;
		letter-spacing: 2rpx;
		font-weight: 600;
	}

	.itemsalong {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		position: relative;
		left: -20rpx;
	}

	.searchitems {
		position: relative;
		top: 20rpx;
		border-radius: 20rpx;
		background-color: #fafafa;
		left: 20rpx;
		width: 48%;
		color: #FFFFFF;
		margin-bottom: 20rpx;
		padding-bottom: 10rpx;
		text-align: center;

		image {
			border-top-left-radius: 20rpx;
			border-top-right-radius: 20rpx;
			top: 8rpx;
			width: 326rpx;
			height: 400rpx;
		}

		.itemstext {
			display: flex;
			padding-top: 6rpx;
			flex-direction: column;
			justify-content: space-between;
			color: #303133;

			.itemstextss {
				display: flex;
				justify-content: space-around;
			}
		}
	}

	.itempic {
		color: #ff0000;
	}

	.fukuan {
		position: relative;
		top: 4rpx;
		color: #9e9e9e;
		font-size: 26rpx;
	}

	.biaotitext {
		position: relative;
		letter-spacing: 1rpx;
		left: 20rpx;
		width: 300rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.scrollheight {
		height: calc(100vh - 510rpx);
	}
</style>
