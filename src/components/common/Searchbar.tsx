import React, { useState } from "react";
import { View, TextInput, Pressable, ViewStyle } from "react-native";
import { Search, X } from "lucide-react-native";

interface ISearchbarProps {
  placeholder?: string;
  value?: string;
  setValue: (keyword: string) => void;
  className?: string;
  style?: ViewStyle;
}

const Searchbar = ({ placeholder, value, setValue, className, style }: ISearchbarProps) => {
  const [focused, setFocused] = useState(false);

  return (
    <View
      style={[style]}
      className={`flex-row items-center rounded-md px-3 border ${
        focused ? "border-slate-400" : "border-slate-100"
      } ${className}`}
    >
      <Search size={18} color="#1f2937" />
      <TextInput
        className={`flex-1 p-3 px-3 text-gray-800`}
        placeholder={placeholder || "Search"}
        placeholderTextColor="#9ca3af"
        autoCapitalize="none"
        value={value}
        onChangeText={(val) => setValue(val)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {value && (
        <Pressable onPress={() => setValue("")}>
          <X size={18} color="#1f2937" />
        </Pressable>
      )}
    </View>
  );
};

export default Searchbar;
