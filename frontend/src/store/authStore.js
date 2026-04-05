import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: localStorage.getItem("access_token") || null,
      refreshToken: localStorage.getItem("refresh_token") || null,
      isAuthenticated: !!localStorage.getItem("access_token"),
      isLoading: false,
      error: null,

      // Login
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL || "http://localhost:8000/api"}/auth/login/`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password }),
            }
          );
          const data = await response.json();
          if (!response.ok) throw new Error(data.detail || data.non_field_errors?.[0] || "Login failed");

          localStorage.setItem("access_token", data.access);
          localStorage.setItem("refresh_token", data.refresh);
          set({
            token: data.access,
            refreshToken: data.refresh,
            user: data.user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
          return { success: true };
        } catch (err) {
          set({ isLoading: false, error: err.message, isAuthenticated: false });
          return { success: false, error: err.message };
        }
      },

      // Register
      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL || "http://localhost:8000/api"}/auth/register/`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(userData),
            }
          );
          const data = await response.json();
          if (!response.ok) throw new Error(data.detail || data.email?.[0] || "Registration failed");

          localStorage.setItem("access_token", data.access);
          localStorage.setItem("refresh_token", data.refresh);
          set({
            token: data.access,
            refreshToken: data.refresh,
            user: data.user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
          return { success: true };
        } catch (err) {
          set({ isLoading: false, error: err.message });
          return { success: false, error: err.message };
        }
      },

      // Logout
      logout: () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
          error: null,
        });
      },

      // Update user fields (called after profile save)
      updateUser: (updatedFields) => {
        set((state) => ({ user: { ...state.user, ...updatedFields } }));
      },

      // Refresh access token
      refreshAccessToken: async () => {
        const refresh = get().refreshToken || localStorage.getItem("refresh_token");
        if (!refresh) { get().logout(); return null; }
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL || "http://localhost:8000/api"}/auth/token/refresh/`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ refresh }),
            }
          );
          const data = await response.json();
          if (!response.ok) throw new Error("Refresh failed");
          localStorage.setItem("access_token", data.access);
          set({ token: data.access });
          return data.access;
        } catch {
          get().logout();
          return null;
        }
      },
      // Fetch current user from backend (called in App.jsx on mount)
      fetchProfile: async () => {
        const token = get().token || localStorage.getItem("access_token");
        if (!token) return;
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL || "http://localhost:8000/api"}/auth/profile/`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (response.status === 401) { get().logout(); return; }
          if (!response.ok) return;
          const data = await response.json();
          set({ user: data, isAuthenticated: true });
        } catch { /* silent fail — user just stays as persisted */ }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Named export for ProfilePage (import { useAuthStore } from "../store/authStore")
export { useAuthStore };

// Default export for all other pages (import useAuthStore from "../../context/authStore")
export default useAuthStore;