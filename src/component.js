export default {
  install(Vue, options) {
    //默认人员头像
    Vue.prototype.initPerson=require('./assets/initperson.png');
    Vue.prototype.successLoadImg = function(event) {
      // console.log(event);
      if (event.target.complete == true) {
        // event.target.classList.remove("default-image");
        // var imgParentNode = event.target.parentNode;
        // if(imgParentNode.classList.contains('show-img')==true){
        //   imgParentNode.style.background = "#000";
        // }
      }
    };
    Vue.prototype.errorLoadImg = function(event) {
      // event.target.classList.add("default-image");;
      // console.log(event);
      event.target.src=Vue.prototype.initPerson;
    };
    Vue.component('VueImg', {
      props: ['src', 'className'],
      template: "<img v-if='src' :src='src' :class='className' @load=\"successLoadImg\" @error=\"errorLoadImg\"/>" +
      "<img v-else :src='initPerson'  />",
    })
  }
}
