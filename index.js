class ChampionInfo {
    constructor(champion, title, description, score) {
        this.champion = champion;
        this.title = title;
        this.description = description;
        this.score = score;
    }
}
class Champion {
    constructor(name, src) {
        this.goodAgainst = [];
        this.badAgainst = [];
        this.goodWith = [];
        this.badWith = [];
        this.name = name;
        this.src = src;
        Champion.ALL.push(this);
    }
    static get(name) {
        for (let champ of Champion.ALL) {
            if (champ.name == name)
                return champ;
        }
        return null;
    }
    getImageSrcPath() {
        return getImagePath(this.src);
    }
    addChampionInfo(infos, oppositeInfos, champion, description, championInfo, oppositeInfo) {
        const info = infos.find(v => v.champion === champion);
        if (info === undefined) {
            infos.push(championInfo);
        }
        const opInfo = oppositeInfos.find(v => v.champion === this);
        if (opInfo === undefined) {
            oppositeInfos.push(oppositeInfo);
        }
    }
    addGoodAgainst(champion, description, score = 1) {
        this.addChampionInfo(this.goodAgainst, champion.badAgainst, champion, description, new ChampionInfo(champion, "Good against " + champion.name, description, score), new ChampionInfo(this, "Bad against " + this.name, description, score));
    }
    addGoodWith(champion, description, score = 1) {
        this.addChampionInfo(this.goodWith, champion.goodWith, champion, description, new ChampionInfo(champion, "Good with " + champion.name, description, score), new ChampionInfo(this, "Good with " + this.name, description, score));
    }
}
Champion.ALL = [];
class ChampionScore {
    constructor() {
        this.champions = [];
        this.score = 0;
    }
}
class UIEvents {
}
class UIElementEvents extends UIEvents {
    constructor(element) {
        super();
        this.element = element;
    }
    addOnClick(func) {
        this.element.addEventListener('click', func);
    }
    removeOnClick(func) {
        this.element.removeEventListener('click', func);
    }
    addOnPointerEnter(func) {
        this.element.addEventListener('pointerenter', func);
    }
    removeOnPointerEnter(func) {
        this.element.removeEventListener('pointerenter', func);
    }
    addOnPointerLeave(func) {
        this.element.addEventListener('pointerleave', func);
    }
    removeOnPointerLeave(func) {
        this.element.removeEventListener('pointerleave', func);
    }
    addOnPointerDown(func) {
        this.element.addEventListener('pointerdown', func);
    }
    removeOnPointerDown(func) {
        this.element.removeEventListener('pointerdown', func);
    }
    addOnChange(func) {
        this.element.addEventListener('change', func);
    }
    removeOnChange(func) {
        this.element.removeEventListener('change', func);
    }
    addOnInput(func) {
        this.element.addEventListener('input', func);
    }
    removeOnInput(func) {
        this.element.removeEventListener('input', func);
    }
    addOnResize(func) {
        this.element.addEventListener('resize', func);
    }
}
class UI {
    static initialize() {
        document.body.style.padding = "0px";
        document.body.style.margin = "0px";
        document.body.style.position = "fixed";
        this.body = document.createElement('div');
        this.body.style.position = "fixed";
        this.body.style.width = "100%";
        this.body.style.height = "100%";
        this.body.style.backgroundColor = "transparent";
        document.body.appendChild(this.body);
        this.addOnResize(() => {
            document.body.style.width = window.innerWidth + "px";
            document.body.style.height = window.innerHeight + "px";
        });
    }
    static getPercentage(value, maxValue) {
        return (1 - (value / maxValue)) * 100;
    }
    static get modifyEvents() {
        return this.events;
    }
    static setBackgroundColor(color) {
        document.body.style.backgroundColor = color;
    }
    static addOnResize(func) {
        func();
        this.modifyEvents.addOnResize(func);
    }
}
UI.events = new UIElementEvents(window);
UI.initialize();
class UIElement extends UI {
    constructor(element) {
        super();
        this.element = element;
        this.events = new UIElementEvents(this.element);
        UI.body.appendChild(this.element);
    }
    get modifyElement() {
        return this.element;
    }
    get modifyStyle() {
        return this.element.style;
    }
    get modifyEvents() {
        return this.events;
    }
}
class ImageUI extends UIElement {
    constructor() {
        super(document.createElement('img'));
    }
}
class BoxUI extends UIElement {
    constructor() {
        super(document.createElement('div'));
    }
}
class TextUI extends UIElement {
    constructor(text) {
        super(document.createElement('p'));
        this.modifyElement.textContent = text;
    }
}
class ButtonUI extends BoxUI {
    constructor(text, w, h) {
        super();
        this.color = "black";
        this.hoverColor = "blue";
        this.modifyStyle.width = w;
        this.modifyStyle.height = h;
        this.modifyStyle.cursor = "pointer";
        this.modifyElement.setAttribute('class', 'button');
        this.text = new TextUI(text);
        this.modifyElement.appendChild(this.text.modifyElement);
        this.onLeaveEvent = ButtonUI.setButtonEvents(this);
    }
    get modifyText() {
        return this.text;
    }
    getColor() {
        return this.color;
    }
    getHoverColor() {
        return this.hoverColor;
    }
    setColor(color) {
        this.color = color;
        this.onLeaveEvent();
    }
    setHoverColor(hoverColor) {
        this.hoverColor = hoverColor;
    }
    static setEvents(btn, setColorFunc) {
        btn.modifyEvents.addOnPointerEnter(e => {
            setColorFunc(btn.modifyStyle, btn.getHoverColor());
        });
        const onLeaveEvent = () => {
            setColorFunc(btn.modifyStyle, btn.getColor());
        };
        onLeaveEvent();
        btn.modifyEvents.addOnPointerLeave(e => onLeaveEvent());
        return onLeaveEvent;
    }
    static setButtonEvents(btn) {
        return this.setEvents(btn, (style, color) => style.backgroundColor = color);
    }
}
class ImageButtonUI extends ImageUI {
    constructor() {
        super();
        this.onLeaveEvent = ImageButtonUI.setImageButtonEvents(this);
    }
    getColor() {
        return this.color;
    }
    getHoverColor() {
        return this.hoverColor;
    }
    setColor(color) {
        this.color = color;
        this.onLeaveEvent();
    }
    setHoverColor(color) {
        this.hoverColor = color;
    }
    static setImageButtonEvents(imageButton) {
        return ButtonUI.setEvents(imageButton, (style, color) => style.backgroundColor = color);
    }
}
const iconSize = 75;
const defaultValue = {
    fontFamily: "Arial",
    opacity: 50
};
function getImagePath(fileName) {
    return "Images/" + fileName;
}
function clearChildren(element) {
    while (element.firstChild)
        element.removeChild(element.firstChild);
}
function getTextUI(textContent = "", border = 1, hexColor = "#000000") {
    const text = new TextUI(textContent);
    text.modifyStyle.color = "white";
    text.modifyStyle.fontFamily = defaultValue.fontFamily;
    text.modifyStyle.cursor = "pointer";
    text.modifyStyle.userSelect = "none";
    text.modifyStyle.textShadow = `${hexColor} 0px 0px ${border}px, ${hexColor} 0px 0px ${border}px, ${hexColor} 0px 0px ${border}px, ${hexColor} 0px 0px ${border}px, ${hexColor} 0px 0px ${border}px, ${hexColor} 0px 0px ${border}px`;
    return text;
}
class PopUpInfo extends UIElement {
    constructor() {
        super(document.createElement('div'));
        this.modifyStyle.backgroundColor = "black";
        this.modifyStyle.zIndex = "100";
        this.modifyStyle.display = "none";
        this.modifyStyle.position = "fixed";
        this.modifyEvents.addOnPointerLeave(() => this.hide());
        this.image = new ImageUI();
        this.modifyElement.appendChild(this.image.modifyElement);
        this.image.modifyStyle.width = "100px";
        this.image.modifyStyle.height = "100px";
        this.image.modifyStyle.display = "inline-block";
        this.nameText = new TextUI("");
        this.modifyElement.appendChild(this.nameText.modifyElement);
        this.nameText.modifyStyle.color = "white";
        this.nameText.modifyStyle.fontFamily = defaultValue.fontFamily;
        this.nameText.modifyStyle.margin = "5px";
        this.nameText.modifyStyle.display = "inline-block";
        this.nameText.modifyStyle.position = "relative";
        this.nameText.modifyStyle.top = "-75px";
        this.descriptionText = new TextUI("");
        this.modifyElement.appendChild(this.descriptionText.modifyElement);
        this.descriptionText.modifyStyle.color = "white";
        this.descriptionText.modifyStyle.margin = "5px";
        this.descriptionText.modifyStyle.fontFamily = defaultValue.fontFamily;
        this.descriptionText.modifyStyle.maxWidth = "400px";
        this.descriptionText.modifyStyle.maxHeight = "400px";
        this.descriptionText.modifyStyle.overflowY = "auto";
        this.descriptionText.modifyStyle.wordWrap = "break-word";
    }
    display(ui) {
        clearChildren(this.descriptionText.modifyElement);
        const champion = ui.get();
        if (champion !== null) {
            this.image.modifyElement.src = getImagePath(champion.src);
            this.nameText.modifyElement.textContent = champion.name;
            this.image.modifyElement.alt = champion.name;
            const description = (infos, color) => {
                const paragraph = document.createElement('p');
                this.descriptionText.modifyElement.appendChild(paragraph);
                for (let info of infos) {
                    const strongTitle = document.createElement('strong');
                    paragraph.appendChild(strongTitle);
                    strongTitle.textContent = info.title;
                    strongTitle.style.color = color;
                    const img = document.createElement('img');
                    paragraph.appendChild(img);
                    img.style.width = "25px";
                    img.style.height = "25px";
                    img.src = getImagePath(info.champion.name + "Icon.png");
                    const descriptionParagraph = document.createElement('p');
                    paragraph.appendChild(descriptionParagraph);
                    descriptionParagraph.textContent += info.description;
                }
            };
            description(champion.goodAgainst, "#ff0000");
            description(champion.badAgainst, "#ff0000");
            description(champion.goodWith, "#00ff00");
            description(champion.badWith, "#00ff00");
        }
        else {
            this.image.modifyElement.src = getImagePath(ui.src);
            this.image.modifyElement.alt = "No image.";
            this.nameText.modifyElement.textContent = "No champion selected!";
            this.descriptionText.modifyElement.textContent = "";
            clearChildren(this.descriptionText.modifyElement);
        }
        this.modifyStyle.display = "block";
    }
    hide() {
        this.modifyStyle.display = "none";
    }
}
class ChampionUI extends UIElement {
    constructor(src, w, h) {
        super(document.createElement('div'));
        this.champion = null;
        this.synergyScore = null;
        this.counterScore = null;
        this.modifyStyle.position = "relative";
        const width = w + "px", height = h + "px";
        this.src = src;
        this.imageButton = new ImageButtonUI();
        this.modifyElement.appendChild(this.imageButton.modifyElement);
        this.imageButton.modifyElement.src = getImagePath(this.src);
        this.imageButton.modifyStyle.cursor = "pointer";
        this.imageButton.modifyEvents.addOnPointerDown(e => {
            if (e.button !== 2)
                return;
            ChampionUI.popUp.display(this);
            let x = e.clientX, y = e.clientY;
            const w = ChampionUI.popUp.modifyElement.clientWidth, h = ChampionUI.popUp.modifyElement.clientHeight;
            if ((x + w) > window.innerWidth)
                x += window.innerWidth - (x + w);
            if ((y + h) > window.innerHeight)
                y += window.innerHeight - (y + h);
            ChampionUI.popUp.modifyStyle.left = x + "px";
            ChampionUI.popUp.modifyStyle.top = y + "px";
        });
        this.text = getTextUI();
        this.modifyElement.appendChild(this.text.modifyElement);
        const fontSize = 12;
        this.text.modifyStyle.minHeight = fontSize + "px";
        this.text.modifyStyle.fontSize = fontSize + "px";
        this.text.modifyStyle.margin = "0px";
        this.text.modifyStyle.textAlign = "center";
        this.text.modifyStyle.display = "block";
        this.text.modifyStyle.width = width;
        this.text.modifyStyle.pointerEvents = "none";
        const getHighlightedTextUI = (color = "#ffffff") => {
            const text = getTextUI("", 4, color);
            this.modifyElement.appendChild(text.modifyElement);
            text.modifyStyle.zIndex = "10";
            text.modifyStyle.fontSize = "18px";
            text.modifyStyle.position = "absolute";
            text.modifyStyle.textAlign = "center";
            text.modifyStyle.top = "50%";
            text.modifyStyle.width = width;
            text.modifyStyle.pointerEvents = "none";
            return text;
        };
        this.highlightedText = getHighlightedTextUI("#000000");
        this.highlightedText.modifyStyle.color = "yellow";
        this.synergyText = getHighlightedTextUI("#ffffff");
        this.synergyText.modifyStyle.textAlign = "left";
        this.synergyText.modifyStyle.color = "blue";
        this.counterText = getHighlightedTextUI("#000000");
        this.counterText.modifyStyle.textAlign = "right";
        this.counterText.modifyStyle.color = "red";
        this.hoverImage = new ImageUI();
        this.modifyElement.appendChild(this.hoverImage.modifyElement);
        this.hoverImage.modifyElement.src = getImagePath("FadeOut.png");
        this.hoverImage.modifyStyle.backgroundColor = "transparent";
        this.hoverImage.modifyStyle.position = "absolute";
        this.hoverImage.modifyStyle.transform = "rotate(270deg)";
        this.hoverImage.modifyStyle.pointerEvents = "none";
        this.hoverImage.modifyStyle.visibility = "hidden";
        this.hoverImage.modifyStyle.opacity = "25%";
        this.hoverImage.modifyStyle.top = "0px";
        this.hoverImage.modifyStyle.left = "0px";
        this.imageButton.modifyEvents.addOnPointerEnter(() => {
            this.hoverImage.modifyStyle.visibility = "visible";
        });
        this.imageButton.modifyEvents.addOnPointerLeave(() => {
            this.hoverImage.modifyStyle.visibility = "hidden";
        });
        this.imageButton.modifyStyle.width = width;
        this.imageButton.modifyStyle.height = height;
        this.hoverImage.modifyStyle.width = width;
        this.hoverImage.modifyStyle.height = height;
    }
    set(champion) {
        this.champion = champion;
        if (this.champion !== null) {
            this.imageButton.modifyElement.src = this.champion.getImageSrcPath();
            this.imageButton.modifyElement.alt = this.champion.name;
            this.text.modifyElement.textContent = this.champion.name;
        }
        else {
            this.imageButton.modifyElement.src = getImagePath(this.src);
            this.imageButton.modifyElement.alt = "No champion.";
            this.text.modifyElement.textContent = "";
        }
    }
    get() {
        return this.champion;
    }
    reset() {
        this.imageButton.modifyStyle.filter = "grayscale(0%)";
        this.synergyText.modifyElement.textContent = "";
        this.counterText.modifyElement.textContent = "";
    }
    ban() {
        this.imageButton.modifyStyle.filter = "grayscale(100%)";
    }
    getSynergyScore() {
        if (this.synergyScore === null)
            return 0;
        return this.synergyScore.score;
    }
    getCounterScore() {
        if (this.counterScore === null)
            return 0;
        return this.counterScore.score;
    }
    evaluateChamps(team, infos) {
        const champScore = new ChampionScore();
        for (let ui of team) {
            const champ = ui.champion;
            if (champ === null)
                continue;
            const compareFunc = (v) => v.champion === champ;
            const info = infos.find(compareFunc);
            if (info !== undefined) {
                champScore.champions.push(champ);
                champScore.score += info.score;
            }
        }
        return champScore;
    }
    evaluatePick(friendlyTeam, enemyTeam) {
        if (this.champion === null) {
            this.synergyText.modifyElement.textContent = "";
            this.counterText.modifyElement.textContent = "";
            return;
        }
        this.synergyScore = this.evaluateChamps(friendlyTeam, this.champion.goodWith);
        this.synergyText.modifyElement.textContent = this.synergyScore.score.toString();
        this.counterScore = this.evaluateChamps(enemyTeam, this.champion.goodAgainst);
        this.counterText.modifyElement.textContent = this.counterScore.score.toString();
    }
    evaluateBan(friendlyTeam, enemyTeam) {
        if (this.champion === null) {
            this.synergyText.modifyElement.textContent = "";
            this.counterText.modifyElement.textContent = "";
            return;
        }
        this.synergyScore = this.evaluateChamps(friendlyTeam, this.champion.goodWith);
        this.synergyText.modifyElement.textContent = (-this.synergyScore.score).toString();
        this.counterScore = this.evaluateChamps(enemyTeam, this.champion.goodAgainst);
        this.counterText.modifyElement.textContent = (-this.counterScore.score).toString();
    }
}
ChampionUI.popUp = new PopUpInfo();
function getChampionUI(fileName, w, h) {
    const imageBtn = new ChampionUI(fileName, w, h);
    return imageBtn;
}
class LayoutUI extends UIElement {
    constructor() {
        super(document.createElement('div'));
        this.uiList = [];
        this.padding = "0px";
        this.margin = "5px";
        this.modifyElement.setAttribute('class', 'layout');
    }
    getUI(index) {
        return this.uiList[index];
    }
    add(ui) {
        this.uiList.push(ui);
        ui.modifyStyle.padding = this.padding;
        ui.modifyStyle.margin = this.margin;
        this.modifyElement.appendChild(ui.modifyElement);
    }
    remove(index) {
        const ui = this.uiList[index];
        this.uiList.splice(index, 1);
        UI.body.appendChild(ui.modifyElement);
    }
}
class VerticalLayoutUI extends LayoutUI {
    constructor() {
        super();
    }
    add(ui) {
        super.add(ui);
        ui.modifyStyle.display = "block";
    }
}
class HorizontalLayoutUI extends LayoutUI {
    constructor() {
        super();
    }
    add(ui) {
        super.add(ui);
        ui.modifyStyle.display = "inline-block";
    }
}
class SideLayoutUI extends VerticalLayoutUI {
    constructor(banSrc, pickSrc) {
        super();
        this.modifyStyle.display = "inline-block";
        this.banSrc = banSrc;
        this.banLayout = new HorizontalLayoutUI();
        this.banLayout.margin = "5px 5px 20px 5px";
        this.banLayout.modifyStyle.display = "inline-block";
        this.modifyElement.appendChild(this.banLayout.modifyElement);
        this.bans = [
            this.getBanImage(), this.getBanImage(), this.getBanImage(), this.getBanImage(), this.getBanImage()
        ];
        for (let img of this.bans)
            this.banLayout.add(img);
        this.pickSrc = pickSrc;
        this.picks = [
            this.getSideImage(), this.getSideImage(), this.getSideImage(), this.getSideImage(), this.getSideImage()
        ];
        for (let img of this.picks)
            this.add(img);
    }
    evaluate(func) {
        for (let ui of this.picks) {
            func(ui);
        }
        for (let ui of championUIs) {
            func(ui);
        }
    }
    evaluatePicks() {
        this.evaluate(ui => ui.evaluatePick(this.picks, this.enemySide.picks));
    }
    evaluateBans() {
        this.evaluate(ui => ui.evaluateBan(this.bans, this.enemySide.bans));
    }
    getBanImage() {
        const ui = getChampionUI(this.banSrc, 50, 50);
        ui.imageButton.modifyStyle.opacity = defaultValue.opacity + "%";
        ui.text.modifyStyle.position = "absolute";
        ui.synergyText.modifyStyle.top = "25%";
        ui.counterText.modifyStyle.top = "25%";
        SideLayoutUI.pickableUI(ui);
        ui.imageButton.modifyEvents.addOnClick(() => evaluateBans(this, this.enemySide));
        return ui;
    }
    getSideImage() {
        const ui = getChampionUI(this.pickSrc, 75, 75);
        ui.imageButton.modifyStyle.opacity = defaultValue.opacity + "%";
        ui.imageButton.modifyStyle.borderRadius = "50%";
        ui.text.modifyStyle.display = "inline-block";
        ui.text.modifyStyle.textAlign = "left";
        ui.text.modifyStyle.position = "relative";
        ui.text.modifyStyle.top = "-30px";
        ui.text.modifyStyle.left = "10px";
        ui.hoverImage.modifyStyle.width = "100%";
        ui.hoverImage.modifyStyle.transform = "rotate(0deg)";
        ui.hoverImage.modifyStyle.borderRadius = "37.5px 0px 0px 37.5px";
        SideLayoutUI.pickableUI(ui);
        ui.imageButton.modifyEvents.addOnClick(() => evaluatePicks(this, this.enemySide));
        return ui;
    }
    static pickableUI(ui) {
        ui.imageButton.modifyEvents.addOnClick(() => {
            pick.setEvent = null;
            pick.setChampionEvent = null;
            headerText.modifyElement.textContent = "Champion Select";
            pick.set(ui);
        });
    }
}
const championUIs = [];
let sort = null;
function evaluatePicks(friendlyTeam, enemyTeam) {
    friendlyTeam.evaluatePicks();
    enemyTeam.evaluateBans();
    for (let ui of championUIs)
        ui.evaluatePick(friendlyTeam.picks, enemyTeam.picks);
    if (sort !== null)
        sort();
}
function evaluateBans(friendlyTeam, enemyTeam) {
    friendlyTeam.evaluateBans();
    enemyTeam.evaluateBans();
    for (let ui of championUIs)
        ui.evaluateBan(friendlyTeam.bans, enemyTeam.bans);
    if (sort !== null)
        sort();
}
const sideWidth = 200;
const blueSide = new SideLayoutUI("BanBanner.png", "BlueBanner.png");
blueSide.modifyStyle.width = sideWidth + "px";
blueSide.modifyStyle.float = "left";
const redSide = new SideLayoutUI("BanBanner.png", "RedBanner.png");
redSide.modifyStyle.width = sideWidth + "px";
redSide.modifyStyle.float = "right";
redSide.modifyStyle.direction = "rtl";
for (let ui of redSide.picks) {
    ui.hoverImage.modifyStyle.transform = "rotate(180deg)";
    ui.text.modifyStyle.textAlign = "right";
    ui.text.modifyStyle.left = "-10px";
}
blueSide.enemySide = redSide;
redSide.enemySide = blueSide;
const pick = new (class Pick {
    constructor() {
        this.ui = null;
        this.setEvent = null;
        this.setChampionEvent = null;
    }
    set(ui) {
        if (this.ui !== null) {
            this.ui.text.modifyStyle.color = "white";
            if (this.ui.get() === null) {
                this.ui.imageButton.modifyStyle.opacity = "50%";
            }
        }
        if (this.ui === ui) {
            this.ui = null;
            return;
        }
        this.ui = ui;
        if (this.ui === null)
            return;
        this.ui.text.modifyStyle.color = "yellow";
        this.ui.imageButton.modifyStyle.opacity = "100%";
        if (this.setEvent !== null)
            this.setEvent(this.ui);
    }
    get() {
        return this.ui;
    }
    setChampion(ui) {
        if (this.ui === null)
            return;
        this.ui.set(ui.get());
        for (let champ of blueSide.picks) {
            champ.evaluatePick(blueSide.picks, redSide.picks);
        }
        for (let champ of redSide.picks) {
            champ.evaluatePick(redSide.picks, blueSide.picks);
        }
        if (sort !== null)
            sort();
        if (this.setChampionEvent !== null)
            this.setChampionEvent(ui);
    }
})();
class GridLayoutUI extends LayoutUI {
    constructor() {
        super();
    }
    add(ui) {
        super.add(ui);
        ui.modifyStyle.display = "inline-grid";
    }
}
class TextButtonUI extends TextUI {
    constructor(text) {
        super(text);
        this.color = "white";
        this.hoverColor = "black";
        this.modifyStyle.cursor = "pointer";
        this.modifyStyle.userSelect = "none";
        this.onLeaveEvent = TextButtonUI.setButtonEvents(this);
    }
    getColor() {
        return this.color;
    }
    getHoverColor() {
        return this.hoverColor;
    }
    setColor(color) {
        this.color = color;
        this.onLeaveEvent();
    }
    setHoverColor(color) {
        this.hoverColor = color;
    }
    static setButtonEvents(btn) {
        return ButtonUI.setEvents(btn, (style, color) => style.color = color);
    }
}
class InputFieldUI extends UIElement {
    constructor() {
        super(document.createElement('input'));
    }
}
const headerText = getTextUI("Champion Select", 4);
headerText.modifyStyle.textAlign = "center";
headerText.modifyStyle.fontSize = "32px";
headerText.modifyStyle.margin = "0px";
headerText.modifyStyle.cursor = "default";
(() => {
    UI.body.style.overflowY = "auto";
    UI.body.style.minWidth = "884px";
    UI.body.oncontextmenu = () => false;
    UI.setBackgroundColor("black");
    const bg = document.createElement('video');
    UI.body.appendChild(bg);
    bg.style.zIndex = "-100";
    bg.style.position = "fixed";
    bg.style.minWidth = "150%";
    bg.style.minHeight = "150%";
    bg.style.top = "-50%";
    bg.style.left = "-50%";
    bg.controls = false;
    bg.loop = true;
    bg.muted = true;
    bg.play();
    const bgSource = document.createElement('source');
    bg.appendChild(bgSource);
    bgSource.type = "video/webm";
    bgSource.src = getImagePath("Zaun.webm");
    const champSelectDiv = document.createElement('div');
    UI.body.appendChild(champSelectDiv);
    champSelectDiv.style.position = "relative";
    champSelectDiv.style.display = "inline-block";
    const searchInputField = new InputFieldUI();
    champSelectDiv.appendChild(searchInputField.modifyElement);
    searchInputField.modifyStyle.display = "inline-block";
    searchInputField.modifyStyle.opacity = "50%";
    const sortDropdown = document.createElement('select');
    champSelectDiv.appendChild(sortDropdown);
    sortDropdown.style.opacity = "50%";
    const nameSortOp = document.createElement('option');
    sortDropdown.appendChild(nameSortOp);
    nameSortOp.textContent = "Name";
    const synergySortOp = document.createElement('option');
    sortDropdown.appendChild(synergySortOp);
    synergySortOp.textContent = "Synergy";
    const counterSortOp = document.createElement('option');
    sortDropdown.appendChild(counterSortOp);
    counterSortOp.textContent = "Counter";
    const numbersCheckDiv = document.createElement('div');
    champSelectDiv.appendChild(numbersCheckDiv);
    numbersCheckDiv.style.position = "relative";
    numbersCheckDiv.style.display = "inline-block";
    numbersCheckDiv.style.float = "right";
    numbersCheckDiv.style.height = "0px";
    numbersCheckDiv.style.top = "-15px";
    const numbersCheckInputField = new InputFieldUI();
    numbersCheckDiv.appendChild(numbersCheckInputField.modifyElement);
    numbersCheckInputField.modifyStyle.display = "inline-block";
    numbersCheckInputField.modifyElement.type = "checkbox";
    const numbersCheckText = getTextUI();
    numbersCheckDiv.appendChild(numbersCheckText.modifyElement);
    numbersCheckText.modifyStyle.cursor = "default";
    numbersCheckText.modifyStyle.display = "inline-block";
    numbersCheckText.modifyElement.textContent = "Info";
    const grid = new GridLayoutUI();
    champSelectDiv.appendChild(grid.modifyElement);
    grid.modifyStyle.position = "relative";
    const margin = 5;
    grid.margin = 5 + "px";
    const gridWidth = (iconSize + (margin * 2)) + 17;
    grid.modifyStyle.width = gridWidth + "px";
    grid.modifyStyle.overflowY = "scroll";
    grid.modifyStyle.height = "590px";
    UI.addOnResize(() => {
        const width = UI.body.clientWidth;
        const gw = gridWidth * (width / 200);
        grid.modifyStyle.width = gw + "px";
        champSelectDiv.style.left = UI.getPercentage((width / 2) + (gw / 2) + sideWidth, width) + "%";
    });
    const championNames = [
        "Aatrox",
        "Ahri",
        "Akali",
        "Alistar",
        "Amumu",
        "Anivia",
        "Annie",
        "Aphelios",
        "Ashe",
        "Aurelion Sol",
        "Azir",
        "Bard",
        "Blitzcrank",
        "Brand",
        "Braum",
        "Caitlyn",
        "Camille",
        "Cassiopeia",
        "Cho'Gath",
        "Corki",
        "Darius",
        "Diana",
        "Dr. Mundo",
        "Draven",
        "Ekko",
        "Elise",
        "Evelynn",
        "Ezreal",
        "Fiddlesticks",
        "Fiora",
        "Fizz",
        "Galio",
        "Gangplank",
        "Garen",
        "Gnar",
        "Gragas",
        "Graves",
        "Hecarim",
        "Heimerdinger",
        "Illaoi",
        "Irelia",
        "Ivern",
        "Janna",
        "Jarvan IV",
        "Jax",
        "Jayce",
        "Jhin",
        "Jinx",
        "Kai'Sa",
        "Kalista",
        "Karma",
        "Karthus",
        "Kassadin",
        "Katarina",
        "Kayle",
        "Kayn",
        "Kennen",
        "Kha'Zix",
        "Kindred",
        "Kled",
        "Kog'Maw",
        "LeBlanc",
        "Lee Sin",
        "Leona",
        "Lissandra",
        "Lucian",
        "Lulu",
        "Lux",
        "Malphite",
        "Malzahar",
        "Maokai",
        "Master Yi",
        "Miss Fortune",
        "Mordekaiser",
        "Morgana",
        "Nami",
        "Nasus",
        "Nautilus",
        "Neeko",
        "Nidalee",
        "Nocturne",
        "Nunu",
        "Olaf",
        "Orianna",
        "Ornn",
        "Pantheon",
        "Poppy",
        "Pyke",
        "Qiyana",
        "Quinn",
        "Rakan",
        "Rammus",
        "Rek'Sai",
        "Renekton",
        "Rengar",
        "Riven",
        "Rumble",
        "Ryze",
        "Sejuani",
        "Senna",
        "Sett",
        "Shaco",
        "Shen",
        "Shyvana",
        "Singed",
        "Sion",
        "Sivir",
        "Skarner",
        "Sona",
        "Soraka",
        "Swain",
        "Sylas",
        "Syndra",
        "Tahm Kench",
        "Taliyah",
        "Talon",
        "Taric",
        "Teemo",
        "Thresh",
        "Tristana",
        "Trundle",
        "Tryndamere",
        "Twisted Fate",
        "Twitch",
        "Udyr",
        "Urgot",
        "Varus",
        "Vayne",
        "Veigar",
        "Vel'Koz",
        "Vi",
        "Viktor",
        "Vladimir",
        "Volibear",
        "Warwick",
        "Wukong",
        "Xayah",
        "Xerath",
        "Xin Zhao",
        "Yasuo",
        "Yorick",
        "Yuumi",
        "Zac",
        "Zed",
        "Ziggs",
        "Zilean",
        "Zoe",
        "Zyra"
    ];
    for (let name of championNames) {
        const src = name + "Icon.png";
        const ui = getChampionUI(src, 75, 75);
        championUIs.push(ui);
        const champion = new Champion(name, src);
        ui.set(champion);
        ui.imageButton.modifyEvents.addOnClick(() => pick.setChampion(ui));
        grid.add(ui);
    }
    searchInputField.modifyEvents.addOnInput(() => {
        const name = searchInputField.modifyElement.value.toLowerCase();
        for (let ui of championUIs) {
            if (ui.get().name.toLowerCase().startsWith(name))
                ui.modifyStyle.display = "inline-grid";
            else
                ui.modifyStyle.display = "none";
        }
    });
    sortDropdown.addEventListener('change', e => {
        switch (sortDropdown.selectedIndex) {
            case 0:
                sort = () => {
                    sort = null;
                    championUIs.sort((a, b) => {
                        const nameA = a.get().name.toLowerCase(), nameB = b.get().name.toLowerCase();
                        if (nameA > nameB)
                            return 1;
                        else if (nameA < nameB)
                            return -1;
                        else
                            return 0;
                    });
                };
                break;
            case 1:
                sort = () => {
                    championUIs.sort((a, b) => {
                        const synergyA = a.getSynergyScore(), synergyB = b.getSynergyScore();
                        if (synergyA > synergyB)
                            return -1;
                        else if (synergyA < synergyB)
                            return 1;
                        else
                            return 0;
                    });
                };
                break;
            default:
                sort = () => {
                    championUIs.sort((a, b) => {
                        const counterA = a.getCounterScore(), counterB = b.getCounterScore();
                        if (counterA > counterB)
                            return -1;
                        else if (counterA < counterB)
                            return 1;
                        else
                            return 0;
                    });
                };
                break;
        }
        const sortChampUIArray = sort;
        sort = () => {
            sortChampUIArray();
            clearChildren(grid.modifyElement);
            for (let champ of championUIs)
                grid.modifyElement.appendChild(champ.modifyElement);
        };
        sort();
    });
    numbersCheckInputField.modifyElement.checked = true;
    numbersCheckInputField.modifyEvents.addOnChange(() => {
        function setUIs(vis) {
            function setUI(ui) {
                ui.highlightedText.modifyStyle.visibility = vis;
                ui.synergyText.modifyStyle.visibility = vis;
                ui.counterText.modifyStyle.visibility = vis;
            }
            for (let ui of championUIs)
                setUI(ui);
            for (let ui of blueSide.picks)
                setUI(ui);
            for (let ui of blueSide.bans)
                setUI(ui);
            for (let ui of redSide.picks)
                setUI(ui);
            for (let ui of redSide.bans)
                setUI(ui);
        }
        if (numbersCheckInputField.modifyElement.checked) {
            setUIs("visible");
        }
        else {
            setUIs("hidden");
        }
    });
    (() => {
        function actionOnAllSideImages(action) {
            for (let ui of blueSide.picks) {
                action(blueSide, ui, blueSide.pickSrc);
            }
            for (let ui of redSide.picks) {
                action(blueSide, ui, redSide.pickSrc);
            }
            for (let ui of blueSide.bans) {
                action(blueSide, ui, blueSide.banSrc);
            }
            for (let ui of redSide.bans) {
                action(blueSide, ui, redSide.banSrc);
            }
        }
        function reset() {
            pick.setEvent = null;
            pick.setChampionEvent = null;
            pick.set(null);
            headerText.modifyElement.textContent = "Champion Select";
            for (let ui of championUIs) {
                ui.reset();
            }
            actionOnAllSideImages((side, ui, originalSrc) => {
                ui.set(null);
                ui.reset();
                ui.imageButton.modifyStyle.opacity = defaultValue.opacity + "%";
                ui.text.modifyElement.textContent = "";
            });
        }
        const resetBtn = getTextUI("Reset");
        resetBtn.modifyStyle.width = "100px";
        resetBtn.modifyEvents.addOnClick(() => reset());
        const phaseBtn = getTextUI("Phase");
        phaseBtn.modifyStyle.width = "100px";
        phaseBtn.modifyEvents.addOnClick(() => {
            reset();
            const srcData = {
                data: [],
                index: -1
            };
            function nextSrcEvent() {
                srcData.index++;
                if (srcData.index < srcData.data.length) {
                    const data = srcData.data[srcData.index];
                    pick.setChampionEvent = data.action;
                    headerText.modifyElement.textContent = data.title;
                    pick.set(data.ui);
                    evaluatePicks(data.friendlyTeam, data.enemyTeam);
                }
                else {
                    pick.setChampionEvent = () => {
                        pick.setChampionEvent = null;
                        pick.set(null);
                    };
                }
            }
            function addBanSrcEvent(title, ui, friendlyTeam, enemyTeam) {
                srcData.data.push({
                    action: selectedUI => {
                        selectedUI.ban();
                        nextSrcEvent();
                    },
                    title,
                    ui,
                    friendlyTeam,
                    enemyTeam
                });
            }
            function addPickSrcEvent(title, ui, friendlyTeam, enemyTeam) {
                srcData.data.push({
                    action: () => nextSrcEvent(),
                    title,
                    ui,
                    friendlyTeam,
                    enemyTeam
                });
            }
            addBanSrcEvent("Blue Ban", blueSide.bans[0], blueSide, redSide);
            addBanSrcEvent("Red Ban", redSide.bans[0], redSide, blueSide);
            addBanSrcEvent("Blue Ban", blueSide.bans[1], blueSide, redSide);
            addBanSrcEvent("Red Ban", redSide.bans[1], redSide, blueSide);
            addBanSrcEvent("Blue Ban", blueSide.bans[2], blueSide, redSide);
            addBanSrcEvent("Red Ban", redSide.bans[2], blueSide, redSide);
            addPickSrcEvent("Blue Pick", blueSide.picks[0], blueSide, redSide);
            addPickSrcEvent("Red Pick", redSide.picks[0], redSide, blueSide);
            addPickSrcEvent("Red Pick", redSide.picks[1], redSide, blueSide);
            addPickSrcEvent("Blue Pick", blueSide.picks[1], blueSide, redSide);
            addPickSrcEvent("Blue Pick", blueSide.picks[2], blueSide, redSide);
            addPickSrcEvent("Red Pick", redSide.picks[2], redSide, blueSide);
            addBanSrcEvent("Blue Ban", blueSide.bans[3], blueSide, redSide);
            addBanSrcEvent("Red Ban", redSide.bans[3], redSide, blueSide);
            addBanSrcEvent("Blue Ban", blueSide.bans[4], blueSide, redSide);
            addBanSrcEvent("Red Ban", redSide.bans[4], redSide, blueSide);
            addPickSrcEvent("Red Pick", redSide.picks[3], redSide, blueSide);
            addPickSrcEvent("Blue Pick", blueSide.picks[3], blueSide, redSide);
            addPickSrcEvent("Blue Pick", blueSide.picks[4], blueSide, redSide);
            addPickSrcEvent("Red Pick", redSide.picks[4], redSide, blueSide);
            nextSrcEvent();
        });
    })();
})();
(() => {
    const aatrox = Champion.get("Aatrox"), ahri = Champion.get("Ahri"), akali = Champion.get("Akali"), alistar = Champion.get("Alistar"), amumu = Champion.get("Amumu"), anivia = Champion.get("Anivia"), annie = Champion.get("Annie"), aphelios = Champion.get("Aphelios"), ashe = Champion.get("Ashe"), aurelionSol = Champion.get("Aurelion Sol"), azir = Champion.get("Azir"), bard = Champion.get("Bard"), blitzcrank = Champion.get("Blitzcrank"), brand = Champion.get("Brand"), braum = Champion.get("Braum"), caitlyn = Champion.get("Caitlyn"), camille = Champion.get("Camille"), cassiopeia = Champion.get("Cassiopeia"), choGath = Champion.get("Cho'Gath"), corki = Champion.get("Corki"), darius = Champion.get("Darius"), diana = Champion.get("Diana"), drMundo = Champion.get("Dr. Mundo"), draven = Champion.get("Draven"), ekko = Champion.get("Ekko"), elise = Champion.get("Elise"), evelynn = Champion.get("Evelynn"), ezreal = Champion.get("Ezreal"), fiddlesticks = Champion.get("Fiddlesticks"), fiora = Champion.get("Fiora"), fizz = Champion.get("Fizz"), galio = Champion.get("Galio"), gangplank = Champion.get("Gangplank"), garen = Champion.get("Garen"), gnar = Champion.get("Gnar"), gragas = Champion.get("Gragas"), graves = Champion.get("Graves"), hecarim = Champion.get("Hecarim"), heimerdinger = Champion.get("Heimerdinger"), illaoi = Champion.get("Illaoi"), irelia = Champion.get("Irelia"), ivern = Champion.get("Ivern"), janna = Champion.get("Janna"), jarvanIV = Champion.get("Jarvan IV"), jax = Champion.get("Jax"), jayce = Champion.get("Jayce"), jhin = Champion.get("Jhin"), jinx = Champion.get("Jinx"), kaiSa = Champion.get("Kai'Sa"), kalista = Champion.get("Kalista"), karma = Champion.get("Karma"), karthus = Champion.get("Karthus"), kassadin = Champion.get("Kassadin"), katarina = Champion.get("Katarina"), kayle = Champion.get("Kayle"), kayn = Champion.get("Kayn"), kennen = Champion.get("Kennen"), khaZix = Champion.get("Kha'Zix"), kindred = Champion.get("Kindred"), kled = Champion.get("Kled"), kogMaw = Champion.get("Kog'Maw"), leBlanc = Champion.get("LeBlanc"), leeSin = Champion.get("Lee Sin"), leona = Champion.get("Leona"), lissandra = Champion.get("Lissandra"), lucian = Champion.get("Lucian"), lulu = Champion.get("Lulu"), lux = Champion.get("Lux"), malphite = Champion.get("Malphite"), malzahar = Champion.get("Malzahar"), maokai = Champion.get("Maokai"), masterYi = Champion.get("Master Yi"), missFortune = Champion.get("Miss Fortune"), mordekaiser = Champion.get("Mordekaiser"), morgana = Champion.get("Morgana"), nami = Champion.get("Nami"), nasus = Champion.get("Nasus"), nautilus = Champion.get("Nautilus"), neeko = Champion.get("Neeko"), nidalee = Champion.get("Nidalee"), nocturne = Champion.get("Nocturne"), nunu = Champion.get("Nunu"), olaf = Champion.get("Olaf"), orianna = Champion.get("Orianna"), ornn = Champion.get("Ornn"), pantheon = Champion.get("Pantheon"), poppy = Champion.get("Poppy"), pyke = Champion.get("Pyke"), qiyana = Champion.get("Qiyana"), quinn = Champion.get("Quinn"), rakan = Champion.get("Rakan"), rammus = Champion.get("Rammus"), rekSai = Champion.get("Rek'Sai"), renekton = Champion.get("Renekton"), rengar = Champion.get("Rengar"), riven = Champion.get("Riven"), rumble = Champion.get("Rumble"), ryze = Champion.get("Ryze"), sejuani = Champion.get("Sejuani"), senna = Champion.get("Senna"), sett = Champion.get("Sett"), shaco = Champion.get("Shaco"), shen = Champion.get("Shen"), shyvana = Champion.get("Shyvana"), singed = Champion.get("Singed"), sion = Champion.get("Sion"), sivir = Champion.get("Sivir"), skarner = Champion.get("Skarner"), sona = Champion.get("Sona"), soraka = Champion.get("Soraka"), swain = Champion.get("Swain"), sylas = Champion.get("Sylas"), syndra = Champion.get("Syndra"), tahmKench = Champion.get("Tahm Kench"), taliyah = Champion.get("Taliyah"), talon = Champion.get("Talon"), taric = Champion.get("Taric"), teemo = Champion.get("Teemo"), thresh = Champion.get("Thresh"), tristana = Champion.get("Tristana"), trundle = Champion.get("Trundle"), tryndamere = Champion.get("Tryndamere"), twistedFate = Champion.get("Twisted Fate"), twitch = Champion.get("Twitch"), udyr = Champion.get("Udyr"), urgot = Champion.get("Urgot"), varus = Champion.get("Varus"), vayne = Champion.get("Vayne"), veigar = Champion.get("Veigar"), velKoz = Champion.get("Vel'Koz"), vi = Champion.get("Vi"), viktor = Champion.get("Viktor"), vladimir = Champion.get("Vladimir"), volibear = Champion.get("Volibear"), warwick = Champion.get("Warwick"), wukong = Champion.get("Wukong"), xayah = Champion.get("Xayah"), xerath = Champion.get("Xerath"), xinZhao = Champion.get("Xin Zhao"), yasuo = Champion.get("Yasuo"), yorick = Champion.get("Yorick"), yuumi = Champion.get("Yuumi"), zac = Champion.get("Zac"), zed = Champion.get("Zed"), ziggs = Champion.get("Ziggs"), zilean = Champion.get("Zilean"), zoe = Champion.get("Zoe"), zyra = Champion.get("Zyra");
    const toDoDescription = "TO DO: details!";
    aatrox.addGoodAgainst(gangplank, toDoDescription);
    aatrox.addGoodAgainst(darius, toDoDescription);
    aatrox.addGoodAgainst(galio, toDoDescription);
    aatrox.addGoodWith(gnar, toDoDescription);
    aatrox.addGoodWith(yasuo, toDoDescription);
    aatrox.addGoodWith(azir, toDoDescription);
    ahri.addGoodAgainst(choGath, toDoDescription);
    ahri.addGoodAgainst(azir, toDoDescription);
    ahri.addGoodAgainst(viktor, toDoDescription);
    ahri.addGoodWith(jax, toDoDescription);
    ahri.addGoodWith(riven, toDoDescription);
    ahri.addGoodWith(irelia, toDoDescription);
    akali.addGoodAgainst(nasus, toDoDescription);
    akali.addGoodAgainst(garen, toDoDescription);
    akali.addGoodAgainst(poppy, toDoDescription);
    akali.addGoodWith(diana, toDoDescription);
    akali.addGoodWith(leBlanc, toDoDescription);
    akali.addGoodWith(katarina, toDoDescription);
    amumu.addGoodAgainst(graves, toDoDescription);
    amumu.addGoodAgainst(shyvana, toDoDescription);
    amumu.addGoodAgainst(leeSin, toDoDescription);
    amumu.addGoodWith(katarina, toDoDescription);
    amumu.addGoodWith(fiddlesticks, toDoDescription);
    amumu.addGoodWith(morgana, toDoDescription);
    anivia.addGoodAgainst(kayle, toDoDescription);
    anivia.addGoodAgainst(azir, toDoDescription);
    anivia.addGoodAgainst(akali, toDoDescription);
    anivia.addGoodWith(jarvanIV, toDoDescription);
    anivia.addGoodWith(drMundo, toDoDescription);
    anivia.addGoodWith(vayne, toDoDescription);
    annie.addGoodAgainst(diana, toDoDescription);
    annie.addGoodAgainst(jayce, toDoDescription);
    annie.addGoodAgainst(viktor, toDoDescription);
    annie.addGoodWith(jinx, toDoDescription);
    annie.addGoodWith(amumu, toDoDescription);
    annie.addGoodWith(lucian, toDoDescription);
    ashe.addGoodAgainst(corki, toDoDescription);
    ashe.addGoodAgainst(lucian, toDoDescription);
    ashe.addGoodAgainst(sivir, toDoDescription);
    ashe.addGoodWith(leona, toDoDescription);
    ashe.addGoodWith(janna, toDoDescription);
    ashe.addGoodWith(thresh, toDoDescription);
    azir.addGoodAgainst(yasuo, toDoDescription);
    azir.addGoodAgainst(taliyah, toDoDescription);
    azir.addGoodAgainst(syndra, toDoDescription);
    azir.addGoodWith(aatrox, toDoDescription);
    azir.addGoodWith(yasuo, toDoDescription);
    azir.addGoodWith(alistar, toDoDescription);
    bard.addGoodAgainst(veigar, toDoDescription);
    bard.addGoodAgainst(nautilus, toDoDescription);
    bard.addGoodAgainst(braum, toDoDescription);
    bard.addGoodWith(sion, toDoDescription);
    bard.addGoodWith(heimerdinger, toDoDescription);
    bard.addGoodWith(jhin, toDoDescription);
    blitzcrank.addGoodAgainst(lux, toDoDescription);
    blitzcrank.addGoodAgainst(zyra, toDoDescription);
    blitzcrank.addGoodAgainst(nami, toDoDescription);
    blitzcrank.addGoodWith(jinx, toDoDescription);
    blitzcrank.addGoodWith(vayne, toDoDescription);
    blitzcrank.addGoodWith(ezreal, toDoDescription);
    brand.addGoodAgainst(velKoz, toDoDescription);
    brand.addGoodAgainst(rakan, toDoDescription);
    brand.addGoodAgainst(braum, toDoDescription);
    brand.addGoodWith(amumu, toDoDescription);
    brand.addGoodWith(sona, toDoDescription);
    brand.addGoodWith(maokai, toDoDescription);
    braum.addGoodAgainst(fiddlesticks, toDoDescription);
    braum.addGoodAgainst(karma, toDoDescription);
    braum.addGoodAgainst(lux, toDoDescription);
    braum.addGoodWith(lucian, toDoDescription);
    braum.addGoodWith(ezreal, toDoDescription);
    braum.addGoodWith(twitch, toDoDescription);
    caitlyn.addGoodAgainst(ezreal, toDoDescription);
    caitlyn.addGoodAgainst(ziggs, toDoDescription);
    caitlyn.addGoodAgainst(xayah, toDoDescription);
    caitlyn.addGoodWith(leona, toDoDescription);
    caitlyn.addGoodWith(thresh, toDoDescription);
    caitlyn.addGoodWith(nami, toDoDescription);
    camille.addGoodAgainst(cassiopeia, toDoDescription);
    camille.addGoodAgainst(garen, toDoDescription);
    camille.addGoodAgainst(drMundo, toDoDescription);
    camille.addGoodWith(bard, toDoDescription);
    camille.addGoodWith(thresh, toDoDescription);
    camille.addGoodWith(galio, toDoDescription);
    cassiopeia.addGoodAgainst(ryze, toDoDescription);
    cassiopeia.addGoodAgainst(azir, toDoDescription);
    cassiopeia.addGoodAgainst(zed, toDoDescription);
    cassiopeia.addGoodWith(teemo, toDoDescription);
    cassiopeia.addGoodWith(singed, toDoDescription);
    cassiopeia.addGoodWith(yorick, toDoDescription);
    choGath.addGoodAgainst(galio, toDoDescription);
    choGath.addGoodAgainst(pantheon, toDoDescription);
    choGath.addGoodAgainst(gragas, toDoDescription);
    choGath.addGoodWith(yasuo, toDoDescription);
    choGath.addGoodWith(lulu, toDoDescription);
    choGath.addGoodWith(aatrox, toDoDescription);
    corki.addGoodAgainst(diana, toDoDescription);
    corki.addGoodAgainst(ryze, toDoDescription);
    corki.addGoodAgainst(ziggs, toDoDescription);
    corki.addGoodWith(leona, toDoDescription);
    corki.addGoodWith(thresh, toDoDescription);
    corki.addGoodWith(blitzcrank, toDoDescription);
    darius.addGoodAgainst(nautilus, toDoDescription);
    darius.addGoodAgainst(galio, toDoDescription);
    darius.addGoodAgainst(choGath, toDoDescription);
    darius.addGoodWith(draven, toDoDescription);
    darius.addGoodWith(olaf, toDoDescription);
    darius.addGoodWith(fiora, toDoDescription);
    diana.addGoodAgainst(zed, toDoDescription);
    diana.addGoodAgainst(leBlanc, toDoDescription);
    diana.addGoodAgainst(lux, toDoDescription);
    diana.addGoodWith(akali, toDoDescription);
    diana.addGoodWith(yasuo, toDoDescription);
    diana.addGoodWith(kassadin, toDoDescription);
    drMundo.addGoodAgainst(darius, toDoDescription);
    drMundo.addGoodAgainst(teemo, toDoDescription);
    drMundo.addGoodAgainst(irelia, toDoDescription);
    drMundo.addGoodWith(anivia, toDoDescription);
    drMundo.addGoodWith(olaf, toDoDescription);
    drMundo.addGoodWith(jax, toDoDescription);
    draven.addGoodAgainst(corki, toDoDescription);
    draven.addGoodAgainst(sivir, toDoDescription);
    draven.addGoodAgainst(lucian, toDoDescription);
    draven.addGoodWith(thresh, toDoDescription);
    draven.addGoodWith(darius, toDoDescription);
    draven.addGoodWith(leona, toDoDescription);
    ekko.addGoodAgainst(azir, toDoDescription);
    ekko.addGoodAgainst(karma, toDoDescription);
    ekko.addGoodAgainst(zed, toDoDescription);
    ekko.addGoodWith(galio, toDoDescription);
    ekko.addGoodWith(bard, toDoDescription);
    ekko.addGoodWith(lulu, toDoDescription);
    elise.addGoodAgainst(choGath, toDoDescription);
    elise.addGoodAgainst(rekSai, toDoDescription);
    elise.addGoodAgainst(udyr, toDoDescription);
    elise.addGoodWith(rengar, toDoDescription);
    elise.addGoodWith(blitzcrank, toDoDescription);
    elise.addGoodWith(karma, toDoDescription);
    evelynn.addGoodAgainst(graves, toDoDescription);
    evelynn.addGoodAgainst(skarner, toDoDescription);
    evelynn.addGoodAgainst(nidalee, toDoDescription);
    evelynn.addGoodWith(choGath, toDoDescription);
    evelynn.addGoodWith(shen, toDoDescription);
    evelynn.addGoodWith(orianna, toDoDescription);
    ezreal.addGoodAgainst(varus, toDoDescription);
    ezreal.addGoodAgainst(lucian, toDoDescription);
    ezreal.addGoodAgainst(kalista, toDoDescription);
    ezreal.addGoodWith(sona, toDoDescription);
    ezreal.addGoodWith(taric, toDoDescription);
    ezreal.addGoodWith(leona, toDoDescription);
    fiddlesticks.addGoodAgainst(graves, toDoDescription);
    fiddlesticks.addGoodAgainst(amumu, toDoDescription);
    fiddlesticks.addGoodAgainst(rekSai, toDoDescription);
    fiddlesticks.addGoodWith(amumu, toDoDescription);
    fiddlesticks.addGoodWith(galio, toDoDescription);
    fiddlesticks.addGoodWith(kennen, toDoDescription);
    fiora.addGoodAgainst(galio, toDoDescription);
    fiora.addGoodAgainst(choGath, toDoDescription);
    fiora.addGoodAgainst(nautilus, toDoDescription);
    fiora.addGoodWith(darius, toDoDescription);
    fiora.addGoodWith(volibear, toDoDescription);
    fiora.addGoodWith(ahri, toDoDescription);
    fizz.addGoodAgainst(ryze, toDoDescription);
    fizz.addGoodAgainst(aurelionSol, toDoDescription);
    fizz.addGoodAgainst(syndra, toDoDescription);
    fizz.addGoodWith(talon, toDoDescription);
    fizz.addGoodWith(amumu, toDoDescription);
    fizz.addGoodWith(nami, toDoDescription);
    galio.addGoodAgainst(drMundo, toDoDescription);
    galio.addGoodAgainst(poppy, toDoDescription);
    galio.addGoodAgainst(mordekaiser, toDoDescription);
    galio.addGoodWith(katarina, toDoDescription);
    galio.addGoodWith(wukong, toDoDescription);
    galio.addGoodWith(nunu, toDoDescription);
    gangplank.addGoodAgainst(lissandra, toDoDescription);
    gangplank.addGoodAgainst(galio, toDoDescription);
    gangplank.addGoodAgainst(shen, toDoDescription);
    gangplank.addGoodWith(amumu, toDoDescription);
    gangplank.addGoodWith(nunu, toDoDescription);
    gangplank.addGoodWith(twistedFate, toDoDescription);
    garen.addGoodAgainst(malphite, toDoDescription);
    garen.addGoodAgainst(shen, toDoDescription);
    garen.addGoodAgainst(gangplank, toDoDescription);
    garen.addGoodWith(lux, toDoDescription);
    garen.addGoodWith(darius, toDoDescription);
    garen.addGoodWith(aatrox, toDoDescription);
    gnar.addGoodAgainst(garen, toDoDescription);
    gnar.addGoodAgainst(yorick, toDoDescription);
    gnar.addGoodAgainst(xinZhao, toDoDescription);
    gnar.addGoodWith(aatrox, toDoDescription);
    gnar.addGoodWith(jarvanIV, toDoDescription);
    gnar.addGoodWith(braum, toDoDescription);
    gragas.addGoodAgainst(diana, toDoDescription);
    gragas.addGoodAgainst(leeSin, toDoDescription);
    gragas.addGoodAgainst(udyr, toDoDescription);
    gragas.addGoodWith(ashe, toDoDescription);
    gragas.addGoodWith(malphite, toDoDescription);
    gragas.addGoodWith(yasuo, toDoDescription);
    graves.addGoodAgainst(shyvana, toDoDescription);
    graves.addGoodAgainst(olaf, toDoDescription);
    graves.addGoodAgainst(xinZhao, toDoDescription);
    graves.addGoodWith(taric, toDoDescription);
    graves.addGoodWith(leona, toDoDescription);
    graves.addGoodWith(thresh, toDoDescription);
    hecarim.addGoodAgainst(wukong, toDoDescription);
    hecarim.addGoodAgainst(graves, toDoDescription);
    hecarim.addGoodAgainst(rekSai, toDoDescription);
    hecarim.addGoodWith(orianna, toDoDescription);
    hecarim.addGoodWith(zilean, toDoDescription);
    hecarim.addGoodWith(malphite, toDoDescription);
    heimerdinger.addGoodAgainst(illaoi, toDoDescription);
    heimerdinger.addGoodAgainst(camille, toDoDescription);
    heimerdinger.addGoodAgainst(shen, toDoDescription);
    heimerdinger.addGoodWith(blitzcrank, toDoDescription);
    heimerdinger.addGoodWith(thresh, toDoDescription);
    heimerdinger.addGoodWith(vi, toDoDescription);
    illaoi.addGoodAgainst(galio, toDoDescription);
    illaoi.addGoodAgainst(shen, toDoDescription);
    illaoi.addGoodAgainst(jayce, toDoDescription);
    illaoi.addGoodWith(galio, toDoDescription);
    illaoi.addGoodWith(camille, toDoDescription);
    illaoi.addGoodWith(lulu, toDoDescription);
    irelia.addGoodAgainst(nasus, toDoDescription);
    irelia.addGoodAgainst(poppy, toDoDescription);
    irelia.addGoodAgainst(rengar, toDoDescription);
    irelia.addGoodWith(riven, toDoDescription);
    irelia.addGoodWith(ahri, toDoDescription);
    irelia.addGoodWith(malphite, toDoDescription);
    ivern.addGoodAgainst(udyr, toDoDescription);
    ivern.addGoodAgainst(fiddlesticks, toDoDescription);
    ivern.addGoodAgainst(shyvana, toDoDescription);
    ivern.addGoodWith(yasuo, toDoDescription);
    ivern.addGoodWith(xayah, toDoDescription);
    ivern.addGoodWith(riven, toDoDescription);
    janna.addGoodAgainst(annie, toDoDescription);
    janna.addGoodAgainst(nautilus, toDoDescription);
    janna.addGoodAgainst(taric, toDoDescription);
    janna.addGoodWith(yasuo, toDoDescription);
    janna.addGoodWith(draven, toDoDescription);
    janna.addGoodWith(ashe, toDoDescription);
    jarvanIV.addGoodAgainst(rekSai, toDoDescription);
    jarvanIV.addGoodAgainst(olaf, toDoDescription);
    jarvanIV.addGoodAgainst(xinZhao, toDoDescription);
    jarvanIV.addGoodWith(orianna, toDoDescription);
    jarvanIV.addGoodWith(gnar, toDoDescription);
    jarvanIV.addGoodWith(katarina, toDoDescription);
    jax.addGoodAgainst(tahmKench, toDoDescription);
    jax.addGoodAgainst(nautilus, toDoDescription);
    jax.addGoodAgainst(ekko, toDoDescription);
    jax.addGoodWith(ahri, toDoDescription);
    jax.addGoodWith(pantheon, toDoDescription);
    jax.addGoodWith(teemo, toDoDescription);
    jayce.addGoodAgainst(drMundo, toDoDescription);
    jayce.addGoodAgainst(urgot, toDoDescription);
    jayce.addGoodAgainst(cassiopeia, toDoDescription);
    jayce.addGoodWith(nidalee, toDoDescription);
    jayce.addGoodWith(skarner, toDoDescription);
    jayce.addGoodWith(leona, toDoDescription);
    jhin.addGoodAgainst(ezreal, toDoDescription);
    jhin.addGoodAgainst(corki, toDoDescription);
    jhin.addGoodAgainst(lucian, toDoDescription);
    jhin.addGoodWith(leona, toDoDescription);
    jhin.addGoodWith(bard, toDoDescription);
    jhin.addGoodWith(thresh, toDoDescription);
    jinx.addGoodAgainst(sivir, toDoDescription);
    jinx.addGoodAgainst(kalista, toDoDescription);
    jinx.addGoodAgainst(ashe, toDoDescription);
    jinx.addGoodWith(leona, toDoDescription);
    jinx.addGoodWith(blitzcrank, toDoDescription);
    jinx.addGoodWith(thresh, toDoDescription);
    kaiSa.addGoodAgainst(corki, toDoDescription);
    kaiSa.addGoodAgainst(kalista, toDoDescription);
    kaiSa.addGoodAgainst(ashe, toDoDescription);
    kaiSa.addGoodWith(leona, toDoDescription);
    kaiSa.addGoodWith(thresh, toDoDescription);
    kaiSa.addGoodWith(zac, toDoDescription);
    kalista.addGoodAgainst(corki, toDoDescription);
    kalista.addGoodAgainst(lucian, toDoDescription);
    kalista.addGoodAgainst(varus, toDoDescription);
    kalista.addGoodWith(tahmKench, toDoDescription);
    kalista.addGoodWith(alistar, toDoDescription);
    kalista.addGoodWith(thresh, toDoDescription);
    karma.addGoodAgainst(veigar, toDoDescription);
    karma.addGoodAgainst(zilean, toDoDescription);
    karma.addGoodAgainst(morgana, toDoDescription);
    karma.addGoodWith(jinx, toDoDescription);
    karma.addGoodWith(ezreal, toDoDescription);
    karma.addGoodWith(vayne, toDoDescription);
    karthus.addGoodAgainst(yasuo, toDoDescription);
    karthus.addGoodAgainst(twistedFate, toDoDescription);
    karthus.addGoodAgainst(kassadin, toDoDescription);
    karthus.addGoodWith(kayle, toDoDescription);
    karthus.addGoodWith(amumu, toDoDescription);
    karthus.addGoodWith(yorick, toDoDescription);
    kassadin.addGoodAgainst(azir, toDoDescription);
    kassadin.addGoodAgainst(karma, toDoDescription);
    kassadin.addGoodAgainst(leBlanc, toDoDescription);
    kassadin.addGoodWith(diana, toDoDescription);
    kassadin.addGoodWith(ahri, toDoDescription);
    kassadin.addGoodWith(leeSin, toDoDescription);
    katarina.addGoodAgainst(ryze, toDoDescription);
    katarina.addGoodAgainst(syndra, toDoDescription);
    katarina.addGoodAgainst(viktor, toDoDescription);
    katarina.addGoodWith(amumu, toDoDescription);
    katarina.addGoodWith(galio, toDoDescription);
    katarina.addGoodWith(morgana, toDoDescription);
    kayle.addGoodAgainst(garen, toDoDescription);
    kayle.addGoodAgainst(poppy, toDoDescription);
    kayle.addGoodAgainst(galio, toDoDescription);
    kayle.addGoodWith(ezreal, toDoDescription);
    kayle.addGoodWith(katarina, toDoDescription);
    kayle.addGoodWith(karthus, toDoDescription);
    kennen.addGoodAgainst(shen, toDoDescription);
    kennen.addGoodAgainst(quinn, toDoDescription);
    kennen.addGoodAgainst(mordekaiser, toDoDescription);
    kennen.addGoodWith(amumu, toDoDescription);
    kennen.addGoodWith(vladimir, toDoDescription);
    kennen.addGoodWith(fiddlesticks, toDoDescription);
    khaZix.addGoodAgainst(diana, toDoDescription);
    khaZix.addGoodAgainst(graves, toDoDescription);
    khaZix.addGoodAgainst(olaf, toDoDescription);
    khaZix.addGoodWith(rengar, toDoDescription);
    khaZix.addGoodWith(xinZhao, toDoDescription);
    khaZix.addGoodWith(nasus, toDoDescription);
    kindred.addGoodAgainst(rekSai, toDoDescription);
    kindred.addGoodAgainst(xinZhao, toDoDescription);
    kindred.addGoodAgainst(fiddlesticks, toDoDescription);
    kindred.addGoodWith(galio, toDoDescription);
    kindred.addGoodWith(sion, toDoDescription);
    kindred.addGoodWith(zed, toDoDescription);
    kled.addGoodAgainst(rengar, toDoDescription);
    kled.addGoodAgainst(choGath, toDoDescription);
    kled.addGoodAgainst(quinn, toDoDescription);
    kled.addGoodWith(galio, toDoDescription);
    kled.addGoodWith(camille, toDoDescription);
    kled.addGoodWith(masterYi, toDoDescription);
    kogMaw.addGoodAgainst(corki, toDoDescription);
    kogMaw.addGoodAgainst(jhin, toDoDescription);
    kogMaw.addGoodAgainst(lucian, toDoDescription);
    kogMaw.addGoodWith(nunu, toDoDescription);
    kogMaw.addGoodWith(lulu, toDoDescription);
    kogMaw.addGoodWith(nami, toDoDescription);
    leBlanc.addGoodAgainst(ryze, toDoDescription);
    leBlanc.addGoodAgainst(karma, toDoDescription);
    leBlanc.addGoodAgainst(lux, toDoDescription);
    leBlanc.addGoodWith(akali, toDoDescription);
    leBlanc.addGoodWith(veigar, toDoDescription);
    leBlanc.addGoodWith(alistar, toDoDescription);
    leeSin.addGoodAgainst(choGath, toDoDescription);
    leeSin.addGoodAgainst(aatrox, toDoDescription);
    leeSin.addGoodAgainst(rengar, toDoDescription);
    leeSin.addGoodWith(yasuo, toDoDescription);
    leeSin.addGoodWith(teemo, toDoDescription);
    leeSin.addGoodWith(aatrox, toDoDescription);
    leona.addGoodAgainst(lux, toDoDescription);
    leona.addGoodAgainst(lulu, toDoDescription);
    leona.addGoodAgainst(nami, toDoDescription);
    leona.addGoodWith(jhin, toDoDescription);
    leona.addGoodWith(draven, toDoDescription);
    leona.addGoodWith(xayah, toDoDescription);
    lissandra.addGoodAgainst(veigar, toDoDescription);
    lissandra.addGoodAgainst(leBlanc, toDoDescription);
    lissandra.addGoodAgainst(cassiopeia, toDoDescription);
    lissandra.addGoodWith(sejuani, toDoDescription);
    lissandra.addGoodWith(trundle, toDoDescription);
    lissandra.addGoodWith(amumu, toDoDescription);
    lucian.addGoodAgainst(ezreal, toDoDescription);
    lucian.addGoodAgainst(vayne, toDoDescription);
    lucian.addGoodAgainst(corki, toDoDescription);
    lucian.addGoodWith(braum, toDoDescription);
    lucian.addGoodWith(thresh, toDoDescription);
    lucian.addGoodWith(leona, toDoDescription);
    lulu.addGoodAgainst(lux, toDoDescription);
    lulu.addGoodAgainst(rakan, toDoDescription);
    lulu.addGoodAgainst(annie, toDoDescription);
    lulu.addGoodWith(vayne, toDoDescription);
    lulu.addGoodWith(caitlyn, toDoDescription);
    lulu.addGoodWith(ezreal, toDoDescription);
    lux.addGoodAgainst(ryze, toDoDescription);
    lux.addGoodAgainst(galio, toDoDescription);
    lux.addGoodAgainst(akali, toDoDescription);
    lux.addGoodWith(ezreal, toDoDescription);
    lux.addGoodWith(garen, toDoDescription);
    lux.addGoodWith(jinx, toDoDescription);
    malphite.addGoodAgainst(nautilus, toDoDescription);
    malphite.addGoodAgainst(poppy, toDoDescription);
    malphite.addGoodAgainst(irelia, toDoDescription);
    malphite.addGoodWith(yasuo, toDoDescription);
    malphite.addGoodWith(orianna, toDoDescription);
    malphite.addGoodWith(katarina, toDoDescription);
    malzahar.addGoodAgainst(akali, toDoDescription);
    malzahar.addGoodAgainst(karma, toDoDescription);
    malzahar.addGoodAgainst(vladimir, toDoDescription);
    malzahar.addGoodWith(warwick, toDoDescription);
    malzahar.addGoodWith(amumu, toDoDescription);
    malzahar.addGoodWith(jarvanIV, toDoDescription);
    maokai.addGoodAgainst(shen, toDoDescription);
    maokai.addGoodAgainst(gragas, toDoDescription);
    maokai.addGoodAgainst(kled, toDoDescription);
    maokai.addGoodWith(ryze, toDoDescription);
    maokai.addGoodWith(vladimir, toDoDescription);
    maokai.addGoodWith(swain, toDoDescription);
    masterYi.addGoodAgainst(trundle, toDoDescription);
    masterYi.addGoodAgainst(diana, toDoDescription);
    masterYi.addGoodAgainst(wukong, toDoDescription);
    masterYi.addGoodWith(ashe, toDoDescription);
    masterYi.addGoodWith(aatrox, toDoDescription);
    masterYi.addGoodWith(ahri, toDoDescription);
    missFortune.addGoodAgainst(corki, toDoDescription);
    missFortune.addGoodAgainst(ezreal, toDoDescription);
    missFortune.addGoodAgainst(xayah, toDoDescription);
    missFortune.addGoodWith(sona, toDoDescription);
    missFortune.addGoodWith(leona, toDoDescription);
    missFortune.addGoodWith(blitzcrank, toDoDescription);
    mordekaiser.addGoodAgainst(shen, toDoDescription);
    mordekaiser.addGoodAgainst(malphite, toDoDescription);
    mordekaiser.addGoodAgainst(irelia, toDoDescription);
    mordekaiser.addGoodWith(yorick, toDoDescription);
    mordekaiser.addGoodWith(malphite, toDoDescription);
    mordekaiser.addGoodWith(wukong, toDoDescription);
    morgana.addGoodAgainst(veigar, toDoDescription);
    morgana.addGoodAgainst(lux, toDoDescription);
    morgana.addGoodAgainst(rakan, toDoDescription);
    morgana.addGoodWith(jinx, toDoDescription);
    morgana.addGoodWith(caitlyn, toDoDescription);
    morgana.addGoodWith(varus, toDoDescription);
    nami.addGoodAgainst(trundle, toDoDescription);
    nami.addGoodAgainst(lux, toDoDescription);
    nami.addGoodAgainst(rakan, toDoDescription);
    nami.addGoodWith(vayne, toDoDescription);
    nami.addGoodWith(jinx, toDoDescription);
    nami.addGoodWith(caitlyn, toDoDescription);
    nasus.addGoodAgainst(galio, toDoDescription);
    nasus.addGoodAgainst(malphite, toDoDescription);
    nasus.addGoodAgainst(poppy, toDoDescription);
    nasus.addGoodWith(renekton, toDoDescription);
    nasus.addGoodWith(zed, toDoDescription);
    nasus.addGoodWith(khaZix, toDoDescription);
    nautilus.addGoodAgainst(karma, toDoDescription);
    nautilus.addGoodAgainst(brand, toDoDescription);
    nautilus.addGoodAgainst(leona, toDoDescription);
    nautilus.addGoodWith(yasuo, toDoDescription);
    nautilus.addGoodWith(draven, toDoDescription);
    nautilus.addGoodWith(ezreal, toDoDescription);
    neeko.addGoodAgainst(leeSin, toDoDescription);
    neeko.addGoodAgainst(rengar, toDoDescription);
    neeko.addGoodAgainst(rekSai, toDoDescription);
    neeko.addGoodWith(morgana, toDoDescription);
    neeko.addGoodWith(katarina, toDoDescription);
    neeko.addGoodWith(fiddlesticks, toDoDescription);
    nidalee.addGoodAgainst(graves, toDoDescription);
    nidalee.addGoodAgainst(rengar, toDoDescription);
    nidalee.addGoodAgainst(rekSai, toDoDescription);
    nidalee.addGoodWith(caitlyn, toDoDescription);
    nidalee.addGoodWith(varus, toDoDescription);
    nidalee.addGoodWith(jayce, toDoDescription);
    nocturne.addGoodAgainst(rengar, toDoDescription);
    nocturne.addGoodAgainst(pantheon, toDoDescription);
    nocturne.addGoodAgainst(sejuani, toDoDescription);
    nocturne.addGoodWith(twistedFate, toDoDescription);
    nocturne.addGoodWith(shen, toDoDescription);
    nocturne.addGoodWith(rengar, toDoDescription);
    nunu.addGoodAgainst(graves, toDoDescription);
    nunu.addGoodAgainst(skarner, toDoDescription);
    nunu.addGoodAgainst(shyvana, toDoDescription);
    nunu.addGoodWith(vayne, toDoDescription);
    nunu.addGoodWith(kogMaw, toDoDescription);
    nunu.addGoodWith(caitlyn, toDoDescription);
    olaf.addGoodAgainst(fiddlesticks, toDoDescription);
    olaf.addGoodAgainst(hecarim, toDoDescription);
    olaf.addGoodAgainst(shaco, toDoDescription);
    olaf.addGoodWith(darius, toDoDescription);
    olaf.addGoodWith(blitzcrank, toDoDescription);
    olaf.addGoodWith(aatrox, toDoDescription);
    orianna.addGoodAgainst(ryze, toDoDescription);
    orianna.addGoodAgainst(gangplank, toDoDescription);
    orianna.addGoodAgainst(diana, toDoDescription);
    orianna.addGoodWith(malphite, toDoDescription);
    orianna.addGoodWith(yasuo, toDoDescription);
    orianna.addGoodWith(jarvanIV, toDoDescription);
    ornn.addGoodAgainst(galio, toDoDescription);
    ornn.addGoodAgainst(malphite, toDoDescription);
    ornn.addGoodAgainst(shen, toDoDescription);
    ornn.addGoodWith(janna, toDoDescription);
    ornn.addGoodWith(lulu, toDoDescription);
    ornn.addGoodWith(thresh, toDoDescription);
    pantheon.addGoodAgainst(drMundo, toDoDescription);
    pantheon.addGoodAgainst(nasus, toDoDescription);
    pantheon.addGoodAgainst(nautilus, toDoDescription);
    pantheon.addGoodWith(taric, toDoDescription);
    pantheon.addGoodWith(jax, toDoDescription);
    pantheon.addGoodWith(sion, toDoDescription);
    poppy.addGoodAgainst(illaoi, toDoDescription);
    poppy.addGoodAgainst(olaf, toDoDescription);
    poppy.addGoodAgainst(kled, toDoDescription);
    poppy.addGoodWith(sion, toDoDescription);
    poppy.addGoodWith(vayne, toDoDescription);
    poppy.addGoodWith(choGath, toDoDescription);
    pyke.addGoodAgainst(velKoz, toDoDescription);
    pyke.addGoodAgainst(zoe, toDoDescription);
    pyke.addGoodAgainst(annie, toDoDescription);
    pyke.addGoodWith(missFortune, toDoDescription);
    pyke.addGoodWith(jhin, toDoDescription);
    pyke.addGoodWith(kaiSa, toDoDescription);
    qiyana.addGoodAgainst(xerath, toDoDescription);
    qiyana.addGoodAgainst(viktor, toDoDescription);
    qiyana.addGoodAgainst(neeko, toDoDescription);
    quinn.addGoodAgainst(tryndamere, toDoDescription);
    quinn.addGoodAgainst(jax, toDoDescription);
    quinn.addGoodAgainst(renekton, toDoDescription);
    quinn.addGoodWith(leona, toDoDescription);
    quinn.addGoodWith(thresh, toDoDescription);
    quinn.addGoodWith(nami, toDoDescription);
    rakan.addGoodAgainst(lux, toDoDescription);
    rakan.addGoodAgainst(karma, toDoDescription);
    rakan.addGoodAgainst(tahmKench, toDoDescription);
    rakan.addGoodWith(xayah, toDoDescription);
    rakan.addGoodWith(missFortune, toDoDescription);
    rakan.addGoodWith(jhin, toDoDescription);
    rengar.addGoodAgainst(shyvana, toDoDescription);
    rengar.addGoodAgainst(vi, toDoDescription);
    rengar.addGoodAgainst(evelynn, toDoDescription);
    rengar.addGoodWith(khaZix, toDoDescription);
    rengar.addGoodWith(orianna, toDoDescription);
    rengar.addGoodWith(elise, toDoDescription);
    riven.addGoodAgainst(volibear, toDoDescription);
    riven.addGoodAgainst(tahmKench, toDoDescription);
    riven.addGoodAgainst(galio, toDoDescription);
    riven.addGoodWith(irelia, toDoDescription);
    riven.addGoodWith(yasuo, toDoDescription);
    riven.addGoodWith(ahri, toDoDescription);
    rumble.addGoodAgainst(drMundo, toDoDescription);
    rumble.addGoodAgainst(nasus, toDoDescription);
    rumble.addGoodAgainst(malphite, toDoDescription);
    rumble.addGoodWith(jarvanIV, toDoDescription);
    rumble.addGoodWith(amumu, toDoDescription);
    rumble.addGoodWith(sona, toDoDescription);
    ryze.addGoodAgainst(ekko, toDoDescription);
    ryze.addGoodAgainst(corki, toDoDescription);
    ryze.addGoodAgainst(kassadin, toDoDescription);
    ryze.addGoodWith(maokai, toDoDescription);
    ryze.addGoodWith(jax, toDoDescription);
    ryze.addGoodWith(ahri, toDoDescription);
    sejuani.addGoodAgainst(rammus, toDoDescription);
    sejuani.addGoodAgainst(shyvana, toDoDescription);
    sejuani.addGoodAgainst(volibear, toDoDescription);
    sejuani.addGoodWith(lissandra, toDoDescription);
    sejuani.addGoodWith(talon, toDoDescription);
    sejuani.addGoodWith(katarina, toDoDescription);
    senna.addGoodAgainst(janna, toDoDescription);
    senna.addGoodAgainst(bard, toDoDescription);
    senna.addGoodWith(lucian, toDoDescription);
    senna.addGoodWith(jhin, toDoDescription);
    senna.addGoodWith(vayne, toDoDescription);
    sett.addGoodAgainst(yasuo, toDoDescription);
    sett.addGoodAgainst(camille, toDoDescription);
    shaco.addGoodAgainst(udyr, toDoDescription);
    shaco.addGoodAgainst(graves, toDoDescription);
    shaco.addGoodAgainst(jax, toDoDescription);
    shaco.addGoodWith(galio, toDoDescription);
    shaco.addGoodWith(bard, toDoDescription);
    shaco.addGoodWith(talon, toDoDescription);
    shen.addGoodAgainst(tahmKench, toDoDescription);
    shen.addGoodAgainst(rengar, toDoDescription);
    shen.addGoodAgainst(gragas, toDoDescription);
    shen.addGoodWith(twistedFate, toDoDescription);
    shen.addGoodWith(zed, toDoDescription);
    shen.addGoodWith(akali, toDoDescription);
    shyvana.addGoodAgainst(nocturne, toDoDescription);
    shyvana.addGoodAgainst(leeSin, toDoDescription);
    shyvana.addGoodAgainst(hecarim, toDoDescription);
    shyvana.addGoodWith(yasuo, toDoDescription);
    shyvana.addGoodWith(shen, toDoDescription);
    shyvana.addGoodWith(nautilus, toDoDescription);
    singed.addGoodAgainst(shen, toDoDescription);
    singed.addGoodAgainst(jax, toDoDescription);
    singed.addGoodAgainst(illaoi, toDoDescription);
    singed.addGoodWith(cassiopeia, toDoDescription);
    singed.addGoodWith(volibear, toDoDescription);
    singed.addGoodWith(teemo, toDoDescription);
    sion.addGoodAgainst(illaoi, toDoDescription);
    sion.addGoodAgainst(nasus, toDoDescription);
    sion.addGoodAgainst(shen, toDoDescription);
    sion.addGoodWith(pantheon, toDoDescription);
    sion.addGoodWith(poppy, toDoDescription);
    sion.addGoodWith(talon, toDoDescription);
    sivir.addGoodAgainst(ezreal, toDoDescription);
    sivir.addGoodAgainst(xayah, toDoDescription);
    sivir.addGoodAgainst(lucian, toDoDescription);
    sivir.addGoodWith(leona, toDoDescription);
    sivir.addGoodWith(soraka, toDoDescription);
    sivir.addGoodWith(taric, toDoDescription);
    skarner.addGoodAgainst(nocturne, toDoDescription);
    skarner.addGoodAgainst(olaf, toDoDescription);
    skarner.addGoodAgainst(shaco, toDoDescription);
    skarner.addGoodWith(jayce, toDoDescription);
    skarner.addGoodWith(heimerdinger, toDoDescription);
    skarner.addGoodWith(thresh, toDoDescription);
    sona.addGoodAgainst(karma, toDoDescription);
    sona.addGoodAgainst(velKoz, toDoDescription);
    sona.addGoodAgainst(lulu, toDoDescription);
    sona.addGoodWith(ezreal, toDoDescription);
    sona.addGoodWith(missFortune, toDoDescription);
    sona.addGoodWith(caitlyn, toDoDescription);
    soraka.addGoodAgainst(veigar, toDoDescription);
    soraka.addGoodAgainst(morgana, toDoDescription);
    soraka.addGoodAgainst(velKoz, toDoDescription);
    soraka.addGoodWith(ezreal, toDoDescription);
    soraka.addGoodWith(sivir, toDoDescription);
    soraka.addGoodWith(urgot, toDoDescription);
    swain.addGoodAgainst(illaoi, toDoDescription);
    swain.addGoodAgainst(shen, toDoDescription);
    swain.addGoodAgainst(garen, toDoDescription);
    swain.addGoodWith(vladimir, toDoDescription);
    swain.addGoodWith(maokai, toDoDescription);
    swain.addGoodWith(alistar, toDoDescription);
    sylas.addGoodAgainst(zoe, toDoDescription);
    sylas.addGoodAgainst(xerath, toDoDescription);
    sylas.addGoodAgainst(swain, toDoDescription);
    syndra.addGoodAgainst(ryze, toDoDescription);
    syndra.addGoodAgainst(diana, toDoDescription);
    syndra.addGoodAgainst(kennen, toDoDescription);
    syndra.addGoodWith(zac, toDoDescription);
    syndra.addGoodWith(zilean, toDoDescription);
    syndra.addGoodWith(nami, toDoDescription);
    tahmKench.addGoodAgainst(karma, toDoDescription);
    tahmKench.addGoodAgainst(taric, toDoDescription);
    tahmKench.addGoodAgainst(brand, toDoDescription);
    tahmKench.addGoodWith(jinx, toDoDescription);
    tahmKench.addGoodWith(jhin, toDoDescription);
    taliyah.addGoodAgainst(ryze, toDoDescription);
    taliyah.addGoodAgainst(veigar, toDoDescription);
    taliyah.addGoodAgainst(syndra, toDoDescription);
    taliyah.addGoodWith(talon, toDoDescription);
    taliyah.addGoodWith(twistedFate, toDoDescription);
    taliyah.addGoodWith(kindred, toDoDescription);
    talon.addGoodAgainst(karma, toDoDescription);
    talon.addGoodAgainst(lissandra, toDoDescription);
    talon.addGoodAgainst(ekko, toDoDescription);
    talon.addGoodWith(zed, toDoDescription);
    talon.addGoodWith(fizz, toDoDescription);
    talon.addGoodWith(sejuani, toDoDescription);
    taric.addGoodAgainst(leona, toDoDescription);
    taric.addGoodAgainst(karma, toDoDescription);
    taric.addGoodAgainst(lulu, toDoDescription);
    taric.addGoodWith(graves, toDoDescription);
    taric.addGoodWith(ezreal, toDoDescription);
    taric.addGoodWith(vayne, toDoDescription);
    teemo.addGoodAgainst(choGath, toDoDescription);
    teemo.addGoodAgainst(garen, toDoDescription);
    teemo.addGoodAgainst(poppy, toDoDescription);
    teemo.addGoodWith(cassiopeia, toDoDescription);
    teemo.addGoodWith(leeSin, toDoDescription);
    teemo.addGoodWith(blitzcrank, toDoDescription);
    thresh.addGoodAgainst(lux, toDoDescription);
    thresh.addGoodAgainst(karma, toDoDescription);
    thresh.addGoodAgainst(veigar, toDoDescription);
    thresh.addGoodWith(vayne, toDoDescription);
    thresh.addGoodWith(draven, toDoDescription);
    thresh.addGoodWith(lucian, toDoDescription);
    tristana.addGoodAgainst(corki, toDoDescription);
    tristana.addGoodAgainst(kalista, toDoDescription);
    tristana.addGoodAgainst(lucian, toDoDescription);
    tristana.addGoodWith(leona, toDoDescription);
    tristana.addGoodWith(thresh, toDoDescription);
    tristana.addGoodWith(alistar, toDoDescription);
    trundle.addGoodAgainst(garen, toDoDescription);
    trundle.addGoodAgainst(sion, toDoDescription);
    trundle.addGoodAgainst(nasus, toDoDescription);
    trundle.addGoodWith(lissandra, toDoDescription);
    trundle.addGoodWith(vayne, toDoDescription);
    trundle.addGoodWith(jarvanIV, toDoDescription);
    tryndamere.addGoodAgainst(nautilus, toDoDescription);
    tryndamere.addGoodAgainst(choGath, toDoDescription);
    tryndamere.addGoodAgainst(garen, toDoDescription);
    tryndamere.addGoodWith(aatrox, toDoDescription);
    tryndamere.addGoodWith(ashe, toDoDescription);
    tryndamere.addGoodWith(zilean, toDoDescription);
    twistedFate.addGoodAgainst(azir, toDoDescription);
    twistedFate.addGoodAgainst(akali, toDoDescription);
    twistedFate.addGoodAgainst(ryze, toDoDescription);
    twistedFate.addGoodWith(nocturne, toDoDescription);
    twistedFate.addGoodWith(shen, toDoDescription);
    twistedFate.addGoodWith(aatrox, toDoDescription);
    twitch.addGoodAgainst(corki, toDoDescription);
    twitch.addGoodAgainst(sivir, toDoDescription);
    twitch.addGoodAgainst(kalista, toDoDescription);
    twitch.addGoodWith(taric, toDoDescription);
    twitch.addGoodWith(leona, toDoDescription);
    twitch.addGoodWith(braum, toDoDescription);
    udyr.addGoodAgainst(graves, toDoDescription);
    udyr.addGoodAgainst(leeSin, toDoDescription);
    udyr.addGoodAgainst(nidalee, toDoDescription);
    udyr.addGoodWith(ahri, toDoDescription);
    udyr.addGoodWith(ryze, toDoDescription);
    udyr.addGoodWith(leBlanc, toDoDescription);
    urgot.addGoodAgainst(jarvanIV, toDoDescription);
    urgot.addGoodAgainst(fiora, toDoDescription);
    urgot.addGoodAgainst(sivir, toDoDescription);
    urgot.addGoodWith(soraka, toDoDescription);
    urgot.addGoodWith(taric, toDoDescription);
    urgot.addGoodWith(janna, toDoDescription);
    varus.addGoodAgainst(corki, toDoDescription);
    varus.addGoodAgainst(sivir, toDoDescription);
    varus.addGoodAgainst(ashe, toDoDescription);
    varus.addGoodWith(leona, toDoDescription);
    varus.addGoodWith(thresh, toDoDescription);
    varus.addGoodWith(nami, toDoDescription);
    vayne.addGoodAgainst(ziggs, toDoDescription);
    vayne.addGoodAgainst(sivir, toDoDescription);
    vayne.addGoodAgainst(jhin, toDoDescription);
    vayne.addGoodWith(thresh, toDoDescription);
    vayne.addGoodWith(nunu, toDoDescription);
    vayne.addGoodWith(nami, toDoDescription);
    veigar.addGoodAgainst(diana, toDoDescription);
    veigar.addGoodAgainst(talon, toDoDescription);
    veigar.addGoodAgainst(akali, toDoDescription);
    veigar.addGoodWith(leBlanc, toDoDescription);
    veigar.addGoodWith(warwick, toDoDescription);
    veigar.addGoodWith(amumu, toDoDescription);
    velKoz.addGoodAgainst(swain, toDoDescription);
    velKoz.addGoodAgainst(galio, toDoDescription);
    velKoz.addGoodAgainst(viktor, toDoDescription);
    velKoz.addGoodWith(amumu, toDoDescription);
    velKoz.addGoodWith(aatrox, toDoDescription);
    velKoz.addGoodWith(leona, toDoDescription);
    vi.addGoodAgainst(nidalee, toDoDescription);
    vi.addGoodAgainst(shaco, toDoDescription);
    vi.addGoodAgainst(elise, toDoDescription);
    vi.addGoodWith(yasuo, toDoDescription);
    vi.addGoodWith(caitlyn, toDoDescription);
    vi.addGoodWith(orianna, toDoDescription);
    viktor.addGoodAgainst(ryze, toDoDescription);
    viktor.addGoodAgainst(diana, toDoDescription);
    viktor.addGoodAgainst(lissandra, toDoDescription);
    viktor.addGoodWith(jarvanIV, toDoDescription);
    viktor.addGoodWith(sona, toDoDescription);
    viktor.addGoodWith(malzahar, toDoDescription);
    vladimir.addGoodAgainst(ryze, toDoDescription);
    vladimir.addGoodAgainst(gangplank, toDoDescription);
    vladimir.addGoodAgainst(yasuo, toDoDescription);
    vladimir.addGoodWith(swain, toDoDescription);
    vladimir.addGoodWith(kennen, toDoDescription);
    vladimir.addGoodWith(zed, toDoDescription);
    volibear.addGoodAgainst(hecarim, toDoDescription);
    volibear.addGoodAgainst(leeSin, toDoDescription);
    volibear.addGoodAgainst(amumu, toDoDescription);
    volibear.addGoodWith(yasuo, toDoDescription);
    volibear.addGoodWith(teemo, toDoDescription);
    volibear.addGoodWith(ashe, toDoDescription);
    warwick.addGoodAgainst(poppy, toDoDescription);
    warwick.addGoodAgainst(leeSin, toDoDescription);
    warwick.addGoodAgainst(skarner, toDoDescription);
    warwick.addGoodWith(galio, toDoDescription);
    warwick.addGoodWith(kled, toDoDescription);
    warwick.addGoodWith(bard, toDoDescription);
    wukong.addGoodAgainst(gragas, toDoDescription);
    wukong.addGoodAgainst(trundle, toDoDescription);
    wukong.addGoodAgainst(jayce, toDoDescription);
    wukong.addGoodWith(galio, toDoDescription);
    wukong.addGoodWith(bard, toDoDescription);
    wukong.addGoodWith(sion, toDoDescription);
    xayah.addGoodAgainst(corki, toDoDescription);
    xayah.addGoodAgainst(lucian, toDoDescription);
    xayah.addGoodAgainst(kalista, toDoDescription);
    xayah.addGoodWith(rakan, toDoDescription);
    xayah.addGoodWith(sona, toDoDescription);
    xayah.addGoodWith(galio, toDoDescription);
    xerath.addGoodAgainst(azir, toDoDescription);
    xerath.addGoodAgainst(lissandra, toDoDescription);
    xerath.addGoodAgainst(viktor, toDoDescription);
    xerath.addGoodWith(jarvanIV, toDoDescription);
    xerath.addGoodWith(quinn, toDoDescription);
    xerath.addGoodWith(varus, toDoDescription);
    xinZhao.addGoodAgainst(rengar, toDoDescription);
    xinZhao.addGoodAgainst(olaf, toDoDescription);
    xinZhao.addGoodAgainst(nocturne, toDoDescription);
    xinZhao.addGoodWith(yasuo, toDoDescription);
    xinZhao.addGoodWith(pantheon, toDoDescription);
    xinZhao.addGoodWith(blitzcrank, toDoDescription);
    yasuo.addGoodAgainst(drMundo, toDoDescription);
    yasuo.addGoodAgainst(yorick, toDoDescription);
    yasuo.addGoodAgainst(galio, toDoDescription);
    yasuo.addGoodWith(malphite, toDoDescription);
    yasuo.addGoodWith(wukong, toDoDescription);
    yasuo.addGoodWith(alistar, toDoDescription);
    yorick.addGoodAgainst(nasus, toDoDescription);
    yorick.addGoodAgainst(kennen, toDoDescription);
    yorick.addGoodAgainst(vladimir, toDoDescription);
    yorick.addGoodWith(mordekaiser, toDoDescription);
    yorick.addGoodWith(vayne, toDoDescription);
    yorick.addGoodWith(cassiopeia, toDoDescription);
    yuumi.addGoodAgainst(lux, toDoDescription);
    yuumi.addGoodAgainst(annie, toDoDescription);
    yuumi.addGoodAgainst(ezreal, toDoDescription);
    yuumi.addGoodWith(vayne, toDoDescription);
    yuumi.addGoodWith(caitlyn, toDoDescription);
    yuumi.addGoodWith(jinx, toDoDescription);
    zac.addGoodAgainst(wukong, toDoDescription);
    zac.addGoodAgainst(trundle, toDoDescription);
    zac.addGoodAgainst(skarner, toDoDescription);
    zac.addGoodWith(yasuo, toDoDescription);
    zac.addGoodWith(orianna, toDoDescription);
    zac.addGoodWith(syndra, toDoDescription);
    zed.addGoodAgainst(ryze, toDoDescription);
    zed.addGoodAgainst(azir, toDoDescription);
    zed.addGoodAgainst(taliyah, toDoDescription);
    zed.addGoodWith(talon, toDoDescription);
    zed.addGoodWith(vi, toDoDescription);
    zed.addGoodWith(nasus, toDoDescription);
    ziggs.addGoodAgainst(aurelionSol, toDoDescription);
    ziggs.addGoodAgainst(gangplank, toDoDescription);
    ziggs.addGoodAgainst(cassiopeia, toDoDescription);
    ziggs.addGoodWith(amumu, toDoDescription);
    ziggs.addGoodWith(jarvanIV, toDoDescription);
    ziggs.addGoodWith(kennen, toDoDescription);
    zilean.addGoodAgainst(braum, toDoDescription);
    zilean.addGoodAgainst(alistar, toDoDescription);
    zilean.addGoodAgainst(zyra, toDoDescription);
    zilean.addGoodWith(aatrox, toDoDescription);
    zilean.addGoodWith(syndra, toDoDescription);
    zilean.addGoodWith(hecarim, toDoDescription);
    zoe.addGoodAgainst(azir, toDoDescription);
    zoe.addGoodAgainst(orianna, toDoDescription);
    zoe.addGoodAgainst(ryze, toDoDescription);
    zoe.addGoodWith(thresh, toDoDescription);
    zoe.addGoodWith(bard, toDoDescription);
    zoe.addGoodWith(zilean, toDoDescription);
    zyra.addGoodAgainst(lux, toDoDescription);
    zyra.addGoodAgainst(bard, toDoDescription);
    zyra.addGoodAgainst(annie, toDoDescription);
    zyra.addGoodWith(ashe, toDoDescription);
    zyra.addGoodWith(yasuo, toDoDescription);
    zyra.addGoodWith(amumu, toDoDescription);
})();
