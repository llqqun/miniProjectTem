import { isObj } from '@/utils/util';

const defaultOptions = {
  type: 'text',
  mask: false,
  message: '',
  show: true,
  zIndex: 1000,
  duration: 1500,
  position: 'middle',
  forbidClick: false,
  loadingType: 'circular',
  selector: '#ft-toast',
};

let queue = [];
let currentOptions = { ...defaultOptions };

function parseOptions(message) {
  return isObj(message) ? message : { message };
}

function getContext() {
  const pages = getCurrentPages();
  return pages[pages.length - 1];
}

function Toast(toastOptions) {
  const options = {
    ...currentOptions,
    ...parseOptions(toastOptions),
  };

  const context =
    (typeof options.context === 'function'
      ? options.context()
      : options.context) || getContext();
  const toast = context.selectComponent(options.selector);
  if (!toast) {
    console.warn('未找到 toast 节点，请确认 selector 及 context 是否正确');
    return;
  }

  delete options.context;
  delete options.selector;

  toast.clear = () => {
    toast.setData({ show: false });

    if (options.onClose) {
      options.onClose();
    }
  };

  queue.push(toast);
  toast.setData(options);
  clearTimeout(toast.timer);

  if (options.duration != null && options.duration > 0) {
    toast.timer = setTimeout(() => {
      toast.clear();
      queue = queue.filter((item) => item !== toast);
    }, options.duration);
  }

  return toast;
}

const createMethod = (type) => (options) =>
  Toast({
    type,
    ...parseOptions(options),
  });

Toast.loading = createMethod('loading');
Toast.success = createMethod('success');
Toast.fail = createMethod('fail');

Toast.clear = () => {
  queue.forEach((toast) => {
    toast.clear();
  });
  queue = [];
};

Toast.setDefaultOptions = (options) => {
  Object.assign(currentOptions, options);
};

Toast.resetDefaultOptions = () => {
  currentOptions = { ...defaultOptions };
};

export default Toast;
