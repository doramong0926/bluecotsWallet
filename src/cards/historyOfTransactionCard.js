import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import HistoryOfTransaction from '../components/historyOfTransaction'
import StatusOfTranscation from '../components/statusOfTranscation'
import { Card } from 'react-native-material-design';

class HistoryOfTransactionCard extends Component {
    render() {
        return (
            <View style={styles.container}>  
                <View>
                    <Card style={styles.containerCard}>
                        <Card.Body>
                            <View style={styles.containerTransaction}>
                                <View style={styles.containerTitle}>
                                    <Text style={styles.textTitle}>Recent BLC Transaction</Text>
                                    <Text style={styles.descriptionText}>It is shown only 3 recent transaction.</Text>
                                </View>
                                <View>
                                    <StatusOfTranscation />
                                    <HistoryOfTransaction tokenName={'BLC'} offset={3} />
                                </View>
                            </View>
                        </Card.Body>
                    </Card>
                </View>  
                <View>
                    <Card style={styles.containerCard}>
                        <Card.Body>
                            <View style={styles.containerTransaction}>
                                <View style={styles.containerTitle}>
                                    <Text style={styles.textTitle}>Recent ETH Transaction</Text>
                                    <Text style={styles.descriptionText}>It is shown only 3 recent transaction.</Text>
                                </View>
                                <View>
                                    <StatusOfTranscation />
                                    <HistoryOfTransaction tokenName={'ETH'} offset={3} />
                                </View>
                            </View>
                        </Card.Body>
                    </Card>
                </View>                
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
    containerTransaction: {      
        // marginBottom: 20,
    },
    containerTitle: {
        // flex: 1,
        // backgroundColor: 'gray',         
        marginBottom: 10,
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
  
export default connect(mapStateToProps, mapDispatchToProps)(HistoryOfTransactionCard);

