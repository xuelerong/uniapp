export function Goods(itemInfo, columns, services) {
	this.title = itemInfo.title
	this.desc = itemInfo.desc
	this.newPrice = itemInfo.price
	this.oldPrice = itemInfo.oldPrice
	this.discount = itemInfo.discountDesc
	this.discountBgcolor = itemInfo.discountBgcolor
	this.realPrice = itemInfo.lowNowPrice
	this.columns = columns
	this.services = services
}

export function Shop(shopInfo) {
	this.name = shopInfo.name
	this.shopLogo = shopInfo.shopLogo
	this.score = shopInfo.score
	this.cSells = shopInfo.cSells
	this.cGoods = shopInfo.cGoods
}

export function GoodsParam(info) {
	this.image = info.images ? info.images[0] : '';
	this.infos = info.set;
}
