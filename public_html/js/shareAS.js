/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function() {
    if (location.search.substr(1)) {
        Variable = location.search.substr(1);

        nombreIndicador = Variable;
    }


    var pageTitle = document.title + " - SISEcuador "; //HTML page title
    var pageUrl = 'http://www.siise.gob.ec/share/agnGrafica.html?' + nombreIndicador; //Location of the page
    var openLink = '';

    //$('#btnWhatsApp').attr("href","whatsapp://send?text=Compartiendo informacion desde "+encodeURIComponent(pageUrl));
    //user clicks on a share button
    $('.button-wrap').click(function(event) {
        var shareName = $(this).attr('class').split(' ')[0]; //get the first class name of clicked element

        switch (shareName) //switch to different links based on different social name
        {
            case 'email':
                openLink = 'mailto:?subject=' + pageTitle
                        + '&body= Se ha compartido información del Ministerio Coordinador de Desarrollo Social - MCDS ' + encodeURIComponent(pageUrl);
                break;
            case 'whatsapp':
                //$('#btnWhatsApp').attr("href","whatsapp://send?text=Compartiendo informacion desde "+encodeURIComponent(pageUrl));
                openLink = 'whatsapp://send?text= Información compartida desde la aplicación "Sistema de Información Social del Ecuador SISEcuador" del Miniterio Coordinador de Desarrollo Social MCDS. ' + encodeURIComponent(pageUrl);
                break;

        }

        //Parameters for the Popup window
        winWidth = 650;
        winHeight = 450;
        winLeft = ($(window).width() - winWidth) / 2,
                winTop = ($(window).height() - winHeight) / 2,
                winOptions = 'width=' + winWidth + ',height=' + winHeight + ',top=' + winTop + ',left=' + winLeft;

        //open Popup window and redirect user to share website.
        window.open(openLink, 'Compartir este enlace', winOptions);

        return false;
    });
    !function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? 'http' : 'https';
        if (!d.getElementById(id)) {
            js = d.createElement(s);
            js.id = id;
            js.src = p + '://platform.twitter.com/widgets.js';
            fjs.parentNode.insertBefore(js, fjs);
        }
    }(document, 'script', 'twitter-wjs');

    var auxBotonTweet = "<a href='https://twitter.com/share' class='twitter-share-button' data-url='" + pageUrl + "' data-text='Compartiendo información desde #SISEcuador Sistema de Información Social del Ecuador del @SocialEc #MCDS' data-size='large' data-count='none' data-lang= 'es'></a>";

    $("#shareTweet").append(auxBotonTweet);

    var auxBotonGoogle = "<br> <div class='g-plus' data-action='share' data-annotation='none' data-height='50'></div>";
    var auxlink = " <link rel='canonical' href='" + pageUrl + "' />";

    $("#shareGoogle").append(auxBotonGoogle + ' ' + auxlink);

    var auxFacebook = "<div class='fb-share-button' data-href='" + pageUrl + "'></div>";
    $("#shareFacebook").append(auxFacebook);



});