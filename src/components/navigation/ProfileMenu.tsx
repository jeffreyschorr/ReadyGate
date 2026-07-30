"use client";

import { useState } from "react";

import Link from "next/link";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PersonIcon from "@mui/icons-material/Person";

import {
  desktopNavIconClassName,
  desktopNavIconSize,
} from "@/components/navigation/desktop-nav-icon-styles";
import { useTranslation } from "@/i18n/useTranslation";

export function ProfileMenu({ compact = false }: { compact?: boolean }) {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <button
        type="button"
        aria-label={t("a11y.openProfileMenu")}
        aria-controls={open ? "profile-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={(event) => setAnchorEl(event.currentTarget)}
        className={desktopNavIconClassName(false, compact)}
      >
        <PersonIcon sx={{ fontSize: desktopNavIconSize }} aria-hidden="true" />
      </button>

      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          component={Link}
          href="/"
          onClick={() => setAnchorEl(null)}
        >
          {t("navigation.signOut")}
        </MenuItem>
      </Menu>
    </>
  );
}
