import Link from "next/link";
import FrontendLayout from "@/components/layouts/FrontendLayout";
import Navbar from "@/components/navbar/Navbar";

const sections = [
    { id: "information", title: "Information we collect" },
    { id: "use", title: "How we use information" },
    { id: "sharing", title: "When we share information" },
    { id: "choices", title: "Your choices" },
];

export default function PrivacyPage() {
    return (
        <FrontendLayout>
            <Navbar variant="solid" />
            <main className="flex-1">
                <section className="mx-auto max-w-7xl px-6 pb-20 pt-16 lg:px-12 lg:pb-28 lg:pt-24">
                    <div className="max-w-3xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Your privacy</p>
                        <h1 className="mt-6 text-5xl font-semibold tracking-tight text-text md:text-6xl">Privacy Policy</h1>
                        <p className="mt-6 text-lg leading-8 text-text/60">Last updated September 8, 2026</p>
                    </div>

                    <div className="mt-16 grid gap-12 lg:grid-cols-[15rem_1fr] lg:gap-20">
                        <aside className="lg:sticky lg:top-28 lg:self-start">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text/45">On this page</p>
                            <nav className="mt-5 flex flex-col gap-3 text-sm text-text/60">
                                {sections.map((section) => (
                                    <a key={section.id} href={`#${section.id}`} className="transition hover:text-primary">{section.title}</a>
                                ))}
                            </nav>
                        </aside>

                        <article className="max-w-3xl space-y-12 text-text/70 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-text [&_p]:mt-4 [&_p]:leading-8">
                            <div>
                                <p className="mt-0! leading-8">At NextEstate, we respect your privacy and want you to understand how your information is handled. This policy explains what we collect, why we collect it, and the choices available to you when you use our website.</p>
                            </div>
                            <section id="information">
                                <h2>Information we collect</h2>
                                <p>We collect information you provide directly, such as your name, email address, phone number, and messages when you contact us or submit a property inquiry. We may also collect basic technical information, including browser type, device information, and pages visited.</p>
                            </section>
                            <section id="use">
                                <h2>How we use information</h2>
                                <p>We use your information to provide and improve our services, respond to inquiries, personalize property recommendations, maintain site security, and communicate with you about requests you make.</p>
                            </section>
                            <section id="sharing">
                                <h2>When we share information</h2>
                                <p>We do not sell your personal information. We may share limited information with service providers who help operate our website, or when required to comply with law, protect our rights, or prevent misuse of the service.</p>
                            </section>
                            <section id="choices">
                                <h2>Your choices</h2>
                                <p>You can ask us to access, correct, or delete personal information we hold about you. To make a request, contact us at <a href="mailto:privacy@nextestate.com" className="text-primary hover:underline">privacy@nextestate.com</a>. You can also unsubscribe from non-essential email communications at any time.</p>
                            </section>
                            <div className="border-t border-black/10 pt-8">
                                <p>Questions about this policy? <Link href="/contact" className="font-medium text-primary hover:underline">Contact our team</Link>.</p>
                            </div>
                        </article>
                    </div>
                </section>
            </main>
        </FrontendLayout>
    );
}
