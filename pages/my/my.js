/**
 * @file my.js
 * Created by geekzwb on 2017/8/15.
 * What for: 我的
 */

// 获取应用实例
var app = getApp()

/**
 * 注册 page
 */
Page( {
  data: {
    userInfo: {},
    source: ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo( {
      url: '../logs/logs'
    })
  },

  onLoad: function() {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo( function( userInfo ) {
      //更新数据
      that.setData( {
        userInfo: userInfo
      })
    })
  },

  onReady: function () {
    wx.setNavigationBarTitle({
      title: '我的'
    })
  }
})
