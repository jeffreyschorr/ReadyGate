import { demoConfig } from "@/config/demo";
import { cn } from "@/lib/utils";

/** Extra scroll room so long settings pages clear the demo controller and mobile nav. */
export function settingsPageSectionClassName(className?: string) {
  return cn(
    className,
    demoConfig.showPanel &&
      "pb-[calc(8rem+env(safe-area-inset-bottom,0px))] md:pb-52",
  );
}
