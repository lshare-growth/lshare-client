const timeForToday = (value: string) => {
  if (!value) {
    return '';
  }
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const today = new Date();
  const timeValue = new Date(value);
  const betweenTime = Math.floor((today.getTime() - timeValue.getTime() - KR_TIME_DIFF) / 1000 / 60);

  if (betweenTime < 1) return '방금전';
  if (betweenTime < 60) {
    return `${betweenTime}분전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
    return `${betweenTimeDay}일전`;
  }

  return `${Math.floor(betweenTimeDay / 365)}년전`;
};

export default timeForToday;
