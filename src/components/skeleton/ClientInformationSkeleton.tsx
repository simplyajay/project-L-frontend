import React from "react";
import { View } from "react-native";
import { MotiView } from "moti";

const ClientInfoHeaderSkeleton = () => {
  return (
    <View className="w-full flex-row justify-around  bg-slate-100 p-4 gap-4">
      <MotiView
        className="w-[10%] h-9 bg-slate-200 rounded-md"
        from={{ opacity: 0.2 }}
        animate={{ opacity: 1 }}
        transition={{ loop: true, duration: 650 }}
      />
      <View className="flex-1">
        <MotiView
          className="w-[80%] h-9 bg-gray-300 rounded-md"
          from={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          transition={{ loop: true, duration: 650 }}
        />
      </View>

      <MotiView
        className="w-[10%] h-9 bg-gray-300 rounded-md"
        from={{ opacity: 0.2 }}
        animate={{ opacity: 1 }}
        transition={{ loop: true, duration: 650 }}
      />
    </View>
  );
};

const ClientInfoSummarySkeleton = () => {
  return (
    <View className="bg-slate-200 p-3">
      <View className="w-full h-30 p-1 items-center justify-center">
        <MotiView
          className="w-24 h-24 bg-gray-300 rounded-full"
          from={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          transition={{ loop: true, duration: 650 }}
        />
      </View>
      <View className="w-full h-12 p-2 items-center justify-center">
        <MotiView
          className="w-[50%] h-8 bg-gray-300 rounded-md"
          from={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          transition={{ loop: true, duration: 650 }}
        />
      </View>
    </View>
  );
};

const ClientInfoListSkeleton = () => {
  return (
    <View className="flex-1 bg-slate-100 rounded-t-xl">
      <View className="flex-row items-center justify-between p-4">
        <View className="flex-1 items-center justify-center">
          <MotiView
            className="w-[75%] h-8 bg-gray-300 rounded-md"
            from={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            transition={{ loop: true, duration: 600 }}
          />
        </View>
        <View className="flex-1 items-center justify-center">
          <MotiView
            className="w-[75%] h-8 bg-gray-300 rounded-md"
            from={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            transition={{ loop: true, duration: 700 }}
          />
        </View>
      </View>
      <View className="flex-1 p-4 gap-4 items-center">
        <MotiView
          className="w-full h-24 bg-gray-300 rounded-md"
          from={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          transition={{ loop: true, duration: 600 }}
        />

        <MotiView
          className="w-full h-24 bg-gray-300 rounded-md"
          from={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          transition={{ loop: true, duration: 700 }}
        />

        <MotiView
          className="w-full h-24 bg-gray-300 rounded-md"
          from={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          transition={{ loop: true, duration: 600 }}
        />

        <MotiView
          className="w-full h-24 bg-gray-300 rounded-md"
          from={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          transition={{ loop: true, duration: 700 }}
        />

        <MotiView
          className="w-full h-24 bg-gray-300 rounded-md"
          from={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          transition={{ loop: true, duration: 600 }}
        />
      </View>
    </View>
  );
};

export const ClientInformationSkeleton = () => {
  return (
    <View className="flex-1">
      <ClientInfoSummarySkeleton />
      <ClientInfoListSkeleton />
    </View>
  );
};
