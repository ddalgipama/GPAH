
export const formatDate = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}. ${m}. ${d}.`;
};

export const getIsoDate = (date: Date) => {
  return date.toISOString().split('T')[0];
};

export const getDayRange = (date: Date) => {
  const start = new Date(date);
  start.setDate(1);
  const end = new Date(date);
  end.setMonth(end.getMonth() + 1);
  end.setDate(0);
  return { start, end };
};

export const generateId = () => Math.random().toString(36).substr(2, 9);
