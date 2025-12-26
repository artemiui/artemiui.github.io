export default function Footer() {
  return (
    <footer className="w-full max-w-2xl mx-auto px-6 py-8 border-t border-zinc-200 dark:border-zinc-800 mt-auto">
      <p className="text-xs text-zinc-500 dark:text-zinc-500 text-center">
        da big {new Date().getFullYear()}
      </p>
    </footer>
  );
}

