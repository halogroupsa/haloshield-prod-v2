export type VillaRenovationReferralCopy = {
  text: string;
  linkText: string;
};

export function VillaRenovationReferral({ text, linkText }: VillaRenovationReferralCopy) {
  return (
    <>
      {text}{" "}
      <a
        href="https://halo.ae/services/villa-renovation-dubai"
        className="font-medium text-ink underline decoration-ink/40 underline-offset-4 hover:decoration-ink"
      >
        {linkText}
      </a>
      .
    </>
  );
}
