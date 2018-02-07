// Taken from https://github.com/gitpoint/git-point
export const abbreviateNumber = count => {
  const thousandUnit = 'K';

  if (count > 999) {
    return count % 1000 < 50
      ? (count / 1000).toFixed(0) + thousandUnit
      : (count / 1000).toFixed(1) + thousandUnit;
  }

  return count;
};

export const secondsToTime = time => {
  return ~~(time / 60) + ':' + (time % 60 < 10 ? '0' : '') + time % 60;
};
