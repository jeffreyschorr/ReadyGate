"use client";

import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { FixedUiRoot } from "@/components/layout/FixedUiRoot";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { demoConfig } from "@/config/demo";
import { getStageLabel } from "@/data/stageContent";
import { JOURNEY_STAGE_IDS } from "@/types/journey";
import { resetDemoStorage } from "@/lib/demo-reset";
import { useJourneyDemo } from "@/hooks/useJourneyDemo";
import { useTravellerPreferences } from "@/hooks/useTravellerPreferences";
import { useTranslation } from "@/i18n/useTranslation";
import type { JourneyStageId } from "@/types/journey";

const demoIconButtonSx = {
  color: "#ffffff",
  border: "1px solid rgba(255,255,255,0.3)",
  "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
  "& .MuiSvgIcon-root": { color: "#ffffff" },
  "&.Mui-disabled": {
    color: "rgba(255,255,255,0.4)",
    borderColor: "rgba(255,255,255,0.15)",
    "& .MuiSvgIcon-root": { color: "rgba(255,255,255,0.4)" },
  },
} as const;

const demoCollapseButtonSx = {
  color: "#ffffff",
  "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
  "& .MuiSvgIcon-root": { color: "#ffffff" },
} as const;

const demoSelectSx = {
  mb: 1.5,
  "& .MuiInputLabel-root": {
    color: "rgba(255,255,255,0.85)",
    fontSize: "0.75rem",
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#ffffff" },
  "& .MuiOutlinedInput-root": {
    color: "#ffffff",
    fontSize: "0.75rem",
    "& fieldset": { borderColor: "rgba(255,255,255,0.35)" },
    "&:hover fieldset": { borderColor: "rgba(255,255,255,0.6)" },
    "&.Mui-focused fieldset": { borderColor: "#ffffff" },
  },
  "& .MuiSelect-select": {
    fontSize: "0.75rem",
    lineHeight: 1.5,
  },
  "& .MuiSelect-icon": { color: "#ffffff", fontSize: "1.25rem" },
  "& .MuiSvgIcon-root": { color: "#ffffff" },
} as const;

export function JourneySimulator() {
  const {
    stage,
    setStage,
    goToPreviousStage,
    goToNextStage,
    resetStage,
    canGoPrevious,
    canGoNext,
    stageIndex,
    stageCount,
    disruptionActive,
    triggerDisruptionScenario,
  } = useJourneyDemo();
  const { resetPreferences } = useTravellerPreferences();
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(true);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  const handleResetConfirm = () => {
    resetDemoStorage();
    resetStage();
    resetPreferences();
    setResetDialogOpen(false);

    if (pathname !== "/home") {
      router.replace("/home");
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };

  if (!demoConfig.showPanel) {
    return null;
  }

  return (
    <>
    <FixedUiRoot>
    <aside
      aria-label={t("a11y.demoControls")}
      data-tour="demo-panel"
      className="pointer-events-auto absolute right-4 bottom-[calc(3.5rem+env(safe-area-inset-bottom,0px)+0.5rem)] left-4 z-[100] max-w-sm md:right-4 md:bottom-4 md:left-auto md:w-80"
    >
      <div className="rounded-lg bg-accent text-accent-foreground shadow-lg">
        <div
          className={`flex items-center justify-between gap-2 px-3 py-2${collapsed ? "" : " border-b border-white/20"}`}
        >
          <div className="min-w-0 flex-1 pb-1">
            <p className="truncate text-[11px] font-semibold text-white/80">
              {t("demo.panelSubtitle")}
            </p>
            <p className="truncate text-sm font-semibold leading-tight">
              {t("format.demoStageHeader", {
                label: getStageLabel(stage, t),
                current: stageIndex + 1,
                total: stageCount,
              })}
            </p>
          </div>
          {collapsed ? (
            <div className="flex shrink-0 items-center gap-0.5">
              <IconButton
                size="small"
                onClick={goToPreviousStage}
                disabled={!canGoPrevious}
                aria-label={t("a11y.previousStage")}
                sx={demoIconButtonSx}
              >
                <ChevronLeftIcon sx={{ fontSize: 18 }} />
              </IconButton>
              <IconButton
                size="small"
                onClick={goToNextStage}
                disabled={!canGoNext}
                aria-label={t("a11y.nextStage")}
                sx={demoIconButtonSx}
              >
                <ChevronRightIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </div>
          ) : null}
          <IconButton
            size="small"
            onClick={() => setCollapsed((value) => !value)}
            aria-label={collapsed ? t("a11y.expandDemoPanel") : t("a11y.collapseDemoPanel")}
            aria-expanded={!collapsed}
            sx={demoCollapseButtonSx}
          >
            {collapsed ? (
              <ExpandLessIcon fontSize="small" />
            ) : (
              <ExpandMoreIcon fontSize="small" />
            )}
          </IconButton>
        </div>

        {!collapsed ? (
          <div className="space-y-3 p-3">
            <FormControl fullWidth size="small" sx={demoSelectSx}>
              <InputLabel id="journey-stage-label">{t("demo.journeyStage")}</InputLabel>
              <Select
                labelId="journey-stage-label"
                id="journey-stage"
                value={stage}
                label={t("demo.journeyStage")}
                onChange={(event) =>
                  setStage(event.target.value as JourneyStageId)
                }
                MenuProps={{
                  slotProps: {
                    paper: { sx: { maxHeight: 280 } },
                  },
                }}
              >
                {JOURNEY_STAGE_IDS.map((stageId) => (
                  <MenuItem key={stageId} value={stageId}>
                    {getStageLabel(stageId, t)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <div className="flex items-center justify-center gap-2">
              <IconButton
                size="small"
                onClick={goToPreviousStage}
                disabled={!canGoPrevious}
                aria-label={t("a11y.previousStage")}
                sx={demoIconButtonSx}
              >
                <ChevronLeftIcon fontSize="small" />
              </IconButton>

              <p className="min-w-[5.5rem] text-center text-xs text-white/90">
                {t("format.demoStageCounter", {
                  current: stageIndex + 1,
                  total: stageCount,
                })}
              </p>

              <IconButton
                size="small"
                onClick={goToNextStage}
                disabled={!canGoNext}
                aria-label={t("a11y.nextStage")}
                sx={demoIconButtonSx}
              >
                <ChevronRightIcon fontSize="small" />
              </IconButton>
            </div>

            <button
              type="button"
              onClick={triggerDisruptionScenario}
              disabled={disruptionActive}
              className="flex w-full items-center justify-center gap-1.5 rounded-md border border-white/30 px-3 py-2 text-xs font-medium text-accent-foreground transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-accent disabled:cursor-default disabled:border-white/15 disabled:text-white/50 disabled:hover:bg-transparent"
            >
              <BoltOutlinedIcon
                sx={{ fontSize: 16, color: disruptionActive ? "rgba(255,255,255,0.5)" : "#ffffff" }}
                aria-hidden="true"
              />
              {disruptionActive
                ? t("demo.disruptionScenarioActive")
                : t("demo.disruptionScenario")}
            </button>

            <button
              type="button"
              onClick={() => setResetDialogOpen(true)}
              className="flex w-full items-center justify-center gap-1.5 rounded-md border border-white/30 px-3 py-2 text-xs font-medium text-accent-foreground transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-accent"
            >
              <RestartAltIcon sx={{ fontSize: 16, color: "#ffffff" }} aria-hidden="true" />
              {t("demo.resetDemo")}
            </button>
          </div>
        ) : null}
      </div>
    </aside>
    </FixedUiRoot>
    <ConfirmDialog
      open={resetDialogOpen}
      title={t("demo.resetConfirmTitle")}
      message={t("demo.resetConfirmMessage")}
      confirmLabel={t("demo.resetDemo")}
      cancelLabel={t("demo.resetCancel")}
      onConfirm={handleResetConfirm}
      onCancel={() => setResetDialogOpen(false)}
    />
    </>
  );
}
