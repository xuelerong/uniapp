<template>
	<view class="pxx_navigator">
		<view class="iconfont icon-xiangji"></view>
		<navigator url="/pages/sosuo/sosuo" class="iconfont icon-saomashouquan1">
			<view>三星s20ultra</view>
			<view class="miniseach">搜索</view>
		</navigator>
		<view class="iconfont icon-xiaoxi11"></view>
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
		top:94rpx;
		z-index: 1000;
		height: 73rpx;
		margin-bottom: 1rpx;
	}

	navigator {
		font-size: 26rpx;
		margin: 0 auto;
		width: 70%;
		height: 60rpx;
		background-color: #FFFFFF;
		display: flex;
		border : 9rpx  solid #ed7830;
		line-height: 60rpx;
		justify-content: center;
		border-radius: 40rpx;
		color: #a6a6c4;
	}
 .miniseach{
	 position: absolute;
	 color: #FFFFFF;
	 right:110rpx;
	 width: 120rpx;
	 height: 60rpx;
	 text-align: center;
	 border-radius: 30rpx;
	 letter-spacing: 2rpx;
	 background-color: #ed7830;
 }
</style>
