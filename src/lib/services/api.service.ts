export interface IAPISucessResponse<T> {
  ok: true;
  payload: T;
}

export interface IAPIFailResponse {
  ok: false;
  status: number;
  message: string;
  code: string;
  keyValue: Record<string, any>;
}

export type APIResponse<T> = IAPISucessResponse<T> | IAPIFailResponse;

export const handleAPIRequest = async <T>(
  promise: Promise<{ data: T }>
): Promise<APIResponse<T>> => {
  try {
    const response = await promise;

    return { ok: true, payload: response.data };
  } catch (err) {
    const error = err as IAPIFailResponse;
    const response: IAPIFailResponse = {
      ok: false,
      message: error.message || "API: Unexpected Error",
      code: error.code || "UNEXPECTED_ERROR",
      keyValue: error.keyValue,
      status: error.status || 500,
    };

    return response;
  }
};
