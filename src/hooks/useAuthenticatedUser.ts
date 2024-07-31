import { useEffect, useState } from "react";
import { getLoggedInUser } from "@/services/authService";
import useUserStore from "@/stores/useUserStore";

export const useAuthenticatedUser = () => {
  const [user, setUser] = useState<any>(null);
  const { user: userStoreUser, setUser: setUserStoreUser } = useUserStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If user is already logged in, then we can use the userStore to get the user
    if (userStoreUser) {
      setUser(userStoreUser);
      setLoading(false);
      return;
    }

    // If user is not logged in, then we need to fetch the user
    const fetchUser = async () => {
      const fetchedUser = await getLoggedInUser();
      setUser(fetchedUser);
      setLoading(false);

      setUserStoreUser(fetchedUser);
    };

    fetchUser();
  }, [userStoreUser, setUser, setUserStoreUser]);

  return { user, loading };
};
