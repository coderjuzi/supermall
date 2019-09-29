// 防抖函数debounce(待执行函数, 等待时间)
export function debounce(func, delay) {
  let timer = null// 计时器默认为null
  return function (...args) {// 返回新函数，可传多个参数
    if (timer) clearTimeout(timer)//如果计时器有值，则取消计时器
    timer = setTimeout(() => {// 延迟执行
      func.apply(this, args)// 当没有取消计时器时，则执行函数
    }, delay)
  }
}
// 时间戳格式化工具formatDate
export function formatDate(date, fmt) {
  // 1. 获取年份
  // 正则表达式是处理字符串匹配的利器
  // y+（1个或多个y）
  // y*（0个或多个y）
  // y?（0个或1个y）
  if (/(y+)/.test(fmt)) {// 不确定传入几个y，使用正则表达式y+
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  // 2. 获取月日时分秒
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),// 如果对12或24小时制有要求，需要额外设定h或H
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};
// 用0为时间补齐2位


function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};
