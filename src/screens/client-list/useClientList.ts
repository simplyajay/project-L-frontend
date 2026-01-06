import { useState } from "react";
import { getSummarizedClients, type GetSummarizedClients } from "@/api/clients";
import { IClientSummary } from "@/lib/types/client";

export const useClientList = () => {
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [clients, setClients] = useState<IClientSummary[]>([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalOverdue, setTotalOverdue] = useState(0);

  const fetchClients = async () => {
    setLoading(true);
    setHasError(false);

    const response = await getSummarizedClients<GetSummarizedClients>();

    if (response.ok) {
      const { totalBalanceAll, totalOverdueAll, summarizedClients } = response.payload;

      setTotalBalance(totalBalanceAll);
      setTotalOverdue(totalOverdueAll);
      setClients(summarizedClients);
    } else {
      const { code, message } = response;
      console.log(code, " : ", message);
      setHasError(true);
    }

    setLoading(false);
  };

  return { loading, clients, totalBalance, totalOverdue, fetchClients, hasError };
};
