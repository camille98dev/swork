/* eslint-disable */
import axios from "axios";
import router from "./../router/index";

// const token = sessionStorage.getItem("token")
//   ? sessionStorage.getItem("token")
//   : "";

const url = "https://api.swork.work/management/v1";

const axiosInstance = axios.create({
  baseURL: url,
  // headers: {
  //   "Content-Type": "application/json",
  //   Authorization: `Bearer ${token}`,
  // },
});

axiosInstance.interceptors.request.use(config => {
	// console.log("interceptors config", config)
	if (localStorage.getItem("api_token")) {
		config.headers['Authorization'] = 'Bearer ' + localStorage.getItem("api_token")
	}
	config.headers["Content-Type"] = "application/json";
	return config
})

axiosInstance.interceptors.response.use(res => {
	// console.log("interceptors use", res)
	return res
}, err => {
	// console.log("interceptors err", err.response)

  var msg = err.response.data.msg;

	if ([401].includes(err.response.status)) {
		setTimeout(() => {
      console.log("token expired")
			sessionStorage.removeItem('token');
			localStorage.removeItem('api_token');
			router.push('/')
		}, 2500);
	}
	return Promise.reject(err)
})

export default axiosInstance;
