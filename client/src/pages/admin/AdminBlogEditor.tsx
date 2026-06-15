// AdminBlogEditor.tsx
import React, { useState } from 'react';

const AdminBlogEditor: React.FC = () => {
  const [title, setTitle] = useState('Architecting Scalable Microservices with Go and Kubernetes');
  const [content, setContent] = useState(`## Introduction

In the world of modern cloud-native architecture, Go has emerged as the language of choice for building resilient microservices.

### Why Go?

- **Concurrency**: Native goroutines make concurrent programming simple
- **Performance**: Near-C speeds with garbage collection
- **Ecosystem**: Built-in HTTP server and JSON support

### Code Example

\`\`\`go
package main

import (
    "fmt"
    "net/http"
)

func main() {
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Hello, World!")
    })
    http.ListenAndServe(":8080", nil)
}
\`\`\`

### Conclusion

Go and Kubernetes together provide a powerful platform for building scalable microservices.`);

  const [isPreview, setIsPreview] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  // Simple markdown to HTML converter
  const renderMarkdown = (text: string) => {
    let html = text;
    
    // Code blocks
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="bg-black/30 p-3 rounded-lg overflow-x-auto my-2"><code>$2</code></pre>');
    
    // Headers
    html = html.replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>');
    html = html.replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mt-6 mb-3">$1</h2>');
    html = html.replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-8 mb-4">$1</h1>');
    
    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Italic
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Inline code
    html = html.replace(/`(.*?)`/g, '<code class="bg-black/30 px-1 py-0.5 rounded">$1</code>');
    
    // Lists
    html = html.replace(/^- (.*$)/gm, '<li class="ml-4 mb-1">$1</li>');
    html = html.replace(/(<li.*<\/li>)/s, '<ul class="my-2">$1</ul>');
    
    // Paragraphs
    html = html.replace(/\n\n/g, '</p><p class="mb-3">');
    html = '<p class="mb-3">' + html + '</p>';
    
    // Fix nested paragraphs
    html = html.replace(/<p class="mb-3"><ul/g, '<ul');
    html = html.replace(/<\/ul><\/p>/g, '</ul>');
    html = html.replace(/<p class="mb-3"><pre/g, '<pre');
    html = html.replace(/<\/pre><\/p>/g, '</pre>');
    
    return html;
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
            <button 
              onClick={() => window.location.href = '/admin'}
              style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid #464554', background: 'transparent', cursor: 'pointer', color: '#e4e1ed' }}
            >
              Dashboard
            </button>
            <button 
              onClick={() => window.location.href = '/admin/blog'}
              style={{ padding: '6px 12px', borderRadius: '8px', backgroundColor: '#c0c1ff', color: '#1000a9', cursor: 'pointer', fontWeight: '500' }}
            >
              Blog
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>Edit Blog Post</h2>
          <p style={{ color: '#c7c4d7' }}>Create and manage your blog content</p>
        </div>

        {/* Success Message */}
        {saved && (
          <div style={{ 
            backgroundColor: '#4edea3', 
            color: '#003824', 
            padding: '12px', 
            borderRadius: '8px', 
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            ✓ Post saved successfully!
          </div>
        )}

        {/* Title Input */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#c0c1ff' }}>Post Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#1f1f27',
              border: '1px solid #464554',
              borderRadius: '8px',
              color: '#e4e1ed',
              fontSize: '18px',
              fontWeight: '600',
              outline: 'none'
            }}
            placeholder="Enter post title..."
          />
        </div>

        {/* Toggle Buttons */}
        <div style={{ marginBottom: '16px', display: 'flex', gap: '12px' }}>
          <button
            onClick={() => setIsPreview(false)}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              backgroundColor: !isPreview ? '#c0c1ff' : '#1f1f27',
              color: !isPreview ? '#1000a9' : '#e4e1ed',
              border: '1px solid #464554',
              cursor: 'pointer'
            }}
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => setIsPreview(true)}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              backgroundColor: isPreview ? '#c0c1ff' : '#1f1f27',
              color: isPreview ? '#1000a9' : '#e4e1ed',
              border: '1px solid #464554',
              cursor: 'pointer'
            }}
          >
            👁️ Preview
          </button>
        </div>

        {/* Editor / Preview Area */}
        <div style={{
          backgroundColor: '#1f1f27',
          border: '1px solid #464554',
          borderRadius: '12px',
          overflow: 'hidden',
          marginBottom: '20px'
        }}>
          {!isPreview ? (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{
                width: '100%',
                minHeight: '500px',
                padding: '16px',
                backgroundColor: '#0d0d15',
                border: 'none',
                color: '#e4e1ed',
                fontFamily: 'monospace',
                fontSize: '14px',
                resize: 'vertical',
                outline: 'none'
              }}
              placeholder="Write your markdown content here..."
            />
          ) : (
            <div 
              style={{
                padding: '16px',
                minHeight: '500px',
                maxHeight: '500px',
                overflowY: 'auto',
                backgroundColor: '#0d0d15'
              }}
              dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
            />
          )}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button
            onClick={() => {
              setTitle('');
              setContent('');
            }}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: '1px solid #464554',
              backgroundColor: 'transparent',
              color: '#e4e1ed',
              cursor: 'pointer'
            }}
          >
            Clear
          </button>
          <button
            onClick={handleSave}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              backgroundColor: '#c0c1ff',
              color: '#1000a9',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            💾 Save Changes
          </button>
        </div>

        {/* Recent Posts Section */}
        <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #464554' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>Recent Posts</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { id: 1, title: "Architecting Scalable Microservices", status: "published" },
              { id: 2, title: "React Server Components Deep Dive", status: "draft" },
              { id: 3, title: "Optimizing Database Queries", status: "published" }
            ].map(post => (
              <div 
                key={post.id}
                style={{
                  padding: '12px',
                  backgroundColor: '#1f1f27',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span>{post.title}</span>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ 
                    fontSize: '12px', 
                    padding: '2px 8px', 
                    borderRadius: '4px',
                    backgroundColor: post.status === 'published' ? '#4edea320' : '#ffb78320',
                    color: post.status === 'published' ? '#4edea3' : '#ffb783'
                  }}>
                    {post.status}
                  </span>
                  <button style={{ color: '#c0c1ff', cursor: 'pointer', background: 'none', border: 'none' }}>
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogEditor;