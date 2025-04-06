import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import SentenceItem from "./SentenceItem";

const SentenceList = ({chapterSentences}) => {
  // Sample array of sentences
  const [sentences, setSentences] = useState([
    "This is the first sentence of the chapterThis is the first sentence of the chapterThis is the first sentence of the chapterThis is the first sentence of the chapterThis is the first sentence of the chapterThis is the first sentence of the chapterThis is the first sentence of the chapterThis is the first sentence of the chapterThis is the first sentence of the chapterThis is the first sentence of the chapterThis is the first sentence of the chapterThis is the first sentence of the chapterThis is the first sentence of the chapterThis is the first sentence of the chapter.",
    "Here is the second sentence, which is longer than the first one.",
    "Another sentence follows to demonstrate drag-and-drop.",
    "Finally, this is the last sentence in the example."
  ]);
  const [draggableIndex, setDraggableIndex] = useState(null);
  // Handle drag and drop reordering
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reordered = Array.from(sentences);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);

    setSentences(reordered);
    setDraggableIndex(null);
  };
  const handleDoubleClick = (index) => {
    setDraggableIndex(index);
  };
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="sentences">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
           // style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}
          >
            {chapterSentences.map((sentence, index) => (
              <Draggable key={index} draggableId={`${index}`} index={index} 
              isDragDisabled={draggableIndex !== index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <SentenceItem sentence={sentence.value} 
                    onDoubleClick={() => handleDoubleClick(index)}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default SentenceList;
