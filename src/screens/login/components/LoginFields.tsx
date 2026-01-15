import React, { useState } from "react";
import { View, TextInput, Text, Pressable } from "react-native";
import { Controller } from "react-hook-form";
import { Eye, EyeOff, X } from "lucide-react-native";
import { SvgProps, Svg, Path, G } from "react-native-svg";
import { LoginField } from "./login";

export const Fingerprint: React.FC<SvgProps> = (props) => {
  const { width, height, fill, stroke } = props;
  return (
    <Svg width={width || 24} height={height || 24} fill={fill || "#000000"} viewBox="0 0 32 32">
      <G id="SVGRepo_bgCarrier" strokeWidth="0"></G>
      <G id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></G>
      <G id="SVGRepo_iconCarrier">
        <Path d="M7.7 4.7C9.36 3.07 12.68 2 16.17 2S23 3.06 24.6 4.7A1 1 0 0 0 26 3.3C23.6.86 19.34 0 16.16 0S8.72.87 6.3 3.3a1 1 0 0 0 1.4 1.4zM29.2 12.55C26.38 6.88 22 4 16.17 4s-10.22 2.88-13 8.55a1 1 0 0 0 .44 1.34 1 1 0 0 0 1.35-.45C7.4 8.45 11.08 6 16.15 6s8.77 2.44 11.27 7.45a1 1 0 0 0 .9.55.87.87 0 0 0 .44-.1 1 1 0 0 0 .45-1.35zM19.4 28.08c-4.13-1.77-5.8-4.5-6-6.5a2.87 2.87 0 0 1 1.13-2.75c.85-.57 2.1.24 3.87 1.52s4.13 3 6.17 1.45c1.8-1.35 2.34-3.76 1.45-6.44A10.85 10.85 0 0 0 16.16 8C7.2 8 4 15.75 4 23a1 1 0 0 0 2 0c0-3 .73-13 10.16-13 3.9 0 7 3.1 8 6 .3.87.8 3-.75 4.2-.8.6-2-.2-3.8-1.47s-4.07-2.94-6.14-1.56a4.87 4.87 0 0 0-2 4.6c.24 2.56 2.24 6 7.18 8.15A1 1 0 0 0 19 30a1 1 0 0 0 .4-1.92zM10 19.24a7.06 7.06 0 0 1 5.2-4.65c2.24-.43 4.32.6 6 3a1 1 0 1 0 1.62-1.17c-2.9-4.07-6.27-4.12-8-3.8A9.1 9.1 0 0 0 8 18.77c-1 3.94.43 8.27 4.2 12.87a1 1 0 0 0 .8.37.94.94 0 0 0 .63-.23 1 1 0 0 0 .14-1.4c-3.34-4.1-4.62-7.83-3.77-11.13zM25.3 24.3a3 3 0 0 1-3.06.63c-2.4-.57-4.78-2.7-5.3-4.25a1 1 0 1 0-1.9.64c.8 2.33 3.87 4.88 6.74 5.56a6.84 6.84 0 0 0 1.52.18 4.7 4.7 0 0 0 3.4-1.35 1 1 0 0 0-1.4-1.4z"></Path>
      </G>
    </Svg>
  );
};

const LoginFields = ({ control, formState, clearErrors, loginError, loading }: LoginField) => {
  const { errors } = formState;

  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <View className="w-full items-center justify-center gap-4">
      <Controller
        control={control}
        name="identifier"
        render={({ field: { onChange, value } }) => (
          <View className="w-full items-start justify-center gap-2">
            <TextInput
              editable={!loading}
              className={`w-full border rounded-md p-4 ${errors.identifier ? "border-red-400" : "border-gray-400"}`}
              placeholder="Email or username"
              placeholderTextColor="#9ca3af"
              autoCapitalize="none"
              onChangeText={(text) => {
                onChange(text);
                clearErrors("identifier");
              }}
              onFocus={() => clearErrors("identifier")}
              value={value}
            />
            {errors.identifier && (
              <Text className="text-red-400">{errors?.identifier.message}</Text>
            )}
          </View>
        )}
      />
      <Controller
        control={control}
        name="loginPassword"
        render={({ field: { onChange, value } }) => (
          <View className={`w-full items-start justify-center gap-2`}>
            <View
              className={`flex-row items-center justify-center border rounded-md pr-3 ${errors.loginPassword ? "border-red-400" : "border-gray-400"}`}
            >
              <TextInput
                editable={!loading}
                className={`text-gray-700 flex-1 p-4 pr-3`}
                placeholder="Password"
                placeholderTextColor="#9ca3af"
                autoCapitalize="none"
                onChangeText={(text) => {
                  onChange(text);
                  clearErrors("loginPassword");
                }}
                onFocus={() => clearErrors("loginPassword")}
                value={value}
                secureTextEntry={!showPassword}
              />

              <Pressable
                disabled={loading}
                className="flex items-center justify-center p-3"
                onPress={() => {
                  clearErrors();
                  setShowPassword((prev) => !prev);
                }}
              >
                {showPassword ? (
                  <Eye
                    width={24}
                    height={24}
                    stroke={errors.loginPassword ? "#f87171" : "#6b7280"}
                  />
                ) : (
                  <EyeOff
                    width={24}
                    height={24}
                    stroke={errors.loginPassword ? "#f87171" : "#6b7280"}
                  />
                )}
              </Pressable>
            </View>

            {errors.loginPassword && (
              <Text className="text-red-400">{errors?.loginPassword.message}</Text>
            )}
          </View>
        )}
      />
      {loginError && (
        <View className="w-full flex-row justify-between bg-red-200 rounded-md">
          <View className="flex-1 flex items-start justify-center p-3">
            <Text className="text-red-800">{loginError.message}</Text>
          </View>
          <Pressable className="flex items-center justify-center p-3" onPress={() => clearErrors()}>
            <X width={19} height={19} stroke={"#991b1b"} />
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default LoginFields;
