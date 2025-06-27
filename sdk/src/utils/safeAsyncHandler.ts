import { NextFunction, Request, RequestHandler, Response } from 'express';

type AsyncRequestHandler<P, ResBody, ReqBody, ReqQuery> = (
  req: Request<P, ResBody, ReqBody, ReqQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void | Response<ResBody>>;

function safeAsyncHandler<P, ResBody, ReqBody, ReqQuery>(
  fn: AsyncRequestHandler<P, ResBody, ReqBody, ReqQuery>,
): RequestHandler<P, ResBody, ReqBody, ReqQuery> {
  return function (req: Request<P, ResBody, ReqBody, ReqQuery>, res, next) {
    Promise.resolve(fn(req as any, res, next)).catch(next);
  };
}

export default safeAsyncHandler;
