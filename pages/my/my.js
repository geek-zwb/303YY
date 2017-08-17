/**
 * @file my.js
 * Created by geekzwb on 2017/8/15.
 * What for: 我的
 */

// 获取应用实例
const app = getApp()

/**
 * 注册 page
 */
Page({
  data: {
    motto: 'Have a try',
    userInfo: {},
    hasUserInfo: false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        motto: `欢迎你！${app.globalData.userInfo.nickName} ~`
      })
    } else {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          motto: `欢迎你！${res.userInfo.nickName} ~`
        })
      }
    }
  },

  getUserInfo: function(e) {
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
      motto: `欢迎你！${e.detail.userInfo.nickName} ~`
    })
  },

  onReady: function () {
    wx.setNavigationBarTitle({
      title: '我的'
    })
  }
})
