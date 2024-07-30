/**
 * Generated by orval v6.31.0 🍺
 * Do not edit manually.
 * React Native Exercise API Documentation
 * React Native Exercise API Documentation
 * OpenAPI spec version: 1.0.0
 */
import { AUTH_TOKEN, BASE_URL } from "@/constants";
import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import {
  errorInterceptor,
  requestInterceptor,
  responseInterceptor,
} from "./Interceptor";

export enum AcceptType {
  json = "application/json",
  formData = "multipart/form-data",
  urlencode = "application/x-www-form-urlencoded",
}

const TIMEOUT = 60000; // ms

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  validateStatus: function (status) {
    return status >= 200 && status <= 500;
  },
  headers: {
    Accept: AcceptType.json,
    "Content-Type": AcceptType.json,
  },
});

axiosInstance.interceptors.request.use(requestInterceptor, errorInterceptor);
axiosInstance.interceptors.response.use(responseInterceptor, errorInterceptor);
axiosInstance.interceptors.request.use(
  (config) => {
    if (AUTH_TOKEN) {
      config.headers.Authorization = `Bearer ${AUTH_TOKEN}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export type CreatePlan422 = {
  errors: { [key: string]: string[] };
  message: string;
};

export type DeletePlanDocument404 = {
  message: string;
};

export type DeletePlanDocument202 = {
  message: string;
};

export type UpdatePlanDocument422Errors = {
  document?: string[];
};

export type UpdatePlanDocument422 = {
  errors: UpdatePlanDocument422Errors;
  message: string;
};

export type UpdatePlanDocument404 = {
  message: string;
};

export type UpdatePlanDocument201 = {
  data: PlanDocumentData;
};

export type _UpdatePlanDocumentBodyMethod =
  (typeof _UpdatePlanDocumentBodyMethod)[keyof typeof _UpdatePlanDocumentBodyMethod];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const _UpdatePlanDocumentBodyMethod = {
  PUT: "PUT",
} as const;

export type UpdatePlanDocumentBody = {
  _method: _UpdatePlanDocumentBodyMethod;
  /** The document to upload (JPEG, PNG, PDF, Excel) */
  document: DocumentType;
};

export type CreatePlanDocument422Errors = {
  document?: string[];
  planId?: string[];
};

export type CreatePlanDocument422 = {
  errors: CreatePlanDocument422Errors;
  message: string;
};

export type CreatePlanDocument201 = {
  data: PlanDocumentData;
};

export type DocumentType = {
  name: string | undefined;
  type: string | undefined;
  uri: string | undefined;
};

export type CreatePlanDocumentBody = {
  /** The document file to upload (JPEG, PNG, PDF, Excel) */
  document?: DocumentType;
  /** ID of the plan the document belongs to */
  planId?: string;
};

export type DeletePlan404 = {
  message: string;
};

export type DeletePlan202 = {
  message: string;
};

export type UpdatePlan404 = {
  message: string;
};

export type UpdatePlan201 = {
  data: PlanData;
  included?: PlanDocumentData[];
};

export type UpdatePlanBody = {
  /** Date of the plan in format Y-m-d */
  date?: string;
  /**
   * Title of the plan
   * @maxLength 255
   */
  title?: string;
};

export type UpdatePlanInclude =
  (typeof UpdatePlanInclude)[keyof typeof UpdatePlanInclude];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const UpdatePlanInclude = {
  documents: "documents",
} as const;

export type UpdatePlanParams = {
  /**
   * Include related documents
   */
  include?: UpdatePlanInclude;
};

export type GetPlan404 = {
  message: string;
};

export type GetPlan200 = {
  data: PlanData;
  included?: PlanDocumentData[];
};

export type GetPlanInclude =
  (typeof GetPlanInclude)[keyof typeof GetPlanInclude];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const GetPlanInclude = {
  documents: "documents",
} as const;

export type GetPlanParams = {
  /**
   * Include related documents
   */
  include?: GetPlanInclude;
};

export type CreatePlan201 = {
  data: PlanData;
  included?: PlanDocumentData[];
};

export type CreatePlanBody = {
  /** Date of the plan in format Y-m-d */
  date?: string;
  /**
   * Title of the plan
   * @maxLength 255
   */
  title?: string;
};

export type CreatePlanInclude =
  (typeof CreatePlanInclude)[keyof typeof CreatePlanInclude];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const CreatePlanInclude = {
  documents: "documents",
} as const;

export type CreatePlanParams = {
  /**
   * Include related documents
   */
  include?: CreatePlanInclude;
};

export type GetPlans200 = {
  data: PlanData[];
  included?: PlanDocumentData[];
  links: Links;
  meta: Meta;
};

export type GetPlansInclude =
  (typeof GetPlansInclude)[keyof typeof GetPlansInclude];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const GetPlansInclude = {
  documents: "documents",
} as const;

export type GetPlansParams = {
  /**
   * Page number
   */
  page?: number;
  /**
   * Checklist per page
   */
  perPage?: number;
  /**
   * Include related documents
   */
  include?: GetPlansInclude;
};

export type Login422Errors = {
  email?: string[];
  password?: string[];
};

export type Login422 = {
  errors: Login422Errors;
  message: string;
};

export type Login201Data = {
  accessToken: string;
  expiresAt: string;
  isPersonalInfoCompleted?: boolean;
  tokenType: string;
};

export type Login201 = {
  data: Login201Data;
};

export type LoginBody = {
  email: string;
  password: string;
};

export type InternalServerErrorResponse = {
  message: string;
};

export type UnauthenticatedResponse = {
  message: string;
};

export type PlanDocumentDataType =
  (typeof PlanDocumentDataType)[keyof typeof PlanDocumentDataType];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const PlanDocumentDataType = {
  planDocuments: "planDocuments",
} as const;

export interface PlanDocumentData {
  attributes: PlanDocumentDataAttributes;
  id: string;
  type: PlanDocumentDataType;
}

export type PlanDocumentDataAttributesMime =
  (typeof PlanDocumentDataAttributesMime)[keyof typeof PlanDocumentDataAttributesMime];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const PlanDocumentDataAttributesMime = {
  "image/jpeg": "image/jpeg",
  "image/png": "image/png",
  "application/pdf": "application/pdf",
  "application/vndms-excel": "application/vnd.ms-excel",
  "application/vndopenxmlformats-officedocumentspreadsheetmlsheet":
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
} as const;

export type PlanDocumentDataAttributes = {
  /** @nullable */
  blurhash: string | null;
  mime: PlanDocumentDataAttributesMime;
  name: string;
  url: string;
};

/**
 * Type of resource
 */
export type PlanDataType = (typeof PlanDataType)[keyof typeof PlanDataType];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const PlanDataType = {
  planDocuments: "planDocuments",
} as const;

export type PlanDataAttributes = {
  /**
   * Date of the created plan
   * @nullable
   */
  date: string | null;
  /**
   * Title of the created plan
   * @nullable
   */
  title: string | null;
};

export interface PlanRelationships {
  documents?: PlanRelationshipsDocuments;
}

export interface PlanData {
  attributes: PlanDataAttributes;
  /** ID of the created plan */
  id: string;
  relationships?: PlanRelationships;
  /** Type of resource */
  type: PlanDataType;
}

export type PlanRelationshipsDocumentsDataItemType =
  (typeof PlanRelationshipsDocumentsDataItemType)[keyof typeof PlanRelationshipsDocumentsDataItemType];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const PlanRelationshipsDocumentsDataItemType = {
  planDocuments: "planDocuments",
} as const;

export type PlanRelationshipsDocumentsDataItem = {
  id: string;
  type: PlanRelationshipsDocumentsDataItemType;
};

export type PlanRelationshipsDocuments = {
  data: PlanRelationshipsDocumentsDataItem[];
};

export interface Links {
  /** The URL to the first page of phases */
  first: string;
  /** The URL to the last page of phases */
  last: string;
}

export type MetaLinksItem = {
  /** Whether the pagination link is active or not */
  active?: boolean;
  /** The label for the pagination link */
  label?: string;
  /**
   * The URL to the previous or next page
   * @nullable
   */
  url?: string | null;
};

export interface Meta {
  /** The current page number */
  currentPage: number;
  /** The index of the first item in the current page */
  from: number;
  /** The total number of pages */
  lastPage: number;
  links: MetaLinksItem[];
  /** The base path for the phase API */
  path: string;
  /** The number of phases per page */
  perPage: number;
  /** The index of the last item in the current page */
  to: number;
  /** The total number of phases */
  total: number;
}

/**
 * @summary Logs a user in
 */
export const login = <TData = AxiosResponse<Login201>>(
  loginBody: LoginBody,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axiosInstance.post(`/login`, loginBody, options);
};

/**
 * @summary Retrieve plans
 */
export const getPlansAPI = <TData = GetPlans200>(
  params?: GetPlansParams,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axiosInstance.get(`/plan`, {
    ...options,
    params: { ...params, ...options?.params },
  });
};

/**
 * @summary Create a new plan
 */
export const createPlanAPI = <TData = CreatePlan201>(
  createPlanBody: CreatePlanBody,
  params?: CreatePlanParams,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axiosInstance.post(`/plan`, createPlanBody, {
    ...options,
    params: { ...params, ...options?.params },
  });
};

/**
 * @summary Get plan details
 */
export const getPlanAPI = <TData = GetPlan200>(
  id: string,
  params?: GetPlanParams,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axiosInstance.get(`/plan/${id}`, {
    ...options,
    params: { ...params, ...options?.params },
  });
};

/**
 * @summary Update a new plan
 */
export const updatePlanAPI = <TData = UpdatePlan201>(
  id: string,
  updatePlanBody: UpdatePlanBody,
  params?: UpdatePlanParams,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axiosInstance.put(`/plan/${id}`, updatePlanBody, {
    ...options,
    params: { ...params, ...options?.params },
  });
};

/**
 * Deletes a plan
 * @summary Delete a plan
 */
export const deletePlanAPI = <TData = DeletePlan202>(
  id: string,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axiosInstance.delete(`/plan/${id}`, options);
};

/**
 * @summary Create a new plan document
 */
export const createPlanDocumentAPI = <TData = CreatePlanDocument201>(
  createPlanDocumentBody: CreatePlanDocumentBody | any,
  options?: AxiosRequestConfig
): Promise<TData> => {
  const formData = new FormData();
  if (createPlanDocumentBody.planId !== undefined) {
    formData.append("planId", createPlanDocumentBody.planId);
  }
  if (createPlanDocumentBody.document !== undefined) {
    formData.append("document", createPlanDocumentBody.document);
  }

  return axiosInstance.post(`/plan-document`, formData, {
    ...options,
    headers: {
      Accept: AcceptType.formData,
      "Content-Type": AcceptType.formData,
    },
  });
};

/**
 * @summary Update a plan document
 */
export const updatePlanDocumentAPI = <TData = UpdatePlanDocument201>(
  id: string,
  updatePlanDocumentBody: UpdatePlanDocumentBody | any,
  options?: AxiosRequestConfig
): Promise<TData> => {
  const formData = new FormData();

  if (updatePlanDocumentBody._method !== undefined) {
    formData.append("_method", updatePlanDocumentBody._method);
  }

  if (updatePlanDocumentBody.document !== undefined) {
    formData.append("document", updatePlanDocumentBody.document);
  }

  return axiosInstance.post(`/plan-document/${id}`, formData, {
    ...options,
    headers: {
      Accept: AcceptType.formData,
      "Content-Type": AcceptType.formData,
    },
  });
};

/**
 * @summary Delete a plan document
 */
export const deletePlanDocumentAPI = <TData = DeletePlanDocument202>(
  id: string,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axiosInstance.delete(`/plan-document/${id}`, options);
};
