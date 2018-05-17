/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,

} from 'react-native';

//外部导入
import TabNavigator from 'react-native-tab-navigator'
import Icon from 'react-native-vector-icons/Ionicons'
//内部导入
import Home from './app/home/pages/Home'
import Mine from './app/mine/pages/Mine'
import Report from './app/report/pages/Report'

var APP_ID = '12pdUsVhtiM6TJaWmJ5zoxEk-gzGzoHsz'
var APP_KEY = 'zsAEIxGEfnLpCvnJPhngNIja'

import AV from 'leancloud-storage'
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

export default class SmallGoose extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'home',
      tabBarHeight: 49
    }
  }

  _handleTabBar(state) {
    this.setState({
      tabBarHeight: state ? 49 : 0
    });
  }

  render() {
    return (
      <TabNavigator
        tabBarStyle={{height: this.state.tabBarHeight, overflow: 'hidden'}}
        sceneStyle={{paddingBottom: this.state.tabBarHeight}}
      >
        <TabNavigator.Item
          title="账单"
          titleStyle={styles.tabText}
          selectedTitleStyle={styles.selectedTabText}
          renderIcon={() => <Icon name={'ios-paper-outline'} size={20} color={'#808080'}/>}
          renderSelectedIcon={() => <Icon name={'ios-paper-outline'} size={20} color={'#337df6'}/>}
          renderAsOriginal
          selected={this.state.selectedTab === 'home'}
          onPress={() => {
            this.setState({
              selectedTab: 'home',
            });
          }}>
          <NavigatorIOS
            initialRoute={{
              component: Home,
              title: '',
              passProps: {
                tabBar: {
                  hide: () => this._handleTabBar(false),
                  show: () => this._handleTabBar(true)
                }
              }
            }}
            navigationBarHidden={true}
            translucent={true}
            style={{flex: 1}}
          />

        </TabNavigator.Item>
        <TabNavigator.Item
          title = '报表'
          titleStyle={styles.tabText}
          selectedTitleStyle={styles.selectedTabText}
          renderIcon={() => <Icon name={'ios-pie'} size={20} color={'#808080'}/>}
          renderSelectedIcon={() => <Icon name={'ios-pie-outline'} size={20} color={'#337df6'}/>}
          selected={this.state.selectedTab === 'report'}
          onPress={() => {
            this.setState({
              selectedTab: 'report',
            });
          }}>
          <Report />
        </TabNavigator.Item>
        <TabNavigator.Item
          title="我的"
          titleStyle={styles.tabText}
          selectedTitleStyle={styles.selectedTabText}
          renderIcon={() => <Icon name={'ios-person-outline'} size={24} color={'#808080'}/>}
          renderSelectedIcon={() => <Icon name={'ios-person-outline'} size={24} color={'#337df6'}/>}
          selected={this.state.selectedTab === 'mine'}
          onPress={() => {
            this.setState({
              selectedTab: 'mine',
            });
          }}>
          <NavigatorIOS
            initialRoute={{
              component: Mine,
              title: '',
              passProps: {
                tabBar: {
                  hide: () => this._handleTabBar(false),
                  show: () => this._handleTabBar(true)
                }
              }
            }}
            navigationBarHidden={true}
            translucent={true}
            style={{flex: 1}}
          />
        </TabNavigator.Item>
      </TabNavigator>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabText: {
    color: '#808080',
    fontSize: 10
  },
  selectedTabText: {
    color: '#337df6'
  },

});

AppRegistry.registerComponent('SmallGoose', () => SmallGoose);
