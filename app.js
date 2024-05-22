let bearer = "-mYJsu3fD_1vCklW4SFZBlUzJ1PqwO4j3f3o_kfC8uRbfELg16KJf2iyDIXyExuFE_FRGCKLa-ZA1XHa65AjUHtsKP9PtkLmXFIKEQiTvcsm2_clZbLvN8t3TtdsoXdaj0nwWFpd0JBQKoaiSZer5oPzInlZQqpxPazfqT0oJjaLrtJQNYLbNvCTpiYkkXcfIfYlRhv3LbTkFjPGnS0SEqLRbbm3cAlwLDZA7xi76cBaG-L0VnllZ1K9UyCJO8YuWT4xEc2b5y30Sy6dh8mBNOCu33fPJ46ZumugoaQIlXro04fI"
let certs = [];
let imgURLS = [];
let clipboardString = "";
let finalClipboardString = "";
let firstCert = 0;
let orderSize = 0;
const regex = /,/i;


$(document).on("click", "#getImages", function () {
    firstCert = parseFloat($("#firstCertForm").val());
    orderSize = parseFloat($("#orderSizeForm").val());
    imgURLS = [];
    certs = [];
    clipboardString = "";
    finalClipboardString = "";
    for (let i = 0; i < orderSize; i++) {
        console.log(i)
        $.ajax({
            type: "GET",
            url: `https://api.psacard.com/publicapi/cert/GetImagesByCertNumber/${firstCert+i}?api_key=${bearer}`,
            headers: { 
                'Authorization': `Bearer ${bearer}`,
            }
        }).then(function (result) {
            console.log(result[0]);
            imgURLS.push(result[0].ImageURL);
            imgURLS.push(result[1].ImageURL);
            $("#progress").html(imgURLS.length/2);
        });
    }
});

$(document).on("click", "#copyString", function () {
    console.log(imgURLS);
    clipboardString = imgURLS.toString();
    console.log(clipboardString);
    clipboardString = clipboardString.replaceAll(',', '\n');
    navigator.clipboard.writeText(clipboardString);
});

// setInterval(function () {
//     if (imgURLS.length = orderSize*2) {
//         console.log(imgURLS);
//         clipboardString = imgURLS.toString();
//         console.log(clipboardString);
//         clipboardString = clipboardString.replaceAll(',', '\n');
//         navigator.clipboard.writeText(clipboardString);
//     }
// }, 5000);

$.ajax({
    type: "GET",
    url: `https://api.psacard.com/publicapi/cert/GetImagesByCertNumber/91412378?api_key=${bearer}`,
    headers: { 
        'Authorization': `Bearer ${bearer}`,
    }
}).then(function (result) {
    console.log(result);
});