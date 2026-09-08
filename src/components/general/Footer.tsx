import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-secondary text-white">
            <div className="mx-auto max-w-7xl px-6 py-14 lg:px-12">
                <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
                    <div>
                        <Link href="/" className="inline-flex items-center text-2xl font-semibold">
                            <span className="text-white">Next</span>
                            <span className="rounded-bl-2xl rounded-tr-2xl bg-primary px-2 py-1 text-white">
                                Estate
                            </span>
                        </Link>
                        <p className="mt-5 max-w-xs text-sm leading-6 text-white/55">
                            A better way to find a place that feels like home.
                            Explore thoughtfully selected properties in remarkable locations.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-sm font-semibold text-white">Explore</h2>
                        <div className="mt-5 flex flex-col items-start gap-3 text-sm text-white/55">
                            <Link href="/" className="transition hover:text-white">Home</Link>
                            <Link href="/properties" className="transition hover:text-white">Properties</Link>
                            <Link href="/marketplace" className="transition hover:text-white">Marketplace</Link>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-sm font-semibold text-white">Company</h2>
                        <div className="mt-5 flex flex-col items-start gap-3 text-sm text-white/55">
                            <Link href="/about" className="transition hover:text-white">About us</Link>
                            <Link href="/contact" className="transition hover:text-white">Contact</Link>
                            <Link href="/privacy" className="transition hover:text-white">Privacy policy</Link>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-sm font-semibold text-white">Have a property to share?</h2>
                        <p className="mt-5 text-sm leading-6 text-white/55">
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

                <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-5 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
                    <p>© 2026 NextEstate. All rights reserved.</p>
                    <p>Made for better moves.</p>
                </div>
            </div>
        </footer>
    )
}