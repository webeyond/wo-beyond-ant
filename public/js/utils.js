export default {
  /**
   * 截取URL参数
   * @param {string} name 截取的key
   * @param {string} [url] 被截取的url
   * @returns {string} 截取的val
   */
  urlParam: (name, url) => {
    let reg = new RegExp('.*[&?]' + name + '=([^&]*)(&|$)');
    let r;
    if (!url) {
      r = window.location.search.match(reg);
    } else {
      r = url.match(reg);
    }
    if (r) return decodeURIComponent(r[1]);
    return '';
  },
  /**
   * 判断是否是手机号
   * @param {string} val 传进来的字符串
   */
  isMobile: val => {
    let reg = /^1[2|3|4|5|7|8][0-9]\d{8}$/;
    return reg.test(val);
  },

  //格式化对象输出字符串
  objectToString: function(obj) {
    if (obj) {
      return JSON.stringify(obj);
    } else {
      return '';
    }
  },

  //将字符串转化成对象
  stringToObject: function(str) {
    if (str) {
      return JSON.parse(str);
    } else {
      return null;
    }
  },

  //得到地址栏参数值
  getUrlParamValue: function(key) {
    let reg = new RegExp(key + '=([^&]*)');
    let results = location.href.match(reg);
    return results ? results[1] : null;
  },

  //获取格式化日期
  getFormatDate: function(fmt) {
    let d = new Date();
    let o = {
      'M+': d.getMonth() + 1, //月份
      'd+': d.getDate(), //日
      'h+': d.getHours(), //小时
      'm+': d.getMinutes(), //分
      's+': d.getSeconds(), //秒
      'q+': Math.floor((d.getMonth() + 3) / 3), //季度
      S: d.getMilliseconds(), //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (let k in o)
      if (new RegExp('(' + k + ')').test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
        );
    return fmt;
  },
};
