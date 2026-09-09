import clsx from "clsx"
import { IconType } from "react-icons/lib"

interface PropertyTypeCardProps { 
    label : string , 
    icon : IconType, 
    selected ? : boolean , 
    onClick: () => void
}

export default  function PropertyCard({label , icon : Icon , selected , onClick} : PropertyTypeCardProps) {
    return  (
       <button className={
        clsx(`mt-6 flex flex-col gap-3 p-4 border rounded-xl text-left transition text-gray-700 hover:border-black` ,
              selected ? "border-black bg-gray-50" : "border-gray-200"
       )} type="button" onClick={onClick}>
        <Icon size={28} />
        <span className="font-medium">{label}</span>

       </button>
    )
} 