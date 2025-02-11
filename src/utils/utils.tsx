import { level } from "../types";

export function indexToTransformString(index: number): string {

    switch (index) {
      case 0:
        return "translate(48,292)";
      case 1:
        return "translate(144,292)";
      case 2:
        return "translate(240,292)";
      case 3:
        return "translate(336,292)";
      case 4:
        return "translate(432,292)";
      case 5:
        return "translate(528,292)";
      case 6:
        return "translate(624,292)";
      case 7:
        return "translate(0,196)";
      case 8:
        return "translate(96,196)";
      case 9:
        return "translate(192,196)";
      case 10:
        return "translate(288,196)";
      case 11:
        return "translate(384,196)";
      case 12:
        return "translate(480,196)";
      case 13:
        return "translate(576,196)";
      case 14:
        return "translate(48,100)";
      case 15:
        return "translate(144,100)";
      case 16:
        return "translate(240,100)";
      case 17:
        return "translate(336,100)";
      case 18:
        return "translate(432,100)";
      case 19:
        return "translate(528,100)";
      case 20:
        return "translate(624,100)";
      case 21:
        return "translate(0,4)";
      case 22:
        return "translate(96,4)";
      case 23:
        return "translate(192,4)";
      case 24:
        return "translate(288,4)";
      case 25:
        return "translate(384,4)";
      case 26:
        return "translate(480,4)";
      case 27:
        return "translate(576,4)";
      case 28:
          return "translate(0,4)";
      case 29:
          return "translate(96,4)";
      case 30:
          return "translate(192,4)";
      case 31:
          return "translate(288,4)";
      case 32:
          return "translate(384,4)";      
      case 33:
          return "translate(480,4)";
      case 34:
          return "translate(576,4)";
      case 35:
          return "translate(672,4)";      
      case 36:
          return "translate(768,4)";
          default:
        return "";
    }   
}

export const traitToNumNeeded = (traitName: string, numActivated: number ): number => {
    // console.log(`input: ${traitName} ${numActivated}`)
    switch (traitName.toLowerCase()) {
        case "academy":
        if (numActivated === 4) {
            return 4;
        } else if (numActivated === 5) {
            return 5;
        } else if (numActivated >= 6) {
            return 6;
        }
        return 3;
        case "automata":
        if (numActivated === 4 || numActivated === 5) {
            return 4;
        } else if (numActivated >= 6) {
            return 6;
        }
        return 2;
        case "banished mage":
        return 1;
        case "blood hunter":
        return 1;
        case "black rose":
        if (numActivated === 5 || numActivated === 6) {
            return 5;
        } else if (numActivated >= 7) {
            return 7;
        }
        return 3;
        case "chem-baron":
        if (numActivated === 4) {
            return 4;
        } else if (numActivated === 5) {
            return 5;
        } else if (numActivated === 6) {
            return 6;
        } else if (numActivated >= 7) {
            return 7;
        }
        return 3;
        case "conqueror":
        if (numActivated === 4 || numActivated === 5) {
            return 4;
        } else if (numActivated === 6 || numActivated === 7) {
            return 6;
        } else if (numActivated >= 8) {
            return 8;
        }
        return 2;
        case "emissary":
        if (numActivated === 4) {
            return 4;
        }
        return 1;
        case "enforcer":
        if (numActivated === 4 || numActivated === 5) {
            return 4;
        } else if (numActivated === 6 || numActivated === 7) {
            return 6;
        } else if (numActivated === 8 || numActivated === 9) {
            return 8;
        } else if (numActivated >= 10) {
            return 10;
        }
        return 2;
        case "experiment":
        if (numActivated === 5 || numActivated === 6) {
            return 5;
        } else if (numActivated >= 7) {
            return 7;
        }
        return 3;
        case "family":
        if (numActivated === 4) {
            return 4;
        } else if (numActivated === 5) {
            return 5;
        }
        return 3;
        case "firelight":
        if (numActivated === 3) {
            return 3;
        } else if (numActivated >= 4) {
            return 4;
        }
        return 2;
        case "high roller":
        return 1;
        case "junker king":
        return 1;
        case "machine herald":
        return 1;
        case "rebel":
        if (numActivated === 5 || numActivated === 6) {
            return 5;
        } else if (numActivated === 7 || numActivated === 8 || numActivated === 9) {
            return 7;
        } else if (numActivated >= 10) {
            return 10;
        }
        return 3;
        case "scrap":
        if (numActivated === 4 || numActivated === 5) {
            return 4;
        } else if (numActivated === 6 || numActivated === 7) {
            return 6;
        } else if (numActivated >= 9) {
            return 9;
        }
        return 2;
        case "ambusher":
        if (numActivated === 3) {
            return 3;
        } else if (numActivated === 4) {
            return 4;
        } else if (numActivated >= 5) {
            return 5;
        }
        return 2;
        case "artillerist":
        if (numActivated === 4 || numActivated === 5) {
            return 4;
        } else if (numActivated >= 6) {
            return 6;
        }
        return 2;
        case "bruiser":
        if (numActivated === 4 || numActivated === 5) {
            return 4;
        } else if (numActivated >= 6) {
            return 6;
        } 
        return 2;
        case "dominator":
        if (numActivated === 4 || numActivated === 5) {
            return 4;
        } else if (numActivated >= 6) {
            return 6;
        }
        return 2;
        case "form swapper":
        if (numActivated === 4) {
            return 4;
        }
        return 2;
        case "pit fighter":
        if (numActivated === 4 || numActivated === 5) {
            return 4;
        } else if (numActivated === 6 || numActivated === 7) {
            return 6;
        }  else if (numActivated >= 8) {
            return 8;
        }
        return 2;
        case "quickstriker":
        if (numActivated === 3) {
            return 3;
        } else if (numActivated >= 4) {
            return 4;
        }
        return 2;
        case "sentinel":
        if (numActivated === 4 || numActivated === 5) {
            return 4;
        } else if (numActivated >= 6) {
            return 6;
        }
        return 2;
        case "sniper":
        if (numActivated === 4 || numActivated === 5) {
            return 4;
        } else if (numActivated >= 6) {
            return 6;
        }
        return 2;
        case "sorcerer":
        if (numActivated === 4 || numActivated === 5) {
            return 4;
        } else if (numActivated >= 6) {
            return 6;
        } 
        return 2;
        case "visionary":
        if (numActivated === 4 || numActivated == 5) {
            return 4;
        } else if (numActivated >= 6) {
            return 6;
        }
        return 2;
        case "watcher":
        if (numActivated === 4 || numActivated === 5) {
            return 4;
        } else if (numActivated >= 6) {
            return 6;
        }
        return 2;
    }

    return 0;
}

export const traitLevelToHref = (traitLevel: level): string => {

    switch (traitLevel) {
      case "grey":
        return "";
      case "bronze":
        return "https://ap.tft.tools/img/general/trait_1.png?w=28";
      case "silver":
        return "https://ap.tft.tools/img/general/trait_2.png?w=28"; 
      case "gold":
        return "https://ap.tft.tools/img/general/trait_3.png?w=28";
      case "prismatic":
        return "https://ap.tft.tools/img/general/trait_4.png?w=28";
      case "unique":
        return "https://ap.tft.tools/img/general/trait_5.png?w=28";
    }
}

export const unitToTraits = (unitName: string): string[] => {

    switch(unitName.toLowerCase()) {
      case "amumu":
        return ["Automata", "Watcher"];
      case "darius":
        return ["Conqueror", "Watcher"];
      case "draven":
        return ["Conqueror", "Pit Fighter"];
      case "irelia":
        return ["Rebel", "Sentinel"];
      case "lux":
        return ["Academy", "Sorcerer"];
      case "maddie":
        return ["Enforcer", "Sniper"];
      case "morgana":
        return ["Black Rose", "Visionary"];
      case "powder":
        return ["Family", "Scrap", "Ambusher"];
      case "singed":
        return ["Chem-Baron", "Sentinel"];
      case "steb":
        return ["Enforcer", "Bruiser"];
      case "trundle":
        return ["Scrap", "Bruiser"];
      case "vex":
        return ["Rebel", "Visionary"];
      case "violet":
        return ["Family", "Pit Fighter"];
      case "zyra":
        return ["Experiment", "Sorcerer"];
      case "akali":
        return ["Rebel", "Quickstriker"];
      case "camille":
        return ["Enforcer", "Ambusher"];
      case "leona":
        return ["Academy", "Sentinel"];
      case "nocturne":
        return ["Automata", "Quickstriker"];
      case "rell":
        return ["Conqueror", "Sentinel", "Visionary"];
      case "renata glasc":
        return ["Chem-Baron", "Visionary"];
      case "sett":
        return ["Rebel", "Bruiser"];
      case "tristana":
        return ["Emissary", "Artillerist"];
      case "urgot":
        return ["Experiment", "Pit Fighter", "Artillerist"];
      case "vander":
        return ["Family", "Watcher"];
      case "vladimir":
        return ["Black Rose", "Watcher", "Sorcerer"];
      case "zeri":
        return ["Firelight", "Sniper"];
      case "ziggs":
        return ["Scrap", "Dominator"];
      case "blitzcrank":
        return ["Automata", "Dominator"];
      case "cassiopeia":
        return ["Black Rose", "Dominator"];
      case "ezreal":
        return ["Academy", "Rebel", "Artillerist"];
      case "gangplank":
        return ["Scrap", "Form Swapper", "Pit Fighter"];
      case "kog'maw":
        return ["Automata", "Sniper"];
      case "loris":
        return ["Enforcer", "Sentinel"];
      case "nami":
        return ["Emissary", "Sorcerer"];
      case "nunu":
        return ["Experiment", "Bruiser", "Visionary"];
      case "renni":
        return ["Chem-Baron", "Bruiser"];
      case "scar":
        return ["Firelight", "Watcher"];
      case "smeech":
        return ["Chem-Baron", "Ambusher"];
      case "swain":
        return ["Conqueror", "Form Swapper", "Sorcerer"];
      case "twisted fate":
        return ["Enforcer", "Quickstriker"];
      case "ambessa":
        return ["Emissary", "Conqueror", "Quickstriker"];
      case "corki":
        return ["Scrap", "Artillerist"];
      case "dr. mundo":
        return ["Experiment", "Dominator"];
      case "ekko":
        return ["Firelight", "Scrap", "Ambusher"];
      case "elise":
        return ["Black Rose", "Form Swapper", "Bruiser"];
      case "garen":
        return ["Emissary", "Watcher"];
      case "heimerdinger":
        return ["Academy", "Visionary"];
      case "illaoi":
        return ["Rebel", "Sentinel"];
      case "silco":
        return ["Chem-Baron", "Dominator"];
      case "twitch":
        return ["Experiment", "Sniper"];
      case "vi":
        return ["Enforcer", "Pit Fighter"];
      case "zoe":
        return ["Rebel", "Sorcerer"];
      case "caitlyn":
        return ["Enforcer", "Sniper"];
      case "jayce":
        return ["Academy", "Form Swapper"];
      case "jinx":
        return ["Rebel", "Ambusher"];
      case "leblanc":
        return ["Black Rose", "Sorcerer"];
      case "malzahar":
        return ["Automata", "Visionary"];
      case "mordekaiser":
        return ["Conqueror", "Dominator"];
      case "rumble":
        return ["Junker King", "Scrap", "Sentinel"];
      case "sevika":
        return ["High Roller", "Chem-Baron", "Pit Fighter"];
      case "mel":
        return ["Banished Mage"];
      case "viktor":
        return ["Machine Herald"];
      case "warwick":
        return ["Experiment", "Blood Hunter"];
      default:
        return [];    
    }
}

export function traitToLevel(traitName: string, numActivated: number): level {

    switch (traitName.toLowerCase()) {
      case "academy":
        if (numActivated <= 2) {
          return "grey";
        } else if (numActivated === 3) {
          return "bronze";
        } else if (numActivated === 4) {
          return "silver"
        } 
        return "gold";
      case "automata":
        if (numActivated < 2) {
          return "grey";
        } else if (numActivated < 4) {
          return "bronze";
        } else if (numActivated < 6) {
          return "silver";
        } else {
          return "gold";
        }
      case "banished mage":
        return "unique";
      case "blood hunter":
        return "unique";
      case "black rose":
        if (numActivated < 3) {
          return "grey";
        } else if (numActivated < 4) {
          return "bronze";
        } else if (numActivated < 5) {
          return "silver";
        } else if (numActivated < 7) {
          return "gold";
        } 
        return "prismatic";
      case "chem-baron":
        if (numActivated < 3) {
          return "grey";
        } else if (numActivated < 4) {
          return "bronze";
        } else if (numActivated < 6) {
          return "silver";
        }
        return "gold";
      case "conqueror":
        if (numActivated < 2) {
          return "grey";
        } else if (numActivated < 4) {
          return "bronze";
        } else if (numActivated < 6) {
          return "silver";
        } else if (numActivated < 9) {
          return "gold";
        }
        return "prismatic";
      case "emissary":
        if (numActivated === 1) {
          return "bronze";
        } else if (numActivated === 4) {
          return "gold";
        }
        return "grey";
      case "enforcer":
        if (numActivated < 2) {
          return "grey";
        } else if (numActivated < 4) {
          return "bronze";
        } else if (numActivated < 6) {
          return "silver";
        } else if (numActivated < 10) {
          return "gold";
        }
        return "prismatic";
      case "experiment":
        if (numActivated < 3) {
          return "grey";
        } else if (numActivated < 5) {
          return "bronze";
        } 
        return "gold";
      case "family":
        if (numActivated < 3) {
          return "grey";
        }
        return "gold"
      case "firelight":
        if (numActivated < 2) {
          return "grey";
        } else if (numActivated < 3) {
          return "bronze";
        } 
        return "gold";
      case "high roller":
        return "unique";
      case "junker king":
        return "unique";
      case "machine herald":
        return "unique"
      case "rebel":
        if (numActivated < 3) {
          return "grey";
        } else if (numActivated < 5) {
          return "bronze";
        } else if (numActivated < 7) {
          return "silver";
        } else if (numActivated < 10) {
          return "gold";
        }
        return "prismatic"
      case "scrap":
        if (numActivated < 2) {
          return "grey";
        } else if (numActivated < 4) {
          return "bronze";
        } else if (numActivated < 6) {
          return "silver";
        } 
        return "gold";
      case "ambusher":
        if (numActivated < 2) {
          return "grey";
        } else if (numActivated < 3) {
          return "bronze";
        } else if (numActivated < 5) {
          return "silver";
        }
        return "gold"
      case "artillerist":
        if (numActivated < 2) {
          return "grey";
        } else if (numActivated < 4) {
          return "bronze";
        } 
        return "gold";
      case "bruiser":
        if (numActivated < 2) {
          return "grey";
        } else if (numActivated < 4) {
          return "bronze";
        } else if (numActivated < 6) {
          return "silver";
        }
        return "gold";
      case "dominator":
        if (numActivated < 2) {
          return "grey";
        } else if (numActivated < 4) {
          return "bronze";
        } else if (numActivated < 6) {
          return "silver";
        }
        return "gold";
      case "form swapper":
        if (numActivated < 2) {
          return "grey";
        } else if (numActivated < 4) {
          return "bronze";
        }
        return "gold";
      case "pit fighter":
        if (numActivated < 2) {
          return "grey";
        } else if (numActivated < 4) {
          return "bronze";
        } else if (numActivated < 6) {
          return "silver";
        }
        return "gold"
      case "quickstriker":
        if (numActivated < 2) {
          return "grey";
        } else if (numActivated < 3) {
          return "bronze";
        } else if (numActivated < 4) {
          return "silver";
        }
        return "gold";
      case "sentinel":
        if (numActivated < 2) {
          return "grey";
        } else if (numActivated < 4) {
          return "bronze";
        } else if (numActivated < 6) {
          return "silver";
        }
        return "gold";
      case "sniper":
        if (numActivated < 2) {
          return "grey";
        } else if (numActivated < 4) {
          return "bronze";
        }
        return "gold";
      case "sorcerer":
        if (numActivated < 2) {
          return "grey";
        } else if (numActivated < 4) {
          return "bronze";
        } else if (numActivated < 6) {
          return "silver";
        }
        return "gold";
      case "visionary":
        if (numActivated < 2) {
          return "grey";
        } else if (numActivated < 4) {
          return "bronze";
        } else if (numActivated < 6) {
          return "silver";
        }
        return "gold";
      case "watcher":
        if (numActivated < 2) {
          return "grey";
        } else if (numActivated < 4) {
          return "bronze";
        } else if (numActivated < 6) {
          return "silver";
        }
        return "gold";
    }
    return  "grey";
}

export function unitToHref(unitName: string): string {

    switch (unitName.toLowerCase()) {
      case "amumu":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_amumu.jpg?w=98"
      case "darius":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_darius.jpg?w=98"
      case "draven":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_draven.jpg?w=98"
      case "irelia":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_irelia.jpg?w=98"
      case "lux":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_lux.jpg?w=98"
      case "maddie":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_shooter.jpg?w=98"
      case "morgana":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_morgana.jpg?w=98"
      case "powder":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_blue.jpg?w=98"
      case "singed":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_singed.jpg?w=98"
      case "steb":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_fish.jpg?w=98"
      case "trundle":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_trundle.jpg?w=98"
      case "vex":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_vex.jpg?w=98"
      case "violet":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_red.jpg?w=98"
      case "zyra":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_zyra.jpg?w=98"
      case "akali":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_akali.jpg?w=98"
      case "camille":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_camille.jpg?w=98"
      case "leona":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_leona.jpg?w=98"
      case "nocturne":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_nocturne.jpg?w=98"
      case "rell":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_rell.jpg?w=98"
      case "renata glasc":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_renataGlasc.jpg?w=98"
      case "sett":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_sett.jpg?w=98"
      case "tristana":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_tristana.jpg?w=98"
      case "urgot":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_urgot.jpg?w=98"
      case "vander":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_prime.jpg?w=98"
      case "vladimir":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_vladimir.jpg?w=98"
      case "zeri":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_zeri.jpg?w=98"
      case "ziggs":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_ziggs.jpg?w=98"
      case "blitzcrank":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_blitzcrank.jpg?w=98"
      case "cassiopeia":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_cassiopeia.jpg?w=98"
      case "ezreal":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_ezreal.jpg?w=98"
      case "gangplank":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_gangplank.jpg?w=98"
      case "kog'maw":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_kogmaw.jpg?w=98"
      case "loris":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_beardy.jpg?w=98"
      case "nami":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_nami.jpg?w=98"
      case "nunu":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_NunuWillump.jpg?w=98"
      case "renni":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_chainsaw.jpg?w=98"
      case "scar":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_flyguy.jpg?w=98"
      case "smeech":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_gremlin.jpg?w=98"
      case "swain":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_swain.jpg?w=98"
      case "twisted fate":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_twistedFate.jpg?w=98"
      case "ambessa":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_ambessa.jpg?w=98"
      case "corki":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_corki.jpg?w=98"
      case "dr. mundo":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_drmundo.jpg?w=98"
      case "ekko":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_ekko.jpg?w=98"
      case "elise":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_elise.jpg?w=98"
      case "garen":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_garen.jpg?w=98"
      case "heimerdinger":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_heimerdinger.jpg?w=98"
      case "illaoi":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_illaoi.jpg?w=98"
      case "silco":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_silco.jpg?w=98"
      case "twitch":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_twitch.jpg?w=98"
      case "vi":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_vi.jpg?w=98"
      case "zoe":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_zoe.jpg?w=98"
      case "caitlyn":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_caitlyn.jpg?w=98"
      case "jayce":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_jayce.jpg?w=98"
      case "jinx":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_jinx.jpg?w=98"
      case "leblanc":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_leblanc.jpg?w=98"
      case "malzahar":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_malzahar.jpg?w=98"
      case "mordekaiser":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_mordekaiser.jpg?w=98"
      case "rumble":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_rumble.jpg?w=98"
      case "sevika":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_lieutenant.jpg?w=98"
      case "mel":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_missmage.jpg?w=98"
      case "viktor":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_viktor.jpg?w=98"
      case "warwick":
        return "https://ap.tft.tools/img/ts13/face_full/TFT13_warwick.jpg?w=98"
      default:
        return ""
    }
}

// xp needed from current level, to proceed to next level
export function levelToXpNeeded(level: number): number {
    switch (level) {
      case 1:
        return 2;
      case 2:
        return 2;
      case 3:
        return 6;
      case 4:
        return 10;
      case 5:
        return 20;
      case 6:
        return 36;
      case 7:
        return 48;
      case 8:
        return 76;
      case 9:
        return 84;
      default:
        return 0;
    }
}

export function traitToHref(traitName: string, black: boolean): string {

    const baseUrl = "https://ap.tft.tools/static/trait-icons/TFT13_";
    const suffix = black ? "" : "_w"; 
  
    switch (traitName.toLowerCase()) {
      case "academy":
        return `${baseUrl}Academy${suffix}.svg`;
      case "automata":
        return `${baseUrl}Hextech${suffix}.svg`;
      case "banished mage":
        return `${baseUrl}MissMageTrait.svg`;
      case "blood hunter":
        return `${baseUrl}BloodHunter.svg`;
      case "black rose":
        return `${baseUrl}Cabal${suffix}.svg`;
      case "chem-baron":
        return `${baseUrl}Crime${suffix}.svg`;
      case "conqueror":
        return `${baseUrl}Warband${suffix}.svg`;
      case "emissary":
        return `${baseUrl}Ambassador.svg`;
      case "enforcer":
        return `${baseUrl}Squad${suffix}.svg`;
      case "experiment":
        return `${baseUrl}Experiment${suffix}.svg`;
      case "family":
        return `${baseUrl}Family${suffix}.svg`;
      case "firelight":
        return `${baseUrl}Hoverboard${suffix}.svg`;
      case "high roller":
        return `${baseUrl}HighRoller.svg`;
      case "junker king":
        return `${baseUrl}JunkerKing.svg`;
      case "machine herald":
        return `${baseUrl}MachineHerald.svg`;
      case "rebel":
        return `${baseUrl}Rebel${suffix}.svg`;
      case "scrap":
        return `${baseUrl}Scrap${suffix}.svg`;
      case "ambusher":
        return `${baseUrl}Ambusher${suffix}.svg`;
      case "artillerist":
        return `${baseUrl}Martialist${suffix}.svg`;
      case "bruiser":
        return `${baseUrl}Bruiser${suffix}.svg`;
      case "dominator":
        return `${baseUrl}Infused${suffix}.svg`;
      case "form swapper":
        return `${baseUrl}FormSwapper${suffix}.svg`;
      case "pit fighter":
        return `${baseUrl}Pugilist${suffix}.svg`;
      case "quickstriker":
        return `${baseUrl}Challenger${suffix}.svg`;
      case "sentinel":
        return `${baseUrl}Titan${suffix}.svg`;
      case "sniper":
        return `${baseUrl}Sniper${suffix}.svg`;
      case "sorcerer":
        return `${baseUrl}Sorcerer${suffix}.svg`;
      case "visionary":
        return `${baseUrl}Invoker${suffix}.svg`;
      case "watcher":
        return `${baseUrl}Watcher${suffix}.svg`;
      default:
        return "";
    }
}

export const levelToOdds = (level: number): string[] => {

  switch (level) {
    case 1:
      return ["100%", "0%", "0%", "0%", "0%"];
    case 2:
      return ["100%", "0%", "0%", "0%", "0%"];
    case 3:
      return ["75%", "25%", "0%", "0%", "0%"];
    case 4:
      return ["55%", "30%", "15%", "0%", "0%"];
    case 5:
      return ["45%", "33%", "20%", "2%", "0%"];
    case 6:
      return ["30%", "40%", "25%", "5%", "0%"];
    case 7:
      return ["19%", "30%", "40%", "10%", "1%"];
    case 8:
      return ["18%", "25%", "32%", "22%", "3%"];
    case 9:
      return ["15%", "20%", "25%", "30%", "10%"];
    case 10:
      return ["5%", "10%", "20%", "40%", "25%"];
    default:
      return ["0%", "0%", "0%", "0%", "0%"];
  }
  
}

export const stageToSixCost = (stage: string, level: number): boolean => {
  
  const isLevelTen = (level === 10);
  const ran_number = Math.random();

  switch (stage) {
    case "1-1":
      return false;
    case "1-2":
      return false;
    case "1-3":
      return false;
    case "1-4":
      return false;
    case "2-1":
      return false;
    case "2-2":
      return false;
    case "2-3":
      return false;
    case "2-5":
      return false;
    case "2-6":
      return false;
    case "2-7":
      return false;
    case "3-1":
      return false;
    case "3-2":
      return false;
    case "3-3":
      return false;
    case "3-5":
      return false;
    case "3-6":
      return false;
    case "3-7":
      return false;
    case "4-1":
      return false;
    case "4-2":
      return false;
    case "4-3":
      return false;
    case "4-5":
      return false;
    case "4-6":
      if (ran_number <= 0.0016) {
        return true;
      } else if (isLevelTen && ran_number <= 0.0126) {
        return true;
      }
      return false;
    case "4-7":
      if (ran_number <= 0.0016) {
        return true;
      } else if (isLevelTen && ran_number <= 0.0126) {
        return true;
      }
      return false;
    case "5-1":
      if (ran_number <= 0.0019) {
        return true;
      } else if (isLevelTen && ran_number <= 0.0129) {
        return true;
      }
      return false;
    case "5-2":
      if (ran_number <= 0.0022) {
        return true;
      } else if (isLevelTen && ran_number <= 0.0132) {
        return true;
      }
      return false;
    case "5-3":
      if (ran_number <= 0.0025) {
        return true;
      } else if (isLevelTen && ran_number <= 0.0135) {
        return true;
      }
      return false;
    case "5-5":
      if (ran_number <= 0.0028) {
        return true;
      } else if (isLevelTen && ran_number <= 0.0138) {
        return true;
      }
      return false;
    case "5-6":
      if (ran_number <= 0.0031) {
        return true;
      } else if (isLevelTen && ran_number <= 0.0141) {
        return true;
      }
      return false;
    case "5-7":
      if (ran_number <= 0.0034) {
        return true;
      } else if (isLevelTen && ran_number <= 0.0144) {
        return true;
      }
      return false;
    case "6-1":
      if (ran_number <= 0.0038) {
        return true;
      } else if (isLevelTen && ran_number <= 0.0148) {
        return true;
      }
      return false;
    case "6-2":
      if (ran_number <= 0.0042) {
        return true;
      } else if (isLevelTen && ran_number <= 0.0152) {
        return true;
      }
      return false;
    case "6-3":
      if (ran_number <= 0.0046) {
        return true;
      } else if (isLevelTen && ran_number <= 0.0156) {
        return true;
      }
      return false;
    case "6-5":
      if (ran_number <= 0.0050) {
        return true;
      } else if (isLevelTen && ran_number <= 0.0160) {
        return true;
      }
      return false;
    case "6-6":
      if (ran_number <= 0.0054) {
        return true;
      } else if (isLevelTen && ran_number <= 0.0164) {
        return true;
      }
      return false;
    case "6-7":
      if (ran_number <= 0.0054) {
        return true;
      } else if (isLevelTen && ran_number <= 0.0168) {
        return true;
      }
      return false;
    case "7-1":
      if (ran_number <= 0.0078) {
        return true;
      } else if (isLevelTen && ran_number <= 0.0188) {
        return true;
      }
      return false;
    case "7-2":
      if (ran_number <= 0.0098) {
        return true;
      } else if (isLevelTen && ran_number <= 0.0208) {
        return true;
      }
      return false;
    case "7-3":
      if (ran_number <= 0.0098) {
        return true;
      } else if (isLevelTen && ran_number <= 0.0208) {
        return true;
      }
      return false;
    case "7-5":
      if (ran_number <= 0.0098) {
        return true;
      } else if (isLevelTen && ran_number <= 0.0208) {
        return true;
      }
      return false;
    case "7-6":
      if (ran_number <= 0.00098) {
        return true;
      } else if (isLevelTen && ran_number <= 0.0208) {
        return true;
      }
      return false;
    case "7-7":
      if (ran_number <= 0.00098) {
        return true;
      } else if (isLevelTen && ran_number <= 0.0208) {
        return true;
      }
      return false;
    default:
      return false; // Default case for any unexpected stage
  }
}
