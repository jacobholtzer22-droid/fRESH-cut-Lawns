import { Phone, CalendarClock, ShieldCheck } from "lucide-react";
import { site } from "@/site.config";
import { DAY_ORDER, dayLabel, formatDayHours } from "@/lib/format";

const INFO_ICONS = [CalendarClock, ShieldCheck] as const;

/** The contact details column shown beside the form on /contact. */
export default function ContactInfo() {
  const { contact, business } = site;

  return (
    <div>
      <a
        href={business.phoneHref}
        className="flex items-center gap-4 rounded-xl border border-evergreen/10 bg-bone px-5 py-4 transition-colors hover:border-cedar"
      >
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-evergreen text-cedar-light">
          <Phone className="h-5 w-5" aria-hidden="true" />
        </span>
        <span>
          <span className="block text-xs font-semibold uppercase tracking-wider text-ink/50">
            {contact.callOrTextLabel}
          </span>
          <span className="font-display text-lg font-bold text-evergreen">
            {business.phoneDisplay}
          </span>
        </span>
      </a>

      <div className="mt-4 space-y-4">
        {contact.infoLines.map((line, i) => {
          const Icon = INFO_ICONS[i] ?? CalendarClock;
          return (
            <div
              key={i}
              className="flex items-start gap-4 px-1 text-sm text-ink/70"
            >
              <Icon
                className="mt-0.5 h-5 w-5 shrink-0 text-cedar-dark"
                aria-hidden="true"
              />
              <span>{line}</span>
            </div>
          );
        })}
      </div>

      {/* Hours */}
      <div className="mt-8 rounded-xl border border-evergreen/10 bg-bone p-5">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-ink/50">
          {site.footer.hoursLabel}
        </h2>
        <ul className="mt-3 space-y-1.5 text-sm">
          {DAY_ORDER.map((key) => (
            <li key={key} className="flex justify-between gap-4 text-ink/75">
              <span>{dayLabel(key)}</span>
              <span className="text-ink/55">{formatDayHours(site.hours[key])}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
