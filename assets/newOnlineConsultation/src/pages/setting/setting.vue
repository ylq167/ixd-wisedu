<template>
  <div class="main__content">
    <mt-header fixed title="我的提问" class="onlineconsultation-mt-header">
      <mt-button @click="goBack" icon="back" slot="left"></mt-button>
    </mt-header>
    <div class="main-info">
      <mt-cell title="选择类型" is-link :value="p_holdtypeText" @click.native="showPicker">
      </mt-cell>
      <mt-cell title="消息提醒">
        <mt-switch v-model="p_notifyvalue"></mt-switch>
      </mt-cell>
      <mt-cell title="是否公开">
        <mt-switch v-model="p_publishvalue"></mt-switch>
      </mt-cell>
      <mt-cell title="联系电话">
        <input placeholder="请输入手机号" class="tel" v-model="p_tel" type="text">
      </mt-cell>
      <div class="tips">联系方式仅对管理员可见</div>
    </div>
    <mt-button class="btn" @click="save">完成</mt-button>
  </div>
</template>
<script>
import {
  Header,
  Button,
  Toast,
  Switch,
  Cell,
  Indicator
} from 'mint-ui';
import SDK from 'bh-mobile-sdk';
import util from '../../util.js';
import Api from '../../api';
var notifyvalue,
  publishvalue,
  holdtypeText,
  typeId,
  tel;
export default {
  created() {
      notifyvalue = this.notifyvalue;
      publishvalue = this.publishvalue;
      holdtypeText = this.holdtypeText;
      typeId = this.typeId;
      tel = this.tel;
      this.queryConsultType();
    },
    props: ['visible', 'notifyvalue', 'publishvalue', 'holdtypeText', 'typeId', 'tel'],
    data() {
      return {
        //        notifyvalue: false,
        //        publishvalue: false,
        typeList: [],
        typemap: {},
        faketypeArr: [],
        p_holdtypeText: this.holdtypeText,
        p_typeId: this.typeId,
        p_notifyvalue: this.notifyvalue,
        p_publishvalue: this.publishvalue,
        p_tel: this.tel,

        //        typeId: null,
        //        holdtypeText: '请选择'
      }
    },
    computed: {},
    watch: {},
    filters: {},
    methods: {
      goBack() {
        this.$emit('test', {
          visible: false,
          holdtypeText: this.holdtypeText,
          typeId: this.typeId,
          notifyvalue: this.notifyvalue,
          tel: this.tel,
          publishvalue: this.publishvalue
        })
        // this.visible = false;
        // this.notifyvalue = notifyvalue;
        // this.publishvalue = publishvalue;
        // this.holdtypeText = holdtypeText;
        // this.typeId = typeId;
        // this.tel = tel;
      },
      queryConsultType() {
        this.$http.get(Api.queryConsultType).then((result) => {
          if (result.status == 200) {
            this.typeList = result.data.list;
          } else {
            Toast('获取类型失败！')
          }
        }).catch((err) => {
          Toast('获取类型失败！')
        })
      },
      showPicker() {
        let self = this;
        this.typemap = {};
        this.faketypeArr = [];
        this.typeList.forEach((item) => {
          this.typemap[item.ZXLX] = item.WID;
          this.faketypeArr.push(item.ZXLX);
        })
        BH_MOBILE_SDK.UI.singleSelect(this.faketypeArr, 0, function(index) {
          self.p_holdtypeText = self.faketypeArr[index];
          self.p_typeId = self.typemap[self.faketypeArr[index]];
        });
      },
      save() {
        this.$emit('test', {
          holdtypeText: this.p_holdtypeText,
          typeId: this.p_typeId,
          notifyvalue: this.p_notifyvalue,
          tel: this.p_tel,
          visible: false,
          publishvalue: this.p_publishvalue
        });
        if (this.tel && !this.tel.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/)) {
          Toast('请输入正确的手机号');
          return;
        }

      }
    },
    components: {
      [Header.name]: Header,
      [Button.name]: Button,
      [Switch.name]: Switch,
      [Cell.name]: Cell
    }
}
</script>
<style scoped>
.main__content {}

.main-info {
  margin-top: 44Px;
  height: calc(100vh - 44Px);
  background: #f9f9f9;
  display: flex;
  flex-direction: column;
  & .tips {
    width: calc(50%);
    margin: 0 auto;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #92969C;
    font-size: 28px;
    margin-top: 20px;
  }
}

.btn {
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

.tel {
  height: 60px;
  border: none;
  font-size: 30px;
}
</style>
