"use strict";

class DatePicker {
    constructor(id, callback) {
        this.id = id;
        this.callback = callback;
    }

    render(selectedDate) {
        if (Object.prototype.toString.call(selectedDate) !== "[object Date]") {
            throw new Error("selected date is of wrong type");
        }

        console.log("1");
        const days = this.getDays(selectedDate);
        console.log("2");
        this.drawTable(days);
    }

    //Get first day of the given month
    getFirstOfMonth(date) {
        let currDate = new Date(date);
        currDate.setDate(1);
        return new Date(currDate);
    }

    //Get last day of the given month
    getLastOfMonth(date) {
        let currDate = new Date(date);
        currDate.setMonth(currDate.getMonth() + 1);
        currDate.setDate(0);
        return new Date(currDate);
    }

    //Get first week's sunday of selected month 
    getFirstSunday(date) {
        let currDate = this.getFirstOfMonth(date);
        let diff = currDate.getDate() - currDate.getDay();
        return new Date(currDate.setDate(diff));
    }

    //Get last week's saturday of selected month 
    getLastSaturday(date) {
        let currDate = this.getLastOfMonth(date);
        let diff = currDate.getDate() + (6 - currDate.getDay());
        return new Date(currDate.setDate(diff));
    }

    //Check that the provided checkDate is included in the calendar of selectedDate
    isInCalendar(checkDate, selectedDate) {
        const sDate = new Date(selectedDate);
        const cDate = new Date(checkDate);
        const firstDayOfTheFirstWeek = this.getFirstSunday(sDate);
        const lastDayOfTheLastWeek = this.getLastSaturday(sDate);

        return (firstDayOfTheFirstWeek <= cDate) && (cDate <= lastDayOfTheLastWeek);
    }

    //Get all days to be displayed on the calendar
    getDays(date) {
        const selectedDate = new Date(date);

        let currDate = this.getFirstSunday(selectedDate);
        let days = [];
        let count = 0;

        while(this.isInCalendar(currDate, selectedDate)) {
            days.push(new Date(currDate));
            currDate.setDate(currDate.getDate() + 1);

            //This is just a catch for inf loops
            count += 1;
            if (count > 50) {break;}
        }

        return days;
    }

    createCell(day) {
        let d = document.createTextNode(day.getDate());
        return d;
    }

    createTable(days) {
        let table = document.createElement("table");
        table.classList.add("datepicker");

        const x = days.length / 7;
        const y = 7;

        let day = 0;

        for (let i = 0; i < x; i++) {
            let row = table.insertRow();
            for (let j = 0; j < y; j++) {
                let cell = row.insertCell();
                cell.appendChild(this.createCell(days[day]))
                cell.classList.add("day");

                day += 1;
            }
        }

        return table;
    }

    drawTable(days) {
        let body = document.getElementById(this.id);

        body.appendChild(this.createTable(days))
    }
}
