import CreateComments from "../../molecules/comments/createComments";
import ViewComments from "../../molecules/comments/viewComments";

export default function Comments() {
  return (
    <div className="p-5 lg:p-10 bg-white">
      <h1 className="text-2xl font-bold mb-2">Organismo - comments</h1>
        <CreateComments />
        <ViewComments />
    </div>
  );
}
