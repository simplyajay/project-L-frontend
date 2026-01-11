import React, { useMemo } from "react";
import { View, Text, Pressable } from "react-native";
import { IClientSummary } from "@/lib/types/client";
import { formatDate } from "@/lib/utils/date";
import { formatNumber } from "@/lib/utils/number";

interface IClientCard {
  client: IClientSummary;
  handlePress: () => void;
}

const ClientSummaryCard = ({ client, handlePress }: IClientCard): React.ReactElement => {
  const unsettledCredit = client.unsettledCredit;
  const fullName = `${client.firstname} ${client.lastname}`;
  const totalBalance = client.totalBalance;

  const dueDate = unsettledCredit?.dueDate
    ? formatDate(new Date(unsettledCredit.dueDate))
    : undefined;
  const now = new Date();
  now.setUTCHours(0, 0, 0, 0);

  const isOverDue = unsettledCredit ? now > new Date(unsettledCredit.dueDate) : false;

  return (
    <Pressable
      className="flex-row bg-slate-100 rounded-lg shadow-md shadow-gray-800"
      android_ripple={{
        color: "rgba(0, 0, 0, 0.10)",
        foreground: true,
      }}
      onPress={handlePress}
    >
      <View
        className={`h-full rounded-l-lg w-2 ${isOverDue ? "bg-red-400" : totalBalance > 0 ? "bg-blue-300 text-gray-400" : "bg-gray-400"}`}
      />
      <View className="flex-1 h-full p-2">
        <View className="p-1">
          <Text className="font-bold text-lg flex-wrap text-gray-700">{fullName}</Text>
          <Text className="font-semibold text-gray-800">{`AED ${formatNumber(totalBalance)}`}</Text>
        </View>

        {dueDate ? (
          <View className="p-1">
            <Text className="text-gray-500">Due</Text>
            <Text className="text-gray-800">{dueDate}</Text>
          </View>
        ) : (
          <View className="p-2"></View>
        )}
      </View>
    </Pressable>
  );
};

const ClientSummaryCardMemo = React.memo(ClientSummaryCard);

export default ClientSummaryCardMemo;
