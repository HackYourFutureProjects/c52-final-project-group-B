import Title from "@/components/Title";
import { ROUTES } from "@/routes/paths.js";
import StylishDiv from "@/components/StylishDiv";

export default function About() {
  return (
    <>
      <div className="flex flex-col justify-center text-center">
        <Title
          breadcrumbs={[
            { label: "Home", path: ROUTES.HOME },
            { label: "About", path: ROUTES.ABOUT },
          ]}
        >
          About Memix
        </Title>
      </div>

      <StylishDiv className="mt-20 flex flex-col text-center">
        <h3 className="text-secondary text-xl font-bold">What is Memix</h3>
        <p>
          Memix is a friendly flashcard app that helps you study the way you
          like: create focused decks, flip cards, and track what sticks — at
          your own pace.
        </p>
      </StylishDiv>

      <StylishDiv className="mt-10 flex flex-col text-center">
        <h3 className="text-secondary text-xl font-bold">How it works</h3>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
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
            <div
              key={item.step}
              className="bg-primary/5 ring-primary/30 rounded-[25px] p-6 ring-1"
            >
              <h4 className="text-primary mb-2 font-bold">
                Step {item.step}: {item.title}
              </h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </StylishDiv>

      <StylishDiv className="mt-10 flex flex-col text-center">
        <h3 className="text-secondary text-xl font-bold">Why choose Memix</h3>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-8">
          {[
            "Learn at your own pace",
            "Clean, distraction‑free design",
            "Works smoothly on any device",
            "Track correct / incorrect locally",
          ].map((benefit) => (
            <div
              key={benefit}
              className="bg-primary/5 ring-primary/30 rounded-[25px] p-6 ring-1"
            >
              <h4 className="text-primary font-bold">{benefit}</h4>
            </div>
          ))}
        </div>
      </StylishDiv>

      <StylishDiv className="mt-10 flex flex-col text-center">
        <h3 className="text-secondary text-xl font-bold">About The Team</h3>
        <p>
          We’re Cohort 52 – Group B at HackYourFuture. Over the past weeks we’ve
          been building Memix together with the support of our mentors. Our goal
          is simple: make studying feel lighter and more consistent. We focused
          on the basics—creating decks, flipping cards, and keeping track of
          what you actually remember—so anyone can learn at their own pace. This
          project is a snapshot of what we learned as a team and the kind of
          product we want to keep improving.
        </p>
      </StylishDiv>
    </>
  );
}
