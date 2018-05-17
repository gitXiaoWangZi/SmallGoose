import React, {
  Component
} from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native'

// 外部导入
import Button from 'react-native-button'
import {
  CountDownText
} from 'react-native-sk-countdown'

// 内部自定义
import request from "../../common/request";
import config from "../../common/config";
import User from "../../common/User";
import Toast, {
  DURATION
} from 'react-native-easy-toast'

export default class TestLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      phoneNumber: '',
      verifyCode: '',
      sendCode: false,
      codingDone: false,
    }
  }

  _sendCode() {
      var that = this
    if (phone='15858161160'){
        that.setState({
            sendCode: true,
            codingDone: false,
        })
    } else {
        var phone = this.state.phoneNumber
        if (phone.length !== 11) {
            that.refs.toast.show('请输入11位手机号')
            return
        }

        var body = {
            phone: phone
        }
        var url = config.api.base + config.api.creditLoginVercode

        request.post(url, body)
            .then((data) => {
                if (data && data.code == 200) {
                    that.setState({
                        sendCode: true,
                        codingDone: false,
                    })
                } else {
                    that.refs.toast.show('获取验证码失败，请检测手机是否输入正确')
                }
            })
            .catch((err) => {
                that.refs.toast.show('获取验证码失败，请检测网络是否良好')
            })
    }


  }

  _login() {
    /*
    var user = {
      accessToken: 'ios11',
      uid: '123456'
    }

    this.props.afterLogin(user)
    */

    var that = this
    var phone = this.state.phoneNumber
    if (phone.length !== 11) {
      that.refs.toast.show('请输入11位手机号')
      return
    }

    var verify = this.state.verifyCode
    if (verify.length !== 6) {
      that.refs.toast.show('请输入6位验证码')
      return
    }

    var body = {
      phone:phone,
      vercode:verify
    }
    var url = config.api.base + config.api.login

    request.post(url, body)
      .then((data) => {
        if (data && data.code == 200) {
          var user = {
            phone:data.phone,
            tmp_img:data.tmp_img,
            data:data.data
          }

          User.save(user).then(()=>{
            that.refs.toast.show('登录成功')
            that.props.loginSuccess(user)
            User.loginStatus = true
          }).catch((err)=>{
            console.log(err)
            that.refs.toast.show('登录失败')
              console.log('登录失败')
            User.loginStatus = false
          })

        } else {
          that.refs.toast.show(data.msg)
        }
      })
      .catch((err) => {
        that.refs.toast.show('登录失败，请检测网络是否良好')
      })


  }

  _countDone() {
    this.setState({
      codingDone: true
    })
  }

  _cancel = () =>{
    this.props.cancelLogin()
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.signUpBox}>
          <Text style={styles.title}>快速登录</Text>
          <TouchableOpacity style={styles.cancel} onPress={this._cancel}><Text>取消</Text></TouchableOpacity>
          <TextInput
            autoCapitalize={'none'}
            autoCorrect={false}
            keyBoardType={'number-pad'}
            placeholder={'请输入手机号'}
            onChangeText={(text)=>{
              this.setState({
                phoneNumber:text
              })
            }}
            style={styles.inputField}
          />

          {
            this.state.sendCode
              ?<View style={styles.verifyCodeBox}>
                <TextInput
                  autoCapitalize={'none'}
                  autoCorrect={false}
                  keyBoardType={'number-pad'}
                  placeholder={'请输入验证码'}
                  onChangeText={(text)=>{
                    this.setState({
                      verifyCode:text
                    })
                  }}
                  style={styles.verifyInputField}
                />

                {
                  this.state.codingDone
                    ?
                    <Button
                      style={styles.countBtn}
                      onPress={this._sendCode.bind(this)}
                    > 获取验证码 </Button>
                    :
                    <CountDownText
                      style={styles.countBtn}
                      countType='seconds' // 计时类型：seconds / date
                      auto={true} // 自动开始
                      afterEnd={this._countDone.bind(this)} // 结束回调
                      timeLeft={60} // 正向计时 时间起点为0秒
                      step={-1} // 计时步长，以秒为单位，正数则为正计时，负数为倒计时
                      startText='获取验证码' // 开始的文本
                      endText='获取验证码' // 结束的文本
                      intervalText={(sec) => '剩余秒数:'+ sec} // 定时的文本回调
                    />
                }

              </View>
              :null
          }

          {
            this.state.sendCode
              ?<Button
                onPress={this._login.bind(this)}
                style={styles.sendCodeBtn}
              >登录</Button>
              :
              <Button
                onPress={this._sendCode.bind(this)}
                style={styles.sendCodeBtn}
              >获取验证码</Button>
          }
        </View>

        <Toast ref="toast" positionValue={400}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  signUpBox: {
    marginTop: 30,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333'
  },
  cancel:{
    marginTop:2,
    position:'absolute',
    right:13,
  },
  inputField: {
    height: 40,
    padding: 6,
    backgroundColor: '#fff',
    color: '#666',
    fontSize: 16,
    borderRadius: 6,
  },

  sendCodeBtn: {
    marginTop: 30,
    padding: 10,
    backgroundColor: 'transparent',
    borderColor: '#337df6',
    borderWidth: 1,
    borderRadius: 4,
    color: '#337df6',
  },
  verifyCodeBox: {
    marginTop: 10,
    flexDirection:'row',
    justifyContent:'space-between',
  },
  verifyInputField: {
    flex:1,
    height: 40,
    padding: 6,
    backgroundColor: '#fff',
    color: '#666',
    fontSize: 16,
    borderRadius: 6,
  },
  countBtn:{
    width:110,
    height:38,
    marginLeft:10,
    backgroundColor:'#337df6',
    color: '#fff',
    padding:10,
    fontWeight:'600',
    fontSize:15,
    textAlign:'left',
  },

})