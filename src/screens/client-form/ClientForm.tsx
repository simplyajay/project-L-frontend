import React, { useCallback, useRef } from "react";
import {
  withErrorAndLabel,
  withActionButton,
  StringInput,
  PhoneInput,
  IPhoneTextField,
} from "@/components/common/TextField";
import {
  View,
  Text,
  Animated,
  Pressable,
  ActivityIndicator,
  PressableProps,
  Keyboard,
} from "react-native";
import { Path } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { CircleMinus } from "lucide-react-native";
import { AnimatedHeader } from "@/components/common/Header";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { ClientFormRouteProp, RootNavigationProp } from "@/lib/types/navigation";
import { personalInfoFields, contactInfoFields } from "@/lib/schema/client";
import { ClientFormType } from "@/lib/schema/client";
import { useClientForm } from "./useClientForm";
import { ICountry } from "@/lib/utils/countries";
import CountryPickerModal from "./components/CountryPickerModal";

const textFieldClassName = "w-full border rounded-lg";
const phoneContainerClassName = "flex-1 border rounded-lg";

const LabeledTextInput = withErrorAndLabel<ClientFormType>(StringInput);
const PhoneInputWithAction = withActionButton<ClientFormType, IPhoneTextField<ClientFormType>>(
  PhoneInput
);
const LabeledPhoneInputWithAction = withErrorAndLabel<
  ClientFormType,
  IPhoneTextField<ClientFormType> & { label: string; actionComponent?: React.ReactNode }
>(PhoneInputWithAction);

const PhoneAction = (props: PressableProps) => {
  return (
    <Pressable {...props}>
      <CircleMinus size={24} color="#f87171" />
    </Pressable>
  );
};

const ClientForm = () => {
  const route = useRoute<ClientFormRouteProp>();
  const navigation = useNavigation<RootNavigationProp>();

  const client = route.params?.client;
  const {
    control,
    loading,
    fields,
    formState,
    handleSubmit,
    onSubmit,
    clearErrors,
    append,
    remove,
    setValue,
    getValues,
  } = useClientForm({ client });

  const { isDirty } = formState;

  const [countryModalVisible, setCountryModalVisible] = React.useState(false);
  const [activeField, setActiveField] = React.useState<Path<ClientFormType> | null>(null);

  const scrollY = useRef(new Animated.Value(0)).current;

  const bgColor = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: ["rgba(241,245,249,1)", "rgba(203,213,225,1)"],
    extrapolate: "clamp",
  });

  const toggleModal = useCallback(() => {
    setCountryModalVisible((prev) => !prev);
    Keyboard.dismiss();
  }, []);

  const handleCountryButtonPress = useCallback((name: Path<ClientFormType>) => {
    setActiveField(name);
    toggleModal();
  }, []);

  const handleCountrySelect = useCallback(
    (country: ICountry) => {
      if (activeField) {
        console.log("zxc");
        setValue(activeField, {
          countryCode: country.code as string,
          value: getValues("phone.value"),
        });
        setActiveField(null);
      }
    },
    [activeField]
  );

  const renderFields = (
    f: (typeof personalInfoFields)[number] | (typeof contactInfoFields)[number],
    index: number
  ) => {
    const commonProps = {
      key: index,
      loading,
      name: f.name,
      formState,
      clearErrors,
      control,
      className: f.isPhone ? phoneContainerClassName : textFieldClassName,
    };

    if (f.isPhone) {
      return (
        <LabeledPhoneInputWithAction
          {...commonProps}
          key={index}
          label={f.label}
          onButtonPress={(name) => handleCountryButtonPress(name)}
        />
      );
    }

    return (
      <LabeledTextInput
        {...commonProps}
        key={index}
        label={!client ? (f.optional ? `${f.label} ( Optional )` : f.label) : f.label}
        placeholder={client ? "" : f.placeholder}
      />
    );
  };

  return (
    <View className="flex-1 bg-slate-100">
      <AnimatedHeader
        containerStyle={{ backgroundColor: bgColor }}
        title={client ? "Update Information" : "Add New Client"}
        onBackPress={() => navigation.goBack()}
        actionComponent={
          isDirty && (
            <Pressable
              className={`w-16 p-3 items-center rounded-md bg-gray-800`}
              onPress={handleSubmit(onSubmit)}
              disabled={!isDirty}
            >
              {loading ? (
                <ActivityIndicator size={19} color="#adadad" />
              ) : (
                <Text className="text-white">Save</Text>
              )}
            </Pressable>
          )
        }
      />
      <KeyboardAwareScrollView
        enableOnAndroid
        extraScrollHeight={180} // how much to push up
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        onScroll={(e) => {
          scrollY.setValue(e.nativeEvent.contentOffset.y);
        }}
      >
        <Pressable
          className="flex-1 gap-6 p-2 w-full bg-slate-100"
          onPress={() => Keyboard.dismiss()}
        >
          <View className="w-full gap-6 p-2">
            <Text className="text-lg font-bold">Personal Information</Text>
            <View className=" gap-6 px-2">{personalInfoFields.map(renderFields)}</View>
          </View>
          <View className="w-full gap-6 p-2">
            <Text className="text-lg font-bold">Contact Information</Text>
            <View className="gap-6 px-2">
              {contactInfoFields.map(renderFields)}
              {fields.map((field, index) => (
                <LabeledPhoneInputWithAction
                  key={index}
                  loading={loading}
                  label={`Additional Phone ${index + 1}`}
                  name={`otherPhones.${index}` as const}
                  formState={formState}
                  clearErrors={clearErrors}
                  control={control}
                  onButtonPress={(name) => handleCountryButtonPress(name)}
                  actionComponent={<PhoneAction onPress={() => remove(index)} />}
                  className={phoneContainerClassName}
                />
              ))}
              <Pressable
                onPress={() => append({ countryCode: "AE", value: "" })} // add a new empty phone object
                className="flex-row items-start rounded-md"
              >
                <Text className="text-amber-600 font-semibold">Add phone number</Text>
              </Pressable>
            </View>
          </View>
          <CountryPickerModal
            visible={countryModalVisible}
            toggle={toggleModal}
            onSelect={handleCountrySelect}
          />
        </Pressable>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ClientForm;
