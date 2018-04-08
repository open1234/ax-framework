<template>
  <div class="hello-world">
    {{msg}}
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'hello ax-cordova-vue project!!!'
      }
    }
  }
</script>

<style scoped lang="less">
  .hello-world {
    color: #42b983;
  }
</style>
