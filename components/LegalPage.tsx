import PageHeader from "./PageHeader";

export type LegalSection = { heading: string; body: string[] };

/**
 * Shared layout for the Privacy Policy / Terms pages. Plain, readable prose on the
 * light base. Content is passed in per page. NOTE: this is standard boilerplate , 
 * have it reviewed before launch and adjust to the business's actual practices.
 */
export default function LegalPage({
  eyebrow,
  title,
  updated,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} />
      <section className="bg-limestone py-16 text-ink sm:py-20">
        <div className="container-page max-w-3xl">
          <p className="text-sm text-ink/50">Last updated: {updated}</p>
          <p className="mt-6 text-base leading-relaxed text-ink/75">{intro}</p>

          <div className="mt-10 space-y-9">
            {sections.map((s) => (
              <div key={s.heading}>
                <h2 className="h-display text-xl text-evergreen sm:text-2xl">
                  {s.heading}
                </h2>
                {s.body.map((p, i) => (
                  <p
                    key={i}
                    className="mt-3 text-base leading-relaxed text-ink/75"
                  >
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
