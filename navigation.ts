import {
  Pathnames,
  createSharedPathnamesNavigation,
} from "next-intl/navigation";

export const locales = ["pl", "en"] as const;
export const localePrefix = "always"; // Default

export const pathnames = {
  // If all locales use the same pathname, a
  "/": "/",
} satisfies Pathnames<typeof locales>;

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix });
