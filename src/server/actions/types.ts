export type DatasetSelectionStatus = "idle" | "error";

export interface DatasetSelectionState {
  status: DatasetSelectionStatus;
  message?: string;
  details?: string[];
}

export const initialDatasetSelectionState: DatasetSelectionState = {
  status: "idle",
};
