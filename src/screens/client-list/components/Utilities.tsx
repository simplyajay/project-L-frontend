import React from "react";
import { View, Pressable } from "react-native";
import {
  SlidersHorizontal,
  Plus,
  ArrowDownNarrowWide,
  ArrowUpNarrowWide,
} from "lucide-react-native";
import Searchbar from "../../../components/common/Searchbar";

interface IUtilitiesControl {
  searchInput?: string;
  setSearchInput: (keyword: string) => void;
  sortDirection: number;
  toggleSortDirection: () => void;
  showModal: () => void;
}

interface IUtilitiesProps {
  control: IUtilitiesControl;
}

const Utilities = ({ control }: IUtilitiesProps) => {
  const { searchInput, setSearchInput, sortDirection, toggleSortDirection, showModal } = control;
  return (
    <View className="w-full flex-row justify-between gap-3">
      <View className="flex-1 flex-row items-start justify-start">
        <Searchbar
          style={{ elevation: 5 }}
          value={searchInput}
          setValue={setSearchInput}
          placeholder="Search by name"
          className="bg-slate-100 shadow-lg shadow-gray-800"
        />
      </View>
      <View className="flex-row items-center gap-2 justify-end">
        <Pressable
          style={{ elevation: 5 }}
          android_ripple={{
            color: "rgba(0, 0, 0, 0.10)",
            foreground: true,
          }}
          className="bg-slate-100 rounded-md p-2"
          onPress={showModal}
        >
          <SlidersHorizontal size={27} />
        </Pressable>
        <Pressable
          style={{ elevation: 5 }}
          android_ripple={{
            color: "rgba(0, 0, 0, 0.10)",
            foreground: true,
          }}
          className="bg-slate-100 shadow-lg shadow-gray-800 rounded-md p-2"
          onPress={toggleSortDirection}
        >
          {sortDirection === 1 ? (
            <ArrowUpNarrowWide size={27} />
          ) : (
            <ArrowDownNarrowWide size={27} />
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default Utilities;
