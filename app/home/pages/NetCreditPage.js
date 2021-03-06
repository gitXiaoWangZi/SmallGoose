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



import Toast, {
  DURATION
} from 'react-native-easy-toast'
import request from "../../common/request";
import config from "../../common/config";
import User from "../../common/User";

export default class NetCreditPage extends Component {
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

  // 销毁组件时显示tabbar
  componentWillUnmount() {
    if(this.props.backShowTabbar){
      this.props.tabBar.show();
    }
  }

  _back(){
      this.props.navigator.pop()
      if(this.props.backShowTabbar){
          this.props.callBack()
      }

  }
  _renderNavBarButton(image) {
    return (
      <TouchableOpacity onPress={this._back.bind(this)}>
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
      that.refs.toast.show('贷款方名字不能为空')
      return
    }

    if(that.state.bill_desc === ''){
      that.refs.toast.show('贷款备注不能为空')
      return
    }

    if(that.state.repay_date === ''){
      that.refs.toast.show('还款日不能为空')
      return
    }

    if(that.state.bill_money === ''){
      that.refs.toast.show('账单金额不能为空')
      return
    }

    var body = {
      uid: User.user.uid,
      bill_name:that.state.bill_name,
      cardholder:that.state.bill_desc,
      statement_date:that.state.repay_date,
      bill_money:that.state.bill_money,
      type:'15'
    }
    var url = config.api.base + config.api.addBill

    request.post(url, body)
      .then((data) => {

        if (data && data.code==200) {
          that.refs.toast.show('保存成功')
          that.props.navigator.pop()
          that.props.callBack()
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
    // console.log(type, content)
    if (type == 1) {
      this.setState({
        bill_name: content
      })
    } else if (type == 2) {
      this.setState({
        bill_desc: content
      })
    } else if (type == 3) {
      this.setState({
        bill_money: content
      })
    }
  }

  render() {

    return (
      <View style={styles.container}>
        <NavigationBar
          title='网贷'
          statusBar={{
            barStyle:'default'
          }}
          leftButton={
            this._renderNavBarButton(require('./../../../scr/images/back_icon.png'))
          }
        />

        <TextInputWidget keyBoardType='default' title='贷款方' placeholder='如：简单贷款' inputType={1} callBackInputContent={this._getInputFieldData.bind(this)}/>
        <TextInputWidget keyBoardType='default' title='贷款备注' placeholder='如：购买电脑'  inputType={2} callBackInputContent={this._getInputFieldData.bind(this)}/>
        <TextInputWidget keyBoardType='numeric' style={{marginTop:10}} title='网贷金额' placeholder='如：1000' inputType={3} callBackInputContent={this._getInputFieldData.bind(this)} />
        <TextTipsWidget style={{marginTop:10}} title='还款日' tips='请选择' type={1} selectType={this._selectType.bind(this)}/>

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
    marginTop:50,
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