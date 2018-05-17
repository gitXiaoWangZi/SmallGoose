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

export default class SelectItem extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  _clickItem(){
    this.props.callBack(this.props.rowId,this.props.type)
  }
  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this._clickItem.bind(this)} activeOpacity={1} focusedOpacity={1}>

        <View style={styles.contentBox}>
          <Image source={this.props.item.icon} style={styles.leftImage}/>
          <Text style={styles.title}>{this.props.item.title}</Text>
        </View>
        <Image source={require('./../../../scr/images/back.png')} style={styles.rightImage}/>
      </TouchableOpacity>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    padding:13,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
  },
  leftImage:{
    width:35,
    height:35,
  },
  contentBox:{
    flexDirection:'row',
    alignItems:'center',
  },
  title:{
    marginLeft:12,
    fontSize:16,
    color:'#404040',
  },

  rightImage:{
    marginRight:15,
    width:5,
    height:10,
  },



})