<template>
  <div class="main__content">
    <mt-header fixed title="回复" class="onlineconsultation-mt-header">
      <mt-button @click="goBack" icon="back" slot="left"></mt-button>
    </mt-header>
    <div class="main-info">
      <textarea rows="10" placeholder="请输入内容" v-model="value"></textarea>
      <mt-button class="btn" @click="save">提交</mt-button>
    </div>
  </div>
</template>

<script>
  import {
    Header,
    Button,
    Toast,
    Indicator
  } from 'mint-ui';
  import SDK from 'bh-mobile-sdk';
  import util from '../../util.js';
  import Api from '../../api';
  export default {
    created() {
    },
    data () {
      return {
        value: ''
      }
    },
    computed: {
    },
    watch: {
    },
    filters: {
    },
    methods: {
      goBack() {
          history.back();
      },
      save() {
          this.$http.get(Api.saveReply, {params: {
            wid: this.$route.query.id,
            reply: this.value
          }}).then((result) => {
              if(result.status == 200)
                history.back();
              else
              Toast('回复失败')
          }).catch(() => {
              Toast('回复失败')
          });
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
    & textarea {
        resize: none;
        font-size: 28px;
        color: #000;
        padding: 20px 30px;

      }
    & .btn {
        width: calc(100% - 60px);
        margin: 20px auto;
        border: none;
        border-radius: 10px;
        background-color: #06c1ae;
        color: #fff;
        font-size: 36px;
      }
  }
</style>
<style>
 textarea{
  overflow:auto;
  background-attachment: fixed;
  background-repeat: no-repeat;
  border-style: solid;
  border-color: #FFFFFF;
 }
      
</style>
