import React, { useState, useRef, useEffect } from 'react';
import { Users, Send, MessageSquare, Smile, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const demoContacts = [
  { id: 1, name: 'Sarah M.', avatar: 'SM', online: true },
  { id: 2, name: 'Alex K.', avatar: 'AK', online: false },
  { id: 3, name: 'Maria L.', avatar: 'ML', online: true },
];

const demoMessages = [
  { id: 1, sender: 'Sarah M.', text: 'Hey! Are you coming to the event tomorrow?', time: '09:15', mine: false },
  { id: 2, sender: 'You', text: 'Yes! I’ll bring snacks 😊', time: '09:16', mine: true },
  { id: 3, sender: 'Sarah M.', text: 'Awesome, see you there!', time: '09:17', mine: false },
];

const ChatPage = () => {
  const [messages, setMessages] = useState(demoMessages);
  const [input, setInput] = useState('');
  const [selectedContact, setSelectedContact] = useState(demoContacts[0]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: 'You', text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), mine: true }]);
    setInput('');
  };

  return (
    <div className="chat-bg">
      <div className="chat-container">
        {/* Sidebar */}
        <div className="chat-sidebar">
          <div className="chat-sidebar-header">
            <Users className="chat-sidebar-icon" />
            <span>My Circle</span>
          </div>
          <div className="chat-contacts-list">
            {demoContacts.map((contact) => (
              <div
                key={contact.id}
                className={`chat-contact${selectedContact.id === contact.id ? ' active' : ''}`}
                onClick={() => setSelectedContact(contact)}
              >
                <div className={`chat-contact-avatar${contact.online ? ' online' : ''}`}>{contact.avatar}</div>
                <span className="chat-contact-name">{contact.name}</span>
              </div>
            ))}
          </div>
          <Link to="/home" className="chat-sidebar-back">
            <ChevronLeft className="chat-sidebar-back-icon" /> Back to Dashboard
          </Link>
        </div>
        {/* Main Chat Area */}
        <div className="chat-main">
          <div className="chat-main-header">
            <div className="chat-main-avatar">{selectedContact.avatar}</div>
            <div>
              <div className="chat-main-name">{selectedContact.name}</div>
              <div className={`chat-main-status${selectedContact.online ? ' online' : ''}`}>{selectedContact.online ? 'Online' : 'Offline'}</div>
            </div>
          </div>
          <div className="chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-message${msg.mine ? ' mine' : ''}`}> 
                <div className="chat-message-bubble">{msg.text}</div>
                <div className="chat-message-meta">{msg.time}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form className="chat-input-row" onSubmit={handleSend}>
            <button type="button" className="chat-input-emoji"><Smile /></button>
            <input
              className="chat-input"
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            <button type="submit" className="chat-input-send"><Send /></button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
