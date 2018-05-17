import React, {
  Component
} from 'react'
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native'

var width = Dimensions.get('window').width

export default class ListHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contentBox}>
          <Image style={styles.leftImage} source={require('./../../../scr/images/type_big_1015.png')}/>
          <Text style={styles.title}>水费</Text>
        </View>

        <View style={styles.contentBox}>
          <Image style={styles.demoImage} source={require('./../../../scr/images/shili.png')}/>
          <Text style={styles.money}>¥ 1314.520</Text>
        </View>

      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    padding:15,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  contentBox:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  leftImage:{
    width:35,
    height:35,
  },
  title:{
    marginLeft:12,
  },
  demoImage:{
    width:35,
    height:35,
    marginRight:12,
  },
  money:{

  },

})