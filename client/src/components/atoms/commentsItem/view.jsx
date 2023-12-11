const View = () => {
    const dataComments = {
        photo: 'https://grandemente.net/wp-content/uploads/Fotos-para-Perfil-06.jpg',
        name: 'Cristina Fuentes',
        comment: '¡Contando los días para vivir esta increíble noche llena de emociones y melodías inolvidables! 🌟🎶 #DiegoTorres #EmociónIncontenible #ContandoLosDías',
      }

    return (
        <div className="flex flex-col rounded-md bg-gray-100 p-4 mb-4">
            <div className="flex flex-row gap-4 items-center">
                <picture className='block rounded-full overflow-hidden w-10 h-10'>
                    <img className='w-full h-full object-cover' src={dataComments.photo} alt="User image profile" />
                </picture>
                <h2 className="text-black font-poppins text-16 font-semibold leading-normal tracking-tighter">{dataComments.name}</h2>
            </div>
            <div className="w-full h-auto pt-2 pl-1">
                <p className="text-black font-poppins text-20 font-normal leading-normal tracking-tighter">{dataComments.comment}</p>
            </div>
        </div>
    );
  }

  export default View