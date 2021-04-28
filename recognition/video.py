
import cv2
from cv2 import VideoWriter, VideoWriter_fourcc, imread, resize
import os
from subprocess import call

img_root = 'generate/'
out_root = 'damn.mp4'
fps = 30.0   #帧率
img = cv2.imread(img_root+'1.jpg')
size = (img.shape[1], img.shape[0])
print(size)
fourcc = VideoWriter_fourcc(*"XVID")  #支持jpg
videoWriter = cv2.VideoWriter(out_root, fourcc, fps, size)
im_names = os.listdir(img_root)
print(len(im_names))
for im_name in range(1,918):
    string = img_root  + str(im_name) + '.jpg'
    #print(string)
    frame = cv2.imread(string)
    #frame = cv2.resize(frame, size)
    videoWriter.write(frame)

videoWriter.release()

dir = out_root.strip(".mp4")
#command = "ffmpeg -i %s.avi %s.mp4" % (dir, dir)   #使用ffmped将avi压缩为mp4,注意两个的路径
#call(command.split())
