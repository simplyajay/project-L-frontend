import React, { useState } from "react";
import { View, Text, Pressable, ActivityIndicator, TextInputProps } from "react-native";
import { useForm, Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddCreditSchema, AddCreditSchemaType } from "@/lib/schema/credit";
import { Percent } from "lucide-react-native";
import {
  CurrencyInput,
  DateInput,
  withLabel,
  DEFAULT_FIELD_STYLE,
} from "@/components/common/Input";
import { useSnackbar } from "@/components/common/Snackbar";
import { addCredit } from "@/api/credits";
import Picker from "@/components/common/Picker";

const LabeledCurrencyInput = withLabel(CurrencyInput<AddCreditSchemaType>);
const LabeledDateInput = withLabel(DateInput<AddCreditSchemaType>);

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

const AddCreditForm = ({
  submitCallback,
  clientId,
}: {
  submitCallback?: () => void;
  clientId: string;
}) => {
  const { control, handleSubmit, clearErrors, setValue } = useForm<AddCreditSchemaType>({
    resolver: zodResolver(AddCreditSchema),
    defaultValues: { creditDate: new Date(Date.now()) },
    reValidateMode: "onSubmit",
  });

  const { showMessage } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [creditDate, setCreditDate] = useState(new Date(Date.now()));

  const handleDateSelect = (date: Date) => {
    setCreditDate(date);
    setValue("creditDate", date);
    setPickerVisible(false);
  };

  const onSubmit = async (data: AddCreditSchemaType) => {
    setLoading(true);

    const response = await addCredit({ data: { clientId, ...data } });

    if (response.ok) {
      if (submitCallback) submitCallback();

      showMessage("Added new credit");
    } else {
      const { code, message } = response;
      console.error(code, ": ", message);

      showMessage("Error adding new credit");
    }

    setLoading(false);
  };

  return (
    <View className="w-full">
      <View className="w-full p-4 items-center border-b border-gray-300">
        <Text className="text-lg font-semibold">Add New Credit</Text>
      </View>
      <View className="w-full p-6 gap-6 items-center justify-center ">
        {formFields.map(({ name, label, placeholder }, index) => {
          const percentIcon =
            name === "interestRate" ? <Percent size={18} color="#6b7280" /> : undefined;
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
            <LabeledDateInput
              key={index}
              {...commonProps}
              onFieldPress={() => setPickerVisible(true)}
            />
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
          onPress={handleSubmit(onSubmit)}
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
