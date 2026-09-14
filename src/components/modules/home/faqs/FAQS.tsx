"use client";
import { useGetFaqsQuery } from "@/redux/api/faqApi";
import { Minus, Plus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import FAQsSkeleton from "./FAQsSkeleton";

export interface FaqEntry {
  _id: string;
  question: string;
  answer: string;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

export default function FAQS() {
  const [openId, setOpenId] = useState<string | null>(null);
  const { data, isLoading } = useGetFaqsQuery({ limit: 1000 });

  if (isLoading) return <FAQsSkeleton count={6} />;

  const faqsData = data?.data?.data;

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };
  return (
    <div>
      <motion.div
        className="flex flex-col gap-4 mx-auto max-w-3xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {faqsData?.map((item : FaqEntry) => {
          const isOpen = openId === item?._id;

          return (
            <motion.div
              key={item?._id}
              // @ts-ignore
              variants={itemVariants}
              layout
              className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-[0_10px_30px_0_rgba(15,23,42,0.05)] "
            >
              <button
                onClick={() => toggle(item?._id)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between p-6 text-left cursor-pointer"
              >
                <span className="lg:text-2xl sm:text-xl font-semibold text-primary-black text-lg">
                  {item?.question}
                </span>

                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="ml-4 text-blue-900"
                >
                  {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      height: {
                        duration: 0.3,
                        ease: "easeInOut",
                      },
                      opacity: {
                        duration: 0.2,
                      },
                    }}
                    className="overflow-hidden"
                  >
                    <motion.p
                      initial={{ y: -8 }}
                      animate={{ y: 0 }}
                      exit={{ y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="px-6 pb-5 text-base leading-relaxed text-slate-600"
                    >
                      {item?.answer}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
