import {
  FaEnvelope,
  FaSquareFacebook,
  FaSquareXTwitter,
  FaSquareInstagram,
} from "react-icons/fa6";
import { AiFillTikTok } from "react-icons/ai";
import { Card, CardBody } from "@heroui/react";
import Title from "@/components/Title";

const Support = () => {
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
          <p className="max-w-3xl">
            If you need assistance, please reach out to our support team through
            one of the following channels.
          </p>
          <div className="mt-8 flex w-full flex-col gap-4 lg:flex-row lg:items-start lg:justify-center">
            <Card isPressable shadow="sm">
              <CardBody className="flex flex-row flex-nowrap items-center gap-4">
                <FaEnvelope size={42} />
                <div className="flex flex-col">
                  <p className="text-md">Email</p>
                  <p className="text-small text-primary">Memix.HYF@gmail.com</p>
                </div>
              </CardBody>
            </Card>
            <Card isPressable shadow="sm">
              <CardBody className="flex flex-row flex-nowrap items-center gap-4">
                <FaSquareFacebook size={42} />
                <div className="flex flex-col">
                  <p className="text-md">Facebook</p>
                  <p className="text-small text-primary">@Memix.HYF</p>
                </div>
              </CardBody>
            </Card>

            <Card isPressable shadow="sm">
              <CardBody className="flex flex-row flex-nowrap items-center gap-4">
                <FaSquareXTwitter size={42} />
                <div className="flex flex-col">
                  <p className="text-md">Twitter / X</p>
                  <p className="text-small text-primary">@Memix.HYF</p>
                </div>
              </CardBody>
            </Card>

            <Card isPressable shadow="sm">
              <CardBody className="flex flex-row flex-nowrap items-center gap-4">
                <FaSquareInstagram size={42} />
                <div className="flex flex-col">
                  <p className="text-md">Instagram</p>
                  <p className="text-small text-primary">@Memix.HYF</p>
                </div>
              </CardBody>
            </Card>

            <Card isPressable shadow="sm">
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
          <h2 className="text-xl font-bold">Contact Us</h2>
          <p className="max-w-3xl">
            If you have any questions or need further assistance, please fill
            out the form below and our support team will get back to you as soon
            as possible.
          </p>
        </div>
      </div>
    </>
  );
};

export default Support;
