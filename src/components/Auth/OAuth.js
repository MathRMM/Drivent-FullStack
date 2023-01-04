import { Typography } from '@material-ui/core';
import { LogoWrapper } from '.';
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { googleAuth, githubAuth } from '../../utils/authUtils';
import { toast } from 'react-toastify';
import { signIn } from '../../services/authApi';
import { signUp } from '../../services/userApi';
import UserContext from '../../contexts/UserContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OAuth({ logo, name }) {
  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  function handleOAuthSignIn() {
    let provider;
    let email;
    let password;
    
    if(name === googleAuth.name) {
      provider = new GoogleAuthProvider();
    }

    if(name === githubAuth.name) {
      provider = new GithubAuthProvider();
    }

    signInWithPopup(auth, provider)
      .then(async result => {
        email = result.user.email;
        password = result.user.uid;
      
        const userData = await signIn(email, password);
        
        setUserData(userData);
        toast('Login realizado com sucesso!');
        navigate('/dashboard'); 
      })
      .catch(async error => {
        console.log(error);
        try {
          console.log(email, password);
          await signUp(email, password);
          const userData = await signIn(email, password);

          setUserData(userData);
          toast('Login realizado com sucesso!');
          navigate('/dashboard'); 
        } catch(error) {
          toast('Não foi possível fazer o login!');
        }
      });
  }

  return (
    <div onClick={handleOAuthSignIn}>
      <LogoWrapper><img src={logo} alt='logo'></img></LogoWrapper>
      <Typography variant='body2'>{name}</Typography>
    </div>
  );
}
