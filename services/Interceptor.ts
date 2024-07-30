import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import camelKeys from "camelcase-keys";
import { isString } from "lodash";

export const responseInterceptor = (response: AxiosResponse) => {
  console.log(
    "Response from API: ",
    response?.request?.responseURL,
    response?.status
  );

  if (response.status >= 400) {
    console.log("Response from API error: ", response?.data);
    if (response.status === 404) {
      // not found => show customize message instead
      const customError = {
        status: 404,
        ...response?.data,
      };
      return Promise.reject(customError);
    }

    const errorObject = camelKeys(response?.data);

    return Promise.reject(
      isString(response?.data)
        ? response?.data
        : {
            ...errorObject,
            status: response.status.toString(),
          }
    );
  }

  console.log("Response from API data: ", response?.data);

  return Promise.resolve(response?.data);
};

export const errorInterceptor = (error: AxiosError) => {
  console.log("Error from API: ", error?.response?.data);
  return Promise.reject(error);
};

export const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  console.log(
    "REQUEST: ",
    config?.method,
    (config?.baseURL ?? "") + config?.url,
    config?.data
  );

  return config;
};
