// pages/index/index.js

import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners:[],//轮播图数据
    recommendList:[],//推荐歌单数据
    topList:[],//排行榜数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:  function (options) {
    //发送请求数据
    // wx.request({
    //   url: 'http://localhost:3000/banner',
    //   data:{
    //     type:2,
    //   },
    //   success:(res)=>{
    //     console.log(res.data)
    //     this.setData({
    //       banners:res.data.banners
    //     }) 
    //   },
    //   fail:(err)=>{
    //     console.log(err)
    //   },
    // })
    this.getInitData();


  },
// 异步封装请求轮播图数据
  async getInitData(){
    // 获取轮播图数据
    let result = await request('/banner',{type:2})
    // console.log(result)
    this.setData({
      banners:result.banners
    })
    // 获取推荐歌单数据
    result = await request('/personalized')
    // console.log(result)
    this.setData({
      recommendList:result.result
    })
    // 获取排行榜数据
    let index=0;
    let addList=[];
    while(index<5){
      result = await request('/top/list',{idx:index++})
      // console.log(result)
      addList.push({name:result.playlist.name,tracks:result.playlist.tracks.slice(0,3)})
     
      

    };



    this.setData({
      topList:addList
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