import { Schema, Model } from 'mongoose';

interface CatMg {
  postgreId: string;
  name: string;
  colour: string;
  sex: string;
  age: number;
}

const CatSchema = new Schema<CatMg, Model<CatMg>>({
  postgreId: { type: String, required: true },
  name: { type: String, required: true },
  colour: { type: String, required: true },
  sex: { type: String, required: true },
  age: { type: Number, required: true },
});

export { CatMg, CatSchema };
