import Link from "next/link";

interface FooterProps {
    variant?: "transparent" | "solid"
}

export default function Footer({ variant = "transparent" }: FooterProps) {
    const isSolid = variant === "solid"

    return (
        <footer className={isSolid ? "border-t border-black/5 bg-card text-text" : "bg-secondary text-white"}>
            <div className="mx-auto max-w-7xl px-6 py-14 lg:px-12">
                <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
                    <div>
                        <Link href="/" className="inline-flex items-center text-2xl font-semibold">
                            <span className={isSolid ? "text-text" : "text-white"}>Next</span>
                            <span className="rounded-bl-2xl rounded-tr-2xl bg-primary px-2 py-1 text-white">
                                Estate
                            </span>
                        </Link>
                        <p className={isSolid ? "mt-5 max-w-xs text-sm leading-6 text-text/60" : "mt-5 max-w-xs text-sm leading-6 text-white/55"}>
                            A better way to find a place that feels like home.
                            Explore thoughtfully selected properties in remarkable locations.
                        </p>
                    </div>

                    <div>
                        <h2 className={isSolid ? "text-sm font-semibold text-text" : "text-sm font-semibold text-white"}>Explore</h2>
                        <div className={isSolid ? "mt-5 flex flex-col items-start gap-3 text-sm text-text/60" : "mt-5 flex flex-col items-start gap-3 text-sm text-white/55"}>
                            <Link href="/" className={isSolid ? "transition hover:text-primary" : "transition hover:text-white"}>Home</Link>
                            <Link href="/properties" className={isSolid ? "transition hover:text-primary" : "transition hover:text-white"}>Properties</Link>
                            <Link href="/marketplace" className={isSolid ? "transition hover:text-primary" : "transition hover:text-white"}>Marketplace</Link>
                        </div>
                    </div>

                    <div>
                        <h2 className={isSolid ? "text-sm font-semibold text-text" : "text-sm font-semibold text-white"}>Company</h2>
                        <div className={isSolid ? "mt-5 flex flex-col items-start gap-3 text-sm text-text/60" : "mt-5 flex flex-col items-start gap-3 text-sm text-white/55"}>
                            <Link href="/about" className={isSolid ? "transition hover:text-primary" : "transition hover:text-white"}>About us</Link>
                            <Link href="/contact" className={isSolid ? "transition hover:text-primary" : "transition hover:text-white"}>Contact</Link>
                            <Link href="/privacy" className={isSolid ? "transition hover:text-primary" : "transition hover:text-white"}>Privacy policy</Link>
                        </div>
                    </div>

                    <div>
                        <h2 className={isSolid ? "text-sm font-semibold text-text" : "text-sm font-semibold text-white"}>Have a property to share?</h2>
                        <p className={isSolid ? "mt-5 text-sm leading-6 text-text/60" : "mt-5 text-sm leading-6 text-white/55"}>
                            Put your property in front of people ready to find their next home.
                        </p>
                        <Link
                            href="/add-property"
                            className="mt-5 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-500"
                        >
                            List a property <span className="ml-2" aria-hidden="true">-&gt;</span>
                        </Link>
                    </div>
                </div>

                <div className={isSolid ? "mt-14 flex flex-col gap-3 border-t border-black/10 pt-5 text-xs text-text/45 sm:flex-row sm:items-center sm:justify-between" : "mt-14 flex flex-col gap-3 border-t border-white/10 pt-5 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between"}>
                    <p>© 2026 NextEstate. All rights reserved.</p>
                    <p>Made for better moves.</p>
                </div>
            </div>
        </footer>
    )
}