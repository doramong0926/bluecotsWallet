import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
 import { Card } from 'react-native-material-design';

class NotificationCard extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Card style={styles.containerCard}>
                    <Card.Body>
                        <View style={styles.containerNotice}>
                        <View>
                            <Ionicons name="ios-information-circle-outline" size={20} />
                        </View>
                        <View style={{marginLeft:5}}>
                            <Text style={styles.textNotice}>Notice : Bluecots beta wallet has been launched.</Text>
                        </View>
                        </View>
                    </Card.Body>
                </Card>
            </View>
        );
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
        marginBottom: 0,  
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

