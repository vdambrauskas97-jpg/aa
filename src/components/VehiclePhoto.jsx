import { CarProfile } from "@phosphor-icons/react";

/**
 * Photo slot for a vehicle. The live auction API delivers real lot photos;
 * until then every slot renders a quiet navy-tinted placeholder. The
 * per-vehicle tint is deterministic so a car keeps its shade across pages.
 */
function tintFor(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 997;
  }
  // Narrow cool band (205-228deg) keeps every placeholder in the navy family.
  const hue = 205 + (hash % 24);
  const light = 30 + (hash % 8);
  return {
    from: `hsl(${hue} 26% ${light}%)`,
    to: `hsl(${hue + 8} 30% ${Math.max(light - 9, 16)}%)`,
  };
}

export default function VehiclePhoto({
  seed,
  label,
  iconSize = 48,
  className = "",
}) {
  const tint = tintFor(seed);
  return (
    <div
      role="img"
      aria-label={label ? `${label} photo placeholder` : "Vehicle photo placeholder"}
      className={`flex items-center justify-center overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(135deg, ${tint.from}, ${tint.to})`,
      }}
    >
      <CarProfile size={iconSize} weight="duotone" className="text-white/40" />
    </div>
  );
}
