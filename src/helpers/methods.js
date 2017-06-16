// used primarily for replacing the periods in emails
export function sanitize(text) {
  return text.split(" ").join("-").split(".").join("-");
}

export function capitalize(string) {
  return string ? string.substring(0, 1).toUpperCase() + string.substring(1, string.length) : '';
}
