import React, { useState } from "react";
import { View, Text, Pressable, ActivityIndicator, TextInputProps } from "react-native";
import { useForm, Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddCreditSchema, AddCreditSchemaType } from "@/lib/schema/credit";
import { Percent } from "lucide-react-native";
import { CurrencyInput, DateInput, withLabel, DEFAULT_FIELD_STYLE } from "@/components/common/Input";
import { useSnackbar } from "@/components/common/Snackbar";
import { addCredit } from "@/api/credits";
import Picker from "@/components/common/Picker";
import { useAddCreditForm } from "../hooks/useAddCreditForm";

const LabeledCurrencyInput = withLabel(CurrencyInput<AddCreditSchemaType>);
const LabeledDateInput = withLabel(DateInput<AddCreditSchemaType>);

type AddCreditFormProps = {
  clientId: string;
  submitCallback?: () => void;
};

type FormField = {
  name: Path<AddCreditSchemaType>;
  label: string;
  placeholder?: string;
};

const formFields: FormField[] = [
  {
    name: "principalAmount",
    label: "Principal Amount",
    placeholder: "0.00",
  },
  {
    name: "interestRate",
    label: "Interest Rate",
    placeholder: "0",
  },
  { name: "creditDate", label: "Date" },
];

const AddCreditForm = ({ submitCallback, clientId }: AddCreditFormProps) => {
  const { control, loading, creditDate, clearErrors, onDateSelect, onSubmit } = useAddCreditForm({ clientId });

  const { showMessage } = useSnackbar();
  const [pickerVisible, setPickerVisible] = useState(false);

  const handleDateSelect = (date: Date) => {
    onDateSelect(date);
    setPickerVisible(false);
  };

  const handleAddButtonPress = async () => {
    const success = await onSubmit();

    if (success) {
      if (submitCallback) submitCallback();
      showMessage("Added New Credit");
    } else {
      showMessage("Error Adding New Credit");
    }
  };

  return (
    <View className="w-full">
      <View className="w-full p-4 items-center border-b border-gray-300">
        <Text className="text-lg font-semibold">Add New Credit</Text>
      </View>
      <View className="w-full p-6 gap-6 items-center justify-center ">
        {formFields.map(({ name, label, placeholder }, index) => {
          const percentIcon = name === "interestRate" ? <Percent size={18} color="#6b7280" /> : undefined;
          const commonProps = {
            control,
            name,
            label,
            loading,
            clearErrors,
            placeholder,
            className: DEFAULT_FIELD_STYLE,
          };
          return name === "creditDate" ? (
            <LabeledDateInput key={index} {...commonProps} onFieldPress={() => setPickerVisible(true)} />
          ) : (
            <LabeledCurrencyInput
              key={index}
              {...commonProps}
              icon={percentIcon}
              maxValue={name === "interestRate" ? 20 : undefined}
            />
          );
        })}

        <Pressable
          className="w-full p-4 items-center justify-center  bg-[#303030] rounded-lg"
          disabled={loading}
          onPress={handleAddButtonPress}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#adadad" />
          ) : (
            <Text className="text-white">Add Credit</Text>
          )}
        </Pressable>
      </View>
      {pickerVisible && (
        <Picker
          minDate={new Date(2020, 0, 1)}
          maxDate={new Date(Date.now())}
          defaultValue={creditDate}
          handleDateChange={handleDateSelect}
          handleDismiss={() => setPickerVisible(false)}
        />
      )}
    </View>
  );
};

export default AddCreditForm;
