import { useState, useRef, useEffect } from 'react';
import { generateGuideResponse, saveApiKey, getApiKey } from '../geminiService';
import { Send, Bot, User, Loader2, Settings, Key } from 'lucide-react';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

const GuideChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: '你好！我是這次旅行的 AI 隨身導遊。關於行程、天氣或餐廳有什麼問題都可以問我喔！' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState(getApiKey() || '');
  const [showKeyInput, setShowKeyInput] = useState(!getApiKey());
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showKeyInput]);

  const handleSaveKey = () => {
    if (apiKey.trim()) {
      saveApiKey(apiKey.trim());
      setShowKeyInput(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    if (!getApiKey()) {
      setShowKeyInput(true);
      return;
    }

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await generateGuideResponse(userMessage);
      setMessages(prev => [...prev, { role: 'bot', text: response }]);
    } catch (error) {
      if ((error as Error).message === "MISSING_API_KEY") {
        setShowKeyInput(true);
        setMessages(prev => [...prev, { role: 'bot', text: '請先設定 Google Gemini API Key 才能使用喔！' }]);
      } else {
        setMessages(prev => [...prev, { role: 'bot', text: '抱歉，我現在有點累（連線錯誤），請稍後再試。' }]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-stone-50 pb-safe relative">
      {/* Header */}
      <div className="bg-white p-4 border-b border-stone-200 flex justify-between items-center shadow-sm z-10 sticky top-0">
        <div className="font-bold text-stone-800 flex items-center gap-2">
          <div className="bg-indigo-100 p-1.5 rounded-full text-indigo-600">
            <Bot size={20} />
          </div>
          隨身導遊
        </div>
        <button 
          onClick={() => setShowKeyInput(!showKeyInput)}
          className="text-stone-400 hover:text-stone-600 p-2 rounded-full hover:bg-stone-100 transition"
        >
          <Settings size={20} />
        </button>
      </div>

      {/* Key Input Overlay */}
      {showKeyInput && (
        <div className="bg-stone-100 border-b border-stone-200 p-4 animate-fade-in">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-200 max-w-sm mx-auto">
            <h3 className="font-bold text-stone-800 mb-2 flex items-center gap-2">
              <Key size={18} className="text-amber-500"/> 設定 API Key
            </h3>
            <p className="text-xs text-stone-500 mb-3">請輸入 Google Gemini API Key 以啟用導遊功能。</p>
            <div className="flex gap-2">
              <input 
                type="password" 
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="貼上 API Key..."
                className="flex-1 bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button 
                onClick={handleSaveKey}
                disabled={!apiKey.trim()}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold disabled:opacity-50 hover:bg-indigo-700 transition"
              >
                儲存
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`
              max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm
              ${msg.role === 'user' 
                ? 'bg-stone-800 text-white rounded-tr-none' 
                : 'bg-white text-stone-700 border border-stone-100 rounded-tl-none'}
            `}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-stone-100 shadow-sm flex items-center gap-2 text-stone-400 text-sm">
              <Loader2 size={16} className="animate-spin" />
              正在思考...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 bg-white border-t border-stone-200 mb-16"> {/* mb-16 to avoid nav overlap */}
        <div className="flex items-center gap-2 max-w-md mx-auto bg-stone-100 p-1.5 rounded-full border border-stone-200 focus-within:ring-2 focus-within:ring-stone-300 transition-all">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="問問導遊..." 
            className="flex-1 bg-transparent px-4 py-2 text-sm focus:outline-none min-w-0"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`p-2 rounded-full transition-all ${
              input.trim() 
                ? 'bg-stone-800 text-white shadow-md hover:scale-105 active:scale-95' 
                : 'bg-stone-300 text-stone-500 cursor-not-allowed'
            }`}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuideChat;