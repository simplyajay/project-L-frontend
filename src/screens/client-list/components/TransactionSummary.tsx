import React from "react";
import { View, Text } from "react-native";
import { formatNumber } from "@/lib/utils/number";

interface ISummaryProps {
  numberOfClients: number;
  amountOverdue: number;
  totalAmount: number;
}

const TransactionSummary = ({
  numberOfClients,
  amountOverdue,
  totalAmount,
}: ISummaryProps): React.ReactElement => {
  return (
    <View
      style={{ elevation: 10 }}
      className="w-full flex-row justify-around bg-slate-100 shadow-lg shadow-800 rounded-lg p-4 "
    >
      <View className="items-center justify-center p-1">
        <Text className="font-semibold text-2xl text-gray-800">
          {formatNumber(numberOfClients)}
        </Text>
        <Text className="font-extrabold text-xs text-gray-500">CLIENTS</Text>
      </View>
      <View className="items-center justify-center p-1 ">
        <Text className="font-semibold text-2xl text-gray-800">{formatNumber(amountOverdue)}</Text>
        <Text className="font-extrabold text-xs text-gray-500">OVERDUE</Text>
      </View>
      <View className="items-center justify-center p-1">
        <Text className="font-semibold text-2xl text-gray-800">{formatNumber(totalAmount)}</Text>
        <Text className="font-extrabold text-xs text-gray-500">TOTAL</Text>
      </View>
    </View>
  );
};

export default TransactionSummary;
