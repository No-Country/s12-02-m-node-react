import View from "../../atoms/commentsItem/view";
import { useSelector } from "react-redux";
import LoadingSkeleton from "../../atoms/loadingSkeleton";

const ViewComments = ({commentsStatus}) => {
  const renderData = ({
    dataTorender,
    typeOfSkeleton,
    customSkeletonClass = "",
    status = eventStatus,
  }) =>
    status.success ? (
      dataTorender()
    ) : (
      <LoadingSkeleton className={customSkeletonClass} type={typeOfSkeleton} />
    );
  const comments = useSelector((state) => state.eventDetail.comments);
  return (
    <div>
      {comments.map((comment) =>
        renderData({ dataTorender: () => <View data={comment} /> , typeOfSkeleton: 'block', status: commentsStatus })
      )}
    </div>
  );
};

export default ViewComments;
