let bearer = "-mYJsu3fD_1vCklW4SFZBlUzJ1PqwO4j3f3o_kfC8uRbfELg16KJf2iyDIXyExuFE_FRGCKLa-ZA1XHa65AjUHtsKP9PtkLmXFIKEQiTvcsm2_clZbLvN8t3TtdsoXdaj0nwWFpd0JBQKoaiSZer5oPzInlZQqpxPazfqT0oJjaLrtJQNYLbNvCTpiYkkXcfIfYlRhv3LbTkFjPGnS0SEqLRbbm3cAlwLDZA7xi76cBaG-L0VnllZ1K9UyCJO8YuWT4xEc2b5y30Sy6dh8mBNOCu33fPJ46ZumugoaQIlXro04fI"
let imgURLS = [];
let clipboardString = "";
let firstCert = 0;
let orderSize = 0;

$(document).on("click", "#getImages", function () {
    firstCert = parseFloat($("#firstCertForm").val());
    orderSize = parseFloat($("#orderSizeForm").val());
    imgURLS = [];
    clipboardString = "";
    for (let i = 0; i < orderSize; i++) {
        $.ajax({
            type: "GET",
            url: `https://api.psacard.com/publicapi/cert/GetImagesByCertNumber/${firstCert+i}?api_key=${bearer}`,
            headers: { 
                'Authorization': `Bearer ${bearer}`,
            }
        }).then(function (result) {
            let cert = {
                certnumber: firstCert+i,
                certFrontImageURL: '',
                certBackImageURL: ''
            }  
            cert.certFrontImageURL = result[0].ImageURL;
            cert.certBackImageURL = result[1].ImageURL;
            imgURLS.push(cert);
            $("#progress").html(imgURLS.length);
        });
    }
});

$(document).on("click", "#copyString", function () {
    imgURLS.sort(function(a, b) {
        return parseFloat(a.certnumber) - parseFloat(b.certnumber);
    });
    imgURLS.forEach(imgURL => {
        if (clipboardString === "") {
            clipboardString = imgURL.certBackImageURL + `,` + imgURL.certFrontImageURL;
        } else {
            clipboardString = clipboardString + `,` + imgURL.certBackImageURL + `,` + imgURL.certFrontImageURL;
        }
    });
    clipboardString = clipboardString.replaceAll(',', '\n');
    navigator.clipboard.writeText(clipboardString);
});
