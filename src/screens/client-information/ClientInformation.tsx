import React, { useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, Pressable } from "react-native";
import { RootNavigationProp, ClientInformationRouteProp } from "@/lib/types/navigation";
import { AnimatedHeader } from "@/components/common/Header";
import { Edit } from "lucide-react-native";
import { TabsProvider, Tab } from "@/components/common/Tabs";
import { useSnackbar } from "@/components/common/Snackbar";
import { ClientInformationSkeleton } from "@/components/skeleton/ClientInformationSkeleton";
import { copyToClipboard } from "@/lib/utils/text";
import { useClientInformation } from "./useClientInformation";
import { useClientStore } from "@/store/useClientStore";
import Details from "./components/Details";
import Transactions from "./components/Transactions";

const ClientInformation = () => {
  const route = useRoute<ClientInformationRouteProp>();
  const navigation = useNavigation<RootNavigationProp>();

  const { showMessage } = useSnackbar();
  const { shouldRefresh, setShouldRefresh } = useClientStore();
  const { clientId } = route.params;
  const { loading, hasError, client, credits, fetchData } = useClientInformation({ clientId });

  const fullName = client?.middlename
    ? `${client?.firstname} ${client.middlename} ${client.lastname} `
    : `${client?.firstname} ${client?.lastname}`;

  const handleEditPress = () => {
    console.log("sdadsadas", client?.firstname);
    navigation.push("ClientForm", { client });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (shouldRefresh) {
      fetchData();
      setShouldRefresh(false);
    }
  }, [shouldRefresh]);

  return (
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

      {loading ? (
        <ClientInformationSkeleton />
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
              tabButtonStyle={{ padding: 12 }}
              containerStyle={{
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
                backgroundColor: "#f1f5f9",
              }}
              activeTabStyle={{ borderBottomWidth: 2, borderBottomColor: "blue" }}
            >
              <Tab label="Transactions">
                <Transactions
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
        </View>
      )}
    </View>
  );
};

export default ClientInformation;
