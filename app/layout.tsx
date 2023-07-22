import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import "./styles/globals.css";
import { ReactQueryProvider } from "./providers/ReactQueryProvieder";
import { url } from "./constants/constants";

export const metadata = {
  title: "Avalanche",
  description: "E-commerce site",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const res = await fetch(`${url}/api/categories?populate=subcategories`);
  const categories = await res.json();

  return (
    <ReactQueryProvider>
      <html lang="en">
        <script src="https://unpkg.com/pdfjs-dist/build/pdf.min.js"></script>
        <script src="https://unpkg.com/pdfjs-dist/build/pdf.worker.min.js"></script>
        <body>
          <div>
            <Navbar categories={categories.data} />
            {children}
            <Footer />
          </div>
        </body>
      </html>
    </ReactQueryProvider>
  );
}
