<template>
  <div>
<!--search bar layout-->
    <div class="search-bar">
      <van-row gutter="5">
        <van-col span="3"><img :src="locationIcon" width="60%" class="location-icon" /></van-col>
        <van-col span="16">
          <input type="text" class="search-input"/>
        </van-col>
      <van-col span="5"><van-button size="mini" style=" margin-top: .3rem; margin-left:.4rem" >查找</van-button></van-col>
      </van-row>
    </div>

    <!--swipwer area-->
    <div class="swiper-area">
      <van-swipe :autoplay="1000">
          <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
              <img :src="banner.image" v-lazy="banner.image" width="100%"/>
          </van-swipe-item>
      </van-swipe>
    </div>

    <div class="type-bar">
      <div  v-for="(cate,index) in category" :key="index" >
        <img v-lazy="cate.image" width="90%" />
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>

    <!--AD banner area-->
    <div class="ad-banner">
      <img v-lazy="adBanner.PICTURE_ADDRESS" width="100%" v-if='imgShow'>
    </div>

    <!--Recommend goods area-->
    <div class="recommend-area">
      <div class="recommend-title">
          商品推荐
      </div>
      <div class="recommend-body">
      </div>
    </div>

      <!--swiper-->
      <!-- <swiperDefault/> -->

      <!--floor one area-->
      <floorComponent :floorData="floor1" :floorTitle="floorName.floor1" :titleIndex="1"></floorComponent>
      <floorComponent :floorData="floor2" :floorTitle="floorName.floor2" :titleIndex="2"></floorComponent>
      <floorComponent :floorData="floor3" :floorTitle="floorName.floor3" :titleIndex="3"></floorComponent>

            <!--Hot Area-->
      <div class="hot-area">
          <div class="hot-title">热卖商品</div>
          <div class="hot-goods">
            <!--这里需要一个list组件-->
            <van-row gutter="20">
              <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
                  <goodsInfo :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goodsInfo>
              </van-col>
            </van-row>
          </div>
      </div>
  </div>
</template>
<script>
import axios from 'axios'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import floorComponent from '../floor/floorComponent'
import goodsInfo from '../goodsInfoComponent'
import url from '../../serviceAPI/config.js'
// import swiperDefault from '../swiper/swiperDefault'
export default {
  data () {
    return {
      locationIcon: require('../../assets/images/location.png'),
      bannerPicArray: [], // 轮播
      category: [], // 菜单
      adBanner: {PICTURE_ADDRESS: ''},
      recommendGoods: [],
      floor1:[],         //楼层1的数据
      floor2:[],         //楼层2的数据
      floor3:[],         //楼层3的数据
      floorName:{},      //楼层名称
      hotGoods:[], //热卖商品
      imgShow: false
    }
  },
  created () {
    axios({
      url: url.getShoppingMallInfo,
      method: 'get'
    })
      .then(response => {
        if (response.status === 200) {
          this.bannerPicArray = response.data.data.slides
          this.category = response.data.data.category
          this.adBanner.PICTURE_ADDRESS = response.data.data.advertesPicture.PICTURE_ADDRESS // 获得广告图片
          this.recommendGoods = response.data.data.recommend // 推荐商品
          this.floor1 = response.data.data.floor1              //楼层1数据
          this.floor2 = response.data.data.floor2              //楼层2数据
          this.floor3 = response.data.data.floor3              //楼层3数据
          this.floorName = response.data.data.floorName        //楼层名称
          this.hotGoods = response.data.data.hotGoods           //热卖商品
        }
        this.imgShow = true
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  },
  method: {
    filters:{
    moneyFilter(money){
        return toMoney(money)
    }  
},  
  },
  components: {
    swiper,
    swiperSlide,
    // swiperDefault
    floorComponent,
    goodsInfo
  }
}

</script>
<style scoped>
  .search-bar{
      padding-top: .5rem;
      background-color: #e5017d;
      padding-bottom: .2rem;
      /* line-height:2.2rem; */
  }
  .search-input{
      width:100%;
      /* height: 1.8rem;/ */
      border-top:0px;
      border-left:0px;
      border-right:0px;
      border-bottom: 1px solid #fff !important ;
      background-color: #e5017d;
      color:#fff;
  }
  .location-icon{
      padding-top: .1rem;
      padding-left: .5rem;
  }
  .swiper-area{
      width:100%;
      clear:both;
  }
  .type-bar{
      background-color: #fff;
      margin:0 .3rem .3rem .3rem;
      border-radius: .3rem;
      font-size:14px;
      display: flex;
      flex-direction:row;
      flex-wrap:nowrap;
  }
  .type-bar div{
      padding: .3rem;
      font-size: 12px;
      text-align: center;
  }
  .recommend-area{
       background-color: #fff;
       margin-top: .3rem;
  }
  .recommend-title{
      border-bottom:1px solid #eee;
      font-size:14px;
      padding:.2rem;
      color:#e5017d;
  }
  .recommend-body{
      border-bottom: 1px solid #eee;
  }
  .recommend-item{
    width:99%;
    border-right: 1px solid #eee;
    font-size: 12px;
    text-align: center;
  }
  .hot-area{
      text-align: center;
      font-size:14px;
      height: 1.8rem;
      line-height:1.8rem;
  }
</style>
