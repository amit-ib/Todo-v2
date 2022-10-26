import moment from "moment";

export const dateConverter = (date: Date) => {
  return moment(date).format("DD/MM/YYYY");
};
