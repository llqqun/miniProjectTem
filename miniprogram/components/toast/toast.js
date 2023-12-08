import VantComponent from '@/utils/customComponent';
VantComponent({
  props: {
        show: Boolean,
        mask: Boolean,
        message: String,
        forbidClick: Boolean,
        zIndex: {
            type: Number,
            value: 1000,
        },
        type: {
            type: String,
            value: 'text',
        },
        loadingType: {
            type: String,
            value: 'circular',
        },
        position: {
            type: String,
            value: 'middle',
        },
    },
    data() {
      return {}
    },
    methods: {
        // for prevent touchmove
        noop() { },
    },
});
