const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  timezone: "UTC",
  hour: "numeric",
  minute: "numeric",
};

export const convertDateToStr = (dateTime) => {
  if (dateTime) {
    let date = new Date(dateTime);
    return date.toLocaleDateString("ru", options).replace("г. в ", "");
  }
};
