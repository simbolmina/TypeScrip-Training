import { useState } from "react";

const users = [
  { name: "Sarah", age: 20 },
  { name: "Alex", age: 21 },
  { name: "Kadir", age: 12 },
];

const UserSearch: React.FC = () => {
  const [name, setName] = useState("");
  const [user, setUser] = useState<{ name: string; age: number } | undefined>();
  const clickHandler = () => {
    const foundUser = users.find((user) => {
      return user.name === name;
    });

    setUser(foundUser);
  };
  return (
    <div>
      User Search Component
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={clickHandler}>Find User</button>
      <div>
        {user && user.name}
        {user && user.age}
      </div>
    </div>
  );
};

export default UserSearch;
