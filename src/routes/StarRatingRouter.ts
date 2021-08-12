import { NextFunction, Request, Response } from "express";
import { Router } from "express";
import StarRatingController from "../controllers/StarRatingController";

class StarRatingValidator {
  public createStarRatingValidator(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { surveyTitle, maxCount, icon } = req.body;

    if (!surveyTitle || surveyTitle.trim() === "") {
      return res.status(400).json({
        message: '"surveyTitle" is required in body',
      });
    }

    if (!icon || icon.trim() === "") {
      return res.status(400).json({
        message: '"icon" is required in body',
      });
    }

    if (!Number(maxCount) || Number(maxCount < 0)) {
      return res.status(400).json({
        message: '"maxCount" is required in body',
      });
    }

    next();
  }

  public getStarRatingSurvey(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    if (!id || id.trim() === "") {
      return res.status(400).json({
        message: '"id" is required in params',
      });
    }

    next();
  }
}

const StarRatingRouter = Router();

StarRatingRouter.post(
  "/star-rating/create",
  new StarRatingValidator().createStarRatingValidator,
  StarRatingController.createStarRatingSurvey
);

StarRatingRouter.get(
  "/star-rating/get/:id",
  new StarRatingValidator().getStarRatingSurvey,
  StarRatingController.getStarRatingSurvey
);

export { StarRatingRouter };
