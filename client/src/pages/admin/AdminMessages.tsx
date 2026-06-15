// AdminMessages.tsx (Minimal Working Version)
import React, { useState } from 'react';
import { 
  Mail, 
  CheckCheck, 
  Archive, 
  Trash2,
  ArrowLeft,
  Send,
  FileText,
  Download
} from 'lucide-react';

interface Message {
  id: number;
  from: string;
  email: string;
  avatar: string;
  subject: string;
  content: string;
  date: string;
  read: boolean;
  archived: boolean;
}

const AdminMessages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      from: "Julianna Duarte",
      email: "julianna.d@techinfra.io",
      avatar: "JD",
      subject: "Collaboration Inquiry: Cloud Migration",
      content: `Hi SNX Team,\n\nI've been following your recent work on high-performance SaaS architectures. Our organization is planning a large-scale migration of our legacy microservices.\n\nWould you be available for a brief introductory call next Tuesday or Wednesday?\n\nBest regards,\nJulianna Duarte`,
      date: "Oct 24, 2024",
      read: false,
      archived: false
    },
    {
      id: 2,
      from: "Marcus Chen",
      email: "marcus.c@innovate.ai",
      avatar: "MC",
      subject: "Speaking Opportunity: AI Summit 2024",
      content: `Dear SNX Team,\n\nWe would like to invite you to speak at our upcoming AI Summit 2024 in San Francisco.\n\nPlease let us know if you're interested.\n\nBest regards,\nMarcus Chen`,
      date: "Oct 23, 2024",
      read: false,
      archived: false
    },
    {
      id: 3,
      from: "Sarah Johnson",
      email: "sarah.j@devopspro.com",
      avatar: "SJ",
      subject: "Consulting Request",
      content: `Hello,\n\nWe're looking for a DevOps consultant to help us transform our infrastructure.\n\nWould you be available for a quick chat this week?\n\nThanks,\nSarah Johnson`,
      date: "Oct 22, 2024",
      read: true,
      archived: false
    }
  ]);

  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState('');
  const [showReply, setShowReply] = useState(false);
  const [activeTab, setActiveTab] = useState<'inbox' | 'archived'>('inbox');

  const markAsRead = (id: number) => {
    setMessages(messages.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const archiveMessage = (id: number) => {
    setMessages(messages.map(m => m.id === id ? { ...m, archived: !m.archived } : m));
    if (selectedMessage?.id === id) setSelectedMessage(null);
  };

  const deleteMessage = (id: number) => {
    setMessages(messages.filter(m => m.id !== id));
    if (selectedMessage?.id === id) setSelectedMessage(null);
  };

  const sendReply = () => {
    if (replyText.trim() && selectedMessage) {
      alert(`Reply sent to ${selectedMessage.email}\n\nMessage: ${replyText}`);
      setReplyText('');
      setShowReply(false);
    }
  };

  const filteredMessages = messages.filter(m => activeTab === 'inbox' ? !m.archived : m.archived);

  return (
    <div className="min-h-screen bg-background text-on-surface">
      {/* Header */}
      <div className="bg-surface/80 backdrop-blur-md border-b border-outline-variant/30 fixed top-0 w-full z-50">
        <div className="flex justify-between items-center px-4 h-16 max-w-6xl mx-auto">
          <span className="text-xl font-bold">SNX Admin</span>
          <div className="flex gap-2">
            <button className="bg-primary text-on-primary px-4 py-1.5 rounded-lg text-sm">Hire Me</button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20 pb-8 px-4 max-w-6xl mx-auto">
        {!selectedMessage ? (
          <>
            {/* Tabs */}
            <div className="flex gap-4 mb-6 border-b border-outline-variant/30">
              <button
                onClick={() => setActiveTab('inbox')}
                className={`pb-2 px-2 font-medium ${activeTab === 'inbox' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant'}`}
              >
                Inbox ({messages.filter(m => !m.archived).length})
              </button>
              <button
                onClick={() => setActiveTab('archived')}
                className={`pb-2 px-2 font-medium ${activeTab === 'archived' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant'}`}
              >
                Archived ({messages.filter(m => m.archived).length})
              </button>
            </div>

            {/* Message List */}
            <div className="space-y-3">
              {filteredMessages.map(msg => (
                <div
                  key={msg.id}
                  onClick={() => {
                    setSelectedMessage(msg);
                    if (!msg.read) markAsRead(msg.id);
                  }}
                  className={`bg-surface-container-low rounded-lg p-4 cursor-pointer hover:border-primary/50 transition-all border ${
                    !msg.read ? 'border-l-primary border-l-4' : 'border-outline-variant/30'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3 flex-1">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold">
                        {msg.avatar}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{msg.from}</h3>
                        <p className="text-sm text-primary">{msg.subject}</p>
                        <p className="text-sm text-on-surface-variant line-clamp-1">{msg.content.split('\n')[0]}</p>
                        <p className="text-xs text-on-surface-variant mt-1">{msg.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button onClick={(e) => { e.stopPropagation(); archiveMessage(msg.id); }} className="p-1.5 hover:bg-surface-variant rounded">
                        <Archive size={14} />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); deleteMessage(msg.id); }} className="p-1.5 hover:bg-error/10 text-error rounded">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredMessages.length === 0 && (
                <div className="text-center py-20">
                  <Mail size={48} className="mx-auto mb-4 opacity-30" />
                  <p className="text-on-surface-variant">No messages</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Back Button */}
            <button onClick={() => setSelectedMessage(null)} className="flex items-center gap-2 text-on-surface-variant hover:text-primary mb-6">
              <ArrowLeft size={18} /> Back to Messages
            </button>

            {/* Message Detail */}
            <div className="bg-surface-container-low rounded-xl border border-outline-variant/30 overflow-hidden">
              <div className="p-6 border-b border-outline-variant/30">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-lg font-bold">
                      {selectedMessage.avatar}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{selectedMessage.subject}</h2>
                      <p className="text-primary">{selectedMessage.from}</p>
                      <p className="text-sm text-on-surface-variant">{selectedMessage.email}</p>
                    </div>
                  </div>
                  <p className="text-sm text-on-surface-variant">{selectedMessage.date}</p>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <button onClick={() => setShowReply(!showReply)} className="bg-primary text-on-primary px-4 py-1.5 rounded-lg text-sm flex items-center gap-2">
                    <Mail size={14} /> Reply
                  </button>
                  <button onClick={() => archiveMessage(selectedMessage.id)} className="border border-outline-variant px-4 py-1.5 rounded-lg text-sm flex items-center gap-2">
                    <Archive size={14} /> Archive
                  </button>
                  <button onClick={() => deleteMessage(selectedMessage.id)} className="border border-error/50 text-error px-4 py-1.5 rounded-lg text-sm flex items-center gap-2">
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>

              {/* Reply Form */}
              {showReply && (
                <div className="p-6 border-b border-outline-variant/30 bg-surface-container-high/30">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    rows={4}
                    className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-3 text-sm focus:outline-none focus:border-primary"
                    placeholder="Type your reply..."
                  />
                  <div className="flex gap-2 mt-3">
                    <button onClick={sendReply} className="bg-primary text-on-primary px-4 py-1.5 rounded-lg text-sm flex items-center gap-2">
                      <Send size={14} /> Send
                    </button>
                    <button onClick={() => setShowReply(false)} className="border border-outline-variant px-4 py-1.5 rounded-lg text-sm">
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Message Content */}
              <div className="p-6">
                <div className="bg-surface-container-lowest/50 rounded-lg p-4">
                  {selectedMessage.content.split('\n').map((line, i) => (
                    <p key={i} className="mb-2">{line}</p>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <style>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default AdminMessages;