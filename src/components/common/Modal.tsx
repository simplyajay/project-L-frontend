import React, { useState, useEffect, useRef, ReactNode } from "react";
import {
  View,
  Pressable,
  StyleSheet,
  BackHandler,
  StyleProp,
  ViewStyle,
  Dimensions,
  Keyboard,
  Animated as RNAnimated,
} from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, runOnJS } from "react-native-reanimated";
import { Portal } from "react-native-paper";

type ModalProps = {
  visible: boolean;
  onBackdropPress?: () => void;
  onBackButtonPress?: () => void;
  onCloseCallback?: () => void;
  animationInTiming?: number;
  animationOutTiming?: number;
  children: React.ReactNode;
  animationType?: "slide" | "fade";
  containerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  isCentered?: boolean;
};

type AnimatedPaddingProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

const Modal = (props: ModalProps) => {
  const {
    visible,
    onBackButtonPress,
    onBackdropPress,
    onCloseCallback,
    children,
    animationType = "slide",
    animationInTiming = 100,
    animationOutTiming = 100,
    containerStyle,
    contentStyle,
    isCentered,
  } = props;

  const [show, setShow] = useState(false);

  const SCREEN_HEIGHT = Dimensions.get("screen").height;
  const backdropOpacity = useSharedValue(0);
  const translateY = useSharedValue(isCentered ? -50 : SCREEN_HEIGHT);
  const modalOpacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      setShow(true);
      backdropOpacity.value = withTiming(1, { duration: animationInTiming });

      if (animationType === "fade") {
        modalOpacity.value = withTiming(1, { duration: animationInTiming });
        translateY.value = 0;
      } else {
        modalOpacity.value = 1;
        translateY.value = withTiming(0, { duration: animationInTiming });
      }

      const backAction = () => {
        onBackButtonPress?.();
        return true;
      };

      const subscription = BackHandler.addEventListener("hardwareBackPress", backAction);
      return () => subscription.remove();
    } else {
      backdropOpacity.value = withTiming(0, { duration: animationOutTiming });

      if (animationType == "fade") {
        modalOpacity.value = withTiming(0, { duration: animationOutTiming, easing: Easing.linear }, () => {
          runOnJS(setShow)(false);

          if (show && onCloseCallback) runOnJS(onCloseCallback)();
        });
      } else {
        translateY.value = withTiming(SCREEN_HEIGHT, { duration: animationOutTiming }, () => {
          runOnJS(setShow)(false);

          if (show && onCloseCallback) runOnJS(onCloseCallback)();
        });
      }
    }
  }, [visible, animationInTiming, animationOutTiming, onBackButtonPress]);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const modalStyle = useAnimatedStyle(() => ({
    opacity: modalOpacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  if (!show) return null;

  return (
    <Portal>
      <View style={isCentered ? styles.centeredContainer : (containerStyle ?? styles.container)}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onBackdropPress}>
          <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: "rgba(0,0,0,0.5)" }, backdropStyle]} />
        </Pressable>
        <Animated.View
          style={[isCentered ? [styles.centeredModal, contentStyle] : styles.modal, contentStyle, modalStyle]}
        >
          {children}
        </Animated.View>
      </View>
    </Portal>
  );
};

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
    backgroundColor: "#fff",
    alignItems: "center",
  },
});

/** Form that will be wrapped with Modal */
export const AnimatedPadding = ({ children, style }: AnimatedPaddingProps) => {
  const animatedPadding = useRef(new RNAnimated.Value(0)).current;

  useEffect(() => {
    const showListener = Keyboard.addListener("keyboardDidShow", (e) => {
      RNAnimated.timing(animatedPadding, {
        toValue: e.endCoordinates.height,
        duration: 200,
        useNativeDriver: false,
      }).start();
    });

    const hideListener = Keyboard.addListener("keyboardDidHide", () => {
      RNAnimated.timing(animatedPadding, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, [animatedPadding]);

  const animatedStyle = { paddingBottom: animatedPadding };

  return (
    <RNAnimated.View className="w-full bg-slate-200" style={[animatedStyle, style]}>
      {children}
    </RNAnimated.View>
  );
};

export const DEFAULT_ANIMATED_PADDING_STYLE_SLIDE: StyleProp<ViewStyle> = {
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
};

export const DEFAULT_ANIMATED_PADDING_STYLE_FADE: StyleProp<ViewStyle> = {
  borderRadius: 10,
};

export default Modal;
