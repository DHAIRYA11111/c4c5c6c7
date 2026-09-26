export type DemoUser = {
  name: string;
  email: string;
  phone?: string;
};

const USER_KEY = "spa-user";

export function getDemoUser(): DemoUser | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(USER_KEY);
  return value ? JSON.parse(value) as DemoUser : null;
}

export function saveDemoUser(user: DemoUser): void {
  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearDemoUser(): void {
  window.localStorage.removeItem(USER_KEY);
}
