import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Pressable, Keyboard } from "react-native";
import { useRoute } from "@react-navigation/native";
import { AnimatedHeader } from "@/components/common/Header";
import { useNavigation } from "@react-navigation/native";
import { formatNumber } from "@/lib/utils/number";
import { CreditInformationRouteProp, RootNavigationProp } from "@/lib/types/navigation";
import { formatDate } from "@/lib/utils/date";
import { TabsProvider, Tab, DEFAULT_ACTIVE_TAB_STYLE } from "@/components/common/Tabs";
import { Edit, Plus } from "lucide-react-native";
import { Portal } from "react-native-paper";
import { useCreditInformation } from "./useCreditInformation";
import Modal, { AnimatedPadding } from "@/components/common/Modal";
import History from "./components/History";
import Settlements from "./components/Settlements";
import AddSettlementForm from "./components/AddSettlementForm";
import CreditInformationSkeleton from "@/components/skeleton/CreditInformationSkeleton";
import UpdateCreditForm from "./components/UpdateCreditForm";

const CardItem = ({ label, value }: { label: string; value: any }) => {
  return (
    <View className="flex-1 items-start justify-center">
      <Text className="text-gray-500 text-sm font-semibold">{label}</Text>
      <Text className="text-gray-700 text-lg font-semibold">{value}</Text>
    </View>
  );
};

type ModalOptions = {
  visible: boolean;
  type: "settlementForm" | "creditForm";
};

const CreditInformation = () => {
  const route = useRoute<CreditInformationRouteProp>();
  const navigation = useNavigation<RootNavigationProp>();

  const [modalOptions, setModalOptions] = useState<ModalOptions>({
    visible: false,
    type: "settlementForm",
  });

  const { creditId, client } = route.params;
  const { credit, loading, fetchCredit } = useCreditInformation(creditId);

  useEffect(() => {
    fetchCredit();
  }, []);

  const hideModal = useCallback(() => {
    setModalOptions((prev) => ({ ...prev, visible: false }));
    Keyboard.dismiss();
  }, []);

  const fullname = client.middlename
    ? `${client.firstname} ${client.middlename} ${client.lastname}`
    : `${client.firstname} ${client.lastname}`;

  if (loading) {
    return <CreditInformationSkeleton />;
  }

  if (!credit) {
    return (
      <View>
        <Text>Credit fetch error</Text>
      </View>
    );
  }

  const isPaid = credit.balance > 0;

  return (
    <Portal.Host>
      <View className="flex-1 ">
        <AnimatedHeader
          containerStyle={{ backgroundColor: "#f1f5f9" }}
          title={fullname}
          onBackPress={() => navigation.goBack()}
        />
        <View className="flex-1 bg-slate-200">
          <View className="p-6 pb-2 gap-6 ">
            <View
              className="items-center p-6 gap-4 rounded-md bg-slate-100"
              style={{ elevation: 5 }}
            >
              <Pressable
                className="w-12 p-1 items-center rounded-lg absolute right-0"
                onPress={() => setModalOptions(() => ({ visible: true, type: "creditForm" }))}
              >
                <Edit size={20} />
              </Pressable>
              <View className="w-full flex-row justify-evenly gap-4">
                <CardItem label="Credit Date" value={formatDate(new Date(credit.creditDate))} />
                <CardItem label="Due Date" value={formatDate(new Date(credit.dueDate))} />
              </View>
              <View className="w-full flex-row justify-evenly gap-4">
                <CardItem label="Principal" value={`AED ${formatNumber(credit.principalAmount)}`} />
                <CardItem label="Balance" value={`AED ${formatNumber(credit.balance)}`} />
              </View>
              <View className="w-full flex-row justify-evenly gap-4">
                <CardItem
                  label="Current Interest"
                  value={`AED ${formatNumber(credit.currentInterestAmount)}`}
                />
                <CardItem label="Interest Rate" value={`${credit.interestRate}%`} />
              </View>
            </View>
            {isPaid && (
              <Pressable
                className="flex-row self-start items-center p-2 gap-2"
                onPress={() => setModalOptions(() => ({ visible: true, type: "settlementForm" }))}
              >
                <Plus size={24} />
                <Text>Add New Settlement</Text>
              </Pressable>
            )}
          </View>

          <TabsProvider
            tabStyle={{ gap: 16, padding: 16 }}
            tabButtonStyle={{ borderRadius: 20, padding: 8 }}
            activeTabStyle={{ backgroundColor: "#cbd5e1" }}
            activeTabTextStyle={DEFAULT_ACTIVE_TAB_STYLE}
          >
            <Tab label="Settlements">
              <Settlements data={credit.settlements} />
            </Tab>
            <Tab label="History">
              <History history={credit.history} />
            </Tab>
          </TabsProvider>

          <Modal
            visible={modalOptions.visible}
            onBackdropPress={hideModal}
            onBackButtonPress={hideModal}
            animationInTiming={300}
            animationOutTiming={300}
          >
            <AnimatedPadding>
              {modalOptions.type === "settlementForm" ? (
                <AddSettlementForm
                  currentInterestAmount={credit.currentInterestAmount}
                  submitCallback={() => {
                    fetchCredit();
                    hideModal();
                  }}
                  credit={credit}
                />
              ) : (
                <UpdateCreditForm
                  credit={credit}
                  submitCallback={() => {
                    fetchCredit();
                    hideModal();
                  }}
                />
              )}
            </AnimatedPadding>
          </Modal>
        </View>
      </View>
    </Portal.Host>
  );
};

export default CreditInformation;
