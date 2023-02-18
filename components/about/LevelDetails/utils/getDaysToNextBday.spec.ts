import "@testing-library/jest-dom";
import { getDaysToNextBDay } from "./getDaysToNextBday";

describe("It returns the correct difference, given 2 dates", () => {
  test("One day", () => {
    const year = new Date(new Date().getFullYear(), 4, 29);
    const now = new Date(year.getFullYear(), 4, 29);
    const next = new Date(year.getFullYear(), 4, 30);

    expect(getDaysToNextBDay(now, next)).toBe(1);
  });

  test("Half year", () => {
    const year = new Date().getFullYear();
    console.log(year);

    const now = new Date(year, 6, 2);
    const next = new Date(year, 11, 31);

    expect(getDaysToNextBDay(now, next)).toBe(182);
  });
});
