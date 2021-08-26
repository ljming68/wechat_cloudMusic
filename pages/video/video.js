// pages/video/video.js
import request from "../../utils/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navDataList:[],
    navId:'',
    videoDataList:[],
    videoId:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNavData()
  },

  // 获取导航栏信息
  async getNavData(){
    let result = await request('/video/group/list')
    // console.log(result)

    this.setData({
      navDataList: result.data.slice(0,14),
      navId:result.data[0].id
    })
    this.getVideoData(this.data.navId)
  },
  // 获取视频数据 
  async getVideoData(navId){
  
    let result = await request('/video/group',{id:navId})
    console.log(result)
    let index = 0;
    let videoDataList = result.datas.map(
      item => {
        item.id =index++;
        return item;
      }
    )
    wx.hideLoading()
    this.setData({
      videoDataList:result.datas
    })
  },

  // 点击导航切换的回调
  changeNav(event){
    // let navId = event.currentTarget.id;
    let navId = event.currentTarget.dataset.id;
    console.log(navId,typeof navId)
    this.setData({
      navId:navId,
      videoDataList:[]
    })

    
    wx.showLoading({
      title:'加载中'
    }).then(()=>{
     
      this.getVideoData(this.data.navId)
    }
    )

  },
  //  点击播放回调
  handlePlay(event){
    // console.log(event)
    let vid = event.currentTarget.id
    this.setData({
      videoId:vid
    })
    
      //  解决 多个视频同时播放的问题
    // this.videoContext && this.vid!==vid && this.videoContext.stop()
    this.vid = vid
    //创建视频上下文对象
    this.videoContext=wx.createVideoContext(vid)
    this.videoContext.play()
    
    
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