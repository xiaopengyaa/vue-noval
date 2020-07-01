module.exports = {
  // async异常捕获
  asyncHandler(fn) {
    return function(...agrs) {
      Promise.resolve(fn(...agrs)).catch(agrs[2])
    }
  }
}
