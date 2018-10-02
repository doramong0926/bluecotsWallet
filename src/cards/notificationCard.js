import React, { Component } from 'react';
import { Text, View, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { Card } from 'react-native-material-design';

class NotificationCard extends Component {

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount(){
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        return (
            <View style={styles.container}>
                <Card style={styles.containerCard}>
                    <Card.Body>
                        <TouchableOpacity onPress={() => this.handlePress()} value={0.5}>
                            <View style={styles.containerNotice}>
                                <View>
                                    <Ionicons name="ios-information-circle-outline" size={20} />
                                </View>
                                <View style={{marginLeft:5}}>
                                    <Text style={styles.textNotice}>Notice : Bluecots beta wallet has been launched.</Text>
                                </View>
                                <View style={{flex:1, alignItems:"flex-end" }}>
                                    <Ionicons name="ios-arrow-down" size={20} />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Card.Body>
                </Card>
            </View>
        );
    }    

    handlePress = () => {
        const address = "http://bluecots.cafe24app.com/";
        Linking.canOpenURL(address).then(supported => {
            if (supported) {
                Linking.openURL(address);
            } 
        });
    }
}

function mapStateToProps(state) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start"
        // alignItems: 'center',
        // height: 300,
    },
    containerCard: {
        marginTop: 4,  
        marginBottom: 4,  
        marginHorizontal: 4,
    },
    containerNotice: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    containerTitle: {
        // flex: 1,
        // backgroundColor: 'gray',         
        marginBottom: 20,
    },
    textNotice: {
        fontSize : 12, 
        textAlign:'left',
        color: 'black',
    },
    textTitle: {
        fontSize : 16, 
        fontWeight: 'bold', 
        textAlign:'center',
        color: 'black',
    },
    descriptionText: {
        fontSize: 12,        
        color: '#B4B7BA',
        textAlign: 'center',
    },
})
  
export default connect(mapStateToProps, mapDispatchToProps)(NotificationCard);

