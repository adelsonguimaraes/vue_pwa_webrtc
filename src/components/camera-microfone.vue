<template>
    <section>
        <h1>Audio e Vídeo</h1>

        <div class="grid">
            <div>
                <video src="" controls autoplay></video>
                <a href="" @click.prevent="getVideo()">iniciar</a>
            </div>
            <div>
                <audio src="" controls autoplay></audio>
                <a href="" @click.prevent="getAudio()">Voz</a>
            </div>
        </div>
    </section>
</template>


<script>
    export default {
        data() {
            return {

            }
        },
        methods: {
            getUserMedia(config, element) {
                navigator.mediaDevices.getUserMedia(config)
                .then(stream => {
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
                    audio: false
                }
                let element = document.querySelector('video');
                this.getUserMedia(config, element);
            },
            getAudio() {
                let config = {
                    video: false,
                    audio: true
                }
                let element = document.querySelector('audio');
                this.getUserMedia(config, element);
            }
        }
    }
</script>

<style>
    .grid {
        display: grid;
        grid-template-columns: 50% 50%;
    }
</style>