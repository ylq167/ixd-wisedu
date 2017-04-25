<template>
  <div>
    <router-view></router-view>
    <div class="tab">
      <span :class="{'checked' : 0 == index}" @click="changeView(0, 'index')"><span class="iconfont icon-gonggongzixun" :class="{'icon-gonggongzixun-' : 0 == index}"></span>公共咨询</span>
      <span :class="{'checked' : 1 == index}" @click="changeView(1, 'advisoryarea')"><span class="iconfont icon-zixunqu" :class="{'icon-zixunqu-' : 1 == index}"></span>咨询区</span>
      <span class="ask checkedask" @click="changeView(2, 'post')"><span class="iconfont"></span>提问</span>
      <span :class="{'checked' : 3 == index}" @click="changeView(3, 'myAdvisory')"><span class="iconfont icon-wodezixun"></span>我的咨询</span>
      <span :class="{'checked' : 4 == index}" @click="changeView(4, 'commonProblem')"><span class="iconfont icon-changjianwenti"></span>常见问题</span>
    </div>
  </div>
</template>

<script>
    var viewMap = ['index', 'advisoryarea', 'post', 'myAdvisory', 'commonProblem'];
    export default {
        created() {
          this.index = viewMap.indexOf(this.$route.name);
        },
        data () {
            return {
              index: 0
            }
        },
        computed: {},
        watch: {},
        filters: {},
        methods: {
          changeView(index, view) {
            this.index = index;
            if(view) {
                this.$router.push({name: view});
            }
          }
        },
        components: {}
    }
</script>

<style scoped>
  .tab {
    position: fixed;
    bottom: 0px;
    height: 80px;
    background-color: #fff;
    width: 100%;
    display: flex;
    z-index: 1;
    border-top: 1px solid rgba(0,0,0,0.1);
  & > span {
        position: relative;
        width: 1px;
        flex: 0 0 20%;
        height: 80px;
        color: #92969C;
        line-height: 50px;
        text-align: center;
        display: flex;
        flex-direction: column;
        margin-top: -10px;
  & > span {
        position: relative;
        top: 15px;
        font-size: 24px;
      }
  }
  & .checked {
      color: #06C1AE;
    }
  & .ask {
      border-radius: 5px;
      background-color: transparent;
      border: none;
      line-height: 80px;
      height: 80px;
      margin-top: 0px;
      font-size: 28px;
    }
  & .checkedask {
      background-color: #06C1AE;
      color: #fff;
    }
  }
  
</style>
<style>
  .mint-search{
    height:44Px!important;
}
</style>

