import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site } from "@/site.config";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("privacy");

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      updated="June 2026"
      intro={`This policy explains how ${site.business.name} ("we," "us") handles the information you share with us through this website.`}
      sections={[
        {
          heading: "Information we collect",
          body: [
            "When you submit our contact form, we collect the details you provide, your name, phone number, optional email, and your message, along with your consent to be contacted by text.",
            "We do not sell your information, and we do not collect more than we need to respond to your request.",
          ],
        },
        {
          heading: "How we use it",
          body: [
            "We use your information solely to respond to your inquiry, prepare a quote, and follow up about the services you asked about. If you opt in, we may text you about your request; you can reply STOP at any time to opt out.",
          ],
        },
        {
          heading: "How it's handled",
          body: [
            "Form submissions are sent to our customer-management system so we can follow up. We take reasonable steps to keep your information secure and share it only with the tools we use to run the business.",
          ],
        },
        {
          heading: "Contact us",
          body: [
            `Questions about this policy? Call or text us at ${site.business.phoneDisplay}.`,
          ],
        },
      ]}
    />
  );
}
