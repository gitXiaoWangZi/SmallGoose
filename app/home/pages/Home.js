import React, {
  Component
} from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  ListView,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Platform,
  Modal,
  DeviceEventEmitter,

} from 'react-native'

var width = Dimensions.get('window').width
var height = Dimensions.get('window').height

import ListHeader from '../views/ListHeader'
import HomeItem from '../views/HomeItem'

import Options from './Options'
import NetCreditPage from './NetCreditPage'
import CustomPage from './CustomPage'
import HomeBillItem from "../views/HomeBillItem"
import TestLogin from "./../../mine/pages/TestLogin"


import AddBill from "./AddBill";
import BillDetailList from "./BillDetailList";

import request from './../../common/request'
import config from './../../common/config'
import User from './../../common/User'


// import {
//   isFirstTime,
//   isRolledBack,
//   packageVersion,
//   currentVersion,
//   checkUpdate,
//   downloadUpdate,
//   switchVersion,
//   switchVersionLater,
//   markSuccess,
// } from 'react-native-update'

import _updateConfig from './../../../update';
const {appKey} = _updateConfig[Platform.OS];


var items = [
  {
    style:{backgroundColor:'#FF3030'},
    icon:require('./../../../scr/images/home_card.png'),
    title:'信用卡账单',
    subtitle:'信用卡记账，及时还款'
  },
  {
    style:{backgroundColor:'#337df6'},
    icon:require('./../../../scr/images/home_money.png'),
    title:'网贷账单',
    subtitle:'及时还款，安心放心'
  },
  {
    style:{backgroundColor:'#EEB422'},
    icon:require('./../../../scr/images/home_coffee.png'),
    title:'生活账单',
    subtitle:'生活常用，缴费明了'
  },{
    style:{backgroundColor:'#CD661D'},
    icon:require('./../../../scr/images/home_pen.png'),
    title:'手动记账',
    subtitle:'手动输入，方便快捷'
  },
]


export default class Home extends Component {
  constructor(props) {
    super(props)
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    this.state = {
      dataSource: ds.cloneWithRows([]),
      haveBill: false,
      data:[],
      monthlyBill:0,
      totalBill:0,
      isLoginModal:false,
    }


  }

  componentDidMount() {

      //接收通知进行刷新
      DeviceEventEmitter.addListener('refreshHome',(user)=>{
          this._noData()
          User.get().then(()=>{
              this._getBillList()
          }).catch((err)=>{
              this._noData()
          })
      })

      this._noData()
      User.get().then(()=>{
          this._getBillList()
      }).catch((err)=>{
          this._noData()
      })

    // this.checkUpdate()
  }

    //移除通知
    componentWillUnmount(){
        DeviceEventEmitter.remove()
    }

  _noData(){
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(items),
      haveBill: false,
      data:[],
      monthlyBill:0,
      totalBill:0,
    })
  }
  _getBillList(){

    var body = {
      uid: User.user.uid,
    }

    var url = config.api.base + config.api.home
    var that = this
    request.post(url, body)
      .then((data) => {
          console.log(data.data)
          console.log('有账单')
        if (data && data.code==200 && data.data.totalbill != 0) {
          that.setState({
            dataSource: that.state.dataSource.cloneWithRows(data.data.info),
            haveBill: true,
            data:data.data,
            monthlyBill:data.data.monthlybill,
            totalBill:data.data.totalbill,
          })
        } else {
          // that.refs.toast.show(data.msg)
            console.log('没有账单')
          that._noData(items)
        }
      })
      .catch((err) => {
          console.log('请求失败')
        // that.refs.toast.show('获取账单失败，请检测网络是否良好')
        that._noData(items)
      })

  }

  _renderHeader() {
    return (
      !this.state.haveBill ?
        <ListHeader /> : null
    )
  }


  _didSelectedRow(rowId){

      if (User.loginStatus){
          if (rowId == 0){
              this.props.navigator.push({
                  component:Options,
                  title:'',
                  passProps: {
                      tabBar: {
                          hide: () => this.props.tabBar.hide(),
                          show: () => this.props.tabBar.show()
                      },
                      type:0, //标记 0是信用卡账单 1生活账单
                      backShowTabbar:true,
                      callBack:this._updateBillList.bind(this)
                  }
              })
          }else if (rowId==2){
              this.props.navigator.push({
                  component:Options,
                  title:'',
                  passProps: {
                      tabBar: {
                          hide: () => this.props.tabBar.hide(),
                          show: () => this.props.tabBar.show()
                      },
                      type:1, //标记 0是信用卡账单 1生活账单
                      backShowTabbar:true,
                      callBack:this._updateBillList.bind(this)
                  }
              })
          }else if (rowId==1){
              this.props.navigator.push({
                  component:NetCreditPage,
                  title:'',
                  passProps: {
                      tabBar: {
                          hide: () => this.props.tabBar.hide(),
                          show: () => this.props.tabBar.show()
                      },
                      backShowTabbar:true,
                      callBack:this._updateBillList.bind(this)
                  }
              })
          }else if (rowId==3){
              this.props.navigator.push({
                  component:CustomPage,
                  title:'',
                  passProps: {
                      tabBar: {
                          hide: () => this.props.tabBar.hide(),
                          show: () => this.props.tabBar.show()
                      },
                      backShowTabbar:true,
                      callBack:this._updateBillList.bind(this)
                  }
              })
          }
      } else {
          this._showLoginModal()
      }
  }

    _showLoginModal(){
        this.setState({
            isLoginModal:true,
        })
    }

    _cancelLogin = ()=>{
        this.setState({
            isLoginModal:false,
        })
    }

    _loginSuccess(user){

      //发送通知,通知Mine刷新数据
        DeviceEventEmitter.emit('refreshMine',user)

        console.log(user)
        this.setState({
            isLoginModal:false,
            user:user,
            logined:true,
        })

        this._noData()
        User.get().then(()=>{
            this._getBillList()
        }).catch((err)=>{
            this._noData()
        })

        User.loginStatus=true
        User.user=user

    }

  _lookBillDetailList(data){
    console.log(data)

    this.props.navigator.push({
      component:BillDetailList,
      title:'',
      passProps: {
        tabBar: {
          hide: () => this.props.tabBar.hide(),
          show: () => this.props.tabBar.show()
        },
        data:data,
        callBack:this._updateBillList.bind(this)
      }
    })

  }

  _renderRow(rowData, sectionId, rowId) {
    return (
      this.state.haveBill?
      <HomeBillItem item={rowData} callBack={this._lookBillDetailList.bind(this)}/>
      :
      <HomeItem item={rowData} rowId={rowId} callBack={this._didSelectedRow.bind(this)}/>
    )
  }

  _updateBillList(){
    var that = this
    that._getBillList()
  }

  _addBill(){
    var that = this
    that.props.navigator.push({
      component:AddBill,
      title:'',
      passProps: {
        tabBar: {
          hide: () => this.props.tabBar.hide(),
          show: () => this.props.tabBar.show()
        },
        callBack:that._updateBillList.bind(this)
      }
    })
  }



  render() {
    var totalMoney = '¥ ' + this.state.totalBill
    var currentMoney = '本月应还' + this.state.monthlyBill + '元'
    return (
      <View style={styles.contanier}>
        <StatusBar backgroundColor="#fff"  barStyle="light-content" />

        <Image source={require('./../../../scr/images/home_top.png')} style={styles.top}>
          <Text style={styles.title}>小鹅账单</Text>
          <Text style={styles.totalMoney}>{totalMoney}</Text>
          <Text style={[styles.currentMoney,this.state.haveBill?styles.currentMoneyBottom2:styles.currentMoneyBottom1]}>{currentMoney}</Text>

          {
            this.state.haveBill?
            <View style={styles.addBox}>
              <TouchableOpacity onPress={this._addBill.bind(this)}>
                <Image source={require('./../../../scr/images/home_add.png')} style={styles.add_bill} />
              </TouchableOpacity>
            </View>

            :null
          }

        </Image>

        <ListView
          automaticallyAdjustContentInsets = {false}
          dataSource={this.state.dataSource}
          renderHeader = {this._renderHeader.bind(this)}
          renderRow={this._renderRow.bind(this)}
          enableEmptySections={true}
          showsVerticalScrollIndicator={false}
          style={{height:height-160-49}}
        />

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
    backgroundColor: 'white',
  },
  top:{
    width:width,
    height:160,
    justifyContent:'space-between',
    alignItems:'center',
  },

  title:{
    marginTop:30,
    fontSize:15,
    fontWeight:'600',
    backgroundColor:'transparent',
    // color:'red',
    color:'#fff',
  },
  totalMoney:{
    fontSize:30,
    fontWeight:'600',
    color:'#fff',
    backgroundColor:'transparent',

  },

  currentMoney:{
    fontSize:15,
    backgroundColor:'transparent',
    color:'#fff',
    marginBottom:16,
  },
  currentMoneyBottom1:{
    marginBottom:16,
  },
  currentMoneyBottom2:{
    marginBottom:0,
  },

  addBox:{
    width:width,
  },
  add_bill:{
    width:30,
    height:30,
    position:'absolute',
    bottom:12,
    right:12,
  },


})