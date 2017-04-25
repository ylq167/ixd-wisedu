<template>
  <div class="main__content">
    <mt-header fixed title="咨询详情" class="onlineconsultation-mt-header">
      <mt-button @click="goManager" icon="back" slot="left"></mt-button>
    </mt-header>
    <div class="main-info">
      <mt-search
        v-model="value"
        cancel-text="取消"
        placeholder="搜索标题内容" @keydown.native="keydownFunc">
      </mt-search>
      <div class="picker" @click="changePicker">
            <span class="title">
              {{holdAreaText}}
            </span>
      </div>
      <div class="list" v-if="!showEmpty">
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
          <common-item v-for="item in list" :reply="item.HF" :question="item.WT" :title="item.ZXBT" :first="$index === 0">
          </common-item>
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
    Search,
    Loadmore,
    Indicator
  } from 'mint-ui';
  import SDK from 'bh-mobile-sdk';
  import util from '../../util.js';
  import Api from '../../api';
  import commonItem from '../../components/commonItem/commonItem.vue';
  export default {
    created() {
        this.queryConsultZone();
    },
    data () {
      return {
        value: '',
        list: [],
        areaList: [],
        page: 1,
        allLoaded: false,
        areamap: {},
        fakeAreaArr: [],
        areaId: null,
        holdAreaText: '请选择',
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
        this.queryFAQ(this.areaId, this.page, this.value);
//        this.$broadcast('onBottomLoaded', id);
          this.$refs.loadmore.onBottomLoaded();
      },
      keydownFunc(event) {
          if(event.keyCode == 13) {
              this.page = 1;
              this.allLoaded = false;
              this.queryFAQ(this.areaId, this.page, this.value, true);
          }
      },
      queryFAQ(consultZoneId, pageNumber,searchKey="", clear=false) {
        this.$http.get(Api.queryFAQ, {
            params: {
              searchKey,
              consultZoneId,
              pageNumber,
              pageSize: 10,
            }
        }).then((result) => {
          if(result.status == 200) {
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
            Toast('获取常见问题失败！')
          }
        }).catch((err) => {
            Toast('获取常见问题失败！')
        })
      },
      queryConsultZone() {
        this.$http.get(Api.queryConsultZone).then((result) => {
          if(result.status == 200) {
            this.areaList = result.data.list;
            this.holdAreaText = this.areaList[0].ZXQMC;
            this.areaId = this.areaList[0].WID;
            this.queryFAQ(this.areaId, this.page);
        } else {
            Toast('获取咨询区失败！')
          }
        }).catch((err) => {
          Toast('获取咨询区失败！')
        })
      },
      changePicker() {
        let self = this;
        this.areamap = {};
        this.fakeAreaArr = [];
        this.areaList.forEach((item) => {
          this.areamap[item.ZXQMC] = item.WID;
          this.fakeAreaArr.push(item.ZXQMC);
        })
        BH_MOBILE_SDK.UI.singleSelect(this.fakeAreaArr,0, function(index) {
          self.holdAreaText = self.fakeAreaArr[index];
          self.areaId = self.areamap[self.fakeAreaArr[index]];
          self.page = 1;
          self.allLoaded = false;
          self.queryFAQ(self.areaId, self.page, self.value, true);
        });
      },
    },
    components: {
      [Header.name]: Header,
      [Button.name]: Button,
      [Search.name]: Search,
      [Loadmore.name]: Loadmore,
      commonItem
    }
  }
</script>

<style scoped>
  .main__content {
  }
  .main-info {
    margin-top: 44Px;
    height: calc(100vh - 44Px - 120px);
    background: #f9f9f9;
    display: flex;
    flex-direction: column;
  & .picker {
      height: 70px;
      width: 100%;
      position: relative;
      background-color: #fff;
      border-bottom: 1px solid #E8E8E8;
      & .title {
          display: block;
          position: relative;
          margin: 0 auto;
          margin-top: 20px;
          width: 200px;
          height: 50px;
          color: #92969C;
          font-size: 24px;
          text-align: center;
          position: relative;
          &:after {
             width: 0;
             height:0;
             content: ' ';
             border: 10px solid transparent;
             border-top: 10px solid #e8e8e8;
             position: relative;
             top: 18px;
             right:-5px;
           }
      }
  }
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

