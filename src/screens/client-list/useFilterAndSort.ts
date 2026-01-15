import { useState, useRef } from "react";
import { SortProps, FilterProps } from "./components/FilterAndSortModal";
import { Keyboard } from "react-native";
import { isEqual } from "lodash";

export type FilterAndSortProps = SortProps | FilterProps;

const defaultSort: SortProps = { type: "sortBy", key: "createdAt", value: "Created" };

const defaultFilters: FilterProps[] = [
  { type: "filter", key: "overDue", value: "Overdue" },
  { type: "filter", key: "notOverDue", value: "Up to date" },
  { type: "filter", key: "noCredit", value: "No Credit" },
];

const filterAndSortItems: FilterAndSortProps[] = [
  { type: "sortBy", key: "createdAt", value: "Created" },
  { type: "sortBy", key: "firstname", value: "Name" },
  { type: "sortBy", key: "balance", value: "Balance" },
  { type: "sortBy", key: "dueDate", value: "Due Date" },
  ...defaultFilters,
];

export const useFilterAndSort = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<1 | -1>(1);
  const [selectedFilters, setSelectedFilters] = useState<FilterProps[]>(defaultFilters);
  const [sortBy, setSortBy] = useState<SortProps>(defaultSort);

  const appliedSortRef = useRef(sortBy);
  const appliedFilterRef = useRef(selectedFilters);

  const utilityControls = {
    searchInput,
    setSearchInput: (keyword: string) => setSearchInput(keyword),
    sortDirection,
    toggleSortDirection: () => setSortDirection((prev) => (prev === 1 ? -1 : 1)),
    showModal: () => toggleModal(),
  };

  const handleSort = async (sort: SortProps, filters: FilterProps[]) => {
    const sortChanged = sort.key !== appliedSortRef.current.key;
    const filtersChanged = !isEqual(filters, appliedFilterRef.current);
    if (sortChanged || filtersChanged) {
      setSortBy(sort);
      setSelectedFilters(filters);

      appliedSortRef.current = sort;
      appliedFilterRef.current = filters;
    }

    toggleModal();
  };

  const toggleModal = () => {
    setIsModalVisible((prev) => !prev);
    Keyboard.dismiss();
  };

  return {
    sortBy,
    selectedFilters,
    sortDirection,
    isModalVisible,
    searchInput,
    utilityControls,
    filterAndSortItems,
    toggleModal,
    handleSort,
  };
};
