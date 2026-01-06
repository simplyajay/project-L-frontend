import { ICredit } from "@/lib/types/credit";
import React from "react";
import { View, Text } from "react-native";

const CreditSummaryCard = ({ credit }: { credit: ICredit }) => {
  return (
    <View className="p-4 rounded-lg">
      <View className="p-2 gap-4">
        <Text>CreditSummaryCard</Text>
      </View>
    </View>
  );
};

export default CreditSummaryCard;
