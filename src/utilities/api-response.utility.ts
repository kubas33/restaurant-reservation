import { Response } from 'express';
import httpStatusCodes from 'http-status-codes';

// Interfaces
import { IOverrideRequest, IPagination } from '../interfaces/common.interface';

// Errors
import { StringError } from '../errors/string.error';

export default class ApiResponse {
  static result = (
     res: Response,
     data: object,
     status: number = 200,
     token?: string,
     pagination?: IPagination,
  ) => {
    res.status(status);

    let responseData: any = { data, success: true };

    if (token) {
      responseData.token = token;
    }

    if (pagination) {
      responseData = { ...responseData, pagination };
    }

    res.json(responseData);
  };

  static error = (
     res: Response,
     status: number = 400,
     error: string = httpStatusCodes.getStatusText(status),
     override: IOverrideRequest = null,
  ) => {
    res.status(status).json({
      override,
      error: {
        message: error,
      },
      success: false,
    });
  };

  static exception(res: Response, error: any) {
    if (error instanceof StringError) {
      return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, error.message);
    }
    return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, 'Something went wrong');
  }
}
