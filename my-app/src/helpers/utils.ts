export const formatTimestamp = (timestamp, format) => {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  switch (format) {
    case "DD/MM/YYYY HH:II:SS":
      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

    case "YYYY-MM-DD HH:II:SS":
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    case "MM/DD/YYYY HH:II:SS":
      return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;

    default:
      throw new Error("Invalid format specified.");
  }
};

//
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

// const timestamp = 1620036000000; // Example timestamp (May 3, 2021 12:00:00 AM UTC)

// const formattedDate1 = formatTimestamp(timestamp, 'DD/MM/YYYY HH:II:SS');
// console.log(formattedDate1); // Output: 03/05/2021 00:00:00

// const formattedDate2 = formatTimestamp(timestamp, 'YYYY-MM-DD HH:II:SS');
// console.log(formattedDate2); // Output: 2021-05-03 00:00:00

// const formattedDate3 = formatTimestamp(timestamp, 'MM/DD/YYYY HH:II:SS');
// console.log(formattedDate3); // Output: 05/03/2021 00:00:00
