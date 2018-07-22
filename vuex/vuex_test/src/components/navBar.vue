<template>
 <nav class="navbar navbar-default">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <router-link :to="{ path: '/'}"><a class="navbar-brand" href="#">VuexTestBy_luyi</a></router-link>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li :class="{active: activeClass === 'acOne'}" @click="activeClick ('acOne')">
          <router-link :to="{ name: 'index', path: '/index'}"><span>iPhone 6S</span></router-link>
        </li>
        <li :class="{active: activeClass === 'acTwo'}" @click="activeClick('acTwo')">
          <router-link :to="{name: 'shop', path: '/shop'}"><span>购物车<span class="badge text-danger" v-text="cart.length" v-if="cart.length"></span></span></router-link>
        </li>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'navBar',
  data () {
    return {
      activeClass: 'acOne'
    }
  },
  computed: {
    ...mapGetters([
      'cart'
    ])
  },
  methods: {
    activeClick (val) {
      console.log(val)
      this.activeClass = val
      console.log(this.activeClass)
    }
  },
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.text-danger {
    color: #fff;
    background-color: #d9534f;
  }
</style>
