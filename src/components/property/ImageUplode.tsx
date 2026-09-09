import Image from "next/image";
import { TbPhotoPlus } from "react-icons/tb";

interface ImageUploadProps { 
    preview : string  | null ,
    onChange : (file : File) => void 
}
export default function ImageUplode({preview , onChange} :  ImageUploadProps) {
    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(!file) return ; 
        onChange(file)
    } 
    return (
        <div className="relative w-full ">
             <label htmlFor="image-upload" className="relative flex flex-col items-center justify-center gap-2 cursor-pointer rounded-2xl border-2 border-dashed border-gray-300 p-10 text-gray-600 hover:border-gray-400 transition min-h-80">
          {!preview && (
          <>
             <TbPhotoPlus size={36} />
             <p className="font-medium">Click to upload</p>
             <p className="text-sm"> Upload one image</p>
          </>
       )} 
       {preview && (
        <Image src={preview} alt="preview" fill className="object-cover  rounded-2xl" />
       )}
</label> 
<input  type="file" id="image-upload"  accept="images/*" onChange={handleUpload}  className="hidden" />
        </div>
    )
}