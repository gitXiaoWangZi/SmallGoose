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



import Swipeout from 'react-native-swipeout'
import request from "../../common/request";
import config from "../../common/config";
import User from './../../common/User'

var width = Dimensions.get('window').width



export default class DetailListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  _deleteItem(){
    var that = this

    var body = {
      uid: User.user.uid,
      cid:this.props.item.id

    }
    var url = config.api.base + config.api.deleteBill
    var that = this
    request.post(url, body)
      .then((data) => {
        if (data && data.code==200) {
          that.props.delete('success')
        } else {
          that.props.delete('failed')
        }
      })
      .catch((err) => {
        that.props.delete('failed')
      })
  }


  render() {
    var swipeOutBtn = [
      {
        backgroundColor:'red',
        color:'white',
        text:'删除',
        onPress:()=>{this._deleteItem()}
      }
    ]

    var bill = this.props.item

    var name = bill.bill_name
    var desc = bill.cardholder
    var title = name + '    ' + desc
    var date = bill.statement_date
    var money = bill.bill_money

    //账单单状态
    var status = bill.overdue

    return (
      <View style={styles.container}>

        <Swipeout right={swipeOutBtn} autoClose={true}>
          <View style={styles.contentContainer}>
            <View style={styles.leftContainer}>
              <Text style={styles.titleView}>{title}</Text>
              <Text style={styles.date}>{date}</Text>
            </View>
            <View style={styles.rightContainer}>
              <Text style={styles.money}>{money}</Text>
              <Text style={styles.status}>{status}</Text>
            </View>
          </View>
        </Swipeout>

      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    paddingLeft:13,
    backgroundColor:'#fff',
  },

  contentContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor:'#fff',

    borderBottomColor:'#f1f2f3',
    borderBottomWidth:1,
  },
  leftContainer:{
    paddingTop:8,
    paddingBottom:8,
  },

  titleView:{
    color:'#337df6'
  },
  date:{
    paddingTop:8,
    color:'#4d4d4d',
    fontSize:14,
  },

  rightContainer:{
    marginRight:13,
  },
  money:{
    color:'#337df6'
  },
  status:{
    paddingTop:8,
    fontSize:12,
    color:'#FF9900',
    textAlign:'right',
  },


})