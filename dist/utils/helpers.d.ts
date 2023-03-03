import { Video, Subtitle } from "./types";
declare const formatDuration: (time: number) => string;
declare const render: (container: HTMLAreaElement, video: Video | undefined, subtitles: Subtitle[] | undefined, playbackSpeed: number, playbackSpeeds: Number[], videoCaption: String | null) => void;
export { formatDuration, render };
