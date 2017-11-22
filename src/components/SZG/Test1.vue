<script>

  export default {
    data() {
      return {}
    },
    computed: {
      AAA() {
        console.log(this.$store.state);
        return this.$store.state.QuanJingTongSerchBgBBB.AAA
      },
      text(){
        return this.$store.state.PlainIndex.text
      }
    }
  }
</script>
<template>
  <div style="color:red;">
    {{AAA}}请看这里！！{{text}}
  </div>
</template>
<style>

</style>
