import React from "react";

type Props = {};
import WhatsappLogo from "@/public/whatsapp.svg";
import Image from "next/image";
import Link from "next/link";
import { useMetaData } from "@/data/public";
export default function WhatsAppOverlay({}: Props) {
  const { data, isLoading, isError } = useMetaData();

  if (isLoading) return <></>;
  if (!data) return <></>;
  const phoneNumber = data.find((item) => item.id === "phone_number")?.value;
  return (
    <section className="fixed bottom-5 right-5 z-10">
      <figure className="size-10 lg:size-15 aspect-square">
        <Link
          href={`https://api.whatsapp.com/send?phone=${phoneNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="z-50"
        >
          <Image
            src="/whatsapp.svg"
            alt="WhatsApp Logo"
            width={1000}
            height={1000}
            className="object-fit z-50 "
          />
        </Link>
      </figure>
    </section>
  );
}
