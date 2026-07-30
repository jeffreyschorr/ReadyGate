"use client";

import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

import { BrandLogo } from "@/components/brand/BrandLogo";
import { Button } from "@/components/ui/Button";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTranslation } from "@/i18n/useTranslation";
import { motionDuration, motionEase } from "@/lib/motion";
import { scrollToHash } from "@/lib/smooth-scroll";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { key: "landing.header.about" as const, href: "#about" },
  { key: "landing.header.engineering" as const, href: "/engineering" },
  { key: "landing.header.brand" as const, href: "/brand" },
  { key: "landing.header.designSystem" as const, href: "/design" },
] as const;

const menuMotion = {
  duration: motionDuration.expand,
  ease: motionEase,
};

export function LandingHeader() {
  const { t } = useTranslation();
  const reducedMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => {
      if (media.matches) {
        setMenuOpen(false);
      }
    };

    closeOnDesktop();
    media.addEventListener("change", closeOnDesktop);
    return () => media.removeEventListener("change", closeOnDesktop);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const handleAnchorClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!href.startsWith("#")) {
      return;
    }

    event.preventDefault();
    closeMenu();
    scrollToHash(href, { reducedMotion });
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-200",
        scrolled ? "border-border bg-surface/95 shadow-sm backdrop-blur-sm" : "border-transparent bg-background",
      )}
    >
      <div className="landing-shell flex h-16 items-center justify-between gap-4">
        <Link href="/" className="shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
          <BrandLogo variant="lockup" size="sm" priority />
        </Link>

        <nav
          aria-label={t("landing.header.mainNav")}
          className="hidden items-center gap-8 md:flex"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={(event) => handleAnchorClick(event, item.href)}
              className="text-sm font-medium text-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              {t(item.key)}
            </Link>
          ))}
          <Button component={Link} href="/home" size="small" className="min-h-10 px-5">
            {t("landing.header.startDemo")}
          </Button>
        </nav>

        <div className="md:hidden">
          <IconButton
            type="button"
            color="primary"
            aria-label={menuOpen ? t("landing.header.closeMenu") : t("landing.header.openMenu")}
            aria-expanded={menuOpen}
            aria-controls="landing-mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="hover:bg-accent-subtle"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {menuOpen ? (
          <motion.nav
            id="landing-mobile-menu"
            aria-label={t("landing.header.mainNav")}
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={menuMotion}
            className="overflow-hidden border-t border-border bg-surface md:hidden"
          >
            <div className="landing-shell py-4">
            <motion.ul
              className="space-y-1"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: {
                  transition: {
                    staggerChildren: reducedMotion ? 0 : 0.045,
                    delayChildren: reducedMotion ? 0 : 0.06,
                  },
                },
                closed: {
                  transition: {
                    staggerChildren: reducedMotion ? 0 : 0.02,
                    staggerDirection: -1,
                  },
                },
              }}
            >
              {NAV_ITEMS.map((item) => (
                <motion.li
                  key={item.key}
                  variants={{
                    closed: {
                      opacity: 0,
                      y: reducedMotion ? 0 : -6,
                    },
                    open: {
                      opacity: 1,
                      y: 0,
                      transition: menuMotion,
                    },
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={(event) => {
                      handleAnchorClick(event, item.href);
                      if (!item.href.startsWith("#")) {
                        closeMenu();
                      }
                    }}
                    className="block rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-accent-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    {t(item.key)}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                className="pt-2"
                variants={{
                  closed: {
                    opacity: 0,
                    y: reducedMotion ? 0 : -6,
                  },
                  open: {
                    opacity: 1,
                    y: 0,
                    transition: menuMotion,
                  },
                }}
              >
                <Button
                  component={Link}
                  href="/home"
                  onClick={closeMenu}
                  className="w-full"
                >
                  {t("landing.header.startDemo")}
                </Button>
              </motion.li>
            </motion.ul>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
