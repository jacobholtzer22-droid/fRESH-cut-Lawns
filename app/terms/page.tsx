import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site } from "@/site.config";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("terms");

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      updated="June 2026"
      intro={`These terms cover your use of the ${site.business.name} website. By using the site, you agree to them.`}
      sections={[
        {
          heading: "About this site",
          body: [
            "This website provides information about our lawn care, landscaping, and seasonal services and a way to request a quote. Content is provided for general information and may change without notice.",
          ],
        },
        {
          heading: "Quotes & estimates",
          body: [
            "Submitting the contact form is a request, not a contract. Pricing, scheduling, and scope are confirmed directly with you before any work begins. Photos shown are examples of past work and are not a guarantee of any specific result.",
          ],
        },
        {
          heading: "Text messaging",
          body: [
            "If you opt in on our form, you consent to receive text messages about your request. Message and data rates may apply. Reply STOP to opt out at any time.",
          ],
        },
        {
          heading: "Contact us",
          body: [
            `Questions about these terms? Call or text us at ${site.business.phoneDisplay}.`,
          ],
        },
      ]}
    />
  );
}
