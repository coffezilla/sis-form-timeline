// export const add30Seconds = (timestamp: string) => {
//   // Convert the timestamp to a Date object
//   const date = new Date(timestamp);

//   // Add 30 seconds
//   date.setSeconds(date.getSeconds() + 30);

//   // Format the result as "YYYY-MM-DD HH:mm:ss"
//   const result = date.toISOString().slice(0, 19).replace("T", " ");

//   return result;
// };

export const addSeconds = (timestamp: string, seconds: number) => {
  // Convert the timestamp to a Date object
  const date = new Date(timestamp);

  // Add seconds
  date.setSeconds(date.getSeconds() + seconds);

  // Format the result as "DD/MM/YYYY HH:mm:ss"
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "America/Sao_Paulo", // Set the time zone to Brazil (America/Sao_Paulo)
    hour12: false, // Display in 24-hour format
  };

  const result = date.toLocaleString("en-US", options);

  return result;
};

export const formatTimestamp = (timestamp: string) => {
  // Convert the timestamp to a Date object
  const date = new Date(timestamp);

  // Extract the date and time components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // Format the result as "MM/DD/YYYY, HH:mm:ss"
  const result = `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;

  return result;
};

export const convertTimestampToNew = (timestamp: string) => {
  // Split the timestamp into its date and time components
  const parts = timestamp.split(", ");
  const datePart = parts[0];
  const timePart = parts[1];

  // Split the date component into its month, day, and year parts
  const dateParts = datePart.split("/");
  const month = parseInt(dateParts[0]) - 1; // Subtract 1 from the month since JavaScript months are zero-based
  const day = parseInt(dateParts[1]);
  const year = parseInt(dateParts[2]);

  // Split the time component into its hour, minute, and second parts
  const timeParts = timePart.split(":");
  const hours = parseInt(timeParts[0]);
  const minutes = parseInt(timeParts[1]);
  const seconds = parseInt(timeParts[2]);

  // Create a new Date object using the components
  const date = new Date(year, month, day, hours, minutes, seconds);

  // Format the result using the default format of `new Date()`
  const result = date.toLocaleString();

  return result;
};
