import { LuPlus } from "react-icons/lu";
import { LuMinus } from "react-icons/lu";

interface CounterProps  { 
    title : string , 
    subTitle? : string , 
    value : number , 
    onChange : (value : number) => void , 
    min?  : number ,  
    max? : number


}

export default function Counter ({
    title ,
    subTitle , 
    value , 
    onChange , 
    min = 1 , 
    max = 20 
} : CounterProps) { 
    const increase = () => {
  if(value < max) onChange(value + 1)
}

const decrease = () => {
  if(value > min) onChange(value - 1)
}
    return ( 
        <div className="flex items-center justify-between py-8 border-b last:border-b-0 gap-8">
  <div>
    <p className="font-medium text-gray-900">{title}</p>
    {subTitle && <p className="text-sm text-gray-500">{subTitle}</p> }
  </div>

  <div className="flex items-center gap-4">
    <button onClick={decrease} disabled={min === value}  className=" w-8 h-8 rounded-full border border-gray-300
flex items-center justify-center
disabled:opacity-30 disabled:cursor-not-allowed
hover:border-black transition"> 
      <LuMinus size={16} /> 
    </button> 

    <span className="w-6 text-center font-medium text-gray-600">
  {value}
</span>  

    <button onClick={increase} disabled={max === value}
className=" w-8 h-8 rounded-full border border-gray-300
flex items-center justify-center
disabled:opacity-30 disabled:cursor-not-allowed
hover:border-black transition">
  <LuPlus size={16}/>
</button>
  </div>
</div>
    )
}