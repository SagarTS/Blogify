export interface User {
  id: string;
  name: string;
  email: string;
}

interface StoredUser extends User {
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

const USERS_KEY = "blogify_users";
const AUTH_KEY = "blogify_auth";

export function generateFakeToken(): string {
  return crypto.randomUUID();
}

export function getStoredUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];

  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveStoredUsers(users: StoredUser[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getAuthState(): { user: User | null; token: string | null } {
  if (typeof window === "undefined") return { user: null, token: null };
  const raw = localStorage.getItem(AUTH_KEY);
  if (!raw) return { user: null, token: null };
  try {
    return JSON.parse(raw);
  } catch {
    return { user: null, token: null };
  }
}

function saveAuthState(user: User, token: string): void {
  localStorage.setItem(AUTH_KEY, JSON.stringify({ user, token }));
}

export function clearAuthState(): void {
  localStorage.removeItem(AUTH_KEY);
}

export function signUpUser(
  name: string,
  email: string,
  password: string,
): AuthResponse {
  const users = getStoredUsers();

  if (users.some((u) => u.email === email)) {
    throw new Error("An Account with this email already exits");
  }

  const newUser: StoredUser = {
    id: crypto.randomUUID(),
    name,
    email,
    password,
  };

  const token = generateFakeToken();
  const authResponse: AuthResponse = {
    user: { id: newUser.id, name: newUser.name, email: newUser.email },
    token,
  };

  saveStoredUsers([...users, newUser]);
  saveAuthState(authResponse.user, authResponse.token);

  return authResponse;
}

export function loginUser(email: string, password: string): AuthResponse {
  const users = getStoredUsers();
  const user = users.find((u) => u.email === email);

  if (!user) {
    throw new Error("No account found with this email");
  }

  if (user.password !== password) {
    throw new Error("Invalid password");
  }

  const token = generateFakeToken();
  const authResponse: AuthResponse = {
    user: { id: user.id, name: user.name, email: user.email },
    token,
  };

  saveAuthState(authResponse.user, authResponse.token);

  return authResponse;
}
