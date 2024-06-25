import type {
    AxiosError,
    AxiosResponse,
    InternalAxiosRequestConfig,
  } from 'axios';
  import axios from 'axios';
//   import { signOut } from 'next-auth/react';
  
//   import { SessionTypes } from '@/services/authentication/authenticationTypes';
//   import { ResponseApiTypes } from '@/types/serviceApi';
//   import { getSessionAuth } from '../next-auth';
  
  const AxiosInitiate = () => {
    const AxiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.NEXT_PUBLIC_X_API_KEY,
      },
    });
  
    const onRequest = async (
      config: InternalAxiosRequestConfig,
    ): Promise<InternalAxiosRequestConfig> => {
    //   const session = await getSessionAuth();
  
    //   const user = session?.user as SessionTypes;
  
    //   if (user && user.profile && !config.headers.Authorization) {
    //     config.headers.Authorization = user.profile.token;
    //   }
  
      return config;
    };
  
    const onRequestError = (error: AxiosError): Promise<AxiosError> => Promise.reject(error);
  
    const onResponse = (response: AxiosResponse): AxiosResponse => {
      if (response.status === 401) {
        // for signout if token expire or for refresh token
      }
  
      return response;
    };
  
    const onResponseError = (error: AxiosError) => Promise.reject(error);
  
    AxiosInstance.interceptors.request.use(onRequest, onRequestError);
    AxiosInstance.interceptors.response.use(
      (response: AxiosResponse) => onResponse(response),
      (error: AxiosError) => {
        // if (error.response?.data.status === 401) {
        //   signOut({ callbackUrl: '/dashboard/login' });
        // }
        return onResponseError(error);
      },
    );
  
    return AxiosInstance;
  };
  
  const AxiosInstance = AxiosInitiate();
  
  export default AxiosInstance;
  