import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";

export default function AuthForm(){
    const [email, setEmail ] = useState("");
    const [password, setPassword ] = useState("");
    const [loading, setLoading ] = useState(false);
    const [isLogin, setIsLogin ] = useState(true);
    const [error, setError ] = useState<string | null>(null);

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try{
            const { data, error } = isLogin 
            ? await supabase.auth.signInWithPassword({ email, password })
            : await supabase.auth.signUp({ email, password });
            
            if(error) throw error;

            if (data?.session) {
            window.location.href = "/movies";
}
        } catch(err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return(
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div 
                    className="max-w-md mx-auto p-4 bg-white rounded-xl shadow-md"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="text-xl font-bold mb-4 text-center">
                        {isLogin ? "Login": "Register"}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input 
                            className="w-full border px-4 py-2 rounded"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input 
                            className="w-full border px-4 py-2 rounded"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <button
                            type="submit"
                            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
                            disabled={loading}
                        >
                            {loading ? "Loading..." : isLogin ? "Login" : "Register"}
                        </button>
                    </form>

                    <p
                        className="text-sm text-center mt-4 text-black-500 underline cursor-pointer hover:text-red-500"
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? "Need an account? Register" : "Alredy have an account? Login"}
                    </p>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );  
}