import "./styles/globals.css";
import { ReactQueryProvider } from "./providers/ReactQueryProvieder";
import { useLocale } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Avalanche",
  description: "E-commerce site",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = useLocale();

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ReactQueryProvider>
        <html lang={locale}>
          <body>{children}</body>
        </html>
      </ReactQueryProvider>
    </NextIntlClientProvider>
  );
}
