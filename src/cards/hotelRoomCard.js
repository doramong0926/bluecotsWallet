import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Dimensions, Linking } from 'react-native';
import { Button } from 'react-native-elements'
import { connect } from 'react-redux';
import { Card } from 'react-native-material-design';
import ImageSlider from 'react-native-image-slider';
import PropTypes from 'prop-types';
import ActionCreator from '../actions';
import { Divider } from 'react-native-material-design';

import { DEFAULT_TOKEN_EXCHANGE_RATE } from './../config/constants'
import { DEFAULT_CALENDAR_MARKED_DATES } from '../config/hotelList';


class HotelRoomCard extends Component {
    static propTypes = {
        hotelInfo: PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
    };

    constructor(props, context) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        return (
            <View style={styles.container}>  
                <View style={styles.containerImageSlider}>
                    <ImageSlider 
                        images={this.props.roomInfo.roomImage}
                        // width={Dimensions.get('window').width-8}
                        height={180}
                        // autoPlayWithInterval={5000}
                    />
                </View>
                <Card style={styles.containerCard}>
                    {/* <Card.Media
                        image={ this.renderHotelMainImage()}
                        // overlay
                    >   
                    </Card.Media> */}
                    <Card.Body>
                        <View style={styles.containerBody}>      
                            <View style={{flexDirection:'row', alignItems:'center', justifyContent: 'space-between', marginBottom: 10,}}>
                                <View style={styles.containerRoomInfo}>
                                    {this.renderRoomName()}
                                    {/* {this.renderRoomDescription()} */}
                                    {this.renderAvalidRoomCount()}
                                </View>
                                <View style={styles.containerRoomPrice}>
                                    {this.renderRoomPrice()}
                                </View>
                            </View>
                        </View>                        
                        <Divider />
                        <View style={styles.buttonContainer}>
                            <Button
                                onPress={this.handelPressReserve}
                                title="Reserve"
                                buttonStyle={{
                                    backgroundColor: "#BD3D3A",
                                    borderColor: "transparent", 
                                    borderRadius: 5,
                                    width: Dimensions.get('window').width-40
                                }}
                                containerViewStyle={{
                                    // alignSelf: 'flex-end',
                                    // margin: 20,
                                }}
                            />    
                        </View>
                    </Card.Body>
                </Card>
            </View>
        );
    }

    handelPressReserve = () => {
        this.props.setCalendarMarkedDates(DEFAULT_CALENDAR_MARKED_DATES);
        this.props.navigation.navigate(
            'RoomDetailStack', 
            {
                hotelInfo: this.props.hotelInfo,
                roomInfo: this.props.roomInfo
            },
        );
    }

    renderRoomName = () => {
        if (this.props.roomInfo.name !== null && this.props.roomInfo.name !== undefined && this.props.roomInfo.name !== "" ) {
            return <Text style={styles.textTitle}>{this.props.roomInfo.name}</Text>
        } else {
            return <Text style={styles.textTitle}>Room type</Text>
        }
    }

    renderRoomDescription = () => {
        if (this.props.roomInfo.description !== null && this.props.roomInfo.description !== undefined && this.props.roomInfo.description !== "" ) {
            return (
                <Text style={styles.descriptionText}>
                    {this.props.roomInfo.description}
                </Text>
            )
        } else {
            return <View></View>
        }
    }

    renderAvalidRoomCount = () => {
        if (this.props.roomInfo.avaliableRoomCount !== null && this.props.roomInfo.avaliableRoomCount !== undefined && this.props.roomInfo.avaliableRoomCount !== "" ) {
            return (
                <Text style={styles.descriptionText}>
                    Reamained : {this.props.roomInfo.avaliableRoomCount}
                </Text>
            )
        } else {
            return <View></View>
        }
    }

    renderRoomPrice = () => {
        if (this.props.roomInfo.price.adult !== null && this.props.roomInfo.price.adult !== undefined && this.props.roomInfo.price.adult !== "" ) {
            return (
                <View>
                    <Text style={styles.tokenPriceText}>
                        {(this.props.roomInfo.price.adult / DEFAULT_TOKEN_EXCHANGE_RATE).toFixed(2)} BLC
                    </Text>
                    <Text style={styles.tokenPriceDallorText}>
                        ({this.props.roomInfo.price.adult.toFixed(2)} $)
                    </Text>
                </View>
            )
        } else {
            return <View></View>
        }
    }
}

function mapStateToProps(state) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setCalendarMarkedDates: (calendarMarkedDates) => {
            dispatch(ActionCreator.setCalendarMarkedDates(calendarMarkedDates));
        },
    };
}

const styles = StyleSheet.create({
    container: {
    },
    containerImageSlider: {
        marginHorizontal: 4,
        height: 180,
    },
    containerCard: {
        marginTop: 0,  
        marginBottom: 4,
        marginHorizontal: 4,
        paddingTop:0,
    },
    containerBody: {

    },
    containerRoomInfo: {   
        alignItems: 'center',        
    },
    containerRoomPrice: {   
        alignItems: 'center',        
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:20,
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
    tokenPriceText: {
        fontSize: 18,   
        fontWeight:'bold',     
        color: '#BD3D3A',
        textAlign: 'center',
    },
    tokenPriceDallorText: {
        fontSize: 12,   
        color: '#B4B7BA',
        textAlign: 'right',
    },
})
  
export default connect(mapStateToProps, mapDispatchToProps)(HotelRoomCard);

