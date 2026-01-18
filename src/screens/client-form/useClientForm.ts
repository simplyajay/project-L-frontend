import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, Path } from "react-hook-form";
import { ClientFormType, ClientFormData, ClientSchema } from "@/lib/schema/client";
import { parsePhoneNumberFromString, CountryCode, getCountryCallingCode } from "libphonenumber-js";
import { IClient } from "@/lib/types/client";
import { IPhone } from "@/lib/types/client";
import { PhoneSchemaType } from "@/lib/schema/client";
import { useSnackbar } from "@/components/common/Snackbar";
import { registerClient, updateClient } from "@/api/clients";
import { useNavigation } from "@react-navigation/native";
import { RootNavigationProp } from "@/lib/types/navigation";
import { Keyboard } from "react-native";
import { useRefreshStore } from "@/store/useRefreshStore";

interface UseClientForm {
  client?: IClient;
}

export const useClientForm = ({ client }: UseClientForm) => {
  const defaultValues = getDefaultValues(client);
  const navigation = useNavigation<RootNavigationProp>();
  const { triggerRefresh } = useRefreshStore();

  const { control, handleSubmit, formState, clearErrors, setError, setValue, getValues, reset } =
    useForm<ClientFormType>({
      resolver: zodResolver(ClientSchema),
      defaultValues,
      reValidateMode: "onSubmit",
    });

  const { fields, append, remove } = useFieldArray<ClientFormType>({
    control,
    name: "otherPhones",
  });

  const [loading, setLoading] = useState(false);
  const { user } = useAuthStore();
  const { showMessage } = useSnackbar();

  const validatePhoneInput = (
    phone: PhoneSchemaType,
    name: Path<ClientFormType>,
  ): IPhone | null => {
    const { countryCode, value } = phone as { countryCode: CountryCode; value: string };
    const phoneNumber = parsePhoneNumberFromString(value, countryCode);

    if (!phoneNumber || !phoneNumber.isPossible()) {
      setError(name, {
        type: "manual",
        message: "Invalid phone number",
      });
      setLoading(false);
      return null;
    }

    return {
      country_code: countryCode,
      dial_code: getCountryCallingCode(countryCode),
      value,
      e164: phoneNumber.number,
    };
  };

  const onSubmit = async (data: ClientFormType) => {
    Keyboard.dismiss();
    setLoading(true);

    if (!user) throw new Error("Undefined user");

    let hasInvalidOtherPhone = false;

    const otherPhones: IPhone[] = data.otherPhones.reduce<IPhone[]>((acc, phone, index) => {
      const phoneNumber = validatePhoneInput(phone, `otherPhones.${index}.value`);

      if (!phoneNumber) {
        hasInvalidOtherPhone = true;
        return acc;
      }

      acc.push(phoneNumber);

      return acc;
    }, []);

    if (hasInvalidOtherPhone) {
      setLoading(false);
      return;
    }

    const primaryPhone = validatePhoneInput(data.phone, "phone");

    if (!primaryPhone) return;

    const clientFormData: ClientFormData = {
      userId: user._id,
      ...data,
      phone: primaryPhone,
      otherPhones,
    };

    const response = client
      ? await updateClient({ id: client._id, data: clientFormData })
      : await registerClient({ data: clientFormData });

    const successMessage = client
      ? "Client Updated successfully."
      : "New client added successfully.";
    const failMessage = client ? "Error updating client." : '"Error adding new client.';
    if (response.ok) {
      reset({});
      showMessage(successMessage);
      triggerRefresh("clientList");
      navigation.goBack();
    } else {
      showMessage(failMessage);
    }
    setLoading(false);
  };

  return {
    control,
    handleSubmit,
    formState,
    onSubmit,
    loading,
    fields,
    append,
    remove,
    clearErrors,
    setValue,
    getValues,
  };
};

const getDefaultValues = (client?: IClient): ClientFormType => ({
  firstname: client?.firstname ?? "",
  middlename: client?.middlename ?? undefined,
  nickname: client?.nickname ?? undefined,
  lastname: client?.lastname ?? "",
  email: client?.email ?? undefined,
  facebook: client?.facebook ?? undefined,
  phone: client?.phone
    ? { countryCode: client?.phone.country_code, value: client?.phone.value }
    : { countryCode: "AE", value: "" },
  otherPhones: client?.otherPhones
    ? client.otherPhones.map((phone) => ({ countryCode: phone.country_code, value: phone.value }))
    : [],
});
