export function getMonthMeta(bsData, year, monthIndex) {
  const yearData = bsData.years[year];
  if (!yearData) return null;

  const daysInMonth = yearData.months[monthIndex];
  const offset = yearData.months
    .slice(0, monthIndex)
    .reduce((a, b) => a + b, 0);

  const startWeekday = (yearData.startWeekday + offset) % 7;
  return { daysInMonth, startWeekday };
}

export function formatNumber(num, locale) {
  if (!locale.digits) return num;
  return String(num)
    .split("")
    .map((d) => (/\d/.test(d) ? locale.digits[d] : d))
    .join("");
}
