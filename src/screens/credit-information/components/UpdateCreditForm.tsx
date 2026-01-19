import React, { useState } from "react";
import { View, Text, Pressable, ActivityIndicator, Keyboard } from "react-native";
import { CreditType } from "@/lib/types/credit";
import { useForm, Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateCreditSchemaType, UpdateCreditSchema } from "@/lib/schema/credit";
import {
  CurrencyInput,
  DateInput,
  withLabel,
  DEFAULT_FIELD_STYLE,
} from "@/components/common/Input";
import { useSnackbar } from "@/components/common/Snackbar";
import { Percent } from "lucide-react-native";
import Picker from "@/components/common/Picker";
import { updateCredit } from "@/api/credits";

type UpdateCreditFormProps = {
  credit: CreditType;
  submitCallback?: () => void;
};

type FormField = {
  name: Path<UpdateCreditSchemaType>;
  label: string;
  type: "date" | "currency";
};

const formFields: FormField[] = [
  { name: "principalAmount", label: "Principal Amount", type: "currency" },
  { name: "balance", label: "Balance", type: "currency" },
  { name: "interestRate", label: "Interest Rate", type: "currency" },
  { name: "creditDate", label: "Credit Date", type: "date" },
];

const LabeledCurrencyInput = withLabel(CurrencyInput<UpdateCreditSchemaType>);
const LabeledDateInput = withLabel(DateInput<UpdateCreditSchemaType>);

const UpdateCreditForm = ({ credit, submitCallback }: UpdateCreditFormProps) => {
  const { control, clearErrors, handleSubmit, setValue } = useForm<UpdateCreditSchemaType>({
    resolver: zodResolver(UpdateCreditSchema),
    defaultValues: getDefaultValues(credit),
  });

  const { showMessage } = useSnackbar();
  const [creditDate, setCreditDate] = useState(credit.creditDate);
  const [loading, setLoading] = useState(false);
  const [pickerVisible, setPickerVisible] = useState(false);

  const handleDateSelect = (date: Date) => {
    setCreditDate(date);
    setValue("creditDate", date);
    setPickerVisible(false);
  };

  const onSubmit = async (formData: UpdateCreditSchemaType) => {
    setLoading(true);

    const response = await updateCredit({
      id: credit._id,
      data: { ...formData, updateDate: new Date(Date.now()) },
    });

    if (response.ok) {
      if (submitCallback) submitCallback();

      showMessage("Credit Updated");
    } else {
      const { code, message } = response;
      console.log(`Error updating credit [${code}]: `, message);
    }

    setLoading(false);
  };

  return (
    <View className="w-full">
      <View className="w-full p-4 items-center border-b border-gray-300">
        <Text className="text-xl font-semibold">Update Credit</Text>
      </View>
      <View className="w-full p-6 gap-6 items-center justify-center">
        {formFields.map(({ name, label, type }) => {
          const percentIcon =
            name === "interestRate" ? <Percent size={18} color="#6b7280" /> : undefined;
          const commonProps = {
            name,
            control,
            label,
            loading,
            className: DEFAULT_FIELD_STYLE,
            clearErrors,
          };

          return type === "currency" ? (
            <LabeledCurrencyInput
              key={name}
              {...commonProps}
              icon={percentIcon}
              maxValue={name === "interestRate" ? 20 : undefined}
            />
          ) : (
            <LabeledDateInput
              key={name}
              {...commonProps}
              onFieldPress={() => setPickerVisible(true)}
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
            <Text className="text-white">Update Credit</Text>
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

export default UpdateCreditForm;

const getDefaultValues = (credit: CreditType): UpdateCreditSchemaType => ({
  principalAmount: credit.principalAmount,
  balance: credit.balance,
  interestRate: credit.interestRate,
  creditDate: new Date(credit.creditDate),
});
