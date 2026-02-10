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
import { useClientInformation } from "../hooks/useClientInformation";
import { Portal } from "react-native-paper";
import { useRefreshStore } from "@/store/useRefreshStore";
import { ClientType } from "@/lib/types/client";
import Modal, {
  AnimatedPadding,
  DEFAULT_ANIMATED_PADDING_STYLE_FADE,
  DEFAULT_ANIMATED_PADDING_STYLE_SLIDE,
} from "@/components/common/Modal";
import Details from "./sub/Details";
import Credits from "./sub/Credits";
import AddCreditForm from "./AddCreditForm";
import ConfirmDelete from "./ConfirmDelete";
import ScreenError from "../../../components/common/ScreenError";
import { CreditSnapshotType } from "@/lib/types/credit";

type ClientInformationContentProps = {
  client: ClientType;
  credits: CreditSnapshotType[];
};

const ClientInformation = () => {
  const route = useRoute<ClientInformationRouteProp>();
  const navigation = useNavigation<RootNavigationProp>();

  const { showMessage } = useSnackbar();

  const { refreshMap, resetRefresh } = useRefreshStore();
  const shouldRefresh = refreshMap.clientInfo;

  const { clientId } = route.params;
  const { state, fetchData } = useClientInformation({
    clientId,
  });

  const [creditFormVisible, setCreditFormVisible] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

  const hideCreditFormModal = useCallback(() => {
    setCreditFormVisible(false);
    Keyboard.dismiss();
  }, []);

  const hideConfirmDeleteModal = useCallback(() => {
    setConfirmDeleteVisible(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!shouldRefresh) return;

    fetchData();
    resetRefresh("clientInfo");
  }, [shouldRefresh]);

  const ClientInformationContent = ({ client, credits }: ClientInformationContentProps) => {
    const fullName = client.middlename
      ? `${client.firstname} ${client.middlename} ${client.lastname}`
      : `${client.firstname} ${client.lastname}`;

    return (
      <View className="flex-1 gap-2">
        <View className="w-full p-4 gap-4 items-center justify-center bg-slate-200 ">
          <View className="w-24 h-24 rounded-full bg-teal-200 items-center justify-center ">
            <Text className="text-6xl text-gray-700">{fullName.charAt(0).toUpperCase()}</Text>
          </View>
          <Text className="text-2xl font-bold text-gray-700">{fullName}</Text>
        </View>

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
              refreshControl={{ loading: state.status !== "ready", handleRefresh: () => fetchData() }}
            />
          </Tab>
          <Tab label="Details">
            <Details
              client={client}
              onDeletePress={() => setConfirmDeleteVisible(true)}
              onCopyPress={(text) => copyToClipboard(text, () => showMessage(`copied ${text} to clipboard.`, 1000))}
            />
          </Tab>
        </TabsProvider>

        <Modal
          visible={creditFormVisible}
          onBackdropPress={hideCreditFormModal}
          onBackButtonPress={hideCreditFormModal}
          animationInTiming={300}
          animationOutTiming={300}
        >
          <AnimatedPadding style={DEFAULT_ANIMATED_PADDING_STYLE_SLIDE}>
            <AddCreditForm
              clientId={client?._id}
              submitCallback={() => {
                hideCreditFormModal();
                fetchData();
              }}
            />
          </AnimatedPadding>
        </Modal>
        <Modal
          visible={confirmDeleteVisible}
          isCentered
          contentStyle={{ borderRadius: 5 }}
          onBackdropPress={hideConfirmDeleteModal}
          onBackButtonPress={hideConfirmDeleteModal}
          animationType="fade"
        >
          <AnimatedPadding style={DEFAULT_ANIMATED_PADDING_STYLE_FADE}>
            <ConfirmDelete clientId={client._id} onCancelPress={hideConfirmDeleteModal} />
          </AnimatedPadding>
        </Modal>
      </View>
    );
  };

  return (
    <Portal.Host>
      <View className="flex-1 bg-slate-200">
        <AnimatedHeader
          containerStyle={{ backgroundColor: "#f1f5f9" }}
          title={"Client Information"}
          onBackPress={() => navigation.goBack()}
          actionComponent={
            state.status === "ready" && (
              <Pressable
                className="w-10 p-1 items-center rounded-lg"
                onPress={() => navigation.push("ClientForm", { client: state.client })}
                android_ripple={{ color: "#e8e8e8" }}
              >
                <Edit size={20} />
              </Pressable>
            )
          }
        />

        {state.status === "loading" ? (
          <ClientInformationSkeleton />
        ) : state.status === "error" ? (
          <ScreenError handleRefresh={fetchData} />
        ) : (
          <ClientInformationContent client={state.client} credits={state.credits} />
        )}
      </View>
    </Portal.Host>
  );
};

export default ClientInformation;
