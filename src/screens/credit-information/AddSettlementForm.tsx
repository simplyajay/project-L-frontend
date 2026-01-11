import React, { useState, useEffect, useRef } from "react";
import { View, Text, Keyboard, Animated, Pressable } from "react-native";
import { SettlementFormData, SettlementFormType, SettlementSchema } from "@/lib/schema/settlement";
import { useForm, Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatDate } from "@/lib/utils/date";
import {
  CurrencyInput,
  DateInput,
  withLabel,
  DEFAULT_FIELD_STYLE,
} from "@/components/common/Input";
import Picker from "@/components/common/Picker";

const LabeledCurrencyInput = withLabel(CurrencyInput<SettlementFormType>);
const LabeledDateInput = withLabel(DateInput<SettlementFormType>);

interface SettlementFormField {
  name: Path<SettlementFormType>;
  label: string;
}

const settlementFormFields: SettlementFormField[] = [
  { name: "interestAmount", label: "Interest Amount" },
  { name: "settlementAmount", label: "Settlement Amount" },
  { name: "settlementDate", label: "Settlement Date" },
];

const AddSettlementForm = ({
  currentInterestAmount,
  currentDate,
}: {
  currentInterestAmount?: number;
  currentDate: Date;
}) => {
  const { control, handleSubmit, formState, clearErrors, setError, setValue, getValues, reset } =
    useForm<SettlementFormType>({
      resolver: zodResolver(SettlementSchema),
      defaultValues: {
        interestAmount: currentInterestAmount,
        settlementAmount: 0,
        settlementDate: currentDate,
      },
      reValidateMode: "onSubmit",
    });

  const [loading, setLoading] = useState(false);
  const [settlementDate, setSettlementDate] = useState(currentDate);
  const [pickerVisible, setPickerVisible] = useState(false);

  const onSubmit = (formData: SettlementFormData) => {
    //  const data: SettlementFormTrueData = { settlementAmount:  }
    console.log(formData);
  };

  useEffect(() => {
    // console.log(pickerVisible);
  }, [pickerVisible]);

  const animatedPadding = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const showListener = Keyboard.addListener("keyboardDidShow", (e) => {
      Animated.timing(animatedPadding, {
        toValue: e.endCoordinates.height,
        duration: 200,
        useNativeDriver: false,
      }).start();
    });

    const hideListener = Keyboard.addListener("keyboardDidHide", () => {
      Animated.timing(animatedPadding, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, [animatedPadding]);

  const animatedStyle = { paddingBottom: animatedPadding };

  const handleDateSelect = (date: Date) => {
    setSettlementDate(date);
    setValue("settlementDate", date);
    setPickerVisible(false);
  };

  return (
    <Animated.View className="w-full bg-slate-200 rounded-t-lg" style={animatedStyle}>
      <View className="w-full p-4 items-center border-b border-gray-300">
        <Text className="text-lg ">Settlement</Text>
      </View>
      <View className="w-full p-6 gap-6 items-center justnify-center">
        {settlementFormFields.map(({ name, label }) => {
          const commonProps = {
            name,
            control,
            label,
            loading,
            className: DEFAULT_FIELD_STYLE,
            clearErrors,
          };
          return name !== "settlementDate" ? (
            <LabeledCurrencyInput key={name} {...commonProps} placeholder="0.00" />
          ) : (
            <LabeledDateInput
              key={name}
              {...commonProps}
              placeholder={formatDate(currentDate)}
              onFieldPress={() => setPickerVisible(true)}
            />
          );
        })}

        <Pressable
          className="w-full p-4 items-center justify-center  bg-[#303030] rounded-lg"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-white">Add Settlement</Text>
        </Pressable>
      </View>

      {pickerVisible && (
        <Picker
          minDate={new Date(2020, 0, 1)}
          maxDate={new Date(Date.now())}
          defaultValue={settlementDate}
          handleDateChange={handleDateSelect}
          handleDismiss={() => setPickerVisible(false)}
        />
      )}
    </Animated.View>
  );
};

export default AddSettlementForm;
