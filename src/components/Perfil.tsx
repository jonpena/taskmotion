import { MdOutlineMailLock } from 'react-icons/md';
// import supbaselogo from '../assets/supabaselogo.png';
import { userProps } from '@/interfaces/user.interface';

const Perfil = ({ picture, fullname, email }: userProps) => {
  return (
    <div>
      <section className="header">
        <div className="contentImg">
          <img src={picture} />
        </div>
        <span>{fullname}</span>
      </section>
      <section className="footer">
        <div className="content">
          <MdOutlineMailLock />
          <span>{email}</span>
        </div>
      </section>
      <div className="contentLogosupa"></div>
    </div>
  );
};
export default Perfil;
