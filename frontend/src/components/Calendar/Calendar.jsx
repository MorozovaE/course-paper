import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";

import { convertDateToUnix } from "../../utils/convertDateToUnix";
import { useDispatch, useSelector } from "react-redux";
import { setDateTime } from "../../store/features/tasksSlice";

export default function Calendar() {
  const dispatch = useDispatch();
  const selectedDateTime = useSelector((state) => state.tasks.dateTie);

  const onChangeDate = (date) => {
    dispatch(setDateTime(convertDateToUnix(date)));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDateTimePicker
        openTo="day"
        defaultDate={selectedDateTime}
        value={selectedDateTime}
        onAccept={(date) => onChangeDate(date)}
        sx={{
          width: { sm: 16, md: 16 },
          "& .MuiInputBase-root": {
            height: 16,
          },
          p: 0,
        }}
      />
    </LocalizationProvider>
  );
}
