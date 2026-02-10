import { ClientType } from "@/lib/types/client";
import { CreditSnapshotType } from "@/lib/types/credit";
import { useState, useCallback } from "react";
import { getClient, getClientCredits } from "@/api/clients";

type UseClientInformationProps = {
  clientId: string;
};

type ClientInformationState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; client: ClientType; credits: CreditSnapshotType[] };

export const useClientInformation = ({ clientId }: UseClientInformationProps) => {
  const [state, setState] = useState<ClientInformationState>({ status: "loading" });

  const fetchData = useCallback(async () => {
    setState({ status: "loading" });

    const [clientResponse, creditsResponse] = await Promise.all([
      getClient<ClientType>({ id: clientId }),
      getClientCredits<CreditSnapshotType[]>({ id: clientId }),
    ]);

    if (!clientResponse.ok || !creditsResponse.ok) return setState({ status: "error" });

    setState({ status: "ready", client: clientResponse.payload, credits: creditsResponse.payload });
  }, [clientId]);

  return { state, fetchData };
};
