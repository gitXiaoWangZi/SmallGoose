import React, {
  Component
} from 'react'
import {
  View,
  StyleSheet,
  ListView,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native'

var width = Dimensions.get('window').width
var height = Dimensions.get('window').height


import HomeItem from '../views/HomeItem'

import Options from './Options'
import NetCreditPage from './NetCreditPage'
import CustomPage from './CustomPage'
import NavigationBar from './../../common/NavigationBar'


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


export default class AddBill extends Component {
  constructor(props) {
    super(props)
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    this.state = {
      dataSource: ds.cloneWithRows(items),
    }
  }

  // 渲染组件时隐藏tabbar
  componentWillMount() {
    this.props.tabBar.hide();
  }
  //销毁组件时显示tabbar
  componentWillUnmount() {

    this.props.tabBar.show();


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

  _back(){
    this.props.navigator.pop()
    this.props.callBack()
  }

  _didSelectedRow(rowId){
    // Alert.alert(rowId.toString())
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
          backShowTabbar:false
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
          backShowTabbar:false
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
        }
      })
    }
  }

  _renderRow(rowData, sectionId, rowId) {
    return (
      <HomeItem item={rowData} rowId={rowId} callBack={this._didSelectedRow.bind(this)}/>
    )
  }


  render() {
    return (
      <View style={styles.contanier}>
        <NavigationBar
          title={'添加账单'}
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
          enableEmptySections={true}
          showsVerticalScrollIndicator={false}
          style={{height:height-160-49}}
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

})