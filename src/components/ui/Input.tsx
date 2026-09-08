import clsx from "clsx";
import { InputHTMLAttributes, TextareaHTMLAttributes } from "react"

interface BaseProps { 
    label : string ,
    name : string ,
    error? : string ,
    as? : "input" | "textarea" ,
    value : string  , 
    onChange? : React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> 
} 

type InputProps = BaseProps & InputHTMLAttributes<HTMLInputElement>
type TextareaProps = BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>



export default function Input ({
    label , name , error , value , as = "input" , className , onChange , id , ...props 
} : InputProps | TextareaProps) {  
    const hasValue = value !==  "" ;
    const inputId = id ?? name ;  
    const sharedClasses = clsx(
        `
        peer w-full text-gray-700 border bg-gray-50 focus:border-2 px-4 text-sm outline-none transition disabled:opacity-70
        ` ,
        error ? "border-red-500 focus:border-red-500 " : "border-gray-200 focus:border-primary", 
       as === "textarea" ? "min-h-[120px] pt-6 pb-3 resize-none rounded-xl " : "h-14 pt-6 rounded-xl ", 
       className
         
    )

    return ( 
        <div className="w-full ">
           <div className="relative ">
              {as === "textarea" ? (
                <textarea name={name} id={inputId} value={value} placeholder="" className={sharedClasses} onChange={onChange} {...props as TextareaHTMLAttributes<HTMLTextAreaElement> }></textarea>
              ) : (
                <input name={name} id={inputId} value={value} onChange={onChange}  className={sharedClasses} {...props as InputHTMLAttributes<HTMLInputElement> } />
              )} 
              <label htmlFor={inputId} className={
                clsx(
                    ` 
                     absolute left-4 top-4 text-gray-500 text-sm transition-all  duration-200  pointer-events-none origin-left
                    ` , 
                    hasValue ? "scale-75 -translate-y-3 text-gray-700 " : "peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-primary"
                )
              }> 
              {label} 
              </label>
           </div>
           {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    )
}