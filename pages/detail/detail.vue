<template>
	<view>
		<view class="detailtop">
			<view class="iconfont icon-fanhui " @click="gohome"></view>
			<view class="iconfont icon-sousuo ">
				<u-input input-align="center" @click="gosousuo" class="detailsosuo" auto-height :placeholder="hodername" />
			</view>
			<view class="iconfont icon-fenxiang"></view>
			<view class="iconfont icon-gouwuchetianjia2x"></view>
			<view class="iconfont icon-shenglvehao"></view>
		</view>
		<!-- tarbar -->
		<view id="detailtarbar" :style="opce">
			<view v-for="(item,index) in tarbars" :class="{active:index === currenindex}" @click="trbarindex(index)">{{item}}</view>
		</view>
		<scroll-view scroll-y class="detailscroll" :scroll-top="scrollstop" scroll-with-animation @scroll="scroll">
			<!-- 轮播图 -->
			<u-swiper class="swiperheight" @click="wsiperimg" :list="swiper" height=700></u-swiper>

			<!-- 宝贝 -->
			<view class="goodsstyle">
				<view class="goodsstyleone">{{goods.newPrice}}</view>

				<view class="goodsstyletwo">
					<view class="twoone">跨店每200减50</view>
					<view class="twotwo">店铺券满299减20</view>
					<view class="twothree">领券 ></view>
				</view>

				<view class="goodsstylethree">
					<view class="threeone">Adidas</view>
					<view class="threetwo">年轻人的潮流穿搭社区</view>
					<view class="threethree">{{cc}}</view>
				</view>

				<view class="goodsstylefour">
					<view class="fourone" v-if="goods.discount">{{goods.discount}}</view>
					<view class="fourtow">{{goods.title}}</view>
				</view>

				<view class="goodsstylefive">
					<view>❤ 推荐</view>
					<view>😊 帮我送</view>
					<view>🎁 分享</view>
				</view>
			</view>

			<!-- 商品分类 -->
			<view class="detailgoods">

				<view class="goodsone">
					<view class="goodsoneone">选择</view>
					<view class="goodsonetwo">
						<view class="goodsonetwocol">颜色分类/尺码</view>
						<view class="goodsonethree" @click="shoppings">
							<view v-for="(item,index) in listimg">
								<image :src="item.name"></image>
							</view>
							<view class="goodsoneonetext">共3种颜色分类可选</view>
						</view>
					</view>
				</view>


				<view class="detailcenter">
					<view class="fahuo">发货</view>
					<view class="housr">上海 👀</view>
					<view class="kuaidi">快递：包邮</view>
					<view class="monue">月销 {{shop.cGoods}} ></view>
				</view>

				<view class="textsthree">
					<view class="textone">保障</view>
					<view class="textfour">付款后30天内发货 · 7天无理由 · 新品</view>
				</view>

				<view class="last">
					<view class="lastone">参数</view>
					<view class="lasttwo">品牌 尺码...</view>
				</view>
			</view>

			<!-- 评价 -->

			<view class="pingjia">

				<view class="pingjiaone">
					<view class="pingjiaonetwo">宝贝评价</view>
					<view class="time">{{timess | dateFormat}}</view>
					<view class="quanbu">查看全部 ></view>
				</view>

				<view class="pingjiatwo">
					<image :src="shop.shopLogo"></image>
					<view class="pingjianame">{{shop.name}}</view>
				</view>

				<view class="pingjiathree">{{pingjia}}</view>

				<view>
					<view class="wendajia">问大家</view>
					<view class="pingjiathreefive">
						<view>宝贝好不好，问问已买过的人</view>
						<view class="qutiwen">去提问</view>
					</view>
				</view>
			</view>

			<view class="baobeidiyi">

				<view class="baobeidiyione">
					<image :src="shop.shopLogo"></image>
					<view class="baobeidiyionename">{{goods.discount}}</view>
					<view class="baobeidiyionefuwu">
						<view>宝贝描述4.7 ❤</view>
						<view>卖家服务4.7 ❤</view>
						<view>物流服务4.7 ❤</view>
					</view>
				</view>

				<view class="baobeidiyitwo">
					<view class="jindian">进店逛逛</view>
					<view class="quanbu">全部宝贝</view>
				</view>

				<view class="baobeidiyithree">
					<view class="chuanzhuo">穿着效果</view>
					<view class="chakan">查看全部 ></view>
				</view>

				<view class="imges">
					<view class="btnimage" v-for="(item,index) in share" :key="index">
						<image :src="item.image"></image>
					</view>
				</view>
			</view>

			<!-- 宝贝详情 -->
			<view class="babyxiangqing">———— 宝贝详情 ————</view>
			<view class="canshu">
				<view v-for="(item,index) in paramInfomini" :key="index">
					<view class="houbo">
						<view class="houdu">{{item.key}}</view>
						<view class="yanse">{{item.value}}</view>
					</view>
				</view>
			</view>
			<view class="swiperimgs" v-for="(item,index) in swiper">
				<image :src="item" class="swiperimgssdss"></image>
			</view>

			<view class="kanleyoukan">———— 看了又看 ————</view>
			<shopitem class="kanleyoukanone" :homeitems="share"></shopitem>
		</scroll-view>
		<!-- 底部tarbar -->
		<view class="dibutarbar">
			<view class="dibutarbarone">
				<view>🏠</view>
				<view>店铺</view>
			</view>
			<view class="dibutarbarone">
				<view>👦</view>
				<view>客服</view>
			</view>
			<view class="dibutarbarone">
				<view>💌</view>
				<view>收藏</view>
			</view>
			<view class="lijitarbar" @click="tianjiagouwuche">加入购物车</view>
			<view class="jiarutarbar" @click="tianjiagouwuthree">立即购买</view>
		</view>

		<!-- 购物车弹出层 -->
		<view class="onetanchu">
			<u-popup v-model="showshopping" mode="bottom">
				<view class="inlineblock">
					<view class="inlineblocktop">
						<view class="inlineblocktopone">
							<view class="">
								<image :src="onepic"></image>
							</view>
							<view class="inlineblocktoptwo">
								<view class="inlineblocktopcolor">{{goods.newPrice}}</view>
								<view class="inlineblocktoptwomini">库存 {{kucun}}</view>
								<view class="inlineblocktoptext">请选择 尺码 颜色分类</view>
							</view>
							<view class="inlineblockfalse" @click="chacha">X</view>
						</view>

						<view class="inlineblocktopcenter">
							<view>抱歉, 当前宝贝暂无尺码推荐</view>
							<view class="chakanchima">查看尺码 ></view>
						</view>
					</view>

					<view class="goodscenter">
						<view class="goodscentercolor">颜色</view>
						<view class="qiuscolor">
							<view class="benbaise" :class="{actives:index===currenders}" @click="xuanzhongyanse(item)" v-for="(item,index) in yifucolor"
							 :key="index">{{item.name}}</view>
						</view>
					</view>


					<view class="goodscenter">
						<view class="goodscentercolorsss">尺码</view>
						<view class="qiuscolor">
							<view class="benbaise" :class="{actives:index===currendersssss}" @click="xuae(item)" v-for="(item,index) in yifusize"
							 :key="index">{{item.name}}/码</view>

						</view>
					</view>

					<view class="goodslst">
						<view class="shuliang">购买数量</view>
						<view class="goodslength">
							<view class="shujiangjiajia">-</view>
							<view class="shujiangjiajia">1</view>
							<view class="shujiangjiajia">+</view>
						</view>
					</view>

					<view class="lastbuttom">
						<view class="jiaru" @click="gocart">加入购物车</view>
						<view class="mashangqiang"   @click="gocartkaito">马上抢</view>
					</view>
				</view>
			</u-popup>
		</view>



		<!-- 购物车弹出层2 -->
		<view class="onetanchu">
			<u-popup v-model="showshoppingtwo" mode="bottom">
				<view class="inlineblock">
					<view class="inlineblocktop">
						<view class="inlineblocktopone">
							<view class="">
								<image src="http://s3.mogucdn.com/mlcdn/c45406/170915_0a93207ci28kelh617k4hh62l65lb_640x960.jpg"></image>
							</view>
							<view class="inlineblocktoptwo">
								<view class="inlineblocktopcolor">{{goods.newPrice}}</view>
								<view class="inlineblocktoptwomini">库存 {{kucun}}</view>
								<view class="inlineblocktoptext">请选择 尺码 颜色分类</view>
							</view>
							<view class="inlineblockfalse" @click="chachatwo">X</view>
						</view>

						<view class="inlineblocktopcenter">
							<view>抱歉, 当前宝贝暂无尺码推荐</view>
							<view class="chakanchima">查看尺码 ></view>
						</view>
					</view>

					<view class="goodscenter">
						<view class="goodscentercolor">颜色</view>
						<view class="qiuscolor">
							<view class="benbaise" :class="{actives:index===currenders}" @click="xuanzhongyanse(item)" v-for="(item,index) in yifucolor"
							 :key="index">{{item.name}}</view>
						</view>
					</view>


					<view class="goodscenter">
						<view class="goodscentercolorsss">尺码</view>
						<view class="qiuscolor">
							<view class="benbaise" :class="{actives:index===currendersssss}" @click="xuae(item)" v-for="(item,index) in yifusize"
							 :key="index">{{item.name}}/码</view>

						</view>
					</view>

					<view class="goodslst">
						<view class="shuliang">购买数量</view>
						<view class="goodslength">
							<view class="shujiangjiajia">-</view>
							<view class="shujiangjiajia">1</view>
							<view class="shujiangjiajia">+</view>
						</view>
					</view>


					<view class="sure"  @click="gocart">确定</view>

				</view>
			</u-popup>
		</view>



		<!-- 购物车弹出层3 -->
		<view class="onetanchu">
			<u-popup v-model="showshoppingthree" mode="bottom">
				<view class="inlineblock">
					<view class="inlineblocktop">
						<view class="inlineblocktopone">
							<view class="">
								<image src="http://s3.mogucdn.com/mlcdn/c45406/170915_0a93207ci28kelh617k4hh62l65lb_640x960.jpg"></image>
							</view>
							<view class="inlineblocktoptwo">
								<view class="inlineblocktopcolor">{{goods.newPrice}}</view>
								<view class="inlineblocktoptwomini">库存 {{kucun}}</view>
								<view class="inlineblocktoptext">请选择 尺码 颜色分类</view>
							</view>
							<view class="inlineblockfalse" @click="chachathree">X</view>
						</view>

						<view class="inlineblocktopcenter">
							<view>抱歉, 当前宝贝暂无尺码推荐</view>
							<view class="chakanchima">查看尺码 ></view>
						</view>
					</view>

					<view class="goodscenter">
						<view class="goodscentercolor">颜色</view>
						<view class="qiuscolor">
							<view class="benbaise" :class="{actives:index===currenders}" @click="xuanzhongyanse(item)" v-for="(item,index) in yifucolor"
							 :key="index">{{item.name}}</view>
						</view>
					</view>


					<view class="goodscenter">
						<view class="goodscentercolorsss">尺码</view>
						<view class="qiuscolor">
							<view class="benbaise"  :class="{actives:index===currendersssss}" @click="xuae(item)" v-for="(item,index) in yifusize"
							 :key="index">{{item.name}}/码</view>

						</view>
					</view>

					<view class="goodslst">
						<view class="shuliang">购买数量</view>
						<view class="goodslength">
							<view class="shujiangjiajia">-</view>
							<view class="shujiangjiajia">1</view>
							<view class="shujiangjiajia">+</view>
						</view>
					</view>


					<view class="sure"  @click="gocartkaito">立即购买</view>

				</view>
			</u-popup>
		</view>



		<view>
			<u-toast ref="uToast" z-index="4000000000000"/>
		</view>

	</view>
</template>

<script>
	// let detailtarbar = document.getElementById("detailtarbar")

	// console.log(detailtarbar.style.opacity)
	import {
		Goods,
		Shop,
		GoodsParam
	} from "../../common/detail.js"
	import shopitem from "../../components/shopitem/shopitem"
	export default {
		components: {
			shopitem
		},
		data() {
			return {
				hodername: "k30纪念尊享版",
				swiper: [],
				/*轮播图下面的数据*/
				goods: {},
				/*获取商品参数信息*/
				paramInfo: {},
				/*商品详细信息*/
				detailInfo: {},
				share: [],
				opce: {
					opacity: 0
				},
				cc: 0,
				// 颜色分类尺码下面的三张图片
				listimg: [],
				// 宝贝详情的文字数据
				paramInfomini: [],
				// 时间戳
				timess: 0,
				shop: {},
				// 用户评价
				pingjia: "",
				// tarbar
				tarbars: ["宝贝", "评价", "详情", "推荐"],
				// tarbar选中的颜色
				currenindex: 0,
				// 弹出层选中的颜色
				currenders: 10,
				currendersssss: 20,
				pingjiaheight: 0,
				xiangqingheight: 0,
				tuijianheight: 0,
				scrollstop: 0,
				// 弹出层商品库存
				kucun: 0,
				// 购物车弹出层
				showshopping: false,
				showshoppingtwo: false,
				showshoppingthree: false,
				// 以下弹出层的数据
				yifucolor: [],
				yifusize: [],

				// vuex 保存需要的商品信息
				goodsname: 0,
				goodssize: 0,
				onepic: [],
				id: 0

			}
		},
		onLoad(option) {
			//搜索框的placehoder
			this.hodername = Object.keys(option)[0].slice(0, 10)
			//请求数据的id
			this.id = Object.keys(option)[0].slice(11)
			this.shopdessstails(this.id)

			this.getCommend()



		},
		computed: {
			// getpic() {
			// 	return  this.goods.columns[0]
			// },
			// oldgetpic() {
			// 	let prc = 2
			// 	this.share.slice(0, 1).forEach(i => {
			// 		 prc = i.discountPrice
			// 	})
			// 	return prc
			// }

		},
		updated() {
			// uni-app获取dom节点信息 
			//评价的高度
			let onenode = uni.createSelectorQuery().select(".pingjia")
			onenode.boundingClientRect((data) => {
				if (this.pingjiaheight > 0) {
					return
				}
				setTimeout(() => {
					this.pingjiaheight = data.top
				}, 300)

			}).exec()

			//详情的 高度
			let twonode = uni.createSelectorQuery().select(".babyxiangqing")
			twonode.boundingClientRect((data) => {
				if (this.xiangqingheight > 0) {
					return
				}
				setTimeout(() => {
					this.xiangqingheight = data.top
				}, 300)

			}).exec()
			//推荐的高度
			let threenode = uni.createSelectorQuery().select(".kanleyoukan")
			threenode.boundingClientRect((data) => {
				if (this.tuijianheight > 0) {
					return
				}
				setTimeout(() => {
					this.tuijianheight = data.top
				}, 300)
			}).exec()
		},
		methods: {
			//点击轮播图
			wsiperimg() {
				console.log(this.paramInfo)
				console.log(this.goods)
				console.log(this.shop)
				uni.previewImage({
					urls: this.swiper,
					current: 0
				})
			},
			//点击返回首页
			gohome() {
				uni.switchTab({
					url: "../Home/home/home"
				})
			},
			gosousuo() {
				uni.navigateTo({
					url: "/pages/search/search"
				})
			},
			//获取商品数据
			async shopdessstails(id) {

				let res = await this.$shopdetail({
					url: "/detail?iid=" + id
				})

				this.kucun = res.data.result.rate.cRate
				// 隐藏栏的商品颜色
				this.yifucolor = res.data.result.skuInfo.props[0].list.slice(0, 3)
				console.log(this.yifucolor)
				// 隐藏栏的商品尺码
				this.yifusize = res.data.result.skuInfo.props[1].list
				console.log(this.yifucolor)
				// 时间戳
				this.timess = res.data.result.rate.list[0].created
				console.log(this.timess)
				// 用户评价
				this.pingjia = res.data.result.rate.list[0].content

				this.swiper = res.data.result.itemInfo.topImages
				// 颜色分类尺码下面的三张图片 这些图片没有key 值 需要添加不然报错
				let alone = this.swiper.slice(0, 3)
				for (let i = 0; i < alone.length; i++) {
					this.listimg.push({
						name: alone[i]
					})
				}
				// this.listimg = this.swiper.slice(0, 3)
				console.log(this.listimg)

				/* 获取轮播图下面的商品信息*/
				this.goods = new Goods(res.data.result.itemInfo, res.data.result.columns, res.data.result.shopInfo.services)
				//获取月销数据
				this.cc = this.goods.columns[0]
				/* 创建店铺对象*/
				this.shop = new Shop(res.data.result.shopInfo);
				/*获取商品详细信息*/
				this.detailInfo = res.data.result.detailInfo;
				/*获取商品参数信息*/
				this.paramInfo = new GoodsParam(res.data.result.itemParams.info)
				// 宝贝详情的文字数据
				this.paramInfomini = this.paramInfo.infos

			},
			//滚动事件
			scroll(e) {
				// 滚动让tarbar 的opcity 值变化
				let heg = e.detail.scrollTop / 200
				this.opce.opacity = heg;
				let topss = e.detail.scrollTop
				if (topss > 0 && topss < this.pingjiaheight - 162) {
					this.currenindex = 0
				} else if (topss > this.pingjiaheight - 162 && topss < this.xiangqingheight - 156) {
					this.currenindex = 1
				} else if (topss > this.xiangqingheight - 156 && topss < this.tuijianheight - 166) {
					this.currenindex = 2
				} else if (topss > this.tuijianheight - 166) {
					this.currenindex = 3
				}
			},
			/*请求推荐数据*/
			async getCommend() {
				let {
					data
				} = await this.$shopdetail({
					url: '/recommend'
				})

				this.share = data.data.list

			},
			// 点击tarbar
			trbarindex(index) {
				if (this.opce.opacity <= 0.3) {
					return
				} else {
					if (index === this.currenindex) {
						return
					} else {
						this.currenindex = index
						switch (index) {
							case 0:
								this.scrollstop = 0
								break;
							case 1:
								this.scrollstop = this.pingjiaheight - 162
								break;
							case 2:
								this.scrollstop = this.xiangqingheight - 156
								break;
							case 3:
								this.scrollstop = this.tuijianheight - 166
								break;
						}
						console.log(this.scrollstop)
					}
				}
			},
			// 弹出商品层
			shoppings() {
				this.onepic = this.listimg.slice(0, 1)[0].name
				this.showshopping = true
				

			},
			chacha() {
				this.showshopping = false
			},
			// 点击购物车弹出商品层
			tianjiagouwuche() {
				this.onepic = this.listimg.slice(0, 1)[0].name
				this.showshoppingtwo = true
			},
			chachatwo() {
				this.showshoppingtwo = false
			},
			//点击立即购买弹出商品层
			tianjiagouwuthree() {
				this.onepic = this.listimg.slice(0, 1)[0].name
				this.showshoppingthree = true
			},
			chachathree() {
				this.showshoppingthree = false
			},
			// 弹出层选中的颜色
			xuanzhongyanse(items) {
				if(items.index - 1 === this.currenders){
					this.currenders = 10
					this.goodsname = 0
				}else{
					this.currenders = items.index - 1
					this.goodsname = items.name
				}		

			},
			xuae(item) {
				if(this.currendersssss === item.index - 100){
					this.currendersssss = 20
					this.goodssize = 0
				}else{
					this.currendersssss = item.index - 100
					this.goodssize = item.name
				}	
				
			},
			// 点击加入购物车
			gocart() {
				// 声明一个空对象保存数据到vuex 中
				let goodslist = {}
				if (this.goodsname === 0 || this.goodssize === 0) {
					// this.showshopping = false
					this.$refs.uToast.show({
						title: '请选择商品规格',
						duration: 1000
					})
				} else {
					console.log(this.goodsname)
					console.log(this.goodssize)
					goodslist.name = this.shop.name
					goodslist.pric = this.goods.realPrice
					goodslist.shopname = this.goods.title
					goodslist.size = this.goodssize
					goodslist.img = this.onepic
					goodslist.color = this.goodsname
					goodslist.id = this.id
					console.log(goodslist)
					this.$store.commit("carelistgoods", goodslist)
					this.showshopping = false,
					this.showshoppingtwo = false
					uni.showToast({
						title:"添加购物车成功",
						duration:1000
					})
				}

			},
			gocartkaito(){
				if (this.goodsname === 0 || this.goodssize === 0) {
					// this.showshopping = false
					this.$refs.uToast.show({
						title: '请选择商品规格',
						duration: 1000
					})
				}else{
					this.$refs.uToast.show({
						title: '该功能暂未开通',
						duration: 1500,
						type:"error",
						icon:false
					})
				}
				
			}

		}
	}
</script>

<style lang="scss">
	page {

		background-color: #f2f2f2;
	}

	.detailscroll {

		height: 100vh;
	}

	.detailtop {
		left: 0;
		right: 0;
		top: 0;
		z-index: 100000;
		position: fixed;
		display: flex;
		justify-content: space-around;
		background-color: #e1303c;
		height: 200rpx;

		.detailsosuo {
			top: 60rpx;

			color: black;
			width: 400rpx;
			height: 70rpx;
			border-radius: 40rpx;
			background-color: #FFFFFF;
			border: 2rpx solid #FFFFFF;
		}
	}

	.swiperheight {
		width: 100%;
		margin-top: 198rpx;
	}

	.goodsstyle {
		position: relative;
		top: 26rpx;
		width: 94%;
		height: 330rpx;
		background-color: #FFFFFF;
		margin-left: 22rpx;
		border-radius: 29rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;

		.goodsstyleone {
			padding-left: 30rpx;
			color: #ed7830;
			font-size: 34rpx;
			font-weight: bolder;
			letter-spacing: 2rpx;
		}

		.goodsstyletwo {
			position: relative;
			top: -7rpx;
			display: flex;
			justify-content: space-around;
			font-weight: 500;
			letter-spacing: 1rpx;

			.twoone {
				position: relative;
				left: -30rpx;
				color: #ed7830;
				height: 44rpx;
				line-height: 44rpx;
				background-color: #fbeee6;
				padding: 0 8rpx;
				border-radius: 10rpx;
			}

			.twotwo {
				border-radius: 10rpx;
				color: #ed7830;
				height: 44rpx;
				line-height: 44rpx;
				padding: 0 8rpx;
				background-color: #fbeee6;
				position: relative;
				left: -130rpx;

			}

			.twothree {
				position: absolute;
				right: 40rpx;
				color: #ed7830;
			}
		}

		.goodsstylethree {
			display: flex;
			justify-content: space-around;

			.threeone {
				background-color: #f4f7fe;
				color: #13308c;
				position: relative;
				left: -5rpx;
				height: 40rpx;
				padding: 0 10rpx;
				border-radius: 26rpx;
			}

			.threetwo {
				position: relative;
				left: -50rpx;
				color: #999999;
			}

			.threethree {
				color: #999999;
			}
		}

		.goodsstylefour {
			display: flex;
			justify-content: space-around;

			.fourone {
				position: relative;

				color: #FFFFFF;
				padding: 0 10rpx;
				height: 40rpx;
				border-radius: 30rpx;
				background-color: #906ac7;
			}

			.fourtow {
				width: 450rpx;
				position: relative;
				left: -30rpx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				font-weight: 600;
				font-size: 32rpx;
				letter-spacing: 2rpx;
			}
		}

		.goodsstylefive {
			display: flex;
			justify-content: space-around;
			color: #999999;
			letter-spacing: 2rpx;
		}
	}

	#detailtarbar {
		left: 0;
		right: 0;
		top: 200rpx;
		position: fixed;
		width: 100%;
		height: 70rpx;
		background-color: #e1303c;
		color: #FFFFFF;
		line-height: 70rpx;
		display: flex;
		z-index: 1000000000;
		justify-content: space-around;
		padding-bottom: 6rpx;

	}

	.active {
		border-bottom: 4rpx solid #ffff6b;
	}

	.detailgoods {
		background: #FFFFFF;
		position: relative;
		top: 52rpx;
		width: 94%;
		margin-left: 22rpx;
		border-radius: 29rpx;
		height: 360rpx;

		image {
			position: relative;
			border-radius: 10rpx;
			width: 56rpx;
			height: 56rpx;
			margin-left: 14rpx;
			left: -44rpx;
		}

		.goodsone {
			display: flex;

			.goodsoneone {
				color: #9b9b9b;
				position: relative;
				top: 20rpx;
				left: 20rpx;
				flex: 1;
			}

			.goodsonetwo {
				flex: 4;

				.goodsonetwocol {
					position: relative;
					top: 20rpx;
					left: -30rpx;
				}

				.goodsonethree {
					display: flex;
					position: relative;
					top: 44rpx;
					letter-spacing: 2rpx;

					.goodsoneonetext {
						width: 300rpx;
						height: 60rpx;
						position: relative;
						left: -20rpx;
						color: #9b9b9b;
						border-radius: 10rpx;
						line-height: 60rpx;
						text-align: center;
						background-color: #f2f2f2;
					}
				}
			}

		}
	}

	.detailcenter {
		position: relative;
		top: 74rpx;
		display: flex;
		justify-content: space-around;

		.fahuo {
			position: relative;
			left: -20rpx;
			color: #9b9b9b;
		}

		.housr {
			top: -6rpx;
			position: relative;
			left: -50rpx;
		}

		.kuaidi {
			position: relative;
			left: -96rpx;
		}

		.monue {
			color: #9b9b9b;
		}
	}

	.textsthree {
		top: 90rpx;
		position: relative;
		display: flex;
		justify-content: space-around;

		.textone {
			color: #9b9b9b;
			position: relative;
			left: -30rpx;
		}

		.textfour {
			position: relative;
			left: -84rpx;
		}
	}

	.last {
		display: flex;
		position: relative;
		top: 110rpx;
		left: 16rpx;
	}

	.lastone {
		color: #9b9b9b;
	}

	.lasttwo {
		position: relative;
		left: 30rpx;
	}

	.pingjia {
		background: #FFFFFF;
		position: relative;
		top: 80rpx;
		width: 94%;
		margin-left: 22rpx;
		border-radius: 29rpx;
		height: 400rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		image {
			position: relative;
			border-radius: 10rpx;
			width: 56rpx;
			height: 56rpx;
		}

		.pingjiaone {
			position: relative;
			top: 20rpx;
			left: 22rpx;

			display: flex;
			justify-content: space-between;

			.pingjiaonetwo {
				color: black;
				font-size: 30rpx;
				font-weight: 600;
			}

			.quanbu {
				color: #e95213;
				position: relative;
				right: 54rpx;
				font-size: 26rpx;
				top: 4rpx;
			}

			.time {
				top: 4rpx;
				position: relative;
				left: -70rpx;
				color: #999999;
			}
		}

		.pingjiatwo {
			display: flex;

			image {
				position: relative;
				left: 20rpx;
				border-radius: 50%;
			}

			.pingjianame {
				top: 6rpx;
				position: relative;
				left: 40rpx;
			}
		}

		.pingjiathree {
			width: 94%;
			padding-bottom: 26rpx;
			border-bottom: 2rpx solid #f4f4f4;
			position: relative;
			left: 24rpx;
			top: -10rpx;

		}
	}

	.pingjiathreefive {
		padding-bottom: 10rpx;
		display: flex;
		justify-content: space-between;
		position: relative;
		top: -14rpx;
		left: 26rpx;
		color: #999999;
	}

	.wendajia {
		top: -20rpx;
		position: relative;
		left: 26rpx;
		font-weight: 600;
		font-size: 30rpx;
	}

	.qutiwen {
		position: relative;
		right: 60rpx;
		color: #e95213;
		width: 100rpx;
		height: 40rpx;
		font-size: 22rpx;
		text-align: center;
		line-height: 40rpx;
		border: 2rpx solid #e95213;
		border-radius: 30rpx;
		padding: 0 8rpx;
	}

	.baobeidiyi {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: relative;
		top: 110rpx;
		background-color: #FFFFFF;
		width: 94%;
		margin-left: 22rpx;
		border-radius: 29rpx;

		.baobeidiyione {
			display: flex;
			justify-content: space-around;

			image {
				position: relative;
				top: 30rpx;
				width: 88rpx;
				left: -12rpx;
				height: 88rpx;
				border-radius: 20%;
			}

			.baobeidiyionename {
				position: relative;
				top: 30rpx;
				font-size: 32rpx;
				font-weight: 600;
				left: -60rpx;
			}

			.baobeidiyionefuwu {
				position: relative;
				top: 20rpx;
				font-size: 20rpx;
			}
		}

		.baobeidiyitwo {
			position: relative;
			top: 56rpx;
			display: flex;
			padding-bottom: 30rpx;
			border-bottom: 2rpx solid #f4f4f4;
			justify-content: center;
		}

		.jindian {
			width: 160rpx;
			height: 44rpx;
			border-radius: 30rpx;
			padding: 0 20rpx;
			text-align: center;
			line-height: 44rpx;
			color: #e95213;
			font-weight: 500;
			border: 2rpx solid #e95213;
			margin-right: 26rpx;
		}

		.quanbu {
			width: 160rpx;
			height: 44rpx;
			border-radius: 30rpx;
			padding: 0 20rpx;
			text-align: center;
			line-height: 44rpx;
			color: #e95213;
			font-weight: 600;
			border: 2rpx solid #e95213;
		}

		.baobeidiyithree {
			position: relative;
			top: 88rpx;
			display: flex;
			justify-content: space-between;

			.chuanzhuo {
				position: relative;
				color: black;
				left: 24rpx;
				letter-spacing: 2rpx;
				font-weight: 600;
				font-size: 30rpx;
			}

			.chakan {
				position: relative;
				color: #e95213;
				right: 28rpx;
				font-size: 26rpx;
				top: 3rpx;
				letter-spacing: 2rpx;

			}
		}

		.imges {
			position: relative;
			top: 120rpx;
			display: flex;
			flex-wrap: wrap;
			width: 94%;
			padding-bottom: 140rpx;
			justify-content: space-around;

			.btnimage {
				image {
					width: 210rpx;
					height: 200rpx;
					position: relative;
					left: 20rpx;

					border-radius: 10rpx;
				}
			}


		}
	}

	.babyxiangqing {
		position: relative;
		top: 130rpx;
		color: #b6b6b6;
		left: 50%;
		transform: translateX(-25%);
	}

	.canshu {
		top: 150rpx;
		position: relative;

		background-color: #FFFFFF;
		width: 94%;
		margin-left: 22rpx;
		border-radius: 29rpx;

	}

	.houbo {
		display: flex;
		border-bottom: 2rpx solid #efefef;
		padding: 16rpx 0;

		font-size: 28rpx;

		.houdu {
			margin-right: 40rpx;
			margin-left: 26rpx;
			font-weight: 600;
		}

		.yanse {
			color: #e95213;
		}
	}

	.swiperimgs {
		position: relative;
		top: 130rpx;
		background-color: #FFFFFF;
		width: 94%;
		margin-left: 22rpx;
		padding-bottom: 60rpx;
	}

	.swiperimgssdss {
		position: relative;
		top: 30rpx;
		left: 30rpx;

	}

	.kanleyoukan {
		position: relative;
		top: 160rpx;
		color: #e95213;
		left: 50%;
		transform: translateX(-25%);
	}

	.kanleyoukanone {
		position: relative;
		top: 178rpx;

	}

	.inlineblock {
		position: relative;
		height: 88vh;
		z-index: 100000000;
	}

	.inlineblocktop {
		display: flex;
		flex-direction: column;

		image {
			width: 200rpx;
			height: 200rpx;
		}

		.inlineblocktopone {
			top: 20rpx;
			position: relative;
			display: flex;
			justify-content: space-around;
			left: -24rpx;

			.inlineblockfalse {
				width: 40rpx;
				height: 40rpx;
				position: relative;
				right: -30rpx;
				border: 3rpx solid black;
				border-radius: 50%;
				text-align: center;
			}
		}

		.inlineblocktoptwo {
			position: relative;
			top: 20rpx;
			left: -60rpx;

			.inlineblocktopcolor {
				color: #ea531c;
				font-weight: 600;
				font-size: 36rpx;
			}

			.inlineblocktoptext {
				font-size: 26rpx;
				color: black;
			}

			.inlineblocktoptwomini {
				margin: 10rpx 0;
				font-size: 28rpx;
				color: #8e8e8e;
			}
		}
	}

	.inlineblocktopcenter {
		position: relative;
		top: 60rpx;
		display: flex;
		color: #8e8e8e;
		letter-spacing: 2rpx;
		left: 24rpx;
		justify-content: space-between;
		border-bottom: 2rpx solid #eeeeee;
		padding-bottom: 20rpx;

		.chakanchima {
			color: #ea531c;
			position: relative;
			right: 60rpx;
			font-size: 24rpx;

		}
	}

	.goodscenter {
		position: relative;
		top: 80rpx;
		display: flex;
		flex-direction: column;

		.goodscentercolor {

			position: relative;
			left: 20rpx;
			font-size: 32rpx;
		}

		.qiuscolor {
			display: flex;
			flex-wrap: wrap;

			border-bottom: 2rpx solid #eeeeee;
			padding-bottom: 20rpx;

			.benbaise {
				width: 230rpx;
				position: relative;
				margin-top: 20rpx;
				left: 20rpx;
				border: 3rpx solid #f5f5f5;
				;
				text-align: center;
				padding: 16rpx;
				border-radius: 20rpx;
				background-color: #f5f5f5;
				margin-right: 10rpx;
			}

		}
	}

	.goodscentercolorsss {
		padding-top: 20rpx;
		position: relative;
		left: 20rpx;
		font-size: 32rpx;
	}

	.goodslst {
		position: relative;
		top: 110rpx;
		display: flex;
		justify-content: space-between;

		.shuliang {
			position: relative;
			left: 24rpx;
			font-size: 34rpx;
		}

		.goodslength {
			position: relative;
			right: 20rpx;
			display: flex;
		}
	}

	.shujiangjiajia {
		width: 60rpx;
		height: 60rpx;
		line-height: 60rpx;
		border-radius: 10rpx;
		text-align: center;
		margin-right: 6rpx;
		background-color: #f1f1f1;
	}

	.lastbuttom {
		position: relative;
		top: 400rpx;
		justify-content: space-evenly;
		display: flex;

		.jiaru {
			background-color: #f09636;
			width: 330rpx;
			height: 80rpx;
			border-radius: 30rpx 0 0 30rpx;
			font-size: 34rpx;
			color: #FFFFFF;
			letter-spacing: 2rpx;
			font-weight: 600;
			line-height: 80rpx;
			text-align: center;
			position: relative;
			left: 26rpx;

		}

		.mashangqiang {
			font-weight: 600;
			position: relative;
			text-align: center;
			line-height: 80rpx;
			color: #FFFFFF;
			font-size: 34rpx;
			letter-spacing: 2rpx;
			left: -26rpx;
			background-color: #ec5d2a;
			width: 330rpx;
			border-radius: 0 30rpx 30rpx 0;
			height: 80rpx;
		}
	}

	.dibutarbar {
		display: flex;
		position: fixed;
		z-index: 100000000;
		right: 0;
		bottom: 0;
		background-color: #FFFFFF;
		width: 100%;
		height: 130rpx;

		justify-content: space-around;

		.lijitarbar {
			background-color: #f09636;
			width: 210rpx;
			height: 78rpx;
			border-radius: 30rpx 0 0 30rpx;
			font-size: 30rpx;
			color: #FFFFFF;
			letter-spacing: 2rpx;
			font-weight: 600;
			font-size: 26rpx;
			line-height: 78rpx;
			text-align: center;
			position: relative;
			left: 24rpx;
			top: 38rpx // position: relative;
				// left: 26rpx;
		}

		.jiarutarbar {
			background-color: #ec5d2a;
			width: 210rpx;
			height: 78rpx;
			border-radius: 0 30rpx 30rpx 0;
			font-size: 30rpx;
			color: #FFFFFF;
			font-size: 26rpx;
			letter-spacing: 2rpx;
			font-weight: 600;
			line-height: 78rpx;
			text-align: center;
			position: relative;
			top: 38rpx
		}

		.dibutarbarone {
			position: relative;
			top: 30rpx;
			left: 14rpx;
		}


	}

	.dibutarbarone {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-right: 16rpx;
	}

	.sure {
		background-color: #ec5d2a;
		width: 94%;
		height: 80rpx;
		border-radius: 30rpx;
		font-size: 34rpx;
		color: #FFFFFF;

		letter-spacing: 2rpx;
		font-weight: 600;
		line-height: 80rpx;
		text-align: center;
		position: relative;
		left: 26rpx;
		top: 400rpx;
	}

	.onetanchu {
 
		position: relative;
		z-index: 1000000000000;
	}

	.actives {
		color: #ed7830;
		border: 3rpx solid #ed7830 !important;
	}
	// 隐藏ios端的滚动条
	/deep/.uni-scroll-view::-webkit-scrollbar {
		display: none
	}
</style>
