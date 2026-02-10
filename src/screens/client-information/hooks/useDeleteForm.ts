import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { DeleteClientFormType, DeleteClientSchema } from "@/lib/schema/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteClient } from "@/api/clients";

type UseDeleteFormProps = {
  clientId: string;
};

export const useDeleteForm = ({ clientId }: UseDeleteFormProps) => {
  const { control, handleSubmit, clearErrors, setError } = useForm<DeleteClientFormType>({
    resolver: zodResolver(DeleteClientSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const [loading, setLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const passwordString: string | null | undefined = useWatch({ control, name: "password" });

  const onSubmit = async (): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
      handleSubmit(async ({ password }) => {
        try {
          setLoading(true);
          const response = await deleteClient({ id: clientId, data: { password } });

          if (response.ok) {
            resolve(true);
          } else {
            const errorMessage = response.status === 401 ? "Invalid Password" : response.message;
            setError("password", { type: "manual", message: errorMessage });
            resolve(false);
          }
        } catch (error) {
          setError("password", { type: "manual", message: "Something went wrong. Please try again." });
          resolve(false);
        } finally {
          setLoading(false);
        }
      })();
    });
  };

  useEffect(() => {
    if (passwordString && passwordString.length > 0) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [passwordString]);

  return { control, loading, isButtonDisabled, onSubmit, clearErrors };
};
