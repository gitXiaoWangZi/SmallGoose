import React, {
  Component
} from 'react'
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native'

var width = Dimensions.get('window').width
var height = Dimensions.get('window').height

import Button from 'react-native-button'
import {TextInputLayout} from 'rn-textinputlayout'
import Toast, {
  DURATION
} from 'react-native-easy-toast'
import AV from 'leancloud-storage'

export default class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      phone:'',
      password:'',
    }
  }

  _exit(){
    this.props.cancelRegister()
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

  _register(){

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
    var user = new AV.User();
    user.setUsername(this.state.phone);
    user.setPassword(this.state.password);
    user.signUp().then(function (loginedUser) {
      that.props.cancelRegister()
    }, (function (error) {
      // Alert.alert(JSON.stringify(error));
      if(error.code == 202){
        Alert.alert('注册失败，该用户已经存在');
      }else {
        Alert.alert('注册失败，请检测当前网络是否良好');
      }

    }));



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
          <Button style={styles.btn} onPress={this._register.bind(this)}>注册</Button>
        </View>


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



})