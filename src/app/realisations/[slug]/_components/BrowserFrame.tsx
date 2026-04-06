export function BrowserFrame({ src, alt, url }: { src: string; alt: string; url: string }) {
  return (
    <div className="rounded-[16px] border border-zinc-800 overflow-hidden bg-zinc-950 shadow-2xl">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800 bg-zinc-900/80">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-zinc-700" />
          <div className="w-3 h-3 rounded-full bg-zinc-700" />
          <div className="w-3 h-3 rounded-full bg-zinc-700" />
        </div>
        <div className="flex-1 mx-4">
          <div className="bg-zinc-800 rounded-md px-3 py-1 text-[11px] text-zinc-500 font-mono truncate">
            {url}
          </div>
        </div>
      </div>
      {/* Screenshot */}
      <div className="aspect-[16/9] relative overflow-hidden">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}
