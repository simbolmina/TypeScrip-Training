import { useState, useRef, useEffect } from "react";

const users = [
  { name: "Sarah", age: 20 },
  { name: "Alex", age: 21 },
  { name: "Kadir", age: 12 },
];

const UserSearch: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [name, setName] = useState("");
  const [user, setUser] = useState<{ name: string; age: number } | undefined>();

  //? focus input when loaded!!!
  useEffect(() => {
    //!type guard
    if (!inputRef.current) return;

    inputRef.current.focus();
    // inputRef.current?.focus();
  }, []);

  const clickHandler = () => {
    const foundUser = users.find((user) => {
      return user.name === name;
    });

    setUser(foundUser);
  };
  return (
    <div>
      User Search Component
      <br />
      <input
        ref={inputRef}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <button onClick={clickHandler}>Find User</button>
      <div>
        <h4>User Detail</h4>
        {user && user.name}
        {user && user.age}
      </div>
    </div>
  );
};

export default UserSearch;
