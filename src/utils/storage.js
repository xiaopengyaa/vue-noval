export default {
  localStorage: {
    get(key) {
      return JSON.parse(localStorage.getItem(key))
    },
    set(key, value) {
      localStorage.setItem(key, JSON.stringify(value))
    },
    remove(key) {
      localStorage.removeItem(key)
    },
    clear() {
      localStorage.clear()
    }
  },
  sessionStorage: {
    get(key) {
      return JSON.parse(sessionStorage.getItem(key))
    },
    set(key, value) {
      sessionStorage.setItem(key, JSON.stringify(value))
    },
    remove(key) {
      sessionStorage.removeItem(key)
    },
    clear() {
      sessionStorage.clear()
    }
  }
}
