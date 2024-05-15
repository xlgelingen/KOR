// app.js
App({
  globalData: {
    token: '',
  },
  onLaunch: function (options) {
    this.checkLogin();
  },
  // 登录检测：token
  checkLogin() {
    console.log('登录检测：token')
    //全局变量或缓存中存在token，直接赋值，否则重新登录
    var token = this.globalData.token
    if (!token) {
      token = wx.getStorageSync('token')
      if (token) {
        this.globalData.token = token;
      } else {
        this.login();
      }
    }
  },
  login: function () {
    // wx.login()获取code
    wx.login({
      success: (res) => {
        console.log("code: " + res.code);
        wx.request({
          url: 'http://127.0.0.1:3000/auth/login',
          method: 'POST',
          data: {
            code: res.code
          },
          success: (res) => {
            const access_token = res.data.data.access_token
            console.log('access_token',access_token);
            // 将token保存为公共数据（多页面使用->全局globalData）
            this.globalData.token = access_token
            // // 将token保存在数据缓存中（下次无需重新获取token）
            wx.setStorage({
              key: 'token',
              data: access_token
            })
          }
        })
      }
    })
  }
})
