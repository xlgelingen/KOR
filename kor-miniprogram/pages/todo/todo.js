// index.js
var app = getApp();
Page({
  data: {
    token: "1",
    topics: [],
    todoId: null,
    showDialog: false,
    groups: [
      { text: '关联', value: 1 },
      { text: '完成', value: 2 },
      { text: '删除', type: 'warn', value: 3 }
    ],
    inputValue: '',
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
        // console.log('getData/res', res.data)
        this.setData({
          topics: res.data.data
        })
      },
      fail: (error) => {
        console.error(error);
      }
    })
  },
  addTodo: function (e) {
    this.data.inputValue = e.detail.value;
    console.log('addTodo/content', this.data.inputValue);
    wx.request({
      url: 'http://127.0.0.1:3000/todo',
      method: 'POST',
      data: { content: this.data.inputValue },
      header: {
        'Authorization': `Bearer ${this.data.token}`,
      },
      success: (res) => {
        this.getData();
        this.setData({ inputValue: '' });
      },
      fail: (error) => {
        console.error(error);
      }
    })

  },
  operateDialog: function (e) {
    this.setData({
      showDialog: true,
      todoId: e.currentTarget.dataset.itemId
    });
    console.log('operateDialog/todoId', this.data.todoId)
  },
  btnClick: function (e) {
    var oprateId = e.detail.value;
    const todoId = this.data.todoId
    console.log('oprateId', oprateId);
    if (oprateId == 1) {
      console.log('oprateId is 1');
      wx.navigateTo({
        url: '/pages/todo_keyresult/todo_keyresult?todoId=' + todoId,
      });
      this.setData({
        showDialog: false,
      });
    }
    if (oprateId == 2) {
      console.log('oprateId is 2');
      wx.request({
        url: 'http://127.0.0.1:3000/todo/complete/' + todoId,
        method: 'PATCH',
        header: {
          'Authorization': `Bearer ${this.data.token}`,
        },
        success: (res) => {
          console.log('getData/res', res.data)
          this.getData();
          this.setData({
            showDialog: false,
          });
        },
      })
    }
    if (oprateId == 3) {
      console.log('oprateId is 3');
      wx.request({
        url: 'http://127.0.0.1:3000/todo/' + todoId,
        method: 'DELETE',
        header: {
          'Authorization': `Bearer ${this.data.token}`,
        },
        success: (res) => {
          this.delTodoKR(todoId);
          this.getData();
          this.setData({
            showDialog: false,
          });
        },
      })
    }
  },
  delTodoKR(id) {
    wx.request({
      url: 'http://127.0.0.1:3000/todo-keyresult/',
      method: 'DELETE',
      data: { todoId: id },
      header: {
        'Authorization': `Bearer ${this.data.token}`,
      },
      success: (res) => {
        console.log('删除TodoKR成功')
      },
    })
  }
})
