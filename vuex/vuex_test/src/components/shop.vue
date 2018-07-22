<template>
<div>
  <navBar/>
  <div class="container">
    <div class="row" v-if="cart.length">
      <div class="panel panel-danger">
        <div class="panel-heading" role="tab" id="headingOne">
          <h4 class="panel-title">
            <a role="button">
             <span class="glyphicon glyphicon-shopping-cart"></span>
             <span>购物车</span>
             <span class="pull-right">总计: {{ totalPrice }}</span>
            </a>
          </h4>
        </div>
        <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
          <div class="panel-body">
            <ul>
              <li v-for="(item, index) in cart" :key="index">
                <span class="pomegranage glyphicon glyphicon-remove-circle" @click="removeItem(index)"></span>
                <span>Apple/苹果 iPhone6s</span>
                <span class="label label-success" v-text="item.type"></span>
                <span class="badge text-danger" v-text="item.count"></span>
                <span class="cart-price pomegranage pull-right"><strong v-text="item.price"></strong></span>
              </li>
            </ul>
          </div>
        </div>
    </div>
  </div>
  <div class="row empty" v-if="!cart.length">
    购物车空
  </div>
</div>
</div>
</template>

<script>
import navBar from './navBar'
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'shop',
  data () {
    return {
    }
  },
  computed: {
    'totalPrice': function () { // 映射 this.totalPrice 为 totalPrice    不能使用箭头函数 上下文会绑定 访问不到vue 实例
      let totalALL = 0
      for (let i in this.cart) {
        totalALL += this.cart[i].price
      }
      return totalALL
    },
    ...mapGetters([
      'cart'
    ])
  },
  methods: {
    ...mapActions([
      'removeItem'
    ])
  },
  components: {
    navBar
  }
}
</script>

<style>
.empty {
  min-height: 200px;
  border: 3px dashed #ccc;
  text-align: center;
  color: red;
  font-size: 24px;
  font-weight: bold;
  line-height: 200px;
}
ul {
  padding: 0;
}

ul> li {
  list-style: none;
}
.pomegranage {
    color: #c0392b;
}
.text-danger{
  background: red;
  color: white;
}
#collapseOne li{
  padding: 8px 4px;
}
</style>
