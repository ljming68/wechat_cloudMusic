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
    videoUpdateTime:[],
    isTriggered:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNavData()
    console.log(wx.getStorageSync('cookies')[0])
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
    if(!result.datas){
      return;
    }

    let index = 0;
    let videoDataList = result.datas.map(
      item => {
        item.id =index++;
        return item;
      }
    )
    // 关闭消息提示框
    wx.hideLoading()
    this.setData({
      videoDataList,
      isTriggered:false
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
    // this.vid = vid
    //创建视频上下文对象
    this.videoContext=wx.createVideoContext(vid)
    // 判断当前是否有播放记录
    let {videoUpdateTime}=this.data;
    let videoItem = videoUpdateTime.find(item => item.vid ===vid);
    if(videoItem){
      this.videoContext.seek(videoItem.currentTime)
    }

    // 播放当前视频
    // this.videoContext.play()
    
    
  },
  // 视频播放进度实时变化的回调
  handleTimeUpdate(event){
    
    // 
    let videoTimeObj = {vid:event.currentTarget.id,currentTime:event.detail.currentTime}
    
    let {videoUpdateTime} = this.data;
    let videoItem = videoUpdateTime.find(item => item.vid===event.currentTarget.id)
    if(videoItem){
      videoItem.currentTime = event.detail.currentTime;
    }else{
      videoUpdateTime.push(videoTimeObj)
      // this.data.videoUpdateTime.push(videoTimeObj)
    }

    this.setData({
      videoUpdateTime
    })
  },
  
  // 监听视频结束时的回调
  handleEnd(event){
    let {videoUpdateTime} =this.data
    videoUpdateTime.splice(videoUpdateTime.findIndex(item => item.vid === event.currentTarget.id), 1)
    this.setData({
      videoUpdateTime
    })
  },

  // 监听上拉scroll-view加载
  handleTolower(){
    console.log('上拉了')
    let newVideoList =[
     
            {
                "type": 1,
                "displayed": false,
                "alg": "onlineHotGroup",
                "extAlg": null,
                "data": {
                    "alg": "onlineHotGroup",
                    "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
                    "threadId": "R_VI_62_15C494501DDA1953B03A2B905234E725",
                    "coverUrl": "https://p2.music.126.net/xG3xvNaPvcnjTBH6LulcGw==/109951163573675253.jpg",
                    "height": 720,
                    "width": 1288,
                    "title": "8年前这首歌火遍大街小巷，原唱一开口话筒罢工，尴尬了！",
                    "description": "刘惜君《我很快乐》一开口话筒不给力，这是闹哪样！[大哭]",
                    "commentCount": 3358,
                    "shareCount": 6089,
                    "resolutions": [
                        {
                            "resolution": 240,
                            "size": 19765735
                        },
                        {
                            "resolution": 480,
                            "size": 31055667
                        },
                        {
                            "resolution": 720,
                            "size": 46634769
                        }
                    ],
                    "creator": {
                        "defaultAvatar": false,
                        "province": 1000000,
                        "authStatus": 0,
                        "followed": false,
                        "avatarUrl": "http://p1.music.126.net/VPGeeVnQ0jLp4hK9kj0EPg==/18897306347016806.jpg",
                        "accountStatus": 0,
                        "gender": 0,
                        "city": 1002400,
                        "birthday": -2209017600000,
                        "userId": 449979212,
                        "userType": 207,
                        "nickname": "全球潮音乐",
                        "signature": "有时候音乐是陪我熬过那些夜晚的唯一朋友。",
                        "description": "",
                        "detailDescription": "",
                        "avatarImgId": 18897306347016810,
                        "backgroundImgId": 18987466300481468,
                        "backgroundUrl": "http://p1.music.126.net/qx6U5-1LCeMT9t7RLV7r1A==/18987466300481468.jpg",
                        "authority": 0,
                        "mutual": false,
                        "expertTags": null,
                        "experts": {
                            "1": "音乐视频达人",
                            "2": "华语音乐|欧美音乐资讯达人"
                        },
                        "djStatus": 0,
                        "vipType": 0,
                        "remarkName": null,
                        "avatarImgIdStr": "18897306347016806",
                        "backgroundImgIdStr": "18987466300481468"
                    },
                    "urlInfo": {
                        "id": "15C494501DDA1953B03A2B905234E725",
                        "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/3obd13Zh_1667983824_shd.mp4?ts=1630125515&rid=ABC4B7F5AF629FC4F2795F61577AF93C&rl=3&rs=zmraywMdTkgmsunqGFMmePJJvrMuFzof&sign=5ed3685201fefc61f32c72172c6b6b25&ext=nLH1uHluXrss3ohLaxwO%2FhD4BhsT1bknwmGit2jLIUHUtaZNxCHZ%2FHpVAoiq3P6OvBpRWmxeQ7KPfH0s%2BDoNCNYip9EBYuc%2FhZ5t0Fas8SpaIhaxEI1y6zqwUcpmD4mkClhT%2Bj7SeaGnCKh0tJjGOzNPXjNkFQnGL%2B9mHoQ8UQjZJKTpSMX5c3iIFZW7t8fIQ3uhIrglX3p2hL6dZlYfTuuZjjRJmO%2BytCPgOlrruR9L54NIvC9QZ0%2FqqSk%2Bbry4",
                        "size": 46634769,
                        "validityTime": 1200,
                        "needPay": false,
                        "payInfo": null,
                        "r": 720
                    },
                    "videoGroup": [
                        {
                            "id": 58100,
                            "name": "现场",
                            "alg": null
                        },
                        {
                            "id": 59101,
                            "name": "华语现场",
                            "alg": null
                        },
                        {
                            "id": 57108,
                            "name": "流行现场",
                            "alg": null
                        },
                        {
                            "id": 59108,
                            "name": "巡演现场",
                            "alg": null
                        },
                        {
                            "id": 1100,
                            "name": "音乐现场",
                            "alg": null
                        },
                        {
                            "id": 5100,
                            "name": "音乐",
                            "alg": null
                        }
                    ],
                    "previewUrl": null,
                    "previewDurationms": 0,
                    "hasRelatedGameAd": false,
                    "markTypes": null,
                    "relateSong": [],
                    "relatedInfo": null,
                    "videoUserLiveInfo": null,
                    "vid": "15C494501DDA1953B03A2B905234E725",
                    "durationms": 206914,
                    "playTime": 8643426,
                    "praisedCount": 57197,
                    "praised": false,
                    "subscribed": false
                }
            },
            {
                "type": 1,
                "displayed": false,
                "alg": "onlineHotGroup",
                "extAlg": null,
                "data": {
                    "alg": "onlineHotGroup",
                    "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
                    "threadId": "R_VI_62_A5CA712B8AD35EB47746491003F92619",
                    "coverUrl": "https://p2.music.126.net/_IhLCb7lqQRLMjdvXTNvxw==/109951163194825681.jpg",
                    "height": 720,
                    "width": 1280,
                    "title": "上海1.17梦龙演唱会原版shots 超感动现场",
                    "description": "imagine dragons 竟然唱了原版的shots，简直是太感人了==！！！",
                    "commentCount": 166,
                    "shareCount": 257,
                    "resolutions": [
                        {
                            "resolution": 240,
                            "size": 34906898
                        },
                        {
                            "resolution": 480,
                            "size": 50009104
                        },
                        {
                            "resolution": 720,
                            "size": 79898657
                        }
                    ],
                    "creator": {
                        "defaultAvatar": false,
                        "province": 310000,
                        "authStatus": 0,
                        "followed": false,
                        "avatarUrl": "http://p1.music.126.net/G-SaIMxG1_2Mstb1-6qBWA==/109951163585856789.jpg",
                        "accountStatus": 0,
                        "gender": 0,
                        "city": 310101,
                        "birthday": 790185600000,
                        "userId": 90845132,
                        "userType": 0,
                        "nickname": "咸翻翻",
                        "signature": "废柴",
                        "description": "",
                        "detailDescription": "",
                        "avatarImgId": 109951163585856780,
                        "backgroundImgId": 109951163591750500,
                        "backgroundUrl": "http://p1.music.126.net/4_IUSZMx6227fca3vZ7tdQ==/109951163591750498.jpg",
                        "authority": 0,
                        "mutual": false,
                        "expertTags": null,
                        "experts": null,
                        "djStatus": 0,
                        "vipType": 11,
                        "remarkName": null,
                        "avatarImgIdStr": "109951163585856789",
                        "backgroundImgIdStr": "109951163591750498"
                    },
                    "urlInfo": {
                        "id": "A5CA712B8AD35EB47746491003F92619",
                        "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/7DopJmtc_1341207771_shd.mp4?ts=1630125515&rid=ABC4B7F5AF629FC4F2795F61577AF93C&rl=3&rs=DZrOEDlPIZBkUcwqLbaXqPkKtVLjZFet&sign=1460b695d55f5320afab573d3de5d9f3&ext=nLH1uHluXrss3ohLaxwO%2FhD4BhsT1bknwmGit2jLIUHUtaZNxCHZ%2FHpVAoiq3P6OvBpRWmxeQ7KPfH0s%2BDoNCNYip9EBYuc%2FhZ5t0Fas8SpaIhaxEI1y6zqwUcpmD4mkClhT%2Bj7SeaGnCKh0tJjGOzNPXjNkFQnGL%2B9mHoQ8UQjZJKTpSMX5c3iIFZW7t8fIQ3uhIrglX3p2hL6dZlYfTuuZjjRJmO%2BytCPgOlrruR9L54NIvC9QZ0%2FqqSk%2Bbry4",
                        "size": 79898657,
                        "validityTime": 1200,
                        "needPay": false,
                        "payInfo": null,
                        "r": 720
                    },
                    "videoGroup": [
                        {
                            "id": 58100,
                            "name": "现场",
                            "alg": null
                        },
                        {
                            "id": 9102,
                            "name": "演唱会",
                            "alg": null
                        },
                        {
                            "id": 57106,
                            "name": "欧美现场",
                            "alg": null
                        },
                        {
                            "id": 57110,
                            "name": "饭拍现场",
                            "alg": null
                        },
                        {
                            "id": 1100,
                            "name": "音乐现场",
                            "alg": null
                        },
                        {
                            "id": 5100,
                            "name": "音乐",
                            "alg": null
                        },
                        {
                            "id": 13164,
                            "name": "快乐",
                            "alg": null
                        }
                    ],
                    "previewUrl": null,
                    "previewDurationms": 0,
                    "hasRelatedGameAd": false,
                    "markTypes": null,
                    "relateSong": [
                        {
                            "name": "Shots",
                            "id": 30373640,
                            "pst": 0,
                            "t": 0,
                            "ar": [
                                {
                                    "id": 94779,
                                    "name": "Imagine Dragons",
                                    "tns": [],
                                    "alias": []
                                }
                            ],
                            "alia": [],
                            "pop": 100,
                            "st": 0,
                            "rt": null,
                            "fee": 1,
                            "v": 29,
                            "crbt": null,
                            "cf": "",
                            "al": {
                                "id": 3098384,
                                "name": "Shots",
                                "picUrl": "http://p4.music.126.net/meqisONuzYw9ClJgmnJ0OQ==/7888995929406149.jpg",
                                "tns": [],
                                "pic": 7888995929406149
                            },
                            "dt": 232333,
                            "h": {
                                "br": 320000,
                                "fid": 0,
                                "size": 9296501,
                                "vd": -53806
                            },
                            "m": {
                                "br": 192000,
                                "fid": 0,
                                "size": 5577918,
                                "vd": -51228
                            },
                            "l": {
                                "br": 128000,
                                "fid": 0,
                                "size": 3718626,
                                "vd": -49681
                            },
                            "a": null,
                            "cd": "1",
                            "no": 1,
                            "rtUrl": null,
                            "ftype": 0,
                            "rtUrls": [],
                            "djId": 0,
                            "copyright": 2,
                            "s_id": 0,
                            "mst": 9,
                            "cp": 7003,
                            "mv": 384613,
                            "rtype": 0,
                            "rurl": null,
                            "publishTime": 1422288000007,
                            "privilege": {
                                "id": 30373640,
                                "fee": 1,
                                "payed": 0,
                                "st": 0,
                                "pl": 0,
                                "dl": 0,
                                "sp": 0,
                                "cp": 0,
                                "subp": 0,
                                "cs": false,
                                "maxbr": 999000,
                                "fl": 0,
                                "toast": false,
                                "flag": 4,
                                "preSell": false
                            }
                        },
                        {
                            "name": "Shots (Broiler Remix)",
                            "id": 31789010,
                            "pst": 0,
                            "t": 0,
                            "ar": [
                                {
                                    "id": 94779,
                                    "name": "Imagine Dragons",
                                    "tns": [],
                                    "alias": []
                                },
                                {
                                    "id": 886022,
                                    "name": "Broiler",
                                    "tns": [],
                                    "alias": []
                                }
                            ],
                            "alia": [],
                            "pop": 100,
                            "st": 0,
                            "rt": null,
                            "fee": 1,
                            "v": 40,
                            "crbt": null,
                            "cf": "",
                            "al": {
                                "id": 3138008,
                                "name": "Shots",
                                "picUrl": "http://p4.music.126.net/_WUjq86Db9pfhpwaYeoLqQ==/109951163219130849.jpg",
                                "tns": [],
                                "pic_str": "109951163219130849",
                                "pic": 109951163219130850
                            },
                            "dt": 191000,
                            "h": {
                                "br": 320000,
                                "fid": 0,
                                "size": 7665616,
                                "vd": -17000
                            },
                            "m": {
                                "br": 192000,
                                "fid": 0,
                                "size": 4599467,
                                "vd": -14500
                            },
                            "l": {
                                "br": 128000,
                                "fid": 0,
                                "size": 3066393,
                                "vd": -13099
                            },
                            "a": null,
                            "cd": "1",
                            "no": 1,
                            "rtUrl": null,
                            "ftype": 0,
                            "rtUrls": [],
                            "djId": 0,
                            "copyright": 0,
                            "s_id": 0,
                            "mst": 9,
                            "cp": 7003,
                            "mv": 419807,
                            "rtype": 0,
                            "rurl": null,
                            "publishTime": 1430668800007,
                            "privilege": {
                                "id": 31789010,
                                "fee": 1,
                                "payed": 0,
                                "st": 0,
                                "pl": 0,
                                "dl": 0,
                                "sp": 0,
                                "cp": 0,
                                "subp": 0,
                                "cs": false,
                                "maxbr": 320000,
                                "fl": 0,
                                "toast": false,
                                "flag": 4,
                                "preSell": false
                            }
                        },
                        {
                            "name": "Shots (Broiler Remix)",
                            "id": 31311695,
                            "pst": 0,
                            "t": 0,
                            "ar": [
                                {
                                    "id": 94779,
                                    "name": "Imagine Dragons",
                                    "tns": [],
                                    "alias": []
                                },
                                {
                                    "id": 886022,
                                    "name": "Broiler",
                                    "tns": [],
                                    "alias": []
                                }
                            ],
                            "alia": [],
                            "pop": 100,
                            "st": 0,
                            "rt": null,
                            "fee": 8,
                            "v": 27,
                            "crbt": null,
                            "cf": "",
                            "al": {
                                "id": 3117171,
                                "name": "Shots (Broiler Remix)",
                                "picUrl": "http://p4.music.126.net/pCggmlokub94Lxop1a3KOQ==/2942293116060555.jpg",
                                "tns": [],
                                "pic": 2942293116060555
                            },
                            "dt": 190000,
                            "h": {
                                "br": 320000,
                                "fid": 0,
                                "size": 7603765,
                                "vd": -8700
                            },
                            "m": {
                                "br": 192000,
                                "fid": 0,
                                "size": 4562276,
                                "vd": -6000
                            },
                            "l": {
                                "br": 128000,
                                "fid": 0,
                                "size": 3041532,
                                "vd": -4500
                            },
                            "a": null,
                            "cd": "1",
                            "no": 1,
                            "rtUrl": null,
                            "ftype": 0,
                            "rtUrls": [],
                            "djId": 0,
                            "copyright": 0,
                            "s_id": 0,
                            "mst": 9,
                            "cp": 7003,
                            "mv": 419807,
                            "rtype": 0,
                            "rurl": null,
                            "publishTime": 1427385600007,
                            "privilege": {
                                "id": 31311695,
                                "fee": 8,
                                "payed": 0,
                                "st": 0,
                                "pl": 128000,
                                "dl": 0,
                                "sp": 7,
                                "cp": 1,
                                "subp": 1,
                                "cs": false,
                                "maxbr": 320000,
                                "fl": 128000,
                                "toast": false,
                                "flag": 4,
                                "preSell": false
                            }
                        }
                    ],
                    "relatedInfo": null,
                    "videoUserLiveInfo": null,
                    "vid": "A5CA712B8AD35EB47746491003F92619",
                    "durationms": 306283,
                    "playTime": 189272,
                    "praisedCount": 1467,
                    "praised": false,
                    "subscribed": false
                }
            },
            {
                "type": 1,
                "displayed": false,
                "alg": "onlineHotGroup",
                "extAlg": null,
                "data": {
                    "alg": "onlineHotGroup",
                    "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
                    "threadId": "R_VI_62_C8A1A2FB877196352ABC8C13CC534DD5",
                    "coverUrl": "https://p2.music.126.net/Zin-OPcs2ltBrkGa1hMh3g==/109951163572641212.jpg",
                    "height": 720,
                    "width": 1280,
                    "title": "街头快闪遇上《碟中谍》 Mission Impossible",
                    "description": "《碟中谍》 Mission Impossible 街头快闪",
                    "commentCount": 826,
                    "shareCount": 3595,
                    "resolutions": [
                        {
                            "resolution": 240,
                            "size": 25777187
                        },
                        {
                            "resolution": 480,
                            "size": 36799585
                        },
                        {
                            "resolution": 720,
                            "size": 58763550
                        }
                    ],
                    "creator": {
                        "defaultAvatar": false,
                        "province": 110000,
                        "authStatus": 0,
                        "followed": false,
                        "avatarUrl": "http://p1.music.126.net/34DzOtbJhyYj7BXj-dxeYg==/19226060323323558.jpg",
                        "accountStatus": 0,
                        "gender": 1,
                        "city": 110101,
                        "birthday": -2209017600000,
                        "userId": 439675863,
                        "userType": 204,
                        "nickname": "Steven_爱音乐",
                        "signature": "（蝉联五届）2016、17、18、19、20年十大影响力音乐大V，合作QQ：1146349855（请表明来意）",
                        "description": "",
                        "detailDescription": "",
                        "avatarImgId": 19226060323323560,
                        "backgroundImgId": 109951164884484850,
                        "backgroundUrl": "http://p1.music.126.net/pR6ptJzgrfj-4hVzVTCUbg==/109951164884484852.jpg",
                        "authority": 0,
                        "mutual": false,
                        "expertTags": null,
                        "experts": {
                            "1": "音乐视频达人"
                        },
                        "djStatus": 0,
                        "vipType": 11,
                        "remarkName": null,
                        "avatarImgIdStr": "19226060323323558",
                        "backgroundImgIdStr": "109951164884484852"
                    },
                    "urlInfo": {
                        "id": "C8A1A2FB877196352ABC8C13CC534DD5",
                        "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/kmfe91hH_13279402_shd.mp4?ts=1630125515&rid=ABC4B7F5AF629FC4F2795F61577AF93C&rl=3&rs=TIjTWjYzZVKQmTBJclqRZnNGiiqssWzA&sign=b54d31d934d6ceaf425040cfede17d17&ext=nLH1uHluXrss3ohLaxwO%2FhD4BhsT1bknwmGit2jLIUHUtaZNxCHZ%2FHpVAoiq3P6OvBpRWmxeQ7KPfH0s%2BDoNCNYip9EBYuc%2FhZ5t0Fas8SpaIhaxEI1y6zqwUcpmD4mkClhT%2Bj7SeaGnCKh0tJjGOzNPXjNkFQnGL%2B9mHoQ8UQjZJKTpSMX5c3iIFZW7t8fIQ3uhIrglX3p2hL6dZlYfTuuZjjRJmO%2BytCPgOlrruR9L54NIvC9QZ0%2FqqSk%2Bbry4",
                        "size": 58763550,
                        "validityTime": 1200,
                        "needPay": false,
                        "payInfo": null,
                        "r": 720
                    },
                    "videoGroup": [
                        {
                            "id": 58100,
                            "name": "现场",
                            "alg": null
                        },
                        {
                            "id": 1100,
                            "name": "音乐现场",
                            "alg": null
                        },
                        {
                            "id": 5100,
                            "name": "音乐",
                            "alg": null
                        }
                    ],
                    "previewUrl": null,
                    "previewDurationms": 0,
                    "hasRelatedGameAd": false,
                    "markTypes": null,
                    "relateSong": [
                        {
                            "name": "Theme from Mission: Impossible",
                            "id": 1224671,
                            "pst": 0,
                            "t": 0,
                            "ar": [
                                {
                                    "id": 31207,
                                    "name": "Danny Elfman",
                                    "tns": [],
                                    "alias": []
                                }
                            ],
                            "alia": [
                                "电影《碟中谍》主题曲"
                            ],
                            "pop": 95,
                            "st": 0,
                            "rt": "",
                            "fee": 8,
                            "v": 14,
                            "crbt": null,
                            "cf": "",
                            "al": {
                                "id": 126575,
                                "name": "Mission Impossible [Original Score]",
                                "picUrl": "http://p3.music.126.net/Ur8itRFw48WvjVjlrhBQog==/833429813897693.jpg",
                                "tns": [
                                    "碟中谍电影原声"
                                ],
                                "pic": 833429813897693
                            },
                            "dt": 62000,
                            "h": {
                                "br": 320000,
                                "fid": 0,
                                "size": 2514086,
                                "vd": 8322
                            },
                            "m": {
                                "br": 192000,
                                "fid": 0,
                                "size": 1508476,
                                "vd": 10985
                            },
                            "l": {
                                "br": 128000,
                                "fid": 0,
                                "size": 1005671,
                                "vd": 9909
                            },
                            "a": null,
                            "cd": "1",
                            "no": 2,
                            "rtUrl": null,
                            "ftype": 0,
                            "rtUrls": [],
                            "djId": 0,
                            "copyright": 1,
                            "s_id": 0,
                            "mst": 9,
                            "cp": 754012,
                            "mv": 0,
                            "rtype": 0,
                            "rurl": null,
                            "publishTime": 835027200007,
                            "privilege": {
                                "id": 1224671,
                                "fee": 8,
                                "payed": 0,
                                "st": 0,
                                "pl": 128000,
                                "dl": 0,
                                "sp": 7,
                                "cp": 1,
                                "subp": 1,
                                "cs": false,
                                "maxbr": 320000,
                                "fl": 128000,
                                "toast": false,
                                "flag": 128,
                                "preSell": false
                            }
                        }
                    ],
                    "relatedInfo": null,
                    "videoUserLiveInfo": null,
                    "vid": "C8A1A2FB877196352ABC8C13CC534DD5",
                    "durationms": 214576,
                    "playTime": 1414212,
                    "praisedCount": 12323,
                    "praised": false,
                    "subscribed": false
                }
            },
            {
                "type": 1,
                "displayed": false,
                "alg": "onlineHotGroup",
                "extAlg": null,
                "data": {
                    "alg": "onlineHotGroup",
                    "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
                    "threadId": "R_VI_62_A8288CA4C7AEAD825548B8916D4F2BCC",
                    "coverUrl": "https://p2.music.126.net/td52bw0gVfzEdZJpuFoxRg==/109951163573063029.jpg",
                    "height": 720,
                    "width": 1280,
                    "title": "Pitbull神曲《Wild Wild Love》&《Timber》，美女如云！",
                    "description": "Pitbull《Wild Wild Love》&《Timber》超燃现场版，美女如云，满眼都是大长腿！",
                    "commentCount": 404,
                    "shareCount": 1229,
                    "resolutions": [
                        {
                            "resolution": 240,
                            "size": 34565702
                        },
                        {
                            "resolution": 480,
                            "size": 49358751
                        },
                        {
                            "resolution": 720,
                            "size": 78406824
                        }
                    ],
                    "creator": {
                        "defaultAvatar": false,
                        "province": 340000,
                        "authStatus": 0,
                        "followed": false,
                        "avatarUrl": "http://p1.music.126.net/C6VID_CReqmt8ETsUWaYTQ==/18499283139231828.jpg",
                        "accountStatus": 0,
                        "gender": 0,
                        "city": 340100,
                        "birthday": -2209017600000,
                        "userId": 479954154,
                        "userType": 207,
                        "nickname": "音乐诊疗室",
                        "signature": "当我坐在那架破旧古钢琴旁边的时候，我对最幸福的国王也不羡慕。（合作推广请私信，或者+V信：mjs927721）",
                        "description": "",
                        "detailDescription": "",
                        "avatarImgId": 18499283139231828,
                        "backgroundImgId": 1364493978647983,
                        "backgroundUrl": "http://p1.music.126.net/i4J_uvH-pb4sYMsh4fgQAA==/1364493978647983.jpg",
                        "authority": 0,
                        "mutual": false,
                        "expertTags": null,
                        "experts": {
                            "1": "音乐视频达人",
                            "2": "音乐资讯达人"
                        },
                        "djStatus": 0,
                        "vipType": 0,
                        "remarkName": null,
                        "avatarImgIdStr": "18499283139231828",
                        "backgroundImgIdStr": "1364493978647983"
                    },
                    "urlInfo": {
                        "id": "A8288CA4C7AEAD825548B8916D4F2BCC",
                        "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/SlXTVFe2_1329355368_shd.mp4?ts=1630125515&rid=ABC4B7F5AF629FC4F2795F61577AF93C&rl=3&rs=TVjtDFlfsadwdWzYsyubdMDefkBiAUZR&sign=a7f5ccf95069fa223dad8671046438de&ext=nLH1uHluXrss3ohLaxwO%2FhD4BhsT1bknwmGit2jLIUHUtaZNxCHZ%2FHpVAoiq3P6OvBpRWmxeQ7KPfH0s%2BDoNCNYip9EBYuc%2FhZ5t0Fas8SpaIhaxEI1y6zqwUcpmD4mkClhT%2Bj7SeaGnCKh0tJjGOzNPXjNkFQnGL%2B9mHoQ8UQjZJKTpSMX5c3iIFZW7t8fIQ3uhIrglX3p2hL6dZlYfTuuZjjRJmO%2BytCPgOlrruR9L54NIvC9QZ0%2FqqSk%2Bbry4",
                        "size": 78406824,
                        "validityTime": 1200,
                        "needPay": false,
                        "payInfo": null,
                        "r": 720
                    },
                    "videoGroup": [
                        {
                            "id": 58100,
                            "name": "现场",
                            "alg": null
                        },
                        {
                            "id": 57106,
                            "name": "欧美现场",
                            "alg": null
                        },
                        {
                            "id": 57108,
                            "name": "流行现场",
                            "alg": null
                        },
                        {
                            "id": 1100,
                            "name": "音乐现场",
                            "alg": null
                        },
                        {
                            "id": 5100,
                            "name": "音乐",
                            "alg": null
                        }
                    ],
                    "previewUrl": null,
                    "previewDurationms": 0,
                    "hasRelatedGameAd": false,
                    "markTypes": null,
                    "relateSong": [
                        {
                            "name": "Wild Wild Love",
                            "id": 28282300,
                            "pst": 0,
                            "t": 0,
                            "ar": [
                                {
                                    "id": 41143,
                                    "name": "Pitbull",
                                    "tns": [],
                                    "alias": []
                                }
                            ],
                            "alia": [],
                            "pop": 55,
                            "st": 0,
                            "rt": "",
                            "fee": 8,
                            "v": 20,
                            "crbt": null,
                            "cf": "",
                            "al": {
                                "id": 2767164,
                                "name": "Wild Wild Love",
                                "picUrl": "http://p4.music.126.net/1hH8cVbqxhlAM3YSVYDy6A==/18548761162566034.jpg",
                                "tns": [],
                                "pic_str": "18548761162566034",
                                "pic": 18548761162566030
                            },
                            "dt": 202000,
                            "h": {
                                "br": 320000,
                                "fid": 0,
                                "size": 8092880,
                                "vd": -21700
                            },
                            "m": {
                                "br": 192000,
                                "fid": 0,
                                "size": 4855786,
                                "vd": -19200
                            },
                            "l": {
                                "br": 128000,
                                "fid": 0,
                                "size": 3237239,
                                "vd": -17700
                            },
                            "a": null,
                            "cd": "1",
                            "no": 1,
                            "rtUrl": null,
                            "ftype": 0,
                            "rtUrls": [],
                            "djId": 0,
                            "copyright": 2,
                            "s_id": 0,
                            "mst": 9,
                            "cp": 7001,
                            "mv": 239054,
                            "rtype": 0,
                            "rurl": null,
                            "publishTime": 1392912000007,
                            "privilege": {
                                "id": 28282300,
                                "fee": 8,
                                "payed": 0,
                                "st": 0,
                                "pl": 128000,
                                "dl": 0,
                                "sp": 7,
                                "cp": 1,
                                "subp": 1,
                                "cs": false,
                                "maxbr": 320000,
                                "fl": 128000,
                                "toast": false,
                                "flag": 0,
                                "preSell": false
                            }
                        }
                    ],
                    "relatedInfo": null,
                    "videoUserLiveInfo": null,
                    "vid": "A8288CA4C7AEAD825548B8916D4F2BCC",
                    "durationms": 289800,
                    "playTime": 2239063,
                    "praisedCount": 5746,
                    "praised": false,
                    "subscribed": false
                }
            },
            {
                "type": 1,
                "displayed": false,
                "alg": "onlineHotGroup",
                "extAlg": null,
                "data": {
                    "alg": "onlineHotGroup",
                    "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
                    "threadId": "R_VI_62_F3A0612AF56850F480C21F97EDFD3AA2",
                    "coverUrl": "https://p2.music.126.net/fGZt0rthdcJjbGogLCJecg==/109951163572852585.jpg",
                    "height": 720,
                    "width": 1280,
                    "title": "邓紫棋颁奖典礼零瑕疵演绎《光年之外》，听CD的感觉，超享受！",
                    "description": "第13届KKBOX风云榜颁奖典礼，邓紫棋零瑕疵演绎《光年之外》，带来极致的视听享受！",
                    "commentCount": 1659,
                    "shareCount": 2596,
                    "resolutions": [
                        {
                            "resolution": 240,
                            "size": 27482926
                        },
                        {
                            "resolution": 480,
                            "size": 39248873
                        },
                        {
                            "resolution": 720,
                            "size": 62644927
                        }
                    ],
                    "creator": {
                        "defaultAvatar": false,
                        "province": 340000,
                        "authStatus": 0,
                        "followed": false,
                        "avatarUrl": "http://p1.music.126.net/C6VID_CReqmt8ETsUWaYTQ==/18499283139231828.jpg",
                        "accountStatus": 0,
                        "gender": 0,
                        "city": 340100,
                        "birthday": -2209017600000,
                        "userId": 479954154,
                        "userType": 207,
                        "nickname": "音乐诊疗室",
                        "signature": "当我坐在那架破旧古钢琴旁边的时候，我对最幸福的国王也不羡慕。（合作推广请私信，或者+V信：mjs927721）",
                        "description": "",
                        "detailDescription": "",
                        "avatarImgId": 18499283139231828,
                        "backgroundImgId": 1364493978647983,
                        "backgroundUrl": "http://p1.music.126.net/i4J_uvH-pb4sYMsh4fgQAA==/1364493978647983.jpg",
                        "authority": 0,
                        "mutual": false,
                        "expertTags": null,
                        "experts": {
                            "1": "音乐视频达人",
                            "2": "音乐资讯达人"
                        },
                        "djStatus": 0,
                        "vipType": 0,
                        "remarkName": null,
                        "avatarImgIdStr": "18499283139231828",
                        "backgroundImgIdStr": "1364493978647983"
                    },
                    "urlInfo": {
                        "id": "F3A0612AF56850F480C21F97EDFD3AA2",
                        "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/UeHnwVsU_135672605_shd.mp4?ts=1630125515&rid=ABC4B7F5AF629FC4F2795F61577AF93C&rl=3&rs=wlVnSYTFuZofEaQHKnUyMksBodImxsYm&sign=4095d3d969344d041ce38794702c7f34&ext=nLH1uHluXrss3ohLaxwO%2FhD4BhsT1bknwmGit2jLIUHUtaZNxCHZ%2FHpVAoiq3P6OvBpRWmxeQ7KPfH0s%2BDoNCNYip9EBYuc%2FhZ5t0Fas8SpaIhaxEI1y6zqwUcpmD4mkClhT%2Bj7SeaGnCKh0tJjGOzNPXjNkFQnGL%2B9mHoQ8UQjZJKTpSMX5c3iIFZW7t8fIQ3uhIrglX3p2hL6dZlYfTuuZjjRJmO%2BytCPgOlrruR9L54NIvC9QZ0%2FqqSk%2Bbry4",
                        "size": 62644927,
                        "validityTime": 1200,
                        "needPay": false,
                        "payInfo": null,
                        "r": 720
                    },
                    "videoGroup": [
                        {
                            "id": 58100,
                            "name": "现场",
                            "alg": null
                        },
                        {
                            "id": 59101,
                            "name": "华语现场",
                            "alg": null
                        },
                        {
                            "id": 1100,
                            "name": "音乐现场",
                            "alg": null
                        },
                        {
                            "id": 12100,
                            "name": "流行",
                            "alg": null
                        },
                        {
                            "id": 5100,
                            "name": "音乐",
                            "alg": null
                        },
                        {
                            "id": 13222,
                            "name": "华语",
                            "alg": null
                        },
                        {
                            "id": 150122,
                            "name": "邓紫棋",
                            "alg": null
                        },
                        {
                            "id": 14137,
                            "name": "感动",
                            "alg": null
                        }
                    ],
                    "previewUrl": null,
                    "previewDurationms": 0,
                    "hasRelatedGameAd": false,
                    "markTypes": null,
                    "relateSong": [
                        {
                            "name": "光年之外",
                            "id": 449818741,
                            "pst": 0,
                            "t": 0,
                            "ar": [
                                {
                                    "id": 7763,
                                    "name": "G.E.M.邓紫棋",
                                    "tns": [],
                                    "alias": []
                                }
                            ],
                            "alia": [
                                "电影《太空旅客》中文主题曲"
                            ],
                            "pop": 100,
                            "st": 0,
                            "rt": null,
                            "fee": 8,
                            "v": 96,
                            "crbt": null,
                            "cf": "",
                            "al": {
                                "id": 35093341,
                                "name": "光年之外",
                                "picUrl": "http://p4.music.126.net/fkqFqMaEt0CzxYS-0NpCog==/18587244069235039.jpg",
                                "tns": [],
                                "pic_str": "18587244069235039",
                                "pic": 18587244069235040
                            },
                            "dt": 235505,
                            "h": {
                                "br": 320000,
                                "fid": 0,
                                "size": 9422933,
                                "vd": -14400
                            },
                            "m": {
                                "br": 192000,
                                "fid": 0,
                                "size": 5653777,
                                "vd": -11900
                            },
                            "l": {
                                "br": 128000,
                                "fid": 0,
                                "size": 3769199,
                                "vd": -10100
                            },
                            "a": null,
                            "cd": "1",
                            "no": 0,
                            "rtUrl": null,
                            "ftype": 0,
                            "rtUrls": [],
                            "djId": 0,
                            "copyright": 2,
                            "s_id": 0,
                            "mst": 9,
                            "cp": 1415926,
                            "mv": 5404646,
                            "rtype": 0,
                            "rurl": null,
                            "publishTime": 1483027200007,
                            "privilege": {
                                "id": 449818741,
                                "fee": 8,
                                "payed": 0,
                                "st": 0,
                                "pl": 128000,
                                "dl": 0,
                                "sp": 7,
                                "cp": 1,
                                "subp": 1,
                                "cs": false,
                                "maxbr": 999000,
                                "fl": 128000,
                                "toast": false,
                                "flag": 4,
                                "preSell": false
                            }
                        }
                    ],
                    "relatedInfo": null,
                    "videoUserLiveInfo": null,
                    "vid": "F3A0612AF56850F480C21F97EDFD3AA2",
                    "durationms": 234663,
                    "playTime": 4356930,
                    "praisedCount": 22350,
                    "praised": false,
                    "subscribed": false
                }
            },
            {
                "type": 1,
                "displayed": false,
                "alg": "onlineHotGroup",
                "extAlg": null,
                "data": {
                    "alg": "onlineHotGroup",
                    "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
                    "threadId": "R_VI_62_942D81E98437B5528A62E101DB81C22D",
                    "coverUrl": "https://p2.music.126.net/mUBFg5UGZUMuSKgH0EHEuA==/109951165214606539.jpg",
                    "height": 720,
                    "width": 1280,
                    "title": "乃万NINEONE《But U》Live，最怕Rapper唱情歌～",
                    "description": "乃万NINEONE《But U》Live，最怕Rapper唱情歌～",
                    "commentCount": 61,
                    "shareCount": 161,
                    "resolutions": [
                        {
                            "resolution": 240,
                            "size": 21809399
                        },
                        {
                            "resolution": 480,
                            "size": 36947669
                        },
                        {
                            "resolution": 720,
                            "size": 49133541
                        }
                    ],
                    "creator": {
                        "defaultAvatar": false,
                        "province": 810000,
                        "authStatus": 0,
                        "followed": false,
                        "avatarUrl": "http://p1.music.126.net/RCzksIcMLAbyXgPhJJmvAQ==/109951166008264068.jpg",
                        "accountStatus": 0,
                        "gender": 2,
                        "city": 810100,
                        "birthday": -2209017600000,
                        "userId": 452227174,
                        "userType": 0,
                        "nickname": "Leeyy-李彦媛",
                        "signature": "我的Hip-hop现场经历\r中国有嘻哈2017制作人公演现场\r中国新说唱2018总决赛现场\r中国新说唱2019总决赛现场～",
                        "description": "",
                        "detailDescription": "",
                        "avatarImgId": 109951166008264060,
                        "backgroundImgId": 109951165395733630,
                        "backgroundUrl": "http://p1.music.126.net/JoV68ORMXbVRqYMDNp28GA==/109951165395733633.jpg",
                        "authority": 0,
                        "mutual": false,
                        "expertTags": null,
                        "experts": null,
                        "djStatus": 0,
                        "vipType": 0,
                        "remarkName": null,
                        "avatarImgIdStr": "109951166008264068",
                        "backgroundImgIdStr": "109951165395733633"
                    },
                    "urlInfo": {
                        "id": "942D81E98437B5528A62E101DB81C22D",
                        "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/xsfDFcRS_3082310848_shd.mp4?ts=1630125515&rid=ABC4B7F5AF629FC4F2795F61577AF93C&rl=3&rs=gQfEfYrpDZhIjFScgCFFxjlfoiLbZNJx&sign=81615b5f6402ffd0cad98599e9de2c8d&ext=nLH1uHluXrss3ohLaxwO%2FhD4BhsT1bknwmGit2jLIUHUtaZNxCHZ%2FHpVAoiq3P6OvBpRWmxeQ7KPfH0s%2BDoNCNYip9EBYuc%2FhZ5t0Fas8SpaIhaxEI1y6zqwUcpmD4mkClhT%2Bj7SeaGnCKh0tJjGOzNPXjNkFQnGL%2B9mHoQ8UQjZJKTpSMX5c3iIFZW7t8fIQ3uhIrglX3p2hL6dZlYfTuuZjjRJmO%2BytCPgOlrruR9L54NIvC9QZ0%2FqqSk%2Bbry4",
                        "size": 49133541,
                        "validityTime": 1200,
                        "needPay": false,
                        "payInfo": null,
                        "r": 720
                    },
                    "videoGroup": [
                        {
                            "id": 58100,
                            "name": "现场",
                            "alg": null
                        },
                        {
                            "id": 9102,
                            "name": "演唱会",
                            "alg": null
                        },
                        {
                            "id": 59101,
                            "name": "华语现场",
                            "alg": null
                        },
                        {
                            "id": 57106,
                            "name": "欧美现场",
                            "alg": null
                        },
                        {
                            "id": 57108,
                            "name": "流行现场",
                            "alg": null
                        },
                        {
                            "id": 59108,
                            "name": "巡演现场",
                            "alg": null
                        },
                        {
                            "id": 1100,
                            "name": "音乐现场",
                            "alg": null
                        },
                        {
                            "id": 5100,
                            "name": "音乐",
                            "alg": null
                        }
                    ],
                    "previewUrl": null,
                    "previewDurationms": 0,
                    "hasRelatedGameAd": false,
                    "markTypes": null,
                    "relateSong": [
                        {
                            "name": "But U",
                            "id": 1459232593,
                            "pst": 0,
                            "t": 0,
                            "ar": [
                                {
                                    "id": 12276375,
                                    "name": "NINEONE#",
                                    "tns": [],
                                    "alias": []
                                }
                            ],
                            "alia": [],
                            "pop": 100,
                            "st": 0,
                            "rt": "",
                            "fee": 8,
                            "v": 4,
                            "crbt": null,
                            "cf": "",
                            "al": {
                                "id": 91753626,
                                "name": "But U",
                                "picUrl": "http://p3.music.126.net/li19i75jz6GGOT79IyAjYA==/109951165100592039.jpg",
                                "tns": [],
                                "pic_str": "109951165100592039",
                                "pic": 109951165100592030
                            },
                            "dt": 225417,
                            "h": {
                                "br": 320000,
                                "fid": 0,
                                "size": 9019245,
                                "vd": -75165
                            },
                            "m": {
                                "br": 192000,
                                "fid": 0,
                                "size": 5411565,
                                "vd": -72634
                            },
                            "l": {
                                "br": 128000,
                                "fid": 0,
                                "size": 3607725,
                                "vd": -71061
                            },
                            "a": null,
                            "cd": "01",
                            "no": 0,
                            "rtUrl": null,
                            "ftype": 0,
                            "rtUrls": [],
                            "djId": 0,
                            "copyright": 0,
                            "s_id": 0,
                            "mst": 9,
                            "cp": 1416862,
                            "mv": 10944205,
                            "rtype": 0,
                            "rurl": null,
                            "publishTime": 0,
                            "privilege": {
                                "id": 1459232593,
                                "fee": 8,
                                "payed": 0,
                                "st": 0,
                                "pl": 128000,
                                "dl": 0,
                                "sp": 7,
                                "cp": 1,
                                "subp": 1,
                                "cs": false,
                                "maxbr": 999000,
                                "fl": 128000,
                                "toast": false,
                                "flag": 68,
                                "preSell": false
                            }
                        }
                    ],
                    "relatedInfo": null,
                    "videoUserLiveInfo": null,
                    "vid": "942D81E98437B5528A62E101DB81C22D",
                    "durationms": 133835,
                    "playTime": 337051,
                    "praisedCount": 3045,
                    "praised": false,
                    "subscribed": false
                }
            },
            {
                "type": 1,
                "displayed": false,
                "alg": "onlineHotGroup",
                "extAlg": null,
                "data": {
                    "alg": "onlineHotGroup",
                    "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
                    "threadId": "R_VI_62_AD12F097F483E74783B998157186C4B2",
                    "coverUrl": "https://p2.music.126.net/8Jr_PncfpQO08-WpxmuRdg==/109951165134177573.jpg",
                    "height": 1080,
                    "width": 1920,
                    "title": "说好的群星合唱，林子祥一开口没人敢接，谭咏麟现场翻车",
                    "description": "说好的群星合唱，林子祥一开口没人敢接，谭咏麟现场“翻车”",
                    "commentCount": 22,
                    "shareCount": 25,
                    "resolutions": [
                        {
                            "resolution": 240,
                            "size": 29919181
                        },
                        {
                            "resolution": 480,
                            "size": 51027223
                        },
                        {
                            "resolution": 720,
                            "size": 76999119
                        },
                        {
                            "resolution": 1080,
                            "size": 119612592
                        }
                    ],
                    "creator": {
                        "defaultAvatar": false,
                        "province": 370000,
                        "authStatus": 0,
                        "followed": false,
                        "avatarUrl": "http://p1.music.126.net/Fr24V954u19ee3SujaCKEg==/109951164537244615.jpg",
                        "accountStatus": 0,
                        "gender": 0,
                        "city": 370100,
                        "birthday": 673545600000,
                        "userId": 559080376,
                        "userType": 204,
                        "nickname": "音悦糖Music",
                        "signature": "爱音乐，爱生活。",
                        "description": "",
                        "detailDescription": "",
                        "avatarImgId": 109951164537244600,
                        "backgroundImgId": 109951165139607200,
                        "backgroundUrl": "http://p1.music.126.net/fXQE7Wtck2_ESuUbYaXgpQ==/109951165139607198.jpg",
                        "authority": 0,
                        "mutual": false,
                        "expertTags": null,
                        "experts": {
                            "1": "音乐原创视频达人"
                        },
                        "djStatus": 0,
                        "vipType": 0,
                        "remarkName": null,
                        "avatarImgIdStr": "109951164537244615",
                        "backgroundImgIdStr": "109951165139607198"
                    },
                    "urlInfo": {
                        "id": "AD12F097F483E74783B998157186C4B2",
                        "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/PG6kuCxX_3054493152_uhd.mp4?ts=1630125515&rid=ABC4B7F5AF629FC4F2795F61577AF93C&rl=3&rs=vudcSBWwWWVKyjlRrTHvziAQQWalpuMh&sign=f1b0db196a6f35a5ed9596556f2f5770&ext=nLH1uHluXrss3ohLaxwO%2FhD4BhsT1bknwmGit2jLIUHUtaZNxCHZ%2FHpVAoiq3P6OvBpRWmxeQ7KPfH0s%2BDoNCNYip9EBYuc%2FhZ5t0Fas8SpaIhaxEI1y6zqwUcpmD4mkClhT%2Bj7SeaGnCKh0tJjGOzNPXjNkFQnGL%2B9mHoQ8UQjZJKTpSMX5c3iIFZW7t8fIQ3uhIrglX3p2hL6dZlYfTuuZjjRJmO%2BytCPgOlrruR9L54NIvC9QZ0%2FqqSk%2Bbry4",
                        "size": 119612592,
                        "validityTime": 1200,
                        "needPay": false,
                        "payInfo": null,
                        "r": 1080
                    },
                    "videoGroup": [
                        {
                            "id": 58100,
                            "name": "现场",
                            "alg": null
                        },
                        {
                            "id": 57105,
                            "name": "粤语现场",
                            "alg": null
                        },
                        {
                            "id": 57108,
                            "name": "流行现场",
                            "alg": null
                        },
                        {
                            "id": 59108,
                            "name": "巡演现场",
                            "alg": null
                        },
                        {
                            "id": 1100,
                            "name": "音乐现场",
                            "alg": null
                        },
                        {
                            "id": 5100,
                            "name": "音乐",
                            "alg": null
                        }
                    ],
                    "previewUrl": null,
                    "previewDurationms": 0,
                    "hasRelatedGameAd": false,
                    "markTypes": null,
                    "relateSong": [
                        {
                            "name": "敢爱敢做",
                            "id": 116869,
                            "pst": 0,
                            "t": 0,
                            "ar": [
                                {
                                    "id": 3706,
                                    "name": "林子祥",
                                    "tns": [],
                                    "alias": []
                                }
                            ],
                            "alia": [
                                "电影《神奇两女侠》主题曲"
                            ],
                            "pop": 100,
                            "st": 0,
                            "rt": "600902000006762765",
                            "fee": 8,
                            "v": 19,
                            "crbt": null,
                            "cf": "",
                            "al": {
                                "id": 11411,
                                "name": "花街70号",
                                "picUrl": "http://p4.music.126.net/6hWtQD6etnGZrmae7fw8tg==/41781441856457.jpg",
                                "tns": [],
                                "pic": 41781441856457
                            },
                            "dt": 299000,
                            "h": {
                                "br": 320001,
                                "fid": 0,
                                "size": 11963080,
                                "vd": 9572
                            },
                            "m": {
                                "br": 192001,
                                "fid": 0,
                                "size": 7177866,
                                "vd": 12129
                            },
                            "l": {
                                "br": 128001,
                                "fid": 0,
                                "size": 4785258,
                                "vd": 13862
                            },
                            "a": null,
                            "cd": "1",
                            "no": 1,
                            "rtUrl": null,
                            "ftype": 0,
                            "rtUrls": [],
                            "djId": 0,
                            "copyright": 1,
                            "s_id": 0,
                            "mst": 9,
                            "cp": 7003,
                            "mv": 0,
                            "rtype": 0,
                            "rurl": null,
                            "publishTime": 539107200000,
                            "privilege": {
                                "id": 116869,
                                "fee": 8,
                                "payed": 0,
                                "st": 0,
                                "pl": 128000,
                                "dl": 0,
                                "sp": 7,
                                "cp": 1,
                                "subp": 1,
                                "cs": false,
                                "maxbr": 999000,
                                "fl": 128000,
                                "toast": false,
                                "flag": 4,
                                "preSell": false
                            }
                        }
                    ],
                    "relatedInfo": null,
                    "videoUserLiveInfo": null,
                    "vid": "AD12F097F483E74783B998157186C4B2",
                    "durationms": 206890,
                    "playTime": 129285,
                    "praisedCount": 562,
                    "praised": false,
                    "subscribed": false
                }
            },
            {
                "type": 1,
                "displayed": false,
                "alg": "onlineHotGroup",
                "extAlg": null,
                "data": {
                    "alg": "onlineHotGroup",
                    "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
                    "threadId": "R_VI_62_6181C57B77056A75DEE1FABE9ADCEA4A",
                    "coverUrl": "https://p2.music.126.net/qyn808UzsEhjtZJokfYfGA==/109951163716092128.jpg",
                    "height": 720,
                    "width": 960,
                    "title": "Britney Spears《Toxic》超美现场版，舞蹈太抢眼了！",
                    "description": "Britney Spears《Toxic》超美现场版，舞蹈太抢眼了，魅力四射！",
                    "commentCount": 403,
                    "shareCount": 232,
                    "resolutions": [
                        {
                            "resolution": 240,
                            "size": 31329046
                        },
                        {
                            "resolution": 480,
                            "size": 51618897
                        },
                        {
                            "resolution": 720,
                            "size": 65463061
                        }
                    ],
                    "creator": {
                        "defaultAvatar": false,
                        "province": 340000,
                        "authStatus": 0,
                        "followed": false,
                        "avatarUrl": "http://p1.music.126.net/C6VID_CReqmt8ETsUWaYTQ==/18499283139231828.jpg",
                        "accountStatus": 0,
                        "gender": 0,
                        "city": 340100,
                        "birthday": -2209017600000,
                        "userId": 479954154,
                        "userType": 207,
                        "nickname": "音乐诊疗室",
                        "signature": "当我坐在那架破旧古钢琴旁边的时候，我对最幸福的国王也不羡慕。（合作推广请私信，或者+V信：mjs927721）",
                        "description": "",
                        "detailDescription": "",
                        "avatarImgId": 18499283139231828,
                        "backgroundImgId": 1364493978647983,
                        "backgroundUrl": "http://p1.music.126.net/i4J_uvH-pb4sYMsh4fgQAA==/1364493978647983.jpg",
                        "authority": 0,
                        "mutual": false,
                        "expertTags": null,
                        "experts": {
                            "1": "音乐视频达人",
                            "2": "音乐资讯达人"
                        },
                        "djStatus": 0,
                        "vipType": 0,
                        "remarkName": null,
                        "avatarImgIdStr": "18499283139231828",
                        "backgroundImgIdStr": "1364493978647983"
                    },
                    "urlInfo": {
                        "id": "6181C57B77056A75DEE1FABE9ADCEA4A",
                        "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/6jgPNJga_2176605378_shd.mp4?ts=1630125515&rid=ABC4B7F5AF629FC4F2795F61577AF93C&rl=3&rs=HoAecxeJYEFCwiiWbQgwxBGulTxBkpur&sign=274061165cab46e8d69a3ba3a729a5d8&ext=nLH1uHluXrss3ohLaxwO%2FhD4BhsT1bknwmGit2jLIUHUtaZNxCHZ%2FHpVAoiq3P6OvBpRWmxeQ7KPfH0s%2BDoNCNYip9EBYuc%2FhZ5t0Fas8SpaIhaxEI1y6zqwUcpmD4mkClhT%2Bj7SeaGnCKh0tJjGOzNPXjNkFQnGL%2B9mHoQ8UQjZJKTpSMX5c3iIFZW7t8fIQ3uhIrglX3p2hL6dZlYfTuuZjjRJmO%2BytCPgOlrruR9L54NIvC9QZ0%2FqqSk%2Bbry4",
                        "size": 65463061,
                        "validityTime": 1200,
                        "needPay": false,
                        "payInfo": null,
                        "r": 720
                    },
                    "videoGroup": [
                        {
                            "id": 58100,
                            "name": "现场",
                            "alg": null
                        },
                        {
                            "id": 57106,
                            "name": "欧美现场",
                            "alg": null
                        },
                        {
                            "id": 57108,
                            "name": "流行现场",
                            "alg": null
                        },
                        {
                            "id": 59108,
                            "name": "巡演现场",
                            "alg": null
                        },
                        {
                            "id": 1100,
                            "name": "音乐现场",
                            "alg": null
                        },
                        {
                            "id": 5100,
                            "name": "音乐",
                            "alg": null
                        }
                    ],
                    "previewUrl": null,
                    "previewDurationms": 0,
                    "hasRelatedGameAd": false,
                    "markTypes": null,
                    "relateSong": [
                        {
                            "name": "Toxic",
                            "id": 20515939,
                            "pst": 0,
                            "t": 0,
                            "ar": [
                                {
                                    "id": 48432,
                                    "name": "Britney Spears",
                                    "tns": [],
                                    "alias": []
                                }
                            ],
                            "alia": [],
                            "pop": 100,
                            "st": 0,
                            "rt": "",
                            "fee": 8,
                            "v": 51,
                            "crbt": null,
                            "cf": "",
                            "al": {
                                "id": 1910086,
                                "name": "Toxic",
                                "picUrl": "http://p4.music.126.net/6u5KcoADa5zxZ8o18TYp5w==/18999560928188987.jpg",
                                "tns": [],
                                "pic_str": "18999560928188987",
                                "pic": 18999560928188988
                            },
                            "dt": 200000,
                            "h": {
                                "br": 320000,
                                "fid": 0,
                                "size": 8038589,
                                "vd": -24800
                            },
                            "m": {
                                "br": 192000,
                                "fid": 0,
                                "size": 4823229,
                                "vd": -22300
                            },
                            "l": {
                                "br": 128000,
                                "fid": 0,
                                "size": 3215549,
                                "vd": -21500
                            },
                            "a": null,
                            "cd": "01",
                            "no": 1,
                            "rtUrl": null,
                            "ftype": 0,
                            "rtUrls": [],
                            "djId": 0,
                            "copyright": 2,
                            "s_id": 0,
                            "mst": 9,
                            "cp": 7001,
                            "mv": 33042,
                            "rtype": 0,
                            "rurl": null,
                            "publishTime": 1073923200007,
                            "privilege": {
                                "id": 20515939,
                                "fee": 8,
                                "payed": 0,
                                "st": 0,
                                "pl": 128000,
                                "dl": 0,
                                "sp": 7,
                                "cp": 1,
                                "subp": 1,
                                "cs": false,
                                "maxbr": 999000,
                                "fl": 128000,
                                "toast": false,
                                "flag": 4,
                                "preSell": false
                            }
                        }
                    ],
                    "relatedInfo": null,
                    "videoUserLiveInfo": null,
                    "vid": "6181C57B77056A75DEE1FABE9ADCEA4A",
                    "durationms": 205796,
                    "playTime": 839007,
                    "praisedCount": 3356,
                    "praised": false,
                    "subscribed": false
                }
            }
    ]
    let {videoDataList} = this.data
    videoDataList.push(...newVideoList)
    this.setData({
      videoDataList
    })
  },


  //监听 下拉刷新回调
  handleRefresher(){
    this.getVideoData(this.data.navId)
   
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
  onShareAppMessage: function ({from}) {
    
    if(from === 'button'){
        return{
            title:'来自button的转发',
            page:'/pages/video/video',
            imageUrl:'/static/images/nvsheng.jpg'
        }
    }else{
        return{
            title:'来自menu的转发',
            page:'/pages/video/video',
            imageUrl:'/static/images/nvsheng.jpg'
        }
    }
        


    
  }
})