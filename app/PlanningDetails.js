/**
 * Created by keerthiniranjan on 11/01/17.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    TextInput,
    AsyncStorage,
    TouchableHighlight,
    Text,
    Image,
    ScrollView,
    Button,
    View
} from 'react-native';

import {
    Card,
    CardTitle,
    CardContent
} from 'react-native-card-view';

import {getPlanningBoardDetails} from './request'

const STORAGE_KEY = 'dss_token';

export default class PlanningDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            planningDetails: {}
        };
    }

    componentWillMount() {
        this.getToken();
    }

    async getToken() {
        try {
            let accessToken = await AsyncStorage.getItem(STORAGE_KEY);
            if (!accessToken) {
                this.redirect('LOGIN');
            } else {
                getPlanningBoardDetails(accessToken, this.props._id).then(
                    (res) => {
                        this.setState({planningDetails: res.data.data});
                    },
                    (err) => {
                        console.log(err);
                    }
                )
            }
        } catch (error) {
            console.log("Something went wrong");
            this.redirect('LOGIN');
        }
    }

    redirect(routeId) {
        this.props.navigator.push({
            id: routeId,
            passProps: {
                accessToken: this.state.accessToken
            }
        });
    }

    render() {
        let singleData = this.state.planningDetails;

        return (
            <View style={styles.container}>
                    <Text style={styles.heading}>
                        Number of shipments: {singleData.shipments != undefined ? singleData.shipments.length : ''}
                    </Text>
                    <Text style={styles.heading}>
                        Business Type: {singleData.businessType == 1 ? "Manufacturing" : 'Trading'}
                    </Text>
                    <Text style={styles.heading}>
                        Business Type: {"akon"}
                    </Text>
            </View>
        );
    }

};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 80,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#D9D9D9',
    },
    title: {
        fontSize: 18,
        width: 300,
        alignItems: 'center'
    },
    contentTitle: {
        fontSize: 15,
    },
    heading: {
        fontSize: 15,
        margin: 4
    }
});

module.exports = PlanningDetails;
