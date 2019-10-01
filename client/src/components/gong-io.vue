<script>
import ringGongService from '../services/ring-gong.service';
import setUpGongWebsocket from '../services/gong-websocket.service';

export default {
    name: 'gong-io',
    data: function () {
        return {
            gongs: []
        }
    },
    created: function () {
        setUpGongWebsocket(message => {
            const gongs = JSON.parse(message.data);

            this.gongs = gongs;
        });
    },
    methods: {
        handleClickRing: function (gong) {
            ringGongService.ring(gong.id);
        },
        handleClickRingAll: function () {
            ringGongService.ringAll();
        }
    }
}
</script>

<template>
    <div class="gong-io">
        <div class="gong-all">
            <button v-on:click="handleClickRingAll">Ring All Gongs</button>
        </div>
        <main>
            <div>
                <h1>Active Gongs</h1>
            </div>
            <div class="gong-list">
                <button v-for="gong in gongs" 
                        v-bind:key="gong.id" 
                        v-on:click="handleClickRing(gong)">
                    <span>{{gong.name}}</span>
                </button>
            </div>
            <div v-if="gongs.length === 0">
                <h4>No gongs connected...</h4>
            </div>
        </main>
    </div>
</template>

<style scoped>
    .gong-io {
        overflow: hidden;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 4em;
    }

    .gong-io > .gong-all {
        width: 100%;
        padding: 1em 0;
        border-bottom: 1px solid rgba(0, 0, 0, .07);
    }

    .gong-io > main {
        flex: 1;
        padding: 2em 0;
    }

    .gong-io > main > .gong-list {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 1em;
    }

    button {
        display: inline-block;
        font-family: inherit;
        font-size: 150%;
        text-align: center;
        text-decoration: none;
        padding: 1.5em 3em;
        border: 1px solid transparent;
        border-radius: 4px;
        transition: background-color 100ms linear, color 100ms linear, border-color 100ms linear;
        cursor: pointer;

        color: #ffffff;
        background-color: #05b9fa;
    }

    button:hover {
        color: #05b9fa;
        background-color: #ffffff;
        border-color: #05b9fa;
    }

    button:focus {
        outline: none;
    }
</style>