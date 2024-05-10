// index.js
Page({
  data:{
    topics:[],
  },
  onLoad:function(options){
    this.getData();
  },
  getData:function(){
    // wx.request({
    //   url: 'https://www.v2ex.com/api/topics/hot.json',
    //   success:(res)=>{
    //     // console.log(res);
    //     this.setData({
    //       topics: res.data
    //     })
    //   }
    // })
  },
  goTodo:function(){
    console.log('11')
    wx.switchTab({
      url: '/pages/todo/todo'
    })
    console.log('22')
  }
})
