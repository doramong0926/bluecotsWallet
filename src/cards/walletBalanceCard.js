import React, { Component } from 'react';
import { Text, View, StyleSheet, Clipboard, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import ActionCreator from '../actions';
import WalletUtils from '../utils/wallet';

import ETH_ICON_IMAGE from './images/ethereum_40x40.png';
import BLC_ICON_IMAGE from './images/bluecots_COIN_40x40.png';
import TokenSymbolWithName from './../components/tokenSymbolWithName';
import MainWalletMenu from './../components/mainWalletMenu';
import PropTypes from 'prop-types';
import { 
	DEFAULT_TOKEN_SYMBOL,
	DEFAULT_TOKEN_CONTRACT_ADDRESS,
    DEFAULT_TOKEN_DECIMALS,
    defaultWallet,
 } from '../config/constants';
 import { Card, Divider } from '@doramong0926/react-native-material-design';
 import { Ionicons, FontAwesome } from '@expo/vector-icons';

class WalletBalanceCard extends Component {
    static propTypes = {
        defaultWallet: PropTypes.shape({
            walletAddress: PropTypes.string.isRequired,
        }).isRequired,
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            defaultWallet: defaultWallet,
            blcBalance: 0,
            ethBalance: 0,
        }
    }

    componentDidMount(){
        this.setState({defaultWallet: this.props.defaultWallet})
        this.updateWalletBalance();
        setInterval(() => {
            this.updateWalletBalance();
        }, 1000)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.defaultWallet !== nextProps.defaultWallet || 
            this.props.defaultWallet.nickName !== nextProps.defaultWallet.nickName) {
            this.setState({
                defaultWallet: nextProps.defaultWallet,
            })
            setTimeout(() => {
                this.updateWalletBalance();    
            }, );
        }
    }

    render() {
        return (
            <View style={styles.container}>         
                <Card style={styles.containerCard}>
                    <Card.Body>
                        <View style={styles.containerTitle}>
                            <Text style={styles.textTitle}>Balance ({this.state.defaultWallet.nickName})</Text>
                            <TouchableOpacity onPress={() => this.handlePressCopy()} value="0.5">
                                <View style={{alignItems:"center", justifyContent:"center", flexDirection:"row"}}>
                                    <Text style={styles.descriptionText}>{this.state.defaultWallet.walletAddress}</Text> 
                                    <View style={{alignItems:"center", marginLeft: 3}}>
                                        <Ionicons name="ios-copy-outline" size={15}/>
                                    </View>              
                                </View>
                            </TouchableOpacity>
                        </View>                        
                        <View style={styles.containerBalanceTop}>
                            <View style={{flex: 2, flexDirection: 'row'}}>
                                <TokenSymbolWithName icon={BLC_ICON_IMAGE} tokenString={'BLC'} tokenName={'bluecots'} />
                            </View>
                            <View style={{flex: 5, flexDirection: 'row', justifyContent: 'flex-end'}}>
                                <Text style={styles.balanceText}>
                                    {(this.state.blcBalance) ? this.state.blcBalance.toFixed(3): '0.000'}
                                </Text>
                                <Text style={{fontSize :10, textAlign: 'center' }}> BLC</Text>
                            </View>
                        </View>
                        <Divider />
                        <View style={styles.containerBalanceBottom}>
                            <View style={{flex: 2, flexDirection: 'row'}}>
                                <TokenSymbolWithName icon={ETH_ICON_IMAGE} tokenString={'ETH'} tokenName={'ethereum'} />
                            </View>
                            <View style={{flex: 5, flexDirection: 'row', justifyContent: 'flex-end'}}>
                                <Text style={styles.balanceText}>
                                    {(this.state.ethBalance) ? this.state.ethBalance.toFixed(3): '0.000'}
                                </Text>
                                <Text style={{fontSize :10, textAlign: 'center' }}> ETH</Text>
                            </View>
                        </View>
                        <Divider />                            
                        <View style={styles.containerMenuIcon}>
                            <MainWalletMenu navigation={this.props.navigation}/>
                        </View>
                    </Card.Body>
                </Card>         
            </View>
        );
    }    

    handlePressCopy = async () => {
        Clipboard.setString(this.state.defaultWallet.walletAddress);
        const address = await Clipboard.getString();
        const infomation = {
            title: 'INFOMATION', 
            message1: 'Success to copy address to clipboard.', 
            message2: 'Please check the address one more time.',
            message3: address,
        };
        this.props.setModalInfomation(infomation);
        setTimeout(() => {
            this.props.showModalInfomation();    
        }, 300);
    };
    
    updateWalletBalance = async () => {
        if (this.state.defaultWallet.walletAddress) {
                const currentETHBalance = await WalletUtils.getBalance({
                walletAddress: this.state.defaultWallet.walletAddress,
                contractAddress:'', 
                symbol:'ETH', 
                decimals:0
            });
                const currentBLCBalance = await WalletUtils.getBalance({
                walletAddress: this.state.defaultWallet.walletAddress,
                contractAddress: DEFAULT_TOKEN_CONTRACT_ADDRESS,
                symbol: DEFAULT_TOKEN_SYMBOL, 
                decimals: DEFAULT_TOKEN_DECIMALS, 
            });
            if (currentETHBalance !== undefined) {
                if (this.state.ethBalance !== currentETHBalance)
                {
                    this.setState({ethBalance: currentETHBalance});
                    this.props.setEthBalance(currentETHBalance); 
                }
            }
            if (currentBLCBalance !== undefined) {
                if (this.state.blcBalance !== currentBLCBalance)
                {
                    this.setState({blcBalance: currentBLCBalance});
                    this.props.setBlcBalance(currentBLCBalance);
                }
            }
        }
    }
}

function mapStateToProps(state) {
    return {
        defaultWallet: state.wallet.defaultWallet,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setEthBalance: (balance) => {
            dispatch(ActionCreator.setEthBalance(balance));
        },
        setBlcBalance: (balance) => {
            dispatch(ActionCreator.setBlcBalance(balance));
        },
        showModalInfomation: () => {
            dispatch(ActionCreator.showModalInfomation());
        },
        setModalInfomation: (infomation) => {
            dispatch(ActionCreator.setModalInfomation(infomation));
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
    containerNotice: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    containerTransaction: {      
        // marginBottom: 20,
    },
    containerTitle: {
        // flex: 1,
        // backgroundColor: 'gray',         
        marginBottom: 20,
    },
    containerBalanceTop: {
        marginBottom: 15,
        flexDirection: 'row',
    },
    containerBalanceBottom: {
        marginTop: 15,
        marginBottom: 15,
        flexDirection: 'row',
    },
    containerMenuIcon: {
        marginTop: 15,
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
    balanceText: {
        fontSize : 28, 
        fontWeight: 'bold', 
        textAlign:'center',
        color: '#BD3D3A',
    },
    descriptionText: {
        fontSize: 12,        
        color: '#B4B7BA',
        textAlign: 'center',
    },
})
  
export default connect(mapStateToProps, mapDispatchToProps)(WalletBalanceCard);

