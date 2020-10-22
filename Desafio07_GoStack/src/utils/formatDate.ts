const formatDate = (value: string): string => {
  console.log(value)
  const newValue = value.replace('T','-');
  const dates = newValue.split('-');

  var date = new Date(Date.UTC(Number(dates[0]), Number(dates[1]), Number(dates[2]),3,0,0 ));
  return Intl.DateTimeFormat('en-GB').format(date);
}

export default formatDate;
