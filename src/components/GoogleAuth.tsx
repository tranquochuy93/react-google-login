import React, { useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import axios, { AxiosResponse } from "axios";

function AuthPage() {  
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_APP_CLIENT_ID,
        scope: 'email',
      }); 
    }

    gapi.load('client:auth2', start);
  }, []);


  // **you can access the token like this**
  // const accessToken = gapi.auth.getToken().access_token;
  // console.log(accessToken);

   const onSuccess = async (res: any) => {
    try {
      const result: AxiosResponse<AuthenticatorResponse> = await axios.post("http://localhost:4005/google-auth/", {
        token: res?.accessToken,
      });

      console.log(res);

      // setUser(result.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  const onFailure = async (err: any) => {
    console.log('========================================')
    console.log(err)
  };
  const onLogoutSuccess = () => {
    console.log('SUCESS LOG OUT');
  };

  return (
    <div>
      <GoogleLogin
        clientId={process.env.REACT_APP_CLIENT_ID || ''}
        onSuccess={onSuccess}
        onFailure={onFailure}
        buttonText="Log in"
        uxMode="redirect"
      />
      <GoogleLogout
        clientId={process.env.REACT_APP_CLIENT_ID || ''}
        onLogoutSuccess={onLogoutSuccess}
      />
    </div>
  );
}

export default AuthPage;

// import { useState } from "react";
// import axios, { AxiosResponse } from "axios";
// import GoogleLogin from "react-google-login";

// interface AuthResponse {
//   token: string;
//   user: User;
// }

// interface User {
//   _id: string;
//   name: string;
//   email: string;
//   avatar: string;
// }

// const GoogleAuth = () => {
//   const clientId = process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID;
//   console.log(clientId);
//   const [user, setUser] = useState<User | null>(null);
//   const onSuccess = async (res: any) => {
//     try {
//       const result: AxiosResponse<AuthResponse> = await axios.post("http://localhost:4005/google-auth/", {
//         token: res?.tokenId,
//       });

//       console.log(res);

//       setUser(result.data.user);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const onFailure = async (err: any) => {
//     console.log('========================================')
//     console.log(err)
//   };

//   return (
//     <div className="h-screen w-screen flex items-center justify-center flex-col">
//       {!user && (
//         <GoogleLogin
//           clientId="92878250942-e6tdoq5l2bq22o88preq03s3ifrjuval.apps.googleusercontent.com"
//           onSuccess={onSuccess}
//           onFailure={onFailure}
//           uxMode="redirect"
//         />
//       )}

//       {user && (
//         <>
//           <img src={user.avatar} className="rounded-full" />
//           <h1 className="text-xl font-semibold text-center my-5">
//             {user.name}
//           </h1>
//         </>
//       )}
//     </div>
//   );
// };

// export default GoogleAuth;
