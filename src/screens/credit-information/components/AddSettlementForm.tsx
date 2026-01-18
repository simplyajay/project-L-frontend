import React, { useState } from "react";
import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { SettlementFormType, SettlementSchema } from "@/lib/schema/settlement";
import { useForm, Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatDate } from "@/lib/utils/date";
import {
  CurrencyInput,
  DateInput,
  withLabel,
  DEFAULT_FIELD_STYLE,
} from "@/components/common/Input";
import { addSettlement } from "@/api/credits";
import { useSnackbar } from "@/components/common/Snackbar";
import { useRefreshStore } from "@/store/useRefreshStore";
import Picker from "@/components/common/Picker";
import { CreditType } from "@/lib/types/credit";

const LabeledCurrencyInput = withLabel(CurrencyInput<SettlementFormType>);
const LabeledDateInput = withLabel(DateInput<SettlementFormType>);

type FormField = {
  name: Path<SettlementFormType>;
  label: string;
};

type SettlementFormProps = {
  credit: CreditType;
  currentInterestAmount?: number;
  submitCallback?: () => void;
};

const settlementFormFields: FormField[] = [
  { name: "interestAmount", label: "Interest Amount" },
  { name: "settlementAmount", label: "Settlement Amount" },
  { name: "settlementDate", label: "Settlement Date" },
];

const currentDate = new Date(Date.now());

const AddSettlementForm = ({
  currentInterestAmount,
  submitCallback,
  credit,
}: SettlementFormProps) => {
  const { control, handleSubmit, clearErrors, setValue } = useForm<SettlementFormType>({
    resolver: zodResolver(SettlementSchema),
    defaultValues: {
      interestAmount: currentInterestAmount,
      settlementAmount: 0,
      settlementDate: currentDate,
    },
    reValidateMode: "onSubmit",
  });

  const { triggerRefresh } = useRefreshStore();
  const { showMessage } = useSnackbar();

  const [loading, setLoading] = useState(false);
  const [settlementDate, setSettlementDate] = useState(currentDate);
  const [pickerVisible, setPickerVisible] = useState(false);

  const onSubmit = async (formData: SettlementFormType): Promise<void> => {
    setLoading(true);

    const response = await addSettlement({ id: credit._id, data: formData });

    if (response.ok) {
      if (submitCallback) submitCallback();

      triggerRefresh("clientInfo");
      showMessage("Added new settlement");
    } else {
      const { code, message } = response;
      console.error(code, ": ", message);
      showMessage("Error adding new settlement");
    }

    setLoading(false);
  };

  const handleDateSelect = (date: Date) => {
    setSettlementDate(date);
    setValue("settlementDate", date);
    setPickerVisible(false);
  };

  return (
    <View className="w-full">
      <View className="w-full p-4 items-center border-b border-gray-300">
        <Text className="text-xl font-semibold">Settlement</Text>
      </View>
      <View className="w-full p-6 gap-6 items-center justify-center">
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
            <LabeledCurrencyInput
              key={name}
              {...commonProps}
              placeholder="0.00"
              maxValue={name === "settlementAmount" ? credit.balance : undefined}
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
            <Text className="text-white">Add Settlement</Text>
          )}
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
    </View>
  );
};

export default AddSettlementForm;
