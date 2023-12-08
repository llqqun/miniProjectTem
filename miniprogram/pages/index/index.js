// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Component({
  data: {
    showCustom: false,
    name: 'fade',
    showCustom: false,
  },
  methods: {
    trigger(name) {
      this.setData({ name, show: true });
      setTimeout(() => {
        this.setData({ show: false });
      }, 3000);
    },
    onClickFade() {
      this.trigger('fade');
    }
  }
})
