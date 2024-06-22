// SUCCESS RESPONSE
export type Pagination = {
  hasNextPage: boolean;
  nextId: number | null;
};

export type SuccessResponseType<T> = {
  status: string;
  code: number;
  message: string;
  data: T;
  pagination: Pagination | null;
};

// FAILED RESPONSE
export enum ErrorStatusEnum {
  INVALID_PARAMETER = "Invalid Parameter",
  UNAUTHORIZED_ACCESS = "Unauthorized Access",
  RESOURCE_NOT_FOUND = "Resource Not Found",
  INTERNAL_SERVER_ERROR = "Internal Server Error",
  METHOD_NOT_ALLOWED = "Method Not Allowed",
  CONFLICT_DUPLICATE_ENTRY = "Conflict (Duplicate Entry)",
}

export type ErrorType = {
  field?: string;
  type: string;
  message: string;
};

export type ErrorResponseType = {
  status: ErrorStatusEnum;
  code: number;
  errors: ErrorType[];
};

export const DEFAULT_ERROR_RESPONSE_COOKIE_NOT_FOUND: ErrorResponseType = {
  status: ErrorStatusEnum.INVALID_PARAMETER,
  code: 400,
  errors: [
    {
      type: "invalid",
      message: "Cookie not found",
    },
  ],
};

export const DEFAULT_ERROR_RESPONSE_INTERNAL_SERVER = (): ErrorResponseType => {
  const errorObject: ErrorResponseType = {
    status: ErrorStatusEnum.INTERNAL_SERVER_ERROR,
    code: 500,
    errors: [
      {
        type: "server",
        message: "An unexpected error occurred on the server",
      },
    ],
  };
  return errorObject;
};
