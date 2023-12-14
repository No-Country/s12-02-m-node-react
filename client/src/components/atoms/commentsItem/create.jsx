import React, { useState } from 'react';

const Create = ({ imgUrl = 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png' }) => {
  const [comment, setComment] = useState('');
  const [isCommenting, setIsCommenting] = useState(false);

  const handleChange = (e) => {
    const newComment = e.target.value;
    setComment(newComment);
    setIsCommenting(newComment.trim() !== '');
  };

  const handleCancel = () => {
    setComment('');
    setIsCommenting(false);
  };

  const handleComment = () => {
    console.log('Comentario:', comment);
    setComment('');
    setIsCommenting(false);
  };

  return (
    <div className="flex flex-row w-full h-auto gap-4 mt-4 mb-4">
      <div>
        <picture className='block rounded-full overflow-hidden w-12 h-12'>
          <img className='w-full h-full object-cover' src={imgUrl} alt="User image profile" />
        </picture>
      </div>
      <div className="w-full h-auto relative">
        <input
          className="border-b border-gray-500 w-full h-auto py-2 px-3 text-black leading-tight focus:outline-none focus:border-blue-500 placeholder-gray-600 flex-wrap overflow-wrap"
          id="comment"
          type="text"
          placeholder="Agrega un comentario.."
          name="comment"
          value={comment}
          onChange={handleChange}
        />
        {isCommenting && (
          <div className="flex justify-end mt-4 right-0 bottom-0">
            <button
              className="text-black text-center text-sm font-medium px-4 mr-2"
              onClick={handleCancel}
            >
              Cancelar
            </button>
            <button
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
}

export default Create;
