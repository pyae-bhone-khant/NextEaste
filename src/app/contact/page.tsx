import FrontendLayout from "@/components/layouts/FrontendLayout";
import Navbar from "@/components/navbar/Navbar";

export const dynamic = 'force-dynamic'

export default function ContactPage() {
    return (
        <FrontendLayout>
            <Navbar variant="solid" />
            <main className="flex-1">
                <section className="mx-auto grid max-w-7xl gap-14 px-6 pb-20 pt-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 lg:px-12 lg:pb-28 lg:pt-24">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Get in touch</p>
                        <h1 className="mt-6 text-5xl font-semibold tracking-tight text-text md:text-6xl">Let&apos;s talk about your next move.</h1>
                        <p className="mt-6 max-w-md text-lg leading-8 text-text/60">
                            Have a question about a property, want to list a home, or just need some direction? Our team is here to help.
                        </p>

                        <div className="mt-12 space-y-7 text-sm">
                            <div>
                                <p className="font-semibold text-text">Email us</p>
                                <a href="mailto:hello@nextestate.com" className="mt-2 inline-block text-text/60 transition hover:text-primary">hello@nextestate.com</a>
                            </div>
                            <div>
                                <p className="font-semibold text-text">Call us</p>
                                <a href="tel:+18005550199" className="mt-2 inline-block text-text/60 transition hover:text-primary">+1 (800) 555-0199</a>
                            </div>
                            <div>
                                <p className="font-semibold text-text">Visit us</p>
                                <p className="mt-2 leading-6 text-text/60">120 Market Street<br />San Francisco, CA 94105</p>
                            </div>
                        </div>
                    </div>

                    <form className="rounded-3xl border border-black/10 bg-card p-6 shadow-sm md:p-8">
                        <div className="grid gap-6 sm:grid-cols-2">
                            <label className="text-sm font-medium text-text">
                                First name
                                <input type="text" name="firstName" required className="mt-2 h-12 w-full rounded-xl border border-black/10 bg-background px-4 font-normal outline-none transition placeholder:text-text/35 focus:border-primary" placeholder="Alex" />
                            </label>
                            <label className="text-sm font-medium text-text">
                                Last name
                                <input type="text" name="lastName" required className="mt-2 h-12 w-full rounded-xl border border-black/10 bg-background px-4 font-normal outline-none transition placeholder:text-text/35 focus:border-primary" placeholder="Morgan" />
                            </label>
                        </div>
                        <label className="mt-6 block text-sm font-medium text-text">
                            Email address
                            <input type="email" name="email" required className="mt-2 h-12 w-full rounded-xl border border-black/10 bg-background px-4 font-normal outline-none transition placeholder:text-text/35 focus:border-primary" placeholder="alex@example.com" />
                        </label>
                        <label className="mt-6 block text-sm font-medium text-text">
                            What can we help with?
                            <select name="topic" className="mt-2 h-12 w-full rounded-xl border border-black/10 bg-background px-4 font-normal outline-none transition focus:border-primary">
                                <option>Finding a property</option>
                                <option>Listing a property</option>
                                <option>General question</option>
                            </select>
                        </label>
                        <label className="mt-6 block text-sm font-medium text-text">
                            Message
                            <textarea name="message" required rows={5} className="mt-2 w-full resize-none rounded-xl border border-black/10 bg-background p-4 font-normal outline-none transition placeholder:text-text/35 focus:border-primary" placeholder="Tell us a little about what you are looking for..." />
                        </label>
                        <button type="submit" className="mt-6 rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition hover:bg-indigo-500">
                            Send message <span className="ml-2" aria-hidden="true">-&gt;</span>
                        </button>
                    </form>
                </section>
            </main>
        </FrontendLayout>
    );
}
