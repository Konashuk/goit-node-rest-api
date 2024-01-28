export const handelMoongoseError = (error, data, next) => {
  error.starus = 400;
  next();
};
