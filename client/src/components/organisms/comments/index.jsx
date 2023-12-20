import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setEventComments } from "../../../redux/slices/detailEventSlice";

import useFetch from "../../../hooks/useFetch";

import CreateComments from "../../molecules/comments/createComments";
import ViewComments from "../../molecules/comments/viewComments";

export default function Comments({ eventId }) {
  const [commentsRes, commentsStatus, getComments] = useFetch();
  const dispatch = useDispatch();

  useEffect(() => {
    getComments({
      path: `/comments/all?event_ID=${eventId}`,
      method: "GET",
    });
  }, []);

  useEffect(() => {
    if (commentsStatus.success) {
      dispatch(setEventComments(commentsRes.data?.document));
      console.log("commentsDetail: ", commentsRes);
    }
  }, [commentsStatus]);

  return (
    <div className="flex flex-col mb-4">
      <CreateComments getComments={getComments} />
      <ViewComments commentsStatus={commentsStatus} />
    </div>
  );
}
