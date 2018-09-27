
import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import NotificationCard from './../../cards/notificationCard';
import WalletBalanceCard from './../../cards/walletBalanceCard';
import HistoryCard from './../../cards/historyCard';
import ImageSlider from 'react-native-image-slider';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

import SLIDER_IMAGE1 from './../../components/images/sampleSlider1.jpg';
import SLIDER_IMAGE2 from './../../components/images/sampleSlider2.jpg';
import SLIDER_IMAGE3 from './../../components/images/sampleSlider3.jpg';

class WalletScreen extends Component{
    static navigationOptions = {    
    };

    render() {
        const sliderImage = [
            SLIDER_IMAGE1,
            SLIDER_IMAGE2,
            SLIDER_IMAGE3,
        ];
        return (
            <View style={{flex:1}}>
                <ParallaxScrollView
                    backgroundColor="#E4F1F6"
                    contentBackgroundColor="#E4F1F6"
                    style={{ flex: 1, overflow: 'hidden' }}
                    parallaxHeaderHeight={140}
                    // renderBackground={() => 
                    //     <View style={styles.containerImageSlider}>
                    //         <ImageSlider images={sliderImage}/>
                    //     </View>
                    // }
                    renderForeground={() => 
                        <View style={styles.containerImageSlider}>
                            <ImageSlider 
                                images={sliderImage} 
                                autoPlayWithInterval={5000}
                            />
                        </View>
                    }>
                        <View style={styles.container}>
                            <NotificationCard />
                            <WalletBalanceCard navigation={this.props.navigation}/>
                            <HistoryCard offset={3}/>
                        </View>
                    </ParallaxScrollView>
            </View>
        );
    }
}
  
export default WalletScreen;
 
const styles = StyleSheet.create({
    container: {
        marginBottom: 4,
    },
    containerImageSlider: {
        height: 140,
    },
})