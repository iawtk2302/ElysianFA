export default function converTimeToFB(time) {
    if (time == null) return 0;
    const timeStampDate = time;
    const dateInMillis = timeStampDate.seconds * 1000;
  
    let date =
      'Ngày ' +
      new Date(dateInMillis).getDate() +
      ' Tháng ' +
      (new Date(dateInMillis).getMonth() + 1) +
      ' Năm ' +
      new Date(dateInMillis).getFullYear() +
      ' \n' +
      'Thời gian: ' +
      new Date(dateInMillis).toLocaleTimeString();
    return date;
  }