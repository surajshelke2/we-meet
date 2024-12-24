import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const useGetCallById = (id: string | string[]) => {
  const [call, setCall] = useState<Call | undefined>();
  const [isCallingLoading, setIsCallingLoading] = useState(true);

  const client = useStreamVideoClient();

  useEffect(() => {
    if (!client || !id || (Array.isArray(id) && id.length === 0)) {
      console.error("Client or id not found");
      setIsCallingLoading(false);
      return;
    }

    const loadCall = async () => {
      setIsCallingLoading(true);
      try {
        const filter_conditions = Array.isArray(id)
          ? { id: { $in: id } }
          : { id };

        const { calls } = await client.queryCalls({
          filter_conditions,
        });

        if (calls.length > 0) {
          setCall(calls[0]);
        }
        else{
          console.warn("No call found with id:", id);
        }
      } catch (error) {
        console.error("Error fetching call:", error);
      } finally {
        setIsCallingLoading(false);
      }
    };

    loadCall();
  }, [client, id]);

  return [call, isCallingLoading] as const;
};
