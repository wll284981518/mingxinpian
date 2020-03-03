// pages/card/card.js
//获取应用实例
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
      motto: 'Hello World',
      userInfo: {},
      hasUserInfo: false,
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
      // 手机号
      phoneNum: "15238281391",
      // 邮箱号
      email: "284981518@qq.com",
      // 职业
      work: "全栈开发"
    },

    // 事件处理函数
    bindViewTap: function () {
      wx.navigateTo({
        url: '../logs/logs'
      })
    },

    // 微信拨打电话
    call: function () {
      var that = this
      // 微信拨打电话，跳到电话页面
      wx.makePhoneCall({ 
        phoneNumber: that.data.phoneNum,   // phoneNumber 是需要拨打的电话号码
      })
    },

    //微信邮箱复制
    emailPaste: function () {
      var that = this
      // 微信剪切板
      wx.setClipboardData({
        data: that.data.email,  // 需要设置的内容
        success: function (res) {  // 接口调用成功的回调函数
          wx.showToast({
            title: '内容已复制',  // 弹出框
          })
        }
      })
  },

  //微信职业复制
  workPaste: function () {
    var that = this
    // 微信剪切板
    wx.setClipboardData({
      data: that.data.work, // 需要设置的内容
      success: function (res) {  // 接口调用成功的回调函数
        wx.showToast({
          title: '内容已复制', // 弹出框
        })
      }
    })
  },

  //保存电话
  savePhone: function () {
    // console.log("我的世界")
    var that = this;
    // 显示操作菜单
     // 提示呼叫号码还是将号码添加到手机通讯录
    wx.showActionSheet({
      itemList: ['创建新联系人', '添加到现有联系人'], // 按钮的文字数组，数组长度最大为6个
      success: function (res) {
        if (res.tapIndex === 0) {
          // 呼叫号码
          wx.makePhoneCall({
            phoneNumber: that.data.phoneNum,
          })
        } else if (res.tapIndex == 1) {
          // 添加到手机通讯录
          wx.addPhoneContact({ 
            firstName: '汪琳琳', //联系人姓名
            mobilePhoneNumber: that.data.phoneNum, //联系人手机号  
          })
        }
      },
      fail(res) {  // 接口调用失败的回调函数
        console.log(res.errMsg)
      }
      // success(res) {  // 接口调用成功的回调函数，详见返回参数说明
      //   wx.addPhoneContact({ 
      //     firstName: '汪琳琳', //联系人姓名
      //     mobilePhoneNumber: that.data.phoneNum, //联系人手机号  
      //   })
      // },
      // fail(res) {  // 接口调用失败的回调函数
      //   console.log(res.errMsg)
      // }
    })
  },

  //分享好友
  onShareAppMessage: function (res) {
    if (res.from === 'view') {
      console.log(res.target)
    }
    return {
      title: "分享",
      // imgUrl: "images/mingpian_active.png",
      path: '/pages/card/card',
      success: function (res) {
        console.log('成功', res)
      }
    }
  },

  /**
  *  图片预览方法
  *  此处注意的一点就是，调用 "wx.previewImage"时，第二个参数要求为数组形式哦
  *  当然，做过图片上传功能的应该会注意到，如果涉及到多张图片预览，图片链接数组集合即为参数 urls！
  */

  /**
   * 生命周期函数--监听页面加载
   */
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current,
      urls: [current]
    })
  },
  
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})