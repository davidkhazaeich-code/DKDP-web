export function ParallaxOrangeBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Top-left blob */}
      <div
        className="absolute w-[520px] h-[520px] rounded-full blur-[80px] -top-24 -left-24"
        style={{
          background: 'radial-gradient(circle, rgba(255,140,0,0.22) 0%, transparent 70%)',
          animation: 'blobFloat 8s ease-in-out infinite',
        }}
      />
      {/* Right-center blob */}
      <div
        className="absolute w-[380px] h-[380px] rounded-full blur-[60px] top-1/3 -right-16"
        style={{
          background: 'radial-gradient(circle, rgba(255,107,0,0.14) 0%, transparent 70%)',
          animation: 'blobFloat 10s ease-in-out infinite reverse',
        }}
      />
      {/* Bottom-center blob */}
      <div
        className="absolute w-[300px] h-[300px] rounded-full blur-[60px] bottom-0 left-1/2 -translate-x-1/2"
        style={{
          background: 'radial-gradient(circle, rgba(255,140,0,0.10) 0%, transparent 70%)',
          animation: 'blobFloat 12s ease-in-out infinite 2s',
        }}
      />
    </div>
  )
}
