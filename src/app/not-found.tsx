import Link from "next/link"

export const dynamic = 'force-dynamic'

export default function NotFound() {
    return (
        <main className="relative flex min-h-screen overflow-hidden bg-secondary text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(79,70,229,0.3),transparent_35%)]" />
            <div className="absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full border border-white/10 lg:h-96 lg:w-96" />
            <div className="absolute -right-8 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full border border-white/10 lg:h-72 lg:w-72" />

            <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-6 py-8 lg:px-12">
                <Link href="/" className="inline-flex w-fit items-center text-2xl font-semibold">
                    <span className="text-white">Next</span>
                    <span className="rounded-bl-2xl rounded-tr-2xl bg-primary px-2 py-1 text-white">
                        Estate
                    </span>
                </Link>

                <div className="flex flex-1 items-center py-20">
                    <div className="max-w-xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-indigo-300">
                            Error 404
                        </p>
                        <h1 className="mt-5 text-6xl font-bold tracking-tight sm:text-8xl">
                            This place is off the market.
                        </h1>
                        <p className="mt-6 max-w-md text-base leading-7 text-white/60 sm:text-lg">
                            The page you are looking for has moved, been removed, or never existed. Let&apos;s get you back to somewhere familiar.
                        </p>
                        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href="/"
                                className="inline-flex h-13 items-center justify-center rounded-2xl bg-primary px-6 font-semibold text-white transition hover:bg-indigo-500"
                            >
                                Back to home
                            </Link>
                            <Link
                                href="/properties"
                                className="inline-flex h-13 items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
                            >
                                Browse properties <span className="ml-2" aria-hidden="true">-&gt;</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <p className="text-sm text-white/35">NextEstate / Find your next address</p>
            </div>
        </main>
    )
}
