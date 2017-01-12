/**
 * Created by keerthiniranjan on 10/01/17.
 */
/**
 * Created by keerthiniranjan on 10/01/17.
 */

import React, {Component} from 'react';
import map from 'lodash/map';
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
import ButtonNative from 'react-native-button';

import {getPlanningBoard} from './request'

const STORAGE_KEY = 'dss_token';

export default class PlanningBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            planningBoard: [],
            accessToken: '',
            _id: ''
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
                this.setState({accessToken: accessToken});
                getPlanningBoard(accessToken).then(
                    (res) => {
                        this.setState({planningBoard: res.data.data});
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

    redirectToDetails(id) {
        this.props.navigator.push({
            id: "PLANNINGDETAILS",
            passProps: {
                _id: id
            }
        });
    }

    planningDetails(id) {
        console.log(id);
        this.redirectToDetails(id);
    }

    render() {
        let planningData = this.state.planningBoard;
        const planning = map(planningData, (val, key) =>
            <Card key={key}>
                <CardTitle key={key}>
                    <Text style={styles.title} key={key}>{val.planningBoardId}</Text>
                </CardTitle>
                <CardContent>
                    <Text style={styles.contentTitle}> Final Amount : {val.saleComponent.finalAmount}</Text>
                </CardContent>
                <ButtonNative
                    style={styles.button}
                    onPress={this.planningDetails.bind(this, val._id)}>
                    View Details
                </ButtonNative>
            </Card>
        );

        return (
            <View style={styles.container}>
                <ScrollView>
                    {planning}
                </ScrollView>
            </View>
        );
    }

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 80,
        justifyContent: 'center',
        alignItems: 'center',
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
    button: {
        margin: 10,
        fontSize: 15,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    }
});

module.exports = PlanningBoard;
