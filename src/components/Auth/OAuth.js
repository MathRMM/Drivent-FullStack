import { Typography } from '@material-ui/core';
import { LogoWrapper } from '.';
import { GithubAuthProvider, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { googleAuth, githubAuth, facebookAuth } from '../../utils/authUtils';
import { toast } from 'react-toastify';
import { signIn } from '../../services/authApi';
import { signUp } from '../../services/userApi';
import UserContext from '../../contexts/UserContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OAuth({ logo, name }) {
  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  async function handleOAuthSignIn() {
    let provider;
    let userData;
    
    if(name === googleAuth.name) {
      provider = new GoogleAuthProvider();
    }

    if(name === githubAuth.name) {
      provider = new GithubAuthProvider();
    }

    if(name === facebookAuth.name) {
      provider = new FacebookAuthProvider();
    }

    const result = await signInWithPopup(auth, provider);
    const email = result.user.email;
    const password = result.user.uid;
    
    try {
      userData = await signIn(email, password); 
      
      setUserData(userData);
      toast('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch(error) {
      try {
        await signUp(email, password);
        userData = await signIn(email, password);

        setUserData(userData);
        toast('Login realizado com sucesso!');
        navigate('/dashboard'); 
      } catch(error) {
        toast('Não foi possível fazer o login!');
      }
    }
  }

  return (
    <div onClick={handleOAuthSignIn}>
      <LogoWrapper><img src={logo} alt='logo'></img></LogoWrapper>
      <Typography variant='body2'>{name}</Typography>
    </div>
  );
}
