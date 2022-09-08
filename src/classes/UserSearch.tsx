import { Component } from "react";

interface User {
  name: string;
  age: number;
}

interface UserSearchProps {
  users: User[];
}

interface UserSearchState {
  name: string;
  user: User | undefined;
  //   user: {
  //     name: string;
  //     age: number;
  //   } | undefined;
}

export class UserSearch extends Component<UserSearchProps> {
  state: UserSearchState = {
    name: "",
    user: undefined,
  };

  clickHandler = () => {
    const foundUser = this.props.users.find((user) => {
      return user.name === this.state.name;
    });

    this.setState({ user: foundUser });
  };

  render() {
    const { user, name } = this.state;
    return (
      <div>
        User Search Component
        <br />
        <input
          value={name}
          onChange={(e) => this.setState({ name: e.target.value })}
        />
        <br />
        <button onClick={this.clickHandler}>Find User</button>
        <div>
          {user && user.name}
          {user && user.age}
        </div>
      </div>
    );
  }
}
