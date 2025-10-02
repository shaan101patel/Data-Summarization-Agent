"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { NoDatasetModal } from "../layout/NoDatasetModal";

interface HostsGuardProps {
  children: React.ReactNode;
}

export function HostsGuard({ children }: HostsGuardProps) {
  const searchParams = useSearchParams();
  const [showModal, setShowModal] = useState(false);
  
  const datasetParam = searchParams.get("dataset");
  const hasNoDataset = !datasetParam;

  useEffect(() => {
    if (hasNoDataset) {
      setShowModal(true);
    }
  }, [hasNoDataset]);

  return (
    <>
      <NoDatasetModal show={showModal} />
      {children}
    </>
  );
}
