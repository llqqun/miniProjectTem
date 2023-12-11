import Toast from '../../components/toast/server.js'
import { getUserInfo } from '@/apis/index'
Page({
  data: {
    showCustom: false,
    name: 'fade'
  },
  onLoad () {
    this.silentLogin()
  },
  onShow () {
    // tab设置
    if (typeof this.getTabBar === 'function' ) {
      this.getTabBar((tabBar) => {
        tabBar.setData({
          selected: 0
        })
      })
    }
  },
  onReady() {
  },
  onClickRouter () {
    wx.navigateTo({
      url: '/pages/my/my',
    })
  },
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
  },
  silentLogin () {
    wx.login({
      success: (res) => {
        console.log(res);
      },
      fail: (err) => {}
    })
  }
})
