import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  /** Header floats transparently over the first section (home page hero) */
  overlayHeader?: boolean;
  /** Hide the footer's "Have a project in mind?" strip (pages that already end with a form) */
  hideFooterCta?: boolean;
}

const Layout = ({ children, overlayHeader = false, hideFooterCta = false }: LayoutProps) => (
  <div className="flex min-h-screen flex-col bg-background">
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:shadow"
    >
      Skip to content
    </a>
    <Navbar overlay={overlayHeader} />
    <main id="main" className="flex-1">
      {children}
    </main>
    <Footer hideCta={hideFooterCta} />
  </div>
);

export default Layout;
