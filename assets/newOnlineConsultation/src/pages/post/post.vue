<template>
<div>
  <div class="main__content">
    <mt-header fixed title="提问" class="onlineconsultation-mt-header">
      <router-link to="/" slot="left" icon="back">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="main-info">
      <div class="line"></div>
      <div class="ask-div">
        <input type="text" placeholder="请输入标题" v-model="title" class="title">
        <div class="line1"></div>
        <textarea rows="10" placeholder="请输入200字以内咨询内容" v-model="content" class="info"></textarea>
        <div class="line1"></div>
        <div class="picker">
          <span class="picker-title">选择咨询区</span>
          <span class="inner" @click="changePicker">{{holdAreaText}}</span>
        </div>
      </div>
      <div class="type" @click="openPopup">
        <div class="type-picker">
          <span class="type-text">{{holdtypeText}}</span>
          <span class="iconfont icon-xiaoxi" v-bind:class="{'icon-true' : !!notifyvalue}"></span>
          <span class="iconfont icon-gongkai" v-bind:class="{'icon-true' : !!publishvalue}"></span>
          <span class="iconfont icon-dianhua" v-bind:class="{'icon-true' : !!tel}"></span>
        </div>
        <span class="setting iconfont icon-shezhi" ></span>
      </div>
      <mt-button class="btn" @click="post">提交</mt-button>
    </div>
  </div>
  <mt-popup v-if="showPopup" v-model="showPopup" position="right" :modal="false" class="picker-popup">
    <setting :visible="showPopup" :notifyvalue="notifyvalue" :publishvalue="publishvalue" :holdtype-text="holdtypeText" @test="testfunc" :type-id="typeId" :tel="tel"></setting>
  </mt-popup>
  </div>
</template>

<script>
  import {
    Header,
    Button,
    Toast,
    Popup,
    Indicator
  } from 'mint-ui';
  import SDK from 'bh-mobile-sdk';
  import util from '../../util.js';
  import Api from '../../api';
  import setting from '../setting/setting.vue';
  //根据不同的类型取数据
  String.prototype.getTextLen = function() {
    let len = 0;
    for (var i = 0; i < this.length; i++) {
      if (this[i].match(/[^\x00-\xff]/ig) != null) len += 1;
      else len += 1;
    }
    return len
  }
  export default {
    created() {
        this.queryConsultZone();
        this.fetchUserInfo();
    },
    data () {
      return {
        title:'',
        content:'',
        value: '',
        showPopup: false,
        areaList: [],
        areamap: {},
        fakeAreaArr: [],
        areaId: null,
        holdAreaText: '请选择',
        notifyvalue: false,
        publishvalue: false,
        holdtypeText: '请选择',
        typeId: null,
        tel:null
      }
    },
    computed: {
    },
    watch: {
    },
    filters: {
    },
    methods: {
      testfunc(val) {
        this.showPopup = val.visible;
        
        this.holdtypeText = val.holdtypeText;
        this.typeId = val.typeId;
        this.notifyvalue = val.notifyvalue;
        this.tel = val.tel;
        this.publishvalue = val.publishvalue;
      },
      goBack() {
        history.back();
      },
      openPopup() {
        this.showPopup = true;
      },
      fetchUserInfo(){
        this.$http.get(Api.queryUserInfo).then((response)=>{
          this.tel = response.data.phone;
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
        });
      },
      saveConsult(args) {
        this.$http.get(Api.saveConsult, {params: args}).then((result) => {
          if(result.body.status == 'success') {
            this.$router.push({name: 'index'});
          } else {
            Toast('提问失败！')
          }
        }).catch((err) => {
            Toast('提问失败！')
        })
      },
      post() {
        if(!this.title || this.title.trim() == "") {
          Toast('请输入标题');
          return
        }
        if(!this.content || this.content.trim() == "") {
          Toast('请输入内容');
          return
        }
        if(this.title.getTextLen() > 30) {
          Toast('标题描述字数过长');
          return
        }
        if(this.content.getTextLen() > 200) {
          Toast('内容描述字数过长');
          return
        }
        if(!this.areaId) {
          Toast('请选择咨询区');
          return
        }
        if(!this.typeId) {
          Toast('请选择咨询类型');
          return
        }
        var option = {
          consultTitle: this.title,
          content: this.content,
          consultZoneId: this.areaId,
          consultTypeId: this.typeId,
          isPublic: +this.publishvalue,
          messageSetting: +this.notifyvalue
        };
        if(this.tel)
            option.phone = this.tel + "";
        this.saveConsult(option);
      }
    },
    components: {
      [Header.name]: Header,
      [Button.name]: Button,
      [Popup.name]: Popup,
      setting
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
    width:100%;
    flex-direction: column;
    & .line {
      height: 2px;
      width: 100%;
      margin-top: 20px;
      background-color: #e8e8e8;
      }
    & .ask-div {
        flex: 0 0 auto;
        display: flex;
        flex-direction: column;
        background-color: #fff;
        width:100%;
        & input {
            width: calc(100% - 60px);
            margin: 0 auto;
            height: 70px;
            color: #1E2329;
            border: none;
            font-size: 28px;
          }
        & .line1 {
            height: 2px;
            width: calc(100% - 30px);
            margin-left: 30px;
            background-color: #e8e8e8;
          }
        & textarea {
          resize: none;
          width: calc(100% - 60px);
          margin: 0 auto;
          color: #1E2329;
          border: none;
          font-size: 28px;
          padding: 10px 10px;
          }
        & .picker {
          height: 70px;
          width: calc(100% - 60px);
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          & span {
              height:70px;
              line-height: 70px;
              font-size: 28px;
              color: #1e2329;
            }
          & .inner {
              color: #92969C;
              position: relative;
              margin-right: 30px;
              &:after, &:before {
                  border: 14px solid transparent;
                  border-left: 14px solid #fff;
                  width: 0;
                  height: 0;
                  position: absolute;
                  top: 20px;
                  right: -40px;
                  content: ' ';
                }
              &:before {
                 border-left-color: #CACACA;
                 right: -45px;
               }
            }
          }
      }
    & .type {
      margin-top: 20px;
      background-color: #fff;
      border-bottom: 1px solid #E8E8E8;
      border-top: 1px solid #E8E8E8;
      height: 80px;
      display: flex;
      justify-content: space-between;
      width: 100%;
      & .type-picker {
        height: 80px;
        margin-left: 30px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: calc(50%);
        & span {
          flex: 0 0 auto;
          height: 80px;
          line-height: 80px;
          text-align: center;
          }
        & .type-text {
          background-color:rgba(6,193,174,0.10);
          color: #06C1AE;
          font-size: 24px;
          flex: 0 0 auto;
          height: 40px;
          line-height: 40px;
          padding: 0 10px;
          border-radius: 3px;
          }
        }
        & .setting {
          flex: 0 0 auto;
          height: 80px;
          line-height: 80px;
          text-align: center;
          margin-right: 30px;
          }
      }
      & .btn {
          width: calc(100% - 30px);
          border: none;
          border-radius: 10px;
          background-color: #06c1ae;
          color: #fff;
          font-size: 36px;
          position: fixed;
          bottom: 30px;
          left: 15px;
        }
  }
  .picker-popup {
    position: fixed;
    width: 100%;
    height: 100%;
    /*overflow: scroll;*/
    background-color: #fff;
    z-index: 1000;
  }
  .iconfont {
    color: #92969C!important;
  }
  .icon-true {
    color: #06C1AE!important;
  }
</style>

