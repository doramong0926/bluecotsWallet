import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Dimensions, Linking } from 'react-native';
import { SearchBar } from 'react-native-elements'
import { connect } from 'react-redux';
import { Card } from 'react-native-material-design';
import PropTypes from 'prop-types';
import ActionCreator from '../actions';

class HotelSearchBarCard extends Component {
    static propTypes = {
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
        }
    }

    componentDidMount(){
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        return (
            <View style={styles.container}>  
                <Card style={styles.containerCard}>
                    <Card.Body>                        
                        <View style={styles.containerTitle}>
                            <Text style={styles.textTitle}>Search hotel</Text>
                            <Text style={styles.descriptionText}>Reserve with bluecots.</Text>
                        </View>   
                        <View style={styles.containerSearchBar}>
                            <SearchBar
                                lightTheme
                                // round
                                inputStyle={{backgroundColor:'#F7F7F7'}} 
                                containerStyle={{backgroundColor: 'white', borderTopWidth:0, borderBottomWidth:0}}
                                searchIcon={{ size: 24 }}
                                clearIcon={{ size: 24}}
                                onChangeText={this.props.handelOnChnageText}
                                onClearText={this.props.handleonClearText}
                                placeholder='Search hotel' 
                                value={this.props.queryString}
                            />
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
    },
    containerCard: {
        marginTop: 0,  
        marginBottom: 0,
        marginHorizontal: 4,
        paddingTop:0,
        backgroundColor: "white",
    },
    containerTitle: {   
        marginBottom: 0,
    },
    containerSearchBar: {

    },
    containerButton : {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#92B558',
        borderWidth: 1,
        borderRadius:5,
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
  
export default connect(mapStateToProps, mapDispatchToProps)(HotelSearchBarCard);

