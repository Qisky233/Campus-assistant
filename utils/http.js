// utils/http.js

const http = {
  /**
   * GET 请求
   * @param {string} url
   * @param {object} options
   * @returns {Promise}
   */
  get(url, options = {}) {
    return this.request({
      method: 'GET',
      url,
      ...options,
    });
  },

  /**
   * POST 请求
   * @param {string} url
   * @param {object} data
   * @param {object} options
   * @returns {Promise}
   */
  post(url, data, options = {}) {
    return this.request({
      method: 'POST',
      url,
      data,
      ...options,
    });
  },

  /**
   * 通用请求方法（底层封装 uni.request）
   * @param {object} config
   * @returns {Promise}
   */
  request(config) {
    return new Promise((resolve, reject) => {
      uni.request({
        ...config,
        success: (res) => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(res.data); // 返回响应数据
          } else {
            reject(new Error(`请求失败: ${res.statusCode}`));
          }
        },
        fail: (err) => {
          reject(err);
        },
      });
    });
  },
};

export { http };