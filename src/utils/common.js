export default {
  // 引用特定目录下的文件，返回格式为{[name]:[content]}
  importAll(context) {
    const cache = {}
    context.keys().forEach(key => (cache[key] = context(key).default))
    return cache
  },
  // 数组去重
  unique(arr) {
    return [...new Set(arr)]
  },
  formatSize(value, fixedLen = 0) {
    const scale = document.documentElement.clientWidth / 375
    const formatValue = value * scale
    return fixedLen === 0
      ? Math.round(formatValue)
      : parseFloat(formatValue.toFixed(fixedLen))
  }
}
