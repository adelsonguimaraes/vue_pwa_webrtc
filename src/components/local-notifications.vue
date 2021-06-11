<template>
    <section>
        <h1>Notificações Locais</h1>

        <p>Permissão: {{ permission }} <a href="" @click.prevent="request()" v-if="permission !== 'granted'">Solicitar</a></p>

        <a href="" @click.prevent="firePersistent('Click para notificar', 'Notificando após um click!')">notificação</a>

        <img src="http://localhost/vue_pwa_webrtc/src/assets/logo.png">
    </section>
</template>

<script>
export default {
    data() {
        return {
            permission: null
        }
    },
    methods: {
        fire (title, body) {
            let op = {
                body: body,
                icon: `http://localhost/vue_pwa_webrtc/src/assets/logo.png`
            };
            new Notification(title, op);
        },
        // só vai funcionar após o build
        firePersistent () {
            let title = "Teste de notificação local";
            let op = {
                body: `Testando notificações locais`,
                icon: `http://localhost/vue_pwa_webrtc/src/assets/logo.png`
            };
            navigator.serviceWorker.getRegistration()
            .then(reg => {
                reg.showNotification(title, op)
            }).catch(err => {
                console.warn(err)
            });
        },
        request() {
            Notification.requestPermission(() => {
                this.permission = Notification.permission
            })
        }
    },
    mounted() {
        this.permission = Notification.permission
        // this.fire ('Notificação Mounted', "Notificação disparada do Mounted");
    }
}
</script>