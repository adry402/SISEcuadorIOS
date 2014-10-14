/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function ViewModelIndicador() {
    var principal = this;
    principal.ejemploLista = ko.observableArray();
    principal.firstName = ko.observable("");
    //Se recupera la variable
    if (location.search.substr(1)) {
        Variable = location.search.substr(1);
        var elem = Variable.split('&');
        serialSistema = elem[0];
        serialSubsector = elem[1];
        serialSector = elem[2];
    }
    $(".loadingPag").css("display", "block");

    var ipserver;
    $.ajax({
        url: "cadena.txt",
        dataType: "text",
        success: function(data) {
            ipserver = data;
            var cadena = ipserver + "/ServicioWeb/webresources/ec.gob.desarrollosocial.indsisgrpind/movil/" + serialSistema + "/" + serialSubsector;

            $.getJSON(cadena, function(result) {
                $("#mapaSitio").html(result[0].serialSse.descripcionSse + " » " + result[0].serialSse.nombreSse);
                $(".loadingPag").css("display", "none");

                $.each(result, function() {
                    principal.ejemploLista.push({
                        url: ko.observable("grafica.html?" + this.serialInd.serialInd + "&" + this.serialSse.serialGrp.serialGrp + "&12"),
                        details: ko.observable(""),
                        nombreIndicador: ko.observable(this.serialInd.nombreInd)
                    });
                });
            });
        }
    });



    principal.firstName = ko.observable("");
    var firstNames = ko.observableArray();
    function indOj() {
        this.label = "";
        this.serialInd = "";
        this.serialGrp = "";

    }


    $("#firstName").css("display", "none");

    $.ajax({
        url: "cadena.txt",
        dataType: "text",
        success: function(data) {
            ipserver = data;
            var cadena = ipserver + "/ServicioWeb/webresources/ec.gob.desarrollosocial.indsisgrpind/movil/buscador/" + serialSistema;

            $.getJSON(cadena, function(result) {

                $("#firstName").css("display", "block");
                if (Variable === "11") {
                    $.each(result, function() {
                        var obj = new indOj();
                        obj.label = this.nombreInd;
                        obj.serialInd = this.serialInd;
                        obj.serialGrp = this.codigoInd;

                        firstNames.push(obj);

                    });


                } else {

                    $.each(result, function() {
                        var obj = new indOj();
                        obj.label = this.serialInd.nombreInd;
                        obj.serialInd = this.serialInd.serialInd;
                        obj.serialGrp = this.serialSse.serialGrp.serialGrp;

                        firstNames.push(obj);

                    });
                }

//First names es la lista donde se llenan las palabras que coinciden en la busqueda


                $('#firstName').autocomplete({
                    source: firstNames(),
                    messages: {
                        noResults: '',
                        results: function() {
                            //  $('#hideKeyboard').focus();
                        }
                    },
                    focus: function() {
                        // prevent value inserted on focus
                        return true;
                    },
                    select: function(event, ui) {


                        var serialGrp = ui.item.serialGrp;
                        var serialInd = ui.item.serialInd;

                        if (Variable === "11") {
                            location.href = "agnGrafica.html?" + serialGrp;
                        }
                        else {
                            location.href = "grafica.html?" + serialInd + "&" + serialGrp + "&" + Variable;

                        }


                    }
                });
            });
        }
    });


}
//
ko.applyBindings(new ViewModelIndicador());
