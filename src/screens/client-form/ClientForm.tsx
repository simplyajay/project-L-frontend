import React, { useCallback, useRef, useEffect } from "react";
import {
  View,
  Text,
  Animated,
  Pressable,
  ActivityIndicator,
  PressableProps,
  Keyboard,
} from "react-native";
import { PhoneInput, TextInput, withLabel } from "@/components/common/Input";
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
import { DEFAULT_FIELD_STYLE } from "@/components/common/Input";
import CountryPickerModal from "./components/CountryPickerModal";

const LabeledTextInput = withLabel(TextInput<ClientFormType>);
const LabeledPhoneInput = withLabel(PhoneInput<ClientFormType>);

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

  const { isDirty, errors } = formState;

  const [countryModalVisible, setCountryModalVisible] = React.useState(false);
  const [activeField, setActiveField] = React.useState<Path<ClientFormType> | null>(null);

  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);
  const contentRef = useRef<View>(null);
  const fieldRefs = useRef<Record<string, View | null>>({});
  const scrollY = useRef(new Animated.Value(0)).current;

  const bgColor = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: ["rgba(241,245,249,1)", "rgba(203,213,225,1)"],
    extrapolate: "clamp",
  });

  //scroll to error
  useEffect(() => {
    const firstKey = Object.keys(formState.errors)[0];
    if (!firstKey) return;

    const rootName = firstKey.split(".")[0];
    const field = fieldRefs.current[rootName];
    const container = contentRef.current;

    if (!field || !container) return;

    requestAnimationFrame(() => {
      field.measureLayout(container, (_x, y) => {
        scrollViewRef.current?.scrollToPosition(0, y - 20, true);
      });
    });
  }, [formState.errors]);

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
      name: f.name,
      label: f.label,
      control,
      loading,
      clearErrors,
      className: DEFAULT_FIELD_STYLE,
    };

    return (
      <View
        key={f.name}
        ref={(ref) => {
          fieldRefs.current[f.name] = ref;
        }}
      >
        {f.isPhone ? (
          <LabeledPhoneInput
            key={index}
            {...commonProps}
            onButtonPress={(name) => handleCountryButtonPress(name)}
          />
        ) : (
          <LabeledTextInput
            {...commonProps}
            key={index}
            placeholder={client ? "" : f.placeholder}
          />
        )}
      </View>
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
              className={`w-16 p-2 items-center rounded-md bg-gray-800`}
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
        ref={scrollViewRef}
        enableOnAndroid
        extraScrollHeight={180} // how much to push up
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        onScroll={(e) => {
          scrollY.setValue(e.nativeEvent.contentOffset.y);
        }}
      >
        <View ref={contentRef}>
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
                  <View className="flex-row items-center gap-4" key={index}>
                    <View className="flex-1">
                      <LabeledPhoneInput
                        name={`otherPhones.${index}` as const}
                        control={control}
                        loading={loading}
                        label={`Additional Phone ${index + 1}`}
                        clearErrors={clearErrors}
                        className={"border border-gray-300 rounded-lg"}
                        onButtonPress={handleCountryButtonPress}
                      />
                    </View>
                    <View>
                      <PhoneAction className="top-3" onPress={() => remove(index)} />
                    </View>
                  </View>
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
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ClientForm;
