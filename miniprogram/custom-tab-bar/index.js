Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#0066b7",
    list: [{
      pagePath: "/pages/index/index",
      iconPath: "/assets/svg/home.svg",
      selectedIconPath: "/assets/svg/home-a.svg",
      text: "首页"
    }, {
      pagePath: "/pages/my/my",
      iconPath: "/assets/svg/my.svg",
      selectedIconPath: "/assets/svg/my-a.svg",
      text: "我的"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      // 对于tab页面会设置
      // this.setData({
      //   selected: data.index
      // })
    }
  }
})