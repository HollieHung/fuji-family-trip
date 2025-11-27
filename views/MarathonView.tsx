import { useState, useRef, useEffect } from 'react';
import { Upload, Trophy, ExternalLink, QrCode } from 'lucide-react';

const MarathonView = () => {
  const [qrImage, setQrImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedQr = localStorage.getItem('marathon_qr_code');
    if (savedQr) setQrImage(savedQr);
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setQrImage(result);
        try {
          localStorage.setItem('marathon_qr_code', result);
        } catch (e) {
          alert('圖片太大無法儲存，請使用較小的圖片');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="pb-24 min-h-screen px-4 pt-8 max-w-md mx-auto animate-fade-in bg-stone-50">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold serif text-stone-900">富士山馬拉松</h1>
        <p className="text-red-700 font-bold mt-1 tracking-wider">2025.12.14 (Sun)</p>
      </div>

      {/* Timer Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-200 text-center">
          <div className="text-stone-400 text-xs font-bold mb-1">FULL MARATHON</div>
          <div className="text-3xl font-bold font-mono text-stone-800">09:00</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-200 text-center">
          <div className="text-stone-400 text-xs font-bold mb-1">CHARITY RUN (10.5K)</div>
          <div className="text-3xl font-bold font-mono text-stone-800">09:20</div>
        </div>
      </div>

      {/* QR Code Section */}
      <div 
        className="bg-stone-800 rounded-xl p-5 text-white shadow-lg mb-4 cursor-pointer hover:bg-stone-700 transition-colors relative group overflow-hidden"
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="flex items-center gap-4 relative z-10">
          <div className="bg-white p-2 rounded-lg w-16 h-16 flex items-center justify-center shrink-0 overflow-hidden">
            {qrImage ? (
              <img src={qrImage} alt="QR Code" className="w-full h-full object-cover" />
            ) : (
              <QrCode size={32} className="text-stone-800" />
            )}
          </div>
          <div>
            <h3 className="font-bold text-lg">選手報到證</h3>
            <p className="text-stone-400 text-xs mt-1 flex items-center gap-1">
              <Upload size={12}/> 點擊設定圖片
            </p>
          </div>
        </div>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileUpload} 
          className="hidden" 
          accept="image/*" 
        />
        {/* Decorative bg */}
        <Trophy className="absolute right-[-20px] bottom-[-20px] text-white/5 w-32 h-32 rotate-12" />
      </div>

      {/* Official Site */}
      <div className="bg-red-600 rounded-xl p-5 text-white shadow-lg shadow-red-200 mb-8">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold">跑者追蹤與資訊</h3>
          <Trophy size={20} className="text-red-200"/>
        </div>
        <a 
          href="https://mtfujimarathon.com/" 
          target="_blank" 
          rel="noreferrer"
          className="bg-white text-red-600 px-4 py-2.5 rounded-lg font-bold w-full flex items-center justify-center gap-2 hover:bg-red-50 transition-colors"
        >
          前往官方網站 <ExternalLink size={16}/>
        </a>
      </div>

      {/* Info Cards */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-200 space-y-3">
        <div className="flex gap-3 items-start">
          <span className="text-red-500 font-bold text-sm shrink-0 bg-red-50 px-2 py-0.5 rounded">溫度</span>
          <span className="text-sm text-stone-600 leading-relaxed">起跑氣溫約 0°C - 5°C，等待區非常冷，請務必穿著拋棄式雨衣保暖。</span>
        </div>
        <div className="flex gap-3 items-start">
          <span className="text-blue-500 font-bold text-sm shrink-0 bg-blue-50 px-2 py-0.5 rounded">交通</span>
          <span className="text-sm text-stone-600 leading-relaxed">預計 07:00 全員搭乘計程車前往會場 (船津濱/大池公園)。</span>
        </div>
      </div>
    </div>
  );
};

export default MarathonView;