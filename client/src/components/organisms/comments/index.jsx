import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { setEventComments } from "../../../redux/slices/detailEventSlice";

import useFetch from "../../../hooks/useFetch";

import CreateComments from "../../molecules/comments/createComments";
import ViewComments from "../../molecules/comments/viewComments";

export default function Comments({ eventId }) {
  const [commentsRes, commentsStatus, getComments] = useFetch();
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.user.isLogged);

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
      {isLogged ? (
        <CreateComments getComments={getComments} />
      ) : (
        <NavLink
            id="link_to_login"
            className="max-w-xs rounded-full outline-none bg-primary-500 hover:bg-primary-600 shadow-md p-3 text-white md:my-3 cursor-pointer text-center"
            to="/login"
          >
            Inicia Sesión para Comentar
          </NavLink>
      )}
      <ViewComments commentsStatus={commentsStatus} />
    </div>
  );
}
