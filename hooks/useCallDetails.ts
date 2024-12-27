
import {
    Call,
    useCallStateHooks,
    useStreamVideoClient
} from "@stream-io/video-react-sdk";

import {
    useEffect,
    useState
} from "react";

export const useCallDetails = (callId: string) => {
    const [call, setCall] = useState < Call | null > (null);
    const [isLoading, setIsLoading] = useState(false);
    
    const {useParticipants} = useCallStateHooks();

    const participants = useParticipants();
    const client = useStreamVideoClient();

    useEffect(() => {
        const loadCall = async () => {
            setIsLoading(true);

            try {

                const call = await client?.call("default", callId);
              
                if (call) {
                    setCall(call);
                }
                console.log("call", call);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        loadCall();
    }, [callId]);

    return {
        call,
        isLoading
    };
}




