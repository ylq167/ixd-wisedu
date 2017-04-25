/**
 * Created by scofield on 2016/12/12.
 */
if (process.env.NODE_ENV === 'production') {
  global.HOST = location.origin + '/publicapp';
} else {
  // global.HOST = 'http://172.16.6.27/publicapp';
  global.HOST = 'http://amptest.wisedu.com/publicapp';
}
export default {
  queryUserInfo:'http://amptest.wisedu.com/publicapp/sys/itservicecommon/api/getUserDetails.do',
  queryConsultingList: global.HOST + '/sys/zxzxapp/api/queryConsultingList.do',
  queryConsultType: global.HOST + '/sys/zxzxapp/api/queryConsultType.do',
  queryFAQ: global.HOST + '/sys/zxzxapp/api/queryFAQ.do',
  queryMyConsultingList: global.HOST + '/sys/zxzxapp/api/queryMyConsultingList.do',
  queryConsultByWid: global.HOST + '/sys/zxzxapp/api/queryConsultByWid.do',
  saveConsult: global.HOST + '/sys/zxzxapp/api/saveConsult.do',
  queryConsultZone: global.HOST + '/sys/zxzxapp/api/queryConsultZone.do',
  saveReply: global.HOST + '/sys/zxzxapp/api/saveReply.do',
  transformConsult: global.HOST + '/sys/zxzxapp/api/transformConsult.do',
  insulateConsult: global.HOST + '/sys/zxzxapp/api/insulateConsult.do'
}
