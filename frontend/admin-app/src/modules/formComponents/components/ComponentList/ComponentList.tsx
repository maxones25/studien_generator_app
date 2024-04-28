import { DragDropContext, Draggable, Droppable, OnDragEndResponder } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
export interface ComponentListProps <Data extends Record<string, any>> {
  data: Data[];
  renderItem: (
    item: Data,
  ) => JSX.Element;
  saveSequence: (data: Data[]) => void,
}

export function ComponentList<Data extends Record<string, any>>({ 
  data,
  renderItem,
  saveSequence,
}: ComponentListProps<Data>) {
  const [items, setItems] = useState(data);

  useEffect(() => {
    if (data)
      setItems(data)
  },[data]);

  const reorder = (
    list: Data[],
    startIndex: number,
    endIndex: number
  ) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const handleDragEnd: OnDragEndResponder = (result) => {
    if (!result.destination) {
      return;
    }

    const newItems = reorder(
      data,
      result.source.index,
      result.destination.index
    );
    
    setItems(newItems);
    saveSequence(newItems);
  };

  // const getListStyle = (isDraggingOver: boolean) => {
  //   return {
      
  //   };
  // };

  // const getItemStyle = (
  //   isDragging: boolean,
  //   draggableStyle?: DraggingStyle | NotDraggingStyle
  // ): React.CSSProperties => {
  //   console.log(draggableStyle);
  //   return {
  //     // some basic styles to make the items look a bit nicer


  //     // change background colour if dragging

  //     // styles we need to apply on draggables
  //     ...draggableStyle,
  //   };
  // };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            // style={getListStyle(snapshot.isDraggingOver)}
          >
            {items.map((component, index) => (
              <Draggable
                key={component.id}
                draggableId={component.id}
                index={index}
              >
                {(provided) => {
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      // style={getItemStyle(
                      //   snapshot.isDragging,
                      //   provided.draggableProps.style
                      // )}
                    >
                      {renderItem(component)}
                    </div>
                  );
                }}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
