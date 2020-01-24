            var tempOrd = [];
            var tempNummer = [];
            var text = "";
            var meningar = [];
            var antalMeningar = 0;
            var ord = [];
            var antalOrd = 0;
            var antalLangaOrd = 0;
            var lix = 0;
            var ordnadeOrd = [];
            var ordnadeOrdForeteelser = [];
            var attRadera = [];
            var forskjutning = 0;
            document.getElementById("knapp").addEventListener("click", beräkna);
            document.getElementById("listaOrdKnapp").addEventListener("click", visaOrd);
            document.getElementById("listaMeningKnapp").addEventListener("click", visaMening);
            //
            var extra = location.href.substring(location.href.indexOf('?') + 1, location.href.length);
            if(extra !== location.href) {
                document.getElementById("texten").innerHTML = extra;
                beräkna();
            }
            //
            function beräkna() {
                text = document.getElementById("texten").value;
                meningar = text.split(/[\.\?\!]\s|\n/);
                attRadera = [];
                forskjutning = 0;
                for(var m = 0; m < meningar.length; m++) {
                    if(meningar[m] === "" || meningar[m] == undefined || meningar[m] === " ") {
                        attRadera.push(m);
                    }
                }
                for(var i of attRadera) {
                    meningar.splice(i - forskjutning, 1);
                    forskjutning++;
                }
                antalMeningar = meningar.length;
                ord = text.split(/[\s\.\?\!\:\;\,\/\n]/);
                attRadera = [];
                forskjutning = 0;
                for(var o = 0; o < ord.length; o++) {
                    ord[o] = ord[o].replace(/[\"”\(\)\[\]\{\}\–]/g, "");
                    if(ord[o] === " " || ord[o] === "" || ord[o] == undefined) {
                        attRadera.push(o);
                    }
                }
                for(var i of attRadera) {
                    ord.splice(i - forskjutning, 1);
                    forskjutning++;
                }
                antalOrd = ord.length;
                antalLangaOrd = 0;
                for(var or of ord) {
                    if(or.length > 6) {
                        antalLangaOrd++;
                    }
                }
                lix = (antalOrd / antalMeningar) + ((antalLangaOrd * 100) / antalOrd);
                document.getElementById("lix").innerHTML = lix;
                document.getElementById("meningar").innerHTML = "";
                document.getElementById("antalMeningar").innerHTML = antalMeningar;
                document.getElementById("antalOrd").innerHTML = antalOrd;
                
                document.getElementById("antalLangaOrd").innerHTML = antalLangaOrd;
                if(lix <= 0) {
                    document.getElementById("texttyp").innerHTML = "en omöjlig text. Ett fel verkar ha uppstått i algoritmen";
                }
                if(lix > 0 && lix < 25) {
                    document.getElementById("texttyp").innerHTML = "en barnbok";
                }
                if(lix >= 25 && lix < 30) {
                    document.getElementById("texttyp").innerHTML = "en enkel text";
                }
                if(lix >= 30 && lix < 40) {
                    document.getElementById("texttyp").innerHTML = "skönlitteratur";
                }
                if(lix >= 40 && lix < 50) {
                    document.getElementById("texttyp").innerHTML =  "sakinformation";
                }
                if(lix >= 50 && lix < 60) {
                    document.getElementById("texttyp").innerHTML = "facklitteratur";
                }
                if(lix >= 60) {
                    document.getElementById("texttyp").innerHTML = "svår facklitteratur, forskning o.d";
                }
                document.getElementById("o/m").innerHTML = "" + ((antalOrd / antalMeningar)) + "";
                document.getElementById("l%").innerHTML = "" + ((antalLangaOrd / antalOrd) * 100) + "%";
                visaOrd();
                doljOrd();
                document.getElementById("ordvariation").innerHTML = "" + (ordnadeOrd.length / antalOrd) * 100 + "%";
            }
            function visaMening() {
                document.getElementById("meningar").innerHTML = "";
                if(antalMeningar == 0) {
                    alert("Klistra in och beräkna LIX-värdet för texten först.")
                } else {
                    document.getElementById("meningar").innerHTML = "";
                    document.getElementById("listaMeningKnapp").removeEventListener("click", visaMening);
                    document.getElementById("listaMeningKnapp").addEventListener("click", doljMening);
                    document.getElementById("listaMeningKnapp").innerHTML = "&lt;";
                    document.getElementById("listaMeningKnapp").title = "Dölj listan med meningar";
                    for(mening of meningar) {
                        document.getElementById("meningar").innerHTML = document.getElementById("meningar").innerHTML + mening + "<br>--<br>"; 
                    }
                }
            }
            function doljMening() {
                document.getElementById("listaMeningKnapp").removeEventListener("click", doljMening);
                document.getElementById("listaMeningKnapp").addEventListener("click", visaMening);
                document.getElementById("listaMeningKnapp").innerHTML = "&gt;";
                document.getElementById("listaMeningKnapp").title = "Visa lista med meningar";
                document.getElementById("meningar").innerHTML = "";
            }
            function visaOrd() {
                ordnadeOrd = [];
                ordnadeOrdForeteelser = [];
                for(or of ord) {
                    if(ordnadeOrd.includes(or.toLowerCase())) {
                        ordnadeOrdForeteelser[ordnadeOrd.indexOf(or.toLowerCase())]++;
                    } else {
                        ordnadeOrd.push(or.toLowerCase());
                        ordnadeOrdForeteelser.push(1);
                    }
                }
                tempOrd = [];
                tempNummer = [];
                for(ordet of ordnadeOrd) {
                    tempOrd.push(ordet);
                }
                for(ordet of ordnadeOrdForeteelser) {
                    tempNummer.push(ordet);
                }
                ordnadeOrd = [];
                ordnadeOrdForeteelser = [];
                
                for(var i = 0; i < tempNummer.length; i++) {
                    laggTill(tempOrd[i].toLowerCase(), tempNummer[i]);
                }
                if(ordnadeOrd.length == 0) {
                    alert("Klistra in och beräkna LIX-värdet för texten först.");
                } else {
                    document.getElementById("listaOrdKnapp").removeEventListener("click", visaOrd);
                    document.getElementById("listaOrdKnapp").addEventListener("click", doljOrd);
                    document.getElementById("listaOrdKnapp").innerHTML = "&lt;";
                    document.getElementById("listaOrdKnapp").title = "Dölj listan med ord";
                    document.getElementById("orden").innerHTML = "";
                    for(or of ordnadeOrd) {
                        document.getElementById("orden").innerHTML = document.getElementById("orden").innerHTML + or + ": " + ordnadeOrdForeteelser[ordnadeOrd.indexOf(or)] + "<br>";
                    }
                    document.getElementById("orden").innerHTML = document.getElementById("orden").innerHTML + "<br>";
                }
            }
            function doljOrd() {
                document.getElementById("listaOrdKnapp").removeEventListener("click", doljOrd);
                document.getElementById("listaOrdKnapp").addEventListener("click", visaOrd);
                document.getElementById("listaOrdKnapp").innerHTML = "&gt;";
                document.getElementById("listaOrdKnapp").title = "Visa lista med ord";
                document.getElementById("orden").innerHTML = "";
            }
            function laggTill(sak, num) {
                if(ordnadeOrdForeteelser.length == 0) {
                    ordnadeOrdForeteelser.push(num);
                    ordnadeOrd.push(sak);
                } else {    
                    for(var i = 0; i < ordnadeOrdForeteelser.length; i++) {
                        if(num >= ordnadeOrdForeteelser[i]) {
                            ordnadeOrdForeteelser.splice(i, 0, num);
                            ordnadeOrd.splice(i, 0, sak);
                            break;
                        }
                    }
                }
            }