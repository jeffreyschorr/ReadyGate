"use client";

import { useState } from "react";

import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CheckboxField, SelectField } from "@/components/ui/FormControls";
import { Input } from "@/components/ui/Input";
import { LoadingState } from "@/components/ui/LoadingState";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Tabs } from "@/components/ui/Tabs";

export function DesignSystemShowcase() {
  const [tab, setTab] = useState("overview");
  const [checkbox, setCheckbox] = useState(true);
  const [selectValue, setSelectValue] = useState("departures");

  return (
    <div className="space-y-10">
      <section aria-labelledby="buttons-heading" className="space-y-4">
        <h2 id="buttons-heading" className="text-lg font-semibold text-heading">
          Buttons
        </h2>
        <div className="flex flex-wrap gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </section>

      <section aria-labelledby="badges-heading" className="space-y-4">
        <h2 id="badges-heading" className="text-lg font-semibold text-heading">
          Status badges
        </h2>
        <div className="flex flex-wrap gap-2">
          <StatusBadge label="Relax" variant="success" />
          <StatusBadge label="Heads up" variant="warning" />
          <StatusBadge label="Action needed" variant="danger" />
          <StatusBadge label="On time" variant="success" />
          <StatusBadge label="Delayed" variant="warning" />
          <StatusBadge label="Cancelled" variant="danger" />
          <StatusBadge label="Boarding" variant="info" />
          <StatusBadge label="Scheduled" variant="neutral" />
        </div>
      </section>

      <section aria-labelledby="alerts-heading" className="space-y-4">
        <h2 id="alerts-heading" className="text-lg font-semibold text-heading">
          Alerts
        </h2>
        <div className="space-y-3">
          <Alert severity="info">Gate information will update here when available.</Alert>
          <Alert severity="success">Check-in is complete.</Alert>
          <Alert severity="warning">Your departure time has changed.</Alert>
          <Alert severity="error">This flight requires attention.</Alert>
        </div>
      </section>

      <section aria-labelledby="cards-heading" className="space-y-4">
        <h2 id="cards-heading" className="text-lg font-semibold text-heading">
          Cards
        </h2>
        <Card>
          <h3 className="text-base font-medium text-heading">Next action</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            One subject per card. Keep copy short.
          </p>
        </Card>
      </section>

      <section aria-labelledby="forms-heading" className="space-y-4">
        <h2 id="forms-heading" className="text-lg font-semibold text-heading">
          Form controls
        </h2>
        <div className="grid max-w-xl gap-4">
          <Input label="Search airport" placeholder="Enter city or airport" />
          <SelectField
            label="View"
            value={selectValue}
            onChange={setSelectValue}
            options={[
              { label: "Departures", value: "departures" },
              { label: "Arrivals", value: "arrivals" },
            ]}
          />
          <CheckboxField
            label="Send gate change alerts"
            checked={checkbox}
            onChange={setCheckbox}
            helperText="Notify me when my gate changes."
          />
        </div>
      </section>

      <section aria-labelledby="tabs-heading" className="space-y-4">
        <h2 id="tabs-heading" className="text-lg font-semibold text-heading">
          Tabs
        </h2>
        <Tabs
          items={[
            { label: "Overview", value: "overview" },
            { label: "Timeline", value: "timeline" },
            { label: "Documents", value: "documents" },
          ]}
          value={tab}
          onChange={setTab}
        />
        <p className="text-sm text-muted">Active tab: {tab}</p>
      </section>

      <section aria-labelledby="states-heading" className="space-y-4">
        <h2 id="states-heading" className="text-lg font-semibold text-heading">
          Loading and empty states
        </h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card padding="none">
            <LoadingState label="Loading travel details" />
          </Card>
          <EmptyState
            title="No upcoming trips"
            description="Your saved trips will appear here."
          />
        </div>
      </section>
    </div>
  );
}
