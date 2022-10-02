import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const video = document.getElementById("videoLive__video");
const controllBtn = document.getElementById("videoLive__Btn");

let stream;
let recorder;
let videoFile;
let timeoutId;

const files = {
  input: "recording.webm",
  output: "output.mp4",
  thumb: "thumb.jpg",
};

const downloadFile = (fileUrl, fileName) => {
  const a = document.createElement("a");
  a.href = fileUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
};

const handleDownload = async () => {
  controllBtn.removeEventListener("click", handleDownload);
  controllBtn.innerText = "TransCoding...";
  controllBtn.disabled = true;

  const ffmpeg = createFFmpeg({ log: true });
  await ffmpeg.load();
  ffmpeg.FS("writeFile", files.input, await fetchFile(videoFile));
  console.log("write");

  await ffmpeg.run("-i", files.input, "-r", "60", files.output);
  await ffmpeg.run(
    "-i",
    files.input,
    "-ss",
    "00:00:00",
    "frames:v",
    "5",
    files.thumb
  );
  console.log("run");

  const mp4File = ffmpeg.FS("readFile", files.output);
  const thumbFile = ffmpeg.FS("readFile", files.output);

  const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
  const thumbBlob = new Blob([thumbFile.buffer], { type: "video/mp4" });

  const mp4Url = URL.createObjectURL(mp4Blob);
  const thumbUrl = URL.createObjectURL(thumbBlob);

  downloadFile(mp4Url, "myRecording.mp4");
  downloadFile(thumbUrl, "thumbnail.jpg");

  ffmpeg.FS("unlink", files.input);
  ffmpeg.FS("unlink", files.output);
  ffmpeg.FS("unlink", files.thumb);

  URL.revokeObjectURL(mp4Url);
  URL.revokeObjectURL(thumbUrl);
  URL.revokeObjectURL(videoFile);

  controllBtn.innerText = "Record Again";
  controllBtn.disabled = false;
  controllBtn.addEventListener("click", handleStart);
};

const handleStop = () => {
  clearTimeout(timeoutId);
  controllBtn.innerText = "📃";
  controllBtn.removeEventListener("click", handleStop);
  controllBtn.addEventListener("click", handleDownload);
  recorder.stop();
};

const handleStart = (event) => {
  event.preventDefault();
  controllBtn.innerText = "녹화 중단";
  controllBtn.removeEventListener("click", handleStart);
  controllBtn.addEventListener("click", handleStop);

  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (event) => {
    videoFile = URL.createObjectURL(event.data);
    video.srcObject = null;
    video.src = videoFile;
    video.play();
  };
  recorder.start();
  timeoutId = setTimeout(() => {
    handleStop();
  }, 5000);
};

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: { width: { ideal: 1280 }, height: { ideal: 720 } },
  });
  video.srcObject = stream;
  video.play();
};
init();

controllBtn.addEventListener("click", handleStart);
