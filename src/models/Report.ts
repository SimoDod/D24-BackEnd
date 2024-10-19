import { Schema, model } from "mongoose";
import { ReportStatus } from "../types/enums/Report";
import type IReport from "../types/interfaces/IReport";
import User from "./User";
import validator from "validator";

const getRequredFieldMessage = (requiredField: string) =>
  `${requiredField} is required`;

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
    segment: {
      type: String,
      required: [true, getRequredFieldMessage("Segment")],
    },
    office: {
      type: String,
      required: [true, getRequredFieldMessage("Office")],
    },
    machineNumber: {
      type: String,
      required: [true, getRequredFieldMessage("Machine Number")],
    },
    timestampCraftsmanship: {
      type: String,
      required: [true, getRequredFieldMessage("Time of Craftsmanship")],
    },
    hoursDelay: {
      type: String,
      required: [true, getRequredFieldMessage("Hours Delay")],
    },
    techBucket: {
      type: String,
      required: [true, getRequredFieldMessage("Tech Bucket")],
    },
    machineFamily: {
      type: String,
      required: [true, getRequredFieldMessage("Machine Family")],
    },
    description: {
      type: String,
      required: [true, getRequredFieldMessage("Descirption")],
    },
    mealTime: { type: Boolean, default: false },
    continuousWork: { type: Boolean, default: false },
    experienced: { type: Boolean, default: false },
    gotTraining: { type: Boolean, default: false },
    customerInterference: { type: Boolean, default: false },
    workAlone: { type: Boolean, default: false },
    background: { type: String, required: false },
    myselInfluence: { type: String, required: false },
    riskReduceDescription: { type: String, required: false },
    teamInfluence: { type: String, required: false },
    managerInfluence: { type: String, required: false },
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
