import React, { useState, useRef, useEffect } from 'react';
import { Users, Send, Smile, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

// Dummy contact to avoid reference error
const demoContacts = [
  { id: 1, name: 'Mistro', avatar: '🤖', online: true }
];

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [selectedContact, setSelectedContact] = useState(demoContacts[0]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    async function startInterview() {
      try {
        const res = await fetch('http://localhost:5000/api/start-interview', {
          method: 'POST',
          credentials: 'include'
        });
        const data = await res.json();
        if (data.initialPrompt) {
          setMessages([
            {
              id: Date.now(),
              sender: 'Mistro',
              text: data.initialPrompt,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              mine: false
            }
          ]);
        }
      } catch (err) {
        console.error('Failed to start interview:', err);
      }
    }

    startInterview();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: 'You',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      mine: true
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInput('');

    try {
      const chatHistory = updatedMessages.map(msg => ({
        role: msg.mine ? 'user' : 'assistant',
        content: msg.text
      }));

      const res = await fetch('http://localhost:5000/api/mistral', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
  messages: [
    { role: 'user', content: input }
  ]
})

      });

      const data = await res.json();
      const replyMessage = {
        id: Date.now() + 1,
        sender: 'Mistro',
        text: data.reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        mine: false
      };
      setMessages(prev => [...prev, replyMessage]);
    } catch (err) {
      console.error('Failed to get Mistral reply:', err);
    }
  };

  const handleFinishInterview = async () => {
    const collectedData = {
      skills: 'Cooking, first aid',
      support: 'Errands, childcare',
      languages: 'Swahili, English',
      medical: 'CPR certified'
    };

    const res = await fetch('http://localhost:5000/api/mistral-summary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(collectedData)
    });

    const { summary, feedback } = await res.json();
    setMessages(prev => [
      ...prev,
      {
        id: Date.now() + 1,
        sender: 'Mistro',
        text: summary,
        mine: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
      {
        id: Date.now() + 2,
        sender: 'Mistro',
        text: feedback,
        mine: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
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

        {/* Chat Main */}
        <div className="chat-main">
          <div className="chat-main-header">
            <div className="chat-main-avatar">{selectedContact.avatar}</div>
            <div>
              <div className="chat-main-name">{selectedContact.name}</div>
              <div className={`chat-main-status${selectedContact.online ? ' online' : ''}`}>
                {selectedContact.online ? 'Online' : 'Offline'}
              </div>
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


// import React, { useState, useRef, useEffect } from 'react';
// import { Users, Send, Smile, ChevronLeft } from 'lucide-react';
// import { Link } from 'react-router-dom';

// // Dummy contact to avoid reference error
// const demoContacts = [
//   { id: 1, name: 'Mistro', avatar: '🤖', online: true }
// ];

// const ChatPage = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [selectedContact, setSelectedContact] = useState(demoContacts[0]);
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     async function startInterview() {
//       try {
//         const res = await fetch('http://localhost:5000/api/start-interview', {
//           method: 'POST',
//           credentials: 'include'
//         });
//         const data = await res.json();
//         if (data.initialPrompt) {
//           setMessages([
//             {
//               id: Date.now(),
//               sender: 'Mistro',
//               text: data.initialPrompt,
//               time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//               mine: false
//             }
//           ]);
//         }
//       } catch (err) {
//         console.error('Failed to start interview:', err);
//       }
//     }

//     startInterview();
//   }, []);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const handleSend = async (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     const newMessage = {
//       id: Date.now(),
//       sender: 'You',
//       text: input,
//       time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//       mine: true
//     };

//     const updatedMessages = [...messages, newMessage];
//     setMessages(updatedMessages);
//     setInput('');

//     try {
//       const chatHistory = updatedMessages.map(msg => ({
//         role: msg.mine ? 'user' : 'assistant',
//         content: msg.text
//       }));

//       const res = await fetch('http://localhost:5000/api/mistral', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify({ messages: chatHistory }) // ✅ fixed key
//       });

//       const data = await res.json();
//       const replyMessage = {
//         id: Date.now() + 1,
//         sender: 'Mistro',
//         text: data.reply,
//         time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//         mine: false
//       };
//       setMessages(prev => [...prev, replyMessage]);
//     } catch (err) {
//       console.error('Failed to get Mistral reply:', err);
//     }
//   };

//   const handleFinishInterview = async () => {
//     const collectedData = {
//       skills: 'Cooking, first aid',
//       support: 'Errands, childcare',
//       languages: 'Swahili, English',
//       medical: 'CPR certified'
//     };

//     const res = await fetch('http://localhost:5000/api/mistral-summary', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       credentials: 'include',
//       body: JSON.stringify(collectedData)
//     });

//     const { summary, feedback } = await res.json();
//     setMessages(prev => [
//       ...prev,
//       {
//         id: Date.now() + 1,
//         sender: 'Mistro',
//         text: summary,
//         mine: false,
//         time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//       },
//       {
//         id: Date.now() + 2,
//         sender: 'Mistro',
//         text: feedback,
//         mine: false,
//         time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//       }
//     ]);
//   };

//   return (
//     <div className="chat-bg">
//       <div className="chat-container">
//         {/* Sidebar */}
//         <div className="chat-sidebar">
//           <div className="chat-sidebar-header">
//             <Users className="chat-sidebar-icon" />
//             <span>My Circle</span>
//           </div>
//           <div className="chat-contacts-list">
//             {demoContacts.map((contact) => (
//               <div
//                 key={contact.id}
//                 className={`chat-contact${selectedContact.id === contact.id ? ' active' : ''}`}
//                 onClick={() => setSelectedContact(contact)}
//               >
//                 <div className={`chat-contact-avatar${contact.online ? ' online' : ''}`}>{contact.avatar}</div>
//                 <span className="chat-contact-name">{contact.name}</span>
//               </div>
//             ))}
//           </div>
//           <Link to="/home" className="chat-sidebar-back">
//             <ChevronLeft className="chat-sidebar-back-icon" /> Back to Dashboard
//           </Link>
//         </div>

//         {/* Chat Main */}
//         <div className="chat-main">
//           <div className="chat-main-header">
//             <div className="chat-main-avatar">{selectedContact.avatar}</div>
//             <div>
//               <div className="chat-main-name">{selectedContact.name}</div>
//               <div className={`chat-main-status${selectedContact.online ? ' online' : ''}`}>
//                 {selectedContact.online ? 'Online' : 'Offline'}
//               </div>
//             </div>
//           </div>

//           <div className="chat-messages">
//             {messages.map((msg) => (
//               <div key={msg.id} className={`chat-message${msg.mine ? ' mine' : ''}`}>
//                 <div className="chat-message-bubble">{msg.text}</div>
//                 <div className="chat-message-meta">{msg.time}</div>
//               </div>
//             ))}
//             <div ref={messagesEndRef} />
//           </div>

//           <form className="chat-input-row" onSubmit={handleSend}>
//             <button type="button" className="chat-input-emoji"><Smile /></button>
//             <input
//               className="chat-input"
//               type="text"
//               placeholder="Type your message..."
//               value={input}
//               onChange={e => setInput(e.target.value)}
//             />
//             <button type="submit" className="chat-input-send"><Send /></button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatPage;

