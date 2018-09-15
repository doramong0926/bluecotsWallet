
import React, { Component } from 'react';
import { TouchableHighlight, Text, View, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { StackNavigator, StackActions, NavigationActions } from 'react-navigation';
import PINCode from '@haskkor/react-native-pincode'
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
                            finishProcess={this.handelFinishProcess}
                            onFail={this.handelOnfail}
                            // handleResultEnterPin={this.handleResultEnterPin}
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

    handelFinishProcess = () => {
        console.log("handelFinishProcess called")
        
        setTimeout(() => {
            this.props.navigation.dispatch(resetAction);
            this.props.navigation.navigate('Main');
        }, )
    }

    handelOnfail = (pinAttempts) => {
        console.log("handelOnfail called : " + pinAttempts)
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