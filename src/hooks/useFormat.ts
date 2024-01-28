export const useFormat = (totalSecond: number | string): string => {
  // check totalSecond as string or number
  if (typeof totalSecond === "string") {
    totalSecond = Number(totalSecond); // if string then convert to number
  }
  const minutes = Math.trunc(totalSecond / 60); // dividate by 60 and remove all decimal
  const seconds = totalSecond % 60; // use reminder as second
  let secondWithZero: string;
  if (seconds < 10) {
    // if second is lower then 10 then add 0. Like 05
    secondWithZero = `0${seconds}`;
  } else {
    secondWithZero = seconds.toString();
  }
  const formated = `${minutes}:${secondWithZero}`;
  return formated;
};

const time = useFormat("420");
console.log(time);
