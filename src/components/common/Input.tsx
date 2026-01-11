import React, { JSX } from "react";
import { View, TextInput as RNTextInput, Text, Pressable } from "react-native";
import {
  get,
  Control,
  Controller,
  FieldValues,
  UseFormClearErrors,
  UseControllerProps,
  ControllerRenderProps,
} from "react-hook-form";
import { Calendar } from "lucide-react-native";
import { TextInputProps as RNTextInputProps } from "react-native";
import { MoneyTextInput } from "@alexzunik/react-native-money-input";
import { formatDate, parseDate } from "@/lib/utils/date";

export const DEFAULT_FIELD_STYLE = "w-full border border-gray-300 rounded-lg";
const INNER_FIELD_STYLE = "items-center w-full flex-row";

type InputIcon =
  | {
      pressable: true;
      icon: React.ReactNode;
      onIconPress: () => void;
    }
  | {
      pressable?: undefined;
      icon: React.ReactNode;
      onIconPress?: never;
    };

interface InputWrapperProps<T extends FieldValues>
  extends Pick<UseControllerProps<T>, "name" | "rules" | "defaultValue"> {
  control: Control<T>;
  children: (props: { field: ControllerRenderProps<T>; fieldError: any }) => JSX.Element;
}

export interface InputProps<T extends FieldValues>
  extends Omit<InputWrapperProps<T>, "children">,
    Omit<RNTextInputProps, "defaultValue" | "children"> {
  loading: boolean;
  clearErrors: UseFormClearErrors<T>;
}

const InputWrapper = <T extends FieldValues>({ name, control, children }: InputWrapperProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, formState }) => {
        const { errors } = formState;

        const fieldError = get(errors, name);

        const getErrorMessage = (): string | undefined => {
          const fieldError = get(errors, name);
          if (!fieldError) return undefined;
          if (fieldError.message) return fieldError.message;
          if (typeof fieldError === "object") {
            const firstKey = Object.keys(fieldError)[0];
            return fieldError[firstKey]?.message;
          }
          return undefined;
        };

        const errorMessage = getErrorMessage();
        return (
          <View className="flex gap-1">
            {children({ field, fieldError })}
            {errorMessage && <Text className="text-red-400">{errorMessage}</Text>}
          </View>
        );
      }}
    />
  );
};

export const TextInput = <T extends FieldValues>(
  props: InputProps<T> & { inputIcon?: InputIcon }
) => {
  const {
    name,
    control,
    loading,
    className,
    editable,
    placeholder,
    clearErrors,
    inputIcon,
    keyboardType,
    secureTextEntry,
  } = props;
  return (
    <InputWrapper name={name} control={control}>
      {({ field, fieldError }) => {
        return (
          <View
            className={`${INNER_FIELD_STYLE} ${fieldError ? "border-red-400" : "border-slate-300"} ${className}`}
          >
            <RNTextInput
              keyboardType={keyboardType}
              secureTextEntry={secureTextEntry}
              placeholderTextColor="#9ca3af"
              editable={loading ? false : (editable ?? true)}
              className={`flex-1 ${inputIcon ? "p-3 pr-6" : "p-3"} text-gray-700 `}
              placeholder={placeholder}
              autoCapitalize="none"
              onChangeText={(text) => {
                clearErrors(field.name);
                field.onChange(text);
              }}
              onFocus={() => clearErrors(field.name)}
              value={field.value}
            />
            {inputIcon && (
              <Pressable
                className="flex-row max-w-12 max-h-11 right-4 items-center"
                onPress={inputIcon.pressable ? inputIcon.onIconPress : undefined}
              >
                {inputIcon.icon}
              </Pressable>
            )}
          </View>
        );
      }}
    </InputWrapper>
  );
};

export const CurrencyInput = <T extends FieldValues>(props: InputProps<T>) => {
  const { name, control, loading, editable, placeholder, clearErrors, className } = props;
  return (
    <InputWrapper name={name} control={control}>
      {({ field, fieldError }) => (
        <View
          className={`${INNER_FIELD_STYLE} ${fieldError ? "border-red-400" : "border-slate-300"} ${className}`}
        >
          <MoneyTextInput
            value={field.value?.toString() ?? ""}
            fractionSeparator="."
            groupingSeparator=","
            keyboardType="numeric"
            placeholder={placeholder}
            className={`flex-1 p-3 pr-6 text-gray-700 `}
            editable={loading ? false : (editable ?? true)}
            placeholderTextColor="#9ca3af"
            style={{ flex: 1, padding: 12, color: "#374151" }}
            onChangeText={(_, extracted) => {
              clearErrors(field.name);
              field.onChange(extracted ? parseFloat(extracted) : "");
            }}
            onFocus={() => clearErrors(field.name)}
          />
          <View className="flex-row max-w-12 max-h-11 right-4 items-center">
            <Text className="text-gray-700">AED</Text>
          </View>
        </View>
      )}
    </InputWrapper>
  );
};

export const DateInput = <T extends FieldValues>(
  props: InputProps<T> & { onFieldPress?: () => void }
) => {
  const {
    name,
    control,
    loading,
    keyboardType,
    editable,
    placeholder,
    clearErrors,
    className,
    onFieldPress,
  } = props;

  return (
    <InputWrapper name={name} control={control}>
      {({ field, fieldError }) => {
        return (
          <Pressable
            onPress={onFieldPress}
            className={`${INNER_FIELD_STYLE} ${fieldError ? "border-red-400" : "border-slate-300"} ${className}`}
          >
            <RNTextInput
              keyboardType={keyboardType}
              placeholderTextColor="#9ca3af"
              editable={false}
              className={`flex-1 p-3 pr-6 text-gray-700 `}
              placeholder={placeholder}
              autoCapitalize="none"
              onFocus={() => clearErrors(field.name)}
              value={formatDate(field.value) ?? ""}
            />

            <View className="flex-row max-w-12 max-h-11 right-4 items-center">
              <Calendar size={22} color="#6b7280" />
            </View>
          </Pressable>
        );
      }}
    </InputWrapper>
  );
};

export const withLabel = <P extends object>(Component: React.ComponentType<P>) => {
  return (props: P & { label: string }) => (
    <View className="w-full items-start justify-start gap-1">
      <Text className="text-sm text-gray-500 font-bold">{props.label}</Text>
      <Component {...props} />
    </View>
  );
};
