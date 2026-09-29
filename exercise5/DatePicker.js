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

        let body = document.getElementById(this.id);
        body.replaceChildren();

        const days = this.getDays(selectedDate);
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

    //returns title for calendar header in format "Month / Year"
    createCalendarTitle(selectedDate) {
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

        let currDate = new Date(selectedDate);
        let title = document.createElement("div");
        title.classList.add("datepicker-title");
        title.textContent = month[currDate.getMonth()] + " / " + currDate.getFullYear();

        return title;
    }

    //returns button that moves user to the past or future month
    //dir is direction of the button, 1 = next month, -1 = past month
    createCalendarButton(selectedDate, dir) {
        let currDate = new Date(selectedDate);

        let button = document.createElement("button");
        button.innerText = dir===1 ? ">" : "<";
        button.addEventListener(
            'click', () => {
                let newDate = new Date(currDate);
                newDate.setDate(1);
                newDate.setMonth(newDate.getMonth() + (dir * 1));

                this.render(new Date(newDate));
            }
        )

        return button;
    }

    //returns calendar header that contains buttons and title
    createCalendarHeader(selectedDate) {
        let currDate = new Date(selectedDate);

        let header = document.createElement("div");
        header.classList.add("datepicker-header");

        let title = this.createCalendarTitle(currDate);
        let buttonL = this.createCalendarButton(currDate, -1);
        let buttonR = this.createCalendarButton(currDate, 1);

        header.appendChild(buttonL);
        header.appendChild(title);
        header.appendChild(buttonR);

        return header;
    }

    //returns header for the days of the week
    createHeader(num) {
        let weekdays = {
            0: "Su",
            1: "Mo",
            2: "Tu",
            3: "We",
            4: "Th",
            5: "Fr",
            6: "Sa"
        }

        let header = document.createElement("th");
        let d = document.createTextNode(weekdays[num]);
        header.appendChild(d)

        return header
    }

    //returns cell for a row, that is either active or inactive
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

    //returns the table with all the days and weeks
    createTable(selectedDate, days) {
        let table = document.createElement("table");

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

        table.addEventListener(
            'click', (event) => {
                const active = [...event.target.classList].includes("day");
                const tag = event.target.tagName;

                if (!active || (tag !== "TD")) {return;}

                const dayNum = event.target.innerText;
                const copyDay = new Date(selectedDate);
                const currDay = {
                    month: copyDay.getMonth() + 1,
                    day: Number(dayNum),
                    year: copyDay.getFullYear()
                }
                this.callback(this.id, currDay);
            }
        )

        return table;
    }

    //draws the calendar
    drawTable(selectedDate, days) {
        let currDate = new Date(selectedDate)
        let body = document.getElementById(this.id);

        body.appendChild(this.createCalendarHeader(currDate));

        body.appendChild(this.createTable(currDate, days));
    }
}
