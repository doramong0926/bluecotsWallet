import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Dimensions, Linking } from 'react-native';
import { connect } from 'react-redux';
import { Card } from 'react-native-material-design';
import PropTypes from 'prop-types';
import ActionCreator from '../actions';
import StarRating from 'react-native-star-rating';
import HOTEL_MAIN_DEFULT from './images/hotel1_main.jpg'

class HotelCard extends Component {
    static propTypes = {
    };

    constructor(props) {
        super(props);
        this.state = {
            starCount: 0
        };
    }

    onStarRatingPress(rating) {
        // this.setState({
        //     starCount: rating
        // });
    }

    render() {
        return (
            <View style={styles.container}>  
                <Card style={styles.containerCard}>
                    <Card.Media
                        image={ this.renderHotelMainImage()}
                        // overlay
                    >   
                        <View style={styles.containerStarRaring}>
                            <View style={{alignItems:'center', justifyContent:'center'}}>
                                <Text style={{fontSize: 12, color: 'white'}}> Rating : {this.getStarCount().toFixed(1)}/5.0</Text>
                                <StarRating
                                    disabled={true}
                                    maxStars={5}
                                    rating={this.getStarCount()}
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
            </View>
        );
    }

    handlePressAddress = () => {

    }

    handlePressHomepage = (address) => {
        Linking.canOpenURL(address).then(supported => {
            if (supported) {
                Linking.openURL(address);
            } 
        });
    }

    getStarCount = () => {
        if (this.props.hotelInfo.starCount !== null && this.props.hotelInfo.starCount !== undefined && this.props.hotelInfo.starCount !== "" ) {
            return this.props.hotelInfo.starCount;
        } else {
            return this.state.starCount;
        }
    }

    renderHotelName = () => {
        if (this.props.hotelInfo.name !== null && this.props.hotelInfo.name !== undefined && this.props.hotelInfo.name !== "" ) {
            return <Text style={styles.textTitle}>{this.props.hotelInfo.name}</Text>
        } else {
            return <Text style={styles.textTitle}>need to add hotel name</Text>
        }
    }

    renderHotelDescription = () => {
        if (this.props.hotelInfo.description !== null && this.props.hotelInfo.description !== undefined && this.props.hotelInfo.description !== "" ) {
            return (
                <Text style={styles.descriptionText}>
                    {this.props.hotelInfo.description}
                </Text>
            )
        } else {
            return <View></View>
        }
    }

    renderHotelAddress = () => {
        if (this.props.hotelInfo.address !== null && this.props.hotelInfo.address !== undefined && this.props.hotelInfo.address !== "" ) {
            return (
                <TouchableOpacity onPress={() => this.handlePressAddress()} value="0.5">
                    <View>
                        <Text style={styles.descriptionText}>
                            {this.props.hotelInfo.address}
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        } else {
            return <Text style={styles.descriptionText}>need to add hotel description</Text>
        }
    }

    renderHotelHomepage = () => {
        if (this.props.hotelInfo.homepage !== null && this.props.hotelInfo.homepage !== undefined && this.props.hotelInfo.homepage !== "" ) {
            return (
                <TouchableOpacity onPress={() => this.handlePressHomepage(this.props.hotelInfo.homepage)} value="0.5">
                    <View>
                        <Text style={styles.descriptionText}>
                            {this.props.hotelInfo.homepage}
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        } else {
            return <Text style={styles.descriptionText}>need to add hotel description</Text>
        }
    }

    renderHotelMainImage = () => {
        if (this.props.hotelInfo.mainImage !== null && this.props.hotelInfo.mainImage !== undefined && this.props.hotelInfo.mainImage !== "" ) {
            return (
                <Image 
                    source={this.props.hotelInfo.mainImage} 
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
        paddingVertical: 10,
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

