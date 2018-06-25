App.vue：

<template>
  <div id="app">
    <img src="./assets/logo.png">
    
    <p>总价：{{price}}</p>
    <myvuex></myvuex>
  </div>
</template>

<script>
  import myvuex from './components/MyVuex.vue'
  import { mapState } from 'vuex' // 辅助函数

  export default {
    name: 'App',
    components: {
      myvuex
    },
    computed: mapState(['price']), // 6.消费
    methods: {}
  }
</script>