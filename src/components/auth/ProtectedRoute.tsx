"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/context/ToastContext";

// List of allowed admin emails
const ALLOWED_ADMINS = [
  "admin@onlyxhouse.com",
  "sergymendoza@gmail.com",
  "test@example.com"
];

export default function ProtectedRoute({ 
  children, 
  requireAdmin = true 
}: { 
  children: React.ReactNode;
  requireAdmin?: boolean;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { addToast } = useToast();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Redirect to login if not authenticated
        router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      } else if (requireAdmin) {
        // Check for admin access only if required
        const isAllowed = ALLOWED_ADMINS.some(email => 
          user.email === email || user.email?.endsWith("@onlyxhouse.com")
        );
        
        if (!isAllowed) {
          addToast("No tienes permisos para acceder a esta área", "error");
          router.push("/mi-cuenta"); // Redirect to user dashboard instead of home
        } else if (!user.emailVerified) {
          // Admin always needs verification
          addToast("Por favor verifica tu correo electrónico para acceder", "warning");
        }
      }
    }
  }, [user, loading, router, pathname, addToast, requireAdmin]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
          <p className="text-gray-500 font-medium">Verificando acceso...</p>
        </div>
      </div>
    );
  }

  // Permission check for rendering
  const isAdmin = user && (
    ALLOWED_ADMINS.some(email => user.email === email || user.email?.endsWith("@onlyxhouse.com"))
  );

  if (!user) {
    return null;
  }

  if (requireAdmin && !isAdmin) {
    return null;
  }

  return <>{children}</>;
}
