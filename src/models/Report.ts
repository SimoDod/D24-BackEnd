import { Schema, model } from "mongoose";
import { ReportStatus } from "../types/enums/Report";
import type IReport from "../types/interfaces/IReport";
import User from "./User";
import validator from "validator";

const ReportSchema = new Schema<IReport>(
  {
    reviewersEmail: [
      {
        type: String,
        required: true,
        validate: {
          validator: async function (email: string) {
            if (!validator.isEmail(email)) {
              throw new Error(`${email} is not a valid email address`);
            }

            const userExists = await User.exists({ email });

            if (!userExists) {
              throw new Error(`No user found with email: ${email}`);
            }

            return true;
          },
          message: (props) =>
            `${props.value} is not a valid email or not a registered user!`,
        },
      },
    ],
    segment: { type: String, required: true },
    soNumber: { type: String, required: true },
    lhm: { type: String, required: true },
    asmlOffice: { type: String, required: true },
    machineNumber: { type: String, required: true },
    timestampCraftsmanship: { type: String, required: true },
    hoursDelay: { type: String, required: true },
    techBucket: { type: String, required: true },
    machineFamily: { type: String, required: true },
    description: { type: String, required: true },
    mealTime: { type: Boolean, default: false },
    continuousWork: { type: Boolean, default: false },
    experienced: { type: Boolean, default: false },
    gotTraining: { type: Boolean, default: false },
    customerInterference: { type: Boolean, default: false },
    workAlone: { type: Boolean, default: false },
    background: { type: String, required: true },
    myselInfluence: { type: String, required: true },
    riskReduceDescription: { type: String, required: true },
    teamInfluence: { type: String, required: true },
    managerInfluence: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(ReportStatus),
      default: ReportStatus.NEW,
    },
    archived: { type: Boolean, default: false },
    permissions: {
      CanSubmit: { type: Boolean, default: false },
      CanUnsubmit: { type: Boolean, default: false },
      CanReview: { type: Boolean, default: false },
      CanEdit: { type: Boolean, default: false },
      CanAddEditActions: { type: Boolean, default: false },
      CanSubmitActions: { type: Boolean, default: false },
      CanClose: { type: Boolean, default: false },
      CanDelete: { type: Boolean, default: false },
      CanEditClose: { type: Boolean, default: false },
      CanAlwaysDelete: { type: Boolean, default: false },
    },
    answers: [
      {
        id: { type: Number, required: true },
        questionNumber: { type: Number, required: true },
        reportId: { type: Number },
        answer: { type: Schema.Types.Mixed, required: true },
        updateNumber: { type: Number, required: true },
      },
    ],
    reportNumber: { type: String },
    submitter: { type: Schema.Types.ObjectId, ref: "User", required: true },
    filePath: { type: String, default: null },
    filePathSecond: { type: String, default: null },
    filePathThird: { type: String, default: null },
    downloadFileURL: { type: String, default: null },
    downloadFileUrlSecond: { type: String, default: null },
    downloadFileUrlThird: { type: String, default: null },
  },
  { timestamps: true },
);

const Report = model<IReport>("Report", ReportSchema);

export default Report;
