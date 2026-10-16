import { motion } from "framer-motion"
export default function Screen({children,className=""}){return <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-6}} transition={{duration:.2}} className={className}>{children}</motion.div>}
