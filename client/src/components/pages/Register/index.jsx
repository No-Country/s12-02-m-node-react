import { useNavigate } from "react-router-dom";
import backgroundImage from '../../../assets/bgregister.jpg';
import RegisterModal from '../../organisms/registerModal';
import Footer from '../../organisms/footer/index'

function Register() {

    const backgroundStyle = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: 'full',
        width: 'screen',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      };

      const navigate = useNavigate();

      const toHome = () => {
        navigate("/");
      };

    return (
        <>
      <div className="w-auto h-full" style={backgroundStyle}>
        <div className="flex flex-col w-full h-full p-20 pt-10">
            <div>
                <img
                    className='flex flex-start cursor-pointer'
                    src={'https://cdn.discordapp.com/attachments/1176511259093516384/1180139581736222870/image.png?ex=657c55a2&is=6569e0a2&hm=a399b0f29e8da2d1cd93c6d9d7330f9bced19efac8d73457bc1e30c779327a2b&'}
                    alt="Logo - EventWave"
                    style={{ width: '16%', height: 'auto' }}
                    onClick={toHome}
                />
            </div>
            <div className='flex items-center justify-center'>
                <RegisterModal />
            </div>
        </div>
      </div>
      <Footer />
      </>
    );
  }
  
  export default Register;
  