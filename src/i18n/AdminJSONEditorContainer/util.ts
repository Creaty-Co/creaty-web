import { ResourceKey } from "i18next"

const API = process.env.REACT_APP_API_HOST

export const updateTranslationRequest = async (language: string, namespace: string, data: ResourceKey) => {
  const lSAccessToken = localStorage.getItem("accessToken") || ""

  const updateJson = async (token: string) => {
    return await fetch(`${API}/pages/locales/${language}/${namespace}.json/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(data),
    })
  }
  const response = await updateJson(lSAccessToken)

  if (response.status === 401) {
    const lSRefreshToken = localStorage.getItem("refreshToken")

    const refreshResult = await fetch(`${API}/users/token/refresh/`, {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ refresh: lSRefreshToken }),
    })

    const jsonData = await refreshResult.json()

    if (jsonData) {
      const { access, refresh } = jsonData as { access: string; refresh: string }
      localStorage.setItem("accessToken", access)
      localStorage.setItem("refreshToken", refresh)
      await updateJson(access)
    } else {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
    }
  }
  if (response.status === 204) return null
  return new Error("Response payload is empty. There is some problem with the request")
}
