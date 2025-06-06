import ExternalLink from "@/components/ExternalLink";
import { getTranslations, useLocale, useTranslations } from "next-globe-gen";
import { type ReactNode } from "react";

export function generateMetadata() {
  const t = getTranslations("demos");
  return {
    title: t("client.titles.link-component"),
    description: t("descriptions.link-component"),
  };
}

export default function MarkdownLayout({ children }: { children: ReactNode }) {
  const locale = useLocale();
  const t = useTranslations("common");
  return (
    <>
      {children}
      <div className="flex gap-2">
        <ExternalLink href="https://next-globe-gen.dev/docs/api-reference/components#link">
          {t("docs")}
        </ExternalLink>
        <ExternalLink
          href={`https://github.com/Jon1VK/NextGlobeGen/tree/main/examples/playground/src/_app/(demos)/link-component/page.${locale}.mdx`}
        >
          {t("code")}
        </ExternalLink>
      </div>
    </>
  );
}
