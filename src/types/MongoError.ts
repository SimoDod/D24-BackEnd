export type MongoError = Error & {
  code?: number;
  keyValue?: Record<string, string>;
};
