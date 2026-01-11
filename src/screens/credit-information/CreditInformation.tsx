import React, { useCallback, useState } from "react";
import { View, Text, Pressable, Keyboard } from "react-native";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { AnimatedHeader } from "@/components/common/Header";
import { useNavigation } from "@react-navigation/native";
import { formatNumber } from "@/lib/utils/number";
import { CreditInformationRouteProp, RootNavigationProp } from "@/lib/types/navigation";
import { formatDate } from "@/lib/utils/date";
import { TabsProvider, Tab } from "@/components/common/Tabs";
import { Edit, Plus } from "lucide-react-native";
import { Portal } from "react-native-paper";
import Settlements from "./components/Settlements";
import History from "./components/History";
import AddSettlementModal from "./components/AddSettlementModal";

const CardItem = ({ label, value }: { label: string; value: any }) => {
  return (
    <View className="flex-1 items-start justify-center">
      <Text className="text-gray-500 text-sm font-semibold">{label}</Text>
      <Text className="text-gray-700 text-lg font-semibold">{value}</Text>
    </View>
  );
};

const CreditInformation = () => {
  const route = useRoute<CreditInformationRouteProp>();
  const navigation = useNavigation<RootNavigationProp>();
  const screenFocused = useIsFocused();

  const [addSettlementVisible, setAddSettlementVisible] = useState(false);
  const [updateCreditVisible, setUpdateCreditVisible] = useState(false);

  const { credit, client } = route.params;

  const handleAddSettlement = useCallback(() => {
    setAddSettlementVisible((prev) => {
      Keyboard.dismiss();
      return !prev;
    });
  }, []);

  const fullname = client.middlename
    ? `${client.firstname} ${client.middlename} ${client.lastname}`
    : `${client.firstname} ${client.lastname}`;

  return (
    <Portal.Host>
      <View className="flex-1 bg-white">
        <AnimatedHeader
          containerStyle={{ backgroundColor: "#f1f5f9" }}
          title={fullname}
          onBackPress={() => navigation.goBack()}
          actionComponent={
            <Pressable
              className="w-10 p-1 items-center rounded-lg"
              onPress={() => console.log("edit clicked")}
            >
              <Edit size={20} />
            </Pressable>
          }
        />
        <View className="flex-1 bg-slate-200">
          <View className="p-6 pb-2 gap-6 ">
            <View
              className="items-center p-6 gap-4 rounded-md bg-slate-100"
              style={{ elevation: 5 }}
            >
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
            <Pressable
              className="flex-row self-start items-center p-2 gap-2"
              onPress={handleAddSettlement}
            >
              <Plus size={24} />
              <Text>Add New Settlement</Text>
            </Pressable>
          </View>
          <TabsProvider
            tabStyle={{ gap: 16, padding: 16 }}
            tabButtonStyle={{ borderRadius: 20, padding: 8 }}
            activeTabStyle={{ backgroundColor: "#cbd5e1" }}
          >
            <Tab label="Settlements">
              <Settlements data={credit.settlements} />
            </Tab>
            <Tab label="History">
              <History history={credit.history} />
            </Tab>
          </TabsProvider>
          <AddSettlementModal
            interestAmount={credit.currentInterestAmount}
            isModalVisible={addSettlementVisible}
            toggle={handleAddSettlement}
          />
        </View>
      </View>
    </Portal.Host>
  );
};

export default CreditInformation;
