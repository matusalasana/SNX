// AdminDashboard.tsx
import React, { useState } from 'react';

interface Activity {
  id: number;
  entity: string;
  type: string;
  status: string;
  statusColor: string;
  date: string;
  icon: string;
}

const AdminDashboard: React.FC = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const stats = [
    { label: "Total Projects", value: "48", change: "+12%", icon: "📁", color: "#c0c1ff", borderColor: "#c0c1ff" },
    { label: "Total Blog Posts", value: "124", change: "+5%", icon: "📄", color: "#4edea3", borderColor: "#4edea3" },
    { label: "Unread Messages", value: "32", change: "9 New", icon: "✉️", color: "#ffb783", borderColor: "#ffb783" },
    { label: "Monthly Visitors", value: "14.2k", change: "+2.4k", icon: "👥", color: "#c0c1ff", borderColor: "#c0c1ff" }
  ];

  const activities: Activity[] = [
    { id: 1, entity: "NeuralNet API", type: "Updated Repo", status: "Deployed", statusColor: "#4edea3", date: "2 hours ago", icon: "💻" },
    { id: 2, entity: "Inquiry: Project Collaboration", type: "New Message", status: "Pending", statusColor: "#ffb783", date: "5 hours ago", icon: "💬" },
    { id: 3, entity: "Future of Web3 & Rust", type: "Draft Post", status: "Draft", statusColor: "#c7c4d7", date: "Yesterday", icon: "✏️" },
    { id: 4, entity: "CloudScale Optimizer", type: "Deployed", status: "Live", statusColor: "#4edea3", date: "2 days ago", icon: "🚀" },
    { id: 5, entity: "Security Patch v2.4", type: "Release", status: "Completed", statusColor: "#c0c1ff", date: "3 days ago", icon: "🔒" }
  ];

  const metrics = [
    { label: "API Performance", value: "99.9%", color: "#4edea3", width: "99.9%", tooltip: "Avg. response time: 142ms" },
    { label: "Build Pipeline", value: "Healthy", color: "#c0c1ff", width: "85%", tooltip: "Success rate: 94% (Last 30 days)" },
    { label: "Database Latency", value: "24ms", color: "#8083ff", width: "40%", tooltip: "Cluster: AWS-US-EAST-1" }
  ];

  const handleLogout = () => {
    setShowLogoutModal(false);
    alert("Logged out successfully");
    // Navigate to login: navigate('/admin/login')
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#13131b', color: '#e4e1ed' }}>
      {/* Logout Modal */}
      {showLogoutModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 100,
          backgroundColor: 'rgba(19, 19, 27, 0.8)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }} onClick={() => setShowLogoutModal(false)}>
          <div style={{
            backgroundColor: '#1f1f27',
            border: '1px solid #464554',
            borderRadius: '12px',
            padding: '24px',
            maxWidth: '400px',
            width: '100%'
          }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>Confirm Logout</h3>
            <p style={{ color: '#c7c4d7', marginBottom: '20px' }}>Are you sure you want to end your session, Architect?</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setShowLogoutModal(false)} style={{
                flex: 1,
                padding: '8px',
                border: '1px solid #464554',
                borderRadius: '8px',
                background: 'transparent',
                cursor: 'pointer'
              }}>Cancel</button>
              <button onClick={handleLogout} style={{
                flex: 1,
                padding: '8px',
                backgroundColor: '#ffb4ab',
                color: '#690005',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}>Logout</button>
            </div>
          </div>
        </div>
      )}

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
          <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#c0c1ff' }}>SNX Admin</h1>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{ padding: '6px 12px', borderRadius: '8px', backgroundColor: '#c0c1ff', color: '#1000a9', cursor: 'pointer', fontWeight: '500' }}>
              Dashboard
            </button>
            <button style={{ padding: '6px 12px', borderRadius: '8px', background: 'transparent', color: '#e4e1ed', cursor: 'pointer' }}>
              Analytics
            </button>
            <button style={{ padding: '6px 12px', borderRadius: '8px', background: 'transparent', color: '#e4e1ed', cursor: 'pointer' }}>
              Projects
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        {/* Welcome Section */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px', color: '#c0c1ff' }}>Overview</h2>
          <p style={{ color: '#c7c4d7' }}>Welcome back, Architect. Here's your system status.</p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <button style={{
            padding: '10px 20px',
            backgroundColor: '#292932',
            border: '1px solid #464554',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            ✏️ Write Post
          </button>
          <button style={{
            padding: '10px 20px',
            backgroundColor: '#c0c1ff',
            color: '#1000a9',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            🖥️ New Project
          </button>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
          marginBottom: '32px'
        }}>
          {stats.map((stat, idx) => (
            <div key={idx} style={{
              backgroundColor: '#1f1f27',
              borderRadius: '12px',
              padding: '20px',
              borderLeft: `4px solid ${stat.borderColor}`,
              transition: 'transform 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0px)'}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                <div style={{
                  padding: '8px',
                  backgroundColor: `${stat.color}20`,
                  borderRadius: '8px',
                  fontSize: '24px'
                }}>
                  {stat.icon}
                </div>
                <span style={{ fontSize: '12px', color: stat.color }}>{stat.change}</span>
              </div>
              <div style={{ fontSize: '14px', color: '#c7c4d7', marginBottom: '4px' }}>{stat.label}</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {/* Recent Activity Table */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600' }}>Recent Activity</h3>
              <button style={{ color: '#c0c1ff', fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer' }}>View All →</button>
            </div>
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
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', color: '#c7c4d7' }}>Entity</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', color: '#c7c4d7' }}>Status</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', color: '#c7c4d7' }}>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activities.map(activity => (
                      <tr key={activity.id} style={{ borderBottom: '1px solid #464554' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(192, 193, 255, 0.03)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                        <td style={{ padding: '12px 16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '20px' }}>{activity.icon}</span>
                            <div>
                              <div style={{ fontWeight: '500' }}>{activity.entity}</div>
                              <div style={{ fontSize: '10px', color: '#c7c4d7' }}>{activity.type}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <span style={{
                            padding: '2px 8px',
                            borderRadius: '20px',
                            fontSize: '10px',
                            backgroundColor: `${activity.statusColor}20`,
                            color: activity.statusColor,
                            border: `1px solid ${activity.statusColor}40`
                          }}>
                            {activity.status}
                          </span>
                        </td>
                        <td style={{ padding: '12px 16px', fontSize: '12px', color: '#c7c4d7' }}>{activity.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* System Metrics */}
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>System Metrics</h3>
            <div style={{
              backgroundColor: '#1f1f27',
              borderRadius: '12px',
              border: '1px solid #464554',
              padding: '20px'
            }}>
              {metrics.map((metric, idx) => (
                <div key={idx} style={{ marginBottom: idx < metrics.length - 1 ? '20px' : 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                    <span>{metric.label}</span>
                    <span style={{ color: metric.color }}>{metric.value}</span>
                  </div>
                  <div style={{
                    height: '4px',
                    backgroundColor: '#292932',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: metric.width,
                      height: '100%',
                      backgroundColor: metric.color,
                      borderRadius: '4px'
                    }} />
                  </div>
                  <div style={{ fontSize: '10px', color: '#c7c4d7', marginTop: '4px' }}>{metric.tooltip}</div>
                </div>
              ))}

              <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #464554' }}>
                <div style={{ fontSize: '12px', color: '#c7c4d7', marginBottom: '12px' }}>Recent GitHub Activity</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  <span style={{ padding: '4px 8px', backgroundColor: '#292932', borderRadius: '4px', fontSize: '11px' }}>🐙 #32 Pull Request</span>
                  <span style={{ padding: '4px 8px', backgroundColor: '#292932', borderRadius: '4px', fontSize: '11px' }}>🐙 main merged</span>
                  <span style={{ padding: '4px 8px', backgroundColor: '#292932', borderRadius: '4px', fontSize: '11px' }}>🐙 ci-workflow fix</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          paddingTop: '32px',
          borderTop: '1px solid #464554',
          textAlign: 'center',
          fontSize: '14px',
          color: '#c7c4d7'
        }}>
          <p>© 2024 SNX Portfolio. Engineered for performance.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;