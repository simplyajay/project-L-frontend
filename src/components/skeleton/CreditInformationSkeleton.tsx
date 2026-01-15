import React from "react";
import { View } from "react-native";
import { MotiView } from "moti";

const CreditInformationSkeleton = () => {
  return (
    <View className="flex-1 w-full bg-slate-200">
      <View className="flex-row justify-between items-center w-full h-16 bg-[#f1f5f9]">
        <View className="flex-1 flex-row p-4 gap-4">
          <MotiView
            className="w-8 h-8 bg-slate-200 rounded-md"
            from={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            transition={{ loop: true, duration: 650 }}
          />
          <MotiView
            className="w-[35%] h-8 bg-slate-200 rounded-md"
            from={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            transition={{ loop: true, duration: 650 }}
          />
        </View>
        <View className=" flex items-center p-4">
          <MotiView
            className="w-8 h-8 bg-slate-200 rounded-md"
            from={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            transition={{ loop: true, duration: 650 }}
          />
        </View>
      </View>
      <View className="items-center justify-center p-6">
        <View className="w-full h-60 flex-row gap-4 p-4 bg-slate-100 rounded-lg">
          <View className="flex-1 h-full items-start px-2 gap-6">
            <MotiView
              className="w-[60%] h-8 bg-slate-200 rounded-md"
              from={{ opacity: 0.2 }}
              animate={{ opacity: 1 }}
              transition={{ loop: true, duration: 650 }}
            />
            <MotiView
              className="w-[80%] h-8 bg-slate-200 rounded-md"
              from={{ opacity: 0.2 }}
              animate={{ opacity: 1 }}
              transition={{ loop: true, duration: 650 }}
            />
            <MotiView
              className="w-[65%] h-8 bg-slate-200 rounded-md"
              from={{ opacity: 0.2 }}
              animate={{ opacity: 1 }}
              transition={{ loop: true, duration: 650 }}
            />
            <MotiView
              className="w-[70%] h-8 bg-slate-200 rounded-md"
              from={{ opacity: 0.2 }}
              animate={{ opacity: 1 }}
              transition={{ loop: true, duration: 650 }}
            />
          </View>
          <View className="flex-1 h-full items-start px-4 gap-6">
            <MotiView
              className="w-[85%] h-8 bg-slate-200 rounded-md"
              from={{ opacity: 0.2 }}
              animate={{ opacity: 1 }}
              transition={{ loop: true, duration: 650 }}
            />
            <MotiView
              className="w-[75%] h-8 bg-slate-200 rounded-md"
              from={{ opacity: 0.2 }}
              animate={{ opacity: 1 }}
              transition={{ loop: true, duration: 650 }}
            />
            <MotiView
              className="w-[60%] h-8 bg-slate-200 rounded-md"
              from={{ opacity: 0.2 }}
              animate={{ opacity: 1 }}
              transition={{ loop: true, duration: 650 }}
            />
            <MotiView
              className="w-[90%] h-8 bg-slate-200 rounded-md"
              from={{ opacity: 0.2 }}
              animate={{ opacity: 1 }}
              transition={{ loop: true, duration: 650 }}
            />
          </View>
        </View>
      </View>
      <View className="flex-1 w-full">
        <View className="w-full h-32 gap-4">
          <View className="px-6">
            <MotiView
              className="w-[60%] h-8 bg-slate-300 rounded-md"
              from={{ opacity: 0.2 }}
              animate={{ opacity: 1 }}
              transition={{ loop: true, duration: 650 }}
            />
          </View>

          <View className="flex-1 w-full flex-row items-center justify-between px-6">
            <MotiView
              className="w-[38%] h-8 bg-slate-300 rounded-md"
              from={{ opacity: 0.2 }}
              animate={{ opacity: 1 }}
              transition={{ loop: true, duration: 650 }}
            />
            <MotiView
              className="w-[38%] h-8 bg-slate-300 rounded-md"
              from={{ opacity: 0.2 }}
              animate={{ opacity: 1 }}
              transition={{ loop: true, duration: 650 }}
            />
          </View>
        </View>
        <View className="flex-1 w-full gap-2 ">
          <View className="w-full flex-row gap-4 px-6 items-center justify-between">
            <View className="flex-1 items-center justify-center">
              <MotiView
                className="w-[60%] h-6 bg-slate-300 rounded-md"
                from={{ opacity: 0.2 }}
                animate={{ opacity: 1 }}
                transition={{ loop: true, duration: 650 }}
              />
            </View>
            <View className="flex-1 items-center justify-center">
              <MotiView
                className="w-[60%] h-6 bg-slate-300 rounded-md"
                from={{ opacity: 0.2 }}
                animate={{ opacity: 1 }}
                transition={{ loop: true, duration: 650 }}
              />
            </View>
            <View className="flex-1 items-center justify-center">
              <MotiView
                className="w-[60%] h-6 bg-slate-300 rounded-md"
                from={{ opacity: 0.2 }}
                animate={{ opacity: 1 }}
                transition={{ loop: true, duration: 650 }}
              />
            </View>
          </View>
          <View className="flex-row w-full px-4">
            <View className="flex-1 w-full py-2">
              <View className="w-full justify-center p-3">
                <MotiView
                  className="w-[90%] h-8 bg-slate-300 rounded-md"
                  from={{ opacity: 0.2 }}
                  animate={{ opacity: 1 }}
                  transition={{ loop: true, duration: 650 }}
                />
              </View>
              <View className="w-full justify-center p-3">
                <MotiView
                  className="w-[75%] h-8 bg-slate-300 rounded-md"
                  from={{ opacity: 0.2 }}
                  animate={{ opacity: 1 }}
                  transition={{ loop: true, duration: 650 }}
                />
              </View>
              <View className="w-full justify-center p-3">
                <MotiView
                  className="w-[68%] h-8 bg-slate-300 rounded-md"
                  from={{ opacity: 0.2 }}
                  animate={{ opacity: 1 }}
                  transition={{ loop: true, duration: 650 }}
                />
              </View>
              <View className="w-full justify-center p-3">
                <MotiView
                  className="w-[90%] h-8 bg-slate-300 rounded-md"
                  from={{ opacity: 0.2 }}
                  animate={{ opacity: 1 }}
                  transition={{ loop: true, duration: 650 }}
                />
              </View>
              <View className="w-full justify-center p-3">
                <MotiView
                  className="w-[80%] h-8 bg-slate-300 rounded-md"
                  from={{ opacity: 0.2 }}
                  animate={{ opacity: 1 }}
                  transition={{ loop: true, duration: 650 }}
                />
              </View>
              <View className="w-full justify-center p-3">
                <MotiView
                  className="w-[70%] h-8 bg-slate-300 rounded-md"
                  from={{ opacity: 0.2 }}
                  animate={{ opacity: 1 }}
                  transition={{ loop: true, duration: 650 }}
                />
              </View>
            </View>
            <View className="flex-1 w-full py-2">
              <View className="w-full justify-center p-3">
                <MotiView
                  className="w-[85%] h-8 bg-slate-300 rounded-md"
                  from={{ opacity: 0.2 }}
                  animate={{ opacity: 1 }}
                  transition={{ loop: true, duration: 650 }}
                />
              </View>
              <View className="w-full justify-center p-3">
                <MotiView
                  className="w-[75%] h-8 bg-slate-300 rounded-md"
                  from={{ opacity: 0.2 }}
                  animate={{ opacity: 1 }}
                  transition={{ loop: true, duration: 650 }}
                />
              </View>
              <View className="w-full justify-center p-3">
                <MotiView
                  className="w-[70%] h-8 bg-slate-300 rounded-md"
                  from={{ opacity: 0.2 }}
                  animate={{ opacity: 1 }}
                  transition={{ loop: true, duration: 650 }}
                />
              </View>
              <View className="w-full justify-center p-3">
                <MotiView
                  className="w-[80%] h-8 bg-slate-300 rounded-md"
                  from={{ opacity: 0.2 }}
                  animate={{ opacity: 1 }}
                  transition={{ loop: true, duration: 650 }}
                />
              </View>
              <View className="w-full justify-center p-3">
                <MotiView
                  className="w-[75%] h-8 bg-slate-300 rounded-md"
                  from={{ opacity: 0.2 }}
                  animate={{ opacity: 1 }}
                  transition={{ loop: true, duration: 650 }}
                />
              </View>
              <View className="w-full justify-center p-3">
                <MotiView
                  className="w-[90%] h-8 bg-slate-300 rounded-md"
                  from={{ opacity: 0.2 }}
                  animate={{ opacity: 1 }}
                  transition={{ loop: true, duration: 650 }}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CreditInformationSkeleton;
