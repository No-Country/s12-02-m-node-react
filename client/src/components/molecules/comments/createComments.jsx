import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";

import { useSelector } from "react-redux";

const Create = ({getComments}) => {
  const [createComments, createCommentStatus, createCommentApi] = useFetch();

  const { id } = useParams();
  const userData = useSelector((state) => state.user.data);

  const [comment, setComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);

  const handleChange = (e) => {
    const newComment = e.target.value;
    setComment(newComment);
    setIsCommenting(newComment.trim() !== "");
  };

  const handleCancel = () => {
    setComment("");
    setIsCommenting(false);
  };

  const handleComment = () => {
    const data = {
      text: comment,
      event_ID: id,
      email: userData.email,
    };

    createCommentApi({ path: "/comments", method: "POST", data: data });
    /*     console.log('Comentario:', comment);
    console.log('data:', data); */
    setComment("");
    setIsCommenting(false);
  };

  useEffect(() => {
    if (createCommentStatus.success) {
      getComments({
        path: `/comments/all?event_ID=${id}`,
        method: "GET",
      });
      console.log(createComments);
    }
  }, [createCommentStatus]);
  return (
    <div className="flex flex-row w-full h-auto gap-4 mt-4 mb-4">
      <div>
        <picture className="block rounded-full overflow-hidden w-12 h-12">
          <img
            className="w-full h-full object-cover"
            src={userData.picture}
            alt="User image profile"
          />
        </picture>
      </div>
      <div className="w-full h-auto relative">
        <label aria-label="writte a comment">
          <input
            className="border-b border-gray-500 w-full h-auto py-2 px-3 text-black leading-tight focus:outline-none focus:border-blue-500 placeholder-gray-600 flex-wrap overflow-wrap"
            data-test="input_comment"
            type="text"
            placeholder="Agrega un comentario.."
            name="comment"
            value={comment}
            onChange={handleChange}
          />
        </label>
        {isCommenting && (
          <div className="flex justify-end mt-4 right-0 bottom-0">
            <button
              data-test="cancel_comment"
              className="text-black text-center text-sm font-medium px-4 mr-2"
              onClick={handleCancel}
            >
              Cancelar
            </button>
            <button
              data-test="send_comment"
              className="bg-primary-500 hover:bg-primary-600 text-white text-sm py-2 px-6 rounded"
              onClick={handleComment}
            >
              Comentar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Create;
