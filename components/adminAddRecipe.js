import { useRef, useContext } from "react";
import { recipeContex } from "@/lib/api-handler/recipeHandler";
import { authContext } from "@/lib/api-handler/auth-contex";
import { toast } from "react-toastify";

export default function AddRecipe() {
  const titleRef = useRef();
  const descRef = useRef();
  const linkRef = useRef();

  const { user } = useContext(authContext);

  const { addPublicRecipe } = useContext(recipeContex);

  const addRecipeHandler = () => {
    const data = {
      title: titleRef.current.value,
      desc: descRef.current.value,
      link: linkRef.current.value,
    };
    const newRecipe = {
      createdBy: "Admin",
      uid: user.uid,
      ...data,
    };
    addPublicRecipe(newRecipe);
    toast.success(`Rescipe Added Successfully: ${data.title}`);
    titleRef.current.value = "";
    descRef.current.value = "";
    linkRef.current.value = "";
  };

  return (
    <form
      className="bg-blue-200 p-8 rounded-lg shadow-lg w-full max-w-md"
      onSubmit={(e) => {
        e.preventDefault();
        addRecipeHandler();
      }}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Add Recipe</h2>
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
        name="link"
        placeholder="Link"
        ref={linkRef}
      />
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
