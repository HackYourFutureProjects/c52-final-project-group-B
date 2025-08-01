export const createAndThrowError = (status, messageText) => {
  const error = new Error(messageText);
  error.status = status;
  throw error;
};
