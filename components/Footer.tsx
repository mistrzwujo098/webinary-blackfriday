'use client'

export default function Footer() {
  return (
    <footer className="bg-paulina-primary text-white py-8 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-lg mb-2">
          Masz pytania?
        </p>
        <a
          href="mailto:paulina@skutecznekorepetycje.com"
          className="text-paulina-accent hover:text-white transition-colors duration-300 font-medium text-lg"
        >
          paulina@skutecznekorepetycje.com
        </a>
        <div className="mt-6 pt-6 border-t border-white/20 text-sm text-gray-300">
          <p>&copy; 2025 Paulina od Matematyki. Wszystkie prawa zastrzeżone.</p>
        </div>
      </div>
    </footer>
  )
}
