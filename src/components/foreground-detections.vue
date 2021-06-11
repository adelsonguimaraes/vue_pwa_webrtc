<template>
    <section>
        <h1>Verificação em primeiro plano</h1>

        <p>Contagem regressiva: {{ counter }}</p>
        <small>Saber quando a aba do sistema está ativa</small>

        <p v-for="(log, index) in logs" :key="index">
            A Janela estava
            <span v-if="!log">Visível</span>
            <span v-if="log">Oculta</span>
        </p>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                logs: [],
                counter: 10
            }
        },
        methods: {
            visibility() {
                this.logs.push(document.hidden)
            },
            timer () {
                if (document.hidden) return false;
                if (this.counter > 0) {
                    this.counter--;
                }else{
                    this.counter = 'done';
                }
            }
        },
        mounted() {
            document.addEventListener('visibilitychange', this.visibility);
            setInterval(() => {
                this.timer()
            }, 1000);
        }
    }
</script>

<style scope>
    small {
        padding: 5px;
        background-color: rgb(190, 235, 101);
        border-radius: 2px;
        font-weight: 600;
    }
</style>