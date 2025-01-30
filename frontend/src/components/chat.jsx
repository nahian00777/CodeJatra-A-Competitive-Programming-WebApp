import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, RefreshCw, Settings, Bot } from "lucide-react";

const ChatCard = ({ title, children }) => (
  <div className="dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
      <MessageSquare className="w-5 h-5" />
      {title}
    </h3>
    {children}
  </div>
);

function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      const maxScroll = scrollHeight - clientHeight;
      chatContainerRef.current.scrollTo({
        top: maxScroll,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    setInputMessage("");
    setIsLoading(true);

    setMessages((prev) => [...prev, { type: "user", content: userMessage }]);

    try {
      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userMessage }),
      });

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          type: "assistant",
          content: data.response,
        },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          type: "error",
          content: "Sorry, there was an error processing your request.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <Bot className="w-8 h-8 text-blue-600" />
              AI Assistant
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Get help with your programming questions and challenges
            </p>
          </div>
          <div className="flex gap-3">
            <button className="p-2.5 rounded-lg dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all border border-gray-200 dark:border-gray-700">
              <RefreshCw className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button className="p-2.5 rounded-lg dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all border border-gray-200 dark:border-gray-700">
              <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Main Chat Section */}
        <ChatCard title="Chat">
          <div className="flex flex-col h-[600px]">
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto mb-4 space-y-4 custom-scrollbar pr-2"
            >
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
                  <Bot className="w-16 h-16 mb-4 text-blue-600" />
                  <p className="text-lg font-medium">
                    Start a conversation with the AI assistant
                  </p>
                  <p className="text-sm mt-2">
                    Ask about programming, algorithms, or coding challenges
                  </p>
                </div>
              )}

              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  } message-animation`}
                >
                  <div
                    className={`max-w-[80%] p-2 rounded-lg ${
                      message.type === "user"
                        ? "bg-blue-600 text-white"
                        : message.type === "error"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                    } shadow-sm`}
                  >
                    <pre className="whitespace-pre-wrap font-sans">
                      {message.content}
                    </pre>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start message-animation">
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="mt-auto">
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message... (Press Enter to send)"
                    rows={1}
                    className="w-full p-2 border border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    disabled={isLoading}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading || !inputMessage.trim()}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-all flex items-center justify-center"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </ChatCard>
      </div>
    </div>
  );
}

export default Chat;
