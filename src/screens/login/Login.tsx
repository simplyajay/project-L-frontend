import "react-native-reanimated";
import React, { useState } from "react";
import { View, Text, Pressable, Keyboard, ActivityIndicator } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { LoginSchema, LoginForm } from "@/lib/schema/login";
import { User } from "@/lib/types/user";
import { RootNavigationProp } from "@/lib/types/navigation";
import { saveToken } from "@/lib/utils/token";
import { LoginError } from "./components/login";
import { authenticateLogin } from "@/api/auth";
import { Fingerprint } from "lucide-react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useAuthStore } from "@/store/useAuthStore";
import LoginFields from "./components/LoginFields";

const Login = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const { control, handleSubmit, formState, clearErrors } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { identifier: "", loginPassword: "" },
    reValidateMode: "onSubmit",
  });

  const { user, setUser } = useAuthStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<LoginError>();
  const [showTouchId, setShowTouchId] = useState<boolean>(false);

  const clearAllErrors = (target?: "identifier" | "loginPassword"): void => {
    if (target) clearErrors(target);
    setLoginError(undefined);
  };

  const onSubmit = async (data: LoginForm): Promise<void> => {
    setLoading(true);
    setLoginError(undefined);
    const response = await authenticateLogin<{ accessToken: string; user: User }>({
      payload: data,
    });

    if (response.ok) {
      const { accessToken, user } = response.payload;
      if (accessToken) {
        await saveToken(accessToken);
        setUser(user);
        navigation.navigate("MainTabs");
      } else {
        console.error("Unexpected Error");
        return;
      }
    } else {
      const error = response;
      setLoginError(error);
    }

    //set preffered currency in state here
    setLoading(false);
  };

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      enableAutomaticScroll
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <Pressable className="flex-1" onPress={Keyboard.dismiss}>
        <View className="flex-1 w-full items-center justify-start bg-white p-4">
          <View className="w-full h-[40%] flex items-center justify-center">
            <Image
              style={{ width: 200, height: 200 }}
              source={require("@/assets/images/project-l.png")}
              contentFit="contain"
            />
          </View>

          <View className="w-full items-center justify-center gap-8">
            <LoginFields
              control={control}
              formState={formState}
              clearErrors={clearAllErrors}
              loginError={loginError}
              loading={loading}
            />

            <Pressable
              disabled={loading}
              onPress={handleSubmit(onSubmit)}
              className="w-full flex items-center min-h-14 justify-center bg-[#303030] p-4 rounded-md"
            >
              {loading ? (
                <ActivityIndicator size="small" color="#adadad" />
              ) : (
                <Text className="text-white">Login</Text>
              )}
            </Pressable>

            {showTouchId && (
              <View className="w-full items-center justify-start gap-8 ">
                <Text className="font-bold">OR</Text>
                <Pressable
                  className="gap-4 items-center justify-center"
                  disabled={loading}
                  onPress={() => {
                    Keyboard.dismiss();
                  }}
                >
                  <Fingerprint width={60} height={60} />
                  <Text className="font-medium text-lg">Login with Touch ID</Text>
                </Pressable>
              </View>
            )}
          </View>
        </View>
      </Pressable>
    </KeyboardAwareScrollView>
  );
};

export default Login;
