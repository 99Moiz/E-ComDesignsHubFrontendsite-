import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Spotlight from "@/components/motion/Spotlight";
import FloatingShapes from "@/components/motion/FloatingShapes";
import Magnetic from "@/components/motion/Magnetic";
import TextReveal from "@/components/motion/TextReveal";
import SEO from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-5">
      <SEO title="Page Not Found" description="The page you're looking for doesn't exist." path={location.pathname} />
      <Spotlight color="var(--primary)" size={640} opacity={0.14} />
      <FloatingShapes variant="mixed" />
      <div className="bg-grid-pattern absolute inset-0 opacity-[0.35]" />

      <div className="container relative mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="eyebrow mb-6 justify-center"
        >
          <span className="text-accent">Error</span> — page not found
        </motion.p>

        {/* Giant glitchy 404 */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-gradient font-heading text-[26vw] font-extrabold leading-none tracking-tighter md:text-[18rem]"
        >
          404
        </motion.h1>

        <TextReveal
          as="h2"
          text="This page wandered off."
          highlight={["off."]}
          className="mt-2 font-heading text-2xl font-bold md:text-4xl"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mx-auto mt-5 max-w-md text-muted-foreground"
        >
          The link may be broken, or the page may have been moved. Let's get you
          back to somewhere that exists.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-10"
        >
          <Magnetic>
            <Link
              to="/"
              className="btn-pill"
            >
              Back to home
              <span className="btn-pill-arrow">
                <ArrowLeft size={15} />
              </span>
            </Link>
          </Magnetic>
        </motion.div>
      </div>
    </main>
  );
};

export default NotFound;
