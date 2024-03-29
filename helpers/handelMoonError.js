export const handelMoongoseError = (status, message, next) => {
  const error = new Error(message);
  error.status = status;

  if (next) {
    next(error);
  } else {
    throw error;
  }
};
