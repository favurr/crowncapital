export const TRANSACTION_TYPE_MAP = {
  WITHDRAWN: "WITHDRAWN",
  TRANSFERRED: "TRANSFERRED",
  DEPOSITED: "DEPOSITED",
  PENDING: "PENDING",
} as const;

export type TransactionTypeFrontend = keyof typeof TRANSACTION_TYPE_MAP;

export const TRANSACTION_TYPES = Object.values(
  TRANSACTION_TYPE_MAP,
) as TransactionTypeFrontend[];
