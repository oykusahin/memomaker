export const steps = ["/upload", "/gallery"];

export const getNextRoute = (current) => {
  const index = steps.indexOf(current);
  return index < steps.length - 1 ? steps[index + 1] : null;
};

export const getPreviousRoute = (current) => {
  const index = steps.indexOf(current);
  return index > 0 ? steps[index - 1] : null;
};
