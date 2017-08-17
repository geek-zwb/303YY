/**
 * Created by geekzwb on 2017/8/15.
 * What for:  take pictures
 * pages in the middle of toolbar
 * bug: 选中图片后 placeHolder 文字没跟随？
 */
// 获取应用实例
const app = getApp()

/**
 * 上传照片 page
 */
Page({
  data: {
    imgPath: ''
  },
  onReady: function () {
    this.chooseImg()
  },
  chooseImg: function () {
    let that = this
    wx.chooseImage({
      success: function(res) {
        let tempFilePaths = res.tempFilePaths
        that.setData({
          imgPath: tempFilePaths
        })
        /*wx.saveFile({
          tempFilePath: tempFilePaths[0],
          success: function(res) {
            let savedFilePath = res.savedFilePath
            that.setData({
              imgPath: savedFilePath
            })
            console.log('savedFilePath', savedFilePath);
          }
        })*/
      }
    })
  },
  /**
   * 提交照片描述
   * @param e
   */
  bindFormSubmit: function(e) {
    console.log(e.detail.value.textarea)
  }
})