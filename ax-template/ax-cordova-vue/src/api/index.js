import axios from 'axios'

axios.defaults.baseURL = window.config.baseUrl
axios.defaults.headers = {
  'Content-Type': 'application/json'
}

// you can do some interceptors for your business

// common axios api
function axiosAPI (method, url, params, success, error) {
  axios({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    withCredentials: true
  }).then(function (res) {
    if (success) {
      success(res.data)
    }
  }).catch(function (err) {
    if (error) {
      error(err)
    }
  })
}

// package get, post, put, delete methods
export default {
  get: function (url, params, success, error) {
    return axiosAPI('GET', url, params, success, error)
  },
  post: function (url, params, success, error) {
    return axiosAPI('POST', url, params, success, error)
  },
  put: function (url, params, success, error) {
    return axiosAPI('PUT', url, params, success, error)
  },
  delete: function (url, params, success, error) {
    return axiosAPI('DELETE', url, params, success, error)
  }
}
