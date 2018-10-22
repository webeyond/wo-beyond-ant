import $ from 'jquery';

//后台接口地址
let interfaceUrl = 'http://10.52.200.23/';
//let interfaceUrl = 'http://localhost:8000';
//返回数据
let retData = null;

// //获取用户token
// let userToken = "blank";
// let sTemp = localStorage.getItem('token');
// if(sTemp) {
//   userToken = sTemp;
// }
//
// //获取登录用户ID
// let userID = 0;
// let userinfo = JSON.parse(localStorage.getItem('userInfo'));
// if(userinfo) {
//   userID = userinfo.id;
// }

// token: userToken,
//   userid: userID

const apiRequest = {
  /**
   * author pengge
   * @param url 后台接口地址
   * @param param 入参
   * desc:调用后台接口
   * return: data.code=0 成功
   *       data.code=-1失败 data.msg 失败原因
   *       "" 返回空，证明网络等其他原因所致(与后台交互失败)
   */
  //同步post方式请求数据
  postUrlData: function (url, param) {
    retData = null;
    let paramFormat = JSON.stringify(param);
    $.ajax(interfaceUrl + url, {
      data: paramFormat,
      dataType: 'json',
      type: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 20000,
      async: false,
      success: function (data) {
        if (data) {
          retData = data;
        } else {
          retData = null;
        }
      },
      error: function (data) {
        retData = null;
      }
    });
    return retData;
  },

  //异步post方式请求数据
  postAsyncUrlData: function (url, param, callback) {
    var paramFormat = JSON.stringify(param);
    $.ajax(interfaceUrl + url, {
      data: paramFormat,
      dataType: 'json',
      type: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 20000,
      async: true,
      success: function (data) {
        if (data) {
          callback(data);
        } else {
        }
      },
      error: function (data) {
      }
    });
  },

  //异步get方式请求数据
  getAsyncUrlData: function (url, param, callback) {
    $.ajax(interfaceUrl + url, {
      data: param,
      dataType: 'json',
      type: 'GET',
      headers: {},
      timeout: 20000,
      async: true,
      success: function (data) {
        if (data) {
          callback(data);
        } else {
        }
      },
      error: function (data) {

      }
    });
  }
};
export default apiRequest;
