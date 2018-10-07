
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Modal from 'react-native-simple-modal';
import ActionCreator from '../actions';
import { connect } from 'react-redux';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

/*
{
  day: 1,     // day of month (1-31)
  month: 1,   // month of year (1-12)
  year: 2017, // year
  timestamp,   // UTC timestamp representing 00:00 AM of this date
  dateString: '2016-05-13' // date formatted as 'YYYY-MM-DD' string
}
*/

class ModalCalendarForReservation extends Component {
    constructor(props, context) {
        super(props);
        this.state = {
            currentDate: Date(),
        };
    }

    componentDidMount() {   
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        return (
            <Modal 
                offset={0}
                open={this.props.visibleModalCalendarForReservation}
                animationDuration={200}
                animationTension={40}
                closeOnTouchOutside={true}
                disableOnBackPress={false}
                modalDidClose={() => {this.closeModal()}}
                modalDidOpen={() => undefined}
                modalProps={undefined}
                containerProps={undefined}
                containerStyle={{
                    justifyContent: "center"
                }}
                modalStyle={{
                    margin: 0,
                    padding:0,
                    borderRadius: 10,
                    marginHorizontal: 20,
                    backgroundColor: "white"
                }}
                overlayStyle={{
                    backgroundColor: "rgba(0, 0, 0, 0.75)",
                    flex: 1
                }}
            >
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Select date of reservation</Text>
                    <View style={{alignSelf:"flex-end", paddingRight:20, position:"absolute"}}>
                        <TouchableOpacity onPress={() => this.closeModal()} value={'0.5'}>
                            <Ionicons name="ios-close-circle-outline" size={20}/>
                        </TouchableOpacity>
                    </View>                      
                </View>
                <View style={styles.bodyContainer}>
                    <Calendar
                        // Initially visible month. Default = Date()
                        // current={'2012-03-01'}
                        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                        minDate={this.state.currentDate}
                        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                        maxDate={'2020-05-30'}
                        // Handler which gets executed on day press. Default = undefined
                        onDayPress={(day) => {this.handelOnDayPress(day)}}
                        // Handler which gets executed on day long press. Default = undefined
                        // onDayLongPress={(day) => {console.log('selected day', day)}}
                        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                        monthFormat={'yyyy MMM'}
                        // Handler which gets executed when visible month changes in calendar. Default = undefined
                        onMonthChange={(month) => {console.log('month changed', month)}}
                        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                        onPressArrowLeft={substractMonth => substractMonth()}
                        // Handler which gets executed when press arrow icon left. It receive a callback can go next month
                        onPressArrowRight={addMonth => addMonth()}

                        markedDates={this.props.calendarMarkedDates}
                        // markedDates={{
                        //     '2018-10-20': {textColor: 'green'},
                        //     '2018-10-22': {startingDay: true, color: 'green'},
                        //     '2018-10-23': {selected: true, endingDay: true, color: 'green', textColor: 'gray'},
                        //     '2018-10-04': {disabled: true, startingDay: true, color: 'green', endingDay: true}
                        // }}
                        // markingType={'period'}
                    />
                </View>
            </Modal>
        );
    }

    closeModal = () => {
        this.props.hideModalCalendarForReservation();
    } 

    handelOnDayPress = (date) => {
        if (this.props.modalCalendarForReservationFinishProcess) {
            this.props.modalCalendarForReservationFinishProcess(date)
        }
        this.closeModal();
    }
}

function mapStateToProps(state) {
    return {
        visibleModalCalendarForReservation: state.modal.visibleModalCalendarForReservation,
        modalCalendarForReservationFinishProcess: state.modal.modalCalendarForReservationFinishProcess,
        calendarMarkedDates: state.hotel.calendarMarkedDates,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        hideModalCalendarForReservation: () => {
            dispatch(ActionCreator.hideModalCalendarForReservation());
        },
    };
}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#B4B7BA',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopStartRadius : 10,
        borderTopEndRadius: 10,
        padding: 10,
    }, 
    bodyContainer: {
        justifyContent: 'center',
        paddingHorizontal: 10,
    },   
    headerText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center'
    },
    
    menuText: {
        marginTop: 5, 
        textAlign: 'center'
    }
})
  
export default connect(mapStateToProps, mapDispatchToProps)(ModalCalendarForReservation);

