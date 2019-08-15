export default {
  /*调用全部用户列表*/
  findAccountList: '/account/v1/findAccountList?page=1&pageSize=10',
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
};
