// 目前还未使用混入
import {debounce} from './utils'

export const itemListenerMixin = {
  data() {
    return {
      itemListenerMixin: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 500)// 延迟半秒刷新
    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
  }
}
