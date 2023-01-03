import { Typography } from '@material-ui/core';
import { LogoWrapper } from '.';
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { googleAuth, githubAuth } from '../../utils/authUtils';
import { toast } from 'react-toastify';

export default function OAuth({ logo, name }) {
  function handleOAuthSignIn() {
    let provider;
    
    if(name === googleAuth.name) {
      provider = new GoogleAuthProvider();
    }

    if(name === githubAuth.name) {
      provider = new GithubAuthProvider();
    }

    signInWithPopup(auth, provider)
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
        toast('Não foi possível fazer o login!');
      });
  }

  return (
    <div onClick={handleOAuthSignIn}>
      <LogoWrapper><img src={logo} alt='logo'></img></LogoWrapper>
      <Typography variant='body2'>{name}</Typography>
    </div>
  );
}
