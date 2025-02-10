import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronRight, MessageCircle, Shield, Clock, LogIn } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const therapists = [
  {
    name: "Dr. Sarah Johnson",
    specialty: "Anxiety & Depression",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    available: true,
  },
  {
    name: "Dr. Michael Chen",
    specialty: "Relationship Counseling",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    available: true,
  },
  {
    name: "Dr. Emily Parker",
    specialty: "Stress Management",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    available: false,
  },
];

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("Successfully logged out!");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="container mx-auto px-4 py-4 flex justify-end">
        {user ? (
          <Button
            variant="outline"
            className="hover:bg-sage-50"
            onClick={handleLogout}
          >
            Sign Out
          </Button>
        ) : (
          <Button
            variant="outline"
            className="hover:bg-sage-50"
            onClick={() => navigate("/auth")}
          >
            <LogIn className="mr-2 h-4 w-4" />
            Sign In
          </Button>
        )}
      </header>
      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="px-4 py-2 rounded-full bg-sage-100 text-sage-700 text-sm font-medium mb-4 inline-block">
            Professional Support, Anytime
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Mental Health Matters
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with licensed therapists instantly through secure, confidential chat sessions.
          </p>
          <Button
            size="lg"
            className="bg-sage-300 hover:bg-sage-400 text-white transition-all"
            onClick={() => navigate("/chat")}
          >
            Start Chatting <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>

        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl bg-white shadow-sm border border-gray-100"
            >
              <MessageCircle className="h-10 w-10 text-sage-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Instant Connection</h3>
              <p className="text-gray-600">Chat with therapists immediately, no waiting lists.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-2xl bg-white shadow-sm border border-gray-100"
            >
              <Shield className="h-10 w-10 text-sage-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">100% Confidential</h3>
              <p className="text-gray-600">Your privacy is our top priority.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 rounded-2xl bg-white shadow-sm border border-gray-100"
            >
              <Clock className="h-10 w-10 text-sage-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Access help whenever you need it.</p>
            </motion.div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Available Therapists</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {therapists.map((therapist, index) => (
              <motion.div
                key={therapist.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index }}
              >
                <Card className="overflow-hidden hover-scale">
                  <img
                    src={therapist.image}
                    alt={therapist.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{therapist.name}</h3>
                    <p className="text-gray-600 mb-4">{therapist.specialty}</p>
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          therapist.available
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {therapist.available ? "Available" : "Busy"}
                      </span>
                      <Button
                        variant="outline"
                        className="hover:bg-sage-50"
                        onClick={() => navigate("/chat")}
                      >
                        Chat Now
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
