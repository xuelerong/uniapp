<template>
	<view class="pxx_navigator">
		<view class="fenlei">分类</view>
		<navigator url="/pages/sosuo/sosuo" >
			<view>更多商品</view>
			<view class="miniseach">搜索</view>
		</navigator>
		<view class="suosuo">🔍</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style>
	.pxx_navigator {
		position: fixed;
		left: 0;
		right: 0;
		top:0;
		padding-top: 94rpx;
		background-color: #f2f2f2;
		padding-bottom: 120rpx;
		color: #333333;
		z-index: 1000;
		height: 73rpx;
		margin-bottom: 1rpx;
	}
	.fenlei{
		position: relative;
		top: 22rpx;
		left: 30rpx;
		font-size: 50rpx;
		letter-spacing: 2rpx;
		font-weight: bolder;
	}

	navigator {
		font-size: 26rpx;
		position: relative;
		top: -40rpx;
		width: 60%;
		height: 54rpx;
		left: 180rpx;
		display: flex;
		border : 4rpx  solid #ababab;
		line-height: 54rpx;
		justify-content: center;
		border-radius: 40rpx;
		color: #a6a6c4;
	}
 .miniseach{
	 position: relative;
	 right:110rpx;
	 width: 120rpx;
	 top: -4rpx;
	 left: 116rpx;
	 height: 62rpx;
	 border: 6rpx solid #ed7830;
	 text-align: center;
	 border-radius: 30rpx;
	 letter-spacing: 2rpx;
 
 }
 .suosuo{
	  font-size: 40rpx;
	  position: relative;
	  top: -100rpx;
	  left: 676rpx;
 }
</style>
