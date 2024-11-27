import { mockNews } from "@/api/news";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 mt-12 w-full max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-10">ข่าว (CMS Dashboard) ล่าสุด</h1>
        <div className="grid gap-6">
          {mockNews.map((news) => (
            <a
              key={news.id}
              href={news.link}
              className="block p-4 rounded-lg border border-gray-200"
            >
              <div className="flex items-start gap-4">
                <div className="relative w-48 h-28 flex-shrink-0">
                  <Image
                    src={news.image}
                    alt={news.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-blue-600">
                    {news.title}
                  </h2>
                  <div className="flex items-center text-sm mt-2">
                    <div className="flex gap-2 mr-3">
                      {news.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-gray-600 font-medium">{news.date}</span>
                  </div>
                  <p
                    className="text-sm text-gray-800 mt-2 line-clamp-2 leading-relaxed"
                  >
                    {news.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
