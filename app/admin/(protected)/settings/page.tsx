"use client";
import LoadingOverlay from "@/components/ui/loading-overlay";
import { useGetSettings } from "@/data/admin";
import { authenticatedFetcher, fetcher } from "@/lib/fetcher";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SettingsForm from "./_component/SettingsForm";

type Props = {};

export default function Settings({}: Props) {
  const { data, isLoading, isError } = useGetSettings();

  if (isLoading) return <LoadingOverlay isLoading />;
  if (isError) return <div>Error</div>;
  return <SettingsForm data={data!} />;
}
