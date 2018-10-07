import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Dimensions, Linking } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
import { connect } from 'react-redux';
import { Card } from '@doramong0926/react-native-material-design';
import PropTypes from 'prop-types';
import ActionCreator from '../actions';
import { Divider } from '@doramong0926/react-native-material-design';
import { DEFAULT_PAYMENT_INFOMATION } from '../config/hotelList';
import { DEFAULT_TOKEN_EXCHANGE_RATE } from '../config/constants'
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Moment from 'moment';


class HotelPaymentCard extends Component {
    static propTypes = {
        hotelInfo: PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
        defaultWallet: PropTypes.shape({
            walletAddress: PropTypes.string.isRequired,
        }).isRequired,
    };
    constructor(props, context) {
        super(props);
        this.state = {
            paymentInfomation: DEFAULT_PAYMENT_INFOMATION,
        };
    }

    componentDidMount() {
        this.setState({
            paymentInfomation: {
                hotelName: '',
                orderNumber: 0,
                orderTime: 0,
                selectedRoomType: '',
                numOfPeople: {
                    adult: 0,
                    kid: 0,
                    baby: 0,
                },
                tokenSymbol: 'BLC',
                addressFromSend: '',
                addressToSend: '',
                amountToSend: '',
                transactionId: '',
                transcationBlockHeight: 0,
                date: {
                    checkIn: '',
                    checkOut: '',
                    nightsDays: 0,
                },
                tokenPrice: DEFAULT_TOKEN_EXCHANGE_RATE,
                totalPrice: 0,
            },
        });
    }

    componentWillReceiveProps(nextProps) {
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
                                <Text style={styles.descriptionText}>Fill your reservation infomation.</Text>
                            </View>    
                            {/* <View style={styles.subItemContainer}> */}
                            <View>
                                <View>
                                    {this.renderCheckInOut()}
                                </View>                            
                                <View style={styles.subItemContainer}>
                                    {this.renderCalculatedDate()}
                                </View>
                            </View>
                            <Divider />
                            <View style={styles.subItemContainer}>
                                {this.renderSelectNumOfPeople()}
                            </View>
                            <Divider />
                            <View style={styles.subItemContainer}>
                                {this.renderReserveButton()}
                            </View>
                        </View>
                    </Card.Body>
                </Card>
            </View>
        );
    }
    selectCheckInDateFinishProcess = (date) => {
        let paymentInfomation = this.state.paymentInfomation;
        paymentInfomation.date.checkIn = date.dateString;        
        this.setState({
            paymentInfomation: paymentInfomation,
        })
        const calendarMarkedDates = {
            selectedCheckInDate: date.dateString,
            selectedCheckOutDate: this.props.calendarMarkedDates.selectedCheckOutDate,
        }
        this.props.setCalendarMarkedDates(calendarMarkedDates);
    }

    selectCheckOutDateFinishProcess = (date) => {
        let paymentInfomation = this.state.paymentInfomation;
        paymentInfomation.date.checkOut = date.dateString;
        this.setState({
            paymentInfomation: paymentInfomation,
        })
        const calendarMarkedDates = {
            selectedCheckInDate: this.props.calendarMarkedDates.selectedCheckInDate,
            selectedCheckOutDate: date.dateString,
        }
        this.props.setCalendarMarkedDates(calendarMarkedDates);
    }

    handelPressSelectCheckInDate = () => {        
        this.props.setModalCalendarForReservationFinishProcess(this.selectCheckInDateFinishProcess.bind(this));
        this.props.showModalCalendarForReservation();
    }

    handelPressSelectCheckOutDate = () => {
        this.props.setModalCalendarForReservationFinishProcess(this.selectCheckOutDateFinishProcess.bind(this));
        this.props.showModalCalendarForReservation();
    }

    handelPressReserve = () => {
        this.calculatePaymentInfomation(); 
        setTimeout(() => {
            this.props.showModalPayment();    
        }, );
    }

    handelPressChangeNumOfAdult = (type) => {
        let paymentInfomation = this.state.paymentInfomation;
        if (type === 'add') {
            paymentInfomation.numOfPeople.adult++;
            this.setState({
                paymentInfomation: paymentInfomation,
            })
        } else if (type === 'remove') {
            console.log(`dkdk 1 handelPressChangeNumOfAdult adult[${paymentInfomation.adult}]`);
            if (paymentInfomation.numOfPeople.adult >= 1) {
                paymentInfomation.numOfPeople.adult--;
                console.log(`dkdk 3 handelPressChangeNumOfAdult adult[${paymentInfomation.adult}]`);
                this.setState({
                    paymentInfomation: paymentInfomation,
                })
            }
        }
    }

    handelPressChangeNumOfKid = (type) => {
        let paymentInfomation = this.state.paymentInfomation;
        if (type === 'add') {
            paymentInfomation.numOfPeople.kid++;
            this.setState({
                paymentInfomation: paymentInfomation,
            })
        } else if (type === 'remove') {          
            if (paymentInfomation.numOfPeople.kid >= 1) {
                paymentInfomation.numOfPeople.kid--;
                this.setState({
                    paymentInfomation: paymentInfomation,
                })
            }
        }
    }

    handelPressChangeNumOfBaby = (type) => {
        let paymentInfomation = this.state.paymentInfomation;
        if (type === 'add') {
            paymentInfomation.numOfPeople.baby++;
            this.setState({
                paymentInfomation: paymentInfomation,
            })
        } else if (type === 'remove') {
            if (paymentInfomation.numOfPeople.baby >= 1) {
                paymentInfomation.numOfPeople.baby--;
                this.setState({
                    paymentInfomation: paymentInfomation,
                })
            }
        }
    }

    isEmptyCheckInOutDate = () => {
        if (this.state.paymentInfomation.date.checkIn === '' || this.state.paymentInfomation.date.checkOut === '') {
            return true;
        } else {
            return false;
        }
    }

    isValidCheckInOutDate = () => {
        if (this.isEmptyCheckInOutDate() === true) {
            return false;
        } else if (
            parseInt(this.calculateDiffDate(
                this.state.paymentInfomation.date.checkIn, 
                this.state.paymentInfomation.date.checkOut
            )) <= 0) {
            return false;
        } else {
            return true;
        }
    }

    isValidNumOfPeople = () => {
        if (this.state.paymentInfomation.numOfPeople.adult === 0 &&
            this.state.paymentInfomation.numOfPeople.kid === 0 &&
            this.state.paymentInfomation.numOfPeople.baby === 0) {
            return false;
        } else {
            return true;
        }
    }

    isValidReserveButton = () => {
        if (this.isValidCheckInOutDate() === false) {
            return false;
        }
        if (this.isValidNumOfPeople() === false) {
            return false;
        }
        return true;
    }

    calculateDiffDate = (start, end) => {
        const diffDate = Moment(end, 'YYYY-MM-DD').diff(Moment(start, 'YYYY-MM-DD'), 'days');
        // var paymentInfomation = this.state.paymentInfomation;
        // paymentInfomation.date.nightsDays = diffDate;
        // this.setState({paymentInfomation: paymentInfomation})
        return diffDate;
    }

    calculatePaymentInfomation = () => {        
        const diffDate = this.calculateDiffDate(this.state.paymentInfomation.date.checkIn, this.state.paymentInfomation.date.checkOut);
        setTimeout(() => {
            var paymentInfomation = this.state.paymentInfomation;
            paymentInfomation.date.nightsDays = diffDate;
            this.setState({paymentInfomation: paymentInfomation})
        }, );

        const totalPrice = (
            this.state.paymentInfomation.numOfPeople.adult * this.props.roomInfo.price.adult * diffDate +
            this.state.paymentInfomation.numOfPeople.kid * this.props.roomInfo.price.kid * diffDate +
            this.state.paymentInfomation.numOfPeople.baby * this.props.roomInfo.price.baby * diffDate
        );

        const paymentInfomation = {
            hotelName: this.props.hotelInfo.name,
            orderNumber: '',
            orderTime: 0,
            selectedRoomType: this.props.roomInfo.name,
            numOfPeople: this.state.paymentInfomation.numOfPeople,
            tokenSymbol: 'BLC',
            addressFromSend: this.props.defaultWallet.walletAddress,
            addressToSend: this.props.hotelInfo.addressToSend,
            amountToSend: totalPrice / DEFAULT_TOKEN_EXCHANGE_RATE,
            transactionId: '',
            transcationBlockHeight: 0,
            date: {
                checkIn: this.state.paymentInfomation.date.checkIn,
                checkOut: this.state.paymentInfomation.date.checkOut,
                nightsDays: this.state.paymentInfomation.date.nightsDays,
            },
            tokenExchangeRate: DEFAULT_TOKEN_EXCHANGE_RATE,
            totalPrice: totalPrice,
        }
        this.setState({
            paymentInfomation: paymentInfomation
        });
        this.props.setPaymentInfomation(paymentInfomation);  
    }

    renderCheckInOut = () => {
        return (
            <View>
                <View style={styles.containerSubTitle}>
                    <Text style={styles.textSubTitle}>Check-in / out</Text>
                </View> 
                <View style={styles.dateFormInputContainer}>
                    <View style={{flex: 1}}>
                        <TouchableOpacity onPress={() => this.handelPressSelectCheckInDate()} value={'0.5'}> 
                            <View style={styles.inputContainer}>
                                <FormInput 
                                    leftIcon = {<Ionicons name="ios-calendar-outline" size={20} />}
                                    editable = {false}
                                    containerStyle={{
                                        marginLeft:0, 
                                        marginRight:0, 
                                        width: (Dimensions.get('window').width/2) - 30,
                                    }} 
                                    underlineColorAndroid='gray'
                                    inputStyle = {{
                                        textAlign: 'center',
                                        fontSize:20,
                                        width: (Dimensions.get('window').width/2) - 30,
                                    }}
                                    placeholder = {'Check-in'}
                                    value = {(this.state.paymentInfomation.date.checkIn === '') ? (null) : (this.state.paymentInfomation.date.checkIn)}
                                    // onChangeText={(value) => this.props.setModalAddressToSend(value)}
                                />     
                            </View>                                  
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text> ~ </Text>
                    </View>
                    <View style={{flex: 1}}>
                        <TouchableOpacity onPress={() => this.handelPressSelectCheckOutDate()} value={'0.5'}>
                            <View style={styles.inputContainer}>
                                <FormInput
                                    leftIcon = {<Ionicons name="ios-calendar-outline" size={20} />}
                                    editable = {false}
                                    containerStyle={{
                                        marginLeft:0, 
                                        marginRight:0, 
                                        width: (Dimensions.get('window').width/2) - 30,
                                    }}
                                    underlineColorAndroid='gray'
                                    inputStyle = {{
                                        textAlign: 'center',
                                        fontSize:20,
                                        width: (Dimensions.get('window').width/2) - 30,
                                    }}
                                    placeholder = {'Check-out'}
                                    value = {(this.state.paymentInfomation.date.checkOut === '') ? (null) : (this.state.paymentInfomation.date.checkOut)}
                                    // onChangeText={(value) => this.props.setModalAddressToSend(value)}
                                />                       
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    renderCalculatedDate = () => {
        if (this.isEmptyCheckInOutDate() === false) {
            const diffDate = this.calculateDiffDate(this.state.paymentInfomation.date.checkIn, this.state.paymentInfomation.date.checkOut);
            if (parseInt(diffDate, 10) > 0) {
                if (parseInt(diffDate, 10) > 1) {
                    return (
                        <View>
                            <Text style={styles.textDiffCheckInOut}>{diffDate} nights {diffDate+1} days</Text>
                        </View>
                    )
                } else {
                    return (
                        <View>
                            <Text style={styles.textDiffCheckInOut}>{diffDate} night {diffDate+1} days</Text>
                        </View>
                    )
                }
            } else {
                return (
                    <View>
                        <Text style={styles.textDiffCheckInOutInvalid}>Invalid check-In/Out</Text>
                    </View>
                )
            }
        }
    }

    renderSelectNumOfPeople = () => {
        return (
            <View>
                <View style={styles.containerSubTitle}>
                    <Text style={styles.textSubTitle}>Number of people</Text>
                </View>
                <View>
                    <View style={styles.containerNumOfPeople}>
                        <View style={{flexDirection: 'row', alignItems:'center', justifyContent:'space-between'}}>
                            <Text style={{fontSize: 20}}>Adult : </Text>
                            <Text style={{fontSize: 20}}>{this.state.paymentInfomation.numOfPeople.adult}</Text>
                        </View>
                        <View style={{flexDirection:'row', marginRight: 10}}>
                            <View style={{marginRight: 5}}>
                                <TouchableOpacity onPress={() => this.handelPressChangeNumOfAdult('add')} value={'0.5'}> 
                                    <Ionicons name="ios-add-circle-outline" size={30} />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity onPress={() => this.handelPressChangeNumOfAdult('remove')} value={'0.5'}> 
                                    <Ionicons name="ios-remove-circle-outline" size={30} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.containerNumOfPeople}>
                        <View style={{flexDirection: 'row', alignItems:'center', justifyContent:'space-between'}}>
                            <Text style={{fontSize: 20}}>Kid : </Text>
                            <Text style={{fontSize: 20}}>{this.state.paymentInfomation.numOfPeople.kid}</Text>
                        </View>
                        <View style={{flexDirection:'row', marginRight: 10}}>
                            <View style={{marginRight: 5}}>
                                <TouchableOpacity onPress={() => this.handelPressChangeNumOfKid('add')} value={'0.5'}> 
                                    <Ionicons name="ios-add-circle-outline" size={30} />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity onPress={() => this.handelPressChangeNumOfKid('remove')} value={'0.5'}> 
                                    <Ionicons name="ios-remove-circle-outline" size={30} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.containerNumOfPeople}>
                        <View style={{flexDirection: 'row', alignItems:'center', justifyContent:'space-between'}}>
                            <Text style={{fontSize: 20}}>Baby : </Text>
                            <Text style={{fontSize: 20}}>{this.state.paymentInfomation.numOfPeople.baby}</Text>
                        </View>
                        <View style={{flexDirection:'row', marginRight: 10}}>
                            <View style={{marginRight: 5}}>
                                <TouchableOpacity onPress={() => this.handelPressChangeNumOfBaby('add')} value={'0.5'}> 
                                    <Ionicons name="ios-add-circle-outline" size={30} />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity onPress={() => this.handelPressChangeNumOfBaby('remove')} value={'0.5'}> 
                                    <Ionicons name="ios-remove-circle-outline" size={30} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    

    renderReserveButton = () => {
        return(
            <View style={styles.buttonContainer}>
                <Button
                    disabled={!this.isValidReserveButton()}
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
        calendarMarkedDates: state.hotel.calendarMarkedDates,
        defaultWallet: state.wallet.defaultWallet,
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
        setCalendarMarkedDates: (calendarMarkedDates) => {
            dispatch(ActionCreator.setCalendarMarkedDates(calendarMarkedDates));
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerTitle: {
        // flex: 1,
        // backgroundColor: 'gray',         
        marginBottom: 20,
    },
    containerSubTitle: {      
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerNumOfPeople:  {
        flexDirection :'row', 
        alignItems:'center', 
        justifyContent: 'space-between', 
        marginHorizontal: 40,
    },
    dateFormInputContainer: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    subItemContainer: {
        marginBottom: 10,
    },
    textDiffCheckInOut: {
        fontSize : 16, 
        textAlign:'center',
        color: '#B4B7BA',
    },
    textDiffCheckInOutInvalid: {
        fontSize : 16, 
        textAlign:'center',
        color: 'red',
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:20,
        marginBottom: 10,
    },
    textTitle: {
        fontSize : 16, 
        fontWeight: 'bold', 
        textAlign:'center',
        color: 'black',
    },
    textSubTitle: {
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

