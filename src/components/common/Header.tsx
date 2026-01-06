import React from "react";
import {
  View,
  Text,
  Pressable,
  Animated,
  StyleProp,
  ViewStyle,
  StyleSheet,
  TextStyle,
} from "react-native";
import { ArrowLeft } from "lucide-react-native";

interface BaseProps {
  title: string;
  onBackPress?: () => void;
  actionComponent?: React.ReactNode;
}

interface StaticHeaderProps extends BaseProps {
  style?: StyleProp<ViewStyle>;
}

interface AnimatedHeaderProps extends BaseProps {
  containerStyle?: Animated.AnimatedProps<AnimatedViewStyle>;
  titleStyle?: Animated.AnimatedProps<TextStyle>;
}

type AnimatedViewStyle = Omit<ViewStyle, "backgroundColor"> & {
  backgroundColor?: string | Animated.AnimatedInterpolation<string>;
};

export const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({
  containerStyle,
  titleStyle,
  onBackPress,
  title,
  actionComponent,
}) => {
  return (
    <Animated.View style={[styles.defaultContainerStyle, containerStyle]}>
      <Pressable className="p-2 rounded-md " onPress={onBackPress}>
        <ArrowLeft size={20} />
      </Pressable>
      <View className="flex-1">
        <Animated.Text
          style={[titleStyle]}
          className="text-xl font-semibold "
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Animated.Text>
      </View>
      {actionComponent ? actionComponent : <View className="w-6"></View>}
    </Animated.View>
  );
};

export const StaticHeader: React.FC<StaticHeaderProps> = ({
  style,
  onBackPress,
  title,
  actionComponent,
}) => {
  return (
    <View style={[styles.defaultContainerStyle, style]}>
      <Pressable className="p-2 rounded-md " onPress={onBackPress}>
        <ArrowLeft size={24} />
      </Pressable>
      <View className="flex-1">
        <Text className="text-2xl font-semibold " numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
      </View>
      {actionComponent ? actionComponent : <View className="w-6"></View>}
    </View>
  );
};

const styles = StyleSheet.create({
  defaultContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    height: 60,
  },
});
