import React, {
  Component
} from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  Dimensions,
  Clipboard,
  TouchableOpacity,
  Modal,
  AsyncStorage,
  DeviceEventEmitter,
} from 'react-native'

var width = Dimensions.get('window').width

import Button from 'react-native-button'
import clear from 'react-native-clear-cache'
//自定义
import NavigationBar from './../../common/NavigationBar'
import MineTextTipsWidget from '../views/MineTextTipsWidget'

import AboutUs from './AboutUs'
import Feedback from './Feedback'

import AV from 'leancloud-storage'
import Login from "./Login";
import TestLogin from "./TestLogin";
import User from "../../common/User";


export default class Mine extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cacheSize:'',
      unit:'',
      logined:false,
      user:null,
      isLoginModal:false,
    }

    clear.getCacheSize((value,unit)=>{
      this.setState({
        cacheSize:value, //缓存大小
        unit:unit  //缓存单位
      })
    });
  }

  componentDidMount(){

    //接收通知进行刷新
      DeviceEventEmitter.addListener('refreshMine',(user)=>{
          this.setState({
              isLoginModal:false,
              user:user,
              logined:true,
          })
      })

    this._asyncLoginStatus()
    console.log(User.user)
    console.log(User.loginStatus)
  }

  //移除通知
  componentWillUnmount(){
    DeviceEventEmitter.remove()
  }


  _asyncLoginStatus() {
    console.log('_asyncLoginStatus')
    AsyncStorage.getItem('user')
      .then((data) => {
        var user
        newStatus = {}

        if (data) {
          user = JSON.parse(data)
        }

        if (user) {
          newStatus.user = user
          newStatus.logined = true
        } else {
          newStatus.logined = false
        }
        this.setState(newStatus)
      })

  }

  _clearCache(){

    clear.runClearCache(()=>{
      Alert.alert('清除成功')
      clear.getCacheSize((value,unit)=>{
        this.setState({
          cacheSize:value, //缓存大小
          unit:unit  //缓存单位
        })
      });
    });

  }

  _selectType(type) {

    if(type==1){
      this.props.navigator.push({
        component:AboutUs,
        title:'',
        passProps: {
          tabBar: {
            hide: () => this.props.tabBar.hide(),
            show: () => this.props.tabBar.show()
          },
        }
      })
    }else if(type==2){
      this.props.navigator.push({
        component:Feedback,
        title:'',
        passProps: {
          tabBar: {
            hide: () => this.props.tabBar.hide(),
            show: () => this.props.tabBar.show()
          },

        }
      })
    }else if(type==3){
      Alert.alert(
        '联系方式',
        'qq:996678364',
        [
          {text: '取消', onPress: null},
          {text: '复制QQ', onPress: () => Clipboard.setString('996678364')},
        ]
      )
    }else if(type==4){
      this._clearCache()
    }

  }

  _showLoginModal(){
    this.setState({
      isLoginModal:true,
    })
  }

  _clickHeaderIcon(){
    // Alert.alert('登录')

    if(!this.state.logined){
      this._showLoginModal()
    }
    else {}
  }



  _loginSuccess(user){
    console.log(user)

    //发送通知,通知Home刷新数据
    DeviceEventEmitter.emit('refreshHome',user)

    this.setState({
      isLoginModal:false,
      user:user,
      logined:true,
    })
  }

  _exit(){
    AV.User.logOut();
    User.delete().then((user)=>{

     //发送通知,通知Home刷新数据
      DeviceEventEmitter.emit('refreshHome',user)

      User.loginStatus = false
      User.user=''
    }).catch((err)=>{
        User.loginStatus = true
    })
    this.setState({
      user:null,
      logined:false,
    })
  }

  _cancelLogin = ()=>{
    this.setState({
      isLoginModal:false,
    })
  }

  render() {

    var userInfoView = this.state.logined?
      <View style={styles.nameBox}>
        <Text style={styles.nickname}>昵称</Text>
        <Text style={styles.phone}>{this.state.user.phone}</Text>
      </View>
      :
      <Text style={styles.unLogin}>未登录</Text>


    return (
      <View style={styles.container}>
        <NavigationBar
          title='我的'
          statusBar={{
            barStyle:'default'
          }}
        />

        <Image source={require('./../../../scr/images/home_top.png')} style={styles.userInfoContainer} >
          <TouchableOpacity onPress={this._clickHeaderIcon.bind(this)}>
            <Image style={styles.headerIcon} source = {require('./../../../scr/images/headerIcon.png')}/>
          </TouchableOpacity>
          {userInfoView}
        </Image>

        <MineTextTipsWidget title='关于我们' tips='' type={1} selectType={this._selectType.bind(this)}/>
        <MineTextTipsWidget title='意见反馈' tips='' type={2} selectType={this._selectType.bind(this)}/>
        <MineTextTipsWidget title='我的客服' tips='' type={3} selectType={this._selectType.bind(this)}/>
        <MineTextTipsWidget title='清除缓存' tips={this.state.cacheSize+this.state.unit} type={4} selectType={this._selectType.bind(this)}/>

        <View style={[styles.buttonBox,this.state.logined?styles.blueColor:styles.grayColor]}>
          <Button style={styles.btn} onPress={this._exit.bind(this)}>退出登录</Button>
        </View>

        {/* 初始化Modal */}
        <Modal
          animationType='slide'           // 从底部滑入
          transparent={false}             // 不透明
          visible={this.state.isLoginModal}    // 根据isModal决定是否显示
        >
          <TestLogin
              cancelLogin={this._cancelLogin}
              loginSuccess={this._loginSuccess.bind(this)}
          />
          {/*<Login loginSuccess={this._loginSuccess.bind(this)} cancelLogin={this._cancelLogin.bind(this)} />*/}
        </Modal>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  userInfoContainer:{
    width:width-26,
    height:100,
    backgroundColor:'#fff',
    margin:10,
    borderRadius:6,
    padding:15,
    flexDirection:'row',
    alignItems:'center',
  },
  headerIcon:{
    width:40,
    height:40,
    backgroundColor:'#fff',
    borderRadius:20,
  },
  nameBox:{
    marginLeft:12,
    paddingLeft:8,
    backgroundColor:'transparent',
  },
  nickname:{
    color:'#fff',
  },
  phone:{
    color:'#fff',
    marginTop:10,
  },

  unLogin:{
    color:'#fff',
    marginLeft:12,
    backgroundColor:'transparent',
  },

  blueColor:{
    backgroundColor:'#337df6',
  },
  grayColor:{
    backgroundColor:'gray',
  },
  buttonBox:{
    marginTop:50,
    marginLeft:15,
    width:width-30,
    height:40,
    borderRadius:6,
    alignItems:'center'
  },
  btn:{
    height:36,
    width:width-40,
    color:'#fff',
    fontSize:15,
    paddingTop:12,
  },

})