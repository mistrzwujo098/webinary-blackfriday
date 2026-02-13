'use client'

export default function Footer() {
  return (
    <footer className="bg-paulina-primary text-white py-8 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-lg mb-2">
          Masz pytania?
        </p>
        <a
          href="mailto:kontakt@paulinaodmatematyki.com"
          className="text-paulina-accent hover:text-white transition-colors duration-300 font-semibold text-lg"
        >
          kontakt@paulinaodmatematyki.com
        </a>
        <div className="flex justify-center gap-6 text-sm mt-4">
          <a href="https://paulinaodmatematyki.com/regulamin" className="hover:text-paulina-accent transition-colors" target="_blank" rel="noopener noreferrer">Regulamin</a>
          <a href="https://paulinaodmatematyki.com/polityka-prywatnosci" className="hover:text-paulina-accent transition-colors" target="_blank" rel="noopener noreferrer">Polityka prywatności</a>
        </div>
        <div className="mt-6 pt-6 border-t border-white/20 text-sm text-gray-300">
          <p>&copy; {new Date().getFullYear()} Paulina od Matematyki. Wszystkie prawa zastrzeżone.</p>
        </div>
      </div>
    </footer>
  )
}
