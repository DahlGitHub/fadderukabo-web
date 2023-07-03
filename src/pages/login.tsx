import Layout from '@/components/layout/Layout';
import SignIn from '@/components/auth/SignInAccount';
import { AuthAction, withAuthUser } from 'next-firebase-auth';

const login = () => (
  <Layout>
    <SignIn />
  </Layout>
);

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})(login);
