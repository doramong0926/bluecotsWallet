import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import HistoryOfTransaction from '../components/historyOfTransaction'
import StatusOfTranscation from '../components/statusOfTranscation'
import { Card } from '@doramong0926/react-native-material-design';
import PropTypes from 'prop-types';
import ActionCreator from './../actions';

import { 
    defaultWallet,
 } from '../config/constants';

class HistoryCard extends Component {
    static propTypes = {
        defaultWallet: PropTypes.shape({
            walletAddress: PropTypes.string.isRequired,
        }).isRequired,
    };

    constructor(props, context) {
        super(props);
        this.state = {
            tokenName: 'BLC',
            defaultWallet: defaultWallet,
        }
    }

    componentDidMount() {
        this.setState({defaultWallet: this.props.defaultWallet,});
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.defaultWallet !== nextProps.defaultWallet) {
            this.setState({defaultWallet: nextProps.defaultWallet,});
        }
    }

    render() {
        return (
            <View style={styles.container}>  
                <View>
                    <Card style={styles.containerCard}>
                        <Card.Body>
                            <View style={styles.containerTransaction}>
                                <View style={styles.containerTitle}>
                                    <Text style={styles.textTitle}>History of transaction</Text>
                                    <Text style={styles.descriptionText}>
                                        { (this.props.offset !== undefined) ? 
                                            (`It is shown only ${this.props.offset} recent transaction.`) : 
                                            (this.state.defaultWallet.walletAddress)
                                        }
                                    </Text>
                                </View>
                                <View>
                                    <View style={styles.containerTokenSelect}>
                                        <View style={styles.containerButton}>
                                            <TouchableOpacity onPress={() => this.handlePress("BLC")} value="0.5">
                                                <View style={(this.state.tokenName === 'BLC') ? (styles.containerSelectedLeftButton) : (styles.containerUnselectedLeftButton)}>
                                                    <Text> BLC </Text>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.handlePress("ETH")} value="0.5">
                                                <View style={(this.state.tokenName === 'BLC') ? (styles.containerUnselectedRightButton) : (styles.containerSelectedRightButton)}>
                                                    <Text> ETH </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <StatusOfTranscation />
                                    <HistoryOfTransaction 
                                        tokenName={this.state.tokenName} 
                                        offset={(this.props.offset !== undefined) ? (this.props.offset) : (null)}
                                    />
                                </View>
                            </View>
                        </Card.Body>
                    </Card>
                </View>  
            </View>
        );
    }    

    handlePress = (tokenName) => {
        if (tokenName !== this.state.tokenName) {
            this.props.setIsLoadingTxData(true);
        }
        this.setState({tokenName:tokenName});
    }
}

function mapStateToProps(state) {
    return {
        defaultWallet: state.wallet.defaultWallet,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setIsLoadingTxData: (value) => {
            dispatch(ActionCreator.setIsLoadingTxData(value));
        }, 
    };
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start"
        // alignItems: 'center',
        // height: 300,
    },
    containerCard: {
        marginTop: 0,  
        marginBottom: 4,
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
    containerTokenSelect : {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
    },
    containerButton : {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#92B558',
        borderWidth: 1,
        borderRadius:5,
    },
    containerUnselectedLeftButton : {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
    },
    containerSelectedLeftButton : {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#92B558',
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
    },
    containerUnselectedRightButton : {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
    },
    containerSelectedRightButton : {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#92B558',
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
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
    tokenText: {
        fontSize : 28, 
        fontWeight: 'bold', 
        textAlign:'center',
        color: '#BD3D3A',
    },
})
  
export default connect(mapStateToProps, mapDispatchToProps)(HistoryCard);

