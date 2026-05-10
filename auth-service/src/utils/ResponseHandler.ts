import { Response } from 'express';

export class ResponseHandler {
  static success(res: Response, data: any, statusCode: number = 200) {
    return res.status(statusCode).json({
      status: 'success',
      results: Array.isArray(data) ? data.length : undefined,
      data,
    });
  }
}
