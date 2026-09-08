import Footer from "@/components/general/Footer";
import FrontendLayout from "@/components/layouts/FrontendLayout";
import Navbar from "@/components/navbar/Navbar";
import PropertyContactForm from "@/components/property/PropertyContactForm";
import Image from "next/image";
import { FaMapMarkedAlt } from "react-icons/fa";

export default function PropertyPage () {
    return ( 
        <FrontendLayout >
            <Navbar variant="solid" /> 
            <section className="py-15">
            <div className="mx-auto max-w-7xl px-6 lg:px-12">
                 <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                     <div className="flex-1">
                        <p className="text-sm font-semibold uppercase tracking-[0.25rem] text-primary">
                            For Sale
                        </p> 
                        <h2 className=" mt-3 text-4xl font-bold text-text md:text-5xl">Modern Luxury Apartment</h2>

                        <div className="my-6 flex items-center gap-3 text-sm">
                              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                  <FaMapMarkedAlt size={15} />
                              </span>
                              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-400">Location</span>
                              <span className="h-5 w-px bg-neutral-200" aria-hidden="true" />
                              <span className="font-medium text-neutral-800">Manhattan, New York</span>
                        </div> 

                        <div className="grid max-w-xl grid-cols-3 border-y border-neutral-200 py-5">
                            <div className="pr-4">
                                <p className="text-2xl font-semibold tracking-tight text-neutral-900">3</p>
                                <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-neutral-400">Bedrooms</p>
                            </div>
                            <div className="border-l border-neutral-200 px-4">
                                <p className="text-2xl font-semibold tracking-tight text-neutral-900">2</p>
                                <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-neutral-400">Bathrooms</p>
                            </div>
                            <div className="border-l border-neutral-200 pl-4">
                                <p className="text-2xl font-semibold tracking-tight text-neutral-900">1,450</p>
                                <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-neutral-400">Sq ft</p>
                            </div>
                        </div> 
                     </div>
                     <div className="rounded-3xl border border-primary/15 bg-primary/5 p-6 shadow-lg shadow-primary/10 lg:min-w-56 lg:text-right">
                         <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/70">Price</p>
                         <p className="mt-2 text-3xl font-semibold tracking-tight text-primary">$895,000</p>
                         <p className="mt-1 text-sm text-text/55">For sale</p>
                     </div>
                 </div>
                 <div className="relative mt-12 aspect-16/8 overflow-hidden rounded-3xl shadow-xl shadow-black/10">
                     <Image
                         src="/images/image1.jpg"
                         alt="Modern luxury apartment with a pool and garden"
                         fill
                         priority
                         className="object-cover"
                         sizes="(max-width: 1280px) 100vw, 1280px"
                     />
                 </div>
                 <div className="mt-16 grid gap-8 lg:grid-cols-[7fr_3fr] lg:gap-10">
                     <article className="rounded-2xl border border-black/10 bg-card p-5 shadow-lg shadow-black/5 md:p-6">
                         <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">About this property</p>
                         <h1 className="mt-3 text-2xl font-semibold tracking-tight text-text md:text-3xl">
                             A modern home made for easy living.
                         </h1>
                         <p className="mt-4 text-sm leading-7 text-text/60">
                             Set in a peaceful Manhattan neighborhood, this contemporary apartment brings together bright open spaces, thoughtful finishes, and a private outdoor setting. The generous layout is designed for relaxed mornings, comfortable entertaining, and everyday life with room to breathe.
                         </p>
                         <p className="mt-4 text-sm leading-7 text-text/60">
                             Large windows fill the home with natural light, while the pool and garden create a private retreat just beyond the living area. Every detail balances clean modern design with the warmth of a place that feels genuinely lived in.
                         </p>
                     </article>

                     <aside className="overflow-hidden rounded-3xl border border-primary/15 bg-card shadow-xl shadow-primary/5">
                         <div className="border-b border-primary/10 bg-primary/5 px-5 py-4 md:px-6">
                             <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Your property guide</p>
                         </div>
                         <div className="p-5 md:p-6">
                           <div className="flex items-center gap-4">
                             <Image
                                 src="/images/avatar.png"
                                 alt="Property agent Sarah Mitchell"
                                 width={64}
                                 height={64}
                                 className="h-14 w-14 rounded-full object-cover"
                             />
                             <div>
                                 <p className="text-lg font-semibold text-text">Sarah Mitchell</p>
                                 <p className="mt-1 text-sm text-text/55">Property Agent</p>
                             </div>
                           </div>

                           <div className="mt-7 border-t border-black/10 pt-6">
                               <h2 className="text-lg font-semibold text-text">Send an inquiry</h2>
                               <p className="mt-1 text-sm leading-6 text-text/55">Ask a question or request a private viewing.</p>
                               <PropertyContactForm />
                           </div>
                         </div>
                     </aside>
                 </div>
            </div>
            </section>
            <Footer variant="solid" />
        </FrontendLayout>
    )
}