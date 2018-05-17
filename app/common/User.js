'use strict'

import {
  AsyncStorage,
} from 'react-native'

class User {

  static user = {}
  static loginStatus = false

  static save(user){
    return new Promise((resolve, reject) =>{
      AsyncStorage.setItem('user', JSON.stringify(user))
        .then(() => {
          resolve()
        })
        .catch((err)=>{
          reject(err)
        })
    })
  }

  static get(){
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem('user').then((data)=>{
          // console.log(data)
            if (data){
                User.user = JSON.parse(data).data
                User.loginStatus = true
                resolve(JSON.parse(data).data)

            }
        }).catch((err)=>{
          reject(err)

        })

    })
  }

  static update(value){

      return new Promise((resolve, reject) => {
          User.get('user').then((item) => {
              value = typeof value === 'string' ? value : Object.assign({},item,value);
              return AsyncStorage.setItem('user',JSON.stringify(value));
          }).then(() => {
              resolve()
          }).catch((err)=>{
              reject(err)
          })
      })


  }

  static delete() {
      return new Promise((resolve, reject) => {
          AsyncStorage.removeItem('user')
            .then(() => {
                resolve()
            }).catch((err)=>{
                reject(err)
            })
      })
  }
}

export default User;