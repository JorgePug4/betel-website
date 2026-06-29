import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Layout from "@layouts/Layout";
import SEO from "@seo/SEO";
import EventsJsonLd from "@seo/EventsJsonLd";
import Hero from "@sections/Hero";
import About from "@sections/About";
import Identity from "@sections/Identity";
import BibleBase from "@sections/BibleBase";
import Mission from "@sections/Mission";
import Vision from "@sections/Vision";
import Gallery from "@sections/Gallery";
import Events from "@sections/Events";
import Contact from "@sections/Contact";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <Hero />
      <About />
      <Identity />
      <BibleBase />
      <Mission />
      <Vision />
      <Gallery />
      <Events />
      <Contact />
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <SEO />
    <EventsJsonLd />
  </>
);
