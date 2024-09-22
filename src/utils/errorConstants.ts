const errMsg = {
  invalidCredentials: "Invalid credentials",
  createSuccess: "User created successfully",
  duplicateValue: "Duplicate value for field:",
  mustBeUnique: "Must be unique.",
  validationError: "Validation error",
  somethingWrong: "Something went wrong",
  internalError: "Internal Server Error",
  mongoUriNotDefined:
    "MONGODB_URI is not defined in the environment variables.",
  failAcquireToken: "Failed to acquire jwt token",
  invalidToken: "Invalid token.",
  missingToken: "Missing token",
  userNotFound: "User not found",
  userIdNotFound: "User ID not found in request",
  notFound: "Resource not found",
  reportSubmitFail: "Submitting of report failed",
} as const;

export default errMsg;
