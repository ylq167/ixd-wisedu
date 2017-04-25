<template>
  <div class="item" @click="goInfo(wid)">
    <div class="title"><img v-if="status == 1" src="../../components/img/shape.png">{{title}}</div>
    <div class="tips">
      <div class="whole">
        <div class="area" v-if="!!area && !hidearea">{{area}}</div>
        <div class="type">{{type}}</div>
      </div>
      <div class="time">{{time | fixTime}}</div>
    </div>
    <div class="info">{{content}}</div>
  </div>
</template>

<script>
    import _fixTime from 'formattime';
    export default {
        created() {
        },
        props:[
          'title',
          'content',
          'type',
          'time',
          'status',
          'hidearea',
          'area',
          'wid'
        ],
        data () {
            return {}
        },
        computed: {},
        watch: {},
        filters: {
            fixTime(val) {
              if(!val)
                  return val;
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
          goInfo(val) {
            this.$router.push({name: 'askInfo',query: {
              id: val
          }})
      },
        },
        components: {}
    }
</script>

<style scoped>
  .item {
    background-color: #fff;
    width: 100%;
    padding: 20px 30px;
    display: flex;
    border-bottom: 1px solid #E8E8E8;
    flex-direction: column;
    & .title {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      height: 30px;
      line-height: 30px;
      width: 100%;
      font-size: 24px;
      color: #1e2329;
      & img {
        height: 25px;
        width: 25px;
        position: relative;
        top: -4px;
        margin-right: 5px;
      }
    }
    & .tips {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      & .whole {
        display: flex;
        & .area {
          background-color: rgba(255,179,0,0.10);
          color: #FFB300;
          padding-left: 10px;
          padding-right: 10px;
          height: 30px;
          line-height: 30px;
          border-radius: 8px;
          margin-right: 20px;
        }
        & .type {
            background: rgba(6,193,174,0.10);
            color: #06C1AE;
            padding-left: 10px;
            padding-right: 10px;
            height: 30px;
            line-height: 30px;
            border-radius: 8px;
          }
      }
    & .time {
        color: #9b9b9b;
        font-size: 22px;
        height: 30px;
        line-height: 30px;

      }
    }
    & .info {
        margin-top: 10px;
        font-size: 22px;
        color: #92969c;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        position: relative;
    }
  }
</style>

