import { useRef, useContext } from "react";
import { recipeContex } from "@/lib/api-handler/recipeHandler";
import { authContext } from "@/lib/api-handler/auth-contex";
import { toast } from "react-toastify";
import { adminContex } from "@/lib/api-handler/adminHandler";

export default function AddChallenge() {
  const titleRef = useRef();
  const descRef = useRef();
  const starCountRef = useRef();
  const categoryRef = useRef();

  const { user } = useContext(authContext);

  const { addChallenge } = useContext(adminContex);

  const addChallengeHandler = () => {
    const data = {
      title: titleRef.current.value,
      desc: descRef.current.value,
      starCount: starCountRef.current.value,
      category: categoryRef.current.value,
    };
    addChallenge(data);
    toast.success(`Challenge Added Successfully: ${data.title}`);
    titleRef.current.value = "";
    descRef.current.value = "";
    starCountRef.current.value = 0;
    categoryRef.current.value = "daily";
  };

  return (
    <form
      className="adminFormBg p-8 rounded-lg shadow-lg w-full max-w-md"
      onSubmit={(e) => {
        e.preventDefault();
        addChallengeHandler();
      }}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Add Challenge</h2>
      <input
        className="inputs"
        type="text"
        name="title"
        placeholder="Title"
        ref={titleRef}
      />
      <textarea
        className="inputs h-[180px] resize-none"
        type="text"
        name="desc"
        placeholder="Description"
        ref={descRef}
        maxLength={317}
      />
      <input
        className=" inputs"
        type="text"
        name="category"
        placeholder="Category"
        ref={categoryRef}
      />
      <input
        className=" inputs"
        type="number"
        name="starCount"
        placeholder="Star Count"
        min={0}
        ref={starCountRef}
      />
      <button
        className="adminSubmitButton text-white py-2 px-4 rounded w-full "
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
