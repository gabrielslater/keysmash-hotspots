var opacity = {};
var total = {}


$("textarea").keyup(function (e) {
    if (isLetter(e.key)) {
        if (!(e.key in opacity)) {
            opacity[e.key] = 0;
            total[e.key] = 1;
        } else {
            total[e.key] += 1;
        }

        const key = $('.' + e.key);

        key.css('background', opacityChange(e.key, 0.05));
    }
});

function isLetter(c) {
    return c.toLowerCase() != c.toUpperCase();
}

function opacityChange(e, amt) {
    const key = $('.' + e);

    const rgb = 'rgba(120, 198, 203,';

    // const n = opacity[e] + amt;
    opacity[e] += amt;

    key.css('background-color', rgb + opacity[e] + ')');
}

$("#clear").on('click', function () {
    console.log("clear");
    $("textarea").val("");
    for (var key in opacity) {
        opacityChange(key, -opacity[key]);
        opacity[key] = 0;
    }
});

function map(x) {
    // var min = 0;
    var max = 0;
    for (var key in total) {
        max = Math.max(total[key], max);
        // min = Math.min(total[key], min);
    }

    return x / max;
}

$("#stotal").on('click', function () {
    console.log("total");
    for (var key in total) {
        opacityChange(key, -opacity[key]);
        opacityChange(key, map(total[key]));
    }
});

$("#analyze").on('click', function () {
    console.log("analyze");
    const t = $("textarea").val().toLowerCase();

    total = {};

    for (let i = 0; i < t.length; i++) {
        const chr = t.charAt(i);
        if (isLetter(chr)) {
            console.log(chr);
            if (!(chr in total)) {
                total[chr] = 1;
            } else {
                total[chr] += 1;
            }
        }
    }

    for (var key in total) {
        opacityChange(key, map(total[key]));
    }
});