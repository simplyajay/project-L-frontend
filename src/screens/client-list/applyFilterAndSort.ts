import { IClientSummary } from "@/lib/types/client";
import { IFilter } from "./components/FilterAndSortModal";

interface IApplyFilterAndSort {
  data: IClientSummary[];
  search?: string;
  filter: IFilter[];
  sortBy: string;
  direction: 1 | -1;
}

const filterMap: Record<IFilter["key"], (d: IClientSummary) => boolean> = {
  noCredit: (d) => {
    const balance = d.unsettledCredit?.balance ?? 0;
    return balance <= 0;
  },
  overDue: (d) => {
    const credit = d.unsettledCredit;
    return credit ? new Date(credit.dueDate) < new Date() : false;
  },
  notOverDue: (d) => {
    const credit = d.unsettledCredit;
    return credit ? new Date(credit.dueDate) >= new Date() : false;
  },
};

export const applyFilterAndSort = ({
  data,
  search,
  filter = [],
  sortBy,
  direction,
}: IApplyFilterAndSort): IClientSummary[] => {
  let toBeSorted: IClientSummary[] = data;

  if (search) {
    toBeSorted = data.filter((d) => {
      const fullName = `${d.firstname} ${d.lastname}`;
      return fullName.toLowerCase().includes(search.toLowerCase());
    });
  }

  if (filter.length > 0) {
    toBeSorted = toBeSorted.filter((d) => filter.some((f) => filterMap[f.key](d)));
  }

  const sorted = [...toBeSorted].sort((a, b) => {
    if (sortBy === "balance") {
      return (a.totalBalance - b.totalBalance) * direction;
    }

    if (sortBy === "dueDate") {
      if (!a.unsettledCredit?.dueDate && !b.unsettledCredit?.dueDate) return 0; // both have no unsettled credits
      if (!a.unsettledCredit?.dueDate) return 1 * direction;
      if (!b.unsettledCredit?.dueDate) return -1 * direction;

      const aDate = Date.parse(a.unsettledCredit.dueDate.toString());
      const bDate = Date.parse(b.unsettledCredit.dueDate.toString());

      return (aDate - bDate) * direction;
    }

    const key = sortBy as keyof IClientSummary;
    const aValue = a[key];
    const bValue = b[key];

    if (!isNaN(Number(aValue)) && !isNaN(Number(bValue))) {
      return (Number(aValue) - Number(bValue)) * direction;
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return aValue.localeCompare(bValue) * direction;
    }
    return 0;
  });

  return sorted;
};
