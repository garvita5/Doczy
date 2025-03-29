import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "₹";

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);

    let age = today.getFullYear() - birthDate.getFullYear();
    // Check if birthday has occurred this year
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--; // Subtract 1 if the birthday hasn't occurred yet
    }

    return age;
  };

  //slot date
  const months = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("-");
    return dateArray[0] + " " + months[dateArray[1]] + " " + dateArray[2];
  };

  const value = {
    calculateAge,
    slotDateFormat,
    currencySymbol,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
