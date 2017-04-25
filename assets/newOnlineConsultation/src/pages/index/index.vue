<template>
  <div class="main__content">
    <mt-header fixed title="公共咨询" class="onlineconsultation-mt-header">
      <mt-button @click="goManager" icon="back" slot="left"></mt-button>
    </mt-header>
    <div class="main">
      <mt-search
        v-model="value"
        cancel-text="取消"
        placeholder="搜索标题内容" @keydown.native="keydownFunc">
      </mt-search>
      <div class="list" v-if="!showEmpty">
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
          <div>
              <asker-item :wid="item.WID" :title="item.ZXBT" :content="item.WT" :type="item.ZXLX" :time="item.TWSJ" :status="item.ZT" :area="item.ZXQMC" v-for="item in list"></asker-item>
          </div>
          </mt-loadmore>
      </div>
      <div class="empty-img-div" v-if="showEmpty">
        <img class="empty-img" src="../../components/img/empty.png">
      </div>
    </div>
  </div>
</template>

<script>
  import {
    Header,
    Button,
    Toast,
    Loadmore,
    Search,
    Indicator
  } from 'mint-ui';
  import SDK from 'bh-mobile-sdk';
  import util from '../../util.js';
  import Api from '../../api';
  import askerItem from '../../components/askerItem/askerItem.vue';
  export default {
    created() {
        this.queryConsultingList(this.page);
    },
    data () {
      return {
        value: '',
        allLoaded: false,
        page: 1,
        list: [],
        showEmpty: false,
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
      keydownFunc() {
        if(event.keyCode == 13) {
          this.page = 1;
          this.allLoaded = false;
          this.queryConsultingList(this.page, this.value, true);
        }
      },
      loadBottom(id) {
        this.page++;
        this.queryConsultingList(this.page, this.value);
        this.$refs.loadmore.onBottomLoaded();
      },
      queryConsultingList(pageNumber,searchKey='',clear=false) {
          this.$http.get(Api.queryConsultingList,{
            params: {
              pageNumber,
              searchKey,
              pageSize: 10
            }
          }).then((result) => {
              if(result.status == 200) {
//                this.list = result.data.list;
                if(result.data.list.length <= 9) {
                  this.allLoaded = true;
                }
                if(!clear)
                  this.list = [...this.list, ...result.data.list];
                else {
                  this.list = result.data.list;
                }
                if(this.list.length == 0)
                  this.showEmpty = true;
                else
                  this.showEmpty = false;
              } else {
                Toast('请求咨询列表出错，请稍后再试！');
              }
          }).catch((err) => {
            Toast('请求咨询列表出错，请稍后再试！');
          })
      }
    },
    components: {
      [Header.name]: Header,
      [Button.name]: Button,
      [Search.name]: Search,
      [Loadmore.name]: Loadmore,
      askerItem
    }
  }
</script>

<style scoped>
  .main__content {
    /*height: calc(100vh - 100px);*/
  }
  .main {
    margin-top: 44Px;
    height: calc(100vh - 44Px - 120px);
    background: #fff;
    display: flex;
    flex-direction: column;
    & .list {
      background-color: #fff;
      height: 100px;
      flex: 1 0 auto;
      -webkit-overflow-scrolling: touch;
      overflow: auto;
    }
    & .empty-img-div {
        background-color: #fff;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1 0 auto;
        & .empty-img {
            height: 500px;
            width: 400px;
          }
      }
  }
</style>

