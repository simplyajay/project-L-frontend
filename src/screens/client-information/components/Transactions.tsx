import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, RefreshControl } from "react-native";
import { ICredit } from "@/lib/types/credit";
import { formatNumber } from "@/lib/utils/number";
import { toReadableDate } from "@/lib/utils/date";
import { useNavigation } from "@react-navigation/native";
import { RootNavigationProp } from "@/lib/types/navigation";
import { IClient } from "@/lib/types/client";

type TransactionsProps = {
  client: IClient;
  credits: ICredit[];
  refreshControl: {
    handleRefresh: () => void;
    loading: boolean;
  };
};

const Transactions = ({ client, credits, refreshControl }: TransactionsProps) => {
  const navigation = useNavigation<RootNavigationProp>();
  const now = new Date(Date.now());

  const { loading, handleRefresh } = refreshControl;

  const handleCardPress = (credit: ICredit) => {
    navigation.navigate("CreditInformation", { client, credit });
  };

  return (
    <FlatList
      data={credits}
      keyExtractor={(item) => item._id}
      contentContainerStyle={{ gap: 16, padding: 16, backgroundColor: "#f1f5f9", flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={handleRefresh} />}
      renderItem={({ item }) => (
        <Pressable
          className="items-center bg-slate-200 rounded-lg"
          android_ripple={{
            color: "rgba(0, 0, 0, 0.10)",
            foreground: true,
          }}
          onPress={() => handleCardPress(item)}
        >
          <View className="w-full flex-row items-center justify-between p-2">
            <Text className="font-bold">{toReadableDate(item.creditDate)}</Text>
            <Text
              className={`font-bold ${item.balance > 0 ? (now > new Date(item.dueDate) ? "text-red-500" : "text-blue-500") : "text-green-600"}`}
            >
              {item.balance > 0 ? (now > new Date(item.dueDate) ? "Overdue" : "Active") : "Paid"}
            </Text>
          </View>
          <View className="w-full flex-row items-center justify-between p-2">
            <View>
              <Text className="text-sm text-gray-500">Principal</Text>
              <Text>{`AED ${formatNumber(item.principalAmount)}`}</Text>
            </View>

            <View className="items-end">
              <Text className="text-sm text-gray-500">Balance</Text>
              <Text>{`AED ${formatNumber(item.balance)}`}</Text>
            </View>
            {item.balance > 0 && (
              <View className="items-end">
                <Text className="text-sm text-gray-500">Interest</Text>
                <Text>{`AED ${formatNumber(item.currentInterestAmount)}`}</Text>
              </View>
            )}
          </View>
        </Pressable>
      )}
      ListEmptyComponent={
        <View className="flex-1">
          <Text>This client has no transactions</Text>
        </View>
      }
    />
  );
};

export default Transactions;
