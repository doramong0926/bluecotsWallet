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
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { defaultHotelInfo } from '../config/hotelList';
import { DEFAULT_MAP_REGION, DEFAULT_MAP_LATLEN } from '../config/constants';


class HotelDetailCard extends Component {
    static propTypes = {
    };

    constructor(props, context) {
        super(props);
        this.state = {
            hotelInfo: defaultHotelInfo,
            mapRegion: DEFAULT_MAP_REGION,
            mapMarker: DEFAULT_MAP_LATLEN,
        };
    }

    componentDidMount() {
        this.setState({
            hotelInfo: this.props.hotelInfo,
            mapRegion: this.props.hotelInfo.mapRegion,
            mapMarker: this.props.hotelInfo.mapMarker,
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.hotelInfo !== nextProps.hotelInfo) {
            this.setState({
                hotelInfo: nextProps.hotelInfo,
                mapRegion: this.props.hotelInfo.mapRegion,
                mapMarker: this.props.hotelInfo.mapMarker,
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
                            <View style={styles.containerMap}>
                                <MapView
                                    provider={PROVIDER_GOOGLE}
                                    style={styles.containerMapView}
                                    // region={this.state.mapRegion}
                                    initialRegion={DEFAULT_MAP_REGION}
                                    // region={DEFAULT_MAP_REGION}
                                    onRegionChange={this.handelonMapRegionChange}
                                >
                                    {/* <Marker
                                        // coordinate={this.state.mapMarker.latlng}
                                        coordinate={DEFAULT_MAP_LATLEN.latlng}
                                        title={this.state.hotelInfo.name}
                                        description={this.state.hotelInfo.address}
                                    /> */}
                                </MapView>                                
                            </View>
                            <View style={styles.containerHotelInfo}>
                                {this.renderHotelAddress()}
                            </View>
                            <Divider />
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

    handelonMapRegionChange = () => {

    }

    handlePressHomepage = (address) => {
        Linking.canOpenURL(address).then(supported => {
            if (supported) {
                Linking.openURL(address);
            } 
        });
    }

    getStarCount = () => {
        if (this.state.hotelInfo.starCount !== null && this.state.hotelInfo.starCount !== undefined && this.state.hotelInfo.starCount !== "" ) {
            return this.state.hotelInfo.starCount;
        } else {
            return 0;
        }
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
    containerMap: {
        marginTop: 15,
        marginBottom: 5,
        height:160,
    },
    containerMapView: {
        height:160,
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

