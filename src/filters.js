const MyPlugin = {};
import moment from 'moment'

MyPlugin.install = function (Vue, options) {
  Vue.filter('omitTitle', function (data, arg) {
    if (data.length > arg) {
      return data.slice(0, arg) + '...';
    } else {
      return data;
    }
  });
  Vue.filter('format', function (data, arg) {
    if (data.length > arg) {
      return data.slice(0, arg) + '...';
    } else {
      return data;
    }
  });
  /**
   * 由关系总览type输出同**
   */
  Vue.filter('seachTypeTrans', function (data) {
    if (data) {
      // if ($.type(data) == 'array') {
      //   let arr = [];
      //   for (let i = 0; i < data.length; i++) {
      //     arr.push(seachTypeList[i].name);
      //   }
      //   return arr.join('、');
      // }
      if (parseInt(data) > seachTypeList.length) {
        return data
      }
      return seachTypeList[parseInt(data) - 1].name;
    } else {
      return '';
    }
  });
  Vue.filter('seachTypeTransByAll', function (data) {
    if (data) {
      if (parseInt(data) > seachTypeList.length) {
        return data
      }
      let str = [];
      for (let i = 0; i < data.length; i++) {
        str.push(seachTypeList[data[i].type-1].name)
      }
      return str.join(',');
    } else {
      return '';
    }
  });

  Vue.prototype.alertSearchIndex = function (data, arg, omitTitleIndex) {
    if (!arg) {
      return data
    }
    var Arr = arg.split(",");
    Arr[1] = Arr[0] - 0 + 1 + (Arr[1] - 0);
    var str;
    if (data.length > omitTitleIndex) {
      data = data.slice(0, omitTitleIndex);
      str = data.slice(0, Arr[0]) + "<span class='alertSearchIndex'>" + data.slice(Arr[0], Arr[1] - 1) + "</span>" + data.slice(Arr[1] - 1) + "...";
    } else {
      str = data.slice(0, Arr[0]) + "<span class='alertSearchIndex'>" + data.slice(Arr[0], Arr[1] - 1) + "</span>" + data.slice(Arr[1] - 1);
    }

    return str;
  }

  //性别过滤器
  Vue.filter('sexFilter', function (sex) {
    return sex === 'F' || sex === '女' ? '女' : '男'
  });
  Vue.filter('dateFormat', (data, format) => {
    if (!format) {
      format = "YYYY/MM/DD HH:mm:ss"
    }
    return moment(data).format(format);
  });
  /**
   * 过滤人员重点标签
   */
  Vue.filter('searchPersonZDBQFilter', (data) => {
    for (let i = 0; i < searchPersonZDBQ.length; i++) {
      if (searchPersonZDBQ[i].key === data) {
        return searchPersonZDBQ[i].value
      }
    }
  })
};
export default MyPlugin;
