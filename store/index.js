import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		 username:'admin',
		 password:'123456',
		 carelist:[]
	},
	mutations:{
		carelistgoods(state,payload){
			
			let oldfoods = state.carelist.find(i=> i.id === payload.id && i.color === payload.color && i.size === payload.size)
			if(oldfoods){
				oldfoods.num +=1
				console.log(oldfoods)
			}else{
				payload.num = 1
				payload.check = false
				state.carelist.push(payload)
			}
		}
	},
	getters:{},
	actions:{},
	modules:{}
})
export default store;