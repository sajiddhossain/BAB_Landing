/**
 * @file      About.tsx
 * @summary   Pagina "Chi siamo": missione, storia di Mia, founder, community (i18n).
 * @author    Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 */
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();

  const images = [
    "3AycctSWhDTcwrDl8YUS0jxhU.avif",
    "4TVwBEU1QFRvcfO9xe9DmcrDnk.avif",
    "HY2jAVYB5JU8HdxplxBzkh8TQo.avif",
    "Lk1n229r5pBnV0VjfyxuaNksAM8.avif",
    "VdqkhgkqBx24EcakOTkAIdtMLaw.avif",
    "XydzloXdRL8J9FrMqXFFS5kLMs.avif",
    "gn4nifj8VjjdDVeBKC8iUXQLM.avif",
    "s7ERbd0lTRYbrAOonOan3QUHnAI.avif"
  ];

  const stats = t('about.stats', { returnObjects: true }) as unknown as { val: string; label: string }[];
  const statColor = (i: number) => (i < 2 ? '#FFDE4D' : i < 4 ? '#DAE69A' : '#34BBC0');

  return (
    <div className="flex flex-col items-center w-full min-h-screen text-[#0F0F12] px-4 py-24 md:py-32">
      <div className="max-w-5xl mx-auto w-full">

        {/* HERO MISSION */}
        <section className="mb-24 mt-10">
          <div className="flex flex-col md:flex-row gap-8 items-center">

            <div className="flex-1 text-center md:text-left">
              <span className="inline-block bg-[#DAE993] border-[3px] border-black text-black font-black text-xs tracking-widest uppercase mb-6 px-4 py-1.5 shadow-[4px_4px_0_0_#0F0F12] skew-x-[-12deg] relative">
                <span className="block skew-x-[12deg]">{t('about.missionBadge')}</span>
              </span>
              <h1 className="font-['Bricolage_Grotesque',_sans-serif] text-5xl sm:text-7xl font-black leading-none uppercase drop-shadow-[4px_4px_0_rgba(52,187,192,1)] mb-6">
                <span className="underline decoration-[#34BBC0] decoration-8 underline-offset-4">{t('about.titleWord')}</span><br/>{t('about.titleRest')}
              </h1>
              <p className="font-extrabold text-lg leading-relaxed border-l-[4px] border-black pl-4">
                {t('about.missionLead')}
              </p>
            </div>

            <div className="flex-1 w-full">
              <div className="bg-white border-[4px] border-black p-2 shadow-[8px_8px_0_0_#0F0F12] skew-x-[-2deg]">
                <img
                  src="/fotobab/HY2jAVYB5JU8HdxplxBzkh8TQo.avif"
                  alt={t('about.photoAlt')}
                  className="w-full aspect-square md:aspect-video object-cover border-[3px] border-black grayscale hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                />
              </div>
            </div>

          </div>
        </section>

        {/* THE STORY OF MIA */}
        <section className="mb-32 mt-16 relative overflow-hidden px-2 sm:px-4">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0JyBoZWlnaHQ9JzQnPjxyZWN0IHdpZHRoPSc0JyBoZWlnaHQ9JzQnIGZpbGw9JyNmZmYnLz48cmVjdCB3aWR0aD0nMScgaGVpZ2h0PScxJyBmaWxsPScjY2NjJy8+PC9zdmc+')] opacity-50 -z-10" aria-hidden="true"></div>

          <div className="text-center mb-16 relative">
            <h2 className="font-['Bricolage_Grotesque',_sans-serif] text-4xl sm:text-5xl lg:text-6xl font-black uppercase inline-block bg-[#FFDE4D] border-[3px] md:border-[4px] border-black px-8 py-3 shadow-[8px_8px_0_0_#0F0F12] skew-x-[-6deg] relative z-10">
              <span className="block skew-x-[6deg]">{t('about.storyBadge')}</span>
            </h2>
          </div>

          <div className="flex flex-col items-center gap-12 sm:gap-16 max-w-3xl mx-auto mb-20 font-['Space_Grotesk',_sans-serif] font-extrabold text-lg sm:text-xl leading-relaxed">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
              className="relative self-start w-11/12 sm:w-4/5 transition-transform"
            >
              <div className="bg-black p-2 border-[4px] border-black shadow-[6px_6px_0_0_#0F0F12]">
                <div className="bg-[#FAF9F6] border-[3px] border-black p-6 sm:p-8 h-full">
                  {t('about.story1')}
                </div>
              </div>
            </motion.div>

            <div className="h-4 w-12 border-l-[3px] border-r-[3px] border-black/40 skew-x-[-12deg]" aria-hidden="true"></div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1], delay: 0.1 }}
              className="relative self-end w-11/12 sm:w-4/5 transition-transform"
            >
              <div className="bg-black p-2 border-[4px] border-black shadow-[6px_6px_0_0_#0F0F12]">
                <div className="bg-[#FAF9F6] border-[3px] border-black p-6 sm:p-8 h-full">
                  {t('about.story2pre')}<span className="font-['Bricolage_Grotesque',_sans-serif] bg-black text-white px-2 italic uppercase">{t('about.story2highlight')}</span>{t('about.story2post')}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1], delay: 0.2 }}
              className="relative w-64 sm:w-80 my-4 shadow-[12px_12px_0_0_#0F0F12] border-[4px] border-black bg-black group z-10 p-2 skew-x-[-2deg]"
            >
              <div className="bg-white p-2 sm:p-3 border-[3px] border-black skew-x-[2deg]">
                <img src="/fotobab/mia.avif" alt={t('about.miaCaption')} className="w-full aspect-square object-cover border-[3px] border-black grayscale group-hover:grayscale-0 transition-all duration-500" loading="lazy" />
                <div className="p-4 font-['Bricolage_Grotesque',_sans-serif] text-center font-black uppercase text-xl text-neutral-500">{t('about.miaCaption')}</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1], delay: 0.3 }}
              className="relative self-start w-11/12 sm:w-4/5 transition-transform"
            >
              <div className="bg-black p-2 border-[4px] border-black shadow-[6px_6px_0_0_#0F0F12]">
                <div className="bg-[#FAF9F6] border-[3px] border-black p-6 sm:p-8 h-full">
                  {t('about.story3')}
                </div>
              </div>
            </motion.div>

            <div className="h-4 w-12 border-l-[3px] border-r-[3px] border-black/40 skew-x-[12deg]" aria-hidden="true"></div>

            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1], delay: 0.4 }}
              className="relative w-full skew-x-[-2deg] transition-transform"
            >
              <div className="bg-[#DAE69A] p-2 md:p-3 border-[4px] border-black shadow-[8px_8px_0_0_#000]">
                <div className="bg-[#0F0F12] text-white border-[3px] border-black p-8 sm:p-10 h-full">
                  {t('about.story4pre')}<span className="underline decoration-4 underline-offset-4 decoration-[#FFDE4D]">{t('about.story4highlight')}</span>{t('about.story4post')}
                </div>
              </div>
            </motion.div>

          </div>

          <div className="text-center mb-24 relative">
            <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-auto -z-10 opacity-30" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path fill="#DAE69A" d="M42.7,-73.4C54.9,-66.3,64,-53.4,72.6,-40C81.2,-26.6,89.3,-13.3,88.7,-0.3C88.1,12.6,78.8,25.2,70.2,38C61.6,50.8,53.7,63.8,42.2,71.2C30.7,78.6,15.3,80.4,1.4,78C-12.5,75.6,-25,69,-37.2,61.8C-49.4,54.6,-61.3,46.8,-70.5,35.6C-79.7,24.4,-86.2,9.8,-85.4,-4.3C-84.6,-18.4,-76.5,-32,-66.4,-43C-56.3,-54,-44.2,-62.4,-31.6,-69.1C-19,-75.8,-5.9,-80.8,4.5,-88.7C14.9,-96.6,29.8,-86.8,42.7,-73.4Z" transform="translate(100 100) scale(1.1)" />
            </svg>

            <h3 className="font-['Bricolage_Grotesque',_sans-serif] text-5xl sm:text-7xl lg:text-[5.5rem] font-black uppercase leading-none drop-shadow-[4px_4px_0_rgba(0,0,0,1)] text-[#FFDE4D]">
              {t('about.bigA')}<br/><span className="underline decoration-[#DAE69A] decoration-8 underline-offset-4 text-white">{t('about.bigHealth')}</span><br/>{t('about.bigB')}<br/><span className="underline decoration-[#34BBC0] decoration-8 underline-offset-4">{t('about.bigSport')}</span>
            </h3>
            <div className="mt-12 relative">
              <p className="font-['Space_Grotesk',_sans-serif] font-black text-sm sm:text-xl bg-black text-white inline-block px-6 sm:px-8 py-3 skew-x-[-12deg] shadow-[6px_6px_0_0_#34BBC0]">
                <span className="block skew-x-[12deg]">{t('about.bigCaption')}</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {stats.map((s, i) => (
              <div key={i} className="bg-white border-[3px] border-black p-4 sm:p-6 shadow-[4px_4px_0_0_#0F0F12]">
                <span className="font-['Space_Grotesk',_sans-serif] text-5xl sm:text-6xl font-black italic skew-x-[-12deg] mb-2 block" style={{ color: statColor(i), WebkitTextStroke: '2px #0F0F12', textShadow: '3px 3px 0px #0F0F12' }}>{s.val}</span>
                <p className="font-extrabold uppercase text-xs sm:text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* THE FOUNDER */}
        <section className="mb-24">
          <h2 className="font-['Bricolage_Grotesque',_sans-serif] text-4xl sm:text-6xl font-black text-center uppercase mb-12">{t('about.founderTitle')}</h2>

          <div className="bg-[#FFDE4D] border-[4px] border-black p-6 sm:p-12 shadow-[12px_12px_0_0_#0F0F12] flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

            <div className="w-full sm:w-2/3 lg:w-1/3 shrink-0 mx-auto lg:mx-0">
              <img
                src="/fotobab/GaiaManzone.avif"
                alt="Gaia Manzone, CEO & Founder"
                className="w-full aspect-[4/5] object-cover object-top border-[4px] border-black shadow-[8px_8px_0_0_#0F0F12] skew-x-[-2deg] transition-transform duration-300"
                loading="lazy"
              />
            </div>

            <div className="flex-1 bg-white border-[4px] border-black p-6 sm:p-8 shadow-[8px_8px_0_0_#000] w-full">
              <h3 className="font-['Bricolage_Grotesque',_sans-serif] text-3xl sm:text-4xl font-black mb-2 uppercase">Gaia Manzone</h3>
              <span className="inline-block bg-black text-white text-xs sm:text-sm font-black uppercase tracking-widest px-3 py-1 mb-6 skew-x-[-12deg]"><span className="block skew-x-[12deg]">{t('about.founderRole')}</span></span>

              <div className="flex flex-col gap-3 mb-8 font-['Space_Grotesk',_sans-serif]">
                <div className="bg-[#FAF9F6] text-[#0F0F12] border-[1.5px] border-black px-3 py-1 text-sm font-extrabold self-start inline-block">
                  {t('about.founderBadge1')}
                </div>
                <div className="bg-[#FAF9F6] text-[#0F0F12] border-[1.5px] border-black px-3 py-1 text-sm font-extrabold self-start inline-block">
                  {t('about.founderBadge2')}
                </div>
              </div>

              <div className="font-['Bricolage_Grotesque',_sans-serif] font-black text-lg sm:text-xl leading-relaxed border-l-[4px] border-black pl-4 sm:pl-6 flex flex-col gap-4">
                <p>{t('about.founderQuote1')}</p>
                <p className="text-[#0F766E]">{t('about.founderQuote2')}</p>
                <p className="bg-black text-white p-4 shadow-[4px_4px_0_0_#FFDE4D] skew-x-[-2deg] mt-4">
                  <span className="block skew-x-[2deg]">{t('about.founderQuote3')}</span>
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* COMMUNITY WALL */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="font-['Bricolage_Grotesque',_sans-serif] text-3xl sm:text-5xl font-black uppercase">{t('about.communityTitle')}</h2>
            <div className="flex-1 h-[4px] bg-black"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {images.slice(0, 6).map((img, index) => {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1], delay: index * 0.1 }}
                  className="bg-black p-2 border-[4px] border-black shadow-[4px_4px_0_0_#000] md:shadow-[8px_8px_0_0_#000] skew-x-[-2deg] hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="bg-[#FAF9F6] p-2 sm:p-3 md:p-4 border-[3px] border-black h-full skew-x-[2deg]">
                    <img
                      src={`/fotobab/${img}`}
                      alt={t('about.photoAlt')}
                      className="w-full aspect-[4/5] md:aspect-square object-cover border-[2px] md:border-[3px] border-black grayscale group-hover:grayscale-0 transition-all duration-300"
                      loading="lazy"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
