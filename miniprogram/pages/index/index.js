import Toast from '../../components/toast/server.js'
Component({
  data: {
    showCustom: false,
    name: 'fade'
  },
  onLoad () {
    console.log(success);
  },
  methods: {
    trigger(name) {
      this.setData({ name, show: true });
      setTimeout(() => {
        this.setData({ show: false });
      }, 500);
    },
    onClickFade() {
      // Toast({context: this, message: '提示内容'})
      // Toast.loading({ message: '加载中...', duration: 0 })
      Toast.fail('失败')
      Toast.success('成功')
      // setTimeout(() => {
      //   Toast.clear()
      // }, 1000)
    }
  }
})
