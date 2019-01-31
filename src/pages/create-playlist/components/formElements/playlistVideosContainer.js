import React, { Component } from "react";
import { connect } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import PlaylistVideoPreview from "./playlistVideoPreview";
import { playlistReorderVideos, playlistUpdateVideo, UPDATE_REORDERED_VIDEOS } from "../../../../actions/playlist";

@connect(null, (dispatch) => ({
  playlistReorderVideos: (playlist_id, videos) => dispatch(playlistReorderVideos({ playlist_id, videos })),
  playlistUpdateVideo: (id, title, description) => dispatch(playlistUpdateVideo({ id, title, description })),
  updateReorderedVideos: (videos) => dispatch({ type: UPDATE_REORDERED_VIDEOS, data: videos })
}))
export default class PlaylistVideosContainer extends Component {
  onDragEnd = async (result) => {
    const { videos, playlistId, playlistReorderVideos, updateReorderedVideos } = this.props;

    if (!result.destination) {
      return;
    }

    let newVideos = this.reorder(videos, result.source.index, result.destination.index);

    newVideos = newVideos.map((item, index) => ({ ...item, position: index }));
    console.log("new videos", newVideos);

    playlistReorderVideos(playlistId, newVideos);
    updateReorderedVideos(newVideos);
  };

  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  onUpdateTitle = (videoId, title) => {
    const { playlistUpdateVideo } = this.props;

    playlistUpdateVideo(videoId, title, "");
  }

  render() {
    const { videos, onDelete, showSetThumbnail, onSetThumbnail } = this.props;

    if (!videos) {
      return null;
    }

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
                        onUpdateTitle={this.onUpdateTitle}
                        onSetThumbnail={onSetThumbnail}
                        showSetThumbnail={showSetThumbnail}
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
