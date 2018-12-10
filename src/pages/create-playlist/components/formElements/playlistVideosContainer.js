import React, { Component } from "react";
import { connect } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import PlaylistVideoPreview from "./playlistVideoPreview";
import { playlistReorderVideos } from "../../../../actions/playlist";

@connect(null, (dispatch) => ({
  playlistReorderVideos: (playlist_id, videos) => dispatch(playlistReorderVideos({ playlist_id, videos })),
}))
export default class PlaylistVideosContainer extends Component {
  onDragEnd = (result) => {
    const { videos, playlistId, playlistReorderVideos } = this.props;

    if (!result.destination) {
      return;
    }

    let newVideos = this.reorder(videos, result.source.index, result.destination.index);

    newVideos = newVideos.map((item, index) => ({ id: item.id, position: index }));
    console.log("new videos", newVideos);

    playlistReorderVideos(playlistId, newVideos);
  };

  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  render() {
    const { videos, onDelete } = this.props;

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              className={snapshot.isDraggingOver ? "drag-active" : "drag-over"}
            >
              {videos.map((video, index) => (
                <Draggable key={`video-${video.id}`} draggableId={video.id} index={index}>
                  {(provided, snapshot) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={snapshot.isDragging ? "is-dragging" : ""}
                    >
                      <PlaylistVideoPreview
                        {...video}
                        onDelete={onDelete}/>
                    </li>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}
