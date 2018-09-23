
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Card } from 'react-native-material-design';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import StatusOfTranscation from './../../components/statusOfTranscation';
import HistoryOfTransaction from './../../components/historyOfTransaction';

class EthHistoryScreen extends Component{  
    static navigationOptions = {
        //tabBarVisible: false,
        tabBarLabel: 'ETH',        
    };  

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
                        <Card style={styles.containerCard}>
                            <Card.Body>
                                    <View style={styles.containerTitle}>
                                        <Text style={styles.textTitle}>History of transaction</Text>
                                        {/* <Text style={styles.descriptionText}>It is shown only 5 recent transaction.</Text> */}
                                    </View>
                                    <View>
                                        <StatusOfTranscation />
                                        <HistoryOfTransaction tokenName={'ETH'}/>
                                    </View>
                            </Card.Body>
                        </Card>
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
  
export default connect(mapStateToProps, mapDispatchToProps)(EthHistoryScreen);
 

const styles = StyleSheet.create({
    container: {
        marginBottom: 4,
    },
    containerCard: {
        marginTop: 4,  
        marginBottom: 0,  
        marginHorizontal: 4,
    },    
    containerTransaction: {      
        // marginBottom: 20,
    },
    containerTitle: {
        // flex: 1,
        // backgroundColor: 'gray',         
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
})