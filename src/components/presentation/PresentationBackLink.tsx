"use client";

import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { useTranslation } from "@/i18n/useTranslation";

export function PresentationBackLink() {
  const { t } = useTranslation();

  return (
    <div className="pb-6">
      <Button component={Link} href="/" className="w-fit">
        ← {t("presentation.backHome")}
      </Button>
    </div>
  );
}
