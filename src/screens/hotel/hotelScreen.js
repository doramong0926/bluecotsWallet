import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, Dimensions } from 'react-native';
import ActionCreator from '../../actions';
import { connect } from 'react-redux';
import ImageSlider from 'react-native-image-slider';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

import HotelSearchBarCard from './../../cards/hotelSearchBarCard';
import HotelCard from './../../cards/hotelCard';
import { DEFAULT_HOTEL_INFO, DEFAULT_HOTEL_INFO_LIST } from './../../config/hotelList'

import SLIDER_IMAGE1 from './../../components/images/sampleSlider1.jpg';
import SLIDER_IMAGE2 from './../../components/images/sampleSlider2.jpg';
import SLIDER_IMAGE3 from './../../components/images/sampleSlider3.jpg';
 
class HotelScreen extends Component{
    static navigationOptions = {
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            dataSourceForHotelInfoList: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            hotelInfoList: DEFAULT_HOTEL_INFO_LIST,
            queryString: null,
        };
    }

    // componentWillMount() {
    //     this.fetchHotelInfoList();
    //     this.updateHotelInfoList(null);
    // }

    componentDidMount() {
        this.setState({hotelInfoList: this.props.hotelInfoList})
        this.fetchHotelInfoList();
        this.updateHotelInfoList(null);
        
        setInterval(() => {
            this.fetchHotelInfoList();
            this.updateHotelInfoList(this.state.queryString);
        }, 10000)
    }

    componentWillReceiveProps(nextProps) {
        // if (this.props.hotelInfoList !== nextProps.hotelInfoList) {
        //     this.fetchHotelInfoList();
        //     this.updateHotelInfoList(this.state.queryString);
        // }
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
                        handleOnChnageText={this.handleOnChnageText.bind(this)} 
                        handleonClearText={this.handleonClearText.bind(this)}
                        // queryString={this.state.queryString}
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
                    //             handleOnChnageText={this.handleOnChnageText.bind(this)} 
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
                <HotelCard hotelInfo={hotelInfo} navigation={this.props.navigation} />
            )
        } else {
            return (
                <View style={{alignItems: 'center', justifyContent:'center'}}>There is no hotel list.</View>
            )
        }
    }

    fetchHotelInfoList = () => {
        this.state.hotelInfoList.map(t=>{
            if (this.props.hotelInfoList.filter(item=>{return(item.id === t.id)}).length === 0) {
                this.props.addHotelInfoList(t);    
            }
        })
        setTimeout(() => {
            this.setState({hotelInfoList: this.props.hotelInfoList});    
        }, );
    }

    updateHotelInfoList = (queryString = null) => {
        if (queryString !== null && queryString !== undefined && queryString !== '') {
            this.state.dataSourceForHotelInfoList = this.state.dataSourceForHotelInfoList.cloneWithRows(
                this.state.hotelInfoList.filter(t => {
                    return (t.name.includes(queryString) === true);
                })
            );
        }        
        else {
            this.state.dataSourceForHotelInfoList = this.state.dataSourceForHotelInfoList.cloneWithRows(this.state.hotelInfoList);
        }
    };

    handleOnChnageText = (queryString) => {
        console.log(`handleOnChnageText : ${queryString}`)
        if (this.state.queryString !== queryString) {
            this.setState({queryString: queryString});
        }
        this.updateHotelInfoList(queryString);    
    }

    handleonClearText = () => {
        console.log(`handleSearchClear`)
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