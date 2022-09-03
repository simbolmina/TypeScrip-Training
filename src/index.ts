import { User } from "./models/User";

const user = new User({ id: 1, name: "bilal2", age: 122 });

user.on("save", () => {
  console.log(user);
});

user.save();
