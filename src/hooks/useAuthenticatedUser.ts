import { useEffect, useState } from "react";
import { getLoggedInUser } from "@/services/authService";

export const useAuthenticatedUser = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getLoggedInUser();
      setUser(fetchedUser);
      setLoading(false);
    };

    fetchUser();
  }, []);

  return { user, loading };
};
