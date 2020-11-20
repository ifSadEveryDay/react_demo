import axios from 'axios';
import qs from 'qs';
// 携带cookie
axios.defaults.withCredentials = false;
// 请求次数与间隔
axios.defaults.retry = 1;
axios.defaults.retryDelay = 1000;
// 设置defaults.baseURL
axios.defaults.baseURL = 'http://mock.studyinghome.com/mock/5e60c3a1597ac8103c472f9a/example';
// axios.interceptors.response.InterceptorManager.handlers = [];
// 响应拦截，请求超时时，重新请求
axios.interceptors.response.use(response => {
  return Promise.resolve(response.data) 
});

// 请求拦截
axios.interceptors.request.use(function(config) {
  // 处理smartweb的请求，加上systemId
  return Promise.resolve(config);
});
const CancelToken = axios.CancelToken;
let cancel;

// 封装常用请求接口
const config = {
  /**
   * get获取数据，通用方法
   * @param {String} url
   * @param {Object} params
   * @param {Object} options
   */
  doGetPromise(url, params, options = {}) {
    const {
      timeout = 30000, ...arg
    } = options;

    // 如果参数值为空，手动赋值空字符串确保接口能收到
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] === null || params[key] === undefined) {
          params[key] = ' ';
        }
      });
    }

    return new Promise((resolve, reject) => {
      axios
        .get(url, {
          timeout: timeout,
          ...arg,
          params: {
            // systemId: store.state.platformInfo.systemId, // 全面接口添加systemId字段
            ...params
            // t: new Date().getTime() // 解决IE上get请求缓存问题
          },
          cancelToken: new CancelToken(function executor(c) {
            cancel = c;
          })
        })
        .then(response => {
          resolve(response);
        })
        .catch(response => {
          reject(response);
        });
    });
  },

  /**
   * FormData数据上传，文件上传必用
   * @param {String} url
   * @param {FormData} formData
   */
  doPostPromiseForm(url, formData) {
    return new Promise((resolve, reject) => {
      // 全面接口添加systemId字段
      if (formData.has) {
        // ie FormData没有has方法
        // if (!formData.has('systemId')) {
        //   formData.append('systemId', store.state.platformInfo.systemId);
        // }
      }
      axios
        .post(url, formData, {
          headers: {
            'Content-type': 'multipart/form-data'
          },
          emulateJSON: false,
          emulateHTTP: false,
          cancelToken: new CancelToken(function executor(c) {
            cancel = c;
          })
        })
        .then(res => {
          resolve(res);
        })
        .catch(res => {
          reject(res);
        });
    });
  },

  /**
   * 默认方式提交from表单数据
   * @param {String} url
   * @param {Object} data
   */
  doPostPromise(url, data) {
    return new Promise((resolve, reject) => {
      // 全面接口添加systemId字段
      // if (!data.hasOwnProperty('systemId')) {
      //   data.systemId = store.state.platformInfo.systemId;
      // }
      axios
        .post(url, qs.stringify(data, {
          arrayFormat: 'brackets'
        }), {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded'
          },
          cancelToken: new CancelToken(function executor(c) {
            cancel = c;
          })
        })
        .then(res => {
          resolve(res);
        })
        .catch(res => {
          reject(res);
        });
    });
  },

  /**
   * 默认方式提交json数据
   * @param {String} url
   * @param {Object} data
   */
  doPostPromiseJson(url, data) {
    return new Promise((resolve, reject) => {
      // 全面接口添加systemId字段
      // if (!data.hasOwnProperty('systemId')) {
      //   data.systemId = store.state.platformInfo.systemId;
      // }
      axios
        .post(url, data, {
          headers: {
            'Content-type': 'application/json'
          },
          cancelToken: new CancelToken(function executor(c) {
            cancel = c;
          })
        })
        .then(res => {
          resolve(res);
        })
        .catch(res => {
          reject(res);
        });
    });
  }
};


export default config;