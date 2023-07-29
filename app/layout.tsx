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
  

  return (
    <ReactQueryProvider>
      <html lang="en">
        <body>
            {children}
        </body>
      </html>
    </ReactQueryProvider>
  );
}
