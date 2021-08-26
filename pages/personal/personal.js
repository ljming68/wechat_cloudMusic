// pages/personal/personal.js
import request from "../../utils/request"
let startY = 0;  //手指起始坐标
let moveY = 0;  //手指移动实时的坐标
let moveDistance = 0;  //手指移动距离
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverTransfrom:'translateY(0)',
    coverTransition:'',
    userinfo:'',
    recentPlayList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userinfo = wx.getStorageSync('userinfo')
    if(userinfo){
      this.setData({
        userinfo:userinfo
      })
    }

    //  请求用户播放记录
    this.getRecentPlayData(this.data.userinfo.userId)
  },
// 手指点击事件
  handleTouchStart(event){
    startY = event.touches[0].clientY
    this.setData({
      coverTransition:''
    })
    // console.log(startY)
  },
// 手指开始事件
  handleTouchMove(event){
    moveY = event.touches[0].clientY
    moveDistance = moveY - startY
    // console.log(moveDistance)
    if(moveDistance<0){
      return 
    }
    if(moveDistance>80){
      moveDistance = 80
    }

    this.setData({
      coverTransfrom:`translateY(${moveDistance}rpx)`
    })
  },
  // 手指松开事件
  handleTouchEnd(){
    this.setData({
      coverTransfrom:`translateY(0)`,
      coverTransition:'transform 1s linear'
    })
  },
// 登录
  toLogin(){
    if(this.data.userinfo.nickname){
      return;
    }
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  // 获取用户播放记录功能
  async getRecentPlayData(userId){
    let result = await request('/user/record',{uid: userId,type: 0});
    console.log(result)

    // 给对象添加 一组键值对
    if(wx.getStorageSync('cookies')){
      let index =0;
      let recentPlayList = result.allData.slice(0,10).map(
        item =>{
          item.id = index++;
          return item;
        }
      )

      this.setData({
        recentPlayList:recentPlayList
      })
    }
    
  
    
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
    let userinfo = wx.getStorageSync('userinfo')
    if(userinfo){
      this.setData({
        userinfo:userinfo
      })
    }
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