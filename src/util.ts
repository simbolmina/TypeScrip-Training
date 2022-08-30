export const dateStringToDate = (dateString: string): Date => {
  //18/10/2018
  const dateParts = dateString.split("/").map((value: string): number => {
    // ['28','10.'2018]
    return parseInt(value);
  });

  return new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
};
