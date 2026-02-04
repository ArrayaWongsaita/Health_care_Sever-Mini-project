import type { Request, Response, NextFunction } from "express";

export const responseExtend = (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.ok = function <T>(data: T) {
    res.status(200).json({
      success: true,
      data,
    });
  };

  res.created = function <T>(data: T) {
    res.status(201).json({
      success: true,
      data,
    });
  };

  res.noContent = function () {
    res.status(204).send();
  };

  next();
};
