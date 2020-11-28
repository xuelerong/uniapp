<template>
	<view>
		<view>
			<view class="upimg">
				<image :src="url"></image>
			</view>
			<view class="downimg">
				<image :src="url"></image>
			</view>
			
			<view class="dianpu">
				<view class="dianpuone">
					<view class="col">0</view>
					<view>收藏店铺</view>
				</view>
				
				<view class="dianputwo">
					<view class="col">0</view>
					<view>收藏商品</view>
				</view>
				
				<view class="dianputhree">
					<view class="col">0</view>
					<view>关注商品</view>
				</view>
				
				<view class="dianpufour">
					<view class="col">0</view>
					<view>我的足迹</view>
				</view>
			</view>
		</view>
		
		<navigator url="/pages/index/index" class="dingdan">退出登录</navigator>
		<view class="myimg">
			<image src="https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1234697916,1992499387&fm=26&gp=0.jpg"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3650020617,4151760675&fm=26&gp=0.jpg"
			}
		},
		methods: {

		}
	}
</script>

<style lang="less">
	page{
		background-color: #eaece9;
	}
	.upimg {
		image {
			width: 100%;
			filter: blur(8px);
		}
	}

	.downimg {
		image {
			width: 180rpx;
			height: 180rpx;
			border-radius: 50%;
			position: absolute;
			left: 0;
			right: 0;
			top: -55%;
			bottom: 0;
			margin: auto;
		}
	}
	.dianpu{
		box-shadow:-2px -2px 8px #333333 ;
		width: 94%;
		height: 100rpx;
		background-color: #FFFFFF;
		display: absolute;
		margin: -24rpx auto;
		display: flex;
		justify-content: space-around;
		font-size: 30rpx;
		.dianpuone{
			display: flex;
			flex-direction: column;
			text-align: center;
		}
		.dianputwo{
			display: flex;
			flex-direction: column;
			text-align: center;
		}
		.dianputhree{
			display: flex;
			flex-direction: column;
			text-align: center;
		}
		.dianpufour{
			display: flex;
			flex-direction: column;
			text-align: center;
		}
	}
	.col{
		color: red;
	}
	.dingdan{
	height: 80rpx;
	font-size: 30rpx;
	line-height: 80rpx;
	background-color: #FFFFFF;
	text-align: center;
	width: 94%;
	margin: 40rpx auto;
	}
	.myimg{
		image{
			width: 100%;
		}
	}
</style>
