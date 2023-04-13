import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";

export default function Calendar({ onAccept }) {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDateTimePicker
        openTo="day"
        defaultValue={null}
        type="datetime-local"
        onAccept={onAccept}
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
