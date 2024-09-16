const errMsg = {
  invalidCredentials: "Invalid credentials",
  createSuccess: "User created successfully",
  duplicateValue: "Duplicate value for field:",
  mustBeUnique: "must be unique.",
  validationError: "Validation error",
  somethingWrong: "Something went wrong",
  internalError: "Internal Server Error",
  mongoUriNotDefined:
    "MONGODB_URI is not defined in the environment variables.",
  failAcquireToken: "Failed to acquire jwt token",
} as const;

export default errMsg;
