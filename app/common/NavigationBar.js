/**
 * Created by fanxing on 2018/3/14.
 */

import React, {
	Component,
	PropTypes
} from 'react'
import {
	View,
	Text,
	Image,
	StyleSheet,
	Platform,
	StatusBar,
} from 'react-native'

/*定义常量*/
const NAVBAR_HEIGHT_ANDROID = 50
const NAVBAR_HEIGHT_IOS = 44
const STATUS_BAR_HEIGHT = 20

const StatusBarShape = {
	backgroundColor: PropTypes.string,
	barStyle: PropTypes.oneOf(['default', 'light-content']),
	hidden: PropTypes.bool,
}
export default class NavigationBar extends Component {
	// 组件属性校验  验证传入属性的有效性
	static propTypes = {
		style: View.propTypes.style, //样式：View类型的样式
		title: PropTypes.string,
		titleView: PropTypes.element,
		hide: PropTypes.bool,
		leftButton: PropTypes.element,
		rightButton: PropTypes.element,
		statusBar: PropTypes.shape(StatusBarShape), //状态栏需要传入形状，背景色 和 barStyle 是否隐藏
	}

	static defaultProps = {
		statusBar: {
			barStyle: 'light-content',
			hidden: false,
		}

	}
	constructor(props) {
		super(props)
		this.state = {
			title: '',
			hide: false,
		}
	}

	render() {

		//{...this.props.statusBar} 接收父控件设置的状态栏属性
		//this.props.statusBar 接收父控件的样式
		let status = <View style={styles.statusBar}><StatusBar {...this.props.statusBar}/></View>
		//titleView的优先级比 title的优先级高
		let titleView = this.props.titleView ? this.props.titleView : <Text style={styles.title}>{this.props.title}</Text>
		//具体内容 被View包裹
		let contentView = <View style={styles.navBar}>
			{this.props.leftButton}
			<View style={styles.titleViewContainer}>{titleView}</View>
			{this.props.rightButton}
		</View>


		return (
			<View style={[styles.container,this.props.style]}>
				{status}
				{contentView}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
	},
	navBar: {
		justifyContent: 'space-between',
		alignItems: 'center',
		height: Platform.OS === 'ios' ? NAVBAR_HEIGHT_IOS : NAVBAR_HEIGHT_ANDROID,
		flexDirection: 'row',
	},
	titleViewContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		left: 60,
		right: 60,
		top: 0,
		bottom: 0,
	},
	title: {
		fontSize: 18,
		fontWeight: '600',
		color: '#000',
	},

	statusBar: {
		height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0,
	},
})