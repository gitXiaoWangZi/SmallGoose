import React, {
  Component
} from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,

} from 'react-native'

var width = Dimensions.get('window').width

import Button from 'react-native-button'

//自定义
import NavigationBar from './../../common/NavigationBar'
import TextInputWidget from '../views/TextInputWidget'
import TextTipsWidget from '../views/TextTipsWidget'
import User from './../../common/User'

import AV from 'leancloud-storage'
class Bill extends AV.Object {}
AV.Object.register(Bill)

import Toast, {
  DURATION
} from 'react-native-easy-toast'
import request from "../../common/request";
import config from "../../common/config";

export default class LifePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bill_name:'',
      bill_desc:'',
      bill_money:'',
      repay_date:''
    }
  }

  // 渲染组件时隐藏tabbar
  componentWillMount() {
    this.props.tabBar.hide();
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

  _submit() {

    var that = this

    if(that.state.bill_name === ''){
      that.refs.toast.show('账单备注不能为空')
      return
    }

    if(that.state.repay_date === ''){
      that.refs.toast.show('还款日不能为空')
      return
    }

    if(that.state.bill_money === ''){
      that.refs.toast.show('缴费金额不能为空')
      return
    }

    var body = {
      uid: User.user.uid,
      bill_name:that.state.bill_name,
      cardholder:'',
      statement_date:that.state.repay_date,
      bill_money:that.state.bill_money,
      type:this.props.item.type.toString()
    }
    var url = config.api.base + config.api.addBill
    var that = this
    request.post(url, body)
      .then((data) => {

        if (data && data.code==200) {
          that.refs.toast.show('保存成功')
          that.props.navigator.pop()
        } else {
          that.refs.toast.show(data.msg)
        }
      })
      .catch((err) => {
        that.refs.toast.show('保存失败，请检测网络是否良好')
      })




  }





  _selectType(type, value) {
    this.setState({repay_date:value})
  }

  _getInputFieldData(type, content) {
    if (type == 1) {
      this.setState({
        bill_name: content
      })
    } else if (type == 2) {
      this.setState({
        bill_money: content
      })
    }
  }

  render() {

    return (
      <View style={styles.container}>
        <NavigationBar
          title='手动记账'
          statusBar={{
            barStyle:'default'
          }}
          leftButton={
            this._renderNavBarButton(require('./../../../scr/images/back_icon.png'))
          }
        />


        <TextInputWidget keyBoardType='default' title='账单备注' placeholder='如：购买衣服'  inputType={1} callBackInputContent={this._getInputFieldData.bind(this)}/>
        <TextInputWidget keyBoardType='numeric' title='缴费金额' placeholder='如：1000' inputType={2} callBackInputContent={this._getInputFieldData.bind(this)} />
        <TextTipsWidget title='还款日' tips='请选择' type={1} selectType={this._selectType.bind(this)}/>

        <View style={styles.buttonBox}>
          <Button style={styles.btn} onPress={this._submit.bind(this)}>提交</Button>
        </View>

        <Toast ref="toast" positionValue={400}/>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f2f3',

  },

  buttonBox:{
    marginTop:100,
    marginLeft:15,
    width:width-30,
    height:40,
    backgroundColor:'#337df6',
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