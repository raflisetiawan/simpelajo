const monthNames = [
  "Januari",
  "Februari",
  "March",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "October",
  "November",
  "Desember",
];

const today = new Date();
const yyyy = today.getFullYear();
let mm: any = monthNames[today.getMonth()];
let dd: any = today.getDate();

if (dd < 10) dd = "0" + dd;
if (mm < 10) mm = "0" + mm;

const formattedToday = dd + ", " + mm + ", " + yyyy;

const formatDate = (data: any) => {
  const date = new Date(data);
  var str =
    date.getDay() +
    " " +
    monthNames[date.getMonth()] +
    " " +
    date.getFullYear();
  return str;
};

export { formattedToday, formatDate };
