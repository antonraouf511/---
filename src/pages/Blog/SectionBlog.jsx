import { useState } from "react";
import Card from "./Card";
import { dataBlog } from "../../data/posts";
export default function SectionBlog() {
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const normalizedPosts = dataBlog.posts.map((post) => ({
    ...post,
    imageUrl: post.image,
    authorName: post.author.name,
    authorImage: post.author.avatar,
    role: post.author.role,
  }));

  const [activeCategory, setActiveCategory] = useState("جميع المقالات");

  const categories = dataBlog.categories;

  // search
  const [searchQuery, setSearchQuery] = useState("");

  const searchFilteredPosts = normalizedPosts.filter((post) => {
    return (
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLocaleLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  const filteredPosts =
    activeCategory === "جميع المقالات"
      ? searchFilteredPosts
      : searchFilteredPosts.filter((post) => post.category === activeCategory);

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);

  const currentItems = filteredPosts.slice(startIndex, endIndex);

  return (
    <>
      <main className="grow">
        <div className="min-h-screen bg-[#0a0a0a]">
          <div className="relative py-20 overflow-hidden">
            <div className="absolute inset-0 bg-[#0a0a0a]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(38,38,38,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(38,38,38,0.5)_1px,transparent_1px)] bg-size-[60px_60px]" />
            <div className="absolute inset-0">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
            </div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <span className="section-label inline-flex items-center gap-2 mb-6">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
                مدونتنا
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                استكشف <span className="gradient-text">مقالاتنا</span>
              </h1>
              <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
                اكتشف الدروس والرؤى وأفضل الممارسات للتطوير الحديث
              </p>
            </div>
          </div>
          <div className="sticky top-20 z-40 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-[#262626]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                {/* search   */}
                <div className="relative w-full md:w-80">
                  <input
                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                    placeholder="ابحث في المقالات..."
                    className="input-dark w-full px-5 py-3 pr-12"
                    id="blog-search"
                    name="blog-search"
                    type="text"
                  />
                  <svg
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  <button
                    onClick={() => {
                      setActiveCategory("جميع المقالات");
                      setCurrentPage(1);
                    }}
                    className={
                      activeCategory === "جميع المقالات"
                        ? "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 bg-linear-to-r from-orange-500 to-orange-600 text-white"
                        : "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 bg-[#161616] text-neutral-400 border border-[#262626] hover:border-orange-500/30"
                    }
                  >
                    جميع المقالات
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => {
                        setActiveCategory(cat.name);
                        setCurrentPage(1);
                      }}
                      className={
                        cat.name === activeCategory
                          ? "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 bg-linear-to-r from-orange-500 to-orange-600 text-white"
                          : "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 bg-[#161616] text-neutral-400 border border-[#262626] hover:border-orange-500/30"
                      }
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-36.5">
            <div className="mb-8 flex items-center justify-between">
              <p className="text-neutral-400">
                عرض <span className="font-bold text-white">{filteredPosts.length}</span> مقالات
              </p>
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-[#161616] border border-[#262626] rounded-xl p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      viewMode === "grid"
                        ? "bg-orange-500 text-white"
                        : "text-neutral-400 hover:text-white"
                    }`}
                    title="عرض شبكي"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      viewMode === "list"
                        ? "bg-orange-500 text-white"
                        : "text-neutral-400 hover:text-white"
                    }`}
                    title="عرض قائمة"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
                </div>
                {activeCategory !== "جميع المقالات" ? (
                  <button
                    onClick={() => setActiveCategory("جميع المقالات")}
                    className="text-sm text-neutral-500 hover:text-orange-500 flex items-center gap-1 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    مسح الفلاتر
                  </button>
                ) : null}
              </div>
            </div>
            <div
              className={
                viewMode === "grid"
                  ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                  : "flex flex-col gap-6"
              }
            >
              {currentItems.map((post) => (
                <Card key={post.id} viewMode={viewMode} {...post} />
              ))}
            </div>
            <div className="flex justify-center items-center gap-2 mt-12">
              {/* Previous */}
              <button
                onClick={() => setCurrentPage((prev) => prev - 1)}
                disabled={currentPage === 1}
                className={`p-3 rounded-xl border transition-all duration-300 ${
                  currentPage === 1
                    ? "bg-[#0a0a0a] border-[#262626] text-neutral-600 cursor-not-allowed"
                    : "bg-[#161616] border-[#262626] text-white hover:border-orange-500/50 hover:bg-[#1a1a1a]"
                }`}
              >
                <svg
                  className="w-5 h-5 rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Pages */}
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, index) => {
                  const page = index + 1;

                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`min-w-11 h-11 rounded-xl text-sm font-medium transition-all duration-300 ${
                        currentPage === page
                          ? "bg-linear-to-r from-orange-500 to-orange-600 text-white"
                          : "bg-[#161616] text-neutral-400 border border-[#262626] hover:border-orange-500/50 hover:text-white"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              {/* Next */}
              <button
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={currentPage === totalPages}
                className={`p-3 rounded-xl border transition-all duration-300 ${
                  currentPage === totalPages
                    ? "bg-[#0a0a0a] border-[#262626] text-neutral-600 cursor-not-allowed"
                    : "bg-[#161616] border-[#262626] text-white hover:border-orange-500/50 hover:bg-[#1a1a1a]"
                }`}
              >
                <svg
                  className="w-5 h-5 rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
            <p className="text-center text-neutral-500 mt-4 text-sm">
              صفحة {currentPage} من {totalPages}
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

{
  /* <article
                className={
                  viewMode === "list"
                    ? "group bg-[#161616] rounded-2xl border border-[#262626] hover:border-orange-500/30 transition-all duration-500 overflow-hidden"
                    : "group card overflow-hidden"
                }
                style={{ animationDelay: "0ms" }}
              >
                <a
                  className={
                    viewMode === "list" ? "flex flex-row-reverse" : "block"
                  }
                  href="/blog/mastering-golden-hour-photography"
                  data-discover="true"
                >
                  <div
                    className={
                      viewMode === "list"
                        ? "w-64 shrink-0"
                        : "relative h-52 overflow-hidden"
                    }
                  >
                    <img
                      alt="إتقان تصوير الساعة الذهبية: دليل شامل"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      src="https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=800&h=400&fit=crop"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-[#0a0a0a]/80 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-[#333333]">
                        إضاءة
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-sm text-neutral-500 mb-3">
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        8 دقائق للقراءة
                      </span>
                      <span className="w-1 h-1 bg-neutral-600 rounded-full" />
                      <span>١٥ يناير ٢٠٢٦</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-500 transition-colors duration-300 line-clamp-2 leading-tight">
                      إتقان تصوير الساعة الذهبية: دليل شامل
                    </h3>
                    <p className="text-neutral-400 mb-5 line-clamp-2 text-sm leading-relaxed">
                      تعلم كيفية التقاط صور مذهلة خلال الساعة الذهبية مع نصائح
                      احترافية حول الإضاءة والتكوين.
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-[#262626]">
                      <div className="flex items-center gap-3">
                        <img
                          alt="سالم أحمد"
                          className="w-9 h-9 rounded-full object-cover ring-2 ring-[#262626]"
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                        />
                        <div>
                          <p className="text-sm font-medium text-white">
                            سالم أحمد
                          </p>
                          <p className="text-xs text-neutral-500">مصور محترف</p>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500 transition-colors duration-300 border border-orange-500/20 group-hover:border-transparent">
                        <svg
                          className="w-4 h-4 text-orange-500 group-hover:text-white transition-colors duration-300 rotate-180"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
              </article>
              <article
                className="group card overflow-hidden"
                style={{ animationDelay: "100ms" }}
              >
                <a
                  className="block"
                  href="/blog/portrait-photography-secrets"
                  data-discover="true"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      alt="أسرار تصوير البورتريه: كيف تلتقط روح الشخصية"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-[#0a0a0a]/80 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-[#333333]">
                        بورتريه
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-sm text-neutral-500 mb-3">
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        6 دقائق للقراءة
                      </span>
                      <span className="w-1 h-1 bg-neutral-600 rounded-full" />
                      <span>١٢ يناير ٢٠٢٦</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-500 transition-colors duration-300 line-clamp-2 leading-tight">
                      أسرار تصوير البورتريه: كيف تلتقط روح الشخصية
                    </h3>
                    <p className="text-neutral-400 mb-5 line-clamp-2 text-sm leading-relaxed">
                      اكتشف تقنيات احترافية لتصوير بورتريهات تعبيرية تكشف عن
                      شخصية الموضوع الحقيقية.
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-[#262626]">
                      <div className="flex items-center gap-3">
                        <img
                          alt="محمد علي"
                          className="w-9 h-9 rounded-full object-cover ring-2 ring-[#262626]"
                          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
                        />
                        <div>
                          <p className="text-sm font-medium text-white">
                            محمد علي
                          </p>
                          <p className="text-xs text-neutral-500">
                            مصور بورتريه
                          </p>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500 transition-colors duration-300 border border-orange-500/20 group-hover:border-transparent">
                        <svg
                          className="w-4 h-4 text-orange-500 group-hover:text-white transition-colors duration-300 rotate-180"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
              </article>
              <article
                className="group card overflow-hidden"
                style={{ animationDelay: "200ms" }}
              >
                <a
                  className="block"
                  href="/blog/landscape-photography-guide"
                  data-discover="true"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      alt="دليل تصوير المناظر الطبيعية: من المبتدئ إلى المحترف"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-[#0a0a0a]/80 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-[#333333]">
                        مناظر طبيعية
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-sm text-neutral-500 mb-3">
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        10 دقائق للقراءة
                      </span>
                      <span className="w-1 h-1 bg-neutral-600 rounded-full" />
                      <span>١٠ يناير ٢٠٢٦</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-500 transition-colors duration-300 line-clamp-2 leading-tight">
                      دليل تصوير المناظر الطبيعية: من المبتدئ إلى المحترف
                    </h3>
                    <p className="text-neutral-400 mb-5 line-clamp-2 text-sm leading-relaxed">
                      استكشف تقنيات تصوير المناظر الطبيعية الخلابة وكيفية التقاط
                      جمال الطبيعة بعدستك.
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-[#262626]">
                      <div className="flex items-center gap-3">
                        <img
                          alt="إبراهيم حسن"
                          className="w-9 h-9 rounded-full object-cover ring-2 ring-[#262626]"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                        />
                        <div>
                          <p className="text-sm font-medium text-white">
                            إبراهيم حسن
                          </p>
                          <p className="text-xs text-neutral-500">مصور طبيعة</p>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500 transition-colors duration-300 border border-orange-500/20 group-hover:border-transparent">
                        <svg
                          className="w-4 h-4 text-orange-500 group-hover:text-white transition-colors duration-300 rotate-180"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
              </article>
              <article
                className="group card overflow-hidden"
                style={{ animationDelay: "300ms" }}
              >
                <a
                  className="block"
                  href="/blog/camera-settings-basics"
                  data-discover="true"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      alt="أساسيات إعدادات الكاميرا: مثلث التعريض الضوئي"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=400&fit=crop"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-[#0a0a0a]/80 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-[#333333]">
                        تقنيات
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-sm text-neutral-500 mb-3">
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        7 دقائق للقراءة
                      </span>
                      <span className="w-1 h-1 bg-neutral-600 rounded-full" />
                      <span>٨ يناير ٢٠٢٦</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-500 transition-colors duration-300 line-clamp-2 leading-tight">
                      أساسيات إعدادات الكاميرا: مثلث التعريض الضوئي
                    </h3>
                    <p className="text-neutral-400 mb-5 line-clamp-2 text-sm leading-relaxed">
                      افهم العلاقة بين فتحة العدسة وسرعة الغالق وحساسية ISO
                      للتحكم الكامل في صورك.
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-[#262626]">
                      <div className="flex items-center gap-3">
                        <img
                          alt="داود خالد"
                          className="w-9 h-9 rounded-full object-cover ring-2 ring-[#262626]"
                          src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face"
                        />
                        <div>
                          <p className="text-sm font-medium text-white">
                            داود خالد
                          </p>
                          <p className="text-xs text-neutral-500">مدرب تصوير</p>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500 transition-colors duration-300 border border-orange-500/20 group-hover:border-transparent">
                        <svg
                          className="w-4 h-4 text-orange-500 group-hover:text-white transition-colors duration-300 rotate-180"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
              </article>
              <article
                className="group card overflow-hidden"
                style={{ animationDelay: "400ms" }}
              >
                <a
                  className="block"
                  href="/blog/photo-composition-rules"
                  data-discover="true"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      alt="قواعد التكوين الفوتوغرافي: كيف تجعل صورك أكثر جاذبية"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=400&fit=crop"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-[#0a0a0a]/80 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-[#333333]">
                        تقنيات
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-sm text-neutral-500 mb-3">
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        9 دقائق للقراءة
                      </span>
                      <span className="w-1 h-1 bg-neutral-600 rounded-full" />
                      <span>٥ يناير ٢٠٢٦</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-500 transition-colors duration-300 line-clamp-2 leading-tight">
                      قواعد التكوين الفوتوغرافي: كيف تجعل صورك أكثر جاذبية
                    </h3>
                    <p className="text-neutral-400 mb-5 line-clamp-2 text-sm leading-relaxed">
                      تعلم قواعد التكوين الأساسية التي يستخدمها المصورون
                      المحترفون لإنشاء صور مؤثرة بصرياً.
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-[#262626]">
                      <div className="flex items-center gap-3">
                        <img
                          alt="ليث محمود"
                          className="w-9 h-9 rounded-full object-cover ring-2 ring-[#262626]"
                          src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face"
                        />
                        <div>
                          <p className="text-sm font-medium text-white">
                            ليث محمود
                          </p>
                          <p className="text-xs text-neutral-500">فنان بصري</p>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500 transition-colors duration-300 border border-orange-500/20 group-hover:border-transparent">
                        <svg
                          className="w-4 h-4 text-orange-500 group-hover:text-white transition-colors duration-300 rotate-180"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
              </article>
              <article
                className="group card overflow-hidden"
                style={{ animationDelay: "500ms" }}
              >
                <a
                  className="block"
                  href="/blog/mobile-photography-tips"
                  data-discover="true"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      alt="تصوير الهاتف المحمول: كيف تلتقط صوراً احترافية بهاتفك"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-[#0a0a0a]/80 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-[#333333]">
                        معدات
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-sm text-neutral-500 mb-3">
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        8 دقائق للقراءة
                      </span>
                      <span className="w-1 h-1 bg-neutral-600 rounded-full" />
                      <span>٣ يناير ٢٠٢٦</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-500 transition-colors duration-300 line-clamp-2 leading-tight">
                      تصوير الهاتف المحمول: كيف تلتقط صوراً احترافية بهاتفك
                    </h3>
                    <p className="text-neutral-400 mb-5 line-clamp-2 text-sm leading-relaxed">
                      اكتشف كيف تحول هاتفك الذكي إلى أداة تصوير قوية مع هذه
                      النصائح والتقنيات.
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-[#262626]">
                      <div className="flex items-center gap-3">
                        <img
                          alt="جمال عبدالله"
                          className="w-9 h-9 rounded-full object-cover ring-2 ring-[#262626]"
                          src="https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop&crop=face"
                        />
                        <div>
                          <p className="text-sm font-medium text-white">
                            جمال عبدالله
                          </p>
                          <p className="text-xs text-neutral-500">
                            مصور ومراجع تقني
                          </p>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500 transition-colors duration-300 border border-orange-500/20 group-hover:border-transparent">
                        <svg
                          className="w-4 h-4 text-orange-500 group-hover:text-white transition-colors duration-300 rotate-180"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
              </article> */
}
