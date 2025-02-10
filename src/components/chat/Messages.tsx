import { Message } from "@/types/chat";
import { useAuth } from "@/components/AuthProvider";

interface MessagesProps {
  messages: Message[];
}

const Messages = ({ messages }: MessagesProps) => {
  const { user } = useAuth();

  return (
    <div className="h-[500px] overflow-y-auto p-6" id="chat-messages">
      <div className="space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-4 ${
              msg.sender_id === user?.id ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sage-200 flex items-center justify-center">
              <span className="text-sage-700 text-sm font-semibold">
                {msg.sender_id === user?.id ? 'Y' : 'T'}
              </span>
            </div>
            <div
              className={`p-4 rounded-lg shadow-sm max-w-md ${
                msg.sender_id === user?.id
                  ? 'bg-sage-100 text-sage-900'
                  : 'bg-white text-gray-800'
              }`}
            >
              <p>{msg.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
