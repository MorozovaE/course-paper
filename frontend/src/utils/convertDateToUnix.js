export const convertDateToUnix = (date) => {
  const d = new Date(date)
  return d.getTime()
}