export const getDaysInMonth = (year: string, month: string): string[] => {
  if (!year || !month) return [];

  const monthIndex = new Date(Date.parse(month + " 1, 2024")).getMonth();
  const date = new Date(parseInt(year), monthIndex + 1, 0);
  const days = [];
  for (let i = 1; i <= date.getDate(); i++) {
    days.push(i.toString());
  }
  return days;
};

export const generateYearOptions = (
  currentYear: number,
): { value: string; label: string }[] => {
  const years = [];
  for (let i = currentYear; i >= currentYear - 100; i--) {
    years.push({ value: i.toString(), label: i.toString() });
  }
  return years;
};

export const generateMonthOptions = (): { value: string; label: string }[] => {
  return [
    { value: "January", label: "January" },
    { value: "February", label: "February" },
    { value: "March", label: "March" },
    { value: "April", label: "April" },
    { value: "May", label: "May" },
    { value: "June", label: "June" },
    { value: "July", label: "July" },
    { value: "August", label: "August" },
    { value: "September", label: "September" },
    { value: "October", label: "October" },
    { value: "November", label: "November" },
    { value: "December", label: "December" },
  ];
};
