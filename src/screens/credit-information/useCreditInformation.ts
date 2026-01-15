import { useState } from "react";
import { ICredit, ISettlement } from "@/lib/types/credit";
import { getCredit, addSettlement } from "@/api/credits";

interface IUseCreditInformation {
  creditId: string;
}
export const useCreditInformation = (creditId: string) => {
  const [credit, setCredit] = useState<ICredit>();
  const [loading, setLoading] = useState(false);

  const fetchCredit = async () => {
    //after adding, navigate back to
    setLoading(true);

    const response = await getCredit({ id: creditId });

    if (response.ok) {
      setCredit(response.payload);
    } else {
      const { code, message } = response;
      console.error(code, ": ", message);
      // Render error page with try again button
    }

    setLoading(false);
  };

  return { credit, loading, fetchCredit };
};
