<template>
	<view>
		<view class="gouwuche" :style="opce">购物车 ({{this.goodscarelist.length}})</view>

		<scroll-view class="scrollheight" show-scrollbar scroll-y @scroll="scroll" @scrolltolower="getmoregoods">
			
			<view class="carttop">
				<view>
					<view class="carttops">购物车</view>
					<view class="carttopleft">共{{this.goodscarelist.length}}件宝贝</view>
				</view>
				<view class="carttopover">管理</view>
			</view>
			
			<view class="cartcenter" v-for="(item,index) in goodscarelist">
				<view class="cartcentertop">🐱 {{item.name}} ></view>
				<view class="cartcenterbottom">
					<view @click="chiousgoods(item)" class="chacha" :class="{actives:item.check ==true}"></view>
					<view class="images"  @click="gotodetail(item)">
						<image :src="item.img" ></image>
					</view>
					<view class="cartcenterbottomfirst">
						<view class="xiaoqingxin"  @click="gotodetail(item)">{{item.shopname}}</view>
						<view class="yellow"  @click="gotodetail(item)">{{item.color.slice(0,2)}}/{{item.size.slice(0,2)}}</view>
						<view class="cartcenterone">
							<view class="shuzi"  @click="gotodetail(item)">￥{{item.pric}}</view>
							<view class="cartcentertwo">
								<view class="shuliangjiajia" @click="reduces(item,index)">-</view>
								<view class="shuliangjiajia">{{item.num}}</view>
								<view class="shuliangjiajia" @click="increase(item)">+</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view v-show="goodscarelist.length === 0">
				<view class="heard-words">购物车里啥都没有快去添加吧</view>
				<view class="quguangguang" @click="quxiaomessage">去逛逛</view>
			</view>
				 

			<view class="kanleyouan">—— ❤ 你可能还喜欢 ——</view>
			<shouitem @godetail="godetail" class="shouitem" :homeitems="list"></shouitem>
		</scroll-view>
		
		<view class="dibutarber">
			<view class="yes"  @click="ischecks":class="{actives:ischeck == true}"></view>
			<view class="chouse">全选</view>
			<view class="alone">合计:￥{{totleprc}}</view>
			<view class="zonggong " @click="jisuan">结算 ({{checkgoods}})</view>
		</view>
		
		
		<view>
			<u-toast ref="uToast" z-index="4000000000000"/>
		</view>
	</view>
</template>

<script>
	import shouitem from "../../../components/shopitem/shopitem"
	export default {
		components: {
			shouitem
		},
		data() {
			return {
				opce: {
					opacity: 0,
				},
				//看了又看第几页的商品
				page: 6,
				list: [],
				checkgoods:0,
				// 总价格
				totleprc:0,
				// 全选按钮
				ischeck:false,
				// vuex 的商品
				goodscarelist:[]
			};
		},
		onLoad() {
			this.getlike()
			this.goodscarelist = this.$store.state.carelist
			this.checkgoods = this.$store.state.carelist.filter(i=>i.check).length
		},
		onShow() {
			console.log(this.ischeck)
			let c = this.goodscarelist.every(i=>i.check)
			if(!c){
				this.ischeck = false
			}else{
				this.ischeck = true	
			}	
		},
		methods: {
			scroll(e) {
				this.opce.opacity = e.detail.scrollTop / 60
			},
			// 你可能还喜欢数据
			async getlike() {
				this.page += 1
				let {
					data
				} = await this.$shopdetail({
					url: "/home/data?type=pop&page=" + this.page
				})
				this.list = [...this.list, ...data.data.list]
			},
			// 滚动到底部加载更多商品
			getmoregoods() {
				this.getlike()
			},
			// 点击增加商品数量
			increase(item){ 
				 item.num +=1
				 this.totleprc = this.$store.state.carelist.filter(i=>{
				 	return i.check
				 }).reduce((pre,item)=>{
				 	return pre + item.num * item.pric	
				 },0).toFixed(2)
				 
				 
			},
			// 点击返回详情页
			gotodetail(item){
				let title = item.shopname.slice(0,10)
				let id = item.id
				uni.navigateTo({
					url: `/pages/detail/detail? + ${title} ${id}`
				})
	 
			},
			// 点击减少商品
			reduces(item,index){
				if(item.num == 1){
					uni.showModal({
					    content: '确定将这个一个宝贝删除？',
					    success: res=>{
					        if (res.confirm) {
					           this.$store.state.carelist.splice(index,1)
							   this.goodscarelist =  this.$store.state.carelist
							   this.totleprc = this.$store.state.carelist.filter(i=>{
							   	return i.check
							   }).reduce((pre,item)=>{
							   	return pre + item.num * item.pric	
							   },0).toFixed(2)
							   this.checkgoods = this.$store.state.carelist.filter(i=>i.check).length
					        } else if (res.cancel) {
					           item.num == 1
					        }
					    }
					});
				}else{
						item.num -=1
						this.totleprc = this.$store.state.carelist.filter(i=>{
							return i.check
						}).reduce((pre,item)=>{
							return pre + item.num * item.pric	
						},0).toFixed(2)
				}
			},
			// 点击是否选中当前商品
			chiousgoods(item){
				item.check = !item.check
				this.checkgoods = this.$store.state.carelist.filter(i=>i.check).length
				
				this.totleprc = this.$store.state.carelist.filter(i=>{
					return i.check
				}).reduce((pre,item)=>{
					return pre + item.num * item.pric	
				},0).toFixed(2)
				let d = this.goodscarelist.every(i=>i.check)
				if(!d){
					this.ischeck = false
				}else{
					this.ischeck = true
				}
				 
			},
			// 全选按钮点击
			ischecks(){
				this.ischeck = !this.ischeck
				if(this.ischeck === true){
					 this.goodscarelist.forEach(i=>{
						return i.check = true
					})
					this.checkgoods =  this.goodscarelist.filter(i=>i.check).length
					this.totleprc =  this.goodscarelist.filter(i=>{
						return i.check
					}).reduce((pre,item)=>{
						return pre + item.num * item.pric	
					},0).toFixed(2)
				
				}else{
					 this.goodscarelist.forEach(i=>i.check = false)
					
					this.checkgoods =  this.goodscarelist.filter(i=>i.check).length
					
					this.totleprc =  this.goodscarelist.filter(i=>{
						return i.check
					}).reduce((pre,item)=>{
						return pre + item.num * item.pric	
					},0).toFixed(2)
				}
				 
			},
			// 点击跳转到详情页
			godetail(index){
				let title = index.title.slice(0, 10)
				let id = index.iid
				uni.navigateTo({
					url: `/pages/detail/detail? + ${title} ${id}`
				})
			},
			// 点击合计总价格
			jisuan(){
				if(this.checkgoods === 0){
					this.$refs.uToast.show({
						title: '请选择购买商品',
						duration: 1500,
						icon:false
					})
				}else{
					this.$refs.uToast.show({
						title: '该功能暂未开通',
						duration: 1500,
						type:"error",
						icon:false
					})
				}
				
			},
			quxiaomessage() {
				uni.switchTab({
					url: "../../Home/home/home"
				})
			},
			
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f2f2f2;
		width: 100% !important;
	}

	.shouitem {
		position: relative;
		top: 230rpx;
	}

	.gouwuche {
		height: 200rpx;
		width: 98%;
		position: fixed;
		left: 0;
		line-height: 270rpx;
		font-size: 36rpx;
		font-weight: 600;
		letter-spacing: 2rpx;
		text-align: center;
		right: 0;
		top: 0;
		z-index: 10000000000000;
		background-color: #f1f1f1;
	}

	.carttop {
		position: relative;
		top: 110rpx;
		display: flex;
		background-color: #f1f1f1;
		justify-content: space-between;
		padding: 0 20rpx;

		.carttops {
			font-size: 40rpx;
			font-weight: bolder;
			color: black;
			letter-spacing: 1rpx;
		}

		.carttopleft {
			position: relative;
			top: 20rpx;
			color: #727272;
			letter-spacing: 1rpx;
		}

		.carttopover {
			font-size: 34rpx;
		}
	}

	.cartcenter {
		position: relative;
		top: 170rpx;
		width: 93%;
		left: 26rpx;
		height: 290rpx;
		border-radius: 20rpx;
		background-color: #FFFFFF;
		margin-bottom: 20rpx;
		image {
			width: 140rpx;
			height: 140rpx;
		}

		.cartcenterbottom {
			position: relative;
			top: 50rpx;
			left: -20rpx;
			display: flex;
			justify-content: space-around;

			.cartcenterone {
				display: flex;
				justify-content: space-between;

				.cartcentertwo {
					display: flex;
					position: relative;
					left: 120rpx;
				}
			}
		}
	}

	.cartcenterbottomfirst {
		display: flex;
		position: relative;
		left: -130rpx;
		flex-direction: column;
	}

	.cartcentertop {
		position: relative;
		top: 20rpx;
		font-size: 32rpx;
		font-weight: bolder;
		left: 70rpx;
	}

	.images {
		position: relative;
		left: 44rpx;

	}

	.chacha {
		position: relative;
		top: 40rpx;
		width: 40rpx;
		height: 40rpx;
		left: 34rpx;
		border-radius: 100%;
		border: 2rpx solid #cacaca;
	}

	.yellow {
		margin: 10rpx 0;
		width: 120rpx;
		height: 50rpx;
		line-height: 50rpx;
		border-radius: 10rpx;
		position: relative;
		left: 194rpx;
		font-size: 26rpx;
		background-color: #f9f9f9;
		color: #9a9a9a;
		text-align: center;
	}

	.shuzi {
		color: #eb551f;
		font-size: 32rpx;
		font-weight: bolder;
		position: relative;
		left: 194rpx;
	}

	.xiaoqingxin {
		position: relative;
		width: 490rpx;
		padding-right: 80rpx;
		left: 194rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.shuliangjiajia {
		width: 50rpx;
		height: 50rpx;
		line-height: 50rpx;
		border-radius: 10rpx;
		text-align: center;
		margin-right: 6rpx;
		background-color: #f1f1f1;
	}

	.scrollheight {
		height: 100vh;
	}

	.kanleyouan {
		position: relative;
		top: 190rpx;
		letter-spacing: 1rpx;
		color: #e95213;
		left: 50%;
		transform: translateX(-25%);
	}
	  .heard-words {
		  font-size: 50rpx;
	    margin-top: 200rpx;
	    font-family: 华文彩云;
	    color: #e95213;
	    text-align: center;
	  }
	.quguangguang{
		width: 140rpx;
		height: 70rpx;
		background-color: #FFFFFF;
		color: black;
		position: relative;
		left: 50%;
		letter-spacing: 2rpx;
		top: 50rpx;
		border-radius: 10rpx;
		border: 3rpx solid #e95213;
		text-align: center;
		line-height:70rpx ;
		transform: translateX(-50%);
	}
	.dibutarber{
		display: flex;
		background-color: #FFFFFF;
		position: fixed;
		left:0;
		height: 100rpx;
		justify-content: space-around;
		right: 0;
		bottom: 0;
		line-height: 100rpx;
		z-index: 3000000000000;
		.yes{
			position: relative;
			top: 34%;
			height: 40rpx;
			width: 40rpx;
			border: 2rpx solid #cacaca;
			border-radius: 100%;
			left: -20rpx;
			 
		}
		.chouse{
			position: relative;
			left: -80rpx;
			top: 4rpx;
			 
		}
		.alone{
			position: relative;
			width: 200rpx;
			color: #ee7c30;
			left: 76rpx;
			font-weight: 600;
		}
		.zonggong{
			color: #FFFFFF;
			position: relative;
			top: 14rpx;
			text-align: center;
			border-radius: 30rpx;
			line-height: 70rpx;
			background-color: #ee7c30;
			width: 170rpx;
			height: 70rpx;
		}
	}
	// 选中商品样式
	.actives{
		background-color: #ee7c30;
		border: 2rpx solid #ee7c30;
	}
	// 隐藏ios端的滚动条
	/deep/.uni-scroll-view::-webkit-scrollbar {
		display: none
	}
</style>
