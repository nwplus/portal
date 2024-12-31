import React, { useState } from 'react'
import styled from 'styled-components'

const ChatbotContainer = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 16px;
`

const ChatbotToggle = styled.button`
  background-color: ${p => p.theme.colors.text};
  border: none;
  border-radius: 50%;
  height: 72px;
  width: 72px;
  color: white;
  padding: 20px;
  font-size: 24px;
  cursor: pointer;
`

const Chatbox = styled.div`
  width: 300px;
  height: 400px;
  background: ${p => p.theme.colors.background};
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 250px;
    height: 350px;
  }
`

const ChatboxHeader = styled.h3`
  background: ${p => p.theme.colors.sidebar.background};
  color: white;
  margin: 0;
  padding: 16px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-size: 20px;
`

const ChatboxMessages = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 12px;
  overflow-y: auto;
  border-top: 1px solid #ddd;
  gap: 4px;
  max-height: 400px;
`

const Message = styled.div`
  margin-bottom: 10px;
  padding: 10px 12px;
  max-width: 80%;
  border-radius: 5px;
  background: ${({ role, theme }) => (role === 'user' ? theme.colors.text : 'white')};
  align-self: ${({ role }) => (role === 'user' ? 'flex-end' : 'flex-start')};
  word-wrap: break-word;
  overflow-wrap: break-word;
  color: ${({ role }) => (role === 'user' ? 'white' : 'black')};
`

const ChatboxInput = styled.div`
  position: relative;
  display: flex;
  border-top: 1px solid #ddd;
  padding: 8px;
`

const Input = styled.input`
  flex: 1;
  padding: 10px 70px 12px 12px;
  border: none;
  border-radius: 10px;
  font-family: Hanken Grotesk;

  @media (max-width: 768px) {
    padding-right: 60px;
  }
`

const TypingIndicator = styled.div`
  padding: 10px;
  font-style: italic;
  color: #666;
`

const SendButton = styled.button`
  position: absolute;
  right: 14px;
  top: 13.5px;
  background: ${p => p.theme.colors.sidebar.background};
  border: none;
  color: white;
  padding: 6px 14px;
  cursor: pointer;
  border-radius: 7px;
  font-family: HK Grotesk;
  font-weight: bold;

  @media (max-width: 768px) {
    padding: 6px 10px;
  }
`

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([{ role: 'bot', content: 'Hello! How can I help you?' }])
  const [userQuery, setUserQuery] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const toggleChatbox = () => setIsOpen(!isOpen)

  const handleSend = async () => {
    if (!userQuery.trim()) return

    const newMessages = [...messages, { role: 'user', content: userQuery }]
    setMessages(newMessages)
    setUserQuery('')
    setIsTyping(true)

    try {
      const response = await fetch('http://localhost:8000/api/chatbot', {
        // replace with chatbot api
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_query: userQuery }),
      })
      const data = await response.json()
      setMessages([...newMessages, { role: 'bot', content: data.response }])
    } catch (error) {
      console.error('Error communicating with chatbot:', error)
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <ChatbotContainer>
      {isOpen && (
        <Chatbox>
          <ChatboxHeader>nwChatbot</ChatboxHeader>
          <ChatboxMessages>
            {messages.map((msg, index) => (
              <Message key={index} role={msg.role}>
                {msg.content}
              </Message>
            ))}
            {isTyping && <TypingIndicator>nwChatbot is typing...</TypingIndicator>}
          </ChatboxMessages>
          <ChatboxInput>
            <Input
              type="text"
              value={userQuery}
              onChange={e => setUserQuery(e.target.value)}
              placeholder="Type your message..."
              onKeyDown={e => e.key === 'Enter' && handleSend()}
            />
            <SendButton onClick={handleSend}>Send</SendButton>
          </ChatboxInput>
        </Chatbox>
      )}

      <ChatbotToggle onClick={toggleChatbox}>
        {!isOpen ? (
          '💬'
        ) : (
          <svg width="26" height="16" viewBox="0 0 26 16" fill="none">
            <path
              d="M2 2L13 13L24 2"
              stroke="white"
              stroke-width="3.38462"
              stroke-linecap="round"
            />
          </svg>
        )}
      </ChatbotToggle>
    </ChatbotContainer>
  )
}

export default Chatbot
