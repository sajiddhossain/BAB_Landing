export default function About() {
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

  return (
    <div className="flex flex-col items-center w-full min-h-screen text-[#0F0F12] px-4 py-16">
      <div className="max-w-5xl mx-auto w-full">
        
        {/* HERO MISSION */}
        <section className="mb-24 mt-10">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            
            <div className="flex-1 text-center md:text-left">
              <span className="inline-block bg-[#EBE5FF] border-[3px] border-black text-black font-black text-xs tracking-widest uppercase mb-6 px-4 py-1.5 shadow-[4px_4px_0_0_#0F0F12] -rotate-1">
                ✦ The Mission ✦
              </span>
              <h1 className="font-['Bricolage_Grotesque',_sans-serif] text-5xl sm:text-7xl font-black leading-none uppercase drop-shadow-[4px_4px_0_rgba(52,187,192,1)] mb-6">
                Redefining<br/>Girls' Sport
              </h1>
              <p className="font-bold text-lg leading-relaxed border-l-[4px] border-black pl-4">
                Non possiamo più accettare che le atlete siano trattate come "piccoli uomini". Costruiamo lo standard di domani, combinando scienza, dati biologici e tecnologia empatica.
              </p>
            </div>
            
            <div className="flex-1 w-full">
              <div className="bg-white border-[4px] border-black p-2 shadow-[8px_8px_0_0_#0F0F12] rotate-2">
                <img 
                  src="/fotobab/HY2jAVYB5JU8HdxplxBzkh8TQo.avif" 
                  alt="Atlete BAB" 
                  className="w-full aspect-square md:aspect-video object-cover border-[3px] border-black grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>

          </div>
        </section>

        {/* THE STORY OF MIA - SCRAPBOOK VIBE */}
        <section className="mb-32 mt-16 relative overflow-hidden px-2 sm:px-4">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0JyBoZWlnaHQ9JzQnPjxyZWN0IHdpZHRoPSc0JyBoZWlnaHQ9JzQnIGZpbGw9JyNmZmYnLz48cmVjdCB3aWR0aD0nMScgaGVpZ2h0PScxJyBmaWxsPScjY2NjJy8+PC9zdmc+')] opacity-50 -z-10"></div>

          <div className="text-center mb-16">
            <h2 className="font-['Bricolage_Grotesque',_sans-serif] text-4xl sm:text-5xl lg:text-6xl font-black uppercase inline-block bg-[#FFDE4D] border-[3px] md:border-[4px] border-black px-8 py-3 shadow-[8px_8px_0_0_#0F0F12] -rotate-2">
              ✦ The Story of Mia ✦
            </h2>
          </div>
          
          <div className="flex flex-col items-center gap-12 sm:gap-16 max-w-3xl mx-auto mb-20 font-['Space_Grotesk',_sans-serif] font-bold text-lg sm:text-xl leading-relaxed">
            
            {/* Pezzo 1 */}
            <div className="relative self-start w-11/12 sm:w-4/5 -rotate-1 hover:rotate-0 transition-transform">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-[#34BBC0] opacity-80 border-2 border-black rotate-3 z-10"></div>
              <div className="bg-[#FFE3D1] border-[3px] border-black p-6 sm:p-8 shadow-[6px_6px_0_0_#0F0F12]">
                At thirteen, Mia's body no longer felt like home. She had grown taller in a matter of months, and before she understood what was happening, hormones had changed more than just her body. They changed how she played and how she felt while doing it.
              </div>
            </div>

            {/* Doodle Separator */}
            <svg width="60" height="20" viewBox="0 0 60 20" className="text-black opacity-40">
              <path d="M0 10 Q 15 0, 30 10 T 60 10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </svg>

            {/* Pezzo 2 */}
            <div className="relative self-end w-11/12 sm:w-4/5 rotate-2 hover:rotate-0 transition-transform">
              <div className="absolute -top-3 left-8 w-12 h-5 bg-[#FFDE4D] opacity-90 border-2 border-black -rotate-6 z-10"></div>
              <div className="bg-[#EBE5FF] border-[3px] border-black p-6 sm:p-8 shadow-[6px_6px_0_0_#0F0F12]">
                Pushing through period symptoms, fatigue and hunger, she learned that <span className="font-['Bricolage_Grotesque',_sans-serif] bg-black text-white px-2 italic uppercase">"no pain is no gain"</span>. Disconnecting from her body became her winning strategy.
              </div>
            </div>

            {/* POLAROID */}
            <div className="relative w-64 sm:w-80 rotate-3 hover:rotate-6 transition-all duration-300 my-4 shadow-[12px_12px_0_0_#0F0F12] border-[4px] border-white bg-white group z-10">
              <div className="absolute -top-4 right-8 w-20 h-6 bg-black opacity-80 -rotate-2 z-20"></div>
              <img src="/fotobab/mia.avif" alt="Mia" className="w-full aspect-square object-cover border-[3px] border-black grayscale group-hover:grayscale-0 transition-all duration-500" />
              <div className="p-4 font-['Bricolage_Grotesque',_sans-serif] text-center font-black uppercase text-xl text-neutral-400">Mia, 13</div>
            </div>

            {/* Pezzo 3 */}
            <div className="relative self-start w-11/12 sm:w-4/5 -rotate-2 hover:rotate-0 transition-transform">
              <div className="absolute -top-3 right-1/4 w-16 h-6 bg-[#DAE69A] opacity-90 border-2 border-black rotate-6 z-10"></div>
              <div className="bg-white border-[3px] border-black p-6 sm:p-8 shadow-[6px_6px_0_0_#0F0F12]">
                Soon, injuries and anxiety started creeping in and her performance began to drop. And because no one talked about any of it, Mia kept quiet and started questioning whether she was no longer made for sport.
              </div>
            </div>

            {/* Doodle Separator */}
            <svg width="40" height="40" viewBox="0 0 40 40" className="text-black opacity-40">
              <path d="M20 0 L25 15 L40 20 L25 25 L20 40 L15 25 L0 20 L15 15 Z" fill="currentColor" />
            </svg>

            {/* Pezzo 4 (Risoluzione) */}
            <div className="relative w-full rotate-1 hover:-rotate-1 transition-transform">
              <div className="absolute top-1/2 -left-4 -translate-y-1/2 w-8 h-16 bg-black opacity-90 z-10 hidden sm:block"></div>
              <div className="bg-[#34BBC0] text-white border-[4px] border-black p-8 sm:p-10 shadow-[8px_8px_0_0_#000]">
                But it wasn't Mia who had fallen behind. <span className="underline decoration-4 underline-offset-4 decoration-[#FFDE4D]">It was sport that failed her</span> by neglecting her changing body, health and wellbeing.
              </div>
            </div>

          </div>

          <div className="text-center mb-24 relative">
            {/* SVG decorativo dietro al testo enorme */}
            <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-auto -z-10 opacity-30" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="#DAE69A" d="M42.7,-73.4C54.9,-66.3,64,-53.4,72.6,-40C81.2,-26.6,89.3,-13.3,88.7,-0.3C88.1,12.6,78.8,25.2,70.2,38C61.6,50.8,53.7,63.8,42.2,71.2C30.7,78.6,15.3,80.4,1.4,78C-12.5,75.6,-25,69,-37.2,61.8C-49.4,54.6,-61.3,46.8,-70.5,35.6C-79.7,24.4,-86.2,9.8,-85.4,-4.3C-84.6,-18.4,-76.5,-32,-66.4,-43C-56.3,-54,-44.2,-62.4,-31.6,-69.1C-19,-75.8,-5.9,-80.8,4.5,-88.7C14.9,-96.6,29.8,-86.8,42.7,-73.4Z" transform="translate(100 100) scale(1.1)" />
            </svg>

            <h3 className="font-['Bricolage_Grotesque',_sans-serif] text-5xl sm:text-7xl lg:text-[5.5rem] font-black uppercase leading-none drop-shadow-[4px_4px_0_rgba(0,0,0,1)] text-[#FFDE4D]">
              Without<br/>Women's Health<br/>There Is No<br/>Women's Sport
            </h3>
            <div className="mt-12">
              <p className="font-['Space_Grotesk',_sans-serif] font-black text-sm sm:text-xl bg-black text-white inline-block px-6 sm:px-8 py-3 rotate-2 shadow-[6px_6px_0_0_#34BBC0]">
                Just like Mia, several athletes pay the cost of bleeding in sport
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white border-[3px] border-black p-4 sm:p-6 shadow-[4px_4px_0_0_#0F0F12]">
               <span className="font-['Bricolage_Grotesque',_sans-serif] text-5xl sm:text-6xl font-black text-[#FFDE4D] mb-2 block" style={{ WebkitTextStroke: '2px #0F0F12', textShadow: '3px 3px 0px #0F0F12' }}>20%</span>
               <p className="font-bold uppercase text-xs sm:text-sm">feel judged or unsupported by coaches during their period</p>
            </div>
            <div className="bg-white border-[3px] border-black p-4 sm:p-6 shadow-[4px_4px_0_0_#0F0F12]">
               <span className="font-['Bricolage_Grotesque',_sans-serif] text-5xl sm:text-6xl font-black text-[#FFDE4D] mb-2 block" style={{ WebkitTextStroke: '2px #0F0F12', textShadow: '3px 3px 0px #0F0F12' }}>93%</span>
               <p className="font-bold uppercase text-xs sm:text-sm">report a negative period-related experience in sport</p>
            </div>
            <div className="bg-white border-[3px] border-black p-4 sm:p-6 shadow-[4px_4px_0_0_#0F0F12]">
               <span className="font-['Bricolage_Grotesque',_sans-serif] text-5xl sm:text-6xl font-black text-[#DAE69A] mb-2 block" style={{ WebkitTextStroke: '2px #0F0F12', textShadow: '3px 3px 0px #0F0F12' }}>77%</span>
               <p className="font-bold uppercase text-xs sm:text-sm">say menstrual symptoms affect performance</p>
            </div>
            <div className="bg-white border-[3px] border-black p-4 sm:p-6 shadow-[4px_4px_0_0_#0F0F12]">
               <span className="font-['Bricolage_Grotesque',_sans-serif] text-5xl sm:text-6xl font-black text-[#DAE69A] mb-2 block" style={{ WebkitTextStroke: '2px #0F0F12', textShadow: '3px 3px 0px #0F0F12' }}>73%</span>
               <p className="font-bold uppercase text-xs sm:text-sm">feel pressured to push through period pain</p>
            </div>
            <div className="bg-white border-[3px] border-black p-4 sm:p-6 shadow-[4px_4px_0_0_#0F0F12]">
               <span className="font-['Bricolage_Grotesque',_sans-serif] text-5xl sm:text-6xl font-black text-[#34BBC0] mb-2 block" style={{ WebkitTextStroke: '2px #0F0F12', textShadow: '3px 3px 0px #0F0F12' }}>84%</span>
               <p className="font-bold uppercase text-xs sm:text-sm">ignore period pain as their main coping mechanism</p>
            </div>
            <div className="bg-white border-[3px] border-black p-4 sm:p-6 shadow-[4px_4px_0_0_#0F0F12]">
               <span className="font-['Bricolage_Grotesque',_sans-serif] text-5xl sm:text-6xl font-black text-[#34BBC0] mb-2 block" style={{ WebkitTextStroke: '2px #0F0F12', textShadow: '3px 3px 0px #0F0F12' }}>36%</span>
               <p className="font-bold uppercase text-xs sm:text-sm">believes missing periods during competition is normal</p>
            </div>
          </div>
        </section>

        {/* THE FOUNDER (Mobile-first layout) */}
        <section className="mb-24">
          <h2 className="font-['Bricolage_Grotesque',_sans-serif] text-4xl sm:text-6xl font-black text-center uppercase mb-12">The Founder</h2>
          
          <div className="bg-[#FFDE4D] border-[4px] border-black p-6 sm:p-12 shadow-[12px_12px_0_0_#0F0F12] flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            
            {/* Foto a sinistra con ombra netta */}
            <div className="w-full sm:w-2/3 lg:w-1/3 shrink-0 mx-auto lg:mx-0">
              <img 
                src="/fotobab/GaiaManzone.avif" 
                alt="Gaia Manzone, CEO & Founder" 
                className="w-full aspect-[4/5] object-cover object-top border-[4px] border-black shadow-[8px_8px_0_0_#0F0F12] rotate-2 hover:rotate-0 transition-transform duration-300"
              />
            </div>

            {/* Testi e badge a destra */}
            <div className="flex-1 bg-white border-[4px] border-black p-6 sm:p-8 shadow-[8px_8px_0_0_#000] w-full">
               <h3 className="font-['Bricolage_Grotesque',_sans-serif] text-3xl sm:text-4xl font-black mb-2 uppercase">Gaia Manzone</h3>
               <span className="inline-block bg-black text-white text-xs sm:text-sm font-black uppercase tracking-widest px-3 py-1 mb-6 -rotate-1">CEO & Founder</span>
               
               {/* ELEMENTI DI AUTORITÀ (Space Grotesk) */}
               <div className="flex flex-col gap-3 mb-8 font-['Space_Grotesk',_sans-serif]">
                 <div className="bg-[#FAF9F6] text-[#0F0F12] border-[1.5px] border-black px-3 py-1 text-sm font-bold self-start inline-block">
                   Ex Atleta Agonista
                 </div>
                 <div className="bg-[#FAF9F6] text-[#0F0F12] border-[1.5px] border-black px-3 py-1 text-sm font-bold self-start inline-block">
                   Ex Marketing Specialist @ Adidas (~5 anni) & Puma (2.5 anni)
                 </div>
               </div>
               
               {/* REFACTORING DEL COPY (Bricolage Grotesque) */}
               <div className="font-['Bricolage_Grotesque',_sans-serif] font-black text-lg sm:text-xl leading-relaxed border-l-[4px] border-black pl-4 sm:pl-6 flex flex-col gap-4">
                 <p>
                   "Sono partita da una frustrazione personale: dopo una carriera nell'agonismo, ho vissuto sulla mia pelle il drop-out perché il sistema non sapeva gestire i cambiamenti del mio corpo."
                 </p>
                 <p className="text-[#34BBC0]">
                   "Dopo aver lavorato per anni nel marketing di colossi come Adidas e Puma, studiando l'impatto dello sport sulle community e le barriere che affrontano le giovani atlete, ho capito che il vuoto scientifico e comunicativo per le ragazze under 18 è strutturale."
                 </p>
                 <p className="bg-black text-white p-4 shadow-[4px_4px_0_0_#FFDE4D] rotate-1 mt-4">
                   "BAB è lo scudo tecnologico che avrei voluto avere io stessa per non sentirmi sbagliata sul campo."
                 </p>
               </div>
            </div>

          </div>
        </section>

        {/* PHOTO WALL GALLERY (Horizontal scroll on mobile, Masonry-ish on desktop) */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="font-['Bricolage_Grotesque',_sans-serif] text-3xl sm:text-5xl font-black uppercase">Community Wall</h2>
            <div className="flex-1 h-[4px] bg-black"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {images.slice(0, 6).map((img, index) => {
              const bgColors = ['bg-[#DAE69A]', 'bg-[#FFE3D1]', 'bg-[#34BBC0]', 'bg-[#EBE5FF]', 'bg-[#FFDE4D]', 'bg-[#D1FFEF]'];
              const rotations = ['rotate-2', '-rotate-3', 'rotate-3', '-rotate-2', 'rotate-1', '-rotate-1'];
              
              return (
                <div 
                  key={index} 
                  className={`${bgColors[index % bgColors.length]} border-[3px] md:border-[4px] border-black p-2 sm:p-3 md:p-4 shadow-[4px_4px_0_0_#000] md:shadow-[8px_8px_0_0_#000] ${rotations[index % rotations.length]} hover:rotate-0 hover:-translate-y-1 transition-all duration-300`}
                >
                  <img 
                    src={`/fotobab/${img}`} 
                    alt="BAB Community" 
                    className="w-full aspect-[4/5] md:aspect-square object-cover border-[2px] md:border-[3px] border-black grayscale hover:grayscale-0 transition-all duration-300"
                    loading="lazy"
                  />
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
