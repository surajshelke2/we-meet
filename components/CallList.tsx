//@ts-nocheck
"use client";
import { useGetCalls } from "@/hooks/useGetCalls";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import MeetingCard from "./MeetingCard";
import Loader from "./Loader";
import { useToast } from "@/hooks/use-toast";
import { title } from "process";

const CallList = ({ type }: { type: "ended" | "upcoming" | "recordings" }) => {
  const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();
  const router = useRouter();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  const toast = useToast();
  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls;
      case "recordings":
        return recordings;
      case "upcoming":
        return upcomingCalls;
      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case "ended":
        return "No Previous Calls";
      case "recordings":
        return "No Recordings";
      case "upcoming":
        return "No Upcoming Calls";
      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchRecordings = async () => {
      if (type === "recordings" && callRecordings && callRecordings.length > 0) {
        try {
          const callData = await Promise.all(
            callRecordings.map(async (meet) => {
              try {
                return await meet.queryRecordings();
              } catch (error) {
                console.error("Error querying recordings for meet:", meet, error);
                return { recordings: [] }; // Default response on error
              }
            })
          );
  
          const recordingsList = callData
            .filter((call) => call.recordings && call.recordings.length > 0)
            .flatMap((call) => call.recordings);
  
          setRecordings(recordingsList);
        } catch (error) {
          console.error("Error fetching recordings:", error);
          toast({ title: "Error fetching recordings. Please try again." });
        }
      }
    };
  
    fetchRecordings();
  }, [type, callRecordings]);
  

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();

  if (isLoading) return <Loader />;

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meet: Call | CallRecording) => {
          const icon =
            type === "ended"
              ? "/icons/previous.svg"
              : type === "upcoming"
              ? "/icons/upcoming.svg"
              : "/icons/recordings.svg";

          const buttonIcon = type === "recordings" ? "/icons/play.svg" : undefined;
          const buttonText = type === "recordings" ? "Play" : "Start";
          const handleClick =
            type === "recordings"
              ? () => router.push(meet.url || "#")
              : () => router.push(`/meeting/${(meet as Call).id}`);

          const link =
            type === "recordings"
              ? meet.url || "#"
              : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meet as Call).id}`;

          const formattedDate = meet.state?.startsAt
            ? new Date(meet.state.startsAt).toLocaleString()
            : "No date available";

          return (
            <MeetingCard
              key={(meet as Call).id || (meet as CallRecording).url}
              icon={icon}
              title={
                meet.state?.custom.description?.substring(0, 20) || "No Description"
              }
              date={formattedDate}
              isPreviousMeeting={type === "ended"}
              buttonIcon1={buttonIcon}
              buttonText={buttonText}
              handleClick={handleClick}
              link={link}
            />
          );
        })
      ) : (
        <h1>{noCallsMessage}</h1>
      )}
    </div>
  );
};

export default CallList;
