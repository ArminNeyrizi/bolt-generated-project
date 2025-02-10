interface ChatHeaderProps {
  onBack: () => void;
}

const ChatHeader = ({ onBack }: ChatHeaderProps) => {
  return (
    <div className="p-6 border-b">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full bg-sage-200 flex items-center justify-center">
          <span className="text-sage-700 font-semibold">T</span>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Your Therapist</h2>
          <p className="text-sm text-gray-500">Professional Support</p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
