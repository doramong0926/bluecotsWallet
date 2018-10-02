import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Dimensions, Linking } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
import { connect } from 'react-redux';
import { Card } from 'react-native-material-design';
import PropTypes from 'prop-types';
import ActionCreator from '../actions';
import { Divider } from 'react-native-material-design';
import { defaultPaymentInfomation, defaultHotelInfo } from '../config/hotelList';
import CalendarForReservation from '../components/calendarForReservation';
import { Ionicons, FontAwesome } from '@expo/vector-icons';


class HotelPaymentCard extends Component {
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
                            <View style={styles.containerTitle}>
                                <Text style={styles.textTitle}>Reservation</Text>
                            </View>     
                            <View style={styles.dateContainer}>
                                <TouchableOpacity onPress={() => this.handelPressSelectStartDate()} value={'0.5'}>
                                    <View>
                                        <FormLabel>Select start date {this.props.modalSendTokenName}</FormLabel>
                                        <View style={styles.inputContainer}>
                                            <FormInput 
                                                editable = {false}
                                                containerStyle={{marginRight:0,}} 
                                                underlineColorAndroid='gray'
                                                inputStyle = {{paddingLeft:5, paddingRight:5, marginRight:0, fontSize:11}}
                                                value = {(this.state.paymentInfomation.date.begin === null) ? (null) : (this.state.paymentInfomation.date.begin.toString())}
                                                // onChangeText={(value) => this.props.setModalAddressToSend(value)}
                                            />
                                        </View>                        
                                        {/* {this.addressValidationMsg()} */}
                                    </View> 
                                </TouchableOpacity>
                            </View>
                            <View style={styles.dateContainer}>
                                <TouchableOpacity onPress={() => this.handelPressSelectStartDate()} value={'0.5'}>
                                    <View>
                                        <FormLabel>Select end date {this.props.modalSendTokenName}</FormLabel>
                                        <View style={styles.inputContainer}>
                                            <FormInput 
                                                editable = {false}
                                                containerStyle={{marginRight:0,}} 
                                                underlineColorAndroid='gray'
                                                inputStyle = {{paddingLeft:5, paddingRight:5, marginRight:0, fontSize:11}}
                                                value = {(this.state.paymentInfomation.date.end === null) ? (null) : (this.state.paymentInfomation.date.end.toString())}
                                                // onChangeText={(value) => this.props.setModalAddressToSend(value)}
                                            />
                                        </View>                        
                                        {/* {this.addressValidationMsg()} */}
                                    </View> 
                                </TouchableOpacity>
                            </View>
                            {/* <View>
                                <CalendarForReservation hotelInfo={this.props.hotelInfo} />
                            </View> */}
                            <View style={{alignItems: 'center', justifyContent:'center'}}>
                                {this.renderReserveButton()}
                            </View>
                        </View>
                    </Card.Body>
                </Card>
            </View>
        );
    }

    selectBeginDateFinishProcess = (date) => {
        console.log("selected date : " + date.dateString)
        let paymentInfomation = this.state.paymentInfomation;
        paymentInfomation.date.begin = date.dateString;
        this.setState({
            paymentInfomation: paymentInfomation,
        })
        const calendarInfo = {
            selectedBeginDate: date,
            selectedEndDate: this.props.calendarInfo.selectedEndDate,
        }
        this.props.setCalendarInfo(calendarInfo);
    }

    selectEndDateFinishProcess = (date) => {
        console.log("selected date : " + date)
        let paymentInfomation = this.state.paymentInfomation;
        paymentInfomation.date.end = date.dateString;
        this.setState({
            paymentInfomation: paymentInfomation,
        })
        const calendarInfo = {
            selectedBeginDate: this.props.calendarInfo.selectedBeginDate,
            selectedEndDate: date,
        }
        this.props.setCalendarInfo(calendarInfo);
    }

    handelPressSelectStartDate = () => {        
        this.props.setSelectHotelInfo(this.props.hotelInfo);
        this.props.setModalCalendarForReservationFinishProcess(this.selectBeginDateFinishProcess.bind(this));
        this.props.showModalCalendarForReservation();
    }

    handelPressSelectEndDate = () => {
        this.props.setSelectHotelInfo(this.props.hotelInfo);
        this.props.setModalCalendarForReservationFinishProcess(this.selectEndDateFinishProcess.bind(this));
        this.props.showModalCalendarForReservation();
    }

    handelPressReserve = () => {
        this.props.setPaymentInfomation(this.state.paymentInfomation);
        setTimeout(() => {
            this.props.showModalPayment();    
        }, );
    }

    renderReserveButton = () => {
        return(
            <View style={styles.buttonContainer}>
                <Button
                    // disabled={!this.isValidGenerateButton()}
                    onPress={this.handelPressReserve}
                    title="Reserve"
                    buttonStyle={{
                        backgroundColor: "#BD3D3A",
                        borderColor: "transparent", 
                        borderRadius: 5,
                        width: Dimensions.get('window').width-40
                    }}
                    containerViewStyle={{
                        // alignSelf: 'flex-end',
                        // margin: 20,
                    }}
                />    
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        hotelInfo: state.hotel.hotelInfo,
        calendarInfo: state.hotel.calendarInfo,
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
        showModalCalendarForReservation: () => {
            dispatch(ActionCreator.showModalCalendarForReservation());
        },   
        setModalCalendarForReservationFinishProcess: (finishProcess) => {
            dispatch(ActionCreator.setModalCalendarForReservationFinishProcess(finishProcess));
        },    
        setSelectHotelInfo: (hotelInfo) => {
            dispatch(ActionCreator.setSelectHotelInfo(hotelInfo));
        },  
        setCalendarInfo: (calendarInfo) => {
            dispatch(ActionCreator.setCalendarInfo(calendarInfo));
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
    inputContainer: {
        flexDirection:'row', 
        justifyContent:'space-between'
    },
    containerTitle: {
        // flex: 1,
        // backgroundColor: 'gray',         
        marginBottom: 20,
    },
    dateContainer: {
        marginBottom: 5,
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
})
  
export default connect(mapStateToProps, mapDispatchToProps)(HotelPaymentCard);

