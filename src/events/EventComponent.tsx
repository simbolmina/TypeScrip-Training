const EventComponent: React.FC = () => {
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {};

  const dragStartHandler = (event: React.DragEvent<HTMLDivElement>) => {
    console.log("dont drag me");
  };
  return (
    <div>
      <input onChange={changeHandler} />
      <div draggable onDragStart={dragStartHandler}>
        Drag Me!
      </div>
    </div>
  );
};

export default EventComponent;
