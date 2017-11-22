/**
 * Created by admin on 2017/7/18.
 */
import base64 from 'base-64';
import moment from 'moment';
import MD5 from 'js-md5';
import router from './router';
import Vue from 'vue';
// import EDpass from '../static/encryption.js'

const MyPlugin = {};
MyPlugin.install = function (Vue, options) {
  var bus = new Vue();
  window.moment = moment;
  window.Bus = bus;
  window.MD5 = MD5;
  // window.EDpass=EDpass;
  /*获取当前dom节点位置*/
  window.getAbsCoordinates = function (e) {
    var pos = {top: 0, left: 0};
    while (e) {
      pos.left += e.offsetLeft;
      pos.top += e.offsetTop;
      e = e.offsetParent;
    }
    return pos;
  };
  window.BASE64 = base64;
  Array.prototype.arrAddKey = function (key, value) {
    for (var i = 0; i < this.length; i++) {
      this[i][key] = value;
    }
    return this
  };
  Array.prototype.clone = function () {
    return JSON.parse(JSON.stringify(this))
  };
  Array.prototype.getRandomArrayElements = function (count) {
    var arr = this;
    var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
    while (i-- > min) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }
    return shuffled.slice(min);
  };
  //查看数组里有没有这个值
  Array.prototype.hasValue = function (str) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] === str) {
        return true;
      }
    }
    return false;
  };
  /**
   * 变化数组里某个元素位置
   * @param to  到达位置
   * @param from  某个元素坐标
   * @returns {Array}
   */
  Array.prototype.changeEleIndex = function (to, from) {
    to = parseInt(to);
    from = parseInt(from);
    if (to < 0 || to > this.length - 1 || from < 0 || from > this.length - 1) {
      return this;
    }
    var ele = this[from];
    if (from > to) {
      this.splice(to, 0, ele);
      this.splice(from + 1, 1)
    } else {
      this.splice(to + 1, 0, ele);
      this.splice(from, 1)
    }
    return this;
  };
  window.storage = {
    set (key, value) {
      localStorage.setItem(key, JSON.stringify(value))
    },
    get (key) {
      return JSON.parse(localStorage.getItem(key));
    },
    clear() {
      localStorage.clear();
    },
    remove(key) {
      localStorage.removeItem(key)
    }
  };
  window.Storage = {
    set (key, value) {
      sessionStorage.setItem(key, JSON.stringify(value))
    },
    get (key) {
      return JSON.parse(sessionStorage.getItem(key));
    },
    clear() {
      sessionStorage.clear();
    },
    remove(key) {
      sessionStorage.removeItem(key)
    }
  };
  window.ajaxCore = {
    timeout: 60000,
    //async不可以传null,你可以不传
    ajax: function (url, data, method, headers, noloading, async, noAlert) {
      var index;
      if (!noloading) {
        index = layer.load(0, {skin: "layer-load"});
      }
      var _config;
      //如果你传的是{}的配置
      if (arguments.length === 1 && $.type(url) === 'object') {
        _config = url;
      } else {
        _config = {
          url: config.appCode + url,
          type: method,
          headers: headers,
          data: data,
          timeout: ajaxCore.timeout,
          async: async === null ? true : async,
          cache: false
        }
      }
      var defer = $.Deferred();
      if (!method) {
        method = "POST";
      } else {
      }
      var globalXHR = $.ajax(_config).success((res) => {
        if (!noloading) {
          layer.close(index);
        }
        res.status = parseInt(res.status);
        defer.resolve(res);
        if (res.desc === '传入token不正确!' && !noAlert) {
          layer.open({content: '登录过期或者您已从其他地方登陆'});
          Bus.$emit('to-Right-loginOut', true)
        }
        switch (res.status) {
          case 10001:
            break;
          case 10002:
            break;
          case 10003:
            break;
          case 10004:
            // $state.go('login');$rootScope.login_out();
            break;
          case 10005:
            router.push('/login');
            Storage.clear();
            break;
        }
      }).error((res, status) => {
        layer.close(index);
        defer.reject(res);
        if (res.statusText == 'timeout' && !noAlert) {
          layer.alert('连接超时');
        } else if (status == 'error' && res.status == 500 && !noAlert) {
          layer.alert('后台接口处理异常');
        } else if (status == 'error' && !noAlert) {
          layer.alert('连接后台接口异常');
        }
      });
      return defer;
    },
    ajax2: function (url, data, method, headers, noloading, async, noAlert) {
      if (!noloading) {
        var index = layer.load(0, {skin: "layer-load"});
      }
      var defer = $.Deferred();
      if (!method) {
        method = "POST";
      } else {
      }
      var globalXHR = $.ajax({
        url: config.appCode + url,
        timeout: ajaxCore.timeout,
        type: method,
        headers: headers,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        cache: false,
        async: async === null ? true : async
      }).success(function (res) {
        res.status = parseInt(res.status);
        if (!noloading) {
          layer.close(index);
        }
        defer.resolve(res);
        if (res.desc === '传入token不正确!') {
          lauer.open({content: '登录过期或者您已从其他地方登陆'});
          Bus.$emit('to-Right-loginOut')
        }
        switch (res.status) {
          case 10001:
            break;
          case 10002:
            break;
          case 10003:
            break;
          case 10004://token过期
            // $state.go('login');$rootScope.login_out();
            break;
        }
      }).error(function (res, status) {
        layer.close(index);
        if (res.statusText == 'timeout') {
          layer.msg('连接超时');
        } else if (status == 'error' && res.status == 500) {
          layer.msg(arguments[2] ? arguments[2] : '后台接口处理异常');
        } else if (status == 'error') {
          layer.msg(arguments[2] ? arguments[2] : '后台接口处理异常');
        }
      });
      return defer;
    }
  };
  //随机6位数
  window.getRandom6 = function () {
    return parseInt(Math.random() * Math.pow(10, 6));
  };

  window.getToken = function () {
    return Storage.get('loginresult') ? Storage.get('loginresult').token : false
  };
  // 1. 添加全局方法或属性
  Vue.myGlobalMethod = function () {
    // 逻辑...
  };
  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind(el, binding, vnode, oldVnode) {
      // 逻辑...
    }
  });
  // 3. 注入组件
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
  });
  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (options) {
    // 逻辑...
  };
  //是否正整数
  window.isPositiveNum = (data) => {
    var re = /^[0-9]*[1-9][0-9]*$/;
    return re.test(data)
  };
  /**
   *路由 返回
   *
   */
  window.goBack = () => {
    window.history.go(-1);
  };
  //静态小图标
  window.ICONS = {
  };
  /**
   *
   * @constructor
   */
  window.UrlSearch = function () {
    var name, value;
    var str = location.href; //取得整个地址栏
    var num = str.indexOf("?")
    str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]

    var arr = str.split("&"); //各个参数放到数组里
    for (var i = 0; i < arr.length; i++) {
      num = arr[i].indexOf("=");
      if (num > 0) {
        name = arr[i].substring(0, num);
        value = arr[i].substr(num + 1);
        this[name] = value;
      }
    }
  };
  window.getPoliceId = () => {
    let loc = window.location.href;
    let data1 = loc.split('?');
    let text = data1[1];
    if (text != "" && text != undefined) {
      let data2 = text.split('=');
      return data2[1];
    } else {
      return ""
    }
  }
  /**
   *传入动态水印内容
   */
  window.watermark = function (settings) {
    //默认设置
    var defaultSettings = {
      watermark_txt: "公安局",
      watermark_x: 100,//水印起始位置x轴坐标
      watermark_y: 20,//水印起始位置Y轴坐标
      watermark_rows: 20,//水印行数
      watermark_cols: 20,//水印列数
      watermark_x_space: 100,//水印x轴间隔
      watermark_y_space: 50,//水印y轴间隔
      watermark_color: 'rgba(255,255,255,.15)',//水印字体颜色
      watermark_alpha: 0.3,//水印透明度
      watermark_fontsize: '18px',//水印字体大小
      watermark_font: '微软雅黑',//水印字体
      watermark_width: 120,//水印宽度
      watermark_height: 80,//水印长度
      watermark_angle: 15//水印倾斜度数
    };
    //采用配置项替换默认值，作用类似jquery.extend
    if (arguments.length === 1 && typeof arguments[0] === "object") {
      var src = arguments[0] || {};
      for (var key in src) {
        if (src[key] && defaultSettings[key] && src[key] === defaultSettings[key])
          continue;
        else if (src[key])
          defaultSettings[key] = src[key];
      }
    }

    var oTemp = document.createDocumentFragment();

    //获取页面最大宽度
    var page_width = Math.max(document.body.scrollWidth, document.body.clientWidth);
    //获取页面最大长度
    var page_height = Math.max(document.body.scrollHeight, document.body.clientHeight);

    //如果将水印列数设置为0，或水印列数设置过大，超过页面最大宽度，则重新计算水印列数和水印x轴间隔
    if (defaultSettings.watermark_cols == 0 ||
      (parseInt(defaultSettings.watermark_x
        + defaultSettings.watermark_width * defaultSettings.watermark_cols
        + defaultSettings.watermark_x_space * (defaultSettings.watermark_cols - 1))
        > page_width)) {
      defaultSettings.watermark_cols =
        parseInt((page_width
          - defaultSettings.watermark_x
          + defaultSettings.watermark_x_space)
          / (defaultSettings.watermark_width
            + defaultSettings.watermark_x_space));
      defaultSettings.watermark_x_space =
        parseInt((page_width
          - defaultSettings.watermark_x
          - defaultSettings.watermark_width
          * defaultSettings.watermark_cols)
          / (defaultSettings.watermark_cols - 1));
    }
    //如果将水印行数设置为0，或水印行数设置过大，超过页面最大长度，则重新计算水印行数和水印y轴间隔
    if (defaultSettings.watermark_rows == 0 ||
      (parseInt(defaultSettings.watermark_y
        + defaultSettings.watermark_height * defaultSettings.watermark_rows
        + defaultSettings.watermark_y_space * (defaultSettings.watermark_rows - 1))
        > page_height)) {
      defaultSettings.watermark_rows =
        parseInt((defaultSettings.watermark_y_space
          + page_height - defaultSettings.watermark_y)
          / (defaultSettings.watermark_height + defaultSettings.watermark_y_space));
      defaultSettings.watermark_y_space =
        parseInt((page_height
          - defaultSettings.watermark_y
          - defaultSettings.watermark_height
          * defaultSettings.watermark_rows)
          / (defaultSettings.watermark_rows - 1));
    }
    var x;
    var y;
    for (var i = 0; i < defaultSettings.watermark_rows; i++) {
      y = defaultSettings.watermark_y + (defaultSettings.watermark_y_space + defaultSettings.watermark_height) * i;
      for (var j = 0; j < defaultSettings.watermark_cols; j++) {
        x = defaultSettings.watermark_x + (defaultSettings.watermark_width + defaultSettings.watermark_x_space) * j;

        var mask_div = document.createElement('div');
        mask_div.id = 'mask_div' + i + j;
        mask_div.appendChild(document.createTextNode(defaultSettings.watermark_txt));
        //设置水印div倾斜显示
        mask_div.style.webkitTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
        mask_div.style.MozTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
        mask_div.style.msTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
        mask_div.style.OTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
        mask_div.style.transform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
        mask_div.style.visibility = "";
        mask_div.style.position = "absolute";
        mask_div.style.left = x + 'px';
        mask_div.style.top = y + 'px';
        mask_div.style.overflow = "hidden";
        mask_div.style.zIndex = settings.zIndex === undefined ? '-1' : settings.zIndex;
        //mask_div.style.border="solid #eee 1px";
        mask_div.style.opacity = defaultSettings.watermark_alpha;
        mask_div.style.fontSize = defaultSettings.watermark_fontsize;
        mask_div.style.fontFamily = defaultSettings.watermark_font;
        mask_div.style.color = defaultSettings.watermark_color;
        mask_div.style.textAlign = "center";
        mask_div.style.width = defaultSettings.watermark_width + 'px';
        mask_div.style.height = defaultSettings.watermark_height + 'px';
        mask_div.style.display = "block";
        oTemp.appendChild(mask_div);
      }
      ;
    }
    if (settings.parentNode) {
      settings.parentNode.appendChild(oTemp)
      settings.parentNode.style.position = 'relative'
      settings.parentNode.style.overflow = 'hidden'
    } else {
      document.body.appendChild(oTemp);
    }
  };
  /**
   * Vue的全局方法  高亮关键字
   */
  Vue.prototype.markSearchResult = function (data, markWordArr) {
    if (!data) {
      return ''
    }
    ;
    for (let i = 0; i < markWordArr.length; i++) {
      if (!markWordArr[i]) {
        break
      }
      data = data.replace(eval('/(' + markWordArr[i] + ')+/g'), '<span class="slcl-color">' + markWordArr[i] + '</span>');
    }
    return data
  };
  /**
   * 高亮身份证
   * @param data
   * @param flag 后台传来的身份证标识  sfz[] sfz2[]
   * @param currentKEY 当前key
   * @returns {*}
   */
  Vue.prototype.markSearchResultSFZ = function (data, flag, currentKEY) {
    for (let i = 0; i < flagByWang.length; i++) {
      for (let j = 0; j < flag[flagByWang[i]].length; j++) {
        if (flag[flagByWang[i]][j] === currentKEY) {
          return '<span class="slcl-color-sfz">' + data + '</span>';
        }
      }
    }
    // if (flag.sfz && flag.sfz.length > 0) {
    //   for (let i = 0; i < flag.sfz.length; i++) {
    //     if (currentKEY === flag.sfz[i]) {
    //       return '<span class="slcl-color-sfz">' + data + '</span>';
    //     }
    //   }
    // }
    // if (flag.sfz && flag.sfz2.length > 0) {
    //   for (let i = 0; i < flag.sfz2.length; i++) {
    //     if (currentKEY === flag.sfz2[i]) {
    //       return '<span class="slcl-color-sfz">' + data + '</span>';
    //     }
    //   }
    // }
    return data
  };
  /**
   * 高亮手机号  以确定是手机号
   * @param data
   * @param flag 后台传来的身份证标识  sfz[] sfz2[]
   * @param currentKEY 当前key
   * @returns {*}
   */
  Vue.prototype.markSearchResultPHONE = function (data, flag, currentKEY) {
    data = data.split(';');
    for (let i = 0; i < data.length; i++) {
      data[i] = '<span class="slcl-color-phone" index="' + data[i] + '">' + data[i] + '</span>';
    }
    return data.join(';');
  };
  /**
   *由关系type输出关系详情
   */
  Vue.prototype.relationsGetName1 = function (arr) {
    if ($.type(arr) !== 'array') {
      return arr
    }
    let str = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < seachTypeList.length; j++) {
        if (arr[i] == j + 1) {
          str.push(seachTypeList[j].name)
        }
      }
    }

    if (arr.length === 1) {
      str = "关系详情:" + str[0]
    } else if (arr.length >= 1) {
      str = "关系类总数:" + arr.length
    }
    return str
  };
  Vue.prototype.relationsGetName2 = function (arr) {
    if ($.type(arr) !== 'array') {
      return arr
    }
    let str = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < seachTypeList.length; j++) {
        if (arr[i] == j + 1) {
          str.push(seachTypeList[j].name)
        }
      }
    }
    return str.join(',')
  };
  /**
   * 红名单
   */
  Vue.prototype.geCanQuery = function (keyword) {
    return new Promise((resolve, reject) => {
      if (!keyword) {
        resolve({status: '10001'});
        return;
      }
      ajaxCore.ajax(config.isQuery, {
        keyword: keyword
      }, "POST", {
        Authorization: BASE64.encode(getRandom6() + ':' + getToken())
      }).done((res) => {
        resolve(res)
        if (res.status != '10001') {
          layer.alert(res.desc);
        }
      }).fail((res) => {
        reject(res)
      });
    })
  };
  /**
   * 缓存个人信息
   * @param type
   */
  Vue.prototype.storagePerson = function (type, tableTitleNameFlagType, tableTitleNameFlagValue, sfhm, rowid, personAtTableId, personAtTableName, newKeyWord) {
    let ob = {};
    ob['tableTitleNameFlagType'] = tableTitleNameFlagType;
    ob['tableTitleNameFlagValue'] = tableTitleNameFlagValue;

    if (type === 1) {
      Storage.set('personDetail1', $.extend(ob, {
//              sfhm: this.contextmenuWho[this.tableTitleNameFlag['sfz'][0]],//用主身份证
//              rowid: this.contextmenuWho.rowid,
//              personAtTableName: this.rightShowBoxAjaxRequest.tableName,
//              personAtTableId: this.rightShowBoxAjaxRequest.TableId,
//              name: this.contextmenuWho.name,
        }
      ));
    } else if (type === 2) {
      Storage.set('personDetail2', {
        sfhm: sfhm,//用主身份证
        personAtTableId: personAtTableId,
      });
    } else if (type === 3) {
      Storage.set('personDetail3', {
        sfhm: sfhm,//用主身份证
        personAtTableId: personAtTableId,
      });
    } else if (type === 4) {
      Storage.set('personDetail4', {
        sfhm: sfhm,//用主身份证
        rowid: rowid,
        personAtTableName: personAtTableName,
        personAtTableId: personAtTableId,
        newKeyWord: newKeyWord
      });
    }
  }
};
export default MyPlugin;
