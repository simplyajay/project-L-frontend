import { View, Text, Pressable } from "react-native";
import { CircleAlert } from "lucide-react-native";
import React from "react";

type ScreenErrorProps = {
  handleRefresh: () => void;
};

const ScreenError = ({ handleRefresh }: ScreenErrorProps) => {
  return (
    <View className="flex-1 w-full items-center justify-center bg-slate-200 gap-10">
      <CircleAlert size={100} color="#f87171" />
      <Text className="text-2xl font-semibold">Oops! Something went wrong.</Text>
      <Pressable className="p-4 bg-blue-200 rounded-md" onPress={handleRefresh}>
        <Text className="text-xl font-semibold">Refresh</Text>
      </Pressable>
    </View>
  );
};

export default ScreenError;
