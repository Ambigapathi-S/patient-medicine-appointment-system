import React, { useContext, useState } from "react";

const getTimeSlots = (
  startTime: string,
  endTime: string,
  gap: number
): string[] => {
  const startTimeAsDate = new Date(); // Create a base Date object
  startTimeAsDate.setHours(parseInt(startTime.slice(0, 2), 10));
  startTimeAsDate.setMinutes(parseInt(startTime.slice(3), 10));

  const endTimeAsDate = new Date(); // Create a base Date object
  endTimeAsDate.setHours(parseInt(endTime.slice(0, 2), 10));
  endTimeAsDate.setMinutes(parseInt(endTime.slice(3), 10));

  const slots: string[] = [];

  while (startTimeAsDate < endTimeAsDate && startTimeAsDate !== endTimeAsDate) {
    const formattedTime = startTimeAsDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    slots.push(
      `${formattedTime} - ${new Date(
        startTimeAsDate.getTime() + gap * 60000
      ).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })}`
    );
    startTimeAsDate.setMinutes(startTimeAsDate.getMinutes() + gap);
  }

  return slots;
};

const AppointmentTimeDropdown = ({
  fromTime,
  toTime,
  duration,
}: {
  fromTime: string;
  toTime: string;
  duration: number;
}) => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const timeSlots = getTimeSlots(fromTime, toTime, duration);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(event.target.value);
  };

  return (
    <div>
      <select
        id="appointmentTime"
        value={selectedTime !== null ? selectedTime : ""}
        onChange={handleChange}
        className="form-control"
      >
        <option value="">Select Time</option>
        {timeSlots.map((slot) => (
          <option key={slot} value={slot}>
            {slot}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AppointmentTimeDropdown;
