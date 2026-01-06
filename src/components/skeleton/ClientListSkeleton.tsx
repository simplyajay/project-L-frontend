import React from "react";
import { View, Text } from "react-native";
import { MotiView } from "moti";

const HeaderSkeleton = () => {
  return (
    <View className="w-full flex-row justify-around rounded-lg bg-slate-100 shadow-lg shadow-gray-800 p-4">
      <View className="flex-1 items-center justify-center gap-1 p-1">
        <MotiView
          className="w-[80%] h-8 bg-gray-300 rounded-sm"
          from={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          transition={{ loop: true, duration: 600 }}
        />
        <MotiView
          className="w-[60%] h-4 bg-gray-300 rounded-sm"
          from={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          transition={{ loop: true, duration: 600 }}
        />
      </View>
      <View className="flex-1 items-center justify-center gap-1 p-1">
        <MotiView
          className="w-[65%] h-8 bg-gray-300 rounded-sm"
          from={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          transition={{ loop: true, duration: 650 }}
        />
        <MotiView
          className="w-[55%] h-4 bg-gray-300 rounded-sm"
          from={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          transition={{ loop: true, duration: 650 }}
        />
      </View>
      <View className="flex-1 items-center justify-center gap-1 p-1">
        <MotiView
          className="w-[85%] h-8 bg-gray-300 rounded-sm"
          from={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          transition={{ loop: true, duration: 700 }}
        />
        <MotiView
          className="w-[55%] h-4 bg-gray-300 rounded-sm"
          from={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          transition={{ loop: true, duration: 700 }}
        />
      </View>
    </View>
  );
};

const UtilitySkeletion = () => {
  return (
    <View className="w-full flex-row justify-between gap-3">
      <View className="flex-1 flex-row items-start justify-start shadow-lg shadow-gray-800">
        <MotiView
          className="w-full h-11 bg-gray-300 rounded-md"
          from={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          transition={{ loop: true, duration: 600 }}
        />
      </View>
      <View className="flex-row items-center gap-2 justify-end">
        <MotiView
          className="w-11 h-11 bg-gray-300 rounded-md"
          from={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          transition={{ loop: true, duration: 650 }}
        />
        <MotiView
          className="w-11 h-11 bg-gray-300 rounded-md"
          from={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          transition={{ loop: true, duration: 700 }}
        />
      </View>
    </View>
  );
};

const CardSkeletonV1 = () => {
  return (
    <View className="gap-4 p-4 bg-slate-100 shadow-lg shadow-gray-800 rounded-lg">
      <View className="gap-2">
        <MotiView
          className="w-[60%] h-6 bg-gray-300 rounded-md"
          from={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          transition={{ loop: true, duration: 600 }}
        />
        <MotiView
          className="w-[40%] h-5 bg-gray-300 rounded-md"
          from={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          transition={{ loop: true, duration: 600 }}
        />
      </View>

      <View className="gap-2">
        <MotiView
          className="w-[15%] h-4 bg-gray-300 rounded-md"
          from={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          transition={{ loop: true, duration: 600 }}
        />
        <MotiView
          className="w-[45%] h-5 bg-gray-300 rounded-md"
          from={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          transition={{ loop: true, duration: 600 }}
        />
      </View>
    </View>
  );
};

const CardSkeletonV2 = () => {
  return (
    <View className="gap-4 p-4 bg-slate-100 shadow-lg shadow-gray-800 rounded-lg">
      <View className="gap-2">
        <MotiView
          className="w-[75%] h-6 bg-gray-300 rounded-md"
          from={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          transition={{ loop: true, duration: 700 }}
        />
        <MotiView
          className="w-[55%] h-5 bg-gray-300 rounded-md"
          from={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          transition={{ loop: true, duration: 700 }}
        />
      </View>

      <View className="gap-2">
        <MotiView
          className="w-[28%] h-4 bg-gray-300 rounded-md"
          from={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          transition={{ loop: true, duration: 700 }}
        />
        <MotiView
          className="w-[40%] h-5 bg-gray-300 rounded-md"
          from={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          transition={{ loop: true, duration: 700 }}
        />
      </View>
    </View>
  );
};

const ListSkeleton = () => {
  return (
    <View className="flex-1">
      <View className="w-full gap-4 p-4 bg-slate-200 ">
        <HeaderSkeleton />
        <UtilitySkeletion />
      </View>
      <View className="flex-1 gap-4 p-4 bg-slate-200">
        <CardSkeletonV1 />
        <CardSkeletonV2 />
        <CardSkeletonV1 />
        <CardSkeletonV2 />
      </View>
    </View>
  );
};

export default ListSkeleton;
