# Presentationist - ww165, zz208

## Prod Part - production for checking
```
Code in ./prod/
No installation needed.
Download code and run ./prod/index.html with your browser. Then you can check the whole website.
```

### Prod Note
```
Code in ./prod/ is not designed for human read.
Do not edit code and files in ./prod/
```

## Dev Part - code for development
```
Code in ./src/
designed for human read and editing.
```

### Dev Setup
```
Node.js and npm are needed to run the development code.
```
To Install, See [Install Reference](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/).


### Dev: Compiles and hot-reloads for development
```
npm run serve
Then you can check the website in dev mode(should be just like prod mode) at localhost:8080.
```

### Dev: Compiles and minifies for production
```
npm run build
A directory named './dist' will be created, run './dist/index.html' to check the built website.
```

### Dev: Lints and fixes files
```
npm run lint
```

### Dev: Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Recognition and Caption Part
```
Code in ./recognition
train.py: Training DNN model over FER2013 dataset.
model.py: ResNet based deep neural network.
classifyANDcaption.py: Inference the trained model on the video frame by frame, get the results,  caption on the initial figure, and download it one by one locally.
videoaudio.py: Retrieve the initial audio track from the video and download it locally.
video.py: Connect all the captioned frames to a video and attach the splitted audio file to the new video.

TO RUN, DOWNLOAD THE DATASET [FER2013](https://www.kaggle.com/msambare/fer2013) AT FIRST.
```

