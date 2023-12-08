const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}
export const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

export function isFunction(val) {
  return typeof val === 'function';
}

export function isPlainObject() {
  return val !== null && typeof val === 'object' && !Array.isArray(val);
}

export function isPromise(val) {
  return isPlainObject(val) && isFunction(val.then) && isFunction(val.catch);
}

export function isDef(value) {
  return value !== undefined && value !== null;
}

export function isObj(x) {
  const type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

export function isNumber(value) {
  return /^\d+(\.\d+)?$/.test(value);
}

export function isBoolean(value) {
  return typeof value === 'boolean';
}

const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;
const VIDEO_REGEXP = /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv)/i;

export function isImageUrl(url) {
  return IMAGE_REGEXP.test(url);
}

export function isVideoUrl(url) {
  return VIDEO_REGEXP.test(url);
}

export function requestAnimationFrame(cb) {
  return setTimeout(() => {
    cb();
  }, 1000 / 30);
}