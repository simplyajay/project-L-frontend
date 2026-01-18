export type CreditType = {
  _id: string;
  principalAmount: number;
  interestRate: number;
  currentInterestAmount: number;
  balance: number;
  creditDate: Date;
  dueDate: Date;
  settlements: SettlementType[];
  history: HistoryType[];
};

export type SettlementType = {
  _id: string;
  settlementAmount: number;
  interestAmount: number;
  settlementDate: Date;
};

export type HistoryType = {
  _id: string;
  type: "Settlement" | "Adjustment";
  date: Date;
  note: string;
};

export type CreditSnapshotType = Pick<
  CreditType,
  "_id" | "principalAmount" | "balance" | "creditDate" | "dueDate"
>;
