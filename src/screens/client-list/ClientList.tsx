import React, { useCallback, useEffect, useMemo } from "react";
import { View, RefreshControl, FlatList, Text } from "react-native";
import { useDebounce } from "@/components/hooks/useDebounce";
import { IClientSummary } from "@/lib/types/client";
import { RootNavigationProp } from "@/lib/types/navigation";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { UserRoundPlus, HandCoins, Plus } from "lucide-react-native";
import { useClientList } from "./useClientList";
import { useFilterAndSort } from "./useFilterAndSort";
import { applyFilterAndSort } from "./applyFilterAndSort";
import { useClientStore } from "@/store/useClientStore";
import ClientListSkeleton from "@/components/skeleton/ClientListSkeleton";
import ClientSummaryCard from "@/screens/client-list/components/ClientSummaryCard";
import Utilities from "@/screens/client-list/components/Utilities";
import FilterAndSortModal from "@/screens/client-list/components/FilterAndSortModal";
import Fab from "@/components/common/Fab";
import TransactionSummary from "@/screens/client-list/components/TransactionSummary";

const ClientList = () => {
  //update backend to return only the latest unsettled credit

  const navigation = useNavigation<RootNavigationProp>();
  const screenFocused = useIsFocused();

  const { shouldRefresh, setShouldRefresh } = useClientStore();
  const { loading, clients, totalBalance, totalOverdue, fetchClients } = useClientList();
  const {
    sortBy,
    selectedFilters,
    searchInput,
    sortDirection,
    utilityControls,
    isModalVisible,
    filterAndSortItems,
    toggleModal,
    handleSort,
  } = useFilterAndSort();

  const debouncedSearch = useDebounce(searchInput, 300);

  const handleCardPress = useCallback((item: IClientSummary) => {
    navigation.navigate("ClientInformation", { clientId: item._id });
  }, []);

  const handleAddClientPress = useCallback(() => {
    navigation.push("ClientForm");
  }, []);

  const handleAddCreditPress = useCallback(() => {
    console.log("creditPress");
  }, []);

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    if (shouldRefresh) {
      fetchClients();
      setShouldRefresh(false);
    }
  }, [shouldRefresh]);

  const filteredClients = useMemo(() => {
    return applyFilterAndSort({
      data: clients,
      ...(debouncedSearch && { search: debouncedSearch }),
      filter: selectedFilters,
      sortBy: sortBy.key,
      direction: sortDirection,
    });
  }, [clients, debouncedSearch, selectedFilters, sortBy, sortDirection]);

  return loading ? (
    <ClientListSkeleton />
  ) : (
    <View className="flex-1">
      <View className="w-full gap-4 p-4 bg-slate-200 border-b border-slate-300">
        <TransactionSummary
          numberOfClients={clients.length}
          amountOverdue={totalOverdue}
          totalAmount={totalBalance}
        />

        <Utilities control={utilityControls} />
      </View>
      <FlatList
        data={filteredClients}
        keyExtractor={(item, index) => `${item._id}=${index}`}
        contentContainerStyle={{ gap: 16, padding: 16, backgroundColor: "#e2e8f0", flexGrow: 1 }}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchClients} />}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ClientSummaryCard client={item} handlePress={() => handleCardPress(item)} />
        )}
        ListEmptyComponent={
          <View>
            {debouncedSearch ? (
              <Text>
                No results found for <Text className="font-bold">{`" ${debouncedSearch} "`}</Text>
              </Text>
            ) : (
              <Text>No Clients</Text>
            )}
          </View>
        }
      />

      <Fab
        visible={screenFocused}
        actions={[
          { icon: <HandCoins color="#374151" />, onPress: handleAddCreditPress },
          { icon: <UserRoundPlus color="#374151" />, onPress: handleAddClientPress },
        ]}
        fabIcon={<Plus size={24} color="white" />}
      />
      <FilterAndSortModal
        isModalVisible={isModalVisible}
        data={filterAndSortItems}
        sortSetting={sortBy}
        filterSetting={selectedFilters}
        toggle={toggleModal}
        handleSort={handleSort}
      />
    </View>
  );
};

export default ClientList;
