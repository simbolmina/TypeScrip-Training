import { useState } from "react";

const GuestList: React.FC = () => {
  const [name, setName] = useState("");
  // we add default values to useState() for typescript
  const [guests, setGuests] = useState<string[]>([]);
  // default value here is an array of string. we have to define those or else app wont work.

  const changeHandler = (event: any) => {
    // console.log(event.target.value);
    setName(event.target.value);
  };

  const clickHandler = (event: any) => {
    setName("");
    setGuests([...guests, name]);
    console.log(guests);
  };

  return (
    <div>
      <h3>Guest List</h3>
      <ul>
        {guests.map((guest) => (
          <li key={guest}>{guest}</li>
        ))}
      </ul>
      <input value={name} onChange={changeHandler} />
      <button onClick={clickHandler}>Add Guest</button>
    </div>
  );
};

export default GuestList;
