<template>
    <div>
        child: <input type="text" v-model="ctxt" >
    </div>
</template>

<script>

export default {
    data () {
        return {
            ctxt: 123,
        }
    },
    props: {
        ctxtData: {
            type: String
        }
    },
    watch:  {
        ctxtData: function (val,oldVal) {
           console.log(this.ctxtData)
           console.log('new: %s, old: %s', val, oldVal, "\n ===============")
           this.ctxt = val  
       },
        ctxt: function (val,oldVal) {
           console.log(this.ctxt)
           console.log('new: %s, old: %s', val, oldVal)
           this.ctxt = val
           this.$emit('ctop', this.ctxt)       
        }
    }
}    
</script>

