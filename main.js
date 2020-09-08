var opacity = {};
var total = {}


$("textarea").keyup(function (e) {
    $("#analyze").click();
    // if (isLetter(e.key)) {
    //     if (!(e.key in opacity)) {
    //         opacity[e.key] = 0;
    //         total[e.key] = 1;
    //     } else {
    //         total[e.key] += 1;
    //     }

    //     const key = $('.' + e.key);

    //     opacityChange(e.key, map(total[e.key]));
    // }
});

function isLetter(c) {
    return c.toLowerCase() != c.toUpperCase();
}

function opacityChange(e, amt) {
    const key = $('.' + e);

    // const n = opacity[e] + amt;
    opacity[e] = amt;

    const rgb = 'rgba(73, 124, 147,';

    if (opacity[e] < 0.4) {
        key.css('color', '#202B39');
        // rgb = 'rgba(155, 194, 218,';
    } else {
        key.css('color', '#FDF9EE');
        // rgb = 'rgba(73, 124, 147,';
    }

    key.css('background-color', rgb + opacity[e] + ')');
}


function keyColor(key, opacity) {
    if (opacity < 0.5) {
        key.css('color', '#202B39');
    } else {
        key.css('color', '#FDF9EE');
    }

    rgb = 'rgba(' +
        (73 + (155 - 73) * opacity) + ',' +
        (124 + (194 - 124) * opacity) + ',' +
        (147 + (218 - 147) * opacity) + ',';
}

$("#clear").on('click', function () {
    $("textarea").val("");
    for (var key in opacity) {
        opacityChange(key, -opacity[key]);
        opacity[key] = 0;
    }
});

function map(x) {
    var min = 0;
    var max = 0;
    for (var key in total) {
        max = Math.max(total[key], max);
        min = Math.min(total[key], min);
    }

    // return (x) / max;
    return (x - min) / max;
}

// $("#stotal").on('click', function () {
//     for (var key in total) {
//         opacityChange(key, -opacity[key]);
//         opacityChange(key, map(total[key]));
//     }
// });

$("#analyze").on('click', function () {
    var t = $("textarea").val();

    $('#clear').click();

    $("textarea").val(t);

    t = t.toLowerCase();


    opacity = {};
    total = {};

    for (let i = 0; i < t.length; i++) {
        const chr = t.charAt(i);
        if (isLetter(chr)) {
            if (!(chr in opacity)) {
                opacity[chr] = 0;
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