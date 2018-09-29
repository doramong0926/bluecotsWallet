import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, Dimensions } from 'react-native';
import { SearchBar } from 'react-native-elements'
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import ActionCreator from '../../actions';
import { connect } from 'react-redux';
import ImageSlider from 'react-native-image-slider';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

import HotelSearchBarCard from './../../cards/hotelSearchBarCard';
import HotelCard from './../../cards/hotelCard';
import { defaultHotelInfoList } from './../../config/hotelList'

import SLIDER_IMAGE1 from './../../components/images/sampleSlider1.jpg';
import SLIDER_IMAGE2 from './../../components/images/sampleSlider2.jpg';
import SLIDER_IMAGE3 from './../../components/images/sampleSlider3.jpg';
import HOTEL1_MAIN from './../../cards/images/hotel1_main.jpg';
import HOTEL1_SUB1 from './../../cards/images/hotel1_sub1.jpg';
import HOTEL1_SUB2 from './../../cards/images/hotel1_sub2.jpg';
import HOTEL2_MAIN from './../../cards/images/hotel2_main.jpg';
import HOTEL2_SUB1 from './../../cards/images/hotel2_sub1.jpg';
import HOTEL2_SUB2 from './../../cards/images/hotel2_sub2.jpg';
 
class HotelScreen extends Component{
    static navigationOptions = {
    };

    constructor(props, context) {
        super(props, context);
    }

    state = {
        dataSourceForHotelInfoList: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        }),
        queryString: '',
    };

    componentWillMount() {
        this.fetchHotelInfoList();
        this.updateHotelInfoList();
    }

    componentDidMount() {
        setInterval(() => {
            this.fetchHotelInfoList();
            this.updateHotelInfoList();
        }, 10000)
    }

    componentWillReceiveProps() {
        this.fetchHotelInfoList();
        this.updateHotelInfoList();
    }

    render() {
        const sliderImage = [
            SLIDER_IMAGE1,
            SLIDER_IMAGE2,
            SLIDER_IMAGE3,
        ];

        return (
            <View style={{flex:1, backgroundColor: '#E4F1F6'}}>
                <View style={styles.containerSearchBar}>
                            <HotelSearchBarCard 
                                handelOnChnageText={this.handelOnChnageText.bind(this)} 
                                handleonClearText={this.handleonClearText.bind(this)}
                                queryString={this.state.queryString}
                            />
                </View>
                <ParallaxScrollView
                    backgroundColor="#E4F1F6"
                    contentBackgroundColor="#E4F1F6"
                    style={{ flex: 1, overflow: 'hidden' }}
                    parallaxHeaderHeight={0}
                    // renderBackground={() => 
                    //     <View style={styles.containerImageSlider}>
                    //         <ImageSlider images={sliderImage}/>
                    //     </View>
                    // }

                    // renderForeground={() => 
                    //     <View style={styles.containerImageSlider}>
                    //         <ImageSlider 
                    //             images={sliderImage} 
                    //             autoPlayWithInterval={5000}
                    //         />
                    //     </View>
                    // }

                    // renderFixedHeader={() => 
                    //     <View style={styles.containerSearchBar}>
                    //         <HotelSearchBarCard 
                    //             handelOnChnageText={this.handelOnChnageText.bind(this)} 
                    //             handleonClearText={this.handleonClearText.bind(this)}
                    //             queryString={this.state.queryString}
                    //         />
                    //     </View>
                    // }
                    >
                    
                    <View style={styles.containerHotelCard}>
                        <ListView
                            dataSource={this.state.dataSourceForHotelInfoList}
                            renderRow={this.renderHotelCard}
                            style={styles.containerHotelInfoCard}
                            enableEmptySections={true}
                        />
                    </View>
                </ParallaxScrollView>
            </View>
        );
    }

    renderHotelCard = (hotelInfo) => {
        if (hotelInfo.length !== 0 && hotelInfo.name !== undefined && hotelInfo.name !== '' && hotelInfo.name !== null) {
            return (
                <HotelCard hotelInfo={hotelInfo} />
            )
        } else {
            return (
                <View style={{alignItems: 'center', justifyContent:'center'}}>no data</View>
            )
        }
    }

    fetchHotelInfoList = () => {
        defaultHotelInfoList.map(t=>{
            if (this.props.hotelInfoList.filter(item=>{return(item.id === t.id)}).length === 0) {
                this.props.addHotelInfoList(t);    
            }
        })
    }

    updateHotelInfoList = () => {
        this.state.dataSourceForHotelInfoList = this.state.dataSourceForHotelInfoList.cloneWithRows(this.props.hotelInfoList);
    };

    handelOnChnageText = (queryString) => {
        console.log(`handelOnChnageText : ${queryString}`)
        this.setState(state => ({ ...state, queryString: queryString || "" }));
    }

    handleonClearText = () => {
        console.log(`handleSearchClear`);
        this.setState({queryString: ''});
    }
}

function mapStateToProps(state) {
    return {
        hotelInfoList: state.hotel.hotelInfoList,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addHotelInfoList: (hotelInfo) => {
            dispatch(ActionCreator.addHotelInfoList(hotelInfo));
        },
        removeHotelInfoList: (hotelInfo) => {
            dispatch(ActionCreator.removeHotelInfoList(hotelInfo));
        },
    };
}
 
const styles = StyleSheet.create({
    containerHotelCard: {
        marginBottom: 4,
        // height: Dimensions.get('window').height,
    },
    containerSearchBar: {
        // height: 140,
        marginVertical: 4,
    },
    containerHotelInfoCard: {
        // justifyContent: 'center',
        // paddingHorizontal: 10,
    },   
})

export default connect(mapStateToProps, mapDispatchToProps)(HotelScreen);