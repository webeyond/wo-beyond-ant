export default {
  /*调用全部用户列表*/
  findAccountList: '/account/v1/findAccountList',
  /*删除用户*/
  deleteAccount: '/account/v1/deleteAccount',
  /*新增用户*/
  insertAccount: '/account/v1/insertAccount',
  /*修改用户*/
  updateAccount: '/account/v1/updateAccount',
  /*登录*/
  login: '/v1/login',
  /*获取签约用户数量*/
  selectSignCustomerCount: '/statistics/v1/selectSignCustomerCount',
  /*获取签约用户前五名*/
  selectAccountTopFive: '/statistics/v1/selectAccountTopFive',
  /*获取区域签约数量*/
  selectDistrictSignCount: '/statistics/v1/selectDistrictSignCount',
  /*获取最热套餐TOP5*/
  selectProdTopFive: '/statistics/v1/selectProdTopFive',
  /*获取靓号热度分析*/
  selectSerialHeatAnalysis: '/statistics/v1/selectSerialHeatAnalysis',
  /*获取签约漏斗图*/
  selectSignFunnelCount: '/statistics/v1/selectSignFunnelCount',
  /*获取订单列表*/
  selectOrderList: '/statistics/v1/selectOrderList',
};
