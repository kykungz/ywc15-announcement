const serviceWorker = {
  init () {
    if (process.env.NODE_ENV === 'production') {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js')
      }
    }
  }
}

export default serviceWorker
