import { IClient } from "@/lib/types/client";
import { CreditSnapshotType } from "@/lib/types/credit";
import { useState, useCallback } from "react";
import { getClient, getClientCredits } from "@/api/clients";

interface IUseClientInformation {
  clientId: string;
}

export const useClientInformation = ({ clientId }: IUseClientInformation) => {
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [client, setClient] = useState<IClient>();
  const [credits, setCredits] = useState<CreditSnapshotType[]>([]);

  const fullName = client?.middlename
    ? `${client?.firstname} ${client.middlename} ${client.lastname} `
    : `${client?.firstname} ${client?.lastname}`;

  const fetchData = useCallback(async () => {
    setLoading(true);
    setHasError(false);
    try {
      const [clientResponse, creditsResponse] = await Promise.all([
        getClient<IClient>({ id: clientId }),
        getClientCredits<CreditSnapshotType[]>({ id: clientId }),
      ]);

      //await new Promise((resolve) => setTimeout(resolve, 2000));

      if (!clientResponse.ok) throw new Error(clientResponse.message);
      if (!creditsResponse.ok) throw new Error(creditsResponse.message);

      setClient(clientResponse.payload);
      setCredits(creditsResponse.payload);
    } catch (err) {
      setHasError(true);
      console.error("Unexpected fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [clientId]);

  return { loading, hasError, client, credits, fetchData, fullName };
};
