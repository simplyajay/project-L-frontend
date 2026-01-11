import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Portal, Provider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { SnackbarProvider } from "@/components/common/Snackbar";
import MainTabs from "./MainTabs";
import Login from "./login/Login";
import ClientInformation from "./client-information/ClientInformation";
import ClientForm from "./client-form/ClientForm";
import CreditInformation from "./credit-information/CreditInformation";

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#000000" }}>
        <Provider>
          <SnackbarProvider>
            <Stack.Navigator
              screenOptions={{ animation: "ios_from_right", animationDuration: 100 }}
            >
              <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
              <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
              <Stack.Screen
                name="ClientInformation"
                component={ClientInformation}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ClientForm"
                component={ClientForm}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="CreditInformation"
                component={CreditInformation}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </SnackbarProvider>
        </Provider>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default RootNavigation;
