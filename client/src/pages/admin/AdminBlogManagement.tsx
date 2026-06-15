// AdminBlogManagement.tsx
import React, { useState } from 'react';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  category: string;
  status: 'published' | 'draft';
  date: string;
  views: number;
}

const AdminBlogManagement: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: 1,
      title: "Modernizing State Management with Rust",
      slug: "rust-state-management",
      category: "Systems Engineering",
      status: "published",
      date: "Oct 24, 2023",
      views: 2847
    },
    {
      id: 2,
      title: "Micro-interactions in Glassmorphic UI",
      slug: "glassmorphism-ux",
      category: "Frontend Architecture",
      status: "draft",
      date: "Nov 02, 2023",
      views: 0
    },
    {
      id: 3,
      title: "Why I'm Moving to Bun from Node.js",
      slug: "bun-vs-node",
      category: "Backend",
      status: "published",
      date: "Sep 15, 2023",
      views: 1256
    },
    {
      id: 4,
      title: "Mastering Tailwind 4.0 Grid Systems",
      slug: "tailwind-4-grid",
      category: "CSS Styling",
      status: "published",
      date: "Aug 28, 2023",
      views: 3421
    },
    {
      id: 5,
      title: "Building Real-time Apps with WebSockets",
      slug: "websocket-realtime",
      category: "Backend",
      status: "draft",
      date: "Nov 10, 2023",
      views: 0
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  const stats = {
    total: posts.length,
    published: posts.filter(p => p.status === 'published').length,
    drafts: posts.filter(p => p.status === 'draft').length,
    totalViews: posts.reduce((sum, p) => sum + p.views, 0)
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter(post => post.id !== id));
    }
  };

  const handleStatusChange = (id: number) => {
    setPosts(posts.map(post =>
      post.id === id
        ? { ...post, status: post.status === 'published' ? 'draft' : 'published' }
        : post
    ));
  };

  const handleView = (slug: string) => {
    window.open(`/blog/${slug}`, '_blank');
  };

  const handleEdit = (id: number) => {
    alert(`Edit post ID: ${id}`);
    // Navigate to edit page: navigate(`/admin/blog/edit/${id}`)
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#13131b', color: '#e4e1ed' }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#1f1f27',
        borderBottom: '1px solid #464554',
        padding: '16px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#c0c1ff' }}>DevPort Admin</h1>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{ padding: '6px 12px', borderRadius: '8px', background: 'transparent', color: '#e4e1ed', cursor: 'pointer' }}>
              Dashboard
            </button>
            <button style={{ padding: '6px 12px', borderRadius: '8px', backgroundColor: '#c0c1ff', color: '#1000a9', cursor: 'pointer', fontWeight: '500' }}>
              Blog
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        {/* Page Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>Blog Management</h2>
            <p style={{ color: '#c7c4d7' }}>Compose, curate, and analyze your technical insights.</p>
          </div>
          <button
            onClick={() => alert('Create new post')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#c0c1ff',
              color: '#1000a9',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            + New Post
          </button>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}>
          <div style={{ backgroundColor: '#1f1f27', padding: '16px', borderRadius: '12px', border: '1px solid #464554' }}>
            <div style={{ fontSize: '12px', color: '#c7c4d7', textTransform: 'uppercase' }}>Total Posts</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', marginTop: '8px' }}>{stats.total}</div>
          </div>
          <div style={{ backgroundColor: '#1f1f27', padding: '16px', borderRadius: '12px', border: '1px solid #464554' }}>
            <div style={{ fontSize: '12px', color: '#c7c4d7', textTransform: 'uppercase' }}>Published</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', marginTop: '8px', color: '#4edea3' }}>{stats.published}</div>
          </div>
          <div style={{ backgroundColor: '#1f1f27', padding: '16px', borderRadius: '12px', border: '1px solid #464554' }}>
            <div style={{ fontSize: '12px', color: '#c7c4d7', textTransform: 'uppercase' }}>Drafts</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', marginTop: '8px', color: '#ffb783' }}>{stats.drafts}</div>
          </div>
          <div style={{ backgroundColor: '#1f1f27', padding: '16px', borderRadius: '12px', border: '1px solid #464554' }}>
            <div style={{ fontSize: '12px', color: '#c7c4d7', textTransform: 'uppercase' }}>Total Views</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', marginTop: '8px', color: '#c0c1ff' }}>{stats.totalViews.toLocaleString()}</div>
          </div>
        </div>

        {/* Search Bar */}
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              maxWidth: '300px',
              padding: '10px 16px',
              backgroundColor: '#1f1f27',
              border: '1px solid #464554',
              borderRadius: '8px',
              color: '#e4e1ed',
              outline: 'none'
            }}
          />
        </div>

        {/* Blog Posts Table */}
        <div style={{
          backgroundColor: '#1f1f27',
          borderRadius: '12px',
          border: '1px solid #464554',
          overflow: 'hidden'
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #464554', backgroundColor: '#0d0d15' }}>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#c7c4d7', fontSize: '12px' }}>Title</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#c7c4d7', fontSize: '12px' }}>Category</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#c7c4d7', fontSize: '12px' }}>Status</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#c7c4d7', fontSize: '12px' }}>Date</th>
                  <th style={{ padding: '16px', textAlign: 'center', color: '#c7c4d7', fontSize: '12px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentPosts.map(post => (
                  <tr key={post.id} style={{ borderBottom: '1px solid #464554', transition: 'background 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(192, 193, 255, 0.03)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                    <td style={{ padding: '16px' }}>
                      <div>
                        <div style={{ fontWeight: '500', marginBottom: '4px' }}>{post.title}</div>
                        <div style={{ fontSize: '12px', color: '#c7c4d7' }}>/blog/{post.slug}</div>
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span style={{
                        fontSize: '10px',
                        padding: '4px 8px',
                        backgroundColor: '#34343d',
                        borderRadius: '4px'
                      }}>
                        {post.category}
                      </span>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <button
                        onClick={() => handleStatusChange(post.id)}
                        style={{
                          fontSize: '10px',
                          padding: '4px 12px',
                          borderRadius: '20px',
                          border: 'none',
                          cursor: 'pointer',
                          backgroundColor: post.status === 'published' ? '#4edea320' : '#ffb78320',
                          color: post.status === 'published' ? '#4edea3' : '#ffb783'
                        }}
                      >
                        {post.status === 'published' ? 'Published' : 'Draft'}
                      </button>
                    </td>
                    <td style={{ padding: '16px', color: '#c7c4d7', fontSize: '14px' }}>{post.date}</td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                        <button
                          onClick={() => handleView(post.slug)}
                          style={{ background: 'none', border: 'none', color: '#c7c4d7', cursor: 'pointer', fontSize: '18px' }}
                          title="View"
                        >
                          👁️
                        </button>
                        <button
                          onClick={() => handleEdit(post.id)}
                          style={{ background: 'none', border: 'none', color: '#c7c4d7', cursor: 'pointer', fontSize: '18px' }}
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          style={{ background: 'none', border: 'none', color: '#ffb4ab', cursor: 'pointer', fontSize: '18px' }}
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{
              padding: '16px',
              borderTop: '1px solid #464554',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <span style={{ fontSize: '14px', color: '#c7c4d7' }}>
                Showing {indexOfFirstPost + 1} to {Math.min(indexOfLastPost, filteredPosts.length)} of {filteredPosts.length} entries
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: '1px solid #464554',
                    background: 'transparent',
                    color: '#e4e1ed',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    opacity: currentPage === 1 ? 0.5 : 1
                  }}
                >
                  ← Previous
                </button>
                <span style={{ padding: '6px 12px', backgroundColor: '#c0c1ff', color: '#1000a9', borderRadius: '6px' }}>
                  {currentPage}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: '1px solid #464554',
                    background: 'transparent',
                    color: '#e4e1ed',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    opacity: currentPage === totalPages ? 0.5 : 1
                  }}
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px', color: '#c7c4d7' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📝</div>
            <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>No posts found</h3>
            <p>Create your first blog post to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBlogManagement;