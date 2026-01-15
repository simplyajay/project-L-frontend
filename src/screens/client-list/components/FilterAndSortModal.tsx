import React, { useState } from "react";
import Modal from "../../../components/common/Modal";
import { View, Text, Pressable, FlatList } from "react-native";
import { Circle, Square, SquareCheck } from "lucide-react-native";
import { FilterAndSortProps } from "../useFilterAndSort";

export type SortProps = {
  type: "sortBy";
  key: "createdAt" | "firstname" | "balance" | "dueDate";
  value: string;
};

export interface FilterProps {
  type: "filter";
  key: "overDue" | "notOverDue" | "noCredit";
  value: string;
}

interface ISortSettingModal {
  isModalVisible: boolean;
  data: FilterAndSortProps[];
  sortSetting: SortProps;
  filterSetting: FilterProps[];
  toggle: () => void;
  handleSort: (sortBy: SortProps, filters: FilterProps[]) => void;
}

const SortSettingModal = ({
  isModalVisible,
  data,
  sortSetting,
  filterSetting,
  toggle,
  handleSort,
}: ISortSettingModal) => {
  const [sortBy, setSortBy] = useState<SortProps>(sortSetting);
  const [filters, setFilters] = useState<FilterProps[]>(filterSetting);

  return (
    <Modal
      visible={isModalVisible}
      onBackdropPress={toggle}
      onBackButtonPress={toggle}
      animationInTiming={300}
      animationOutTiming={300}
    >
      <View className="w-full gap-3 bg-slate-100 rounded-t-lg">
        <View className="gap-2 p-2">
          <View className="w-full p-2 border-b border-slate-300">
            <Text className="text-xl font-semibold">Sort By</Text>
          </View>
          <FlatList
            data={data.filter((d) => d.type === "sortBy")}
            keyExtractor={(item) => item.key}
            className="w-full border-gray-400"
            renderItem={({ item }) => (
              <Pressable className="flex-col p-2 items-center" onPress={() => setSortBy(item)}>
                <View className="w-full flex-row items-center justify-between">
                  <Text>{item.value}</Text>
                  <Circle
                    size={12}
                    color="#9ca3af"
                    fill={sortBy.key === item.key ? "#1f2937" : "#ffffff"}
                  />
                </View>
              </Pressable>
            )}
          />
        </View>
        <View className="gap-2 p-2">
          <View className="w-full p-2 border-b border-slate-300">
            <Text className="text-xl font-semibold">Filter</Text>
          </View>
          <FlatList
            data={data.filter((d) => d.type === "filter")}
            keyExtractor={(item) => item.key}
            className="w-full border-gray-400"
            renderItem={({ item }) => {
              const isSelected = filters.some((f) => f.key === item.key);

              return (
                <Pressable
                  className="flex-col p-2 items-center text-gray-800"
                  onPress={() =>
                    setFilters((prev) => {
                      const exists = prev.find((f) => f.key === item.key);
                      return exists ? prev.filter((f) => f.key !== item.key) : [...prev, item];
                    })
                  }
                >
                  <View className="w-full flex-row items-center justify-between">
                    <Text>{item.value}</Text>
                    {isSelected ? (
                      <SquareCheck size={16} color="#1f2937" />
                    ) : (
                      <Square size={16} color="#9ca3af" />
                    )}
                  </View>
                </Pressable>
              );
            }}
          />
        </View>

        <View className="w-full p-4">
          <Pressable
            android_ripple={{ color: "#858585" }}
            className="w-full flex-row items-center justify-center rounded-md bg-[#303030] p-4"
            onPress={() => handleSort(sortBy, filters)}
          >
            <Text className="text-white">Apply</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default SortSettingModal;
