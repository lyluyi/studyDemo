<template>
  <div>
    <!--<p>总价：{{this.$store.state.price}}</p>-->
    <button @click="purchase">购买</button>
    <button @click="sold">出售</button>
  </div>
</template>

<script>
  export default {
    methods: {
      purchase () {
        this.$store.commit('purchase', 5) // 通过commit方法控制mutations中的方法
      },
      sold () {
        this.$store.commit('sold', 2);
      }
    }
  }
</script>