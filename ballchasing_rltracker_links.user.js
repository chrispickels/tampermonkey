// ==UserScript==
// @name         ballchasing RLTracker links
// @namespace    http://tampermonkey.net/
// @version      2024-09-29
// @description  add links to RLTracker from ballchasing.com
// @author       Chris Pickels
// @match        https://ballchasing.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==



(function() {
    'use strict';

    const playerLinks = document.querySelectorAll('div.player>a');
    const rlTrackerBaseUrl = 'https://rocketleague.tracker.network/rocket-league/profile'

    playerLinks.forEach(link => {
        const currentUrl = link.getAttribute('href');
        const components = currentUrl.split('/');
        if (components.length !== 4) return;
        const [,, platform, id] = components;
        const name = link.text.trim();

        var newUrl = '';
        if (platform === 'steam') {
            newUrl = `${rlTrackerBaseUrl}/steam/${id}`;
        } else if (platform === 'epic') {
            newUrl = `${rlTrackerBaseUrl}/epic/${name}`;
        } else if (platform === 'ps4') {
            newUrl = `${rlTrackerBaseUrl}/psn/${id}`;
        } else if (platform === 'xbox') {
            newUrl = `${rlTrackerBaseUrl}/xbl/${name}`;
        } else {
            return;
        }
        link.setAttribute('href', newUrl);
    });
})();
