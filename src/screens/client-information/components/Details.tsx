import React from "react";
import { View, Text, Pressable } from "react-native";
import { IClient } from "@/lib/types/client";
import { IPhone } from "@/lib/types/client";
import { ScrollView } from "moti";
import { Copy } from "lucide-react-native";

type Field = {
  key: keyof IClient;
  label: string;
  value?: string | IPhone[];
};

const getFields = (client: IClient): Field[] => {
  return [
    { key: "facebook", label: "Facebook Account", value: client.facebook },
    { key: "email", label: "Email", value: client.email },
    { key: "address", label: "Address", value: client.address },
    { key: "phone", label: "Primary Phone", value: client.phone.e164 },
    { key: "otherPhones", label: "Phone number", value: client.otherPhones },
  ];
};
const TextCard = ({
  label,
  value,
  onCopy,
}: {
  label: string;
  value: string;
  onCopy: (text: string) => void;
}) => {
  return (
    <View className="justify-center p-4 gap-1 bg-slate-200 text-blue-400  rounded-lg">
      <Text className="w-36 text-sm text-start text-gray-500">{label}</Text>
      <View className="flex-row items-center gap-4">
        <Text>{value}</Text>
        <Pressable onPress={() => onCopy(value)}>
          <Copy size={12} color="black" />
        </Pressable>
      </View>
    </View>
  );
};

const Details = ({
  client,
  handleCopyToClipboard,
}: {
  client: IClient;
  handleCopyToClipboard: (text: string) => void;
}) => {
  const fields = getFields(client);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ backgroundColor: "#f1f5f9", flexGrow: 1 }}
    >
      <View className="flex-1 p-4 ">
        <View className="gap-4">
          {fields.map(({ key, label, value }, index) => {
            return value && typeof value === "string" ? (
              <TextCard key={index} label={label} value={value} onCopy={handleCopyToClipboard} />
            ) : Array.isArray(value) ? (
              value.map((val, index) => (
                <TextCard
                  key={index}
                  label={`${label} ${index + 1}`}
                  value={val.e164}
                  onCopy={handleCopyToClipboard}
                />
              ))
            ) : null;
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default Details;
