// AdminProjectsManagement.tsx
import React, { useState } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  status: 'featured' | 'live' | 'draft';
  techStack: string[];
  date: string;
  image: string;
}

const AdminProjectsManagement: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: "CloudScale Optimizer",
      description: "Distributed traffic orchestrator",
      status: "featured",
      techStack: ["Go", "gRPC", "K8s"],
      date: "Oct 24, 2023",
      image: "https://picsum.photos/48/48?random=1"
    },
    {
      id: 2,
      title: "Neural-Insight API",
      description: "Real-time analysis engine",
      status: "live",
      techStack: ["Python", "PyTorch"],
      date: "Sep 12, 2023",
      image: "https://picsum.photos/48/48?random=2"
    },
    {
      id: 3,
      title: "DevPort Shell",
      description: "Portfolio design system",
      status: "draft",
      techStack: ["React", "Tailwind"],
      date: "Aug 05, 2023",
      image: "https://picsum.photos/48/48?random=3"
    },
    {
      id: 4,
      title: "Quantum Mesh",
      description: "Distributed computing framework",
      status: "live",
      techStack: ["Rust", "Tokio", "Redis"],
      date: "Jul 15, 2023",
      image: "https://picsum.photos/48/48?random=4"
    },
    {
      id: 5,
      title: "Aether UI",
      description: "Component library",
      status: "draft",
      techStack: ["React", "TypeScript", "Storybook"],
      date: "Jun 20, 2023",
      image: "https://picsum.photos/48/48?random=5"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 3;

  const stats = {
    featured: projects.filter(p => p.status === 'featured').length,
    live: projects.filter(p => p.status === 'live').length,
    draft: projects.filter(p => p.status === 'draft').length
  };

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.techStack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(project => project.id !== id));
    }
  };

  const handleEdit = (id: number) => {
    alert(`Edit project ID: ${id}`);
    // Navigate to edit page: navigate(`/admin/projects/edit/${id}`)
  };

  const handleStatusChange = (id: number) => {
    setProjects(projects.map(project => {
      if (project.id === id) {
        const newStatus = project.status === 'featured' ? 'live' : 
                         project.status === 'live' ? 'draft' : 'featured';
        return { ...project, status: newStatus };
      }
      return project;
    }));
  };

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'featured':
        return { bg: '#4edea320', color: '#4edea3', icon: '⭐' };
      case 'live':
        return { bg: '#c0c1ff20', color: '#c0c1ff', icon: '🚀' };
      default:
        return { bg: '#34343d', color: '#c7c4d7', icon: '📝' };
    }
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
              Projects
            </button>
            <button style={{ padding: '6px 12px', borderRadius: '8px', background: 'transparent', color: '#e4e1ed', cursor: 'pointer' }}>
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
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>Projects Management</h2>
            <p style={{ color: '#c7c4d7' }}>Manage your technical portfolio and showcase your latest engineering feats.</p>
          </div>
          <button
            onClick={() => alert('Create new project')}
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
            + Add Project
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
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', color: '#c7c4d7' }}>Featured</span>
              <span>⭐</span>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#4edea3' }}>{stats.featured}</div>
            <div style={{ fontSize: '12px', color: '#c7c4d7', marginTop: '8px' }}>High visibility projects</div>
          </div>
          <div style={{ backgroundColor: '#1f1f27', padding: '16px', borderRadius: '12px', border: '1px solid #464554' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', color: '#c7c4d7' }}>Live</span>
              <span>🚀</span>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#c0c1ff' }}>{stats.live}</div>
            <div style={{ fontSize: '12px', color: '#c7c4d7', marginTop: '8px' }}>Deployed production assets</div>
          </div>
          <div style={{ backgroundColor: '#1f1f27', padding: '16px', borderRadius: '12px', border: '1px solid #464554' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', color: '#c7c4d7' }}>Drafts</span>
              <span>📝</span>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#ffb783' }}>{stats.draft}</div>
            <div style={{ fontSize: '12px', color: '#c7c4d7', marginTop: '8px' }}>Work in progress</div>
          </div>
        </div>

        {/* Search Bar */}
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search projects..."
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

        {/* Projects Table */}
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
                  <th style={{ padding: '16px', textAlign: 'left', color: '#c7c4d7', fontSize: '12px' }}>Status</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#c7c4d7', fontSize: '12px' }}>Tech Stack</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#c7c4d7', fontSize: '12px' }}>Date</th>
                  <th style={{ padding: '16px', textAlign: 'center', color: '#c7c4d7', fontSize: '12px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentProjects.map(project => {
                  const statusStyle = getStatusStyle(project.status);
                  return (
                    <tr key={project.id} style={{ borderBottom: '1px solid #464554', transition: 'background 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(192, 193, 255, 0.03)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                      <td style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{
                            width: '48px',
                            height: '48px',
                            backgroundColor: '#292932',
                            borderRadius: '8px',
                            border: '1px solid #464554',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden'
                          }}>
                            <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                          <div>
                            <div style={{ fontWeight: '500', marginBottom: '4px' }}>{project.title}</div>
                            <div style={{ fontSize: '12px', color: '#c7c4d7' }}>{project.description}</div>
                          </div>
                        </div>
                       </td>
                      <td style={{ padding: '16px' }}>
                        <button
                          onClick={() => handleStatusChange(project.id)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '12px',
                            backgroundColor: statusStyle.bg,
                            color: statusStyle.color
                          }}
                        >
                          <span>{statusStyle.icon}</span>
                          <span>{project.status.charAt(0).toUpperCase() + project.status.slice(1)}</span>
                        </button>
                       </td>
                      <td style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {project.techStack.map(tech => (
                            <span key={tech} style={{
                              padding: '2px 8px',
                              backgroundColor: 'rgba(192, 193, 255, 0.1)',
                              border: '1px solid rgba(192, 193, 255, 0.2)',
                              borderRadius: '4px',
                              fontSize: '10px',
                              color: '#c0c1ff'
                            }}>
                              {tech}
                            </span>
                          ))}
                        </div>
                       </td>
                      <td style={{ padding: '16px', color: '#c7c4d7', fontSize: '14px' }}>{project.date}</td>
                      <td style={{ padding: '16px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                          <button
                            onClick={() => handleEdit(project.id)}
                            style={{ background: 'none', border: 'none', color: '#c7c4d7', cursor: 'pointer', fontSize: '20px', padding: '4px' }}
                            title="Edit"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDelete(project.id)}
                            style={{ background: 'none', border: 'none', color: '#ffb4ab', cursor: 'pointer', fontSize: '20px', padding: '4px' }}
                            title="Delete"
                          >
                            🗑️
                          </button>
                        </div>
                       </td>
                    </tr>
                  );
                })}
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
                Showing {indexOfFirstProject + 1} to {Math.min(indexOfLastProject, filteredProjects.length)} of {filteredProjects.length} projects
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
        {filteredProjects.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px', color: '#c7c4d7' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📁</div>
            <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>No projects found</h3>
            <p>Add your first project to showcase your work.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProjectsManagement;