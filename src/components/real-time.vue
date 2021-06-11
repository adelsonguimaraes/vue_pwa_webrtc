<template>
    <section>
        <h1>Real Time</h1>

        <div class="grid">
            <div>
                <h3>Local</h3>
                <video class="local" src="" controls autoplay></video>
            </div>
            <div>
                <h3>Remoto</h3>
                <video class="remoto" src="" controls autoplay></video>
            </div>
        </div>

        <a href="" @click.prevent="connection()">Conectar</a>
    </section>
</template>


<script>
    export default {
        data() {
            return {
                stream: null,
                streamRemote: null,
                local: null,
                remote: null
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
                let element = document.querySelector('video.local');
                this.getUserMedia(config, element);
            },
            connection () {
                this.local = new RTCPeerConnection(null);
                this.remote = new RTCPeerConnection(null);

                // local
                this.local.addStream(this.stream);
                this.local.onicecandidate = (event) => {
                    if (event.candidate === null) return false;
                    this.remote.addIceCandidate(new RTCIceCandidate(event.candidate));
                }

                // remoto
                this.remote.onaddstream = (event) => {
                    if (!event.stream) return;
                    let element = document.querySelector('video.remoto');
                    element.srcObject = event.stream;
                }
                this.remote.onicecandidate = (event) => {
                    if (event.candidate === null) return false;
                    this.local.addIceCandidate(new RTCIceCandidate(event.candidate));
                }

                // oferta
                this.local.createOffer({offerToReceiveVideo: 1})
                .then(desc => {
                    console.log(desc);
                    this.local.setLocalDescription(desc);
                    this.remote.setRemoteDescription(desc);
                    return this.remote.createAnswer({offerToReceiveVideo: 1});
                })
                .then(desc => {
                    this.local.setRemoteDescription(desc);
                    this.remote.setLocalDescription(desc);
                })
            }
        },
        mounted() {
            this.getVideo();
        }
    }
</script>

<style>
    .grid {
        display: grid;
        grid-template-columns: 50% 50%;
    }
    .local, .remoto {
        width: 600px;
    }
</style>