import { z } from "zod";

export const bankSchema = z.object({
  BANK: z.string().min(1, "Bank name is required"),
  IFSC: z.string().min(11, "IFSC must be 11 characters").max(11),
  BRANCH: z.string().min(1, "Branch name is required"),
  ADDRESS: z.string().min(1, "Address is required"),
  CITY1: z.string().min(1, "City is required"),
  CITY2: z.string().optional(),
  STATE: z.string().min(1, "State is required"),
  STD_CODE: z.number().optional(),
  PHONE: z.number().optional(),
});

export const bankSearchSchema = z.object({
  bank: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  branch: z.string().optional(),
  page: z.number().optional(),
  limit: z.number().optional(),
  sort: z.string().optional(),
  order: z.enum(["asc", "desc"]).optional(),
});
