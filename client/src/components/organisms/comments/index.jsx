import CreateComments from "../../molecules/comments/createComments";
import ViewComments from "../../molecules/comments/viewComments";
import useFetch from "../../../hooks/useFetch";
import { useEffect } from "react";

export default function Comments({eventId}) {
  const [comments, commentsStatus, fetchComments] = useFetch()

  useEffect(()=>{
    fetchComments({path: `/comments/all?event_ID=6570c33ff43ae46d106c2d49`, method: 'GET'})
  },[])

  useEffect(()=>{
    if(commentsStatus.success){
      console.log(comments);
    }
  },[])

  return (
    <div className="flex flex-col mb-4">
        <CreateComments />
        <ViewComments />
    </div>
  );
}
