// client/src/pages/Legal/Terms.jsx
import { Link, Card } from "@heroui/react";

const Terms = () => {
  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-10">
      <header className="space-y-2 text-center">
        <h1 className="text-3xl font-extrabold">Terms of Use</h1>
        <p className="text-foreground-500">Last updated: August 13, 2025</p>
      </header>

      <Card className="space-y-6 p-6 text-sm leading-6">
        <section id="acceptance" className="space-y-2">
          <h2 className="text-xl font-bold">1. Acceptance of Terms</h2>
          <p>
            Welcome to <strong>Memix</strong> (the “Service”). By accessing or
            using the Service, you agree to be bound by these Terms of Use
            (“Terms”). If you do not agree to the Terms, do not use the Service.
          </p>
        </section>

        <section id="about" className="space-y-2">
          <h2 className="text-xl font-bold">2. The Service</h2>
          <p>
            Memix is a web application where users can create, browse, and study
            flashcard decks. Features may include deck creation, editing,
            sharing, and reviewing with spaced repetition or similar learning
            flows. We may add, change, or remove features at any time.
          </p>
        </section>

        <section id="eligibility" className="space-y-2">
          <h2 className="text-xl font-bold">3. Eligibility</h2>
          <p>
            You must be at least 13 years old (or older where required by your
            local law) to use the Service. If you are under the age of majority,
            you must have your parent or legal guardian’s permission.
          </p>
        </section>

        <section id="account" className="space-y-2">
          <h2 className="text-xl font-bold">4. Accounts & Security</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>You are responsible for the accuracy of your account info.</li>
            <li>
              Keep your credentials secure; you are responsible for all activity
              under your account.
            </li>
            <li>
              We may suspend or terminate accounts that violate these Terms.
            </li>
          </ul>
        </section>

        <section id="user-content" className="space-y-2">
          <h2 className="text-xl font-bold">5. User Content</h2>
          <p>
            You own the content you create (e.g., deck titles, descriptions,
            cards, images) and grant Memix a worldwide, non-exclusive,
            royalty-free license to host, store, display, and share your content
            solely for operating and improving the Service. You are responsible
            for ensuring you have all rights necessary to upload the content.
          </p>
          <p className="text-foreground-500">
            Do not upload content that is illegal, infringing, hateful,
            harassing, or otherwise violates applicable law or the rights of
            others.
          </p>
        </section>

        <section id="prohibited" className="space-y-2">
          <h2 className="text-xl font-bold">6. Prohibited Uses</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>Reverse engineering or scraping the Service.</li>
            <li>
              Uploading malware or attempting to gain unauthorized access.
            </li>
            <li>
              Posting unlawful content or content that violates others’ IP or
              privacy rights.
            </li>
            <li>Misrepresenting your identity or affiliation.</li>
            <li>Interfering with the Service’s availability or performance.</li>
          </ul>
        </section>

        <section id="ip" className="space-y-2">
          <h2 className="text-xl font-bold">7. Intellectual Property</h2>
          <p>
            The Service, including its logo, UI, and code, contains material
            owned by or licensed to us. Except for the limited rights granted in
            these Terms, we reserve all rights to the Service and its content.
          </p>
        </section>

        <section id="third-parties" className="space-y-2">
          <h2 className="text-xl font-bold">8. Third-Party Links & Social</h2>
          <p>
            The Service may contain links to third-party websites (e.g., social
            media). We do not control and are not responsible for their content
            or policies. Your use of third-party sites is at your own risk and
            subject to their terms.
          </p>
        </section>

        <section id="privacy" className="space-y-2">
          <h2 className="text-xl font-bold">9. Privacy</h2>
          <p>
            For information on how we collect and process personal data, see our{" "}
            <Link href="/privacy" underline="hover" color="foreground">
              Privacy&nbsp;Policy
            </Link>
            . By using the Service, you consent to those practices.
          </p>
        </section>

        <section id="changes" className="space-y-2">
          <h2 className="text-xl font-bold">
            10. Changes to the Service or Terms
          </h2>
          <p>
            We may update the Service or these Terms from time to time. If
            changes are material, we will take reasonable steps to notify you
            (e.g., by posting an updated date or a notice in-app). Your
            continued use of the Service after changes become effective
            constitutes acceptance of the new Terms.
          </p>
        </section>

        <section id="disclaimer" className="space-y-2">
          <h2 className="text-xl font-bold">11. Disclaimers</h2>
          <p>
            The Service is provided “as is” and “as available” without
            warranties of any kind, whether express or implied, including
            without limitation warranties of merchantability, fitness for a
            particular purpose, and non-infringement. We do not guarantee that
            the Service will be uninterrupted, secure, or error-free, or that
            any defects will be corrected.
          </p>
        </section>

        <section id="liability" className="space-y-2">
          <h2 className="text-xl font-bold">12. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Memix and its contributors
            will not be liable for any indirect, incidental, special,
            consequential, or punitive damages, or any loss of data, profits, or
            revenues, arising out of or related to your use of the Service.
          </p>
        </section>

        <section id="termination" className="space-y-2">
          <h2 className="text-xl font-bold">13. Suspension & Termination</h2>
          <p>
            We may suspend or terminate your access to the Service at any time
            if you violate these Terms or if we reasonably believe your use
            risks harm to the Service or other users. You may stop using the
            Service at any time.
          </p>
        </section>

        <section id="governing-law" className="space-y-2">
          <h2 className="text-xl font-bold">14. Governing Law</h2>
          <p>
            These Terms are governed by the laws of the Netherlands. If any
            dispute arises, the courts of Amsterdam will have exclusive
            jurisdiction, unless mandatory law provides otherwise.
          </p>
        </section>

        <section id="contact" className="space-y-2">
          <h2 className="text-xl font-bold">15. Contact</h2>
          <p>
            Questions about these Terms? Reach us via the{" "}
            <Link href="/support" underline="hover" color="foreground">
              Support
            </Link>{" "}
            page or by opening an issue on our GitHub repository.
          </p>
        </section>

        <section id="misc" className="space-y-2">
          <h2 className="text-xl font-bold">16. Miscellaneous</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              If any provision is found unenforceable, the remaining provisions
              remain in full force and effect.
            </li>
            <li>
              These Terms constitute the entire agreement between you and us
              regarding the Service.
            </li>
          </ul>
          <p className="text-foreground-500">
            <em>
              This document is a general template provided for educational
              purposes and is not legal advice.
            </em>
          </p>
        </section>
      </Card>
    </div>
  );
};

export default Terms;
