import { Card, CardBody, CardHeader } from "@heroui/react";
import Title from "@/components/Title";
import { ROUTES } from "@/routes/paths.js";

export default function About() {
  return (
    <div className="space-y-25">
      <div className="text-center">
        <Title
          breadcrumbs={[
            { label: "Home", path: ROUTES.HOME },
            { label: "About", path: ROUTES.ABOUT },
          ]}
        >
          About Memix
        </Title>
        <p className="mx-auto mt-2 max-w-xl">
          Memix is a friendly flashcard app that helps you study the way you
          like: create focused decks, flip cards, and track what sticks — at
          your own pace.
        </p>
      </div>

      <div>
        <h2 className="heading-title mb-4 text-center text-2xl font-bold">
          How it works
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              step: "1",
              title: "Create or choose a deck",
              desc: "Start fresh by creating your own deck, or browse and use a deck shared by another user.",
            },
            {
              step: "2",
              title: "Add your cards",
              desc: "Write simple question–answer pairs. Keep it short and focused for faster recall.",
            },
            {
              step: "3",
              title: "Study with card mode",
              desc: "Flip cards, mark correct or incorrect, and let Memix remember your local progress.",
            },
          ].map((item) => (
            <Card
              key={item.step}
              className="bg-default-200 h-full rounded-[25px]"
            >
              <CardHeader className="font-bold">
                Step {item.step}: {item.title}
              </CardHeader>
              <CardBody>{item.desc}</CardBody>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="heading-title mb-4 text-center text-2xl font-bold">
          Why choose Memix?
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            "Learn at your own pace",
            "Clean, distraction‑free design",
            "Works smoothly on any device",
            "Track correct / incorrect locally",
          ].map((benefit) => (
            <Card
              key={benefit}
              className="bg-default-200 flex h-full items-center justify-center rounded-[25px]"
            >
              <CardBody className="text-center font-medium">{benefit}</CardBody>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="heading-title mb-4 text-center text-2xl font-bold">
          About Us
        </h2>
        <Card className="bg-default-200 rounded-[25px]">
          <CardBody className="leading-relaxed">
            We’re Cohort 52 – Group B at HackYourFuture. Over the past weeks
            we’ve been building Memix together with the support of our mentors.
            Our goal is simple: make studying feel lighter and more consistent.
            We focused on the basics—creating decks, flipping cards, and keeping
            track of what you actually remember—so anyone can learn at their own
            pace. This project is a snapshot of what we learned as a team and
            the kind of product we want to keep improving.
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
