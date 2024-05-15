/**node.js**/
var app = getApp();
Page({
  data: {
    token: "1",
    topics: [],
  },
  onLoad: function (options) {
    this.setData({
      token: app.globalData.token
    });
    this.getData();
  },
  getData: function () {
    // console.log('getData/todo', this.data.token);
    wx.request({
      url: 'http://127.0.0.1:3000/todo',
      header: {
        'Authorization': `Bearer ${this.data.token}`,
      },
      success: (res) => {
        console.log('getData/res', res.data)
        this.setData({
          topics: res.data.data
        })
      },
      fail: (error) => {
        console.error(error);
      }
    })
  },
})

