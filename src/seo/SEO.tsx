import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { SITE } from "@utils/constants";

interface SEOProps {
  title?: string;
  description?: string;
  pathname?: string;
  image?: string;
  article?: boolean;
  children?: React.ReactNode;
}

interface SiteMeta {
  site: {
    siteMetadata: {
      title: string;
      titleTemplate: string;
      description: string;
      siteUrl: string;
      image: string;
      lang: string;
      locale: string;
      twitterUsername: string;
      author: string;
      keywords: string[];
    };
  };
}

/**
 * Componente SEO pensado para la Head API de Gatsby.
 * Úsalo dentro del export `Head` de cada página:
 *   export const Head = () => <SEO title="..." />
 */
export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  pathname = "",
  image,
  article = false,
  children,
}) => {
  const { site } = useStaticQuery<SiteMeta>(graphql`
    query SEOQuery {
      site {
        siteMetadata {
          title
          titleTemplate
          description
          siteUrl
          image
          lang
          locale
          twitterUsername
          author
          keywords
        }
      }
    }
  `);

  const meta = site.siteMetadata;
  const fullTitle = title
    ? meta.titleTemplate.replace("%s", title)
    : meta.title;
  const seo = {
    title: fullTitle,
    description: description || meta.description,
    image: `${meta.siteUrl}${image || meta.image}`,
    url: `${meta.siteUrl}${pathname}`,
  };

  // Structured Data JSON-LD (Organization + WebSite) usando datos reales de SITE
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${meta.siteUrl}/#organization`,
        name: meta.title,
        url: meta.siteUrl,
        logo: `${meta.siteUrl}/icons/icon-512x512.png`,
        image: seo.image,
        description: meta.description,
        telephone: SITE.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: SITE.address,
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          telephone: SITE.phone,
          availableLanguage: ["es"],
        },
        sameAs: Object.values(SITE.social),
      },
      {
        "@type": "WebSite",
        "@id": `${meta.siteUrl}/#website`,
        url: meta.siteUrl,
        name: meta.title,
        description: meta.description,
        inLanguage: meta.lang,
        publisher: { "@id": `${meta.siteUrl}/#organization` },
      },
    ],
  };

  return (
    <>
      <html lang={meta.lang} />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={meta.keywords.join(", ")} />
      <meta name="author" content={meta.author} />
      <meta name="image" content={seo.image} />
      <link rel="canonical" href={seo.url} />
      <meta name="theme-color" content="#00AEEF" />

      {/* Open Graph */}
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:locale" content={meta.locale} />
      <meta property="og:site_name" content={meta.title} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:creator" content={meta.twitterUsername} />

      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      {children}
    </>
  );
};

export default SEO;
