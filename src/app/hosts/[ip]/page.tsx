import { notFound } from "next/navigation";

import { HostDetails } from "@/components/hosts/HostDetails";
import {
  readDatasetParam,
  resolveDatasetSelection,
} from "@/server/datasetResolver";

interface HostPageProps {
  params: Promise<{
    ip: string;
  }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function HostDetailsPage(props: HostPageProps) {
  const { ip: rawIp } = await props.params;
  const ip = decodeURIComponent(rawIp);
  const searchParams = (await props.searchParams) ?? {};
  const datasetParam = readDatasetParam(searchParams.dataset);
  const resolved = await resolveDatasetSelection(datasetParam);
  const host = resolved.hosts.find((entry) => entry.ip === ip);

  if (!host) {
    notFound();
  }

  return (
    <HostDetails
      host={host}
      datasetId={resolved.datasetId}
      datasetLabel={resolved.label}
      datasetSource={resolved.source}
      datasetNotice={resolved.notice}
    />
  );
}
