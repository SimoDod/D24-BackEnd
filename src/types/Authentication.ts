import type { Request } from "express";

export type AuthenticatedRequest = {
  user?: string;
} & Request;
