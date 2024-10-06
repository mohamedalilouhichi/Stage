import React, { useState, useEffect } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';
import './calendarr.css';

function Calendarr() {
  const [eventDates, setEventDates] = useState({});
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const newEventDates = {};
    const today = new Date();
    const day1 = formatDate(new Date(today.setMonth(today.getMonth() + 1)));
    newEventDates[day1] = [
      'Event 1, Location 1',
      'Event 2, Location 2'
    ];
    const day2 = formatDate(new Date(today.setDate(today.getDate() + 40)));
    newEventDates[day2] = [
      'Event 3, Location 3'
    ];

    setEventDates(newEventDates);
  }, []);

  function formatDate(date) {
    const d = date.getDate();
    const m = date.getMonth() + 1;
    const y = date.getFullYear();
    return `${y}-${(m <= 9 ? '0' + m : m)}-${(d <= 9 ? '0' + d : d)}`;
  }

  function eventCaledarResize(width) {
    if (width >= 992) {
      return 3;
    } else if (width >= 768) {
      return 2;
    } else {
      return 1;
    }
  }

  function handleDateChange(selectedDates, str, inst) {
    if (selectedDates.length) {
      if (selectedDate === str) {
        setSelectedEvents([]);
        setSelectedDate(null);
      } else {
        setSelectedEvents(eventDates[str] || []);
        setSelectedDate(str);
      }
    } else {
      setSelectedEvents([]);
      setSelectedDate(null);
    }
  }

  return (
    <div className="cal-modal-container">
      <div className="cal-modal">
        <h3>UPCOMING EVENTS</h3>
        <div id="calendar">
          <div className="placeholder"></div>
          <div className="calendar-events">
            {selectedEvents.map((event, index) => (
              <div className="event" key={index}>
                <div className="location">
                  {event}
                </div>
              </div>
            ))}
          </div>
          <Flatpickr
            className="custom-flatpickr-month"
            options={{
              inline: true,
              minDate: 'today',
              maxDate: new Date(new Date().setMonth(new Date().getMonth() + 9)),
              showMonths: eventCaledarResize(window.innerWidth),
              enable: Object.keys(eventDates),
              disableMobile: true,
              onChange: handleDateChange,
              locale: {
                weekdays: {
                  shorthand: ["S", "M", "T", "W", "T", "F", "S"],
                  longhand: [
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday"
                  ]
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Calendarr;
