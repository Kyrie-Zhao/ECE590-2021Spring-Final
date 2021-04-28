from moviepy.editor import VideoFileClip
import cv2
fg_video_path = "1_1.mp4"

cap = cv2.VideoCapture('1_1.mp4')
#（ 视频总帧数cap.get(7) / 帧速率cap.get(5) = 时间video_time ）
video_time = float(cap.get(7) / cap.get(5))
print(cap.get(7) )
print(cap.get(5) )
print(video_time)

video = VideoFileClip(fg_video_path)
audio = video.audio
name = "raw.mp3"
audio.write_audiofile(name)


cap = cv2.VideoCapture('damn.mp4')
#（ 视频总帧数cap.get(7) / 帧速率cap.get(5) = 时间video_time ）
video_time = float(cap.get(7) / cap.get(5))
print(cap.get(7) )
print(cap.get(5) )
print(video_time)

#fg_video = VideoFileClip("raw.mp3")

video = VideoFileClip('damn.mp4')
#audio = fg_video.audio
videoclip2 = video.set_audio(audio)
name1 = "final_out.mp4"
videoclip2.write_videofile(name1)
