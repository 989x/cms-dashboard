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
