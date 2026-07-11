const AUTH_SESSION_KEY = 'temitop_auth_session'

interface AuthSession {
  email: string
  loggedInAt: number
}

export function saveAuthSession(email: string, rememberMe: boolean) {
  if (typeof window === 'undefined') return

  const session: AuthSession = {
    email,
    loggedInAt: Date.now(),
  }
  const storage = rememberMe ? window.localStorage : window.sessionStorage
  const inactiveStorage = rememberMe ? window.sessionStorage : window.localStorage

  storage.setItem(AUTH_SESSION_KEY, JSON.stringify(session))
  inactiveStorage.removeItem(AUTH_SESSION_KEY)
}

export function clearAuthSession() {
  if (typeof window === 'undefined') return

  window.localStorage.removeItem(AUTH_SESSION_KEY)
  window.sessionStorage.removeItem(AUTH_SESSION_KEY)
}
