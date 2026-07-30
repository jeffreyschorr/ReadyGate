"use client";

import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { useEffect, useMemo, useState } from "react";

import { StageViewShell } from "@/components/layout/StageViewShell";
import { FlightTimelineStrip } from "@/components/flight/FlightTimelineStrip";
import { StageStaggerItem } from "@/components/motion/StageTransition";
import { UpdateCard } from "@/components/updates/UpdateCard";
import { UpdateFilters } from "@/components/updates/UpdateFilters";
import { UpdatesPageHeader } from "@/components/updates/UpdatesPageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { SurfacePanel } from "@/components/ui/SurfacePanel";
import { CardSkeleton, HeroSkeleton } from "@/components/ui/Skeleton";
import {
  filterUpdates,
  getUpdatesPageContent,
} from "@/data/updatesPageContent";
import { getFlightTimelineSteps } from "@/data/flightPageContent";
import { useEffectiveJourneyDisplay } from "@/hooks/useEffectiveJourneyDisplay";
import { useJourneyDemo } from "@/hooks/useJourneyDemo";
import { useTravellerPreferences } from "@/hooks/useTravellerPreferences";
import type { UpdateFilterId } from "@/types/journey";

export function UpdatesView() {
  const { stage, disruptionActive, acknowledgeDisruptionUpdates } = useJourneyDemo();
  const { formatters, t } = useTravellerPreferences();
  const effectiveDisplay = useEffectiveJourneyDisplay();
  const pageContent = getUpdatesPageContent(stage, effectiveDisplay, t, {
    disruptionActive,
    formatTime: formatters.formatTime,
  });
  const timelineSteps = getFlightTimelineSteps(stage, effectiveDisplay, t);
  const [activeFilter, setActiveFilter] = useState<UpdateFilterId>("all");

  useEffect(() => {
    setActiveFilter("all");
  }, [stage]);

  useEffect(() => {
    acknowledgeDisruptionUpdates();
  }, [acknowledgeDisruptionUpdates]);

  const filteredUpdates = useMemo(
    () => filterUpdates(pageContent.updates, activeFilter),
    [pageContent.updates, activeFilter],
  );

  const showEmpty =
    pageContent.showEmptyState ||
    (pageContent.updates.length === 0 && activeFilter === "all");

  const showFilterEmpty =
    !showEmpty && filteredUpdates.length === 0 && activeFilter !== "all";

  return (
    <StageViewShell
      stage={stage}
      loadingFallback={
        <>
          <HeroSkeleton />
          <CardSkeleton />
        </>
      }
    >
      <StageStaggerItem>
        <UpdatesPageHeader />
      </StageStaggerItem>

      <StageStaggerItem>
        <FlightTimelineStrip steps={timelineSteps} prominent />
      </StageStaggerItem>

      {!showEmpty ? (
        <StageStaggerItem>
          <UpdateFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        </StageStaggerItem>
      ) : null}

      {showEmpty ? (
        <StageStaggerItem>
          <EmptyState
            prominent
            title={t("updates.emptyTitle")}
            description={t("updates.emptyDescription")}
            icon={
              <CheckCircleOutlinedIcon sx={{ fontSize: 56 }} className="text-success" />
            }
          />
        </StageStaggerItem>
      ) : null}

      {!showEmpty && !showFilterEmpty ? (
        <StageStaggerItem>
          <section aria-label={t("a11y.recentUpdates")}>
            <SurfacePanel className="px-5 py-0 md:px-6">
              {filteredUpdates.map((update) => (
                <UpdateCard key={update.id} update={update} />
              ))}
            </SurfacePanel>
          </section>
        </StageStaggerItem>
      ) : null}

      {showFilterEmpty ? (
        <StageStaggerItem>
          <EmptyState title={t("updates.filterEmptyTitle")} description={t("updates.filterEmptyDescription")} />
        </StageStaggerItem>
      ) : null}
    </StageViewShell>
  );
}
