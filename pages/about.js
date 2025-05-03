import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function About() {
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
        <div className="pt-24"/>

        <h1 className="text-4xl font-bold mb-12 text-center text-pink-500">About Me</h1>

        <div className="flex justify-center">
          <div className="bg-black bg-opacity-30 backdrop-blur-md border border-pink-400 rounded-2xl p-8 max-w-3xl text-center">
            <p className="text-white text-opacity-80 mb-6">
              Hi! I'm <span className="text-pink-400 font-semibold">Harpreet Kaur</span>, a passionate Developer specializing in AI, Machine Learning, Full-Stack Web Development, and futuristic 3D web experiences.
            </p>
            <p className="text-white text-opacity-80 mb-6">
              I love building projects that combine creativity with technology — whether it's Generative AI platforms, Computer Vision systems, or advanced Web Apps.
            </p>
            <p className="text-white text-opacity-80">
              My goal is to deliver amazing experiences through code, design, and innovation. I'm always excited to learn new tools and build products that make an impact.
            </p>
          </div>
        </div>
      </motion.main>
    </AnimatePresence>
  );
}
