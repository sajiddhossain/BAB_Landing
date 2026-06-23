/**
 * @file      BlogPost.tsx
 * @summary   Pagina di un singolo articolo del blog. Riceve lo slug, trova l'articolo
 *            nel manifest (lingua corrente con fallback IT) e renderizza l'HTML
 *            pre-generato dal Markdown. Stile "calmo" e leggibile (zona di respiro).
 * @author    Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 */
import { useTranslation } from 'react-i18next';
import { BLOG_POSTS, formatDate, type BlogPostData } from './Blog';
import NotFound from './NotFound';

interface BlogPostProps {
  slug: string;
  onNavigate?: (path: string) => void;
}

function findPost(slug: string, lang: string): BlogPostData | undefined {
  return (
    BLOG_POSTS.find((p) => p.slug === slug && p.lang === lang) ||
    BLOG_POSTS.find((p) => p.slug === slug && p.lang === 'it') ||
    BLOG_POSTS.find((p) => p.slug === slug)
  );
}

export default function BlogPost({ slug, onNavigate }: BlogPostProps) {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language || 'it').slice(0, 2);
  const post = findPost(slug, lang);

  if (!post) return <NotFound onNavigate={onNavigate} />;

  return (
    <article className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <a
        href="/blog"
        className="inline-flex items-center gap-2 font-bold uppercase text-xs tracking-wide text-vividteal hover:underline focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#34BBC0] mb-8"
      >
        <span aria-hidden="true">←</span> {t('blog.back')}
      </a>

      <header className="mb-8">
        <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-wide text-[#0F0F12]/60 mb-4">
          <span>{formatDate(post.date, lang)}</span>
          <span aria-hidden="true">·</span>
          <span>{post.readingMinutes} {t('blog.reading')}</span>
        </div>
        <h1 className="font-['Bricolage_Grotesque',_sans-serif] text-3xl sm:text-5xl font-black tracking-tight leading-[1.05] mb-4">
          {post.title}
        </h1>
        {post.author && (
          <p className="text-sm font-bold uppercase tracking-wide text-[#0F0F12]/60">
            {t('blog.by')} {post.author}
          </p>
        )}
      </header>

      {post.cover && (
        <img
          src={post.cover}
          alt=""
          className="w-full aspect-video object-cover border-[3px] border-black shadow-[6px_6px_0_0_#0F0F12] mb-10"
        />
      )}

      <div
        className="blog-prose font-['Space_Grotesk',_sans-serif] text-[17px] leading-relaxed text-[#0F0F12]"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </article>
  );
}
