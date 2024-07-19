import { getLoggedInUser } from "@/services/authService";

export default async function Posts() {
  const user = await getLoggedInUser();

  console.log(user);



  return (
    <div>
      {user ? <h1>Logged</h1> : <h1>Not logged in</h1>}
    </div>
  );
}
