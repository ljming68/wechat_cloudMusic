// pages/songDetial/songDetial.js
import PubSub from "pubsub-js";
import moment from "moment";

import request from '../../utils/request';
// 获取app全局实例
let appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay:false,
    musicDetail:{},
    musicId:'',
    musicLink:'',
    currentTime:'00:00', //已经播放时间
    durtionTime:'00:00',//总时间
    currentWidth:'0',//时长进度显示
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // options : 用来接收路由的参数  ，默认是空对象
    //  JSON.parse 将json 对象编译成js对象 

    // 原生小程序对url有长度限制，如果传参内容过长会自动截掉
    // console.log(options);
    // let song = JSON.parse(options.song)

    let musicId = options.musicId
    this.setData({
      musicId
    })
    // console.log(typeof musicId)
    this.getMusicDetail(musicId)

    // 判断当前音乐是否在播放
    if( appInstance.globalData.isMusicPlay && appInstance.globalData.musicId === musicId){
      this.setData({
        isPlay: true
      })
      
    }
    this.BackgroundAudioManager = wx.getBackgroundAudioManager();
    // 监听音乐播放 / 暂停 / 停止
    this.BackgroundAudioManager.onPlay(() =>{
      this.changeIsPlayState(true);
      appInstance.globalData.musicId = musicId;
    })
    this.BackgroundAudioManager.onPause(() =>{
      this.changeIsPlayState(false);
    })
    this.BackgroundAudioManager.onStop(() =>{ 
      this.changeIsPlayState(false);
    })
    // 监听歌曲播放结束
    this.BackgroundAudioManager.onEnded(() =>{ 
      PubSub.publish('switchType',"next")
      this.setData({
        currentTime:'00:00', //已经播放时间
        durtionTime:'00:00',//总时间
        currentWidth:'0',//时长进度显示
      })
    })


    // 监听播放时间
    this.BackgroundAudioManager.onTimeUpdate(() =>{
      // console.log("播放时间",this.BackgroundAudioManager.currentTime)
      let currentTime = moment(this.BackgroundAudioManager.currentTime*1000).format('mm:ss');
      let {durtionTime} = this.data
      let currentWidth = (this.BackgroundAudioManager.currentTime / this.BackgroundAudioManager.duration)*450
      console.log(currentWidth)
      this.setData({
        currentTime,
        currentWidth
      })
    })

    // 订阅  musicId
    PubSub.subscribe('musicId',(msg,musicId) => {
      console.log('来自recommendSong页面发布的消息:',musicId);
      this.getMusicDetail(musicId);
      this.musicControl(true,musicId);
    })
  },

  // 封装修改状态的功能函数
  changeIsPlayState(isPlay){
    this.setData({
      isPlay:isPlay
    })
    appInstance.globalData.isMusicPlay = isPlay;
  },
  // 播放音乐
  handleMusicPlay(){
    let isPlay = ! this.data.isPlay
    this.setData({
      isPlay
    })

    let {musicId,musicLink} = this.data
    this.musicControl(isPlay,musicId,musicLink)
  },

  // 封装获取音乐详情的函数
  async getMusicDetail(musicId){
    let result = await request('/song/detail',{ids: musicId});
    // console.log(result)
    let durtionTime = moment(result.songs[0].dt).format('mm:ss');
    this.setData({
      musicDetail:result.songs[0],
      durtionTime
    })
    wx.setNavigationBarTitle({
      // title:result.songs[0].al.name
      title:this.data.musicDetail.al.name
    })
  },

  // 封装播放音乐和暂停音乐的函数
  async musicControl(isPlay,musicId,musicLink){
   
    // let BackgroundAudioManager = wx.getBackgroundAudioManager();
    if(isPlay){
      if(!musicLink){
        let result = await request('/song/url',{id: musicId})
        let musicUrl = result.data[0].url
        this.setData({
          musicLink:musicUrl
        })
      }
     

      // 生成背景音乐实例
      this.BackgroundAudioManager.src = this.data.musicLink;
      this.BackgroundAudioManager.title = this.data.musicDetail.al.name
      // appInstance.globalData.isMusicPlay = true;
      // appInstance.globalData.musicId = musicId;
    }else{
      this.BackgroundAudioManager.pause();
      // appInstance.globalData.isMusicPlay = false;
      // appInstance.globalData.musicId = musicId;
    }
  },



  // 点击切换歌曲的回调
  handleSwitch(event){
    let type = event.currentTarget.id
    console.log(type)

    this.BackgroundAudioManager.stop();

    // 将切换歌曲的类型发送给 recommendSong 页面
    PubSub.publish('switchType',type)
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