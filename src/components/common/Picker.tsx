import React from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

interface Picker {
  defaultValue?: Date;
  minDate: Date;
  maxDate: Date;
  handleDateChange: (date: Date) => void;
  handleDismiss: () => void;
}

const Picker = ({ minDate, maxDate, defaultValue, handleDateChange, handleDismiss }: Picker) => {
  return (
    <DateTimePicker
      mode="date"
      minimumDate={minDate ?? new Date(2020, 0, 1)}
      maximumDate={maxDate ?? new Date(2030, 11, 31)}
      value={defaultValue ?? new Date(Date.now())}
      onChange={(e, v) => {
        if (e.type === "set" && v) handleDateChange(v);

        if (e.type === "dismissed") handleDismiss();
      }}
    />
  );
};

export default Picker;
