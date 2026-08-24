const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const num = new Intl.NumberFormat("en-US");

export function formatMoney(value) {
  if (value == null) return null;
  return usd.format(value);
}

export function formatNumber(value) {
  if (value == null) return null;
  return num.format(value);
}

export function formatMiles(value) {
  if (value == null) return null;
  return `${num.format(value)} mi`;
}

export function formatDate(iso) {
  if (!iso) return null;
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** 214836902 -> "214.8M" (stat strip only) */
export function formatCompact(value) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}
