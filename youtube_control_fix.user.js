// ==UserScript==
// @name           YouTube Control Fix
// @namespace      https://github.com/Legend-Master
// @version        0.2
// @author         Tony
// @description    Make youtube shortcut behavior more consistent
// @description:zh 使 Youtube 快捷键行为更固定
// @homepage       https://github.com/Legend-Master/YouTube-Control-Fix
// @icon           https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @updateURL      https://github.com/Legend-Master/YouTube-Control-Fix/raw/main/youtube_control_fix.user.js
// @downloadURL    https://github.com/Legend-Master/YouTube-Control-Fix/raw/main/youtube_control_fix.user.js
// @supportURL     https://github.com/Legend-Master/YouTube-Control-Fix/issues
// @match          https://www.youtube.com/*
// @match          https://www.youtube-nocookie.com/*
// @exclude        https://www.youtube.com/live_chat?*
// @grant          none
// ==/UserScript==

(function() {
    'use strict'

    const hookedElements = new Set()

    function hookPlayer(player) {
        if (!player) {
            return
        }

        const elements = [
            ...player.getElementsByClassName('ytp-progress-bar-container'),
            ...player.getElementsByClassName('ytp-volume-panel'),
        ]
        for (const element of elements) {
            if (hookedElements.has(element)) {
                continue
            }
            hookedElements.add(element)
            element.addEventListener('keydown', (event) => {
                event.stopPropagation()
                event.preventDefault()
                player.dispatchEvent(new event.constructor(event.type, event))
            }, true)
        }
    }

    const YT_PLAYER_IDS = ['movie_player', 'c4-player']

    function hookPlayers() {
        for (const id of YT_PLAYER_IDS) {
            hookPlayer(document.getElementById(id))
        }
    }

    hookPlayers()
    window.addEventListener('yt-player-updated', hookPlayers)

})()
