export function getDaysToNextBDay(
  now: Date = new Date(),
  dob: Date = new Date(1990, 3, 29)
) {
  const next = getNextBirthday(dob);

  let diff = next.getTime() - now.getTime();

  return timestampToDays(diff);
}

export function timestampToDays(timestamp: number) {
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const days = Math.floor(timestamp / millisecondsPerDay);
  return days;
}

function getNextBirthday(dob: Date = new Date(1990, 3, 29)) {
  // Create new Date objects for the current date and the date of birth
  const today = new Date();
  // const dob = new Date(1990, 3, 29);

  // Get the year of the next birthday
  let nextBirthdayYear = today.getFullYear();
  if (
    today.getMonth() > dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() > dob.getDate())
  ) {
    nextBirthdayYear++;
  }

  // Create a new Date object for the next birthday and return it
  const nextBirthday = new Date(
    nextBirthdayYear,
    dob.getMonth(),
    dob.getDate()
  );
  return nextBirthday;
}
