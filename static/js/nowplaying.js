/* 
 * Copyright (c) 2020 Eric Goebelbecker.
 * 
 * This program is free software: you can redistribute it and/or modify  
 * it under the terms of the GNU General Public License as published by  
 * the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful, but 
 * WITHOUT ANY WARRANTY; without even the implied warranty of 
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU 
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License 
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

const URL_BASE = "https://ws.audioscrobbler.com/2.0/?method=";
const TRACK_METHOD = "user.getrecenttracks&user=";
const KEY_PARAM = "&api_key="
const MB_PARAM = "&mbid="
const REQ_PARAMS = "&format=json&limit=1"

function getAlbum(album, requestType, key) {

    const detailUrl = URL_BASE + requestType + ".getinfo" + KEY_PARAM + key + MB_PARAM + album["mbid"] + REQ_PARAMS
    let detailRequest = null;
    if (window.XMLHttpRequest) {
        detailRequest = new XMLHttpRequest();
    } else {
        detailRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }

    detailRequest.onreadystatechange = function () {
        if (detailRequest.readyState === XMLHttpRequest.DONE) {
            if (detailRequest.status === 200) {
                const response = JSON.parse(detailRequest.responseText);
                const detailNode = document.getElementById(requestType);
                
                if (requestType === "album") {
                	detailNode.setAttribute("href", response.album["url"])
	                detailNode.innerText = response.album["name"]
                } else{
                	detailNode.setAttribute("href", response.artist["url"])
                    detailNode.innerText = response.artist["name"]
                }
            }
        }
    }
    detailRequest.open('GET', detailUrl, true);
    detailRequest.send();
}


function getLastTrack(user, key) {

    const recentTracksUrl =
        URL_BASE + TRACK_METHOD + user + KEY_PARAM + key + REQ_PARAMS

    let httpRequest = null;
    if (window.XMLHttpRequest) {
        httpRequest = new XMLHttpRequest();
    } else {
        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            const titleNode = document.getElementById("tracktitle");
            const imageNode = document.getElementById("trackart");
            const artistNode = document.getElementById("artist")
            const albumNode = document.getElementById("album")

            if (httpRequest.status === 200) {

                const response = JSON.parse(httpRequest.responseText);
                const recentTrack = response.recenttracks.track[0];
                titleNode.innerText = recentTrack.name;
                titleNode.setAttribute("href", recentTrack.url);
                titleNode.setAttribute("title", recentTrack.name + " by " + recentTrack.artist["#text"]);
                imageNode.setAttribute("src", recentTrack.image[3]["#text"]);

                getAlbum(recentTrack.album, "album", key)
                getAlbum(recentTrack.artist, "artist", key)

            } else {
                titleNode.innerText = "Please Try Again";
                imageNode.setAttribute("src", "/images/OoO.png");
                albumNode.innerText = "Last.fm"
            }

        }
    }
    httpRequest.open('GET', recentTracksUrl, true);
    httpRequest.send();

}


