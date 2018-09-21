
import React, { Component } from 'react';
import { StyleSheet, Text, View, Clipboard, CameraRoll , ToastAndroid } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import { Button } from 'react-native-elements'
import { connect } from 'react-redux';
import WalletAddressWithNickNameForReceive from './../../components/walletAddressWithNickNameForReceive';
import ActionCreator from './../../actions';
import PropTypes from 'prop-types';
//import RNFS from "react-native-fs"

class receiveScreen extends Component{  
    static navigationOptions = {
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
            <View style={styles.container}>           
                <View>
                    <WalletAddressWithNickNameForReceive />
                </View>
                <View style={styles.container2}>
                    <View style={styles.qrCode}>
                        {this.renderQrCode()}
                    </View>
                    <View style={styles.buttonContainer}>                    
                        <Button
                            onPress={this.handlePressCopy}
                            icon={{name: 'copy', type: 'font-awesome'}}
                            title="Copy"
                            buttonStyle={{
                                backgroundColor: "#67AFCB",
                                borderColor: "transparent", 
                                borderRadius: 5
                            }}
                            containerViewStyle={{
                                // alignSelf: 'stretch',
                                // margin: 1,
                                width: 100,
                            }}
                        />
                        <Button
                            onPress={this.handlePressToSave}
                            icon={{name: 'save', type: 'font-awesome'}}
                            title="Save"
                            buttonStyle={{
                                backgroundColor: "#67AFCB",
                                borderColor: "transparent", 
                                borderRadius: 5
                            }}
                            containerViewStyle={{
                                // alignSelf: 'stretch',
                                // margin: 1,
                                width: 100,
                            }}
                        />
                    </View>
                </View>
            </View>  
        );        
    }

    renderQrCode = () => {
        if (this.props.walletForReceive.walletAddress)
        {
            return (
                <QRCode 
                    size = {220} 
                    value={this.props.walletForReceive.walletAddress}
                    getRef={(c) => (this.svg = c)}
                />
            )
        } else {
            return (
                <Text> need to add wallet first</Text>
            )
        }
        
    }

    handlePressCopy = async () => {
        Clipboard.setString(this.props.walletForReceive.walletAddress);
        const address = await Clipboard.getString();
        const infomation = {
            title: 'INFOMATION', 
            message1: 'Success to copy address to clipboard.', 
            message2: 'Please check the address one more time.',
            message3: address,
        };
        this.props.setModalInfomation(infomation);
        this.props.showModalInfomation();
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
        setWalletForReceive: (wallet) => {
            dispatch(ActionCreator.setWalletForReceive(wallet));
        },
        showModalInfomation: () => {
            dispatch(ActionCreator.showModalInfomation());
        },
        setModalInfomation: (infomation) => {
            dispatch(ActionCreator.setModalInfomation(infomation));
        },
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(receiveScreen);
 

const styles = StyleSheet.create({
    container: {        
        flex: 1,
        backgroundColor: '#E4F1F6',   
    },
    container2: {                
        alignItems: 'center',     
    },
    qrCode: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        marginVertical: 10,
        marginHorizontal: 15,
        borderRadius: 10,
    },
    buttonContainer: {
        flexDirection: 'row', 
        justifyContent:'center', 
        alignItems: 'center',
        marginVertical: 10,
    }
})