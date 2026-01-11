import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import { ISettlement } from "@/lib/types/credit";
import { formatDate } from "@/lib/utils/date";
import { formatNumber } from "@/lib/utils/number";

const Settlements = ({ data }: { data: ISettlement[] }) => {
  const [settlements, setSettlements] = useState(data);
  return (
    <View className="flex-1 bg-slate-200 ">
      <View className="flex-row justify-evenly gap-2 py-2 border-b border-gray-300">
        <View className="flex-1 items-center justify-center">
          <Text className="text-sm font-bold">Date</Text>
        </View>
        <View className="flex-1 items-center justify-center">
          <Text className="text-sm font-bold">Amount</Text>
        </View>
        <View className="flex-1 items-center justify-center">
          <Text className="text-sm font-bold">Interest</Text>
        </View>
      </View>
      <FlatList
        data={settlements}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View className="flex-row justify-evenly gap-2 py-6 border-b border-gray-300">
            <View className="flex-1 items-center justify-center">
              <Text className="text-sm">{formatDate(new Date(item.settlementDate))}</Text>
            </View>
            <View className="flex-1 items-center justify-center">
              <Text className="text-sm">{`AED ${formatNumber(item.settlementAmount)}`}</Text>
            </View>
            <View className="flex-1 items-center justify-center">
              <Text className="text-sm">{`AED ${formatNumber(item.interestAmount)}`}</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center text-nowrap">
            <Text className="text-xl text-gray-600">This transaction has no settlements</Text>
          </View>
        }
      />
    </View>
  );
};

export default Settlements;
