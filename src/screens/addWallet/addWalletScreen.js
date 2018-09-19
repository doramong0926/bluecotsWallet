
import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import ActionCreator from '../../actions';
import { Ionicons, FontAwesome } from '@expo/vector-icons';


class AddWallet extends Component{
    constructor(props) {
        super(props)
    }

    static navigationOptions = {
        header: null,        
    };
      
    componentDidMount() {
        this.addWallet();
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={() => this.addWallet()} underlayColor="gray">
                    <View style={styles.walletIconContainer}>
                        <Ionicons name="ios-wallet" size={200} />                             
                        <Text style={styles.text}>Click to add wallet</Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }

    addWallet = () => {
        this.props.setModalAddWalletFinishProcess(this.finishAddWallet.bind(this));
        this.props.showModalAddWallet();
    }

    finishAddWallet = () => {
        this.props.navigation.dispatch(resetActionToMain);
        this.props.navigation.navigate('Main');
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,    
      alignItems:'center', 
      justifyContent: 'space-around'
    },
    text: {
      textAlign: 'center'
    },
    walletIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    
})

const resetActionToMain = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Main' })],
});

function mapStateToProps(state) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
        showModalAddWallet: () => {
            dispatch(ActionCreator.showModalAddWallet());
        },
        setModalAddWalletFinishProcess: (finishProcess) => {
            dispatch(ActionCreator.setModalAddWalletFinishProcess(finishProcess));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddWallet);