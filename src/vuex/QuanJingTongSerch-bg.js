const QuanJingTongSerchBg = {
  state: {
    AAA:"今晨傻逼",
    imgList: [
      // {url: require("../../assets/qjt/bg.jpg")},
      // {url: require("../../assets/qjt/imgList2.png")},
      // {url: require("../../assets/qjt/imgList3.png")},
      // {url: require("../../assets/qjt/imgList4.png")},
      // {url: require("../../assets/qjt/imgList5.png")},
      // {url: require("../../assets/qjt/imgList6.png")},
      // {url: require("../../assets/qjt/imgList7.png")},
      // {url: require("../../assets/qjt/imgList8.png")},
      // {url: require("../../assets/qjt/imgList9.png")},
    ],
    imgListBackUp: [
      // {url: require("../../assets/qjt/bg.jpg")},
      // {url: require("../../assets/qjt/imgList2.png")},
      // {url: require("../../assets/qjt/imgList3.png")},
      // {url: require("../../assets/qjt/imgList4.png")},
      // {url: require("../../assets/qjt/imgList5.png")},
      // {url: require("../../assets/qjt/imgList6.png")},
      // {url: require("../../assets/qjt/imgList7.png")},
      // {url: require("../../assets/qjt/imgList8.png")},
      // {url: require("../../assets/qjt/imgList9.png")},
    ],
    imgShowIndex: 0,
    inv: 2000,
    isShow: true,
    direction: ""

  },
  getters: {
    // prevIndex(state) {
    //   var length = state.imgList.length;
    //   if (state.imgShowIndex === 0) {
    //     return length - 1
    //   }
    //   else {
    //     return state.imgShowIndex - 1
    //   }
    // },
    // nextIndex(state) {
    //   var length = state.imgList.length;
    //   if (state.imgShowIndex === length - 1) {
    //     return 0
    //   }
    //   else {
    //     return state.imgShowIndex + 1
    //   }
    // },
    // /**
    //  * 中间那块div背景显示颜色
    //  * @param state
    //  * @param getters
    //  * @param rootState
    //  * @returns {*|rgba|{props}}
    //  */
    // imgListCurrentRGBA(state, getters, rootState) {
    //   return state.imgList[state.imgShowIndex].rgba
    // }
  },
  mutations: {
    // imgShowIndexMU(state, arg, rootState) {
    //   state.imgShowIndex = arg;
    //   /**
    //    * 还要做后台记录
    //    */
    //   if (state.imgList[arg].id) {
    //     ajaxCore.ajax(config.updateBgPic, {
    //       picId: state.imgList[arg].id
    //     }, "GET", {
    //       Authorization: BASE64.encode(getRandom6() + ':' + getToken())
    //     },true).done((res) => {
    //       if (res.status == "10001") {
    //       } else {
    //         layer.alert(res.desc)
    //       }
    //     })
    //   }
    //
    // },
    // /**
    //  * 全景通 背景向后
    //  * @param state
    //  */
    // imgShowIndexAdd(state) {
    //   var length = state.imgList.length;
    //   if (state.imgShowIndex < length) {
    //     state.imgShowIndex++;
    //   } else {
    //     state.imgShowIndex = 0;
    //   }
    // },
    // /**
    //  * 全景通 背景图 向前
    //  * @param state
    //  */
    // imgShowIndexDel(state) {
    //   var length = state.imgList.length;
    //   if (state.imgShowIndex > 0) {
    //     state.imgShowIndex--;
    //   } else {
    //     state.imgShowIndex = length - 1;
    //   }
    // },

  },
  actions: {
    imgShowIndexgoto(store, index) {
      store.state.isShow = false;
      if ((index === 0 && store.state.imgShowIndex === 1) || (index !== 0 && index < store.state.imgShowIndex) || (store.state.imgShowIndex === 0 && index === store.state.imgList.length - 1)) {
        store.state.direction = 'left';
      } else {
        store.state.direction = 'right';
      }
      setTimeout(() => {
        store.state.isShow = true;
        store.commit("imgShowIndexMU", index);
      }, 0)
    },
    ajaxBackBG(store) {
      ajaxCore.ajax(config.getBackgroundPic, null, "POST", {
        Authorization: BASE64.encode(getRandom6() + ':' + getToken())
      }).done((res) => {
        if (res.status == "10001") {
          store.state.imgList = [];
          var list = res.result.bgimg;
          list.map((item, index) => {
            store.state.imgList.push({url: item.picpath, id: item.id, rgba: item.rgba});
          });
          //当前背景图片
          for (let i = 0; i < store.state.imgList.length; i++) {
            if (store.state.imgList[i].id == res.result.imgId) {
              store.state.imgShowIndex=i;
              break;
            }
          }
          //如果缓存中的index超过了list的长度,归为0
          if (store.state.imgShowIndex > list.length - 1) {
            store.state.imgShowIndex = 0;
          }
        }
      })
    }
  }
};
export default QuanJingTongSerchBg
