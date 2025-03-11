import { api } from "../utilities/api"

export const getIsInitialized = async () => {
  return await api().get<ResponseIsInitialized>("/auth/is-initialized")
}

export const postInitialize = async (request: RequestInitialize) => {
  return await api().post<ResponseInitialize>("/auth/initialize", request)
}

export const postLogin = async (request: RequestLogin) => {
  return await api().post<ResponseLogin>("/auth/login", request)
}