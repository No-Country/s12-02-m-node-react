import CreateComments from "../../molecules/comments/createComments";
import ViewComments from "../../molecules/comments/viewComments";

export default function Comments() {
  return (
    <div className="flex flex-col mb-4">
        <CreateComments />
        <ViewComments />
    </div>
  );
}
