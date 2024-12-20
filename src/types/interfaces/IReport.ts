import type { Document, Types } from "mongoose";
import type { ReportStatus } from "../enums/Report";
import type IUser from "./IUser";

type IReport = {
  reviewersEmail: Types.ObjectId[];
  segment: string;
  office: string;
  machineNumber: string;
  timestampCraftsmanship: string;
  hoursDelay: string;
  techBucket: string;
  machineFamily: string;
  description: string;
  mealTime: boolean;
  continuousWork: boolean;
  experienced: boolean;
  gotTraining: boolean;
  customerInterference: boolean;
  workAlone: boolean;
  background: string;
  myselInfluence: string;
  riskReduceDescription: string;
  teamInfluence: string;
  managerInfluence: string;
  status: ReportStatus;
  archived: boolean;
  permissions: {
    CanSubmit: boolean;
    CanUnsubmit: boolean;
    CanReview: boolean;
    CanEdit: boolean;
    CanAddEditActions: boolean;
    CanSubmitActions: boolean;
    CanClose: boolean;
    CanDelete: boolean;
    CanEditClose: boolean;
    CanAlwaysDelete: boolean;
  };
  answers: Types.ObjectId[];
  reportNumber: string;
  submitter: Types.ObjectId | IUser;
  filePath: string | null;
  filePathSecond: string | null;
  filePathThird: string | null;
  downloadFileURL: string | null;
  downloadFileUrlSecond: string | null;
  downloadFileUrlThird: string | null;
} & Document;

export default IReport;