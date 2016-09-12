'use strict';

var React = require('react');
var {
    Navigator,
    PixelRatio,
    StyleSheet,
    ScrollView,
    Text,
    TouchableHighlight,
    View,
    Image
} = ReactNative;

import TabNavigator from 'react-native-tab-navigator';
var Empty = require('./Empty.js');

var INIT_ROUTE_INDEX = 0;
var ROUTE_STACK = [
    {index: 0, component: Empty},
    {index: 1, component: Empty},
    {index: 2, component: Empty},
    {index: 3, component: Empty},
];

var HomeTabBar = React.createClass({
    componentWillMount() {
        app.showMainScene = (i)=> {
            var {title, leftButton, rightButton} = _.find(ROUTE_STACK, (o)=>o.index===i).component;
            Object.assign(app.getCurrentRoute(), {
                title: title,
                leftButton: leftButton,
                rightButton: rightButton,
            });
            this.props.onTabIndex(i);
            app.forceUpdateNavbar();
        }
    },
    componentDidMount() {
        app.toggleNavigationBar(true);
    },
    getInitialState() {
        return {
            tabIndex: this.props.initTabIndex
        };
    },
    handleWillFocus(route) {
        var tabIndex = route.index;
        this.setState({ tabIndex, });
    },
    render() {
        var menus = [
            {index: 0, title: '首  页', icon: app.img.home_home, selected: app.img.home_home_press},
            {index: 1, title: '学习场', icon: app.img.home_learn, selected: app.img.home_learn_press},
            {index: 2, title: '训练场', icon: app.img.home_train, selected: app.img.home_train_press},
            {index: 3, title: '实战场', icon: app.img.home_actual, selected: app.img.home_actual_press},
        ];
        var TabNavigatorItems = menus.map((item)=>{
            return (
                <TabNavigator.Item
                    key={item.index}
                    selected={this.state.tabIndex === item.index}
                    title={item.title}
                    titleStyle={styles.titleStyle}
                    renderIcon={() =>
                        <Image
                            resizeMode='stretch'
                            source={item.icon}
                            style={styles.icon} />
                    }
                    renderSelectedIcon={() =>
                        <Image
                            resizeMode='stretch'
                            source={item.selected}
                            style={styles.icon} />
                    }
                    onPress={() => {
                        app.showMainScene(item.index);
                    }}>
                    <View />
                </TabNavigator.Item>
            )
        });
        return (
            <View style={styles.tabs}>
                <TabNavigator
                    tabBarStyle={styles.tabBarStyle}
                    tabBarShadowStyle={styles.tabBarShadowStyle}
                    hidesTabTouch={true} >
                    {TabNavigatorItems}
                </TabNavigator>
            </View>
        );
    },
});

module.exports = React.createClass({
    statics: {
        title: ROUTE_STACK[INIT_ROUTE_INDEX].component.title,
        leftButton: ROUTE_STACK[INIT_ROUTE_INDEX].component.leftButton,
        rightButton: ROUTE_STACK[INIT_ROUTE_INDEX].component.rightButton,
    },
    getChildScene() {
        return this.scene;
    },
    renderScene(route, navigator) {
        return <route.component ref={(ref)=>{if(ref)route.ref=ref}}/>;
    },
    render() {
        return (
            <Navigator
                debugOverlay={false}
                style={styles.container}
                ref={(navigator) => {
                    this._navigator = navigator;
                }}
                initialRoute={ROUTE_STACK[INIT_ROUTE_INDEX]}
                initialRouteStack={ROUTE_STACK}
                renderScene={this.renderScene}
                onDidFocus={(route)=>{
                    var ref = this.scene = app.scene = route.ref;
                    ref && ref.onDidFocus && ref.onDidFocus();
                }}
                onWillFocus={(route)=>{
                    var ref = route.ref;
                    ref && ref.onWillFocus && ref.onWillFocus(); //注意：因为有initialRouteStack，在mounted的时候所有的页面都会加载，因此只有第一个页面首次不会调用，需要在componentDidMount中调用，其他页面可以调用
                }}
                configureScene={(route) => ({
                    ...app.configureScene(route),
                })}
                navigationBar={
                    <HomeTabBar
                        initTabIndex={INIT_ROUTE_INDEX}
                        onTabIndex={(index) => {
                            this._navigator.jumpTo(_.find(ROUTE_STACK, (o)=>o.index===index));
                        }}
                        />
                }
                />
        );
    },
});


var styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        flex: 1,
    },
    tabs: {
        height: 60,
        width: sr.w,
        position: 'absolute',
        left: 0,
        bottom: 0,
    },
    titleStyle: {
        fontSize:16,
        color: '#FFFFFF',
    },
    tabBarStyle: {
        height:60,
        backgroundColor: '#7A7A7A',
    },
    tabBarShadowStyle: {
        height: 0,
        backgroundColor: '#7A7A7A',
    },
    icon: {
        width:30,
        height:30
    },
});