import moment from "moment";

export const dateConverter = (date: Date) => {
  return moment(date).format("DD/MM/YYYY");
};

export const dateConverterYMD = (date: Date) => {
  return moment(date).format("YYYY-MM-DD");
};
