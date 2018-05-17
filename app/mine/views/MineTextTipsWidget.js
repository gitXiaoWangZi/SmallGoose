import React, {
  Component
} from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native'

//常量数据
var screenWidth = Dimensions.get('window').width
export default class MineTextTipsWidget extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }


  _select(){
    this.props.selectType(this.props.type)
  }


  render() {
    var placeholder = this.props.placeholder
    return (
      <View style={[styles.container,this.props.style]}>
        <TouchableOpacity onPress={this._select.bind(this)} activeOpacity={1}>
          <View style={styles.content}>
            <Text style={styles.title}>{this.props.title}</Text>
            <Text style={styles.tips}>{this.props.tips}</Text>
            <Image style={styles.rigthIcon} source={require('./../../../scr/images/mine_right_indicator.png')}/>
          </View>
        </TouchableOpacity>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    backgroundColor: '#fff',
  },
  content: {
    height: 45,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    // paddingLeft: 12,
    paddingRight: 12,
    marginLeft:12,
    borderBottomWidth: 1,
    borderColor: '#f2f2f2'
  },
  title: {
    fontSize: 16,
    color: '#4d4d4d'
  },
  rigthIcon: {
    position: 'absolute',
    right: 12,
  },

  tips: {
    flex: 1,
    padding: 12,
    textAlign: 'right',
    fontSize: 16,
    color: '#999'
  },


})