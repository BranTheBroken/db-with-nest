import { Schema, Model } from 'mongoose';

interface User {
  name: string;
  birthday: Date;
  hobbys: string[];
  friendsIds: string[];
}

const UserSchema = new Schema<User, Model<User>>({
  name: { type: String, required: true },
  birthday: { type: Date, required: true },
  hobbys: { type: [String], required: true },
  friendsIds: { type: [String], required: false },
});

export { User, UserSchema };
