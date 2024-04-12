import mongoose from "mongoose";
import { config } from "@configs/env";

export const connect = () =>
  mongoose.connect(config.mongoDatabaseURL as string);

export const disconnect = () => mongoose.disconnect();
