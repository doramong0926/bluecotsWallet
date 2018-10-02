import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Divider } from 'react-native-material-design';

class StatusOfTranscation extends Component{
    constructor(props, context) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {   
    }

    componentWillReceiveProps(nextProps) {
    }
    
    render(){
        return (
            <View style={styles.container}>
                <View style={styles.statusContainer}>
                    <View style={styles.statusIconContainer}>
                        <View style={styles.statusIcon1}>
                        </View>
                        <Text style={styles.statusGuideText}> Success</Text>
                    </View>
                    <View style={styles.statusIconContainer}>
                        <View style={styles.statusIcon2}>
                        </View>
                        <Text style={styles.statusGuideText}> Pending</Text>
                    </View>
                    <View style={styles.statusIconContainer}>
                        <View style={styles.statusIcon3}>
                        </View>
                        <Text style={styles.statusGuideText}> Failure</Text>
                    </View>
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
  
export default connect(mapStateToProps, mapDispatchToProps)(StatusOfTranscation);
 

const styles = StyleSheet.create({
    container: {        
        flex: 1,
    },
    statusContainer: {
        marginHorizontal: 20, 
        marginVertical: 5,
        flexDirection:'row', 
        alignItems: 'center',
        justifyContent: 'center',
    }, 
    statusIconContainer: {
        flexDirection: 'row',
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusIcon1: {
        width:10, 
        height:10, 
        backgroundColor: '#92B558', 
        borderRadius:100
    },
    statusIcon2: {
        width:10, 
        height:10, 
        backgroundColor: '#D5AE41', 
        borderRadius:100
    },
    statusIcon3: {
        width:10, 
        height:10, 
        backgroundColor: '#BD3D3A', 
        borderRadius:100
    },
    statusGuideText: {
        fontSize: 12,
    }
})