<template>
	<view  class="homeitem" >
		<view  v-for="(item,index) in homeitems" :key="index">
			<view >
				<view v-if="item.show"><u-lazy-load  :image="item.show.img" @click="goodsimg(item)"  border-radius=20></u-lazy-load></view>
				
				<view  v-else><u-lazy-load :image="item.image" @click="goodsimg(item)"  border-radius=20></u-lazy-load></view>
				<!-- <image @click="goodsimg" :src="item.show.img"></image> -->
			</view>
			<view class="homeitemone">
				<view class="homeitemonetext">{{item.title}}</view>
				<view class="homeitemonemore">
					<view class="textcolor">￥{{item.price || item.price}}</view>
					<view class="textcolora">{{item.sale || item.itemSale}}人付款</view>
					<view>...</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			homeitems:{
				type:Array
			}
		},
		data() {
			return {

			}
		},
		methods: {
			goodsimg(index){
				this.$emit("godetail",index)
			}
		},
		
	}
</script>

<style lang="scss">
	.homeitem {
		padding-top: 16rpx;
		flex-wrap: wrap;
		display: flex;
		justify-content: space-between;
		padding: 0 20rpx;
 
	}

	.homeitemone {
		border: 4rpx solid #f0f0f0;
		margin-bottom: 20rpx;
		margin-top: -18rpx;
		z-index: 90;
		position: relative;
		border-bottom-left-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
		background-color: #FFFFFF;
		.homeitemonetext {
			padding-left: 10rpx;
			text-align: center;
			width: 300rpx;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}

		.homeitemonemore {
			padding-top: 10rpx;
			width: 340rpx;
			display: flex;
			justify-content: space-around;
		}
	}
	.textcolor{
		 
		color: red;
	}
	.textcolora{
		color: #a6a6c4;
	}
</style>
