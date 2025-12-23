export default function LoadingSpinner({ text = "Cargando" }) {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#FDFBF7] flex flex-col items-center justify-center animate-fade-in">
      
      {/* CÍRCULO MINIMALISTA */}
      <div className="relative mb-8">
        {/* Anillo de fondo suave */}
        <div className="w-12 h-12 rounded-full border-[1px] border-[#E3E8E3]"></div>
        
        {/* Anillo giratorio oscuro */}
        <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-[1px] border-t-[#2C2C2C] border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
      </div>

      {/* TEXTO EDITORIAL */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#2C2C2C] animate-pulse">
          {text}
        </span>
        <span className="text-[9px] font-serif italic text-stone-400">
          Áurea Shop
        </span>
      </div>
      
    </div>
  )
}