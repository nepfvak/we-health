const fs   = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

const BLOG_DIR = path.join(__dirname, '../content/blog');
const OUT      = path.join(BLOG_DIR, 'posts.json');

const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'));

const posts = files.map(file => {
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8');
  const { data, content } = matter(raw);
  return {
    slug:      data.slug      || file.replace(/\.md$/, ''),
    title:     data.title     || '',
    date:      data.date      ? new Date(data.date).toISOString() : '',
    author:    data.author    || 'Dr. Yingjuan Liang (Selina)',
    thumbnail: data.thumbnail || '',
    excerpt:   data.excerpt   || '',
    body:      marked(content),
  };
}).sort((a, b) => new Date(b.date) - new Date(a.date));

fs.writeFileSync(OUT, JSON.stringify(posts, null, 2));
console.log(`✓ Built ${posts.length} post(s) → content/blog/posts.json`);
