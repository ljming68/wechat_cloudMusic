// pages/recommendSong/recommendSong.js
import PubSub from "pubsub-js";

import request from  "../../utils/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    day:'',
    month:'',
    recommendSongList:[],
    index:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      day: new Date().getDate(),
      month: new Date().getMonth() + 1
    })
    this.getRecommendSongList();

    //订阅来自 songDetail的消息
    PubSub.subscribe('switchType',(msg,switchType) => {
      // console.log('来自songDetail的消息:',switchType);
      let {recommendSongList,index} = this.data
      if(switchType==='pre'){//上一首
        (index === 0) && (index = recommendSongList.length)
        index -= 1
      }else{
        (index === recommendSongList.length - 1) && (index = -1)
        index += 1
      }
      this.setData({
        index
      })
      let musicId = recommendSongList[index].id;
      PubSub.publish('musicId',musicId);
    })
  },

  // 获取推荐歌单
  async getRecommendSongList(){
    let result = await request("/recommend/songs")
    // console.log(result)

    this.setData({
      recommendSongList:result.recommend
    })
  },

  //  跳转到详情页面
  toSongDetail(event){
    // let song = event.currentTarget.dataset.song;
    let musicId = event.currentTarget.dataset.id
    let index = event.currentTarget.dataset.index
    this.setData({
      index
    })
    // console.log(index)
    //  路由跳转传参  query
    wx.navigateTo({
      // url: '/pages/songDetial/songDetial?song=' + JSON.stringify(song),
      url: '/pages/songDetail/songDetail?musicId=' +  musicId,
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