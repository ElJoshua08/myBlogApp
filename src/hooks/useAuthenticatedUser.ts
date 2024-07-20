import { useEffect, useState } from "react";
import { getLoggedInUser } from "@/services/authService";

export const useAuthenticatedUser = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getLoggedInUser();
      setUser(fetchedUser);
    };

    fetchUser();
  }, []);

  return user;
};
