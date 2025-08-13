import { Card, CardBody, CardHeader } from "@heroui/react";
import Title from "@/components/Title";

export default function About() {
  return (
    <div className="space-y-25">
      <div className="text-center">
        <Title
          breadcrumbs={[
            { label: "Home", path: "/" },
            { label: "About", path: "/about" },
          ]}
        >
          Learn faster. Remember longer.
        </Title>
        <p className="mx-auto mt-2 max-w-xl text-black">
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
              <CardHeader className="font-bold text-black">
                Step {item.step}: {item.title}
              </CardHeader>
              <CardBody className="text-black">{item.desc}</CardBody>
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
              <CardBody className="text-center font-medium text-black">
                {benefit}
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="heading-title mb-4 text-center text-2xl font-bold">
          About Us
        </h2>
        <Card className="bg-default-200 rounded-[25px]">
          <CardBody className="leading-relaxed text-black">
            We are Cohort 52 – Group B from HackYourFuture, a collective of
            passionate learners and aspiring developers united by a shared
            vision. Memix is our final project — born from curiosity,
            dedication, and the belief that learning should be both accessible
            and inspiring. Guided by our mentors and enriched by a supportive
            learning community, we set out to create a tool that empowers people
            to learn faster, retain knowledge longer, and enjoy the process
            along the way. This project is more than code; it is a reflection of
            our commitment to growth, collaboration, and the transformative
            power of education.
          </CardBody>
        </Card>
      </div>

      <div className="bg-default-300 rounded-[25px] p-6 text-center">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <div className="text-3xl font-black">1,500+</div>
            <div className="text-black">Active learners</div>
          </div>
          <div>
            <div className="text-3xl font-black">13,000+</div>
            <div className="text-black">Decks created</div>
          </div>
          <div>
            <div className="text-3xl font-black">57,000+</div>
            <div className="text-black">Cards studied</div>
          </div>
        </div>
      </div>
    </div>
  );
}
