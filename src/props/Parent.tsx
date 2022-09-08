import { ChildAsFC } from "./Child";

const Parent = () => {
  const clickHandler = () => {
    console.log("clicked");
  };

  return (
    <ChildAsFC color="yellow" clickHandler={clickHandler}>
      test
    </ChildAsFC>
  );
};

export default Parent;
