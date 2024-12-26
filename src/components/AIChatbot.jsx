import React, { useState } from 'react'
import styled from 'styled-components'

const ChatbotContainer = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 2;
`

const ChatbotToggle = styled.button`
  background-color: #666ea2;
  border: none;
  border-radius: 50%;
  height: 72px;
  width: 72px;
  color: white;
  padding: 22px;
  font-size: 24px;
  cursor: pointer;
`

const Chatbox = styled.div`
  width: 300px;
  height: 400px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
`

const ChatboxHeader = styled.div`
  background: #666ea2;
  color: white;
  padding: 0px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
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
  background: ${({ role }) => (role === 'user' ? '#666EA2' : '#898c8f')};
  align-self: ${({ role }) => (role === 'user' ? 'flex-end' : 'flex-start')};
  word-wrap: break-word;
  overflow-wrap: break-word;
`

const ChatboxInput = styled.div`
  display: flex;
  border-top: 1px solid #ddd;
`

const Input = styled.input`
  flex: 1;
  padding: 12px;
  border: none;
  border-bottom-left-radius: 10px;
  font-family: HK Grotesk;
`

const TypingIndicator = styled.div`
  padding: 10px;
  font-style: italic;
  color: #666;
`

const SendButton = styled.button`
  background: #666ea2;
  border: none;
  color: white;
  padding: 12px;
  cursor: pointer;
  border-bottom-right-radius: 10px;
  font-family: HK Grotesk;
`

const XButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
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
      {isOpen ? (
        <Chatbox>
          <ChatboxHeader>
            <h3>nwChatbot</h3>
            <XButton onClick={toggleChatbox}>x</XButton>
          </ChatboxHeader>
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
      ) : (
        <ChatbotToggle onClick={toggleChatbox}>💬</ChatbotToggle>
      )}
    </ChatbotContainer>
  )
}

export default Chatbot
