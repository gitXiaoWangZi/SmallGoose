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
  Alert,
  TouchableOpacity,
} from 'react-native'

var width = Dimensions.get('window').width
var height = Dimensions.get('window').height

import NavigationBar from './../../common/NavigationBar'
import SelectItem from '../views/SelectItem'

import CreditCardPage from './CreditCardPage'
import LifePage from "./LifePage";


var bank_items = [
  {
    icon:require('./../../../scr/images/bank_zs.png'),
    title:'招商银行',
    type:1
  },
  {
    icon:require('./../../../scr/images/bank_js.png'),
    title:'建设银行',
    type:2
  },
  {
    icon:require('./../../../scr/images/bank_jt.png'),
    title:'交通银行',
    type:3
  },
  {
    icon:require('./../../../scr/images/bank_ny.png'),
    title:'农业银行',
    type:4
  },
  {
    icon:require('./../../../scr/images/bank_pf.png'),
    title:'浦发银行',
    type:5
  },
  {
    icon:require('./../../../scr/images/bank_zg.png'),
    title:'中国银行',
    type:6
  },
  {
    icon:require('./../../../scr/images/bank_gs.png'),
    title:'工商银行',
    type:7
  },
  {
    icon:require('./../../../scr/images/bank_zx.png'),
    title:'中信银行',
    type:8
  },

]


var life_items = [
  {
    icon:require('./../../../scr/images/type_big_1015.png'),
    title:'水费',
    type:9
  },
  {
    icon:require('./../../../scr/images/type_big_n5.png'),
    title:'电费',
    type:10
  },
  {
    icon:require('./../../../scr/images/type_big_8.png'),
    title:'住房',
    type:11
  },
  {
    icon:require('./../../../scr/images/type_big_5.png'),
    title:'充值',
    type:12
  },
  {
    icon:require('./../../../scr/images/type_big_4.png'),
    title:'交通',
    type:13
  },
  {
    icon:require('./../../../scr/images/type_big_10.png'),
    title:'购物',
    type:14
  },


]


export default class Options extends Component {
  constructor(props) {
    super(props)
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    var items = this.props.type==0?bank_items:life_items

    this.state = {
      dataSource: ds.cloneWithRows(items),

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


 //type 区分 信用卡账单 还是生活账单
  _didSelectedRow(rowId,type){
    // Alert.alert(rowId.toString(),type.toString())
    if (type == 0){
      var data = bank_items[rowId]
      this.props.navigator.push({
        component:CreditCardPage,
        title:'',
        passProps: {
          tabBar: {
            hide: () => this.props.tabBar.hide(),
            show: () => this.props.tabBar.show()
          },
          item:data
        }
      })
    } else if (type == 1){
      var data = life_items[rowId]
      this.props.navigator.push({
        component:LifePage,
        title:'',
        passProps: {
          tabBar: {
            hide: () => this.props.tabBar.hide(),
            show: () => this.props.tabBar.show()
          },
          item:data
        }
      })
    }
  }

  _renderRow(rowData, sectionId, rowId) {
    return (
      <SelectItem item={rowData} rowId={rowId} type={this.props.type} callBack={this._didSelectedRow.bind(this)}/>
    )
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

  _renderSeparator(){
    return (
      <View style={styles.separator}></View>
    )
  }

  render() {
    let tabBarHeight = 0;

    var title = this.props.type==0?'信用卡账单':'生活账单'
    return (
      <View style={styles.contanier}>
        <NavigationBar
          title={title}
          statusBar={{
            barStyle:'default'
          }}
          leftButton={
            this._renderNavBarButton(require('./../../../scr/images/back_icon.png'))
          }
        />
        <ListView
          automaticallyAdjustContentInsets = {false}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          renderSeparator={this._renderSeparator}
          enableEmptySections={true}
          showsVerticalScrollIndicator={false}
        />
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },

  separator:{
    height:1,
    backgroundColor:'#f1f2f3',
  }


})