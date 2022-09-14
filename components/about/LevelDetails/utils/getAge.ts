import { diff_years } from "./diff_years";

export function getAge() {
  const bday = new Date(1990, 3, 29);
  const age = diff_years(new Date(), bday);
  return age;
}
