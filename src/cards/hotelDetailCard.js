import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Dimensions, Linking } from 'react-native';
import { Button } from 'react-native-elements'
import { connect } from 'react-redux';
import { Card } from 'react-native-material-design';
import PropTypes from 'prop-types';
import ActionCreator from '../actions';
import StarRating from 'react-native-star-rating';
import HOTEL_MAIN_DEFULT from './images/hotel1_main.jpg'
import { Divider } from 'react-native-material-design';
import { defaultPaymentInfomation, defaultHotelInfo} from '../config/hotelList';

class HotelDetailCard extends Component {
    static propTypes = {
    };

    constructor(props, context) {
        super(props);
        this.state = {
            hotelInfo: defaultHotelInfo,
            paymentInfomation: defaultPaymentInfomation,
        };
    }

    componentDidMount() {
        let paymentInfomation = this.state.paymentInfomation;
        paymentInfomation.hotelInfo = this.props.hotelInfo;
        this.setState({
            hotelInfo: this.props.hotelInfo,
            paymentInfomation: paymentInfomation,
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.hotelInfo !== nextProps.hotelInfo) {
            let paymentInfomation = this.state.paymentInfomation;
            paymentInfomation.hotelInfo = nextProps.hotelInfo;
            this.setState({
                hotelInfo: nextProps.hotelInfo,
                paymentInfomation: paymentInfomation,
            });
        }
    }

    render() {
        return (
            <View style={styles.container}>  
                <Card style={styles.containerCard}>
                    {/* <Card.Media
                        image={ this.renderHotelMainImage()}
                        // overlay
                    >   
                    </Card.Media> */}
                    <Card.Body>
                        <View style={styles.containerBody}>                            
                            <View style={styles.containerHotelInfo}>
                                {this.renderHotelName()}
                                {this.renderHotelDescription()}                                
                                {this.renderHotelAddress()}
                                {this.renderHotelHomepage()}                                
                            </View>
                            <View style={styles.containerStarRaring}>
                                {this.renderStarRating()}
                            </View>
                            <Divider />
                            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                                {this.renderReserveButton()}
                            </View>
                        </View>
                    </Card.Body>
                </Card>
            </View>
        );
    }

    onStarRatingPress(rating) {
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

    handelPressReserve = () => {
        this.props.setPaymentInfomation(this.state.paymentInfomation);
        setTimeout(() => {
            this.props.showModalPayment();    
        }, );
    }

    getStarCount = () => {
        if (this.state.hotelInfo.starCount !== null && this.state.hotelInfo.starCount !== undefined && this.state.hotelInfo.starCount !== "" ) {
            return this.state.hotelInfo.starCount;
        } else {
            return 0;
        }
    }

    renderReserveButton = () => {
        return(
            <View style={styles.buttonContainer}>
                <Button
                    onPress={this.handelPressReserve}
                    title="Reserve"
                    buttonStyle={{
                        backgroundColor: "#BD3D3A",
                        borderColor: "transparent", 
                        borderRadius: 5
                    }}
                    containerViewStyle={{
                        // alignSelf: 'flex-end',
                        // margin: 20,
                    }}
                />    
            </View>
        )
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

    renderStarRating = () => {
        return (
            <View>
                <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={this.getStarCount()}
                        selectedStar={(rating) => this.onStarRatingPress(rating)}
                        fullStarColor={'#BD3D3A'}
                        starSize={20}
                />
                <Text style={styles.starRatingText}>Rating ({this.getStarCount().toFixed(1)} / 5.0)</Text>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
        showModalPayment: () => {
            dispatch(ActionCreator.showModalPayment());
        },
        setPaymentInfomation: (paymentInfomation) => {
            dispatch(ActionCreator.setPaymentInfomation(paymentInfomation));
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
        marginBottom: 10,
    },
    containerStarRaring: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    buttonContainer: {
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
    starRatingText: {
        fontSize: 12,        
        color: '#B4B7BA',
        textAlign: 'center',
    },
})
  
export default connect(mapStateToProps, mapDispatchToProps)(HotelDetailCard);

