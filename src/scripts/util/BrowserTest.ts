export enum Browser {
    Android = 'Android',
    BlackBerry = 'BlackBerry',
    iOS = 'iOS',
    Opera = 'Opera',
    Windows = 'Windows'
}

export class BrowserRegex {
    static readonly Android = /Android/i;
    static readonly BlackBerry = /BlackBerry/i;
    static readonly iOS = /iPhone|iPad|iPod/i;
    static readonly Opera = /Opera Mini/i;
    static readonly Windows = /IEMobile/;
}

export default class BrowserTest {
    static readonly Android = BrowserTest.testRegex(BrowserRegex.Android);
    static readonly BlackBerry = BrowserTest.testRegex(BrowserRegex.BlackBerry);
    static readonly iOS = BrowserTest.testRegex(BrowserRegex.iOS);
    static readonly Opera = BrowserTest.testRegex(BrowserRegex.Opera);
    static readonly Windows = BrowserTest.testRegex(BrowserRegex.Windows);

    static testRegex(regex: RegExp) {
        return navigator.userAgent.match(regex);
    }
}