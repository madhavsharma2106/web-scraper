import { Link } from "@models/link";
import { ILink } from "@types";
import { FilterQuery } from "mongoose";

export const saveLinkMetaDataToDB = async (scrape: ILink) => {
  return await Link.create(scrape);
};

export const findLinkByURL = async (data: FilterQuery<ILink>) => {
  return await Link.findOne(data);
};
