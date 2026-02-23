import { useState, useCallback, useEffect } from "react";

const STORAGE_KEY = "coursematch-bookmarks";

function getStoredBookmarks(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>(getStoredBookmarks);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggle = useCallback((courseId: string) => {
    setBookmarks((prev) =>
      prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId]
    );
  }, []);

  const isBookmarked = useCallback(
    (courseId: string) => bookmarks.includes(courseId),
    [bookmarks]
  );

  return { bookmarks, toggle, isBookmarked };
}
