import { Model, Schema, model } from "mongoose";
const { toJSON, paginate } = require("./plugins");
import { IScrape, IPlugins } from "@types";

interface IScrapeModel extends Model<IScrape>, IPlugins {}

const schema = new Schema<IScrape>(
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
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

schema.plugin(toJSON);
schema.plugin(paginate);

export const Scrape: IScrapeModel = model<IScrape, IScrapeModel>(
  "Scrape",
  schema
);
