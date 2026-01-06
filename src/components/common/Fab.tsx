import React, { useEffect, useState } from "react";
import { View, StyleSheet, Pressable, ViewStyle } from "react-native";
import { Portal } from "react-native-paper";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface ActionItem {
  icon: React.ReactNode;
  onPress: () => void;
}

interface FabProps {
  actions: ActionItem[];
  visible: boolean;
  fabIcon: React.ReactNode;
  style?: ViewStyle;
  fabButtonStyle?: ViewStyle;
}

interface ButtonProps {
  open: boolean;
  onPress: () => void;
  icon: React.ReactNode;
  style?: ViewStyle;
}

const FabButton = ({ open, onPress, icon, style }: ButtonProps) => {
  const [disabled, setDisabled] = useState(false);
  const rotation = useSharedValue(0);

  const handlePress = () => {
    if (disabled) return;
    setDisabled(true);

    onPress();

    setTimeout(() => setDisabled(false), 300);
  };

  useEffect(() => {
    rotation.value = withTiming(open ? 1 : 0, { duration: 100 });
  }, [open]);

  const animatedStyle = useAnimatedStyle(() => {
    return { transform: [{ rotate: `${interpolate(rotation.value, [0, 1], [0, 135])}deg` }] };
  });

  return (
    <Pressable style={[styles.fabButton, style]} onPress={handlePress}>
      <Animated.View style={animatedStyle}>{icon}</Animated.View>
    </Pressable>
  );
};

const ActionButton = ({ open, onPress, icon, idx }: ButtonProps & { idx: number }) => {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (open) {
      translateY.value = withTiming(-(80 + idx * 60), { duration: 150 });
      opacity.value = withTiming(1, { duration: 150 });
    } else {
      translateY.value = withTiming(0, { duration: 100 });
      opacity.value = withTiming(0, { duration: 100 });
    }
  }, [open]);

  const stylez = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[stylez, styles.actionButton]}>
      <Pressable style={styles.actionButton} onPress={onPress}>
        {icon}
      </Pressable>
    </Animated.View>
  );
};

const Fab = ({ actions, visible, fabIcon, style, fabButtonStyle }: FabProps) => {
  const [open, setOpen] = useState(false);
  const fade = useSharedValue(0);

  const toggleOpen = () => {
    setOpen(!open);
    fade.value = withTiming(open ? 0 : 1, { duration: 100 });
  };

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: fade.value,
  }));

  if (!visible) return null;

  return (
    <Portal>
      {open && (
        <Animated.View
          pointerEvents={open ? "auto" : "none"}
          style={[styles.backdrop, backdropStyle]}
        >
          <Pressable style={StyleSheet.absoluteFill} onPress={toggleOpen} />
        </Animated.View>
      )}

      <View style={[styles.container, { ...style }]}>
        {actions.map(({ icon, onPress }, idx) => (
          <ActionButton
            key={idx}
            idx={idx}
            icon={icon}
            open={open}
            onPress={() => {
              onPress();
              requestAnimationFrame(() => toggleOpen());
            }}
          />
        ))}

        <FabButton open={open} onPress={toggleOpen} icon={fabIcon} style={fabButtonStyle} />
      </View>
    </Portal>
  );
};

export default Fab;

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  container: {
    position: "absolute",
    bottom: 76,
    right: 16,
    width: 56,
    alignItems: "center",
  },
  fabButton: {
    borderRadius: 28,
    backgroundColor: "#64748b",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    width: 56,
    height: 56,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  actionButton: {
    position: "absolute",
    right: 0,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#d7e4fa",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
  },
});
