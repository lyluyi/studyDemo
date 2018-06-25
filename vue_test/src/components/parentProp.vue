<template>
    <div>
        parent: <input type="text" v-model="pTxt">
        <child  :ctxtData="pTxt" @ctop="pChange" /> 
        <!-- watch 监听 父组件向下传递的prop数据后，将子组件中的value作出相应的改变，子组件中写好的方法@ctop -->
    </div>
</template>

<script>
import child from './child.vue'
export default {
    data () {
        return {
            pTxt: 'test'
        }
    },
    components: {
        child
    },
    methods: {
        pChange (cldnews) {
            this.pTxt = cldnews
        }
    }
}    
</script>
