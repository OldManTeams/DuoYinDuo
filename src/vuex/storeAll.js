import Vuex from "vuex";
import Vue from 'vue'
import util from '../util.js';
import moment from 'moment'
import storeS from './storeS.js';
import storeJ from './storeJ.js';
Vue.use(util);

Vue.use(Vuex);
//全景通  中间 一堆checkbox
const CheckboxList = {
  //zh_cnFirst 中文首字母
  //list-alertSearchIndex 匹配到的字符高亮  下标
  //searchLength单个组中匹配searchModel得到的个数
  state: {
    allClose: false,//ul是否全部打开
    allChecked: false,//checked是否全部打钩
    list: [
      // {
      //   typeName: '人员',
      //   total: 43,
      //   showChildren: true,
      //   titleImg: require("../assets/qjt/titleImg2.png"),
      //   list: [{name: '常住人口信息啊1', checked: false}, {name: "暂住人口信息", checked: false}, {
      //     name: "暂住人口信息",
      //     checked: false
      //   }, {name: "暂住人口信息", checked: false}, {name: "暂住人口信息", checked: false}, {
      //     name: "暂住人口信息",
      //     checked: false
      //   }, {name: "暂住人口信息", checked: false}, {name: "暂住人口信息", checked: false}, {
      //     name: "暂住人口信息",
      //     checked: false
      //   }, {name: "暂住人口信息", checked: false}, {name: "暂住人口信息", checked: false}, {
      //     name: "暂住人口信息",
      //     checked: false
      //   }, {name: "暂住人口信息", checked: false}, {name: "暂住人口信息", checked: false}, {
      //     name: "暂住人口信息",
      //     checked: false
      //   }, {name: "暂住人口信息", checked: false}, {name: "暂住人口信息", checked: false}, {
      //     name: "暂住人口信息",
      //     checked: false
      //   }, {name: "暂住人口信息", checked: false}, {name: "暂住人口信息", checked: false}, {
      //     name: "暂住人口信息",
      //     checked: false
      //   }, {name: "暂住人口信息", checked: false}, {name: "暂住人口信息", checked: false}, {
      //     name: "暂住人口信息",
      //     checked: false
      //   }, {name: "暂住人口信息", checked: false}, {name: "暂住人口信息", checked: false}, {
      //     name: "暂住人口信息",
      //     checked: false
      //   }, {name: "暂住人口信息", checked: false}, {name: "暂住人口信息", checked: false}, {
      //     name: "暂住人口信息",
      //     checked: false
      //   }, {name: "暂住人口信息", checked: false}, {name: "暂住人口信息", checked: false}, {
      //     name: "暂住人口信息",
      //     checked: false
      //   }, {name: "暂住人口信息", checked: false}, {name: "暂住人口信息", checked: false}, {
      //     name: "暂住人口信息",
      //     checked: false
      //   }, {name: "暂住人口信息", checked: false}, {name: "暂住人口信息", checked: false}, {
      //     name: "暂住人口信息",
      //     checked: false
      //   }, {name: "暂住人口信息", checked: false}, {name: "暂住人口信息", checked: false}, {
      //     name: "暂住人口信息",
      //     checked: false
      //   }, {name: "暂住人口信息", checked: false}, {name: "暂住人口信息", checked: false}, {
      //     name: "暂住人口信息",
      //     checked: false
      //   }, {name: "暂住人口信息", checked: false},]
      // }, {
      //   typeName: '物品',
      //   total: 43,
      //   showChildren: false,
      //   titleImg: require("../assets/qjt/titleImg3.png"),
      //   list: [{name: '常住人口信息不2', checked: false}, {name: "暂住人口信息", checked: false}, {
      //     name: "暂住人口信息",
      //     checked: false
      //   }, {name: "暂住人口信息", checked: false}, {name: "暂住人口信息", checked: false}, {
      //     name: "暂住人口信息",
      //     checked: false
      //   }, {name: "暂住人口信息", checked: false}, {name: "暂住人口信息", checked: false}, {
      //     name: "暂住人口信息",
      //     checked: false
      //   }, {name: "暂住人口信息", checked: false}, {name: "暂住人口信息", checked: false}, {
      //     name: "暂住人口信息",
      //     checked: false
      //   }, {name: "暂住人口信息", checked: false}, {name: "暂住人口信息", checked: false}, {
      //     name: "暂住人口信息",
      //     checked: false
      //   }, {name: "暂住人口信息", checked: false}, {name: "暂住人口信息", checked: false}, {
      //     name: "暂住人口信息",
      //     checked: false
      //   }, {name: "暂住人口信息", checked: false}, {name: "暂住人口信息", checked: false}, {
      //     name: "暂住人口信息",
      //     checked: false
      //   }, {name: "暂住人口信息", checked: false}, {name: "暂住人口信息", checked: false}, {
      //     name: "暂住人口信息",
      //     checked: false
      //   }, {name: "暂住人口信息", checked: false}, {name: "暂住人口信息", checked: false}, {
      //     name: "暂住人口信息",
      //     checked: false
      //   }, {name: "暂住人口信息", checked: false}, {name: "暂住人口信息", checked: false}, {
      //     name: "暂住人口信息",
      //     checked: false
      //   }, {name: "暂住人口信息", checked: false}, {name: "暂住人口信息", checked: false}, {
      //     name: "暂住人口信息",
      //     checked: false
      //   }, {name: "暂住人口信息", checked: false}, {name: "暂住人口信息", checked: false}, {
      //     name: "暂住人口信息",
      //     checked: false
      //   }, {name: "暂住人口信息", checked: false}, {name: "暂住人口信息", checked: false}, {
      //     name: "暂住人口信息",
      //     checked: false
      //   }, {name: "暂住人口信息", checked: false}, {name: "暂住人口信息", checked: false}, {
      //     name: "暂住人口信息",
      //     checked: false
      //   }, {name: "暂住人口信息", checked: false}, {name: "暂住人口信息", checked: false}, {
      //     name: "暂住人口信息",
      //     checked: false
      //   }, {name: "暂住人口信息", checked: false},]
      // }, {
      //   typeName: '物品物品',
      //   total: 43,
      //   showChildren: false,
      //   titleImg: require("../assets/qjt/titleImg3.png"),
      //   list: [{name: '常住人口信息的物品3', checked: false}, {name: "暂住人口信息", checked: false}, {
      //     name: "暂住人口信息",
      //     checked: false
      //   }, {name: "暂住人口信息", checked: false}, {name: "暂住人口信息", checked: false}, {
      //     name: "暂住人口信息",
      //     checked: false
      //   }, {name: "暂住人口信息", checked: false}, {name: "暂住人口信息", checked: false}, {
      //     name: "暂住人口信息",
      //     checked: false
      //   }, {name: "暂住人口信息", checked: false}, {name: "暂住人口信息", checked: false}, {
      //     name: "暂住人口信息",
      //     checked: false
      //   }, {name: "暂住人口信息", checked: false}, {name: "暂住人口信息", checked: false}, {
      //     name: "暂住人口信息",
      //     checked: false
      //   }, {name: "暂住人口信息", checked: false}, {name: "暂住人口信息", checked: false}, {
      //     name: "暂住人口信息",
      //     checked: false
      //   }, {name: "暂住人口信息", checked: false}, {name: "暂住人口信息", checked: false}, {
      //     name: "暂住人口信息",
      //     checked: false
      //   }, {name: "暂住人口信息", checked: false}, {name: "暂住人口信息", checked: false}, {
      //     name: "暂住人口信息",
      //     checked: false
      //   }, {name: "暂住人口信息", checked: false}, {name: "暂住人口信息", checked: false}, {
      //     name: "暂住人口信息",
      //     checked: false
      //   }, {name: "暂住人口信息", checked: false}, {name: "暂住人口信息", checked: false}, {
      //     name: "暂住人口信息",
      //     checked: false
      //   }, {name: "暂住人口信息", checked: false}, {name: "暂住人口信息", checked: false}, {
      //     name: "暂住人口信息",
      //     checked: false
      //   }, {name: "暂住人口信息", checked: false}, {name: "暂住人口信息", checked: false}, {
      //     name: "暂住人口信息",
      //     checked: false
      //   }, {name: "暂住人口信息", checked: false}, {name: "暂住人口信息", checked: false}, {
      //     name: "暂住人口信息",
      //     checked: false
      //   }, {name: "暂住人口信息", checked: false}, {name: "暂住人口信息", checked: false}, {
      //     name: "暂住人口信息",
      //     checked: false
      //   }, {name: "暂住人口信息", checked: false}, {name: "暂住人口信息", checked: false}, {
      //     name: "暂住人口信息",
      //     checked: false
      //   }, {name: "暂住人口信息", checked: false},]
      // }
    ],
    listBACKUP: []//list的备份  方便初始化
  },
  getters: {
    //中文转拼音
    zh_cn_list(state, getters, rootState) {
      let list = JSON.parse(JSON.stringify(state.list));
      for (var i = 0; i < list.length; i++) {
        list[i].zh_cnFirst = "";
        list[i].zh_cn = list[i].typeName;
        for (var ii = 0; ii < list[i].typeName.length; ii++) {
          list[i].zh_cnFirst += codefans_net_CC2PY(list[i].typeName[ii]).slice(0, 1);
        }
        for (var j = 0; j < list[i].list.length; j++) {
          list[i].list[j].zh_cnFirst = "";
          list[i].list[j].zh_cn = list[i].list[j].name;
          for (var ii = 0; ii < list[i].list[j].name.length; ii++) {
            list[i].list[j].zh_cnFirst += codefans_net_CC2PY(list[i].list[j].name[ii]).slice(0, 1);
          }
        }
      }
      return list;
    },
    //        被选中的checkbox长度
    checkedLength(state, getters, rootState) {
      let length = 0;
      for (var i = 0; i < state.list.length; i++) {
        for (var j = 0; j < state.list[i].list.length; j++) {
          if (state.list[i].list[j].checked) {
            length++;
          }
        }
      }
      return length;
    },
    //  过滤 用户输入后的list
    listBySearch(state, getters, rootState) {
      let list = JSON.parse(JSON.stringify(getters.zh_cn_list)), searchModel = rootState.QuanJingTongSerch.searchModel;
      //未输入  返回全部
      if (!searchModel) {
        return JSON.parse(JSON.stringify(state.list));
      }
      let reg1 = new RegExp('^[\u4e00-\u9fa5]+$'),
        reg2 = new RegExp('^[a-zA-Z]+$'),
        reg3 = new RegExp('^[0-9]+$');
      //中文
      var testReg;
      if (reg1.test(searchModel)) {
        console.log('中文');
        testReg = 'zh_cn';

      } else if (reg2.test(searchModel)) {
        console.log('字母');
        searchModel = searchModel.toLocaleUpperCase();
        testReg = 'zh_cnFirst';
      } else if (reg3.test(searchModel)) {
        console.log('数字');
        testReg = 'zh_cn';
      } else {
        console.log('组合');
        testReg = 'zh_cn';
      }
      for (var i = 0; i < list.length; i++) {
        var index_indexof = list[i][testReg].indexOf(searchModel);
        if (index_indexof !== -1) {
          list[i].alertSearchIndex = index_indexof + ',' + (searchModel.length);
        } else {
        }
        //记录自己有多少个匹配到的  ==0 showChildren=true
        var length = 0;
        for (var j = 0; j < list[i].list.length; j++) {
          //如果父级是true,自己全部展示
          list[i].list[j].hidden = false;
          var index_of = list[i].list[j][testReg].indexOf(searchModel);
          if (index_of !== -1) {
            list[i].list[j].alertSearchIndex = index_of + ',' + (searchModel.length)
            length++;
          } else if (index_of === -1) {
            list[i].list[j].hidden = true;
          }
        }
        list[i].searchLength = length;
      }
      return list;
    },
    listBySearchCheckedLength(state, getters, rootState) {
      let length = 0;
      for (let i = 0; i < getters.listBySearch.length; i++) {
        for (let j = 0; j < getters.listBySearch[i].list.length; j++) {
          if (!getters.listBySearch[i].list[j].hidden) {
            length++;
          }
        }
      }
      return length
    }
  },
  mutations: {
    CheckboxListMU(state, arg) {
      state.list = JSON.parse(JSON.stringify(arg));
    },
    CheckboxListBACKUPMU(state, arg) {
      state.listBACKUP = JSON.parse(JSON.stringify(arg));
    },
    toggleOneList(state) {
      var list = state.list;
      for (var i = 0, num = 0; i < list.length; i++) {
        if (!list[i].showChildren) {
          num++;
        }
      }
      state.allClose = num === list.length ? true : false;
    },
    /**
     * 展开所有
     * @param state
     */
    toggleAllList: function (state) {
      var list = state.list;
      for (var i = 0; i < list.length; i++) {
        list[i].showChildren = state.allClose;
      }
      state.allClose = !state.allClose
    },
    initCheckboxList(state) {
      state.allChecked = false;
      state.list = [];
      state.listBACKUP = [];
    }
  },
  actions: {
    /**
     * 初始化 tree树的结构
     * @param store
     * @param arg
     */
    initTreeList(store, arg) {
      store.state.list = JSON.parse(JSON.stringify(store.state.listBACKUP));
    },
    ajaxTreeList({state, commit, rootState}, arg) {
      ajaxCore.ajax(config.getSelectTree, null, "GET", {
        Authorization: BASE64.encode(getRandom6() + ':' + getToken())
      }).done((res) => {
        if (res.status == "10001") {
          var reslist = res.result, list = [];
          //response的数据格式变成我自己的
          reslist.map((item1, index1) => {
            list[index1] = {};
            list[index1].id = reslist[index1].num;
            list[index1].typeName = reslist[index1].name;
            list[index1].showChildren = true;
            list[index1].titleImg = item1.iconUrl;
            list[index1].list = [];
            reslist[index1].data.map((item2, index2) => {
              list[index1].list[index2] = {};
              list[index1].list[index2].name = reslist[index1].data[index2].name;
              list[index1].list[index2].id = reslist[index1].data[index2].id;
              list[index1].list[index2].checked = false;
              list[index1].list[index2].count = -1;


            })
          });
          state.list = list;
          state.listBACKUP = JSON.parse(JSON.stringify(list));
          //缓存数据
          Storage.set('CheckboxListBACKUPMU', state.list);
          //给所有全选
          store.dispatch('toggleAllChk', true)
        } else {
          layer.alert(res.desc)
        }
      })
    },
    /**
     * 改变所有打勾状态
     * @param store
     * @param arg
     */
    toggleAllChk: function (store, bool) {
      var listOrigin = store.state.list;
      var list = store.getters.listBySearch;
      for (var i = 0; i < list.length; i++) {
        for (var j = 0; j < list[i].list.length; j++) {
          //this.$set(list[i].list[j], 'checked', !state.allChecked);
          if (store.rootState.QuanJingTongSerch.searchModel) {
            if (list[i].list[j].alertSearchIndex) {
              listOrigin[i].list[j].checked = bool
            } else {
              listOrigin[i].list[j].checked = false
            }
          } else {
            listOrigin[i].list[j].checked = bool
          }
        }
      }
      // if (!store.state.allChecked)
      //   $(".top input:checkbox").prop("checked", !store.state.allChecked);
      // else
      //   $(".top input:checkbox").removeProp("checked");
      store.state.allChecked = !store.state.allChecked;
      // state.list = list
    },
    /**
     * 改变一个组的全选状态
     * arg={checked:  ,  number:组序号  }
     * @param store
     * @param arg
     */
    toggleOnePartChecked(store, arg) {
      var listOrigin = store.state.list[arg.number];
      var list = store.getters.listBySearch[arg.number];
      for (var i = 0; i < list.list.length; i++) {
        if (store.rootState.QuanJingTongSerch.searchModel) {
          if (list.list[i].alertSearchIndex) {
            listOrigin.list[i].checked = arg.checked;
          } else {
            listOrigin.list[i].checked = false;
          }
        } else {
          listOrigin.list[i].checked = arg.checked;
        }
      }
      // if (!store.state.allChecked)
      //   $(".top input:checkbox").prop("checked", !store.state.allChecked);
      // else
      //   $(".top input:checkbox").removeProp("checked");
      // state.list = list
    }
  }
};

const store = new Vuex.Store({
  modules: {
    ...storeS,...storeJ
  },
  state: {
    mainBg: "",
    windowWidth: "",
    windowHeight: "",
    loginResult: Storage.get('loginresult'),
  },
  mutations: {
    windowWidthMU(state, arg) {
      state.windowWidth = arg;
    },
    windowHeightMU(state, arg) {
      state.windowHeight = arg;
    },
    loginResultMU(state, arg) {
      state.loginResult = arg;
    },
    /**
     * 设置loginResult的isShow 1 并缓存
     * @param state
     * @param arg
     */
    setLoginResultIsShow(state, arg) {
      state.loginResult.isShow = arg;
      Storage.set('loginresult', state.loginResult)
    },
    /**
     * 设置loginResult的question 1 并缓存
     * @param state
     * @param arg
     */
    setLoginResultuestion(state, arg) {
      state.loginResult.question = arg;
      Storage.set('loginresult', state.loginResult)
    }
  },
  getters: {
    /**
     * 水印文字
     * @param state
     * @param getters
     */
    watermark_txt(state, getters) {
      if (state.loginResult) {
        let str = state.loginResult.userName + ' (' + state.loginResult.loginName + ') ' + new moment().format('YYYY-MM-DD');
        return str;
      } else {
        return false
      }

    }
  },
  actions: {}
});

export default store;

