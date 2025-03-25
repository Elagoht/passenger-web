import Environment from "../Environment";

class ApiHandler {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<TResponse>(
    method: string,
    endpoint: string,
    body?: unknown,
    headers?: Record<string, string>,
  ): Promise<TResponse> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method,
      headers: {
        ...(body instanceof FormData
          ? {}
          : { "Content-Type": "application/json" }),
        ...headers,
      },
      body:
        body instanceof FormData
          ? body
          : body
            ? JSON.stringify(body)
            : undefined,
    });

    if (!response.ok) {
      throw {
        data: await response.json(),
        status: response.status,
      } as const;
    }

    try {
      if (response.headers.get("content-type")?.startsWith("text/")) {
        return (await response.text()) as TResponse;
      } else if (
        response.headers.get("content-type")?.startsWith("application/json")
      ) {
        return (await response.json()) as TResponse;
      } else {
        return {} as TResponse;
      }
    } catch {
      return {} as TResponse;
    }
  }

  public post<TResponse>(
    endpoint: string,
    body?: unknown,
    headers?: Record<string, string>,
  ): Promise<TResponse> {
    return this.request<TResponse>("POST", endpoint, body, headers);
  }

  public get<T>(
    endpoint: string,
    headers?: Record<string, string>,
  ): Promise<T> {
    return this.request<T>("GET", endpoint, undefined, headers);
  }

  public put<TResponse>(
    endpoint: string,
    body?: unknown,
    headers?: Record<string, string>,
  ): Promise<TResponse> {
    return this.request<TResponse>("PUT", endpoint, body, headers);
  }

  public patch<TResponse>(
    endpoint: string,
    body?: unknown,
    headers?: Record<string, string>,
  ): Promise<TResponse> {
    return this.request<TResponse>("PATCH", endpoint, body, headers);
  }

  public delete<TResponse>(
    endpoint: string,
    headers?: Record<string, string>,
  ): Promise<TResponse> {
    return this.request<TResponse>("DELETE", endpoint, undefined, headers);
  }
}

export const apiCall = new ApiHandler(
  `${Environment.API_URL}:${Environment.API_PORT}`,
);
