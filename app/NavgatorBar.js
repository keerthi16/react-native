/**
 * Created by keerthiniranjan on 11/01/17.
 */
/**
 * Created by keerthiniranjan on 11/01/17.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    TextInput,
    AsyncStorage,
    Navigator,
    TouchableHighlight,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    Button,
    View
} from 'react-native';

const NavigatorBarRouteMapper = {

    LeftButton: (route, navigator) => {

        if (route.id == 'LOGIN') {
            return
        }

        if (route.id == 'PLANNINGBOARD') {
            return
        }

        return (
            <TouchableOpacity
                onPress={() => navigator.pop()}>
                <Text style={styles.title}>
                    Back
                </Text>
            </TouchableOpacity>
        )
    },

    RightButton: () => {
        return null;
    },

    Title: (route) => {
        return (
            <Text style={styles.title}>
                {route.id}
            </Text>
        )
    }
};

const styles = StyleSheet.create({
    navBar: {
        backgroundColor: '#00adef'
    },
    title: {
        margin: 10,
        fontSize: 15
    }

});

export default (
    <Navigator.NavigationBar
        style={styles.navBar}
        routeMapper={NavigatorBarRouteMapper}
    />
)