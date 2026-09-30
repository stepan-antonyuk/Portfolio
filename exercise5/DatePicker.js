"use strict";

class DatePicker {
    constructor(id, callback) {
        this.id = id;
        this.callback = callback;

        this.date = new Date();
        this.body = document.getElementById(this.id);
        this.body.addEventListener(
            'click', (event) => {
                const active = [...event.target.classList].includes("day");
                const tag = event.target.tagName;

                if (!active || (tag !== "TD")) {return;}

                const dayNum = event.target.textContent;
                const copyDay = new Date(this.date);
                const currDay = {
                    month: copyDay.getMonth() + 1,
                    day: Number(dayNum),
                    year: copyDay.getFullYear()
                };
                this.callback(this.id, currDay);
            }
        );
    }

    render(selectedDate) {
        if (Object.prototype.toString.call(selectedDate) !== "[object Date]") {
            throw new Error("selected date is of wrong type");
        }

        this.date = new Date(selectedDate);
        this.body.replaceChildren();

        const days = this.getDays(this.date);
        this.drawTable(this.date, days);
    }

    //Get first day of the given month
    getFirstOfMonth(date) {
        return new Date(date.getFullYear(), date.getMonth(), 1);
    }

    //Get last day of the given month
    getLastOfMonth(date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0);
    }

    //Get first week's sunday of selected month 
    getFirstSunday(date) {
        const currDate = this.getFirstOfMonth(date);
        const diff = currDate.getDate() - currDate.getDay();
        return new Date(currDate.setDate(diff));
    }

    //Get last week's saturday of selected month 
    getLastSaturday(date) {
        const currDate = this.getLastOfMonth(date);
        const diff = currDate.getDate() + (6 - currDate.getDay());
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

        const currDate = this.getFirstSunday(selectedDate);
        const days = [];

        while(this.isInCalendar(currDate, selectedDate)) {
            days.push(new Date(currDate));
            currDate.setDate(currDate.getDate() + 1);
        }

        return days;
    }

    //returns title for calendar header in format "Month / Year"
    createCalendarTitle(selectedDate) {
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

        const currDate = new Date(selectedDate);
        const title = document.createElement("div");
        title.classList.add("datepicker-title");
        title.textContent = month[currDate.getMonth()] + " / " + currDate.getFullYear();

        return title;
    }

    //returns button that moves user to the past or future month
    //dir is direction of the button, 1 = next month, -1 = past month
    createCalendarButton(selectedDate, dir) {
        const currDate = new Date(selectedDate);

        const button = document.createElement("button");
        button.textContent = dir===1 ? ">" : "<";
        button.addEventListener(
            'click', () => {
                const newDate = new Date(currDate);
                newDate.setDate(1);
                newDate.setMonth(newDate.getMonth() + (dir * 1));

                this.render(new Date(newDate));
            }
        );

        return button;
    }

    //returns calendar header that contains buttons and title
    createCalendarHeader(selectedDate) {
        const currDate = new Date(selectedDate);

        const header = document.createElement("div");
        header.classList.add("datepicker-header");

        const title = this.createCalendarTitle(currDate);
        const buttonL = this.createCalendarButton(currDate, -1);
        const buttonR = this.createCalendarButton(currDate, 1);

        header.appendChild(buttonL);
        header.appendChild(title);
        header.appendChild(buttonR);

        return header;
    }

    //returns header for the days of the week
    createHeader(num) {
        const weekdays = {
            0: "Su",
            1: "Mo",
            2: "Tu",
            3: "We",
            4: "Th",
            5: "Fr",
            6: "Sa"
        };

        const header = document.createElement("th");
        const d = document.createTextNode(weekdays[num]);
        header.appendChild(d);

        return header;
    }

    //returns cell for a row, that is either active or inactive
    createCell(day, selectedDate) {
        const cell = document.createElement("td");
        const d = document.createTextNode(day.getDate());

        cell.appendChild(d);

        if (this.isInSelectedMonth(day, selectedDate)) {
            cell.classList.add("day");
        } else {
            cell.classList.add("outside-month");
        }

        return cell;
    }

    //returns the table with all the days and weeks
    createTable(selectedDate, days) {
        const table = document.createElement("table");

        const x = (days.length / 7) + 1;
        const y = 7;

        let day = 0;

        for (let i = 0; i < x; i++) {
            const row = document.createElement("tr");
            for (let j = 0; j < y; j++) {
                if (i === 0) {
                    const header = this.createHeader(j);
                    row.appendChild(header);
                } else {
                    const cell = this.createCell(days[day], selectedDate);
                    row.appendChild(cell);

                    day += 1;
                }
            }
            table.appendChild(row);
        }

        return table;
    }

    //draws the calendar
    drawTable(selectedDate, days) {
        const currDate = new Date(selectedDate);

        this.body.appendChild(this.createCalendarHeader(currDate));
        this.body.appendChild(this.createTable(currDate, days));
    }
}
