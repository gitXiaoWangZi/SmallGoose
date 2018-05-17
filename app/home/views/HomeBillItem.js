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

import imageConfig from './../../common/imageConfig'

var width = Dimensions.get('window').width

export default class HomeBillItem extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  _clickItem(){

    this.props.callBack(this.props.item)

  }
  render() {
    var data = this.props.item
    // console.log(data)
    var icon = imageConfig.home_icon[data.type]
    var name = imageConfig.title[data.type]
    var money = '¥ '+ data.bill_money
    return (
      <TouchableOpacity style={styles.container} onPress={this._clickItem.bind(this)} activeOpacity={1} focusedOpacity={1}>

        <View style={styles.contentContainer}>
          <View style={styles.leftContainer}>
            <Image source={icon}  style={styles.icon}/>
            <Text style={styles.name}>{name}</Text>
          </View>
          <Text style={styles.money}>{money}</Text>
        </View>


      </TouchableOpacity>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    paddingLeft:13,
  },

  contentContainer:{
    borderBottomColor:'#f1f2f3',
    borderBottomWidth:1,
    padding:15,
    paddingLeft:0,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },

  leftContainer:{
    flexDirection:'row',
    alignItems:'center'
  },
  name:{
    marginLeft:12,
  },
  icon:{
    width:35,
    height:35,
  },
  money:{
    color:'#4d4d4d',
  },



})