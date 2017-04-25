<template>
  <div class="main__content">
    <mt-header fixed title="详情" class="onlineconsultation-mt-header">
      <mt-button @click="goBack" icon="back" slot="left"></mt-button>
    </mt-header>
    <div class="main-info">
      <div class="askinfo">
        <div class="question-title">
          {{info.ZXBT}}
        </div>
        <div class="tipslist">
          <div class="area">{{info.ZXQMC}}</div>
          <div class="type">{{info.ZXLX}}</div>
        </div>
        <div class="askinfo-content">
          {{info.WT}}
        </div>
        <div class="asker-div">
          <span class="asker">提问人：{{info.TWRXM}}</span>
          <span class="time">{{info.TWSJ | fixTime}}</span>
        </div>
      </div>
      <div class="manage-div" v-if="info.GL&&!info.HF">
        <div class="icon-before return-ask" @click="returnAsk">隔离问题</div>
        <div class="icon-before transfer" @click="transfer">转移问题</div>
        <div class="icon-before reply" @click="replyFunc">回复问题</div>
      </div>
      <div class="no-answer-div" v-if="!info.HF">
        <div class="noanswer">
          <img src="../../components/img/empty.png">
          <span>暂无回复，请耐心等待</span>
        </div>
      </div>
      <div class="answer-div" v-if="info.HF">
        <div class="answer-title">回复</div>
        <div class="answer-info-div">
          <div class="answer-info">
            {{info.HF}}
          </div>
          <div class="answer">
            <span class="answername">回复人：{{info.HFRXM || ''}}</span>
            <span class="answertime" v-if="info.HFSJ">{{info.HFSJ | fixTime}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    Header,
    Button,
    Toast,
    MessageBox,
    Indicator
  } from 'mint-ui';
  import SDK from 'bh-mobile-sdk';
  import util from '../../util.js';
  import Api from '../../api';
  import _fixTime from 'formattime';
  export default {
    created() {
      this.queryConsultByWid(this.$route.query.id);
      this.queryConsultZone();
    },
    data () {
      return {
        info: {
          areaList: [],
          areamap: {},
          fakeAreaArr: [],
          areaId: null
        }
      }
    },
    computed: {
    },
    watch: {
    },
    filters: {
      fixTime(val) {
        if(!val)
            return val
        var arr = val.split(/[- :]/);
        arr[1]--;
        var _date = new Date(...arr);
        return _fixTime(_date.getTime(), [{
          separate: -60*60*1000,
          formateStyle: '刚刚'
        }, {
          separate: -24*60*60*1000,
          formateStyle: '#{{hour}}小时前'
        }, {
          separate: -30*24*60*60*1000,
          formateStyle: '#{{day}}天前',
        },{
          separate: -Infinity,
          formateStyle: '#{{YYYY}}-#{{MM}}-#{{DD}}',
        }]);
      }
    },
    methods: {
      goBack() {
        // history.back();
        this.$router.back();
      },
      returnAsk() {
        MessageBox.confirm('确定隔离该条咨询?').then((action) => {
          this.insulateConsult(this.$route.query.id);
        }).catch((reject) => {
        });
      },
      queryConsultByWid(wid) {
        this.$http.get(Api.queryConsultByWid, {params: {wid}}).then((result) => {
          if(result.status == 200) {
            this.info = result.data.list[0] ||[];
          } else {
            Toast('获取详情失败！')
          }
        }).catch((err) => {
          Toast('获取详情失败！')
        })
      },
      insulateConsult(wid) {
        this.$http.get(Api.insulateConsult, {params: {wid}}).then((result) => {
          if(result.status == 200) {
            history.back();
          } else {
            Toast('隔离失败！')
          }
        }).catch((err) => {
          Toast('隔离失败！')
        })
      },
      queryConsultZone() {
        this.$http.get(Api.queryConsultZone).then((result) => {
          if(result.status == 200) {
            this.areaList = result.data.list;
          } else {
            Toast('获取咨询区失败！')
          }
        }).catch((err) => {
          Toast('获取咨询区失败！')
        })
      },
      transformConsult(wid, consultZoneId) {
        this.$http.get(Api.transformConsult, {
            params: {
              wid,
              consultZoneId
            }
        }).then((result) => {
          if(result.status == 200) {
            history.back();
          } else {
            Toast('转移咨询失败！')
          }
        }).catch((err) => {
          Toast('转移咨询失败！')
        })
      },
      transfer() {
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
          self.transformConsult(self.$route.query.id, self.areaId);
        });
      },
      replyFunc() {
        this.$router.push({name: 'reply', query: {
            id: this.$route.query.id
        }});
      }
    },
    components: {
      [Header.name]: Header,
      [Button.name]: Button
    }
  }
</script>

<style scoped>
  .main__content {
  }
  .main-info {
    margin-top: 44Px;
    height: calc(100vh - 44Px);
    background: #f9f9f9;
    display: flex;
    flex-direction: column;
    & .askinfo {
      padding: 30px 30px;
      flex: 0 0 auto;
      display: flex;
      background-color: #fff;
      flex-direction: column;
        & .question-title {
            flex: 0 0 auto;
            font-size: 40px;
            color: #1e2329;
          }
        & .tipslist {
            margin-top: 20px;
            display: flex;
            & .area {
                background-color: rgba(255,179,0,0.10);
                color: #FFB300;
                padding-left: 10px;
                padding-right: 10px;
                height: 30px;
                line-height: 30px;
                border-radius: 15px;
                margin-right: 20px;
              }
            & .type {
                background: rgba(6,193,174,0.10);
                color: #06C1AE;
                padding-left: 10px;
                padding-right: 10px;
                height: 30px;
                line-height: 30px;
                border-radius: 15px;
                margin-right: 20px;
              }
        }
        & .askinfo-content {
          font-size: 28px;
          color: #2f343b;
          margin-top: 20px;
          }
        & .asker-div {
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
            color: #9B9B9B;
            font-size: 24px;
          }
      }
    & .no-answer-div {
        margin-top: 20px;
        flex: 0 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        & .noanswer {
          display: flex;
          flex: 0 0 auto;
          width: 100%;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 450px;
          & img {
            height: 300px;
            width:250px;
            }
          & span {
            margin-top: 20px;
            color: #BDC0C5;
            font-size: 28px;
            }
          }
      }
    & .answer-div {
        background-color: transparent;
        display: flex;
        flex-direction: column;
        width: 100%;
        & .answer-title {
            width: 100%;
            background-color: #f9f9f9;
            font-size: 28px;
            color: #1E2329;
            height: 50px;
            line-height: 50px;
            padding-left: 30px;
          }
        & .answer-info-div {
            background-color: #fff;
            width: 100%;
            padding: 20px 30px;
            & .answer-info {
                font-size: 28px;
                color: #2f343b;
              }
            & .answer {
                margin-top: 20px;
                font-size: 24px;
                color: #9b9b9b;
                display: flex;
                justify-content: space-between;
              }
          }
      }
    & .manage-div {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        height: 88px;
        color: #2F343B;
        border-bottom: 1px solid #E8E8E8;
        border-top: 1px solid #E8E8E8;
        background-color: #fff;
        & .icon-before {
          width: calc(100% / 3);
          height: 88px;
          text-align: center;
          position: relative;
          border-right: 1px solid #E8E8E8;
          &:last-child {
             border-right: none;
           }
          &:before {
              font-family:"iconfont" !important;
              position: relative;
              right: 5px;
              top: 2px;
              font-size: 24px;
              color: #06C1AE;
              height: 88px;
              line-height: 88px;
              content: "\e611";
           }
          }
        & .transfer {
            &:before {
               content: "\e612";
             }
          }
        & .reply {
          &:before {
             content: "\e613";
           }
        }
      }
  }
</style>

