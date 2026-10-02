import { IoMdHome } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import {
  FaImages,
  FaLink,
  FaLinkedinIn,
  FaListUl,
  FaRegCalendar,
  FaTags,
  FaWhatsapp,
} from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { TbCameraFilled } from "react-icons/tb";
import { HiShare } from "react-icons/hi";
import { FaArrowLeftLong, FaXTwitter } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { dataBlog } from "../../data/posts";

const getHeadings = (content) => {
  if (!content) return [];

  return content
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line, index) => ({
      id: `section-${index}`,
      text: line.replace("## ", ""),
    }));
};

const renderContent = (content) => {
  if (!content) return null;

  return content.split("\n\n").map((part, index) => {
    if (part.startsWith("## ")) {
      return (
        <h2
          key={index}
          id={`section-${index}`}
          className="text-2xl md:text-3xl font-bold text-white mt-14 mb-6 flex items-center gap-4 scroll-mt-24"
        >
          <span className="flex items-center justify-center w-10 h-10 bg-orange-500/10 rounded-xl border border-orange-500/30">
            <TbCameraFilled className="text-orange-500 text-4xl" />
          </span>

          {part.replace("## ", "")}
        </h2>
      );
    }

    return (
      <p key={index} className="text-neutral-300 leading-relaxed mb-6 text-lg">
        {part}
      </p>
    );
  });
};

export default function BlogDetails() {
  const { slug } = useParams();
  const post = dataBlog.posts.find((p) => p.slug === slug);

  return (
    <article className="bg-[#0a0a0a] min-h-screen">
      <div className="relative h-[60vh] min-h-125 overflow-hidden">
        <img
          alt={post?.title}
          className="absolute inset-0 w-full h-full object-cover"
          src={post?.image}
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a]/30 to-transparent" />
        <div className="absolute top-8 right-8 left-8">
          <nav className="inline-flex items-center gap-2 px-4 py-2 bg-black/30 backdrop-blur-md rounded-full text-sm border border-white/10">
            <a
              className="text-white/70 hover:text-white transition-colors"
              href="/"
              data-discover="true"
            >
              <IoMdHome className="text-xl" />
            </a>
            <IoIosArrowBack className="fa-solid fa-chevron-left text-white/30 text-lg" />
            <a
              className="text-white/70 hover:text-white transition-colors"
              href="/blog"
              data-discover="true"
            >
              المدونة
            </a>
            <IoIosArrowBack className="fa-solid fa-chevron-left text-white/30 text-lg" />
            <span className="text-orange-400 font-medium truncate max-w-50">
              بورتريه
            </span>
          </nav>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <a
                className="px-4 py-2 bg-orange-500 text-white text-sm font-bold rounded-full hover:bg-orange-600 transition-colors"
                href="/blog?category=بورتريه"
                data-discover="true"
              >
                {post?.category}
              </a>
              <div className="flex items-center gap-4 text-white/70 text-sm">
                <span className="flex items-center gap-2">
                  <FaRegCalendar />
                  {post?.date}
                </span>
                <span className="flex items-center gap-2">
                  <FaRegClock />
                  {post?.readTime}
                </span>
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight max-w-4xl">
              {post?.title}
            </h1>
            <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 w-fit">
              <img
                alt={post?.author.name}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-orange-500/50"
                src={post?.author.avatar}
              />
              <div>
                <p className="font-bold text-white">{post?.author.name}</p>
                <p className="text-sm text-white/60">{post?.author.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-[1fr_300px] gap-12">
          <div className="order-2 lg:order-1">
            <div className="p-6 bg-linear-to-r from-orange-500/10 to-yellow-500/5 rounded-2xl border border-orange-500/20 mb-10">
              <p className="text-lg text-neutral-200 leading-relaxed italic">
                {post?.excerpt}
              </p>
            </div>
            <div className="prose-custom">{renderContent(post?.content)}</div>
            <div className="mt-14 p-6 bg-[#111111] rounded-2xl border border-[#262626]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center border border-orange-500/30">
                  <FaTags className="text-orange-500" />
                </div>
                <h3 className="font-bold text-white">الوسوم</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-2 bg-[#1a1a1a] text-neutral-400 text-sm rounded-full border border-[#262626] hover:border-orange-500/50 hover:text-orange-500 transition-colors cursor-pointer">
                  #بورتريه
                </span>
                <span className="px-4 py-2 bg-[#1a1a1a] text-neutral-400 text-sm rounded-full border border-[#262626] hover:border-orange-500/50 hover:text-orange-500 transition-colors cursor-pointer">
                  #تصوير أشخاص
                </span>
                <span className="px-4 py-2 bg-[#1a1a1a] text-neutral-400 text-sm rounded-full border border-[#262626] hover:border-orange-500/50 hover:text-orange-500 transition-colors cursor-pointer">
                  #إضاءة طبيعية
                </span>
              </div>
            </div>
            <div className="mt-6 p-6 bg-[#111111] rounded-2xl border border-[#262626]">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center border border-orange-500/30">
                    <HiShare className="text-orange-500" />
                  </div>
                  <h3 className="font-bold text-white">شارك المقال</h3>
                </div>
                <div className="flex gap-2">
                  <button className="w-11 h-11 bg-[#1a1a1a] border border-[#262626] rounded-xl flex items-center justify-center text-neutral-400 hover:bg-[#1da1f2] hover:text-white hover:border-transparent transition-all duration-300">
                    <FaXTwitter />
                  </button>
                  <button className="w-11 h-11 bg-[#1a1a1a] border border-[#262626] rounded-xl flex items-center justify-center text-neutral-400 hover:bg-[#0077b5] hover:text-white hover:border-transparent transition-all duration-300">
                    <FaLinkedinIn />
                  </button>
                  <button className="w-11 h-11 bg-[#1a1a1a] border border-[#262626] rounded-xl flex items-center justify-center text-neutral-400 hover:bg-[#25d366] hover:text-white hover:border-transparent transition-all duration-300">
                    <FaWhatsapp />
                  </button>
                  <button className="w-11 h-11 bg-[#1a1a1a] border border-[#262626] rounded-xl flex items-center justify-center text-neutral-400 hover:bg-orange-500 hover:text-white hover:border-transparent transition-all duration-300">
                    <FaLink />
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-6 p-8 bg-linear-to-br from-[#161616] to-[#111111] rounded-2xl border border-[#262626]">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <img
                  alt="محمد علي"
                  className="w-24 h-24 rounded-2xl object-cover ring-4 ring-orange-500/20"
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
                />
                <div className="text-center sm:text-right flex-1">
                  <span className="text-xs text-orange-500 font-semibold uppercase tracking-wider">
                    كاتب المقال
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    محمد علي
                  </h3>
                  <p className="text-neutral-500 text-sm mb-3">مصور بورتريه</p>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    مصور محترف شغوف بمشاركة المعرفة والخبرات في عالم التصوير
                    الفوتوغرافي.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <aside className="order-1 lg:order-2">
            <div className="lg:sticky lg:top-24 space-y-6">
              <div className="p-6 bg-[#111111] rounded-2xl border border-[#262626]">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center border border-orange-500/30">
                    <FaListUl className="text-orange-500" />
                  </div>
                  <h3 className="font-bold text-white">محتويات المقال</h3>
                </div>
                <nav className="space-y-2">
                  {getHeadings(post?.content).map((heading, index) => (
                    <a
                      key={heading.id}
                      href={`#${heading.id}`}
                      className="flex items-center gap-3 p-3 rounded-xl text-neutral-400 hover:text-orange-500 hover:bg-orange-500/5 transition-all duration-300 group"
                    >
                      <span className="flex items-center justify-center w-6 h-6 bg-[#1a1a1a] rounded-lg text-xs font-bold text-neutral-500 group-hover:bg-orange-500/10 group-hover:text-orange-500 transition-colors">
                        {index + 1}
                      </span>

                      <span className="text-sm">{heading.text}</span>
                    </a>
                  ))}
                </nav>
              </div>
              <div className="p-6 bg-[#111111] rounded-2xl border border-[#262626]">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-[#0a0a0a] rounded-xl">
                    <FaRegClock className=" self-center text-orange-500 text-xl mb-2" />
                    <p className="text-white font-bold">6 دقائق للقراءة</p>
                    <p className="text-neutral-500 text-xs">وقت القراءة</p>
                  </div>
                  <div className="text-center p-4 bg-[#0a0a0a] rounded-xl">
                    <FaRegCalendar className=" text-orange-500 text-xl mb-2" />
                    <p className="text-white font-bold text-sm">١٢ يناير</p>
                    <p className="text-neutral-500 text-xs">تاريخ النشر</p>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-linear-to-br from-orange-500/10 to-yellow-500/5 rounded-2xl border border-orange-500/20">
                <div className="text-center">
                  <div className="w-14 h-14 bg-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <IoMail className="text-orange-500 text-2xl" />
                  </div>
                  <h3 className="font-bold text-white mb-2">لا تفوّت جديدنا</h3>
                  <p className="text-neutral-400 text-sm mb-4">
                    اشترك للحصول على أحدث المقالات
                  </p>
                  <a
                    className="block w-full py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors text-center"
                    href="/blog"
                    data-discover="true"
                  >
                    تصفح المزيد
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
        <div className="mt-20 pt-12 border-t border-[#262626]">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <span className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center border border-orange-500/30">
                <FaImages className="text-orange-500 text-xl" />
              </span>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  مقالات قد تعجبك
                </h2>
                <p className="text-neutral-500 text-sm">
                  استكشف المزيد من المحتوى المميز
                </p>
              </div>
            </div>
            <a
              className="hidden sm:flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors group"
              href="/blog"
              data-discover="true"
            >
              عرض الكل
              <FaArrowLeftLong className="fa-solid fa-arrow-left group-hover:-translate-x-1 transition-transform" />
            </a>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <a
              className="group relative bg-[#111111] rounded-2xl overflow-hidden border border-[#262626] hover:border-orange-500/30 transition-all duration-500"
              href="/blog/street-photography-guide"
              data-discover="true"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  alt="تصوير الشارع: فن التقاط الحياة اليومية"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  src="https://images.unsplash.com/photo-1517732306149-e8f829eb588a?w=800&h=400&fit=crop"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#111111] to-transparent" />
                <span className="absolute top-4 right-4 px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
                  بورتريه
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-white group-hover:text-orange-500 transition-colors line-clamp-2 mb-3">
                  تصوير الشارع: فن التقاط الحياة اليومية
                </h3>
                <div className="flex items-center justify-between text-sm text-neutral-500">
                  <span className="flex items-center gap-2">
                    <img
                      alt="نادر سعيد"
                      className="w-6 h-6 rounded-full"
                      src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=100&h=100&fit=crop&crop=face"
                    />
                    نادر سعيد
                  </span>
                  <span>7 دقائق للقراءة</span>
                </div>
              </div>
            </a>
            <a
              className="group relative bg-[#111111] rounded-2xl overflow-hidden border border-[#262626] hover:border-orange-500/30 transition-all duration-500"
              href="/blog/wedding-photography-guide"
              data-discover="true"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  alt="تصوير حفلات الزفاف: دليل المصور المحترف"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=400&fit=crop"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#111111] to-transparent" />
                <span className="absolute top-4 right-4 px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
                  بورتريه
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-white group-hover:text-orange-500 transition-colors line-clamp-2 mb-3">
                  تصوير حفلات الزفاف: دليل المصور المحترف
                </h3>
                <div className="flex items-center justify-between text-sm text-neutral-500">
                  <span className="flex items-center gap-2">
                    <img
                      alt="منصور الزهراني"
                      className="w-6 h-6 rounded-full"
                      src="https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=100&h=100&fit=crop&crop=face"
                    />
                    منصور الزهراني
                  </span>
                  <span>11 دقائق للقراءة</span>
                </div>
              </div>
            </a>
            <a
              className="group relative bg-[#111111] rounded-2xl overflow-hidden border border-[#262626] hover:border-orange-500/30 transition-all duration-500"
              href="/blog/sports-action-photography"
              data-discover="true"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  alt="تصوير الرياضة والحركة: تجميد اللحظة الحاسمة"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=400&fit=crop"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#111111] to-transparent" />
                <span className="absolute top-4 right-4 px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
                  بورتريه
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-white group-hover:text-orange-500 transition-colors line-clamp-2 mb-3">
                  تصوير الرياضة والحركة: تجميد اللحظة الحاسمة
                </h3>
                <div className="flex items-center justify-between text-sm text-neutral-500">
                  <span className="flex items-center gap-2">
                    <img
                      alt="أحمد الشهري"
                      className="w-6 h-6 rounded-full"
                      src="https://images.unsplash.com/photo-1580518324671-c2f0833a3af3?w=100&h=100&fit=crop&crop=face"
                    />
                    أحمد الشهري
                  </span>
                  <span>10 دقائق للقراءة</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
