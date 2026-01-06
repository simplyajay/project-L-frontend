import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { ICountry, countries } from "@/lib/utils/countries";
import { getFlagEmoji } from "@/lib/utils/countries";
import Searchbar from "@/components/common/Searchbar";
import Modal from "@/components/common/Modal";
import { getCountryCallingCode } from "libphonenumber-js";

interface CountryPickerModal {
  visible: boolean;
  toggle: () => void;
  onSelect: (country: ICountry) => void;
}

const PickerModal = ({ visible, toggle, onSelect }: CountryPickerModal) => {
  const [searchInput, setSearchInput] = useState("");

  const filteredCountries = useMemo(() => {
    return countries.filter((country) =>
      country.name.toLowerCase().includes(searchInput.toLowerCase())
    );
  }, [searchInput]);

  const handleSelect = (country: ICountry) => {
    onSelect(country);
    toggle();
    Keyboard.dismiss();
  };

  useEffect(() => {
    const t = setTimeout(() => setSearchInput(""), 300);
    return () => clearTimeout(t);
  }, [visible]);

  const renderHeader = useCallback(() => {
    return (
      <View className="w-full items-center justify-center py-4 gap-2">
        <Text className="text-2xl ">Select a country</Text>
        <Searchbar
          placeholder="Search for a country..."
          value={searchInput}
          setValue={setSearchInput}
        />
      </View>
    );
  }, [searchInput, setSearchInput]);

  const renderItem = useCallback(
    ({ item }: { item: ICountry }) => (
      <Pressable
        className="justify-around p-3  rounded-md "
        onPress={() => handleSelect(item)}
        android_ripple={{ color: "#e8e8e8" }}
      >
        <View className="flex-row flex-1 items-center justify-between gap-2">
          <View className="flex-1 flex-row items-center gap-3">
            <Text className="text-lg">{getFlagEmoji(item.code)}</Text>
            <Text className="flex-shrink">{item.name}</Text>
          </View>

          <View className="w-[30%] items-end justify-center">
            <Text>{`+${getCountryCallingCode(item.code)}`}</Text>
          </View>
        </View>
      </Pressable>
    ),
    [handleSelect]
  );

  return (
    <Modal
      visible={visible}
      onBackdropPress={toggle}
      onBackButtonPress={toggle}
      animationInTiming={300}
      animationOutTiming={300}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ height: 600 }}
      >
        <Pressable style={{ height: 600, width: "100%" }} className="px-4 bg-white rounded-lg">
          {renderHeader()}
          <FlashList
            data={filteredCountries}
            keyExtractor={(item) => item.code}
            style={{ maxHeight: 700, height: 600, gap: 8 }}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const CountryPickerModal = React.memo(PickerModal);

export default CountryPickerModal;
