export type ICredit = {
  _id: string;
  principalAmount: number;
  interestRate: number;
  currentInterestAmount: number;
  balance: number;
  creditDate: Date;
  dueDate: Date;
  settlements: ISettlement[];
  history: ICreditHistory[];
};

export type ISettlement = {
  _id: string;
  settlementAmount: number;
  interestAmount: number;
  settlementDate: Date;
};

export type ICreditHistory = {
  type: "Settlement" | "Adjustment";
  date: Date;
  note: string;
};

export type ICreditSummary = {
  _id: string;
  balance: number;
  creditDate: Date;
  dueDate: Date;
};
