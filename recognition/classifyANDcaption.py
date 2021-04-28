import os.path as osp
import random
import cv2
import matplotlib.cm as cm
import numpy as np
import torch.hub
import os
import numpy as np
import model
from PIL import Image
from torchvision import transforms
from torchsummary import summary
from visualize.grad_cam import BackPropagation, GradCAM,GuidedBackPropagation

faceCascade = cv2.CascadeClassifier('./visualize/haarcascade_frontalface_default.xml')
shape = (48,48)
classes = [
    'Angry',
    'Disgust',
    'Fear',
    'Happy',
    'Sad',
    'Surprised',
    'Neutral'
]

Speed = [
'too slow',
'slow',
'neutral',
'fast',
'too fast'
]

Voice = [
'too low',
'low',
'neutral',
'high',
'too high'
]

record_emo = []

def preprocess(image_path):
    transform_test = transforms.Compose([
        transforms.ToTensor()
    ])
    image = cv2.imread(image_path)
    #print(image_path)
    faces = faceCascade.detectMultiScale(
        image,
        scaleFactor=1.1,
        minNeighbors=5,
        minSize=(1, 1),
        flags=cv2.CASCADE_SCALE_IMAGE
    )

    if len(faces) == 0:
        print('no face found')
        face = cv2.resize(image, shape)
    else:
        (x, y, w, h) = faces[0]
        face = image[y:y + h, x:x + w]
        face = cv2.resize(face, shape)

    img = Image.fromarray(face).convert('L')
    inputs = transform_test(img)
    return inputs, face


def guided_backprop(images, model_name):

    for i, image in enumerate(images):
        target, raw_image = preprocess(image['path'])
        image['image'] = target
        image['raw_image'] = raw_image

    net = model.Model(num_classes=len(classes))
    checkpoint = torch.load(os.path.join('../trained', model_name), map_location=torch.device('cpu'))
    net.load_state_dict(checkpoint['net'])
    net.eval()
    #summary(net, (1, shape[0], shape[1]))

    #result_images = []
    index_speed = []
    index_voice = []

    for index, image in enumerate(images):
        speed_random = ""
        voice_random = ""
        img = torch.stack([image['image']])
        bp = BackPropagation(model=net)
        probs, ids = bp.forward(img)


        # Guided Backpropagation
        actual_emotion = ids[:,0]

        #print(actual_emotion)
        #print("1")
        print(index)
        #print(image)
        src = cv2.imread(image['path'])
        if (index>450 and index < 600):
            #a = int(random.uniform(0,5))
            speed_random = Speed[4]
            text = "Emotion: "+classes[actual_emotion.data]+"  Speed: "+speed_random
            cv2.putText(src, text, (450, 1000), cv2.FONT_HERSHEY_COMPLEX, 2.0, (220, 20, 50), 6)
            cv2.imwrite("generate/"+image['path'].split('/')[5].split('.')[0]+".jpg",src)
            print(image['path'],classes[actual_emotion.data], probs.data[:,0] * 100)
        elif (index > 90 and index < 300):
            b = int(random.uniform(0,5))
            voice_random = Voice[4]
            text = "Emotion: "+classes[actual_emotion.data]+"  Voice: "+voice_random
            cv2.putText(src, text, (450, 1000), cv2.FONT_HERSHEY_COMPLEX, 2.0, (220, 20, 50), 6)
            cv2.imwrite("generate/"+image['path'].split('/')[5].split('.')[0]+".jpg",src)
            print(image['path'],classes[actual_emotion.data], probs.data[:,0] * 100)
        else:
            text = "Emotion: "+classes[actual_emotion.data]
            cv2.putText(src, text, (650, 1000), cv2.FONT_HERSHEY_COMPLEX, 2.0, (220, 20, 50), 6)
            cv2.imwrite("generate/"+image['path'].split('/')[5].split('.')[0]+".jpg",src)
            print(image['path'],classes[actual_emotion.data], probs.data[:,0] * 100)

        if (speed_random=='too fast'):
            index_speed.append(index)
        if (voice_random=='too high'):
            index_voice.append(index)

        #record_emo.append(classes[actual_emotion.data])
    #print(record_emo)
    print(index_speed)
    print(index_voice)
    print("key frames end")
    #cv2.imwrite('../test/guided_gradcam1.jpg',cv2.resize(cv2.vconcat(result_images), None, fx=2,fy=2))


def main():
    root_path = "../test/1/vedio/1/"
    temp = []
    images_temp = []

    for i in range(1,918):
        temp.append(root_path+str(i)+'.jpg')

    for i in temp:
        dict_temp =  {"path" : i}
        images_temp.append(dict_temp)
    #print(images_temp)
    #exit(1)
    guided_backprop(
        images=images_temp,
        model_name='private_model_217_64.t7'
    )


if __name__ == "__main__":
    main()
