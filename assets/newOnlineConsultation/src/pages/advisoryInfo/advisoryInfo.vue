<template>
  <div class="main__content">
    <mt-header fixed :title="title" class="onlineconsultation-mt-header">
      <router-link to="/advisoryarea" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="main-info">
      <mt-search
        v-model="value"
        cancel-text="取消"
        placeholder="搜索标题内容"
        @keydown.native="keydownFunc">
      </mt-search>
      <div class="list" v-if="!showEmpty">
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
          <asker-item :wid="item.WID" :hidearea="hidearea" :title="item.ZXBT" :content="item.WT" :type="item.ZXLX" :time="item.TWSJ" :status="item.ZT" :area="item.ZXQMC" v-for="item in list"></asker-item>
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
        this.title = this.$route.query.title;
        this.queryConsultingList(this.id, this.page);
    },
    data () {
      return {
        title: '',
        value: '',
        list: [],
        page: 1,
        allLoaded: false,
        id: this.$route.query.id,
        hidearea: this.$route.query.hidearea,
        showEmpty: false
      }
    },
    computed: {
    },
    watch: {
    },
    filters: {
    },
    methods: {
      loadBottom(id) {
        this.page++;
        this.queryConsultingList(this.id, this.page, this.value);
        this.$refs.loadmore.onBottomLoaded();
      },
      keydownFunc() {
        if(event.keyCode == 13) {
          this.page = 1;
          this.allLoaded = false;
          this.queryConsultingList(this.id, this.page, this.value, true);
        }
      },
      // goInfo(val) {
      //   this.$router.push({name: 'askInfo',query: {
      //     id: val
      //   }})
      // },
      queryConsultingList(consultZoneId, pageNumber,searchKey='',clear=false) {
//todo          dev queryMyConsultingList
//todo          publish queryConsultingList
        this.$http.get(Api.queryConsultingList,{
          params: {
            consultZoneId,
            pageNumber,
            searchKey,
            pageSize: 10
          }
        }).then((result) => {
          if(result.status == 200) {
               // this.list = result.data.list;
            if(result.data.list.length <= 9) {
              this.allLoaded = true;
            }
            if(!clear)
              this.list = [...this.list, ...result.data.list];
            else {
              this.list = result.data.list;
            }
            if(this.list.length == 0 || this.list == null)
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
  }
  .main-info {
    margin-top: 44Px;
    height: calc(100vh - 44Px);
    background: #fff;
    display: flex;
    flex-direction: column;
  & .list {
      background-color: #fff;
      height: 100px;
      flex: 1 0 auto;
      overflow: scroll;
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

