/**
 * @file home.js
 * Created by geekzwb on 2017/8/15.
 * What for: 首页
 */
// 引入utils包下的js文件
const Constant = require('../../utils/constant.js');

// 获取应用实例
var app = getApp()

/**
 * 注册 page
 */
Page({
  data: {
    imgList: [],
    loading: false
  },

  onLoad: function () {
    const that = this;
    requestData(that, mCurrentPage + 1)
  },

  onReachBottom: function () {
    var that = this
    that.setData({
      hidden: false,
    });
    requestData(that, mCurrentPage + 1);
  },
  /**
   * 预览图片
   */
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: mUrl // 需要预览的图片http链接列表
    })
  }
})

/**
 * 定义几个数组用来存取item中的数据
 */
let mUrl = [];
let mDesc = [];
let mWho = [];
let mTimes = [];
let mTitles = [];
let mKeys = [];

let mCurrentPage = 0;

/**
 * 请求数据
 * @param that Page的对象，用来setData更新数据
 * @param targetPage 请求的目标页码
 */
function requestData(that, targetPage) {
  wx.showToast({
    title: '加载中',
    icon: 'loading'
  });
  wx.request({
    url: Constant.GET_MEIZHI_URL + targetPage,
    header: {
      "Content-Type": "application/json"
    },
    success: function (res) {
      if (
        res === null
        || res.data == null
        || res.data.results == null
        || res.data.results.length <= 0
      ) {
        return;
      }


      for (let i = 0; i < res.data.results.length; i++) {
        bindData(res.data.results[i]);
      }

      //将获得的各种数据写入itemList，用于setData
      let itemList = [];
      for (let i = 0; i < mUrl.length; i++) {
        let likeCount = Math.random() * 1000;
        likeCount = parseInt(likeCount, 10);
        itemList.push({
          likeCount,
          key: mKeys[i],
          url: mUrl[i],
          desc: mDesc[i],
          who: mWho[i],
          time: mTimes[i],
          title: mTitles[i]
        });
      }

      that.setData({
        imgList: itemList,
        hidden: true,
        // loadmorehidden:false,
      });

      mCurrentPage = targetPage;

      wx.hideToast();
    }
  });
}

/**
 * 绑定接口中返回的数据
 * @param itemData Gank.io返回的content;
 */
function bindData(itemData) {

  const url = itemData.url.replace("//ww", "//ws");
  const desc = itemData.desc;
  const who = itemData.who;
  const times = itemData.publishedAt.split("T")[0];
  const key = itemData._id;


  mUrl.push(url);
  mDesc.push(desc);
  mWho.push(who);
  mTimes.push(times);
  mTitles.push("publish by：" + "@" + who + " —— " + times);
  mKeys.push(key);
}