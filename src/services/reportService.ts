import { pickBy } from "lodash-es";
import Counter from "../models/Counter";
import Report from "../models/Report";
import { ReportStatus } from "../types/enums/Report";
import type { ReportData } from "../types/Report";
import errMsg from "../utils/errorConstants";


export const createReport = async (userId: string, reportData: ReportData) => {
  const reportNumber = await Counter.findOneAndUpdate(
    { name: "reportNumber" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true },
  );

  const newReport = new Report({
    ...reportData,
    reportNumber: reportNumber.seq,
    submitter: userId,
    status: ReportStatus.NEW,
  });

  const savedReport = await newReport.save();

  if (!savedReport) {
    throw new Error(errMsg.reportSubmitFail);
  }

  return savedReport;
};

export const updateReport = async (report: ReportData, reportId: string) => {
  const updateData = pickBy(report, (value) => {
    if (typeof value === "string") {
      return value !== "";
    } else if (Array.isArray(value)) {
      return value.length > 0;
    } else if (typeof value === "object" && value !== null) {
      return true;
    }
    return value !== undefined;
  });

  if (Object.keys(updateData).length === 0) {
    throw new Error(errMsg.reportSubmitFail);
  }

  return Report.findByIdAndUpdate(reportId, updateData, {
    new: true,
    runValidators: true,
  });
};
