
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import HistoryCard from './../../cards/historyCard'

class HistoryScreen extends Component{  
    render(){
        return (
            <View style={{flex:1}}>
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
                    //         <ImageSlider images={sliderImage}/>
                    //     </View>
                    // }
                >
                    <View style={styles.container}>
                        <HistoryCard />
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
  
export default connect(mapStateToProps, mapDispatchToProps)(HistoryScreen);
 

const styles = StyleSheet.create({
    container: {
        marginBottom: 4,
        backgroundColor: '#E4F1F6',
    },
})