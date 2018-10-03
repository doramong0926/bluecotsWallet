import React, { Component } from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { connect } from 'react-redux';
import ActionCreator from '../actions';
import PropTypes from 'prop-types';

/*
{
  day: 1,     // day of month (1-31)
  month: 1,   // month of year (1-12)
  year: 2017, // year
  timestamp,   // UTC timestamp representing 00:00 AM of this date
  dateString: '2016-05-13' // date formatted as 'YYYY-MM-DD' string
}
*/

class CalendarForReservation extends Component {
    constructor(props, context) {
        super(props);
        this.state = {
            currentDate: Date(),
        };
        // LocaleConfig.locales['kr'] = {
        //     monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
        //     monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
        //     dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
        //     dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.']
        // };
    }

    componentDidMount() {   
    }

    componentWillReceiveProps(nextProps) {
    }
    
    render() {
        return (
            <View>
                <Calendar
                    // Initially visible month. Default = Date()
                    // current={'2012-03-01'}
                    // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                    minDate={this.state.currentDate}
                    // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                    maxDate={'2020-05-30'}
                    // Handler which gets executed on day press. Default = undefined
                    onDayPress={(day) => {console.log('selected day', day)}}
                    // Handler which gets executed on day long press. Default = undefined
                    onDayLongPress={(day) => {console.log('selected day', day)}}
                    // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                    monthFormat={'yyyy MMM'}
                    // Handler which gets executed when visible month changes in calendar. Default = undefined
                    onMonthChange={(month) => {console.log('month changed', month)}}
                    // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                    onPressArrowLeft={substractMonth => substractMonth()}
                    // Handler which gets executed when press arrow icon left. It receive a callback can go next month
                    onPressArrowRight={addMonth => addMonth()}

                    // markedDates={{
                    //     '2018-10-16': {selected: true, marked: true, selectedColor: 'blue'},
                    //     '2018-10-17': {marked: true},
                    //     '2018-10-18': {marked: true, dotColor: 'red', activeOpacity: 0},
                    //     '2018-10-19': {disabled: true, disableTouchEvent: true}
                    // }}
                    markedDates={{
                        '2018-10-20': {textColor: 'green'},
                        '2018-10-22': {startingDay: true, color: 'green'},
                        '2018-10-23': {selected: true, endingDay: true, color: 'green', textColor: 'gray'},
                        '2018-10-04': {disabled: true, startingDay: true, color: 'green', endingDay: true}
                    }}
                    markingType={'period'}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {        
        flex: 1, 
    },
})

function mapStateToProps(state) {
    return {
        defaultWallet: state.wallet.defaultWallet,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setIsLoadingTxData: (value) => {
            dispatch(ActionCreator.setIsLoadingTxData(value));
        },        
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(CalendarForReservation); 

