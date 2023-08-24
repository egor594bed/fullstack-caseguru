import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "../redux/slices/auth";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();

  const request = useCallback(async (callback: () => Promise<Response>) => {
    setLoading(true);
    try {
      const response = await callback();
      const data = await response.json();

      if (response.status === 401) {
        dispatch(setAuth({ isAuth: false, token: "" }));
        throw new Error(data.message || "Пользователь не авторизован");
      }
      if (response.status === 403) {
        throw new Error("Нет прав для просмотра страницы");
      }
      if (!response.ok) {
        throw new Error(data.message || "Что-то пошло не так");
      }
      return data;
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => setError(""), [error, request]);

  return {
    loading,
    request,
    error,
    clearError,
  };
};
