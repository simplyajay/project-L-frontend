import React, { useState, useEffect } from "react";
import {
  View,
  Pressable,
  StyleSheet,
  BackHandler,
  StyleProp,
  ViewStyle,
  Dimensions,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { Portal } from "react-native-paper";

interface IModal {
  visible: boolean;
  onBackdropPress?: () => void;
  onBackButtonPress?: () => void;
  onCloseCallback?: () => void;
  animationInTiming?: number | 100;
  animationOutTiming?: number | 100;
  children: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  isCentered?: boolean;
}

export default function Modal(props: IModal) {
  const {
    visible,
    onBackButtonPress,
    onBackdropPress,
    onCloseCallback,
    children,
    animationInTiming,
    animationOutTiming,
    containerStyle,
    contentStyle,
    isCentered,
  } = props;

  const [show, setShow] = useState(false);

  const SCREEN_HEIGHT = Dimensions.get("screen").height;
  const backdropOpacity = useSharedValue(0);
  const translateY = useSharedValue(isCentered ? -50 : SCREEN_HEIGHT);

  useEffect(() => {
    if (visible) {
      setShow(true);
      backdropOpacity.value = withTiming(1, { duration: animationInTiming });
      translateY.value = withTiming(0, { duration: animationInTiming });

      const backAction = () => {
        onBackButtonPress?.();
        return true;
      };

      const subscription = BackHandler.addEventListener("hardwareBackPress", backAction);
      return () => subscription.remove();
    } else {
      backdropOpacity.value = withTiming(0, { duration: animationOutTiming });
      translateY.value = withTiming(SCREEN_HEIGHT, { duration: animationOutTiming }, () => {
        runOnJS(setShow)(false);

        if (show) {
          if (onCloseCallback) {
            if (onCloseCallback) runOnJS(onCloseCallback)();
          }
        }
      });
    }
  }, [visible, animationInTiming, animationOutTiming, onBackButtonPress]);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const modalStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  if (!show) return null;

  return (
    <Portal>
      <View style={isCentered ? styles.centeredContainer : (containerStyle ?? styles.container)}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onBackdropPress}>
          <Animated.View
            style={[StyleSheet.absoluteFill, { backgroundColor: "rgba(0,0,0,0.5)" }, backdropStyle]}
          />
        </Pressable>
        <Animated.View
          style={[isCentered ? styles.centeredModal : styles.modal, contentStyle, modalStyle]}
        >
          {children}
        </Animated.View>
      </View>
    </Portal>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modal: {
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
  },
  centeredContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredModal: {
    width: "80%",
    borderRadius: 20,
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
  },
});
