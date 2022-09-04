// import { UserForm } from "./views/UserForm";
// import { UserEdit } from "./views/UserEdit";
import { User, UserProps } from "./models/User";
import { UserList } from "./views/UserList";
import { Collection } from "./models/Collection";

// const user = User.buildUser({ name: "NAME", age: 20 });

// const root = document.getElementById("root");

// if (root) {
//   const userForm = new UserForm(root, user);
//   //? ! after ('root') declares that it is not a null.
//   userForm.render();
// } else {
//   throw new Error("root element not found");
// }

// if (root) {
//   const userEdit = new UserEdit(root, user);
//   //? ! after ('root') declares that it is not a null.

//   userEdit.render();

//   console.log(userEdit);
// } else {
//   throw new Error("root element not found");
// }

const users = new Collection(
  "http://localhost:3000/users",
  (json: UserProps) => {
    return User.buildUser(json);
  }
);

users.on("change", () => {
  const root = document.getElementById("root");

  if (root) {
    new UserList(root, users).render();
  }
});

users.fetch();
