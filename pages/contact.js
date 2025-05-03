import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Contact() {
  const router = useRouter();

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={router.route}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-black p-8 text-white"
      >
        {/* Navbar */}
        <nav className="w-full flex justify-between items-center py-4 px-8 bg-black bg-opacity-30 backdrop-blur-md fixed top-0 z-50">
          <Link href="/">
            <h1 className="text-pink-500 text-2xl font-bold">Harpreet</h1>
          </Link>
          <div className="space-x-6 text-pink-400">
            <Link href="/" className="hover:text-pink-300">Home</Link>
            <Link href="/projects" className="hover:text-pink-300">Projects</Link>
            <Link href="/about" className="hover:text-pink-300">About</Link>
            <Link href="/contact" className="hover:text-pink-300">Contact</Link>
          </div>
        </nav>

        {/* Spacer for Navbar */}
        <div className="pt-24" />

        <h1 className="text-4xl font-bold mb-12 text-center text-pink-500">Contact Me</h1>

        <div className="flex flex-col items-center">
          <div className="bg-black bg-opacity-30 backdrop-blur-md border border-pink-400 rounded-2xl p-8 max-w-xl w-full text-center">
            <p className="text-white text-opacity-80 mb-6">
              I’m currently open to new opportunities, collaborations, and exciting projects!
            </p>
            <div className="space-y-4">
              <a 
                href="mailto:harpreetgill325@gmail.com" 
                className="inline-block px-6 py-2 bg-pink-500 hover:bg-pink-600 rounded-full text-white font-semibold transition-all"
              >
                Email Me
              </a>
              <br />
              <a 
                href="https://www.linkedin.com/in/harpreet-kaur005/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block px-6 py-2 border border-pink-500 hover:bg-pink-500 hover:text-black rounded-full text-white font-semibold transition-all"
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </motion.main>
    </AnimatePresence>
  );
}
