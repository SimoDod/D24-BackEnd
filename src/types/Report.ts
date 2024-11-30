export type Answer = {
  id: number;
  questionNumber: number;
  reportId: number;
  answer: string | number;
  updateNumber: number;
};

export type ReportData = {
  reviewersEmail: string[];
  segment: string;
  office: string;
  machineNumber: string;
  timestampCraftsmanship: string;
  hoursDelay: string;
  techBucket: string;
  machineFamily: string;
  description: string;
  answers: Answer[];
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
  reportNumber: string;
  filePath?: string;
  filePathSecond?: string;
  filePathThird?: string;
  downloadFileURL?: string;
  downloadFileUrlSecond?: string;
  downloadFileUrlThird?: string;
};
