import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from "axios"

type StatusHandler = (error: AxiosError) => void | Promise<void>

interface ApiConfig extends AxiosRequestConfig {
  statusHandlers?: Partial<Record<number, StatusHandler>>
}

class Api {
  private instance: AxiosInstance
  private statusHandlers: Map<number, StatusHandler>

  constructor(config?: ApiConfig) {
    this.statusHandlers = new Map()

    // Register custom status handlers
    if (config?.statusHandlers) {
      Object.entries(config.statusHandlers).forEach(([status, handler]) => {
        this.statusHandlers.set(Number(status), handler ?? (() => { }))
      })
    }

    // Create axios instance with default config
    this.instance = axios.create({
      baseURL: `${import.meta.env.VITE_API_URL
        }:${import.meta.env.VITE_API_PORT
        }`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...config?.headers,
      },
      ...config,
    })

    // Add response interceptor for error handling
    this.instance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const status = error.response?.status

        if (status && this.statusHandlers.has(status)) {
          await this.statusHandlers.get(status)?.(error)
        }

        return Promise.reject(error)
      }
    )
  }

  // Helper method to handle responses
  private async handleRequest<T>(
    request: Promise<AxiosResponse<T>>,
    config?: ApiConfig
  ): Promise<T> {
    try {
      const response = await request
      return response.data
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status) {
        const status = error.response.status
        await config?.statusHandlers?.[status]?.(error)
      }
      throw error
    }
  }

  // HTTP methods
  async get<T extends {}>(url: string, config?: ApiConfig): Promise<T> {
    return this.handleRequest<T>(this.instance.get(url, config), config)
  }

  async post<T extends {}>(url: string, data?: unknown, config?: ApiConfig): Promise<T> {
    return this.handleRequest<T>(this.instance.post(url, data, config), config)
  }

  async put<T extends {}>(url: string, data?: unknown, config?: ApiConfig): Promise<T> {
    return this.handleRequest<T>(this.instance.put(url, data, config), config)
  }

  async patch<T extends {}>(url: string, data?: unknown, config?: ApiConfig): Promise<T> {
    return this.handleRequest<T>(this.instance.patch(url, data, config), config)
  }

  async delete<T extends {}>(url: string, config?: ApiConfig): Promise<T> {
    return this.handleRequest<T>(this.instance.delete(url, config), config)
  }
}
const defaultConfig: ApiConfig = {
  statusHandlers: {
    401: () => localStorage.removeItem("token")
  },
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
}

export const api = (config?: ApiConfig) => new Api({
  ...defaultConfig,
  ...config
})