export const DATA_SYNC_EMPTY = 'data_empty';
export const DATA_SYNC_READY = 'data_ready';
export const DATA_SYNC_IN_PROGRESS = 'data_in_progress';

export type DataSyncStatusType =
  typeof DATA_SYNC_EMPTY |
  typeof DATA_SYNC_READY |
  typeof DATA_SYNC_IN_PROGRESS;
