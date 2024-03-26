import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const BooksTable = ({ books }) => {
  return (
    <div>
      <table className="w-full sborder-separate border-spacing-2">
        <thead>
          <tr className="border boder-slate-600 rounded-md">No</tr>
          <tr className="border boder-slate-600 rounded-md">Title</tr>
          <tr className="border boder-slate-600 rounded-md max-md:hidden">
            Author
          </tr>
          <tr className="border boder-slate-600 rounded-md max-md:hidden">
            Published Year
          </tr>
          <tr className="border boder-slate-600 rounded-md">Operations</tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book._id} className="h-8">
              <td className=" border-slate-700 rounded-md text-center">
                {index + 1}
              </td>
              <td className=" border-slate-700 rounded-md text-center">
                {book.title}
              </td>
              <td className=" border-slate-700 rounded-md text-center max-md:hidden">
                {book.author}
              </td>
              <td className=" border-slate-700 rounded-md text-center max-md:hidden">
                {book.publishedYear}
              </td>
              <td className=" border-slate-700 rounded-md text-center">
                <div className="flex jusfity-center gap-x-64">
                  <Link to={`/books/details/${book._id}`}>
                    <BsInfoCircle className="ext-2xl text-green-800" />
                  </Link>
                  <Link to={`/books/edit/${book._id}`}>
                    <AiOutlineEdit className="text-2xl text-yellow-600" />
                  </Link>
                  <Link to={`books/delete/${book._id}`}>
                    <MdOutlineDelete className="text-2xl text-red-600" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksTable;
