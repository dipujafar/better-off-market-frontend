import { ZodError } from "zod";

export const zodFormErrorModification = (err: ZodError) => {
  return Object.values(err)?.[0]?.message || Object.values(err)?.[0]?.[0]?.message || "Please recheck the form completion.";
};