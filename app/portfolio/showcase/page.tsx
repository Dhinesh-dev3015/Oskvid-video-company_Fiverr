"use client"

import PortfolioGrid from "@/components/portfolio-grid"
import { motion } from "framer-motion"

export default function PortfolioShowcasePage() {
  return (
    <div className="pt-32 pb-20 min-h-screen">
      <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <PortfolioGrid />
      </motion.div>
    </div>
  )
}
