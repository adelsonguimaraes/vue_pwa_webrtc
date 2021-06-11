<template>
    <section>
        <h1>Gravador</h1>

        <div class="grid">
            <div>
                <video src="" controls autoplay></video>
                <a href="" @click.prevent="gravar()">Gravar</a>
            </div>
            <div>
                <a href="" @click.prevent="getDownload()">Download</a>
            </div>
        </div>
    </section>
</template>


<script>
    export default {
        data() {
            return {
                stream: null,
                chunks: []
            }
        },
        methods: {
            getUserMedia(config, element) {
                navigator.mediaDevices.getUserMedia(config)
                .then(stream => {
                    this.stream = stream;
                    element.srcObject = stream;
                    // element.src = window.URL.createObjectURL(stream);
                })
                .catch(err => {
                    console.error(err);
                });
            },
            getVideo() {
                let config = {
                    video: true,
                    audio: true
                }
                let element = document.querySelector('video');
                this.getUserMedia(config, element);
            },
            gravar () {
                this.recorder = new MediaRecorder(this.stream, {
                    audioBitsPerSecond: 128000,
                    videoBitsPerSecond: 2500000,
                    mimeType: 'video/webm'
                });
                this.recorder.ondataavailabe = (event) => {
                    this.chunks.push(event.data);
                }

                this.recorder.onstop = () => {
                    let blob = new Blob(this.chunks, {type: 'video/webm'});

                    // fornecendo pra download
                    this.chunks = [];

                    let a = document.createElement('a');
                    document.body.appendChild(a);
                    a.style = "display: none";
                    a.href = window.URL.createObjectURL(blob);
                    a.download = "test.webm";
                    a.click();
                }

                this.recorder.start();
            },
            getDownload() {
                this.recorder.stop();
            }
        },
        mounted () {
            this.getVideo();
        }
    }
</script>

<style>
    .grid {
        display: grid;
        grid-template-columns: 50% 50%;
    }
</style>