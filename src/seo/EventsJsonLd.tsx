import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { EVENTS } from "@utils/constants";

/**
 * Datos estructurados schema.org/Event para los retiros.
 * Solo emite eventos que tengan una fecha ISO válida en `startDate`
 * (Google exige startDate en formato ISO 8601). Mientras los eventos
 * solo tengan texto en `date`, no se emite nada inválido.
 */
export const EventsJsonLd: React.FC = () => {
  const { site } = useStaticQuery<{
    site: { siteMetadata: { siteUrl: string; title: string } };
  }>(graphql`
    query EventsJsonLdQuery {
      site {
        siteMetadata {
          siteUrl
          title
        }
      }
    }
  `);

  const { siteUrl, title } = site.siteMetadata;

  const items = EVENTS.filter((e) => e.startDate).map((e) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: e.name,
    startDate: e.startDate,
    ...(e.endDate ? { endDate: e.endDate } : {}),
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    description: e.description,
    ...(e.imageUrl ? { image: e.imageUrl } : {}),
    location: {
      "@type": "Place",
      name: e.location,
      address: e.location,
    },
    organizer: {
      "@type": "Organization",
      name: title,
      url: siteUrl,
    },
  }));

  if (items.length === 0) return null;

  return (
    <script type="application/ld+json">{JSON.stringify(items)}</script>
  );
};

export default EventsJsonLd;
