"use client";

import type { ComponentType } from "react";
import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";
import ThunderstormOutlinedIcon from "@mui/icons-material/ThunderstormOutlined";
import WbCloudyOutlinedIcon from "@mui/icons-material/WbCloudyOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";

import type { WeatherConditionKind } from "@/types/journey";
import { cn } from "@/lib/utils";

const cloudPath =
  "M12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6m0-2C9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96C18.67 6.59 15.64 4 12 4";

function CloudRainIcon({
  rainPath,
  ...props
}: SvgIconProps & { rainPath: string }) {
  return (
    <SvgIcon {...props}>
      <path d={cloudPath} />
      <path
        d={rainPath}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </SvgIcon>
  );
}

const LightRainIcon = (props: SvgIconProps) => (
  <CloudRainIcon
    {...props}
    rainPath="M7.25 17.25l-1 3.5M11.75 17.25l-1 3.5M16.25 17.25l-1 3.5"
  />
);

const RainIcon = (props: SvgIconProps) => (
  <CloudRainIcon
    {...props}
    rainPath="M6.25 17l-1.25 4M10 17.25l-1.25 4M13.75 17l-1.25 4M17.5 17.25l-1.25 4"
  />
);

const iconMap: Record<WeatherConditionKind, ComponentType<SvgIconProps>> = {
  clear: WbSunnyOutlinedIcon,
  "partly-cloudy": WbCloudyOutlinedIcon,
  cloudy: CloudOutlinedIcon,
  "light-rain": LightRainIcon,
  rain: RainIcon,
  storm: ThunderstormOutlinedIcon,
};

type WeatherConditionIconProps = {
  kind: WeatherConditionKind;
  className?: string;
};

export function WeatherConditionIcon({
  kind,
  className,
}: WeatherConditionIconProps) {
  const Icon = iconMap[kind];

  return (
    <Icon
      className={cn("shrink-0 text-muted", className)}
      sx={{ fontSize: { xs: 96, sm: 112 }, opacity: 0.25 }}
      aria-hidden="true"
      focusable="false"
    />
  );
}
