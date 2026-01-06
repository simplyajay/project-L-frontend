import React, { ReactElement, ReactNode } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import {
  Control,
  Controller,
  FieldValues,
  UseControllerProps,
  FormState,
  UseFormClearErrors,
  get,
  Path,
} from "react-hook-form";
import { ChevronDown } from "lucide-react-native";
import { CountryCode, getCountryCallingCode, getExampleNumber } from "libphonenumber-js";
import { getFlagEmoji } from "@/lib/utils/countries";
import examples from "libphonenumber-js/examples.mobile.json";

interface ITextField<T extends FieldValues>
  extends Pick<UseControllerProps<T>, "name" | "rules" | "defaultValue"> {
  control: Control<T>;
  formState: FormState<T>;
  loading: boolean;
  placeholder?: string;
  className?: string;
  editable?: boolean;
  keyboardType?:
    | "default"
    | "numeric"
    | "decimal-pad"
    | "number-pad"
    | "phone-pad"
    | "email-address";
  clearErrors: UseFormClearErrors<T>;
  inputIcon?: InputIcon;
}

type InputIcon =
  | {
      pressable: true;
      icon: React.ReactNode;
      onIconPress: () => void; // required when pressable is true
    }
  | {
      pressable: false;
      icon: React.ReactNode;
      onIconPress?: never; // disallow when pressable is false
    };

export interface IPhoneTextField<T extends FieldValues> extends ITextField<T> {
  onButtonPress?: (name: Path<T>) => void;
}

export const withErrorAndLabel = <T extends FieldValues, P extends ITextField<T> = ITextField<T>>(
  Component: React.ComponentType<P>
) => {
  return (props: P & { label: string }) => {
    const { formState, name } = props;
    const { errors } = formState;

    const getErrorMessage = (): string | undefined => {
      const fieldError = get(errors, name);
      if (!fieldError) return undefined;
      if (fieldError.message) return fieldError.message; // primitive field
      if (typeof fieldError === "object") {
        // object field: return first nested error
        const firstKey = Object.keys(fieldError)[0];
        return fieldError[firstKey]?.message;
      }
      return undefined;
    };

    const errorMessage = getErrorMessage();

    return (
      <View className="w-full items-start justify-start gap-1">
        <Text className="text-sm text-gray-500 font-bold">{props.label}</Text>
        <Component {...props} />
        {errorMessage && <Text className="text-red-400">{errorMessage}</Text>}
      </View>
    );
  };
};

//only use this for phone input
export const withActionButton = <
  T extends FieldValues,
  P extends IPhoneTextField<T> = IPhoneTextField<T>,
>(
  Component: React.ComponentType<P>
) => {
  return (props: P & { label: string; actionComponent?: React.ReactNode }) => {
    const { actionComponent } = props;
    return (
      <View className="flex-row gap-2">
        <Component {...props} />
        {actionComponent && <View className="items-center justify-center">{actionComponent}</View>}
      </View>
    );
  };
};

export const StringInput = <T extends FieldValues>({
  control,
  name,
  formState,
  loading,
  placeholder,
  className,
  clearErrors,
  keyboardType,
  editable,
  inputIcon,
}: ITextField<T>) => {
  const { errors } = formState;

  const fieldError = get(errors, name);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <View
          className={`items-center w-full flex-row ${fieldError ? "border-red-400" : "border-slate-300"} ${className}`}
        >
          <TextInput
            keyboardType={keyboardType}
            placeholderTextColor="#9ca3af"
            editable={loading ? false : (editable ?? true)}
            className={`flex-1 ${inputIcon?.pressable ? "p-3 pr-6" : "p-3"} text-gray-700 `}
            placeholder={placeholder}
            autoCapitalize="none"
            onChangeText={(text) => {
              clearErrors(name);
              onChange(text);
            }}
            onFocus={() => clearErrors(name)}
            value={value?.toString() ?? ""}
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
      )}
    />
  );
};

export const PhoneInput = <T extends FieldValues>({
  control,
  name,
  formState,
  loading,
  className,
  clearErrors,
  onButtonPress,
}: IPhoneTextField<T>) => {
  const { errors } = formState;

  const fieldError = get(errors, name);

  const generatePlaceholder = (countryCode: CountryCode): string | undefined => {
    const exampleNumber = getExampleNumber(countryCode, examples);
    const internationalFormat = exampleNumber?.formatInternational();

    return internationalFormat?.replace(`+${getCountryCallingCode(countryCode)}`, "").trim();
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        const val = value || { value: "", countryCode: "AE" as CountryCode };
        return (
          <View
            className={`flex-row items-center justify-center gap-2 border ${className} ${fieldError ? "border-red-400" : "border-slate-300"}`}
          >
            <Pressable
              className={`flex-row items-center justify-center gap-1 p-3 border-r  ${fieldError ? "border-red-400" : "border-slate-300"}`}
              onPress={() => (onButtonPress ? onButtonPress(name) : undefined)}
            >
              <View className="flex-row gap-2">
                <Text className="">{getFlagEmoji(val.countryCode)}</Text>
                <Text className="text-gray-700 min-w-9">{`+${getCountryCallingCode(val.countryCode)}`}</Text>
              </View>

              <ChevronDown size={15} color="#9ca3af" />
            </Pressable>
            <View className="flex-1">
              <TextInput
                placeholderTextColor="#9ca3af"
                editable={!loading}
                placeholder={generatePlaceholder(val.countryCode)}
                autoCapitalize="none"
                className="p-3"
                onChangeText={(text) => {
                  onChange({ ...val, value: text });
                  clearErrors(name);
                }}
                onFocus={() => clearErrors(name)}
                value={val.value}
              />
            </View>
          </View>
        );
      }}
    />
  );
};
