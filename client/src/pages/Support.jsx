import { useState } from "react";
import { sendContactUsForm } from "@/api/generalAPI";
import {
  FaEnvelope,
  FaSquareFacebook,
  FaSquareXTwitter,
  FaSquareInstagram,
} from "react-icons/fa6";
import { AiFillTikTok } from "react-icons/ai";
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
        <div className="bg-default-300 flex w-full flex-col items-center rounded-[35px] p-8 text-center">
          <h2 className="text-xl font-bold">Reach us</h2>
          <p className="mt-1 max-w-3xl">
            If you need assistance, please reach out to our support team through
            one of the following channels.
          </p>
          <div className="mt-8 flex w-full flex-col flex-wrap gap-4 md:flex-row md:items-start md:justify-center">
            <Card isPressable shadow="sm" className="rounded-[35px] px-4">
              <CardBody className="flex flex-row flex-nowrap items-center gap-4">
                <FaEnvelope size={42} />
                <div className="flex flex-col">
                  <p className="text-md">Email</p>
                  <p className="text-small text-primary">Memix.HYF@gmail.com</p>
                </div>
              </CardBody>
            </Card>
            <Card isPressable shadow="sm" className="rounded-[35px] px-4">
              <CardBody className="flex flex-row flex-nowrap items-center gap-4">
                <FaSquareFacebook size={42} />
                <div className="flex flex-col">
                  <p className="text-md">Facebook</p>
                  <p className="text-small text-primary">@Memix.HYF</p>
                </div>
              </CardBody>
            </Card>

            <Card isPressable shadow="sm" className="rounded-[35px] px-4">
              <CardBody className="flex flex-row flex-nowrap items-center gap-4">
                <FaSquareXTwitter size={42} />
                <div className="flex flex-col">
                  <p className="text-md">Twitter / X</p>
                  <p className="text-small text-primary">@Memix.HYF</p>
                </div>
              </CardBody>
            </Card>

            <Card isPressable shadow="sm" className="rounded-[35px] px-4">
              <CardBody className="flex flex-row flex-nowrap items-center gap-4">
                <FaSquareInstagram size={42} />
                <div className="flex flex-col">
                  <p className="text-md">Instagram</p>
                  <p className="text-small text-primary">@Memix.HYF</p>
                </div>
              </CardBody>
            </Card>

            <Card isPressable shadow="sm" className="rounded-[35px] px-4">
              <CardBody className="flex flex-row flex-nowrap items-center gap-4">
                <AiFillTikTok size={42} />
                <div className="flex flex-col">
                  <p className="text-md">TikTok</p>
                  <p className="text-small text-primary">@Memix.HYF</p>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>

        <div className="mt-20 flex w-full flex-col items-center justify-center text-center">
          {submitted ? (
            <div key="success" className="">
              <Alert
                color="success"
                title="Your message has been sent successfully!"
              />
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold">Contact Us</h2>
              <p className="mt-1 max-w-3xl">
                If you have any questions or need further assistance, please
                fill out the form below and our support team will get back to
                you as soon as possible.
              </p>
              <div className="mt-4 w-full max-w-2xl">
                <Form
                  onSubmit={handleSubmit}
                  className="flex flex-col items-center gap-4"
                >
                  <Input
                    color="primary"
                    variant="faded"
                    radius="full"
                    label="Name"
                    name="name"
                    placeholder="Enter your name"
                    type="text"
                  />
                  <Input
                    isRequired
                    color="primary"
                    variant="faded"
                    radius="full"
                    label="Email"
                    name="email"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Input
                    isRequired
                    color="primary"
                    variant="faded"
                    radius="full"
                    label="Subject"
                    name="subject"
                    placeholder="Enter the subject"
                    type="text"
                  />
                  <Textarea
                    isRequired
                    color="primary"
                    variant="faded"
                    label="Message"
                    name="message"
                    placeholder="Enter your message"
                    classNames={{ inputWrapper: "rounded-[35px] px-5 py-2" }}
                  />
                  <Button color="primary" type="submit">
                    Send Message
                  </Button>
                </Form>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Support;
