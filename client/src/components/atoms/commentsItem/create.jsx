const Create = ({imgUrl = 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png'}) => {
    return (
      <div className="flex flex-row w-full h-auto gap-4">
        <div>
            <picture className='block rounded-full w-10 h-10'>
                <img className='w-full h-full object-cover' src={imgUrl} alt="User image profile" />
            </picture>
        </div>
        <form className="w-full h-auto">
            <input
                className="border-b border-gray-500 w-full h-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 placeholder-gray-600"
                id="comment"
                type="text"
                placeholder="Agrega un comentario.."
                name="comment"
                value={''}
                onChange={''}
            />
        </form>
      </div>
    );
  }

  export default Create