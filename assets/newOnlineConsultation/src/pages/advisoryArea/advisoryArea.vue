<template>
  <div class="main__content">
    <mt-header fixed title="公共咨询" class="onlineconsultation-mt-header">
      <mt-button @click="goManager" icon="back" slot="left"></mt-button>
    </mt-header>
    <div class="main-info">
      <mt-cell class="cell-item" :id="item.WID" :title="item.ZXQMC" :label="item.MS" v-for="item in list" @click.native="loadView(item.ZXQMC,item.WID)" is-link></mt-cell>
    </div>
  </div>
</template>

<script>
  import {
    Header,
    Button,
    Toast,
    Cell,
    Indicator
  } from 'mint-ui';
  import SDK from 'bh-mobile-sdk';
  import util from '../../util.js';
  import Api from '../../api';
  export default {
    created() {
        this.queryConsultZone();
    },
    data () {
      return {
          list: []
      }
    },
    computed: {
    },
    watch: {
    },
    filters: {
    },
    methods: {
      goManager() {
        if(SDK() && SDK().UI && SDK().UI.closeWebView)
          SDK().UI.closeWebView(false);
      },
      loadView(title, id) {
          this.$router.push({name: 'advisoryinfo',query: {title: title, id: id, hidearea: true}});
      },
      queryConsultZone() {
        this.$http.get(Api.queryConsultZone).then((result) => {
          if(result.status == 200) {
            this.list = result.data.list;
          } else {
            Toast('获取咨询区失败！')
          }
        }).catch((err) => {
            Toast('获取咨询区失败！')
        })
      }
    },
    components: {
      [Header.name]: Header,
      [Button.name]: Button,
      [Cell.name]: Cell,
    }
  }
</script>

<style scoped>
  .main__content {
  }
  .main-info {
    margin-top: 44Px;
    height: calc(100vh - 110px - 44Px);
    background: #f9f9f9;
    display: flex;
    flex-direction: column;
    overflow: auto;
    & .cell-item {
        flex: 0 0 auto;
        margin-bottom: 30px;
      }
  }
</style>
<style>
  .mint-cell-label, .mint-cell-text{
    word-break: break-all!important;
  }
</style>
