import { notFound } from "next/navigation";

import { HostDetails } from "@/components/hosts/HostDetails";
import { loadNormalizedHosts } from "@/server/loader";

interface HostPageProps {
  params: Promise<{
    ip: string;
  }>;
}

export default async function HostDetailsPage(props: HostPageProps) {
  const { ip: rawIp } = await props.params;
  const ip = decodeURIComponent(rawIp);
  const hosts = await loadNormalizedHosts();
  const host = hosts.find((entry) => entry.ip === ip);

  if (!host) {
    notFound();
  }

  return <HostDetails host={host} />;
}
