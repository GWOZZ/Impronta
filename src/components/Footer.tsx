import Link from "next/link";
import { nav, site } from "@/lib/content";
import { Arrow } from "./Arrow";

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__top">
        <div className="footer__cta">
          <p className="eyebrow">¿Tenés un desafío?</p>
          <p className="footer__headline">
            Contanos qué querés resolver. <em>Lo bajamos a un plan.</em>
          </p>
          <Link href="/contacto" className="btn btn--accent">
            Agendar una reunión gratis <Arrow />
          </Link>
        </div>
        <nav className="footer__nav" aria-label="Pie de página">
          <p className="eyebrow">Sitio</p>
          {nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="wrap footer__bottom">
        <span className="mono">
          {site.wordmark} — {site.signature}
        </span>
        <span className="mono">© {new Date().getFullYear()}</span>
      </div>
      <p className="footer__mark" aria-hidden="true">
        {site.wordmark}
      </p>
    </footer>
  );
}
