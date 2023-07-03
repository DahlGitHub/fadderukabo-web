import React from 'react';
import { AuthAction, useAuthUser, withAuthUser } from 'next-firebase-auth';

const Demo = () => {
  const AuthUser = useAuthUser();
  return (
    <div>
      <div>
        <div>
          <h3>Example: SSR + no ID token</h3>
          <p>
            This page requires authentication. It will do a server-side redirect
            (307) to the login page if the auth cookies are not set.
          </p>
          <p>
            This page uses `withAuthUserSSR` rather than `withAuthUserTokenSSR`,
            so it does not have server-side access to the user ID token.
          </p>
          <p>Your favorite color is: {AuthUser.displayName}</p>
        </div>
      </div>
    </div>
  );
};

export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Demo);
