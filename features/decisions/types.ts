export type SavePostHocNotesState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };