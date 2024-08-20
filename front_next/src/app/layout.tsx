import type { Metadata } from "next";
import "@/styles/global.css";


export const metadata: Metadata = {
  title: "ITU Asist",
  description: "Created for ITU student and my <3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <div className="relative h-full w-full">
        <div
		    className="fixed inset-0 bg-[url('/images/itu-eef.jpg')] bg-no-repeat bg-center bg-cover bg-fixed"
		    style={{
		  	filter: 'blur(8px)',
		  	WebkitFilter: 'blur(8px)',
		    }}
		    ></div>
        {children}
        </div>

      </body>
    </html>
  );
}
