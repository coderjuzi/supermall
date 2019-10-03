// 目前还未使用混入
import {debounce} from './utils'
import BackTop from 'components/content/backTop/BackTop'
import {BACKTOP_DISTANCE} from 'common/const'


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

// 使用混入封装BackTop
export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false// 默认：不显示
    }
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 500)// 通过ref拿到对象，可以访问其内部属性和方法
    },
    listenShowBackTop(position) {
      // 将position的y值和1000作对比，当大于1000时显示BackTop图标
      // y是一个负值，先转为正数
      this.isShowBackTop = (-position.y) > BACKTOP_DISTANCE// 使用常量
    }
  }
}

