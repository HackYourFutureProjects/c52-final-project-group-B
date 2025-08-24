import { useState } from "react";
import { sendContactUsForm } from "@/api/generalAPI";
import {
  PiEnvelopeSimple,
  PiFacebookLogo,
  PiInstagramLogo,
  PiXLogo,
  PiTiktokLogo,
} from "react-icons/pi";
import {
  addToast,
  Card,
  CardBody,
  Alert,
  Form,
  Input,
  Textarea,
  Button,
} from "@heroui/react";
import Title from "@/components/Title";
import StylishDiv from "@/components/StylishDiv";

const Support = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      await sendContactUsForm({
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      });

      setSubmitted(true);
    } catch (error) {
      addToast({
        title: "Error",
        description: error.message || "Failed to send message",
        color: "danger",
        radius: "full",
      });
      setSubmitted(false);
    }
  };
  return (
    <>
      <div className="flex flex-col justify-center text-center">
        <Title
          breadcrumbs={[
            { label: "Home", path: "/" },
            { label: `Support`, path: `/support` },
          ]}
        >
          Support
        </Title>
      </div>

      <div className="mt-20 flex flex-col items-center">
        <StylishDiv className="flex w-full flex-col items-center text-center">
          <h2 className="text-secondary text-xl font-bold">Reach us</h2>
          <p>
            If you need assistance, please reach out to our support team through
            one of the following channels.
          </p>
          <div className="mt-4 flex w-full flex-col flex-wrap gap-4 md:flex-row md:items-start md:justify-center">
            <Card
              isPressable
              className="bg-primary/5 rounded-[35px] px-2 md:px-4"
            >
              <CardBody className="flex flex-row flex-nowrap items-center gap-4">
                <PiEnvelopeSimple fill="hsl(var(--heroui-primary))" size={42} />
                <div className="flex flex-col">
                  <p className="text-md font-bold">Email</p>
                  <p className="text-small">Memix.HYF@gmail.com</p>
                </div>
              </CardBody>
            </Card>
            <Card
              isPressable
              className="bg-primary/5 rounded-[35px] px-2 md:px-4"
            >
              <CardBody className="flex flex-row flex-nowrap items-center gap-4">
                <PiFacebookLogo fill="hsl(var(--heroui-primary))" size={42} />
                <div className="flex flex-col">
                  <p className="text-md font-bold">Facebook</p>
                  <p className="text-small">@Memix.HYF</p>
                </div>
              </CardBody>
            </Card>

            <Card
              isPressable
              className="bg-primary/5 rounded-[35px] px-2 md:px-4"
            >
              <CardBody className="flex flex-row flex-nowrap items-center gap-4">
                <PiXLogo fill="hsl(var(--heroui-primary))" size={42} />
                <div className="flex flex-col">
                  <p className="text-md font-bold">Twitter / X</p>
                  <p className="text-small">@Memix.HYF</p>
                </div>
              </CardBody>
            </Card>

            <Card
              isPressable
              className="bg-primary/5 rounded-[35px] px-2 md:px-4"
            >
              <CardBody className="flex flex-row flex-nowrap items-center gap-4">
                <PiInstagramLogo fill="hsl(var(--heroui-primary))" size={42} />
                <div className="flex flex-col">
                  <p className="text-md font-bold">Instagram</p>
                  <p className="text-small">@Memix.HYF</p>
                </div>
              </CardBody>
            </Card>

            <Card
              isPressable
              className="bg-primary/5 rounded-[35px] px-2 md:px-4"
            >
              <CardBody className="flex flex-row flex-nowrap items-center gap-4">
                <PiTiktokLogo fill="hsl(var(--heroui-primary))" size={42} />
                <div className="flex flex-col">
                  <p className="text-md font-bold">TikTok</p>
                  <p className="text-small">@Memix.HYF</p>
                </div>
              </CardBody>
            </Card>
          </div>
        </StylishDiv>

        <StylishDiv className="mt-10 flex w-full flex-col items-center justify-center text-center">
          {submitted ? (
            <div key="success">
              <Alert
                color="success"
                title="Your message has been sent successfully!"
              />
            </div>
          ) : (
            <>
              <h2 className="text-secondary text-xl font-bold">Contact Us</h2>
              <p className="max-w-3xl">
                If you have any questions or need further assistance, please
                fill out the form below and our support team will get back to
                you as soon as possible.
              </p>
              <div className="mt-4 w-full max-w-4xl">
                <Form
                  onSubmit={handleSubmit}
                  className="flex flex-col items-center gap-4"
                >
                  <Input
                    color="secondary"
                    variant="faded"
                    radius="full"
                    label="Name"
                    name="name"
                    placeholder="Enter your name"
                    type="text"
                    className="items-center md:items-start"
                    classNames={{
                      inputWrapper: "px-5 items-center md:items-start",
                      input: "text-center md:text-left",
                    }}
                  />
                  <Input
                    isRequired
                    color="secondary"
                    variant="faded"
                    radius="full"
                    label="Email"
                    name="email"
                    placeholder="Enter your email"
                    type="email"
                    className="items-center md:items-start"
                    classNames={{
                      inputWrapper: "px-5 items-center md:items-start",
                      input: "text-center md:text-left",
                    }}
                  />
                  <Input
                    isRequired
                    color="secondary"
                    variant="faded"
                    radius="full"
                    label="Subject"
                    name="subject"
                    placeholder="Enter the subject"
                    type="text"
                    className="items-center md:items-start"
                    classNames={{
                      inputWrapper: "px-5 items-center md:items-start",
                      input: "text-center md:text-left",
                    }}
                  />
                  <Textarea
                    isRequired
                    color="secondary"
                    variant="faded"
                    label="Message"
                    name="message"
                    placeholder="Enter your message"
                    className="items-center md:items-start"
                    classNames={{
                      inputWrapper:
                        "px-5 rounded-[25px] items-center md:items-start",
                      input: "text-center md:text-left",
                    }}
                  />
                  <Button color="primary" radius="full" size="lg" type="submit">
                    Send Message
                  </Button>
                </Form>
              </div>
            </>
          )}
        </StylishDiv>
      </div>
    </>
  );
};

export default Support;
