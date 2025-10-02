import { HostsPage } from "@/components/hosts/HostsPage";
import { HostsGuard } from "@/components/hosts/HostsGuard";
import {
  readDatasetParam,
  resolveDatasetSelection,
} from "@/server/datasetResolver";

interface HostsOverviewPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function HostsOverviewPage(
  props: HostsOverviewPageProps,
) {
  const searchParams = (await props.searchParams) ?? {};
  const datasetParam = readDatasetParam(searchParams.dataset);
  const resolved = await resolveDatasetSelection(datasetParam);

  return (
    <HostsGuard>
      <HostsPage
        hosts={resolved.hosts}
        datasetId={resolved.datasetId}
        datasetSource={resolved.source}
        datasetLabel={resolved.label}
        datasetNotice={resolved.notice}
      />
    </HostsGuard>
  );
}
