import { Model, Schema, model } from "mongoose";
const { toJSON, paginate } = require("./plugins");
import { ILink, IPlugins } from "@types";

interface ILinkModel extends Model<ILink>, IPlugins {}

const schema = new Schema<ILink>(
  {
    hostname: {
      type: String,
      required: true,
    },
    fileId: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
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

export const Link: ILinkModel = model<ILink, ILinkModel>("Link", schema);
