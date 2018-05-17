'use strict'

import AV from 'leancloud-storage'

import moment from 'moment'



class Query {

  static initType(){
   return {
      1:{
        name:'招商银行',
        money:0,
        type:1,
      },
      2:{
        name:'建设银行',
        money:0,
        type:2,
      },
      3:{
        name:'交通银行',
        money:0,
        type:3,
      },
      4:{
        name:'农业银行',
        money:0,
        type:4,
      },
      5:{
        name:'浦发银行',
        money:0,
        type:5,
      },
      6:{
        name:'中国银行',
        money:0,
        type:6,
      },
      7:{
        name:'工商银行',
        money:0,
        type:7,
      },
      8:{
        name:'中信银行',
        money:0,
        type:8,
      },
      9:{
        name:'水费',
        money:0,
        type:9,
      },
      10:{
        name:'电费',
        money:0,
        type:10,
      },
      11:{
        name:'住房',
        money:0,
        type:11,
      },
      12:{
        name:'充值',
        money:0,
        type:12,
      },
      13:{
        name:'交通',
        money:0,
        type:13,
      },
      14:{
        name:'购物',
        money:0,
        type:14,
      },
      15:{
        name:'网贷',
        money:0,
        type:15,
      },
      16:{
        name:'手动记账',
        money:0,
        type:16,
      }
   }
  }

  //查询账单列表
  static queryAll() {

    var bill_type = Query.initType()
    return new Promise((resolve, reject) =>{
      var query = new AV.Query('Bill')
      query.find().then(function (results) {
        // console.log(results)
        if (results && results.length>0){
          // console.log('112')
          var data = []   //存放所有的
          var type_set = new Set();
          for(var j = 0; j < results.length; j++) {

            var bill = results[j]
            var type = bill.get('type')
            type_set.add(type)
            var money = bill.get('bill_money')
            var dict = bill_type[type]

            dict.money = dict.money + parseFloat(money)

          }


          for (let type of type_set) {
            var dict = bill_type[type]
            data.splice(data.length,0,dict)
          }

          // console.log(data)

          resolve(data)

        }else {
          resolve([])
        }
      }, function (error) {
        console.log(error)
        reject(error)
      });
    });

  }

  //查询当月还款de
  static queryCurrentMonthMoney(){
    //1.获取本月
    var date = moment().format('YYYY-MM')
    var year = date.split('-')[0]
    var month = date.split('-')[1]

    return new Promise((resolve,reject)=>{
      var yearQuery = new AV.Query('Bill');
      yearQuery.equalTo('year', year);

      var monthQuery = new AV.Query('Bill');
      monthQuery.equalTo('month', month);

      var query = AV.Query.and(yearQuery, monthQuery)

      query.find().then(function (results) {
        // console.log(results)
        if (results && results.length>0){
          var currentMoney = 0

          results.forEach((bill)=>{
            var money = bill.get('bill_money')
            currentMoney = currentMoney + parseFloat(money)
          })


          resolve(currentMoney)

        }else {
          resolve(0)
        }
      }, function (error) {
        console.log(error)
        reject(error)
      });
    })
  }

  //查询当月账单统计
  static queryCurrentMonthAll(){

    var bill_total = {
      credit:{money:0},
      netCredit:{money:0},
      life:{money:0},
      custom:{money:0},
    }

    //1.获取本月
    var date = moment().format('YYYY-MM')
    var year = date.split('-')[0]
    var month = date.split('-')[1]

    return new Promise((resolve,reject)=>{
      var yearQuery = new AV.Query('Bill');
      yearQuery.equalTo('year', year);

      var monthQuery = new AV.Query('Bill');
      monthQuery.equalTo('month', month);

      var query = AV.Query.and(yearQuery, monthQuery)

      query.find().then(function (results) {
        // console.log(results)
        if (results && results.length>0){
          results.forEach((bill)=>{
            var type = parseInt(bill.get('type'))
            var money = parseFloat(bill.get('bill_money'))
            if(type<9){
              bill_total.credit.money = bill_total.credit.money + money
            }else if(9 <= type && type < 15){
              bill_total.netCredit.money = bill_total.netCredit.money + money
            }
            else if(type == 15){
              bill_total.life.money = bill_total.life.money + money
            }else if(type == 16){
              bill_total.custom.money = bill_total.custom.money + money
            }
          })

          console.log(bill_total)
          resolve(bill_total)

        }else {
          resolve(bill_total)
        }
      }, function (error) {
        console.log(error)
        reject(error)
      });
    })

  }

  static queryBillWithType(type){
    type = type.toString()
    return new Promise((resolve,reject)=>{
      var query = new AV.Query('Bill');
      query.equalTo('type', type);
      query.find().then(function (results) {
        if (results && results.length>0){
          resolve(results)
        }else {
          resolve([])
        }
      }, function (error) {
        console.log(error)
        reject(error)
      });
    })
  }


}

export default Query;