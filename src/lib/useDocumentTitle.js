import { useEffect } from "react";

const DEFAULT_TITLE = "BidPort - US auction search and import brokerage";

/** Per-route document title; pass null for the home/default title. */
export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} - BidPort` : DEFAULT_TITLE;
  }, [title]);
}
