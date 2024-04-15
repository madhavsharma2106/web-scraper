import { Model, Schema, model } from "mongoose";
const { toJSON, paginate } = require("./plugins");
import { IPage, IPlugins } from "@types";

interface IPageModel extends Model<IPage>, IPlugins {}

const schema = new Schema<IPage>(
  {
    hostname: {
      type: String,
      required: true,
    },
    fileId: {
      type: String,
    },
    url: {
      type: String,
      required: true,
      unique: true,
    },
    isCrawled: {
      type: Boolean,
      default: false,
    },
    isScraped: {
      type: Boolean,
      default: false,
    },
    isProcessed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

schema.plugin(toJSON);
schema.plugin(paginate);

export const Page: IPageModel = model<IPage, IPageModel>("Page", schema);
