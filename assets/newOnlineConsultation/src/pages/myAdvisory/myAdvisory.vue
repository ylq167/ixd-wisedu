<template>
  <div class="main__content">
    <mt-header fixed title="我的咨询" class="onlineconsultation-mt-header">
      <mt-button @click="goManager" icon="back" slot="left"></mt-button>
    </mt-header>
    <div class="main-info">
      <div class="list" v-if="!showEmpty">
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
          <asker-item @click.stop="goInfo(item.WID,$event)" :wid="item.WID" :title="item.ZXBT" :content="item.WT" :type="item.ZXLX" :time="item.TWSJ" :status="item.ZT" :area="item.ZXQMC" v-for="item in list"></asker-item>
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
    Indicator
  } from 'mint-ui';
  import SDK from 'bh-mobile-sdk';
  import util from '../../util.js';
  import Api from '../../api';
  import askerItem from '../../components/askerItem/askerItem.vue';
  export default {
    created() {
        this.queryMyConsultingList(this.page);
    },
    data () {
      return {
        list: [],
        page: 1,
        allLoaded: false,
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
      loadBottom(id) {
        this.page++;
        this.queryMyConsultingList(this.page);
        this.$refs.loadmore.onBottomLoaded();
      },
      goInfo(val, event) {
        event.stopPropagation();
        event.preventDefault();
        this.$router.push({name: 'askInfo',query: {
            id: val
        }})
      },
      queryMyConsultingList(pageNumber) {
        this.$http.get(Api.queryMyConsultingList, {
            params: {
              pageNumber,
              pageSize: 10
            }
        }).then((result) => {
            if(result.status == 200) {
              if(result.data.list.length <= 9) {
                this.allLoaded = true;
              }
              this.list = [...this.list, ...result.data.list];
              if(this.list.length == 0)
                this.showEmpty = true;
              else
                this.showEmpty = false;
            } else {
              Toast('获取我的咨询失败！')
            }
        }).catch((err) => {
            Toast('获取我的咨询失败！')
        })
      }
    },
    components: {
      [Header.name]: Header,
      [Button.name]: Button,
      [Loadmore.name]: Loadmore,
      askerItem
    }
  }
</script>

<style scoped>
  .main__content {
  }
  .main-info {
    margin-top: 44Px;
    height: calc(100vh - 44Px - 120px);
    background: #fff;
    display: flex;
    flex-direction: column;
  & .list {
      background-color: #fff;
      height: 100px;
      flex: 1 0 auto;
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
      height: 300px;
      width: 250px;
    }
  }
  }
</style>

