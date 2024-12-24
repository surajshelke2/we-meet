"use client";
import Loader from "@/components/Loader";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import React, { useState } from "react";

const Meeting = ({ params:{id} }: { params: { id: string } }) => {
  const { user, isLoaded } = useUser();
  const [isStepUpComplete, setIsStepUpComplete] = useState(false);

  const [call,isCallLoading] = useGetCallById(id);

  if(!isLoaded || isCallLoading) return <Loader/>
  return (
    <main className="h-screen w-full">
      {/* constum hook */}
      <StreamCall call={call}>
        <StreamTheme>
          {!isStepUpComplete ? <MeetingSetup setIsStepUpComplete={setIsStepUpComplete}/> : <MeetingRoom/>}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;