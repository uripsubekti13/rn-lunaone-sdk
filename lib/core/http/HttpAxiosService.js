import Axios from 'axios'
import _ from 'lodash'

export class HttpRequestAxiosService {
  axios
  cancelToken

  constructor () {
    this.axios = Axios.create()
    this.cancelToken = Axios.CancelToken

    ;['delete', 'get', 'head', 'options'].forEach(method => {
      this.axios[method] = (url, config = {}) => {
        const cancelSource = this.cancelToken.source()
        config.cancelToken = cancelSource.token

        if (method === 'delete') {
          _.set(config, 'headers["Content-Type"]', 'application/json')
        }

        return this.axios.request(
          Object.assign({}, config, {
            method,
            url
          })
        )
      }
    })

    ;['post', 'put', 'patch'].forEach(method => {
      this.axios[method] = (url, data, config = {}) => {
        const cancelSource = this.cancelToken.source()
        config.cancelToken = cancelSource.token

        return this.axios.request(
          Object.assign({}, config, {
            method,
            url,
            data
          })
        )
      }
    })
  }

  post (url = '', data = null, config = {}) {
    return this.axios.post(url, data, config).then(response => response.data)
  }

  put (url = '', data = null, config = {}) {
    return this.axios
      .put(url, data, config)
      .then(response => response.data)
      .catch(err => err.response.data)
  }

  get (url = '', config = {}) {
    return this.axios
      .get(url, config)
      .then(response => response.data)
      .catch(err => err.response.data)
  }

  delete (url = '', config = {}) {
    return this.axios
      .delete(url, config)
      .then(response => response.data)
      .catch(err => err.response.data)
  }
}
