"use client";
import Loader from "@/components/Loader";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const Meeting = () => {

  const { user, isLoaded } = useUser();
  const [isStepUpComplete, setIsStepUpComplete] = useState(false);
  const { id } = useParams();
  const [call, isCallLoading] = useGetCallById(id as string);

  if(!isLoaded || isCallLoading) return <Loader/>
  return (
    <main className="h-screen w-full">
     
      <StreamCall call={call}>
        <StreamTheme>
          {/* check the if the data setup is completed go to the room otherwise complete the setup */}
          {!isStepUpComplete ? <MeetingSetup setIsStepUpComplete={setIsStepUpComplete}/> : <MeetingRoom/>}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;
