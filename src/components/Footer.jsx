export function Footer() {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <footer className="border-t border-white/5 py-8 px-4 md:px-6">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <img src={`${baseUrl}assets/logo-horizontal-white.png`} alt="CallSeller" className="h-6 w-auto opacity-80" />
        <p className="text-xs text-cs-ink-600">
          © {new Date().getFullYear()} CallSeller · Todos os direitos reservados
        </p>
      </div>
    </footer>
  );
}
