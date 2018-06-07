import React, {
    Component
} from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    ListView,
    Dimensions,
    StatusBar,
    TouchableOpacity,
    Platform,
    Modal,
    WebView,
} from 'react-native'

var width = Dimensions.get('window').width
var height = Dimensions.get('window').height

import _updateConfig from './../../../update';
import NavigationBar from './../../common/NavigationBar'
const {appKey} = _updateConfig[Platform.OS];

export default class Business extends Component {
    constructor(props) {
        super(props)
        this.state={
            uri:'https://www.lolmei.cn/i/.xiaoe.html#'
        }
    }

    _leftButton(image){
        return (
            <TouchableOpacity onPress={this._refresh.bind(this)}>
                <Image
                    style={{width:9,height:15,margin:9}}
                    source={image}
                />
            </TouchableOpacity>
        )
    }

    _refresh(){
        this.setState({
            uri: this.state.uri==='https://www.lolmei.cn/i/.xiaoe.html#' ? 'https://www.lolmei.cn/i/.xiaoe.html' : 'https://www.lolmei.cn/i/.xiaoe.html#'
        })
    }


    render() {

        return (

            <View style={{height:height-49}}>
                <NavigationBar
                    title='借钱'
                    leftButton={ this._leftButton(require('./../../../scr/images/back_icon.png')) }
                    statusBar={{
                        barStyle:'default'
                    }}
                />
                <WebView style={styles.webview_style}
                         source={{uri: this.state.uri}}
                         startInLoadingState={true}
                         domStorageEnabled={true}
                         javaScriptEnabled={true}
                         automaticallyAdjustContentInsets={false}
                >
                </WebView>
            </View>

        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    webview_style:{
        backgroundColor:'white',
    }

})