import { useState } from "react";
import { AddCreditSchema, AddCreditSchemaType } from "@/lib/schema/credit";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addCredit } from "@/api/credits";

type UseAddCreditFormProps = {
  clientId: string;
};

export const useAddCreditForm = ({ clientId }: UseAddCreditFormProps) => {
  const [loading, setLoading] = useState(false);
  const [creditDate, setCreditDate] = useState(new Date(Date.now()));

  const { control, setValue, handleSubmit, clearErrors } = useForm<AddCreditSchemaType>({
    resolver: zodResolver(AddCreditSchema),
    defaultValues: { creditDate },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const onDateSelect = (date: Date) => {
    setCreditDate(date);
    setValue("creditDate", date);
  };

  const onSubmit = async (): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
      handleSubmit(async (data: AddCreditSchemaType) => {
        try {
          setLoading(true);

          const response = await addCredit({ clientId, data });

          if (response.ok) resolve(true);
        } catch {
          setLoading(false);
          resolve(false);
        } finally {
          setLoading(false);
        }
      })();
    });
  };

  return { control, loading, creditDate, clearErrors, onSubmit, onDateSelect };
};
