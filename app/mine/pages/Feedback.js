import React, {
  Component
} from 'react'
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TextInput,

} from 'react-native'

var width = Dimensions.get('window').width

import Button from 'react-native-button'
import NavigationBar from './../../common/NavigationBar'

import AV from 'leancloud-storage'
class FeedBack extends AV.Object {}
AV.Object.register(FeedBack)

import Toast, {
  DURATION
} from 'react-native-easy-toast'
import request from "../../common/request";
import config from "../../common/config";
import User from "../../common/User";

export default class Feedback extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content:'',
      submitBtnState:false,
    }
  }

  // 渲染组件时隐藏tabbar
  componentWillMount() {
    this.props.tabBar.hide();
  }

  // 销毁组件时显示tabbar
  componentWillUnmount() {
    this.props.tabBar.show();
  }

  _renderNavBarButton(image) {
    return (
      <TouchableOpacity onPress={()=>{this.props.navigator.pop()}}>
        <Image
          style={{width:9,height:15,margin:9}}
          source={image}
        />
      </TouchableOpacity>
    )
  }

  _onChangeText(text){

    var length = text.length
    if(length>0){
      this.setState({
        content:text,
        submitBtnState:true,
      })
    }else {
      this.setState({
        content:text,
        submitBtnState:false,
      })
    }

  }

  _submit(){
    var that = this

      var body = {
          uid: User.user.uid,
          content:that.state.content
      }

      var url = config.api.base + config.api.feedback
      request.post(url, body)
          .then((data) => {
              if (data.code==200) {
                  that.refs.toast.show('保存成功')
                  that.props.navigator.pop()
              } else {
                  console.error(error);
                  that.refs.toast.show('保存失败')
              }
          })
          .catch((err) => {
              console.log('请求失败')
          })
  }
  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title='意见反馈'
          statusBar={{
            barStyle:'default'
          }}
          leftButton={
            this._renderNavBarButton(require('./../../../scr/images/back_icon.png'))
          }
        />

        <TextInput
          style={styles.inputText}
          autoCapitalize="none"
          multiline={true}
          autoCorrect={false}
          onChangeText={(text) => this._onChangeText(text)}
          value={this.state.content}
        />

        <View style={[styles.buttonBox,this.state.submitBtnState?styles.blueColor:styles.grayColor]}>
          <Button style={styles.btn} onPress={this._submit.bind(this)}>提交问题</Button>
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


  inputText:{
    margin:15,
    marginTop:25,
    height:200,
    borderColor:'#e6e6e6',
    borderWidth:1,
    borderRadius:6,
  },
  buttonBox:{
    marginTop:30,
    marginLeft:15,
    width:width-30,
    height:40,
    borderRadius:6,
    alignItems:'center'
  },
  grayColor:{
    backgroundColor:'gray',
  },

  blueColor:{
    backgroundColor:'#337df6',
  },

  btn:{
    height:36,
    color:'#fff',
    fontSize:15,
    paddingTop:12,
  },

})