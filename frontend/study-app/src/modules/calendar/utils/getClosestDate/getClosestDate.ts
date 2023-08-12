type DateInput = string;

export const getClosestDate = (datesList: DateInput[], referenceDate: DateInput): DateInput => {
  let closestDate: DateInput = datesList[0];
  let smallestDifference: number = Math.abs(new Date(datesList[0]).getTime() - new Date(referenceDate).getTime());

  datesList.forEach((date: DateInput) => {
    const diff: number = Math.abs(new Date(date).getTime() - new Date(referenceDate).getTime());
    if (diff < smallestDifference) {
      smallestDifference = diff;
      closestDate = date;
    }
  });

  return closestDate;
};
