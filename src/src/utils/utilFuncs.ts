/**
 * Converts a date string to a JavaScript Date object.
 * Supports "YYYY-MM-DD" and "DD/MM/YYYY" formats.
 *
 * @param dateString The date string to convert.
 * @returns A JavaScript Date object.
 */
export const convertToDate = (dateString: string): Date => {
  let parts: string[];

  if (dateString.includes("-")) {
    // "YYYY-MM-DD" format
    parts = dateString.split("-");
  } else if (dateString.includes("/")) {
    // "DD/MM/YYYY" format
    parts = dateString.split("/").reverse();
  } else {
    throw new Error("Invalid date format");
  }

  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed in JavaScript
  const day = parseInt(parts[2], 10);

  return new Date(year, month, day);
};
