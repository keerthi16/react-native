/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Navigator,
    Text,
    View
} from 'react-native';

import Login from './app/Login';
import PlanningBoard from './app/PlanningBoard';
import PlanningDetails from './app/PlanningDetails';
import NavigationBar from './app/NavgatorBar';

class DSSReactNative extends Component {

    renderScene(route, navigator) {
        console.log(route);
        if (route.id == 'LOGIN') {
            return <Login navigator={navigator}/>
        }
        if (route.id == 'PLANNINGBOARD') {
            return <PlanningBoard navigator={navigator} {...route.passProps}/>
        }
        if (route.id == 'PLANNINGDETAILS') {
            return <PlanningDetails navigator={navigator} {...route.passProps}/>
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Navigator
                    initialRoute={{title: 'Login', id: 'LOGIN'}}
                    renderScene={this.renderScene.bind(this)}
                    navigationBar={NavigationBar}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
});

AppRegistry.registerComponent('DSSReactNative', () => DSSReactNative);
