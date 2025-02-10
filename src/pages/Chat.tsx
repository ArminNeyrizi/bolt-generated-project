import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { Message, ChatSession } from "@/types/chat";
import { toast } from "sonner";
import Messages from "@/components/chat/Messages";
import MessageInput from "@/components/chat/MessageInput";
import ChatHeader from "@/components/chat/ChatHeader";

const Chat = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [session, setSession] = useState<ChatSession | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch or create chat session
  useEffect(() => {
    const fetchOrCreateSession = async () => {
      if (!user) return;

      try {
        // First try to fetch most recent existing active session
        let { data: existingSession } = await supabase
          .from('chat_sessions')
          .select('*')
          .eq('patient_id', user.id)
          .eq('status', 'active')
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (!existingSession) {
          // If no session exists, get the first available therapist
          const { data: therapist } = await supabase
            .from('therapists')
            .select('id')
            .eq('status', 'available')
            .limit(1)
            .single();

          if (!therapist) {
            toast.error("No therapists are currently available");
            return;
          }

          // Create new session
          const { data: newSession, error } = await supabase
            .from('chat_sessions')
            .insert([
              {
                patient_id: user.id,
                therapist_id: therapist.id,
                status: 'active'
              }
            ])
            .select()
            .single();

          if (error) throw error;
          existingSession = newSession;
        }

        setSession(existingSession);

        // Fetch messages for the session
        const { data: messageHistory } = await supabase
          .from('messages')
          .select('*')
          .eq('session_id', existingSession.id)
          .order('created_at', { ascending: true });

        setMessages(messageHistory || []);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrCreateSession();
  }, [user]);

  // Subscribe to new messages
  useEffect(() => {
    if (!session) return;

    const channel = supabase
      .channel('chat-messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `session_id=eq.${session.id}`
        },
        (payload) => {
          setMessages(current => [...current, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [session]);

  const sendMessage = async () => {
    if (!message.trim() || !session || !user) return;

    try {
      const { error } = await supabase
        .from('messages')
        .insert([
          {
            session_id: session.id,
            sender_id: user.id,
            content: message.trim()
          }
        ]);

      if (error) throw error;
      setMessage("");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        <Card className="max-w-4xl mx-auto">
          <ChatHeader onBack={() => navigate("/")} />
          <Messages messages={messages} />
          <MessageInput
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
            handleKeyPress={handleKeyPress}
          />
        </Card>
      </div>
    </div>
  );
};

export default Chat;
