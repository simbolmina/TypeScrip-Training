interface ChildProps {
  color: string;
  clickHandler: () => void;
  children?: React.ReactNode;
}

export const Child = ({ color, clickHandler }: ChildProps) => {
  return (
    <div>
      <h1>hi there</h1>
      <p>{color}</p>
      <button onClick={clickHandler}>Click Me</button>
    </div>
  );
};

//* These both are correct, this one tells TS that this is a react component and comes with React specific properties
//? FC is FunctionConponent
//
export const ChildAsFC: React.FC<ChildProps> = ({
  color,
  clickHandler,
  children,
}) => {
  return (
    <div>
      <h1>hi there</h1>
      <p>{color}</p>
      {children}
      <button onClick={clickHandler}>Click Me</button>
    </div>
  );
};
