import { Request, Response, NextFunction} from "express";
export const validate = (schema: any) => (
  req: Request, 
  res: Response, 
  next: NextFunction) => {
    
  const result = schema.safeParse(req.body);

  // return error if validation fails
  if (!result.success) {
    console.log(`${result.error}`)
    return res.status(400).json({
      message: "Validation failed",
      errors: result.error.format(),
    });
  }

  // overwrite request body with clean data
  req.body = result.data;

  next();
};