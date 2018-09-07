function list(state = { //设置初始化仓库数据
  loading: true,
  listData: []
}, action) {
  switch (action.type) { //判断事情类型
    case "LIST_SUCCESSGET":
      return { //返回新的对象
        loading: false,
        listData: action.data
      };
    default:
      return state;
  }
}
export default list