<template>
  <div class="item" >
    <div class="introduce-content" :class="{'active': seeAll}" @click="open()">
      <div class="hold">{{title}}</div>
      <div class="main-item">
        {{question}}
      </div>
    </div>
    <div class="reply" v-if="listNum || first">
      <div class="reply-title">回复：</div>
      <div class="reply-content">{{reply}}</div>
    </div>
  </div>
</template>

<script>
    export default {
        ready(){

        },
        props: ['reply', 'question', 'title', 'first'],
        data () {
            return {
              seeAll: false,
              listNum:false,
            }
        },
        computed: {},
        watch: {},
        filters: {},
        methods: {
          open() {
            this.first = false;
            this.listNum = !this.listNum;
            this.seeAll = !this.seeAll;
          }
        },
        components: {}
    }
</script>

<style scoped>
  .item {
    border-bottom: 1px solid #E8E8E8;;
    padding-bottom: 30px;
  }
  .introduce-content {
    transition: height .5s;
    margin-top: 20px;
    width: 100%;
    padding-bottom: 30px;
    position: relative;
    &:after, &:before {
      border: 14px solid transparent;
      border-left: 14px solid #fff;
      width: 0;
      height: 0;
      position: absolute;
      top: 6px;
      right: 16px;
      content: ' ';
    }
    &:before {
       border-left-color: #CACACA;
       right: 10px;
     }
    & .hold {
      color: #1E2329;
      font-size: 26px;
      margin-left: 30px;
      width: calc(100% - 60px);
      height: 40px;
      line-height: 40px;
      font-weight: bold;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    & .main-item {
      margin-top: 20px;
      color: #92969C;
      margin-left: 30px;
      width: calc(100% - 60px);
      font-size: 24px;
      line-height: 40px;
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      position: relative;
    }
  }
  .active {
      height: auto;
      /*min-height: 240px;*/
      transition: height 2s;
      -webkit-transition: height 2s;
      &:after, &:before {
        border: 14px solid transparent;
        border-bottom: 14px solid #CACACA;
        width: 0;
        height: 0;
        position: absolute;
        right: 10px;
        top: 4px;
        content: ' ';
      }
      &:after {
         border-bottom-color: #fff;
         top: 9px;
       }
      & .main-item {
        display: block;
        overflow: visible;
        text-overflow: visible;
        -webkit-line-clamp: 100;
        -webkit-box-orient: vertical;
      }
  }
  .reply {
    background-color: rgba(6,193,174,0.08);
    margin: 0 auto;
    padding: 10px 10px;
    width: calc(100% - 60px);
    color: #2F343B;
    font-size: 24px;
    display: flex;
    & .reply-title {
        flex: 0 0 auto;
        width: 100px;
      }
    & .reply-content {
        flex: 0 1 auto;
      }
  }
</style>

