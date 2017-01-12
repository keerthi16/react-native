/**
 * Created by keerthiniranjan on 10/01/17.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    TextInput,
    Platform,
    AsyncStorage,
    Text,
    Image,
    Button,
    TouchableHighlight,
    View
} from 'react-native';
import {login} from './request'

const STORAGE_KEY = 'dss_token';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    componentWillMount() {
        this.getToken();
    }

    navigate(routeId) {
        this.props.navigator.push({
            id: routeId
        });
    }

    async getToken() {
        try {
            let accessToken = await AsyncStorage.getItem(STORAGE_KEY);
            if(!accessToken) {
                console.log("Token not set");
            } else {
                this.navigate('PLANNINGBOARD');
            }
        } catch(error) {
            console.log("Something went wrong");
        }
    }

    redirect(routeId, accessToken) {
        this.props.navigator.push({
            id: routeId
        });
    }

    storeToken(responseData) {
        AsyncStorage.setItem(STORAGE_KEY, responseData, (err) => {
            if (err) {
                console.log("an error");
                throw err;
            }
            console.log("success");
        }).catch((err) => {
            console.log(err);
        });
    }

    async onButton() {
        try {
            let data = {
                username: this.state.username,
                password: this.state.password
            };
            let response = await login(data).then(
                (res) => {
                    return res
                },
                (err) => {
                    console.log(err.data.message);
                });

            if (!response.data.error) {
                let accessToken = response.data.data.token;
                this.storeToken(accessToken);
                this.redirect('PLANNINGBOARD');
            }
        } catch (error) {
            console.log(error);
        }
    };

    render() {

        return (
            <View style={styles.container}>
                <Image
                    style={{marginBottom: 20}}
                    source={require('./images/mac.png')}/>
                <Text style={styles.login}> Username / Email :
                </Text>
                <TextInput
                    style={Platform.OS == 'ios'? styles.iosInput: styles.androidInput}
                    placeholder="username"
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                />
                <Text style={styles.login}> Password :
                </Text>
                <TextInput
                    style={Platform.OS == 'ios'? styles.iosInput: styles.androidInput}
                    placeholder="password"
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                />
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.onButton.bind(this)}
                    color="#FFFFFF"
                    accessibilityLabel="click here to login to dss">
                    <Text style={styles.buttonText}>
                        Login
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    login: {
        fontSize: 15,
        textAlign: 'center',
        margin: 10,
    },
    iosInput: {
        height: 40,
        borderColor: 'gray',
        margin: 10,
        padding: 10,
        borderWidth: 1
    },
    androidInput: {
        height: 40,
        width: 300,
        borderColor: 'gray',
        margin: 10,
        padding: 10,
        borderWidth: 1
    },
    button: {
        height: 50,
        margin: 10,
        backgroundColor: '#00adef',
        alignSelf: 'stretch',
        marginTop: 10,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 15,
        color: '#FFF',
        alignSelf: 'center'
    },
});

module.exports = Login;
