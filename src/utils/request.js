import http from './axiosInstance'
import { api } from "./api";

const uploadtoken = (data) => {
	return http({
		url: `${api.uploadtoken}`,
		method: 'post',
		data: data,
	})
}

const getProjectUichecks = (id, data) => {
	return http({
		url: `${api.getProjectUichecks}${id}`,
		method: 'post',
		data: data,
	})
}

const addProjectUicheck = (id, data) => {
	return http({
		url: `${api.addProjectUicheck}${id}`,
		method: 'post',
		data: data,
	})
}

const getProjectUicheck = (id, sub_id, data) => {
	return http({
		url: `${api.getProjectUicheck}${id}/${sub_id}`,
		method: 'post',
		data: data,
	})
}

const deleteProjectUicheck = (id, sub_id, data) => {
	return http({
		url: `${api.deleteProjectUicheck}${id}/${sub_id}`,
		method: 'post',
		data: data,
	})
}

const updateProjectUicheck = (id, sub_id, data) => {
	return http({
		url: `${api.updateProjectUicheck}${id}/${sub_id}`,
		method: 'post',
		data: data,
	})
}
export default {
	uploadtoken,
	getProjectUichecks,
	addProjectUicheck,
	getProjectUicheck,
	deleteProjectUicheck,
	updateProjectUicheck
}