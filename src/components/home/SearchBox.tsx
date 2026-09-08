import Button from "../ui/Button";
import { FiMapPin, FiSearch } from "react-icons/fi";

export default function SearchBox() {
    return (
        <form className="mt-10 w-full max-w-3xl rounded-[28px] border border-white/15 bg-slate-950/35 p-3 shadow-2xl shadow-slate-950/30 backdrop-blur-2xl">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                <label className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 transition-colors focus-within:border-primary/70 focus-within:bg-white/15">
                    <FiMapPin className="shrink-0 text-primary" size={20} aria-hidden="true" />
                    <input
                        type="text"
                        placeholder="City, neighborhood, or address"
                        className="h-7 min-w-0 w-full bg-transparent text-sm font-medium text-white outline-none placeholder:text-white/45"
                    />
                </label>

                <Button
                    type="submit"
                    icon={<FiSearch size={18} aria-hidden="true" />}
                    className="h-14 shrink-0 rounded-2xl px-5 shadow-lg shadow-primary/25"
                >
                    Search Properties
                </Button>
            </div>
        </form>
    )
}