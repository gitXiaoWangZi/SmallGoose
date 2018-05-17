import React, {
  Component
} from 'react'
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,

} from 'react-native'

var width = Dimensions.get('window').width

import NavigationBar from './../../common/NavigationBar'
export default class AboutUs extends Component {
  constructor(props) {
    super(props)
    this.state = {

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
  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title='关于我们'
          statusBar={{
            barStyle:'default'
          }}
          leftButton={
            this._renderNavBarButton(require('./../../../scr/images/back_icon.png'))
          }
        />

        <View style={styles.content}>
          <Image style={styles.logo} source = {require('./../../../scr/images/headerIcon.png')} />

          <View style={styles.introBox}>
            <Text style={styles.intro}>        "小鹅账单"是一款简单实用的账单管理工具，宗旨是简化用户操作，方便用户清晰的记录用户日常生活中的各种账单，用简单的方式为用户理清账单，让每笔开支都清楚明了。轻生活，简记账！</Text>
          </View>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content:{
    marginTop:50,
    alignItems:'center',
  },
  logo:{
    width:50,
    height:50,
  },
  introBox:{
    padding:40,
  },
  intro:{
    lineHeight:25,
    letterSpacing:2,
  },



})