'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid';

type UserAccount = {
  email: string;
  name?: string;
};

type SavedThumbnail = {
  id: string;
  prompt: string;
  imageData: string;
  createdAt: string;
};

type SavedContent = {
  id: string;
  topic: string;
  title: string;
  description: string;
  createdAt: string;
};

type AppStateContextValue = {
  isHydrated: boolean;
  user: UserAccount | null;
  thumbnails: SavedThumbnail[];
  contents: SavedContent[];
  login: (user: UserAccount) => void;
  logout: () => void;
  saveThumbnail: (thumbnail: Omit<SavedThumbnail, 'id' | 'createdAt'>) => SavedThumbnail;
  saveContent: (content: Omit<SavedContent, 'id' | 'createdAt'>) => SavedContent;
  removeThumbnail: (id: string) => void;
  removeContent: (id: string) => void;
};

const STORAGE_KEY = 'creator-hub-state';

const AppStateContext = createContext<AppStateContextValue | undefined>(undefined);

type PersistedState = {
  user: UserAccount | null;
  thumbnails: SavedThumbnail[];
  contents: SavedContent[];
};

const defaultState: PersistedState = {
  user: null,
  thumbnails: [],
  contents: [],
};

const loadState = (): PersistedState => {
  if (typeof window === 'undefined') return defaultState;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw) as PersistedState;
    return {
      user: parsed.user ?? null,
      thumbnails: Array.isArray(parsed.thumbnails) ? parsed.thumbnails : [],
      contents: Array.isArray(parsed.contents) ? parsed.contents : [],
    };
  } catch {
    return defaultState;
  }
};

const persistState = (state: PersistedState) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Swallow persistence errors to avoid breaking UX when storage is unavailable.
  }
};

type AppStateProviderProps = {
  children: React.ReactNode;
};

export function AppStateProvider({ children }: AppStateProviderProps) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [user, setUser] = useState<UserAccount | null>(null);
  const [thumbnails, setThumbnails] = useState<SavedThumbnail[]>([]);
  const [contents, setContents] = useState<SavedContent[]>([]);

  useEffect(() => {
    const state = loadState();
    setUser(state.user);
    setThumbnails(state.thumbnails);
    setContents(state.contents);
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    persistState({ user, thumbnails, contents });
  }, [user, thumbnails, contents, isHydrated]);

  const login = useCallback((account: UserAccount) => {
    setUser(account);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const saveThumbnail = useCallback(
    (thumbnail: Omit<SavedThumbnail, 'id' | 'createdAt'>) => {
      const payload: SavedThumbnail = {
        id: uuid(),
        createdAt: new Date().toISOString(),
        ...thumbnail,
      };
      setThumbnails((prev) => [payload, ...prev]);
      return payload;
    },
    [],
  );

  const saveContent = useCallback(
    (content: Omit<SavedContent, 'id' | 'createdAt'>) => {
      const payload: SavedContent = {
        id: uuid(),
        createdAt: new Date().toISOString(),
        ...content,
      };
      setContents((prev) => [payload, ...prev]);
      return payload;
    },
    [],
  );

  const removeThumbnail = useCallback((id: string) => {
    setThumbnails((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const removeContent = useCallback((id: string) => {
    setContents((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const value = useMemo<AppStateContextValue>(
    () => ({
      isHydrated,
      user,
      thumbnails,
      contents,
      login,
      logout,
      saveThumbnail,
      saveContent,
      removeThumbnail,
      removeContent,
    }),
    [isHydrated, user, thumbnails, contents, login, logout, saveThumbnail, saveContent, removeThumbnail, removeContent],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
}
