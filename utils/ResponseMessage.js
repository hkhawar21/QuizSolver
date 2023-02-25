export default function ResponseMessage(res, status, data, success, errors) {
  res.status(status).json({
    success,
    errors,
    data,
  });
}
