import "@testing-library/jest-dom";
import { getDateRange } from "./getDaysToNextBday";

describe("It returns the correct difference, given 2 dates", () => {
  test("One day", () => {
    const year = new Date(new Date().getFullYear(), 4, 29);
    const now = new Date(year.getFullYear(), 4, 29);
    const next = new Date(year.getFullYear(), 4, 30);

    expect(getDateRange(next, now)).toBe(1);
  });

  test("Half year", () => {
    const year = new Date(new Date().getFullYear(), 4, 29);
    const now = new Date(year.getFullYear(), 0, 1);
    const next = new Date(year.getFullYear(), 6, 2);

    expect(getDateRange(next, now)).toBe(182);
  });

  test("Previous date", () => {
    const year = new Date(new Date().getFullYear(), 4, 29);
    const now = new Date(year.getFullYear(), 0, 1);
    const next = new Date(year.getFullYear(), 6, 2);

    expect(getDateRange(now, next)).toBe(182);
  });
});
