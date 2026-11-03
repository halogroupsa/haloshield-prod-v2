import { telHref, whatsappHref } from "@/lib/site";
import { ScrollTopButton } from "./ScrollTopButton";

/** Shared WhatsApp orb, with a call shortcut stacked above it on mobile. */
export function FloatingContact() {
  return (
    <>
      <ScrollTopButton />

      <div className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-6 z-40 flex flex-col items-center gap-2 md:bottom-6">
        <a
          href={telHref}
          aria-label="Call a Halo Shield engineer"
          className="phone-btn grid size-11 place-items-center rounded-full bg-ink text-membrane shadow-[0_2px_8px_rgb(0_0_0/0.12)] transition-colors hover:bg-ink/85 md:hidden"
        >
          <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.79a2 2 0 0 1-.45 2.11L8.09 9.89a16 16 0 0 0 6 6l1.27-1.26a2 2 0 0 1 2.11-.45c.89.33 1.83.56 2.79.69A2 2 0 0 1 22 16.92Z" />
          </svg>
        </a>
        <a
          href={whatsappHref()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Halo Shield on WhatsApp"
          className="whatsapp-btn whatsapp-float relative grid size-11 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_2px_8px_rgb(0_0_0/0.12)] transition-[background-color,box-shadow] duration-200 hover:bg-[#22c55e] hover:shadow-[0_6px_18px_rgb(37_211_102/0.35)]"
        >
          <svg width={22} height={22} viewBox="0 0 448 512" fill="currentColor" aria-hidden className="relative z-1">
            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
          </svg>
        </a>
      </div>
    </>
  );
}
