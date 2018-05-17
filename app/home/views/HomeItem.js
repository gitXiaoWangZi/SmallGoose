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

export default class HomeItem extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  _clickItem(){
    this.props.callBack(this.props.rowId)
  }
  render() {
    return (
      <TouchableOpacity style={[styles.container,this.props.item.style]} onPress={this._clickItem.bind(this)} activeOpacity={1} focusedOpacity={1}>
        <Image source={this.props.item.icon} style={styles.leftImage}/>
        <View style={styles.contentBox}>
          <Text style={styles.title}>{this.props.item.title}</Text>
          <Text style={styles.subtitle}>{this.props.item.subtitle}</Text>
        </View>

      </TouchableOpacity>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    // backgroundColor:'red',
    flexDirection:'row',
    alignItems:'center',
    marginLeft:12,
    marginRight:12,
    marginBottom:12,
    borderRadius:6,
    height:90,
  },
  leftImage:{
    marginLeft:15,
    width:35,
    height:35,
  },
  contentBox:{
    marginLeft:15,
  },
  title:{
    padding:3,
    color:'#fff',
    fontSize:18,
  },
  subtitle:{
    padding:3,
    color:'#fff',
  },


})