import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DeleteBooks = () => {
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  // === function to delete books ===
  const handleDeleteBooks = () => {
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col items-center border-3 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
          <h3 className="text-2xl">
            Are you sure you wannt to delete this book
          </h3>
          <button
            className="bg-red-600 text-white m-8 w-full p-4 rounded-md"
            onClick={handleDeleteBooks}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default DeleteBooks;
