import {loginrequest} from "./natework.js";
export function userlogin(params){
	return loginrequest({
		url:'/login',
		method:"POST",
		data:params
	})
}