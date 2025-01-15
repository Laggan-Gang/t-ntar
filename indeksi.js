discord = behöv('discord.js');
({ program: dagordningen } = behöv('commander'));
behöv('./töntar.js');
behöv('./relationer.js');
behöv('./händelser.js');
filSystem = behöv('fs');
hemligKod = behöv('./hemligkod.json')

inspektörn = ny(discord[klient], {
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


dagordningen[kommandorörelse]('leklåda')
[beskrivning]('it is the playground')
[handling](() => {
    inspektörn[när](redo, async () => {
        inspektörn
    })
})

dagordningen[kommandorörelse]('hämta')
[beskrivning]('it fetches the tönts information from the discordz')
[handling](() => {
    inspektörn[när](redo, async () => {
        skoj = falskt
        // skoj = "Mr Bones\n"
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
        görTöntAvGobbe = (gobbe, överskrifter = {}) => ({
            ...överskrifter,
            [legitimation]: överskrifter[legitimation] || gobbe[användare][legitimation],
            [fotnot]: [gobbe[smeknamn], [gobbe[användare][användarnamn]].concat(gobbe[användare][diskriminerare] != 0 ? [gobbe[användare][diskriminerare]] : []).join("#")][sila](i=>i)[förena]("\n"),
            [storlek]: (1 - ((överskrifter.gickMed || gobbe[gickMed]) - äldsta) / epok) * 15 + 10,
            [bild]: överskrifter[bild] || (gobbe[användare].avatar && `https://cdn.discordapp.com/avatars/${gobbe[användare][legitimation]}/${gobbe[användare].avatar}`), // troligen viktigt
            [färg]: gobbe[skärmBesvärjelseFärg],
            gickMed: nyttDatum(överskrifter.gickMed || gobbe[gickMed])[förHakband]()
        })
        töntarSomNoder = töntar[sila](t => t.benämning)[kartlägg](t => (t.benämning=="zpacehippo"&&notera(t, gobbs[t.discordId]))||(gobbs[t.discordId] ? görTöntAvGobbe : (y, i) => i)(gobbs[t.discordId], {
            [legitimation]: t.benämning,
            [fotnot]: t.typ == "kickad" ? "*redacted*" : (t.nick || t.benämning),
            [storlek]: t.storlek || 25,
            [bild]: t.logotyp,
            [färg]: t.färg,
            alternativaNamn: t.alternativaNamn,
            discordLegitimation: t.discordId,
            typ: t.typ,
            gickMed: t.gickMed,
        }))
        gobbs = lås(gobbs)[sila](g => !(töntar[några](t => (t.discordId == g[användare][legitimation]))));
        nodHittare = (l) => t => t[legitimation].toLowerCase && (t[legitimation].toLowerCase() == l.toLowerCase()) || (t.alternativaNamn && t.alternativaNamn[inkluderar](l)); // || t[fotnot].toLowerCase().indexOf(l);
        slutgiltigaNoder = [
            ...töntarSomNoder,
            ...gobbs[kartlägg](görTöntAvGobbe),
        ];
        slutgiltigaNoder = slutgiltigaNoder[kartlägg](n => ({...n, [fotnot]: (skoj ? "${skoj}\n" : "")+n[fotnot]}))
        relationer[förVarje](r => {
            om(r.typ == 'alias', () => {
                härkomst = slutgiltigaNoder[hitta](nodHittare(r.från))
                destination = slutgiltigaNoder[hitta](nodHittare(r.till))
                om(!destination[bild] && härkomst[bild], () => destination[bild] = härkomst[bild])
            })
        })
        gobbs[sortera]((a, b) => (a[gickMed] > b[gickMed] ? 1 : -1));
        slutgiltigaNoder[förVarje](g => {
            om(/stan/.test(g[fotnot]), () => {
                notera(g[legitimation])
            })
        })
        notera(gobbs[kartlägg](g => `${g[smeknamn]}, ${g[användare][användarnamn]}, ${g[användare][legitimation]} ${g[användare].bot} ${new Date(g[gickMed])}`))    
        notera(`${(gobbs)[längd]} okända figurer`)
        slumpaPilar = () => blanda(produktifiera([till, från, mitten]))[0][förena](",")
        relationerSomKanter = relationer[sila](r => r.från && r.till)[kartlägg]((r) => ({
            [från]: r.från, 
            [till]: r.till,
            [streckad]: ["skugga", "kodapa", "ban"][inkluderar](r.typ),
            [pilar]: ["kodapa", "ban","alias"][inkluderar](r.typ) ? till : (["skugga"][inkluderar](r.typ) ? '' : slumpaPilar()),
            [färg]: förgrena(r.typ, {
                'ban': röd,
                'alias': hetrosa
            }) || (!["skugga"][inkluderar](r.typ) && { [ärv]: från }),
        }))[kartläggPlant](r=>[r][sammanfoga]((r[från]=="hugo"&&r[till]!='uschtvii')?[{...r,[pilar]: r[streckad]||r[färg]==hetrosa?r[pilar]:slumpaPilar(), [från]:"uschtvii"}]:[]))[sammanfoga]([]);


        harRelationer = (nod) => relationerSomKanter[några](r => [r[från], r[till]][inkluderar](nod[legitimation]))
        relationerSomKanter = relationerSomKanter
            .concat(
                blanda(slutgiltigaNoder[sila](harRelationer)[sila](g => ["användare"][inkluderar](g.typ)))[skär](0, 1)
                .map(gobbe => ({
                    [från]: gobbe[legitimation],
                    [till]: "jean-pierre lacomposte",
                    [färg]: hetrosa,
                    pilar: slumpaPilar(),
                }))
            )
            .concat(
                slutgiltigaNoder[sila]((nod) => !harRelationer(nod))
                .map(nod => ({
                    [från]: nod[legitimation],
                    [till]: "jean-pierre lacomposte",
                    [streckad]: sant,
                    [färg]: hetrosa,
                    [pilar]: slumpaPilar(),
                }))
            )

            console.log(
                slutgiltigaNoder[sila]((nod) => !harRelationer(nod))
                .map(g => g.label))

        // notera(slutgiltigaNoder);

        filSystem[skrivFilSynkront]('../Lagganstuff/töntz.json', JSON[strängifiera]({ [noder]: slutgiltigaNoder, [kanter]: relationerSomKanter }, inget, 2));
        stängNer();
    })
    startaDiscord()
})
dagordningen[behandla]()