"use client";

import Image from 'next/image'
import about_image from "@/assets/images/about_image_2.png";
import Container from '@/components/shared/container/Container';
import { motion } from "motion/react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function MissionSection() {
  return (
    <Container className="lg:py-16 py-8 bg-white">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16 items-start">
        {/* Left - Image */}
        <motion.div
          initial={{ opacity: 0, x: -40, scale: 0.96 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center md:justify-start"
        >
          <div className="relative w-full rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={about_image}
              alt="Modern building representing our mission"
              className="object-cover w-full h-full"
            />
          </div>
        </motion.div>

        {/* Right - Content */}
        <div className="col-span-2">
          {/* Heading */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            custom={0}
            variants={fadeUp as any}
          >
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-[32px] font-bold text-primary-black">Our mission</h2>
            </div>
          </motion.div>

          {/* Intro Paragraphs */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            custom={1}
            variants={fadeUp as any}
            className="space-y-4 text-lg text-primary-gray leading-relaxed"
          >
            <p>
              propMarket was built to make off-market real estate accessible. We believe buyers and sellers should be able to connect directly, with full transparency and without unnecessary middlemen. Our platform empowers both sides of the transaction with tools that were previously only available to institutional investors.
            </p>
            <p>
              By removing commissions and complex brokerage hurdles, we&apos;re building a more liquid, fair, and efficient marketplace for the global real estate community.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            {/* Transparency */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              custom={2}
              variants={fadeUp as any}
            >
              <h3 className="text-2xl font-bold text-primary-black mb-3">Transparency</h3>
              <p className="text-primary-gray leading-relaxed">
                No hidden fees, no obscured data. Everything you see is direct from the source.
              </p>
            </motion.div>

            {/* Efficiency */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              custom={3}
              variants={fadeUp as any}
            >
              <h3 className="text-2xl font-bold text-primary-black mb-3">Efficiency</h3>
              <p className="text-primary-gray leading-relaxed">
                Closing timelines reduced by up to 40% through direct communication channels.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </Container>
  )
}