import Environment from "../Environment";

class ApiHandler {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<TResponse, TBody>(
    method: string,
    endpoint: string,
    body?: TBody,
    headers?: Record<string, string>,
  ): Promise<TResponse> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw {
        data: await response.json(),
        status: response.status,
      } as const;
    }

    return response.json() as Promise<TResponse>;
  }

  public post<TResponse>(
    endpoint: string,
    body: unknown,
    headers?: Record<string, string>,
  ): Promise<TResponse> {
    return this.request<TResponse, unknown>("POST", endpoint, body, headers);
  }

  public get<T>(
    endpoint: string,
    headers?: Record<string, string>,
  ): Promise<T> {
    return this.request<T, undefined>("GET", endpoint, undefined, headers);
  }

  public put<TResponse>(
    endpoint: string,
    body: unknown,
    headers?: Record<string, string>,
  ): Promise<TResponse> {
    return this.request<TResponse, unknown>("PUT", endpoint, body, headers);
  }

  public patch<TResponse>(
    endpoint: string,
    body: unknown,
    headers?: Record<string, string>,
  ): Promise<TResponse> {
    return this.request<TResponse, unknown>("PATCH", endpoint, body, headers);
  }

  public delete<TResponse>(
    endpoint: string,
    headers?: Record<string, string>,
  ): Promise<TResponse> {
    return this.request<TResponse, undefined>(
      "DELETE",
      endpoint,
      undefined,
      headers,
    );
  }
}

export const apiCall = new ApiHandler(
  `${Environment.API_URL}:${Environment.API_PORT}`,
);
