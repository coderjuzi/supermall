// debounce(待执行函数, 等待时间)
export function debounce(func, delay) {
  let timer = null// 计时器默认为null
  return function (...args) {// 返回新函数，可传多个参数
    if (timer) clearTimeout(timer)//如果计时器有值，则取消计时器
    timer = setTimeout(() => {// 延迟执行
      func.apply(this, args)// 当没有取消计时器时，则执行函数
    }, delay)
  }
}
