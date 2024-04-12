import httpStatus from "http-status";

export const successResponse = (data: any, statusCode?: number) => {
  const response = {
    code: statusCode || httpStatus.OK,
    success: true,
    data,
  };

  return response;
};
