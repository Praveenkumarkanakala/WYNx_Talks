import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  // useLayoutEffect fires BEFORE paint — catches more cases than useEffect
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  // useEffect as backup, fires after paint
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Delayed fallback — catches cases where content loads async and pushes scroll
    const t1 = setTimeout(() => { window.scrollTo(0, 0); }, 50);
    const t2 = setTimeout(() => { window.scrollTo(0, 0); }, 150);
    const t3 = setTimeout(() => { window.scrollTo(0, 0); }, 300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [pathname]);

  return null;
}