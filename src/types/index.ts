import { Document } from "mongoose";

export enum ENVIRONMENT {
  DEVELOPMENT = "DEVELOPMENT",
  PRODUCTION = "PRODUCTION",
}

export interface IPlugins {
  paginate: any;
}

export interface IScrape extends Partial<Document> {
  hostname: string;
  fileId: string;
  url: string;
  isCrawled?: boolean;
  isScraped?: boolean;
  isProcessed?: boolean;
}
