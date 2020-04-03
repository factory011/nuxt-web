export default function ({ $axios, redirect }) {
  $axios.setHeader('Content-Type', 'application/json')
  $axios.setHeader('X-Agent', 'Juejin/Web')

  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}