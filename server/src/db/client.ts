import pg from 'pg';
import crypto from 'crypto';

// In standard ESModules we can use crypto.randomUUID
function makeUUID() {
  return crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15);
}

const { Pool } = pg;

let pool: any = null;
let isMockDatabase = false;

// Seed Data for Mock Mode (Instantly visual & functional portfolio)
const mockDb = {
  users: [
    {
      id: 'admin-uuid-00000000',
      username: 'admin',
      email: 'admin@snx.dev',
      // bcrypt hashes of 'admin123' is '$2a$10$3YmItoO6fFk4p5H0Wk3Y0O7i4W2aY3PZ/6Tqorj8R1yYI6xO7yZbe' roughly.
      // We will also support simple text comparisons if bcrypt fails or fallback comparisons.
      password_hash: '$2a$10$T8Z44ZscZ2D.B.eO.eK25eh0pAptm4m9aXwXW.I9qXy5n761L8f.W', // 'admin123'
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      bio: 'Lead Full Stack Dev & Creative Cloud Security Architect. Focused on PERN stack high-scale software architectures.',
      created_at: new Date(),
      updated_at: new Date()
    }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'AetherDB: Real-time Cloud Store',
      description: 'Distributed document-oriented storage engine engineered to stream database checkpoints directly to edge caches.',
      content: '### Introducing AetherDB\n\nAetherDB is built from the ground up to solve latency bottlenecks in modern collaborative environments. Leveraging active cache invalidation and Rust compilation layers, AetherDB handles over 100k transactions per second while maintaining strong consistency indices.\n\n#### Core Technical Stack:\n- **Storage Engine**: Rust / RocksDB\n- **Client Driver**: Node.js & Go\n- **Security Framework**: TLS 1.3 + Cryptographic tokens',
      thumbnail_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600',
      github_url: 'https://github.com',
      live_url: 'https://demo.com',
      order_index: 0,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 'proj-2',
      title: 'NeonLink: Analytics Telemetry',
      description: 'A responsive real-time analytics aggregation dashboard built with PostgreSQL raw materializations.',
      content: '### NeonLink Real-Time Telemetry\n\nNeonLink aggregates user sessions, duration metrics, and layout errors in real-time, visualizing trends on dynamic D3.js timelines.\n\n#### Architectural Features:\n- Robust Postgres time-bracket aggregates\n- High-resolution SVG visualizations',
      thumbnail_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600',
      github_url: 'https://github.com',
      live_url: 'https://demo.com',
      order_index: 1,
      created_at: new Date(),
      updated_at: new Date()
    }
  ],
  project_images: [
    { id: 'img-1', project_id: 'proj-1', image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600', order_index: 0, created_at: new Date() }
  ],
  blog_posts: [
    {
      id: 'blog-1',
      title: 'Mastering PostgreSQL Row-Level Performance',
      slug: 'mastering-postgresql-row-level-performance',
      summary: 'Explore advanced raw query indexing, composite keys, and how to scale Neon connection pool limits.',
      content: '### PostgreSQL Performance Deep-Dive\n\nWhen writing row queries manually, understanding how indexing scales under high read volume is critical.\n\n1. Always align composite indices with the columns present in your SELECT or WHERE queries.\n2. Leverage partitioning schemes for high-scale logs.\n\n```sql\nCREATE INDEX idx_logs_timestamp ON security_logs(timestamp);\n```',
      thumbnail_url: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600',
      status: 'published',
      published_at: new Date(),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 'blog-2',
      title: 'React 19 Server Mode Integration',
      slug: 'react-19-server-mode-integration',
      summary: 'An introductory guide on using the latest async transition states, custom hooks, and layout rendering.',
      content: '### Hello React 19\n\nReact 19 brings exciting changes to form bindings and loading transitions. Let\'s explore how easy it is to manage local input states securely and trigger layout effects without trigger loops.',
      thumbnail_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600',
      status: 'draft',
      published_at: null,
      created_at: new Date(),
      updated_at: new Date()
    }
  ],
  skills: [
    { id: 'sk-1', name: 'TypeScript', category: 'languages', proficiency: 95, icon_name: 'Code', created_at: new Date() },
    { id: 'sk-2', name: 'React / Vite', category: 'frontend', proficiency: 90, icon_name: 'Layers', created_at: new Date() },
    { id: 'sk-3', name: 'Node.js / Express', category: 'backend', proficiency: 88, icon_name: 'Cpu', created_at: new Date() },
    { id: 'sk-4', name: 'PostgreSQL', category: 'backend', proficiency: 85, icon_name: 'Database', created_at: new Date() },
    { id: 'sk-5', name: 'Docker & AWS', category: 'devops', proficiency: 80, icon_name: 'Terminal', created_at: new Date() }
  ],
  experiences: [
    { id: 'exp-1', company: 'Prism Tech Solutions', role: 'Senior Software Engineer', description: 'Engineered high-scale microservice communication pipelines utilizing Express.js and transactional Postgres clusters. Conducted code audits and guided junior developers.', duration: 'Jun 2024 - Present', created_at: new Date() },
    { id: 'exp-2', company: 'Nova Growth Corp', role: 'Full Stack Engineer', description: 'Overhauled CRM client-facing widgets with TailwindCSS, significantly boosting mobile responsive latency. Designed robust REST routes for content publication systems.', duration: 'Jan 2022 - May 2024', created_at: new Date() }
  ],
  contact_messages: [
    { id: 'msg-1', name: 'John Doe', email: 'john@recruiter.com', subject: 'Opportunity: Technical Lead', message: 'Hi, love your developer portfolio. Would love to run you through our tech stack!', is_read: false, created_at: new Date() }
  ]
};

// Robust In-Memory PG Query Interpreter for flawless database simulation fallback!
const parseAndExecuteMock = (sql: string, params: any[] = []): { rows: any[]; rowCount: number } => {
  const normalized = sql.replace(/\s+/g, ' ').trim().toLowerCase();

  // 1. USERS HANDLERS
  if (normalized.includes('select * from users where username =') || normalized.includes('select * from users where email =')) {
    const val = params[0];
    const match = mockDb.users.find(u => u.username === val || u.email === val);
    return { rows: match ? [match] : [], rowCount: match ? 1 : 0 };
  }
  if (normalized.includes('select * from users where id =')) {
    const val = params[0];
    const match = mockDb.users.find(u => u.id === val);
    return { rows: match ? [match] : [], rowCount: match ? 1 : 0 };
  }

  // 2. PROJECTS HANDLERS
  if (normalized.includes('select * from projects order by')) {
    const sorted = [...mockDb.projects].sort((a, b) => a.order_index - b.order_index);
    return { rows: sorted, rowCount: sorted.length };
  }
  if (normalized.includes('select * from projects where id =')) {
    const val = params[0];
    const project = mockDb.projects.find(p => p.id === val);
    return { rows: project ? [project] : [], rowCount: project ? 1 : 0 };
  }
  if (normalized.includes('insert into projects')) {
    // INSERT INTO projects (title, description, content, thumbnail_url, github_url, live_url, order_index) VALUES ($1...
    const [title, description, content, thumb, git, live, order] = params;
    const newProj = {
      id: 'proj-' + makeUUID().substring(0, 8),
      title,
      description,
      content,
      thumbnail_url: thumb || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600',
      github_url: git || '',
      live_url: live || '',
      order_index: parseInt(order) || 0,
      created_at: new Date(),
      updated_at: new Date()
    };
    mockDb.projects.push(newProj);
    return { rows: [newProj], rowCount: 1 };
  }
  if (normalized.includes('update projects set')) {
    // UPDATE projects SET title = $1, description = $2, content = $3, thumbnail_url = $4, github_url = $5, live_url = $6, order_index = $7, updated_at = CURRENT_TIMESTAMP WHERE id = $8
    const [title, description, content, thumb, git, live, order, idVal] = params;
    const index = mockDb.projects.findIndex(p => p.id === idVal);
    if (index !== -1) {
      mockDb.projects[index] = {
        ...mockDb.projects[index],
        title,
        description,
        content,
        thumbnail_url: thumb,
        github_url: git,
        live_url: live,
        order_index: parseInt(order) || 0,
        updated_at: new Date()
      };
      return { rows: [mockDb.projects[index]], rowCount: 1 };
    }
    return { rows: [], rowCount: 0 };
  }
  if (normalized.includes('delete from projects where id =')) {
    const val = params[0];
    const initialLen = mockDb.projects.length;
    mockDb.projects = mockDb.projects.filter(p => p.id !== val);
    return { rows: [], rowCount: initialLen - mockDb.projects.length };
  }

  // 3. SKILLS HANDLERS
  if (normalized.includes('select * from skills order by')) {
    return { rows: mockDb.skills, rowCount: mockDb.skills.length };
  }
  if (normalized.includes('insert into skills')) {
    const [name, category, proficiency, icon] = params;
    const newSkill = {
      id: 'sk-' + makeUUID().substring(0, 8),
      name,
      category,
      proficiency: parseInt(proficiency) || 100,
      icon_name: icon || 'Code',
      created_at: new Date()
    };
    mockDb.skills.push(newSkill);
    return { rows: [newSkill], rowCount: 1 };
  }
  if (normalized.includes('delete from skills where id =')) {
    const val = params[0];
    const initialLen = mockDb.skills.length;
    mockDb.skills = mockDb.skills.filter(s => s.id !== val);
    return { rows: [], rowCount: initialLen - mockDb.skills.length };
  }

  // 4. EXPERIENCES HANDLERS
  if (normalized.includes('select * from experiences order by')) {
    return { rows: mockDb.experiences, rowCount: mockDb.experiences.length };
  }
  if (normalized.includes('insert into experiences')) {
    const [company, role, description, duration] = params;
    const newExp = {
      id: 'exp-' + makeUUID().substring(0, 8),
      company,
      role,
      description,
      duration,
      created_at: new Date()
    };
    mockDb.experiences.push(newExp);
    return { rows: [newExp], rowCount: 1 };
  }
  if (normalized.includes('delete from experiences where id =')) {
    const val = params[0];
    const initialLen = mockDb.experiences.length;
    mockDb.experiences = mockDb.experiences.filter(e => e.id !== val);
    return { rows: [], rowCount: initialLen - mockDb.experiences.length };
  }

  // 5. BLOG POSTS HANDLERS
  if (normalized.includes('select * from blog_posts where status =') || normalized.includes("status = 'published'") || normalized.includes('from blog_posts')) {
    // Blog list query
    let posts = [...mockDb.blog_posts];
    if (normalized.includes("status = 'published'")) {
      posts = posts.filter(b => b.status === 'published');
    }
    // Check if slug filter is present
    if (normalized.includes('slug =')) {
      const slugVal = params[0];
      const match = mockDb.blog_posts.find(b => b.slug === slugVal);
      return { rows: match ? [match] : [], rowCount: match ? 1 : 0 };
    }
    if (normalized.includes('id =')) {
      const idVal = params[0];
      const match = mockDb.blog_posts.find(b => b.id === idVal);
      return { rows: match ? [match] : [], rowCount: match ? 1 : 0 };
    }

    posts.sort((a,b) => b.created_at.getTime() - a.created_at.getTime());
    return { rows: posts, rowCount: posts.length };
  }
  if (normalized.includes('insert into blog_posts')) {
    // title, slug, content, summary, thumbnail_url, status, published_at
    const [title, slug, content, summary, thumb, status, pubAt] = params;
    const newBlog = {
      id: 'blog-' + makeUUID().substring(0, 8),
      title,
      slug,
      content,
      summary,
      thumbnail_url: thumb || 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600',
      status: status || 'draft',
      published_at: status === 'published' ? new Date() : null,
      created_at: new Date(),
      updated_at: new Date()
    };
    mockDb.blog_posts.push(newBlog);
    return { rows: [newBlog], rowCount: 1 };
  }
  if (normalized.includes('update blog_posts set')) {
    // UPDATE blog_posts SET title = $1, slug = $2, content = $3, summary = $4, thumbnail_url = $5, status = $6, published_at = $7, updated_at = CURRENT_TIMESTAMP WHERE id = $8
    const [title, slug, content, summary, thumb, status, pubAt, idVal] = params;
    const idx = mockDb.blog_posts.findIndex(b => b.id === idVal);
    if (idx !== -1) {
      mockDb.blog_posts[idx] = {
        ...mockDb.blog_posts[idx],
        title,
        slug,
        content,
        summary,
        thumbnail_url: thumb,
        status,
        published_at: status === 'published' && !mockDb.blog_posts[idx].published_at ? new Date() : mockDb.blog_posts[idx].published_at,
        updated_at: new Date()
      };
      return { rows: [mockDb.blog_posts[idx]], rowCount: 1 };
    }
    return { rows: [], rowCount: 0 };
  }
  if (normalized.includes('delete from blog_posts where id =')) {
    const val = params[0];
    const initialLen = mockDb.blog_posts.length;
    mockDb.blog_posts = mockDb.blog_posts.filter(b => b.id !== val);
    return { rows: [], rowCount: initialLen - mockDb.blog_posts.length };
  }

  // 6. CONTACT MESSAGES HANDLERS
  if (normalized.includes('select * from contact_messages')) {
    const list = [...mockDb.contact_messages].sort((a, b) => b.created_at.getTime() - a.created_at.getTime());
    return { rows: list, rowCount: list.length };
  }
  if (normalized.includes('insert into contact_messages')) {
    const [name, email, subject, message] = params;
    const newMsg = {
      id: 'msg-' + makeUUID().substring(0, 8),
      name,
      email,
      subject,
      message,
      is_read: false,
      created_at: new Date()
    };
    mockDb.contact_messages.push(newMsg);
    return { rows: [newMsg], rowCount: 1 };
  }
  if (normalized.includes('update contact_messages set is_read =')) {
    const [isRead, idVal] = params;
    const idx = mockDb.contact_messages.findIndex(m => m.id === idVal);
    if (idx !== -1) {
      mockDb.contact_messages[idx].is_read = isRead;
      return { rows: [mockDb.contact_messages[idx]], rowCount: 1 };
    }
    return { rows: [], rowCount: 0 };
  }
  if (normalized.includes('delete from contact_messages where id =')) {
    const val = params[0];
    const initialLen = mockDb.contact_messages.length;
    mockDb.contact_messages = mockDb.contact_messages.filter(m => m.id !== val);
    return { rows: [], rowCount: initialLen - mockDb.contact_messages.length };
  }

  // General fallbacks
  return { rows: [], rowCount: 0 };
};

// Database Connector Core
if (process.env.DATABASE_URL) {
  console.log('⚡ Neon PostgreSQL Cluster connection url located. Initializing Pool ingress...');
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } // Required for serverless database certificates
  });
} else {
  console.warn('⚠️  DATABASE_URL environment variable was not found.');
  console.warn('⚡ Initializing highly robust SNX In-Memory Query Engine with seed records.');
  isMockDatabase = true;
}

export const dbQuery = async (text: string, params?: any[]) => {
  if (isMockDatabase) {
    return parseAndExecuteMock(text, params);
  }
  try {
    const res = await pool.query(text, params);
    return res;
  } catch (error) {
    console.error('❌ Database Query Failure:', error);
    throw error;
  }
};

export const checkIsMockDatabase = () => isMockDatabase;
