# camPp
**Simple RTSP IP Camera Stream Server and Player for Web Browsers**

This project offers a straightforward solution for streaming RTSP (Real Time Streaming Protocol) video from IP 
Camera on a local network, allowing convenient monitoring in Web Browser while working on your desk.

### Problem Statement

As a part-time software engineer and a full-time dad, I faced a challenge with monitoring my baby's activities during work hours. 
I use WYZE Cam as a baby monitoring camera. While IP Cameras are effective through their mobile app, 
streaming video in a browser either isn't available or requires a subscription, which is not a feasible option.

### Solution Overview

To address this issue, I decided to create a simple RTSP stream server that facilitates video streaming within the local network. 
Leveraging a Docker container on my Synology NAS, I deployed an RTSP server to consistently provide the video stream 24/7.
The simple UI lets user type Camera local IP address and stream the video using WebSocket Connection.

This solution eliminates the subscription requirement and allows easy access to the video feed in the Web Browser.

![Screenshot 2023-12-21 at 11 52 32 PM](https://github.com/hyart/camPp/assets/142290537/6715b98b-31d5-4544-8c69-b4acb32d68f1)
![Screenshot 2023-12-21 at 11 50 11 PM](https://github.com/hyart/camPp/assets/142290537/0294af4b-a266-4574-b7a0-78aaedc9524d)

## Project Details

### Technologies Used
- Node.js/Express.js
- Vanilla.js 😎
- Some CSS 😀
- [RTSP Relay](https://github.com/k-yle/rtsp-relay): Used for handling RTSP streaming and relay functionalities.
- [Pug](https://github.com/pugjs/pug): Used as a template engine for Node.js.

### Features

- Streams video from IP Camera using RTSP protocol.
- Provides a user-friendly UI for entering the camera's IP address and playing the stream.

### Getting Started

First make sure your IP Camera supports RTSP.
If not, you might need to install firmware that enables RTSP support.

### Usage

Specify `username`, `password` and `path` (if needed) for RTSP url in `config.js`.

```
const config = {
    port: 8080,
    ipCamera: {
        username: '',
        password: '',
        path: ''
    }
}
```
_In my case WYZE Cam RTSP url looks following:
`rtsp://username:password@192.168.1.15/live`_

1. `npm install`
2. `npm start`

To run in dev mode use `npm dev`.

_The application will be accessible at http://localhost:8080/._

### License

**MIT License**

_Copyright (c) 2023 **hyart**_
