
function debounce(fn, wait=500) {
    var timeout = null;
    return function() {
      if (timeout !== null) clearTimeout(timeout);
      timeout = setTimeout(fn, wait);
    };
}

const getFixedHeight = () => {
  let height = 200
  let pageHeight = document
    .querySelectorAll('body')[0]
    .getClientRects()[0].height
    height = pageHeight - 260
  return height
}

export const setFixeMixin = {
  data () {
    return {
      HEIGHT: 200
    }
  },
  mounted () {
    this.setHeight()
    window.addEventListener('resize', debounce(this.setHeight)) // 窗口发生变化的时候设置高度
  },
  methods: {
    setHeight () {
      this.HEIGHT = getFixedHeight()
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', debounce(this.setHeight))
  }
}