export function getDaysToNextBday() {
  const now = new Date();
  const next = new Date(now.getFullYear() + 1, 3, 29);

  return getDateRange(now, next);
}

export function getDateRange(date1: Date, date2: Date) {
  let diff = Math.abs(date1.getTime() - date2.getTime());
  const days = Math.ceil(diff / (1000 * 3600 * 24));
  return days;
}
