/**
 * Author: Necfol 房星星
 */
function _fixTime(time, flag, noYear) {
    function _n2(n) {
        return (100 + n).toString().substr(1, 2);
    }
    time = new Date(time.replace(/\s+/g, 'T').concat('.000+08:00'));
    var s = '';
    if (time.getYear() !== new Date().getYear())
        s = (time.getFullYear() + "").slice(-2) + "年";
    if (!noYear) {
        if (flag) {
            return s + (time.getMonth() + 1) + "月" + time.getDate() + "日 ";
        } else {
            return s + (time.getMonth() + 1) + "月" + time.getDate() + "日 " + _n2(time.getHours()) + ":" + _n2(time.getMinutes());
        }
    } else {
        return (time.getMonth() + 1) + "月" + time.getDate() + "日 " + _n2(time.getHours()) + ":" + _n2(time.getMinutes());
    }
}
/**
 * Author: Necfol 房星星
 * [_fixString 截取字符串]
 * @param  {[String]} text     [需要截取的字符串]
 * @param  {[Number]} len      [截取的长度]
 * @param  {[Boolean]} front    [截取之后返回前len长度的字符串]
 * @param  {[Boolean]} ellipsis [是否截取之后加...]
 * @return {[String]}          [截取之后的字符串]
 */
function _fixString(text, len, front, ellipsis) {
    if (text.length > len) {
        if (front == true) {
            return text.substring(Number(text.length - len));
        } else {
            if (ellipsis == true) {
                return text.substring(0, len) + '...';
            } else {
                return text.substring(0, len);
            }
        }
    } else {
        return text;
    }
}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
function _formatDate(date, fmt) {
    var o = {
        "M+": date.getMonth() + 1, //月份 
        "d+": date.getDate(), //日 
        "h+": date.getHours(), //小时 
        "m+": date.getMinutes(), //分 
        "s+": date.getSeconds(), //秒 
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
        "S": date.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
module.exports = {
    fixTime: _fixTime,
    fixString: _fixString,
    formatDate: _formatDate,
};
