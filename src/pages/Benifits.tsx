import React from 'react';
import { Cuboid, Sun, Target } from 'lucide-react';
import { motion } from 'framer-motion';

export const BenefitsSection: React.FC = () => {
  const items = [
    {
      icon: <Cuboid className="w-6 h-6 text-sage-accent" />,
      label: "TIME ZONES AIN'T NO THING",
      description:
        "Wherever you are in the world, you'll feel like we're right around the corner. With 12 years of experience, our business processes are seamless and time differences don't matter.",
    },
    {
      icon: <Sun className="w-6 h-6 text-sage-accent" />,
      label: "IMPOSSIBLE? WE'RE ON IT",
      description:
        '\"Impossible\" simply does not exist in our vocabulary. We develop products exactly as they were at the design stage, no simplifications, no shortcuts, no BS.',
    },
    {
      icon: <Target className="w-6 h-6 text-sage-accent" />,
      label: 'FLEXIBLE WORK TERMS',
      description:
        'Just like we stick to a fixed budget, we stay within a set Time and Materials framework. Whatever terms we agree to will depend on your project needs.',
    },
  ];

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.2 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 24, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.7, 
        ease: [0.22, 1, 0.36, 1] 
      } 
    },
    hover: {}
  };

  const iconVariants = {
    hidden: { rotate: -12, y: 0, scale: 0.9, opacity: 0.6 },
    visible: { rotate: -8, y: 0, scale: 1, opacity: 1, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } },
    hover: { 
      rotate: [0, -3, 3, 0], 
      y: -8, 
      scale: 1.12, 
      transition: { 
        rotate: { duration: 0.5, ease: "easeInOut" },
        y: { type: 'spring', stiffness: 300, damping: 20 },
        scale: { duration: 0.3 }
      } 
    }
  };

  const accentVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: { scaleX: 0, opacity: 1, transition: { duration: 0.4 } },
    hover: { 
      scaleX: 1, 
      transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] } 
    }
  };

  const cardBgVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    hover: { 
      background: 'linear-gradient(90deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
      transition: { duration: 0.4 } 
    }
  };

  const labelVariants = {
    hidden: { x: 0 },
    hover: { x: 8, transition: { duration: 0.3, ease: "easeOut" } }
  };

  const descriptionVariants = {
    hidden: { opacity: 0.8 },
    hover: { opacity: 1, transition: { duration: 0.3 } }
  };

  const glowVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 0, scale: 1 },
    hover: { 
      opacity: [0, 0.15, 0],
      scale: [1, 1.2, 1.4],
      transition: { duration: 1.2, ease: "easeOut" }
    }
  };

  return (
    <section className="bg-[#0b0b0b] text-white py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl md:text-5xl font-extrabold leading-tight"
        >
          <span className="block">Benefits of</span>
          <span className="block">working with us</span>
        </motion.h2>

        <motion.div 
          className="mt-6 border-t border-sage-accent/30" 
          initial={{ scaleX: 0, originX: 0 }} 
          whileInView={{ scaleX: 1 }} 
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} className="mt-8 space-y-6 md:space-y-8">
          {items.map((it, idx) => (
            <motion.div
              key={idx}
              variants={item}
              whileHover="hover"
              whileFocus="hover"
              className="relative grid grid-cols-12 gap-4 items-start md:items-center rounded-lg p-3 md:p-4 cursor-pointer overflow-hidden"
              tabIndex={0}
              role="group"
              aria-label={`Benefit: ${it.label}`}
            >
              {/* Glow effect on hover */}
              <motion.div 
                variants={glowVariants}
                className="absolute inset-0 bg-sage-accent/20 blur-2xl pointer-events-none"
              />
              
              {/* animated accent bar */}
              <motion.div 
                variants={accentVariants} 
                className="absolute left-0 top-0 bottom-0 w-[3px] origin-left rounded-r bg-gradient-to-b from-sage-accent via-sage-accent to-sage-accent/50"
              />

              <div className="col-span-2 md:col-span-1 flex items-start md:items-center justify-center relative z-10">
                <motion.div 
                  variants={iconVariants} 
                  className="relative rounded-full border border-sage-accent/30 p-3 bg-sage-card shadow-sm"
                >
                  {/* Icon glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-sage-accent/10"
                    initial={{ opacity: 0, scale: 1 }}
                    whileHover={{ 
                      opacity: [0, 0.3, 0],
                      scale: [1, 1.3, 1.5],
                      transition: { duration: 0.6 }
                    }}
                  />
                  {it.icon}
                </motion.div>
              </div>

              <motion.div variants={cardBgVariants} className="col-span-10 md:col-span-11 pl-2 md:pl-6 relative z-10">
                <div className="flex items-start md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <motion.div 
                      variants={labelVariants}
                      className="text-xs uppercase font-semibold tracking-widest text-sage-accent/90"
                    >
                      {it.label}
                    </motion.div>

                    <motion.p 
                      variants={descriptionVariants}
                      className="mt-3 text-sm md:text-base text-sage-text max-w-3xl"
                    >
                      {it.description}
                    </motion.p>
                  </div>
                </div>

                {idx !== items.length - 1 && (
                  <motion.div 
                    className="mt-6 border-t border-sage-accent/10"
                    initial={{ scaleX: 0, originX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};