import { init } from 'next-firebase-auth'

const initAuth = () => {
  init({
    authPageURL: '/login',
    appPageURL: '/dashboard',
    loginAPIEndpoint: '/api/login',
    logoutAPIEndpoint: '/api/logout',
    onLoginRequestError: (err) => {
      console.error(err)
    },
    onLogoutRequestError: (err) => {
      console.error(err)
    },

    // Use application default credentials (takes precedence over firebaseAdminInitConfig if set)
    firebaseAdminInitConfig: {
        credential: {
          projectId: "fadderukabo",
          clientEmail: "firebase-adminsdk-3th0t@fadderukabo.iam.gserviceaccount.com",
          // Using JSON to handle newline problems when storing the
          // key as a secret in Vercel. See:
          // https://github.com/vercel/vercel/issues/749#issuecomment-707515089
          privateKey: process.env.FIREBASE_PRIVATE_KEY

        },
        databaseURL: "https://fadderukabo-default-rtdb.europe-west1.firebasedatabase.app",
      },
    useFirebaseAdminDefaultCredentials: true,
    firebaseClientInitConfig: {
      apiKey: "AIzaSyAbZCyD3KZLyXK8HaIfefHMDzASWjFLNmU",
      authDomain: "fadderukabo.firebaseapp.com",
      databaseURL: "https://fadderukabo-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "fadderukabo",

    },
    cookies: {
      name: 'Fadderuka', // required
      // Keys are required unless you set `signed` to `false`.
      // The keys cannot be accessible on the client side.
      keys: [
        process.env.COOKIE_SECRET_CURRENT,
        process.env.COOKIE_SECRET_PREVIOUS,
      ],
      httpOnly: true,
      maxAge: 3 * 60 * 60 * 24 * 1000, // three days
      overwrite: true,
      path: '/',
      sameSite: 'strict',
      secure: true, // set this to false in local (non-HTTPS) development
      signed: true,
    },
    onVerifyTokenError: (err) => {
      console.error(err)
    },
    onTokenRefreshError: (err) => {
      console.error(err)
    },
  })
}

export default initAuth