module.exports = {// 导出配置
  configureWebpack: {// 配置Webpack
    resolve: {// 路径相关
      alias: {// 配置别名
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}

// 注：通过this.$router和this.$store就可以在所有文件中直接拿到对象，不需要配置别名
