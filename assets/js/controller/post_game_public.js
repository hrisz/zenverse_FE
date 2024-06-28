import { postData } from "https://bukulapak.github.io/api/process.js";
import { onClick, getValue } from "https://bukulapak.github.io/element/process.js";
import { urlPOST, getResponse } from "../config/post_url.js";

function pushData(event){
    
    event.preventDefault();

    var requiredFields = ['gamename', 'devname', 'genre', 'logo', 'banner', 'preview', 'gamelinks', 'aboutgame', 'aboutdevs'];
    var valid = true;

    requiredFields.forEach(function(field) {
        var input = document.getElementById(field);
        if (!input.value) {
            valid = false;
            input.classList.add('border-red-500');
            input.classList.remove('border-gray-300');
        } else {
            input.classList.remove('border-red-500');
            input.classList.add('border-gray-300');
        }
    });

    if (!valid) {
        alert('Please fill in all required fields.');
        return;
    }

    if(valid){
        var genre = getValue("genre");

        let data = {
            name : getValue("gamename"),
            desc : getValue("aboutgame"),
            genre : genre.split(","),
            dev_name : {
                name : getValue("devname"),
                bio : getValue("aboutdevs"),
            },
            game_banner : getValue("banner"),
            preview : getValue("preview"),
            link_games : getValue("gamelinks"),
            game_logo : getValue('logo')
        }
        postData(urlPOST, data, getResponse);
        alert('Data successfully saved!')
        window.location.href = "main.html";
    }
}

onClick("button", pushData);