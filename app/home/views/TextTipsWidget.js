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
	Alert,
} from 'react-native'

//外部导入
import DateTimePicker from 'react-native-modal-datetime-picker'
import moment from 'moment'
//常量数据
var screenWidth = Dimensions.get('window').width
export default class TextTipsWidget extends Component {
	constructor(props) {
		super(props)
		this.state = {
      isDateTimePickerVisible: false,
			date:'',
      selectStatus:false,
		}
	}


  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
  	date = moment(date).format("YYYY-MM-DD")
  	this.setState({
      date:date,
      selectStatus:true,
		})

    this._hideDateTimePicker();

    this.props.selectType(this.props.type,date)

  }


	render() {
		var placeholder = this.props.placeholder
		return (
			<View style={[styles.container,this.props.style]}>
				<TouchableOpacity onPress={this._showDateTimePicker.bind(this)} activeOpacity={1}>
					<View style={styles.content}>
						<Text style={styles.title}>{this.props.title}</Text>
						<Text style={styles.tips}>{this.state.selectStatus?this.state.date:this.props.tips}</Text>
						<Image style={styles.rigthIcon} source={require('./../../../scr/images/mine_right_indicator.png')}/>
					</View>
				</TouchableOpacity>

        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked.bind(this)}
          onCancel={this._hideDateTimePicker.bind(this)}
          cancelTextIOS={'取消'}
          confirmTextIOS={'确认'}
          mode={'date'}
          titleIOS={'选择日期'}
        />
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
		height: 55,
		flexDirection: 'row',
		// justifyContent: 'space-between',
		alignItems: 'center',
		paddingLeft: 12,
		paddingRight: 12,

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