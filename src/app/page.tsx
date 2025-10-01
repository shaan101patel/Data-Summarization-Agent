import { HostsPage } from "@/components/hosts/HostsPage";
import { loadNormalizedHosts } from "@/server/loader";

export default async function Home() {
  const hosts = await loadNormalizedHosts();
  return <HostsPage hosts={hosts} />;
}
