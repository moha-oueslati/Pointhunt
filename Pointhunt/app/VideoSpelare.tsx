import { View } from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";
import React from "react";

export default function VideoSpelare({
  path,
  h,
  w,
}: {
  path: string;
  h: number;
  w: number;
}) {
  //path är sökvägen till videofilen
  const player = useVideoPlayer(path, (player) => {
    player.loop = true;
  });
  return (
    <View
      style={{
        width: w,
        height: h,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <VideoView
        style={{ width: "100%", height: "100%" }}
        player={player}
        nativeControls
      />
    </View>
  );
}
