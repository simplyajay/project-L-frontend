import React, { useCallback, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, Pressable, Keyboard } from "react-native";
import { RootNavigationProp, ClientInformationRouteProp } from "@/lib/types/navigation";
import { AnimatedHeader } from "@/components/common/Header";
import { Edit, Plus } from "lucide-react-native";
import { TabsProvider, Tab, DEFAULT_ACTIVE_TAB_STYLE } from "@/components/common/Tabs";
import { useSnackbar } from "@/components/common/Snackbar";
import { ClientInformationSkeleton } from "@/components/skeleton/ClientInformationSkeleton";
import { copyToClipboard } from "@/lib/utils/text";
import { useClientInformation } from "./useClientInformation";
import Details from "./components/Details";
import Credits from "./components/Credits";
import Modal, { AnimatedPadding } from "@/components/common/Modal";
import AddCreditForm from "./components/AddCreditForm";
import { Portal } from "react-native-paper";
import { useRefreshStore } from "@/store/useRefreshStore";

const ClientInformation = () => {
  const route = useRoute<ClientInformationRouteProp>();
  const navigation = useNavigation<RootNavigationProp>();

  const { showMessage } = useSnackbar();

  const { refreshMap, resetRefresh } = useRefreshStore();
  const shouldRefresh = refreshMap.clientInfo;

  const { clientId } = route.params;
  const { loading, hasError, client, credits, fetchData, fullName } = useClientInformation({
    clientId,
  });
  const [creditFormVisible, setCreditFormVisible] = useState(false);

  const hideModal = useCallback(() => {
    setCreditFormVisible(false);
    Keyboard.dismiss();
  }, []);

  const handleEditPress = () => {
    navigation.push("ClientForm", { client });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!shouldRefresh) return;

    fetchData();
    resetRefresh("clientInfo");
  }, [shouldRefresh]);

  if (loading) return <ClientInformationSkeleton />;

  return (
    <Portal.Host>
      <View className="flex-1 bg-slate-200">
        <AnimatedHeader
          containerStyle={{ backgroundColor: "#f1f5f9" }}
          title={"Client Information"}
          onBackPress={() => navigation.goBack()}
          actionComponent={
            !loading && (
              <Pressable
                className="w-10 p-1 items-center rounded-lg"
                onPress={handleEditPress}
                android_ripple={{ color: "#e8e8e8" }}
              >
                <Edit size={20} />
              </Pressable>
            )
          }
        />

        {!client ? (
          <View className="w-full h-full">
            <Text> 404 Not Found</Text>
          </View>
        ) : (
          <View className="flex-1 gap-2">
            <View className="w-full p-4 gap-4 items-center justify-center bg-slate-200 ">
              <View className="w-24 h-24 rounded-full bg-teal-200 items-center justify-center ">
                <Text className="text-6xl text-gray-700">{fullName.charAt(0).toUpperCase()}</Text>
              </View>
              <Text className="text-2xl font-bold text-gray-700">{fullName}</Text>
            </View>

            {client && (
              <TabsProvider
                activeTabTextStyle={{ ...DEFAULT_ACTIVE_TAB_STYLE, color: "#3b82f6" }}
                tabButtonStyle={{ padding: 12 }}
                containerStyle={{
                  borderTopLeftRadius: 25,
                  borderTopRightRadius: 25,
                  backgroundColor: "#f1f5f9",
                }}
                actionButton={
                  <Pressable
                    className="w-full h-full rounded-full flex bg-cyan-700  items-center justify-center "
                    onPress={() => setCreditFormVisible(true)}
                  >
                    <Plus strokeWidth={1} size={32} color={"white"} />
                  </Pressable>
                }
              >
                <Tab label="Credits">
                  <Credits
                    client={client}
                    credits={credits}
                    refreshControl={{ loading: loading, handleRefresh: () => fetchData() }}
                  />
                </Tab>
                <Tab label="Details">
                  <Details
                    client={client}
                    handleCopyToClipboard={(text) =>
                      copyToClipboard(text, () => showMessage(`copied ${text} to clipboard.`, 1000))
                    }
                  />
                </Tab>
              </TabsProvider>
            )}

            <Modal
              visible={creditFormVisible}
              onBackdropPress={hideModal}
              onBackButtonPress={hideModal}
              animationInTiming={300}
              animationOutTiming={300}
            >
              <AnimatedPadding>
                <AddCreditForm
                  clientId={client?._id}
                  submitCallback={() => {
                    hideModal();
                    fetchData();
                  }}
                />
              </AnimatedPadding>
            </Modal>
          </View>
        )}
      </View>
    </Portal.Host>
  );
};

export default ClientInformation;
