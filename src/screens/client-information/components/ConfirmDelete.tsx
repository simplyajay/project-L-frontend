import React from "react";
import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { useDeleteForm } from "../hooks/useDeleteForm";
import { DEFAULT_FIELD_STYLE, TextInput, withLabel } from "@/components/common/Input";
import { DeleteClientFormType } from "@/lib/schema/client";
import { useNavigation } from "@react-navigation/native";
import { RootNavigationProp } from "@/lib/types/navigation";
import { useSnackbar } from "@/components/common/Snackbar";
import { useRefreshStore } from "@/store/useRefreshStore";

const LabeledTextInput = withLabel(TextInput<DeleteClientFormType>);

type ConfirmDeleteProps = {
  clientId: string;
  onCancelPress: () => void;
};

const ConfirmDelete = ({ clientId, onCancelPress }: ConfirmDeleteProps) => {
  const { control, loading, isButtonDisabled, onSubmit, clearErrors } = useDeleteForm({
    clientId,
  });

  const { showMessage } = useSnackbar();
  const { triggerRefresh } = useRefreshStore();
  const navigation = useNavigation<RootNavigationProp>();

  const handleConfirmPress = async () => {
    const success = await onSubmit();

    if (success) {
      triggerRefresh("clientList");
      showMessage("Client deleted successfully.");
      navigation.pop();
    }
  };

  return (
    <View className="w-full">
      <View className="w-full p-4 items-center border-b border-gray-300">
        <Text className="text-lg font-semibold">Confirm Delete</Text>
      </View>
      <View className="w-full p-4 gap-6 items-center">
        <Text className="w-full">
          You are about to <Text className="font-bold text-red-500">DELETE</Text> this client.
        </Text>
        <Text className="w-full">All information related to this client will also be permanently deleted.</Text>

        <Text className="w-full">Enter your password below to confirm.</Text>
      </View>
      <View className="w-full p-4 gap-4">
        <LabeledTextInput
          name="password"
          label="Password"
          control={control}
          secureTextEntry={true}
          autoCapitalize="none"
          clearErrors={clearErrors}
          loading={loading}
          className={DEFAULT_FIELD_STYLE}
        />

        <View className="w-full flex-row items-center gap-4 ">
          <Pressable className="flex-1 p-2 bg-slate-300 items-center rounded-md" onPress={onCancelPress}>
            <Text className="font-semibold">Cancel</Text>
          </Pressable>
          <Pressable
            className={`flex-1 p-2 bg-red-400 items-center rounded-md `}
            disabled={loading}
            onPress={handleConfirmPress}
          >
            {loading ? (
              <ActivityIndicator size={19} color="#adadad" />
            ) : (
              <Text className="text-white font-semibold">Confirm</Text>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ConfirmDelete;
