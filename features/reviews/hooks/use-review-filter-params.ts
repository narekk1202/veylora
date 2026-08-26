"use client";

import { Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { startTransition, useCallback } from "react";

type FilterKey = "status";

export function useReviewFilterParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setFilterParam = useCallback(
    (key: FilterKey, value: string | undefined) => {
      const current = searchParams.get(key) ?? "";
      const next = value ?? "";
      if (current === next) return;

      const params = new URLSearchParams(searchParams.toString());
      if (next) {
        params.set(key, next);
      } else {
        params.delete(key);
      }

      const qs = params.toString();
      startTransition(() => {
        router.replace((qs ? `${pathname}?${qs}` : pathname) as Route);
      });
    },
    [pathname, router, searchParams],
  );

  return { searchParams, setFilterParam };
}
