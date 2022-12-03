import { GetServerSidePropsContext } from "next";

interface Props {
  user: {
    id: number;
    name: string;
    username: string;
    email: string;
  };
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const response = await fetch(
    `http://jsonplaceholder.typicode.com/users/${context.query.id}`
  );
  const data = await response.json();

  return {
    props: {
      user: data || null,
    },
  };
};

export default function Profile({ user }: Props) {
  if (Object.keys(user).length === 0) {
    return <div>Invalid user id</div>;
  }

  return (
    <div>
      <div>{user.name}</div>
      <div>{user.email}</div>
    </div>
  );
}
