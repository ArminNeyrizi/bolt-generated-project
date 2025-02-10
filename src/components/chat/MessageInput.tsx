import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface MessageInputProps {
  message: string;
  setMessage: (message: string) => void;
  sendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
}

const MessageInput = ({ message, setMessage, sendMessage, handleKeyPress }: MessageInputProps) => {
  return (
    <div className="p-6 border-t bg-white">
      <div className="flex space-x-4">
        <Input
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1"
        />
        <Button 
          className="bg-sage-300 hover:bg-sage-400"
          onClick={sendMessage}
          disabled={!message.trim()}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
