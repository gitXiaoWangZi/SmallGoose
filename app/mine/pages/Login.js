import React, {
  Component
} from 'react'
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal, Alert,
  AsyncStorage,
} from 'react-native'

var width = Dimensions.get('window').width
var height = Dimensions.get('window').height
import Button from 'react-native-button'
import {TextInputLayout} from 'rn-textinputlayout'
import Register from "./Register";
import Feedback from "./Feedback";

import AV from 'leancloud-storage'
import Toast, {
  DURATION
} from 'react-native-easy-toast'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoginModal:false,
      phone:'',
      password:'',
    }
  }

  _phoneTextOnChange(text){
    this.setState({
      phone:text
    })
  }

  _passwordTextOnChange(text){
    this.setState({
      password:text
    })
  }

  _save(loginedUser){
    var sessionToken = loginedUser.getSessionToken()

    var userInfo = {
      sessionToken:sessionToken,
      phone:this.state.phone,
    }

    var that = this
    AsyncStorage.setItem('user', JSON.stringify(userInfo))
      .then(() => {
        that.props.loginSuccess(userInfo)
      })
  }
  _exit(){
    this.props.cancelLogin()
  }

  _login(){

    if(this.state.phone === ''){
      this.refs.toast.show('手机号不能为空')
      return
    }

    if(this.state.phone.length !== 11){
      this.refs.toast.show('请输入正确手机号')
      return
    }

    if(this.state.password === ''){
      this.refs.toast.show('密码不能为空')
      return
    }

    if(this.state.password.length<6){
      this.refs.toast.show('密码长度不能小于6位')
      return
    }

    var that = this
    AV.User.logIn(this.state.phone, this.state.password).then(function (loginedUser) {
      console.log('登录成功')
      that._save(loginedUser)
    }, function (error) {
      // Alert.alert(JSON.stringify(error));
      Alert.alert('登录失败，请检测当前网络是否良好');
    });

  }
  _cancelRegister(){
    this.setState({
      isLoginModal:false,
    })
  }

  _register(){
    this.setState({
      isLoginModal:true,
    })
  }

  render() {
    return (
      <View style={styles.container}>

        <TouchableOpacity onPress={this._exit.bind(this)}>
          <Image source={require('./../../../scr/images/close.png')} style={styles.close}/>
        </TouchableOpacity>

        <View style={styles.textInputContainer}>
          <View style={styles.logoBox}>
            <Image style={styles.logo} source = {require('./../../../scr/images/headerIcon.png')} />
          </View>

          <TextInputLayout
            style={styles.inputLayout}
            hintColor={'#aaa'}
            focusColor={'#337df6'}
          >
            <TextInput
              style={styles.textInput}
              placeholder={'手机号'}
              onChangeText = {(text)=>this._phoneTextOnChange(text)}
            />
          </TextInputLayout>
          <TextInputLayout
            style={styles.inputLayout}
            hintColor={'#aaa'}
            focusColor={'#337df6'}
          >
            <TextInput
              style={styles.textInput}
              placeholder={'密码'}
              secureTextEntry={true}
              onChangeText = {(text)=>this._passwordTextOnChange(text)}
            />
          </TextInputLayout>
        </View>


        <View style={styles.buttonBox}>
          <Button style={styles.btn} onPress={this._login.bind(this)}>登录</Button>
        </View>


        <TouchableOpacity onPress={this._register.bind(this)}>
          <Text style={styles.register}>新人注册</Text>
        </TouchableOpacity>


        {/* 初始化Modal */}
        <Modal
          animationType='slide'           // 从底部滑入
          transparent={false}             // 不透明
          visible={this.state.isLoginModal}    // 根据isModal决定是否显示
        >
          <Register cancelRegister={this._cancelRegister.bind(this)}/>
        </Modal>


        <Toast ref="toast" positionValue={400}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  close:{
    position:'absolute',
    right:15,
    top:25,
    width:30,
    height:30,
  },
  textInputContainer:{
    marginTop:60,

  },
  logoBox:{
    alignItems:'center',
  },
  logo:{
    width:50,
    height:50,
  },

  textInput: {
    fontSize: 16,
    height: 40
  },
  inputLayout: {
    marginTop: 16,
    marginHorizontal: 36
  },

  buttonBox:{
    marginTop:50,
    marginLeft:40,
    width:width-80,
    height:40,
    backgroundColor:'#337df6',
    borderRadius:6,
    alignItems:'center'
  },
  btn:{
    height:36,
    width:width-90,
    color:'#fff',
    fontSize:15,
    paddingTop:12,
  },

  register:{
    marginTop:20,
    color:'#337df6',
    position:'absolute',
    right:40,
  },


})