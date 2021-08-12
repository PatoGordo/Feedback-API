import { Request, Response } from "express";
import { StarRatingModel } from "../models/StarRatingModel";

class StarRatingControllerController {
  public async index(req: Request, res: Response) {}

  public async createStarRatingSurvey(req: Request, res: Response) {
    const { surveyTitle, maxCount, icon } = req.body;

    const survey = new StarRatingModel({
      surveyTitle,
      maxCount,
      icon,
      evaluations: [],
    });

    try {
      await survey.save();

      return res.status(201).json({
        survey,
      });
    } catch (err) {
      return res.status(400).json({
        err,
      });
    }
  }

  public async getStarRatingSurvey(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const survey = await StarRatingModel.findOne({
        _id: id,
      });

      if (!survey) {
        return res.status(400).json({
          message: "There is no survey with this id",
        });
      }

      return res.status(200).json({
        survey,
      });
    } catch (err) {
      return res.status(400).json({
        message: "There is no survey with this id",
      });
    }
  }

  public addEvaluation(req: Request, res: Response) {}

  public getEvaluations(req: Request, res: Response) {}
}

export default new StarRatingControllerController();
