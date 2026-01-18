import { useState } from "react";
import { CreditType } from "@/lib/types/credit";
import { getCredit } from "@/api/credits";

export const useCreditInformation = (creditId: string) => {
  const [credit, setCredit] = useState<CreditType>();
  const [loading, setLoading] = useState(false);

  const fetchCredit = async () => {
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
