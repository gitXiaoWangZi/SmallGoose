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

var screenWidth = Dimensions.get('window').width
export default class TextInputWidget extends Component {
	constructor(props) {
		super(props)
	}

	_textOnChange(text) {
		// console.log(text)
		this.props.callBackInputContent(this.props.inputType, text)
	}

	_renderTextInput(keyBoardType){
		// console.log(keyBoardType)
		if(keyBoardType === 'default'){
			return (
        <TextInput
          autoCapitalize="none"
          placeholder={this.props.placeholder}
          placeholderTextColor = {'#999'}
          autoCorrect={false}
          keyBoardType={'default'}
          style={styles.inputField}
          onChangeText = {(text)=>this._textOnChange(text)}
        />
			)
		}else if(keyBoardType === 'numeric'){
      return (
        <TextInput
          autoCapitalize="none"
          placeholder={this.props.placeholder}
          placeholderTextColor = {'#999'}
          autoCorrect={false}
          keyboardType={'numeric'}
          style={styles.inputField}
          onChangeText = {(text)=>this._textOnChange(text)}
        />
      )
		}else if(keyBoardType === 'number-pad'){
      return (
        <TextInput
          autoCapitalize="none"
          placeholder={this.props.placeholder}
          placeholderTextColor = {'#999'}
          autoCorrect={false}
          keyboardType={'number-pad'}
          style={styles.inputField}
          onChangeText = {(text)=>this._textOnChange(text)}
        />
      )
    }
	}



	render() {
		// var placeholder = this.props.placeholder
		return (
			<View style={[styles.container,this.props.style]}>
				<View style={styles.content}>
					<Text style={styles.title}>{this.props.title}</Text>
					{this._renderTextInput(this.props.keyBoardType)}
				</View>
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
		justifyContent: 'space-between',
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
	inputField: {
		width: 150,
		height: 55,
		textAlign: 'right',
		fontSize: 16,
	},
})