
import React, { Component } from 'react';
import { StyleSheet, Text, View, Clipboard, CameraRoll , ToastAndroid } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import { Button } from 'react-native-elements'
import { connect } from 'react-redux';
import WalletAddressWithNickNameForReceive from './../../components/walletAddressWithNickNameForReceive';
import SelectAnotherWalletIcon from './../../components/selectAnotherWalletIcon';
import ActionCreator from './../../actions';
import PropTypes from 'prop-types';
//import RNFS from "react-native-fs"

class receiveScreen extends Component{  
    static navigationOptions = {
        tabBarLabel: 'receive',
        tabBarIcon: ({ tintColor }) => (
            <Ionicons name="md-filing" size={30} color={tintColor} />
        )
    };  

    static propTypes = {
        walletForReceive: PropTypes.shape({
            walletAddress: PropTypes.string.isRequired,
        }).isRequired,        
        defaultWallet: PropTypes.shape({
            walletAddress: PropTypes.string.isRequired,
        }).isRequired,
    };

    componentWillMount() {
        this.props.setWalletForReceive(this.props.defaultWallet);
    }

    render(){
        return (
            <View style={style.container}>
                <View style={{flex: 4, alignItems: 'center', justifyContent: 'center'}}>
                    {this.renderQrCode()}
                </View>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{flex:9, alignItems: 'center', justifyContent: 'center'}}>
                        <WalletAddressWithNickNameForReceive />
                    </View>
                    <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                        <SelectAnotherWalletIcon ScreenType='receive' />
                    </View>                    
                </View>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Button
                        onPress={this.handlePressCopy}
                        title="Copy address"
                    />
                    <Button
                        disabled={false}
                        onPress={this.handlePressToSave}
                        title="Save QR-code"
                    />
                </View>
                <View style={{flex: 5, alignItems: 'center', justifyContent: 'center'}}>
                    <Text> transaction history</Text>
                </View>
            </View>  
        );        
    }

    renderQrCode = () => {
        if (this.props.walletForReceive.walletAddress)
        {
            return (
                <QRCode 
                    size = {200} 
                    value={this.props.walletForReceive.walletAddress}
                    getRef={(c) => (this.svg = c)}
                />
            )
        } else {
            return (
                <Text> need to add wallet </Text>
            )
        }
        
    }

    handlePressCopy = async () => {
        this.props.setCopyAddressToClipboard('');
        Clipboard.setString(this.props.walletForReceive.walletAddress);
        const address = await Clipboard.getString();
        this.props.setCopyAddressToClipboard(address);
        this.props.showModalCopyAddressToClipboard();
    };

    handlePressToSave = () => {
        /*
        this.svg.toDataURL((data) => {
            filePath = RNFS.CachesDirectoryPath + "/" + this.props.walletForReceive.walletAddress + ".png";
            RNFS.writeFile(filePath, data, 'base64')
              .then((success) => {
                  return CameraRoll.saveToCameraRoll(filePath, 'photo')
              })
              .then(() => {
                  this.setState({ busy: false, imageSaved: true  })
                  ToastAndroid.show('Saved to gallery !!', ToastAndroid.SHORT)
              })
        })
        */ 
    };
}

function mapStateToProps(state) {
    return {
        walletForReceive: state.walletTemp.walletForReceive,
        defaultWallet: state.wallet.defaultWallet,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        showModalCopyAddressToClipboard: () => {
            dispatch(ActionCreator.showModalCopyAddressToClipboard());
        },
        setCopyAddressToClipboard: (address) => {
            dispatch(ActionCreator.setCopyAddressToClipboard(address));
        },
        setWalletForReceive: (wallet) => {
            dispatch(ActionCreator.setWalletForReceive(wallet));
        },
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(receiveScreen);
 
const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})