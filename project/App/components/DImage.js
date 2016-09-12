'use strict';

var React = require('react');
var {
    Image,
    Platform,
} = ReactNative;

var DImage = React.createClass({
    getInitialState() {
        return {showDefault: true}
    },
    onLoad() {
        this.setState({showDefault: false});
    },
    componentWillReceiveProps(nextProps) {
        var pre = this.props.source, post = nextProps.source;
        var preuri = pre.uri, posturi = post.uri;
        var preT = typeof posturi === 'string', postT = typeof posturi === 'string';
        if ((!(preT^postT)) && preuri !== posturi) {
            this.setState({showDefault: true});
        }
    },
    render() {
        var {source, defaultSource, ...other} = this.props;
        var {showDefault} = this.state;
        return (
            showDefault ?
            <Image source={defaultSource} {...other}><Image style={{left:-1, top:-1, position:'absolute', width:1,height:1}} source={source} onLoad={this.onLoad} />{this.props.children}</Image>
            :
            <Image source={source} {...other} >{this.props.children}</Image>
        )
    }
});

module.exports = DImage;