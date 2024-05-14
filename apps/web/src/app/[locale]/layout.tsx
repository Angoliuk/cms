import { Toaster } from "@/ui-shared/components/toaster";
import { ReactNode } from "react";

import { locales } from "../../utils/i18n/i18n";

export const metadata = { title: "Project" };

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: (typeof locales)[number] };
}) {
  return (
    <html lang={locale}>
      <body>
        {children}
        <div className="absolute bottom-10 right-10">
          <Toaster />
        </div>
      </body>
    </html>
  );
}
