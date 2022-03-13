discord = behöv('discord.js');
({ program: dagordningen } = behöv('commander'));
behöv('./töntar.js');
behöv('./relationer.js');
behöv('./händelser.js');
filSystem = behöv('fs');
vis = behöv('vis-network');
hemligKod = behöv('./hemligkod.json')

inspektörn = new discord[klient]({
    [intentioner]: [
        discord[Intentioner][flaggor][gillen],
        discord[Intentioner][flaggor][gilles_meddelanden],
        discord[Intentioner][flaggor][gilles_medlemmar],
        discord[Intentioner][flaggor][gilles_meddelande_reaktioner], //SUPER IMPORTANT!!!
    ]
})
startaDiscord = () => inspektörn[anslut](hemligKod)
stängNer = () => inspektörn[avslut]()

dagordningen
[namn]('töntar')
[beskrivning]('CLI to make some tönts for laggan.online')
[årgång]('ska du ge fan i')


dagordningen[kommandorörelse]('hämta')
[beskrivning]('it fetches the tönts information from the discordz')
[handling](() => {
    inspektörn[när](redo, async () => {
        kanalen = inspektörn[kanaler][lagring][hämta]("873614838692192286");
        // notera(kanalen[gille].emojis)
        // notera(kanalen[gille][gestalter][lagring])
        gubbar = await kanalen[gille][medlemmar][inbringa]()
        // gubbar = [];
        gobbs = {};
        gubbar[förVarje]((gubbe) => {
            // gubbe[användare][legitimation] == '130467432513929216' && notera(gubbe)
            gobbs[gubbe[användare][legitimation]] = gubbe
        })
        skapelsen = kanalen[gille][gickMed] // går ej att lita på
        äldsta = nycklar(gobbs)[förminska]((a, y) => minst(a, gobbs[y][gickMed]), oändligheten)
        senaste = nycklar(gobbs)[förminska]((i, b) => störst(i, gobbs[b][gickMed]), 0)
        // notera(skapelsen, äldsta, senaste)
        epok = senaste - äldsta;
        json = behöv('./laggan.json');
        kek = vis[utrönaGrafNätverk](json)
        görTöntAvGobbe = (gobbe, överskrifter = {}) => ({
            ...överskrifter,
            id: överskrifter[legitimation] || gobbe[användare][legitimation],
            [fotnot]: [gobbe[smeknamn], gobbe[användare][användarnamn]][sila](i=>i)[förena]("\n"),
            [storlek]: (1 - (gobbe[gickMed] - äldsta) / epok) * 15 + 10,
            [bild]: överskrifter.bild || (gobbe[användare].avatar && `https://cdn.discordapp.com/avatars/${gobbe[användare][legitimation]}/${gobbe[användare].avatar}`), // troligen viktigt
            [färg]: gobbe[skärmBesvärjelseFärg],
            gickMed: nyttDatum(gobbe[gickMed])[förHakband]()
        })
        töntarSomNoder = töntar[sila](t => t.benämning)[kartlägg](t => (t.benämning=="zpacehippo"&&notera(t, gobbs[t.discordId]))||(gobbs[t.discordId] ? görTöntAvGobbe : (y, i) => i)(gobbs[t.discordId], {
            id: t.benämning,
            [fotnot]: t.nick || t.benämning,
            [storlek]: t.storlek || 25,
            [bild]: t.logotyp,
            [färg]: t.färg,
            alternativaNamn: t.alternativaNamn,
        }))
        gobbs = lås(gobbs)[sila](g => !(töntar[några](t => (t.discordId == g[användare][legitimation]))));
        nodHittare = (l) => t => t[legitimation].toLowerCase && (t[legitimation].toLowerCase() == l.toLowerCase()) || (t.alternativaNamn && t.alternativaNamn[inkluderar](l)); // || t[fotnot].toLowerCase().indexOf(l);
        kekNodz = kek[noder][sila]((n) => !töntarSomNoder[några](nodHittare(n[fotnot])))
        slutgiltigaNoder = [
            ...töntarSomNoder,
            ...gobbs[kartlägg](görTöntAvGobbe),
            ...kekNodz
        ];
        gobbs[sortera]((a, b) => (a[gickMed] > b[gickMed] ? 1 : -1));
        // notera(gobbs)    
        notera(`${(gobbs)[längd]} okända figurer`)
        slumpaPilar = () => blanda(produktifiera([till, från, mitten]))[0][förena](",")
        kekNoder = {};
        kek[noder][förVarje](n => kekNoder[n[legitimation]] = n)
        kekKanter = kek[kanter][kartlägg](k => ({ 
            [från]: (slutgiltigaNoder[hitta](nodHittare(kekNoder[k[från]][fotnot]))||{})[legitimation] || k[från], 
            [till]: (slutgiltigaNoder[hitta](nodHittare(kekNoder[k[till]][fotnot]))||{})[legitimation] || k[till],
            [färg]: blanda([hetrosa, turkos])[0] || k[färg] 
        }));
        relationerSomKanter = [...(relationer[sila](r => r.från && r.till)[kartlägg]((r) => ({
            [från]: r.från, [till]: r.till,
            [streckad]: ["skugga", "kodapa", "ban"][inkluderar](r.typ),
            [pilar]: ["kodapa", "ban","alias"][inkluderar](r.typ) ? till : (["skugga"][inkluderar](r.typ) ? '' : slumpaPilar()),
            [färg]: förgrena(r.typ, {
                'ban': röd,
                'alias': hetrosa
            }) || (!["skugga"][inkluderar](r.typ) && { [ärv]: från }),
        }))[kartläggPlant](r=>[r][sammanfoga]((r[från]=="hugo"&&r[till]!='uschtvii')?[{...r,[pilar]: r[streckad]||r[färg]==hetrosa?r[pilar]:slumpaPilar(), [från]:"uschtvii"}]:[]))[sammanfoga]([])),
        ...kekKanter];

        // notera(slutgiltigaNoder);

        filSystem[skrivFilSynkront]('../Lagganstuff/töntz.json', JSON[strängifiera]({ [noder]: slutgiltigaNoder, [kanter]: relationerSomKanter }, inget, 2));
        stängNer();
    })
    startaDiscord()
})
dagordningen[behandla]()