(async () => {
    let player;

    const canvasContainer = document.getElementById('canvas-container');
    const loading = document.getElementById('loading');
    const wrapper = document.getElementById('wrapper');
    const pauseBtn = document.getElementById('pause');
    const playBtn = document.getElementById('play');
    const streamBtn = document.getElementById('stream-btn');
    const backBtn = document.getElementById('back-btn');
    const input = document.getElementById('input');
    const checkbox = document.getElementById('input-checkbox');
    const ipContainer = document.getElementById('ip-container');

    await init();

    streamBtn.addEventListener('click', async  function () {
        const cameraIP = input.value;
        if (!cameraIP) {
            alert('Camera IP address is required.');
            return false;
        }
        const isValidCameraIP = checkIfValidIP(cameraIP);
        if (!isValidCameraIP) {
            alert('Camera IP address is not valid.');
            return false;
        }
        if(checkbox.checked) {
            localStorage.setItem('cameraIP', cameraIP);
        }
        hideInput();
        showLoading();
        showPlayer();
        player = await loadStream(cameraIP);
        hideLoading();
        showPlaybackControls();
    });

    input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            streamBtn.click();
        }
    });

    checkbox.addEventListener('click',  function () {
        const isChecked = checkbox.checked;
        localStorage.setItem('rememberIP', isChecked);
        if(!isChecked) {
            localStorage.removeItem('cameraIP')
        }
    });

    pauseBtn.onclick = pause;
    playBtn.onclick = play;
    backBtn.onclick = back;

    async function init() {
        const storedCameraIP = localStorage.getItem("cameraIP");
        checkbox.checked = localStorage.getItem("rememberIP") === 'true';
        if (storedCameraIP) {
            input.value = localStorage.getItem("cameraIP");
        }
        showInput();
    }

    async function loadStream(ip) {
        const canvas = document.createElement('canvas');
        canvasContainer.appendChild(canvas);
        canvas.style.width = "calc(80vw)";
        canvas.style.height = "calc(45vw)";
        return  await loadPlayer({
            url: 'ws://' + location.host + `/api/stream/${ip}`,
            canvas: canvas
        })
    }

    function pause() {
        pauseBtn.style.display = "none";
        playBtn.style.display = "inline-block";
        player.pause();
    }

    function play() {
        playBtn.style.display = "none";
        pauseBtn.style.display = "inline-block";
        player.play();
    }

    function back() {
        if (player) {
            player.destroy();
        }
        hidePlayer();
        hidePlaybackControls();
        showInput();
        input.value = localStorage.getItem("cameraIP");
    }

    function showPlayer() {
        canvasContainer.style.display = 'block';
    }

    function hidePlayer() {
        canvasContainer.style.display = 'none';
    }

    function showInput() {
        ipContainer.style.display = 'block';
    }

    function hideInput() {
        ipContainer.style.display = 'none';
    }

    function showLoading() {
        loading.style.display = 'flex';
    }

    function hideLoading() {
        loading.style.display = 'none';
    }

    function showPlaybackControls() {
        playBtn.style.display = "none";
        pauseBtn.style.display = "inline-block";
        wrapper.style.display = 'block';
    }

    function hidePlaybackControls() {
        wrapper.style.display = 'none';
    }

    function checkIfValidIP(str) {
        // Regular expression to check if string is an IP address
        const regexExp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
        return regexExp.test(str);
    }
})();