
import React, { Component } from 'react';
import { TouchableHighlight, Text, View, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { StackNavigator, StackActions, NavigationActions } from 'react-navigation';
import PINCode, { PinResultStatus, finishProcess } from '@haskkor/react-native-pincode'
import { connect } from 'react-redux';
import ActionCreator from './../../actions';



// export declare enum PinResultStatus {
//     initial = "initial",
//     success = "success",
//     failure = "failure",
//     locked = "locked",
// }

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Main' })],
});

class VerificationPincodeScreen extends Component{
    static navigationOptions = {
        header: null,
    };

    state = {
        pinStatus: "initial",
    }

    componentDidMount() {        
    }

    componentDidUpdate() {
    }
    
    render() {        
        return (
            // <PINCode status={'choose'} storePin={this.props.setPincode}/>
            // <PINCode status={'enter'} storePin={this.props.setPincode} storedPin={this.props.pincode}/>
            <View style={{flex:1}}>
                {
                    (this.props.pincode !== '' && this.props.pincode !== undefined) ? 
                    (
                        <PINCode 
                            status={'enter'} 
                            storePin={this.props.setPincode} 
                            storedPin={this.props.pincode} 
                            touchIDDisabled={true}
                            handleResultEnterPin={this.handleResultEnterPin}
                            pinStatus = {this.state.pinStatus}
                        />
                    ) :
                    (
                        <PINCode 
                            status={'choose'} 
                            storePin={this.props.setPincode}
                            touchIDDisabled={true}
                        />
                    )   
                }           
            </View>
        );
    }

    handleResultEnterPin = (inputPincode) => {
        console.log("handleResultEnterPin called : " + inputPincode)
        if (inputPincode == this.props.pincode) {
            this.setState({pinStatus: PinResultStatus.success});
            this.props.navigation.dispatch(resetAction);
            const infomation = {
                title: 'INFOMATION', 
                message1: 'Correct pincode.', 
                message1: 'Welcome back.', 
            };
            this.props.setModalInfomation(infomation);
            this.props.showModalInfomation();
            setTimeout(() => {
              this.props.hideModalInfomation();
              this.props.navigation.navigate('Main');
            }, 1000)
            
        } else {
            const infomation = {
                title: 'INFOMATION', 
                message1: 'Incorrect pincode.', 
                message1: 'Please try again.', 
            };
            this.props.setModalInfomation(infomation);
            this.props.showModalInfomation();
            setTimeout(() => {
                this.props.hideModalInfomation();
              }, 1000)
        }
    }

    finishProcess = () => {
        console.log("finishProcess called")
    }

    getPincodeStatus = () => {
        console.log("getPincodeStatus called")
    }


}

function mapStateToProps(state) {
    return {
        pincode: state.config.pincode,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setPincode: (pincode) => {
            dispatch(ActionCreator.setPincode(pincode));
        },
        showModalInfomation: () => {
            dispatch(ActionCreator.showModalInfomation());
        },
        hideModalInfomation: () => {
            dispatch(ActionCreator.hideModalInfomation());
        },
        setModalInfomation: (infomation) => {
            dispatch(ActionCreator.setModalInfomation(infomation));
        },
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(VerificationPincodeScreen);