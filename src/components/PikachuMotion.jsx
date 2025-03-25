import { motion } from 'framer-motion'
import pikachu from '../assets/poke2.jpg'

export default function PikachuMotion() {
  return (
    <motion.img
      src={pikachu}
      alt="Pikachu animado"
      className="w-40 h-auto rounded-xl shadow-lg"
      animate={{
        y: [0, -10, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}
