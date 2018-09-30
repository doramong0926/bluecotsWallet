import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import ActionCreator from '../../actions';
import { connect } from 'react-redux';
import ImageSlider from 'react-native-image-slider';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import HotelDetailCard from './../../cards/hotelDetailCard';
import PropTypes from 'prop-types';

class HotelDetailScreen extends Component{
    static navigationOptions = {
        title: 'Hotel detail',
        headerTitleStyle: {
            textAlign: 'center',
            fontSize: 14,
            color: 'white',
        },
        headerStyle: {
            backgroundColor: '#092834',
            height: 40,
        },
        headerTintColor: 'white',
    }

    constructor (props) {
        super(props)
        this.state = {
            hotelInfo: this.props.navigation.state.params.hotelInfo,
        }
    }

    componentWillMount() {
    }

    render(){

        return (
            <View style={{flex:1, backgroundColor: '#E4F1F6'}}>
                <ParallaxScrollView
                    backgroundColor="#E4F1F6"
                    contentBackgroundColor="#E4F1F6"
                    style={{ flex: 1, overflow: 'hidden' }}
                    parallaxHeaderHeight={0}   
                    // renderFixedHeader={() => 
                    //     <View style={styles.containerImageSlider}>
                    //         <ImageSlider 
                    //             images={this.state.hotelInfo.detailMainImage} 
                    //             // autoPlayWithInterval={5000}
                    //         />
                    //     </View>
                    // }             
                >                    
                    <View style={styles.containerHotelDetailCard}>
                        <View style={styles.containerImageSlider}>
                            <ImageSlider 
                                images={this.state.hotelInfo.detailMainImage}
                                // width={Dimensions.get('window').width-8}
                                height={180}
                                // autoPlayWithInterval={5000}
                            />
                        </View>
                        <HotelDetailCard hotelInfo={this.state.hotelInfo} />
                    </View>
                </ParallaxScrollView>
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
    containerImageSlider: {
        marginHorizontal: 4,
        height: 180,
    },
    containerHotelDetailCard: {
        marginVertical: 4,
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(HotelDetailScreen);