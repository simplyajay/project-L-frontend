import React, { useState, useEffect, useRef } from "react";
import { View, Text, Keyboard, Animated, Pressable } from "react-native";
import { StringInput, withErrorAndLabel } from "@/components/common/TextField";
import { SettlementFormType, SettlementSchema } from "@/lib/schema/settlement";
import { settlementFormFields } from "@/lib/schema/settlement";
import { useForm, get } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toReadableDate } from "@/lib/utils/date";
import Picker from "@/components/common/Picker";
import { Calendar } from "lucide-react-native";

const LabeledTextInput = withErrorAndLabel<SettlementFormType>(StringInput);

const textFieldClassName = "w-full border border-gray-300 rounded-lg";

const AddSettlementForm = ({
  currentIneterestAmount,
  currentDate,
}: {
  currentIneterestAmount?: number;
  currentDate: Date;
}) => {
  const { control, handleSubmit, formState, clearErrors, setError, setValue, getValues, reset } =
    useForm<SettlementFormType>({
      resolver: zodResolver(SettlementSchema),
      defaultValues: {
        interestAmount: currentIneterestAmount?.toString(),
        settlementAmount: "2",
        settlementDate: toReadableDate(currentDate),
      },
      reValidateMode: "onSubmit",
    });

  const [loading, setLoading] = useState(false);
  const [settlementDate, setSettlementDate] = useState(currentDate);
  const [pickerVisible, setPickerVisible] = useState(false);

  const onSubmit = () => {
    console.log("submit");
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
    setValue("settlementDate", date.toLocaleDateString());
    setPickerVisible(false);
  };

  return (
    <Animated.View className="w-full bg-slate-200 rounded-t-lg" style={animatedStyle}>
      <View className="w-full p-4 items-center border-b border-gray-300">
        <Text className="text-lg ">Settlement</Text>
      </View>
      <View className="w-full p-6 gap-6 items-center justnify-center">
        {settlementFormFields.map((field, index) => (
          <LabeledTextInput
            key={index}
            name={field.name}
            label={field.label}
            editable={field.isEditable}
            placeholder={field.placeholder}
            formState={formState}
            clearErrors={clearErrors}
            control={control}
            loading={loading}
            className={textFieldClassName}
            keyboardType={field.keyboardType ?? "default"}
            inputIcon={
              field.name === "settlementDate"
                ? {
                    pressable: true,
                    icon: <Calendar size={22} color="#6b7280" />,
                    onIconPress: () => setPickerVisible(true),
                  }
                : undefined
            }
          />
        ))}

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
