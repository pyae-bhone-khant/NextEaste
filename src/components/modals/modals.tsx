"use client"
import { useEffect } from "react"
interface ModalProps { 
isOpen : boolean , 
onClose : () => void , 
title : string , 
children : React.ReactNode
}

export default function Modal({isOpen , onClose , title  , children} : ModalProps) { 
    useEffect(() => {
       document.body.style.overflow = isOpen ? "hidden" : "auto" 

       return () => {
        document.body.style.overflow = "auto";
       }
    } , [isOpen]) 

    return ( 
         <div aria-hidden={isOpen} className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-opacity duration-300 ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}>
            {/* backdrop */}
             <div onClick={onClose} className={`absolute inset-0 bg-secondary/45 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`} />
               {/* modals */}
               <div className={`relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-black/10 bg-card shadow-2xl shadow-secondary/20 transition-all duration-300 ${isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
                      {/* header */}
                 <div className="flex items-center justify-between border-b border-black/10 px-7 py-5">
                         <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-text/55">{title}</h2>
                         <button  aria-label="Close modal" className="flex h-9 w-9 items-center justify-center rounded-full text-text/50 transition hover:bg-background hover:text-text" onClick={onClose}>
                                                                        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                            <path d="M18 6 6 18" />
                                                                            <path d="m6 6 12 12" />
                                                                        </svg>
                                 </button>
                      </div>
                      {/* content */} 
                      <div className="px-7 py-7">
                        {children}
                      </div>
               </div>
        </div>
    )
}