export function getDayAnnotations(annotations, year, monthIndex, day) {
  return annotations[`${year}-${monthIndex}-${day}`] || [];
}
