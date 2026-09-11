import Link from "next/link";
import FrontendLayout from "@/components/layouts/FrontendLayout";
import Navbar from "@/components/navbar/Navbar";

export const dynamic = 'force-dynamic'

const values = [
    {
        number: "01",
        title: "Clarity over clutter",
        description: "Every detail should help you compare, understand, and move forward with confidence.",
    },
    {
        number: "02",
        title: "Places with character",
        description: "We look beyond square footage to find homes with a sense of place and possibility.",
    },
    {
        number: "03",
        title: "People first",
        description: "Buying, renting, and selling are personal journeys. The experience should feel that way.",
    },
];

export default function AboutPage() {
    return (
        <FrontendLayout>
            <Navbar variant="solid" />
            <main className="flex-1">
                <section className="mx-auto max-w-7xl px-6 pb-20 pt-16 lg:px-12 lg:pb-28 lg:pt-24">
                    <div className="max-w-4xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">About NextEstate</p>
                        <h1 className="mt-6 text-5xl font-semibold tracking-tight text-text md:text-7xl">
                            Find a place that feels like yours.
                        </h1>
                        <p className="mt-8 max-w-2xl text-lg leading-8 text-text/60">
                            NextEstate brings thoughtful property discovery to people looking for more than an address.
                            We make it easier to explore beautiful homes, compare what matters, and take the next step.
                        </p>
                    </div>

                    <div className="mt-20 grid gap-8 border-y border-black/10 py-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-black/10">
                        <div className="md:px-8 md:first:pl-0">
                            <p className="text-4xl font-semibold text-primary">12k+</p>
                            <p className="mt-2 text-sm text-text/60">Properties discovered</p>
                        </div>
                        <div className="md:px-8">
                            <p className="text-4xl font-semibold text-primary">24</p>
                            <p className="mt-2 text-sm text-text/60">Markets represented</p>
                        </div>
                        <div className="md:px-8 md:last:pr-0">
                            <p className="text-4xl font-semibold text-primary">4.9/5</p>
                            <p className="mt-2 text-sm text-text/60">Average experience rating</p>
                        </div>
                    </div>

                    <div className="mt-20 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">What guides us</p>
                            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-text md:text-4xl">A calmer way to make a big move.</h2>
                        </div>
                        <div className="divide-y divide-black/10">
                            {values.map((value) => (
                                <div key={value.number} className="grid gap-3 py-6 first:pt-0 sm:grid-cols-[5rem_1fr] sm:gap-6">
                                    <span className="text-sm font-semibold text-primary">{value.number}</span>
                                    <div>
                                        <h3 className="text-xl font-semibold text-text">{value.title}</h3>
                                        <p className="mt-2 leading-7 text-text/60">{value.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-20 flex flex-col items-start justify-between gap-6 rounded-3xl bg-secondary p-8 text-white md:flex-row md:items-center md:p-10">
                        <div>
                            <h2 className="text-2xl font-semibold">Ready to look around?</h2>
                            <p className="mt-2 text-white/60">Start with a few places worth seeing.</p>
                        </div>
                        <Link href="/properties" className="rounded-full bg-primary px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-500">
                            Explore properties <span className="ml-2" aria-hidden="true">-&gt;</span>
                        </Link>
                    </div>
                </section>
            </main>
        </FrontendLayout>
    );
}
