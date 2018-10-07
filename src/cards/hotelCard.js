import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Dimensions, Linking } from 'react-native';
import { connect } from 'react-redux';
import { Card } from '@doramong0926/react-native-material-design';
import PropTypes from 'prop-types';
import ActionCreator from '../actions';
import StarRating from 'react-native-star-rating';
import HOTEL_MAIN_DEFULT from './images/hotel1_main.jpg'

import { DEFAULT_HOTEL_INFO, DEFAULT_CALENDAR_MARKED_DATES } from '../config/hotelList';

class HotelCard extends Component {
    static propTypes = {
    };

    constructor(props, context) {
        super(props);
        this.state = {
            hotelInfo: DEFAULT_HOTEL_INFO,
        };
    }

    componentDidMount() {
        this.setState({
            hotelInfo: this.props.hotelInfo
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.hotelInfo !== nextProps.hotelInfo) {
            this.setState({hotelInfo: nextProps.hotelInfo,});
        }
    }

    render() {
        return (
            <View style={styles.container}>  
                <TouchableOpacity onPress={() => this.handelPressCard()} value={'0.5'}>
                    <Card style={styles.containerCard}>
                        <Card.Media
                            image={ this.renderHotelMainImage()}
                            // overlay
                        >   
                            <View style={styles.containerStarRaring}>
                                <View style={{alignItems:'center', justifyContent:'center'}}>
                                    <Text style={{fontSize: 12, color: 'white'}}> Rating : {this.state.hotelInfo.starCount.toFixed(1)}/5.0</Text>
                                    <StarRating
                                        disabled={true}
                                        maxStars={5}
                                        rating={this.state.hotelInfo.starCount}
                                        selectedStar={(rating) => this.onStarRatingPress(rating)}
                                        fullStarColor={'#BD3D3A'}
                                        starSize={20}
                                    />
                                </View>
                            </View>
                        </Card.Media>
                        <Card.Body>
                            <View style={styles.containerBody}>                            
                                <View style={styles.containerHotelInfo}>
                                    {this.renderHotelName()}
                                    {this.renderHotelDescription()}
                                    {this.renderHotelAddress()}
                                    {this.renderHotelHomepage()}
                                </View>
                            </View>
                        </Card.Body>
                    </Card>
                </TouchableOpacity>
            </View>
        );
    }

    onStarRatingPress(rating) {
    }

    handlePressAddress = () => {

    }

    handelPressCard = () => {
        this.props.setCalendarMarkedDates(DEFAULT_CALENDAR_MARKED_DATES);
        this.props.navigation.navigate(
            'HotelDetailStack', 
            {hotelInfo: this.state.hotelInfo},
        );
    }

    handlePressHomepage = (address) => {
        Linking.canOpenURL(address).then(supported => {
            if (supported) {
                Linking.openURL(address);
            } 
        });
    }

    renderHotelName = () => {
        if (this.state.hotelInfo.name !== null && this.state.hotelInfo.name !== undefined && this.state.hotelInfo.name !== "" ) {
            return <Text style={styles.textTitle}>{this.state.hotelInfo.name}</Text>
        } else {
            return <Text style={styles.textTitle}>Hotel</Text>
        }
    }

    renderHotelDescription = () => {
        if (this.state.hotelInfo.description !== null && this.state.hotelInfo.description !== undefined && this.state.hotelInfo.description !== "" ) {
            return (
                <Text style={styles.descriptionText}>
                    {this.state.hotelInfo.description}
                </Text>
            )
        } else {
            return <View></View>
        }
    }

    renderHotelAddress = () => {
        if (this.state.hotelInfo.address !== null && this.state.hotelInfo.address !== undefined && this.state.hotelInfo.address !== "" ) {
            return (
                <TouchableOpacity onPress={() => this.handlePressAddress()} value="0.5">
                    <View>
                        <Text style={styles.descriptionText}>
                            {this.state.hotelInfo.address}
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        } else {
            return <Text style={styles.descriptionText}></Text>
        }
    }

    renderHotelHomepage = () => {
        if (this.state.hotelInfo.homepage !== null && this.state.hotelInfo.homepage !== undefined && this.state.hotelInfo.homepage !== "" ) {
            return (
                <TouchableOpacity onPress={() => this.handlePressHomepage(this.state.hotelInfo.homepage)} value="0.5">
                    <View>
                        <Text style={styles.descriptionText}>
                            {this.state.hotelInfo.homepage}
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        } else {
            return <Text style={styles.descriptionText}></Text>
        }
    }

    renderHotelMainImage = () => {
        if (this.state.hotelInfo.mainImage !== null && this.state.hotelInfo.mainImage !== undefined && this.state.hotelInfo.mainImage !== "" ) {
            return (
                <Image 
                    source={this.state.hotelInfo.mainImage} 
                    style={{width: Dimensions.get('window').width, height: 150}} 
                    resizeMode={'stretch'} 
                />
            )
        } else {
            return (
                <Image 
                    source={HOTEL_MAIN_DEFULT} 
                    style={{width: Dimensions.get('window').width, height: 150}} 
                    resizeMode={'stretch'}
                />
            )
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
    containerCard: {
        marginTop: 0,  
        marginBottom: 4,
        marginHorizontal: 4,
        paddingTop:0,
    },
    containerBody: {
    },
    containerHotelInfo: {   
        // paddingVertical: 10,
    },
    containerStarRaring: {
        alignItems:'flex-end', 
        justifyContent: 'flex-end', 
        paddingRight: 5, 
        paddingBottom: 5
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
  
export default connect(mapStateToProps, mapDispatchToProps)(HotelCard);

