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
        this.drawTable(selectedDate, days);
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

    //Check that the provided checkDate is in the same month as selectedDate
    isInSelectedMonth(checkDate, selectedDate) {
        const sDate = new Date(selectedDate);
        const cDate = new Date(checkDate);

        return sDate.getMonth() === cDate.getMonth();
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

    createHeader(num) {
        let weekdays = {
            0: "Su",
            1: "M",
            2: "T",
            3: "W",
            4: "Th",
            5: "F",
            6: "Sa"
        }

        let header = document.createElement("th");
        let d = document.createTextNode(weekdays[num]);
        header.appendChild(d)

        return header
    }

    createCell(day, selectedDate) {
        let cell = document.createElement("td");
        let d = document.createTextNode(day.getDate());

        cell.appendChild(d)

        if (this.isInSelectedMonth(day, selectedDate)) {
            cell.classList.add("day");
        } else {
            cell.classList.add("outside-month");
        }

        return cell;
    }


    createTable(selectedDate, days) {
        let table = document.createElement("table");
        table.classList.add("datepicker");

        const x = (days.length / 7) + 1;
        const y = 7;

        let day = 0;

        for (let i = 0; i < x; i++) {
            let row = document.createElement("tr");
            for (let j = 0; j < y; j++) {
                if (i === 0) {
                    let header = this.createHeader(j);
                    row.appendChild(header);
                } else {
                    let cell = this.createCell(days[day], selectedDate);
                    row.appendChild(cell);

                    day += 1;
                }
            }
            table.appendChild(row);
        }

        return table;
    }

    drawTable(selectedDate, days) {
        let body = document.getElementById(this.id);

        body.appendChild(this.createTable(selectedDate, days))
    }
}
