
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/Home/home/home","pages/Category/category/category","pages/Cart/cart/cart","pages/Profile/profile/profile","components/search/search","pages/search/search","components/shopitem/shopitem","pages/detail/detail","components/searchmini/searchmini","pages/goodsList/goodsList"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#ffff","scrollIndicator":"none"},"tabBar":{"backgroundColor":"#f9f9f9","selectedColor":"#ed7830","list":[{"pagePath":"pages/Home/home/home","iconPath":"static/icons/index.png","selectedIconPath":"static/icons/indexo.png","text":"首页"},{"pagePath":"pages/Category/category/category","iconPath":"static/icons/fenlei.png","selectedIconPath":"static/icons/fenleio.png","text":"分类"},{"pagePath":"pages/Cart/cart/cart","iconPath":"static/icons/cart.png","selectedIconPath":"static/icons/cartone.png","text":"购物车"},{"pagePath":"pages/Profile/profile/profile","iconPath":"static/icons/my.png","selectedIconPath":"static/icons/myo.png","text":"个人"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"MINI","compilerVersion":"2.9.8","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true},"window":{"navigationBarTitleText":" ","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#FFFFFF","bounce":"none","titleNView":false}},{"path":"/pages/Home/home/home","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTextStyle":"white","navigationBarBackgroundColor":"#ed7830","titleNView":false}},{"path":"/pages/Category/category/category","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"分类","titleNView":false,"scrollIndicator":"none"}},{"path":"/pages/Cart/cart/cart","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"购物车","titleNView":false}},{"path":"/pages/Profile/profile/profile","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"个人中心","navigationBarBackgroundColor":"#ed7830"}},{"path":"/components/search/search","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/search/search","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"titleNView":false}},{"path":"/components/shopitem/shopitem","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/detail/detail","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"titleNView":false}},{"path":"/components/searchmini/searchmini","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/goodsList/goodsList","meta":{},"window":{"enablePullDownRefresh":false,"navigationBarTitleText":"商品列表","navigationBarBackgroundColor":"#ed7830","navigationBarTextStyle":"white"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});