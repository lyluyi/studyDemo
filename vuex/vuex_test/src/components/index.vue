<template>
<div>
  <navBar/>
  <div class="container">
    <div class="product col-md-offset-2 col-sm-offset-2 col-md-8 col-sm-8">
      <div class="row">
        <div class="col-md-6 col-sm-6">
          <img :src="iPhone6S.activeStyleUrl" alt="" class="img-responsive">
        </div>
        <div class="col-md-6 col-sm-6">
            <h3 v-text="iPhone6S.name"></h3>
            <hr>
            <div class="list">
              <dl class="dl-horizontal">
                <div class="pFlex">
                  <dt>描述：</dt>
                  <span v-text="iPhone6S.desc"></span>
                </div>
                <dd>价格：<span style="color:red;font-weight:bold;">¥{{iPhone6S.price}}</span></dd>
                <dd>
                  <span style="float:left;">外观：</span>
                  <span v-for="(item, index) in iPhone6S.style"  class="sStyle" v-text="item.color" v-bind:key="index"
                  :class="{activing: iPhone6S.activeStyleUrl===item.url}"
                  @click="changeStyleActive(item.url, item.color)"
                  ></span>
                </dd>
                <dd>
                  <span style="float:left;"> 存储容量：</span>
                  <span v-for="(item, index) in iPhone6S.storage" class="sStyle" v-text="item.type" v-bind:key="index"
                  :class="{activing: iPhone6S.price == item.price}"
                  @click="changePriceActive(item.type, item.price)"
                  ></span>
                </dd>
              </dl>
            </div>
             <button type="button" class="btn btn-danger" style="width:100%;">加入购物车</button>
        </div>
        <hr>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import navBar from '@/components/navBar'
import shop from '@/components/shop'
import {mapState} from 'vuex'
// import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'

export default {
  data () {
    return {
    }
  },
  created () {
    console.log(this.$store)
  },
  computed: {
    ...mapState([
      'iPhone6S'
    ])
  },
  methods: {
    changePriceActive () {

    },
    changeStyleActive (url, color) {
      console.log(this)
      console.log(this.iPhone6S)
      this.iPhone6S.activeStyleUrl = url
    }
  },
  components: {
    navBar,
    shop
  }
}
</script>

<style>
.dl-horizontal dt,dd{
    color: #95a5a6;
    height: 44px;
    text-align: left;
    overflow: hidden;
    width: auto;
}
.dl-horizontal dd,dd:hover{
    margin-left: 0;
    line-height:44px;
}
.dl-horizontal dt {
  white-space: nowrap;
  width: 60px ;
  display: inline-block;
}
.pFlex {
  display:flex;
}
.pFlex span{
  display:inline-block;
}
.sStyle{
  display: inline-block;
  height: 24px;
  margin-right: 4px;
  padding: 0 8px;
  border: 2px solid #eee;
  margin-top: 8px;
  text-align: center;
  line-height: 21px;
  color: black;
}
.sStyle:hover{
  border: 2px solid red;
  cursor: pointer;
}
.activing{
  border: 2px solid red;
}
</style>
