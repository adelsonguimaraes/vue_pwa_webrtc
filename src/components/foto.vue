<template>
    <section>
        <h1>Tirando Foto</h1>

        <div class="grid">
            <div>
                <video src="" controls autoplay></video>
                <a href="" @click.prevent="getVideo()">iniciar</a>
            </div>
            <div>
                <img src="" class="foto">
                <a href="" @click.prevent="getFoto()">Tirar Foto</a>
            </div>
        </div>
    </section>
</template>


<script>
    export default {
        data() {
            return {
                stream: null
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
                    audio: false
                }
                let element = document.querySelector('video');
                this.getUserMedia(config, element);
            },
            getFoto() {
                let foto = new ImageCapture(this.stream.getVideoTracks()[0])
                foto.takePhoto()
                .then(blob => {
                    let element = document.querySelector('img.foto');
                    element.src = window.URL.createObjectURL(blob);

                    // let form = new FormData();
                    // form.append('image', blob);
                    // form.append('id', 1);
                    // form.append('title', 'Foto pwa');
                    // fetch('', {
                    //     method: 'POST',
                    //     body: form
                    // }).then(r=>r.json())
                    // .then(json => {

                    // }).catch(err => {

                    // });
                }).catch(err => {
                    console.error(err);
                })
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