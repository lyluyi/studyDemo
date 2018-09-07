import axios from 'axios'

export const api = process.env.REACT_APP_RECORDS_API_URL || "http://localhost:3004"

export const getRecords = () => axios.get(`${api}/records`) // 获取列表

export const createRecords = (param) => axios.post(`${api}/records`, param) // 新增列

export const updateRecords = (id, param) => axios.put(`${api}/records/${id}`, (param)) // 更新列

export const deleteRecords = (id, param) => axios.delete(`${api}/records/${id}`, (param)) // 删除列
