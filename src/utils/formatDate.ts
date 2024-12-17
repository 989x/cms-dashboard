export const formatToThaiDate = (isoDate: string | null): string => {
  if (!isoDate) return 'ไม่ระบุวันที่';

  const date = new Date(isoDate);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const thaiDate = date.toLocaleDateString('th-TH', options);
  return thaiDate;
};

export const calculateDuration = (start: string, end: string): number => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const diffTime = endDate.getTime() - startDate.getTime();
  const duration = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return duration >= 0 ? duration : 0;
};

export const calculateRemainingDays = (end: string): number => {
  const today = new Date();
  const endDate = new Date(end);

  const diffTime = endDate.getTime() - today.getTime();
  const remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return remainingDays >= 0 ? remainingDays : 0;
};
