var ReactNative = require('react-native');
var {
    Image,
    Platform,
} = ReactNative;
var DImage = require('./DImage.js');

module.exports = {
	Button: require('./Button.js'),
    PageList: require('./PageList.js'),
	ActionSheet: require('./ActionSheet/index.js'),
	CustomSheet: require('./CustomSheet.js'),	Modal: require('./Modal.js'),
	DImage: (Platform.OS==='android') ? DImage : Image,
	DDImage: DImage,
	Label: require('./Label.js'),
	ProgressBar: require('./ProgressBar.js'),
	Slider: require('./Slider.js'),
	MessageBox: require('./MessageBox.js'),
	WebviewMessageBox: require('./WebviewMessageBox.js'),
	DelayTouchableOpacity: require('./DelayTouchableOpacity.js'),
	ProgressHud: require('./ProgressHud.js'),
};
