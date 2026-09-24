import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <SEO title="Page Not Found" description="The page you're looking for doesn't exist." path={location.pathname} />
      <section className="container py-24 md:py-32">
        <p className="font-heading text-8xl font-semibold text-moss md:text-9xl">404</p>
        <h1 className="mt-4 font-heading text-4xl font-semibold md:text-5xl">This page doesn't exist.</h1>
        <p className="mt-4 max-w-lg text-[1.05rem] text-muted-foreground">
          The link may be broken or the page may have moved. Use the links below to find what you need.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/" className="btn-dark">Go to homepage</Link>
          <Link to="/services" className="btn-outline">Our services</Link>
          <Link to="/contact" className="btn-outline">Contact us</Link>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
