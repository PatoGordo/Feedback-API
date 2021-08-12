import { model, Schema, Document } from "mongoose";

interface IStarRatingEvaluation {
  userIP: string | null;
  userAgent: string;
  userOS: string;
}

interface StarRatingModelInterface extends Document {
  title: string;
  maxCount: number;
  icon: string;
  evaluations: IStarRatingEvaluation[];
}

const StarRatingSchema = new Schema(
  {
    surveyTitle: {
      type: String,
      required: true,
    },
    maxCount: {
      type: Number,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    evaluations: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const StarRatingModel = model<StarRatingModelInterface>(
  "StarRatings",
  StarRatingSchema
);
