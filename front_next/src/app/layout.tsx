import type { Metadata } from "next";
import "@/styles/global.css";




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <title>İTÜ CHAIN - Home</title>
        <meta name="description" content="İTÜ'lüler için gelişmiş önşart diagramı, ders programlarını  kolaylıkla oluşturlamaları için ders programlayıcı
        ve daha fazlası..." />
        <meta name="keywords" content="itü, itü,önşart diagramı,önşart , şenlikçi, ders programı" />

        <link rel="canonical" href="ituchain.vercel.app" />
      </head>
      <body>
      <div className="relative h-full w-full">
        <div
		    className="fixed inset-0 bg-[url('/images/itu-eef.jpg')] bg-no-repeat bg-center bg-cover bg-fixed"
		    style={{
		  	filter: 'blur(8px)',
		  	WebkitFilter: 'blur(8px)',
		    }}
		    ></div>
          <div className="relative z-10">{children}</div>
          <footer className="absolute w-full text-center z-10 bg-opacity-20 bg-black py-4">
            <p className="text-gray-300 text-sm italic">
              - Designed for Eijo with passion -
            </p>
          </footer>

        </div>
              
      </body>
    </html>
  );
}
