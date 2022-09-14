export function diff_years(dt2: Date, dt1: Date) {
  let diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60 * 60 * 24;
  return Math.abs(Math.round(diff / 365.25));
}

export function getAge() {
  const bday = new Date(1990, 3, 29);
  const age = diff_years(new Date(), bday);
  return age;
}

export function getDaysToNextBday() {
  const now = new Date();
  const next = new Date(now.getFullYear() + 1, 4, 29);

  let diff = Math.abs(next.getTime() - now.getTime());
  const diffDays = parseInt((diff / (1000 * 60 * 60 * 24)).toString(), 10);
  console.log({ now, next });

  return diffDays;
}
