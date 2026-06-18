import { Request, Response, NextFunction} from "express";
export const view = () => (
  req: Request, 
  res: Response, 
  next: NextFunction) => {
    
    console.log(`${req.method}: ${req.path}`);

  next();
};