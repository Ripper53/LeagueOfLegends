class ChampionInfo {
    constructor(champion, title, description, score) {
        this.champion = champion;
        this.title = title;
        this.description = description;
        this.score = score;
    }
}
var Role;
(function (Role) {
    Role[Role["None"] = 0] = "None";
    Role[Role["Top"] = 1] = "Top";
    Role[Role["Middle"] = 2] = "Middle";
    Role[Role["Bottom"] = 4] = "Bottom";
    Role[Role["Support"] = 8] = "Support";
    Role[Role["Jungle"] = 16] = "Jungle";
    Role[Role["All"] = 31] = "All";
})(Role || (Role = {}));
;
var Civilization;
(function (Civilization) {
    Civilization[Civilization["Zero"] = 0] = "Zero";
    Civilization[Civilization["Nature"] = 1] = "Nature";
    Civilization[Civilization["Water"] = 2] = "Water";
    Civilization[Civilization["Fire"] = 4] = "Fire";
    Civilization[Civilization["Light"] = 8] = "Light";
    Civilization[Civilization["Darkness"] = 16] = "Darkness";
    Civilization[Civilization["All"] = 31] = "All";
})(Civilization || (Civilization = {}));
;
var Mode;
(function (Mode) {
    Mode[Mode["None"] = 0] = "None";
    Mode[Mode["Tank"] = 1] = "Tank";
    Mode[Mode["ADC"] = 2] = "ADC";
    Mode[Mode["APC"] = 4] = "APC";
    Mode[Mode["Utility"] = 8] = "Utility";
    Mode[Mode["PowerEngager"] = 16] = "PowerEngager";
    Mode[Mode["PowerRetorter"] = 32] = "PowerRetorter";
    Mode[Mode["Slayer"] = 64] = "Slayer";
    Mode[Mode["Burster"] = 128] = "Burster";
    Mode[Mode["Scaler"] = 256] = "Scaler";
    Mode[Mode["Binder"] = 512] = "Binder";
    Mode[Mode["SplitPusher"] = 1024] = "SplitPusher";
    Mode[Mode["EpicKiller"] = 2048] = "EpicKiller";
    Mode[Mode["Sly"] = 4096] = "Sly";
    Mode[Mode["All"] = 8191] = "All";
})(Mode || (Mode = {}));
;
class Champion {
    constructor(name, src) {
        this.tier = 0;
        this.role = Role.None;
        this.civilization = Civilization.Zero;
        this.mode = Mode.None;
        this.available = true;
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
    clear() {
        this.goodAgainst.length = 0;
        this.goodWith.length = 0;
        this.badAgainst.length = 0;
        this.badAgainst.length = 0;
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
        const width = w + "px", height = h + "px";
        this.modifyStyle.width = width;
        this.modifyStyle.height = height;
        this.modifyStyle.cursor = "pointer";
        this.modifyElement.setAttribute('class', 'button');
        this.text = new TextUI("");
        this.modifyElement.appendChild(this.text.modifyElement);
        this.text.modifyStyle.width = width;
        this.text.modifyStyle.height = height;
        this.text.modifyStyle.userSelect = "none";
        this.text.modifyStyle.textAlign = "center";
        const centerSpan = document.createElement('span');
        this.text.modifyElement.appendChild(centerSpan);
        centerSpan.style.display = "inline-block";
        centerSpan.style.verticalAlign = "middle";
        centerSpan.style.lineHeight = "normal";
        centerSpan.style.height = height;
        centerSpan.textContent = text;
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
        btn.modifyEvents.addOnPointerEnter(() => {
            setColorFunc(btn.modifyStyle, btn.getHoverColor());
        });
        const onLeaveEvent = () => {
            setColorFunc(btn.modifyStyle, btn.getColor());
        };
        onLeaveEvent();
        btn.modifyEvents.addOnPointerLeave(() => onLeaveEvent());
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
const EnumUtility = {
    hasFlag: (value, check) => (value & check) === value
};
const FileUtility = {
    getName: path => path.replace(/^.*[\\\/]/, '')
};
class PopUpInfo extends UIElement {
    constructor() {
        super(document.createElement('div'));
        this.width = 400;
        this.readOnly = false;
        const width = this.width + "px";
        this.modifyStyle.backgroundColor = "black";
        this.modifyStyle.zIndex = "100";
        this.modifyStyle.display = "none";
        this.modifyStyle.position = "fixed";
        this.modifyStyle.minWidth = width;
        this.modifyStyle.padding = "5px";
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
        this.addInfoButton = new ButtonUI("Add", 100, 30);
        this.modifyElement.appendChild(this.addInfoButton.modifyElement);
        this.addInfoButton.setColor("#1f1f1f");
        this.addInfoButton.setHoverColor("#404040");
        this.addInfoButton.modifyStyle.opacity = "50%";
        this.addInfoButton.modifyText.modifyStyle.color = "white";
        this.addInfoButton.modifyText.modifyStyle.fontFamily = defaultValue.fontFamily;
        this.addInfoButton.modifyStyle.position = "absolute";
        this.addInfoButton.modifyStyle.top = "0px";
        this.addInfoButton.modifyStyle.right = "0px";
        this.descriptionText = new TextUI("");
        this.modifyElement.appendChild(this.descriptionText.modifyElement);
        this.descriptionText.modifyStyle.color = "white";
        this.descriptionText.modifyStyle.margin = "5px";
        this.descriptionText.modifyStyle.fontFamily = defaultValue.fontFamily;
        this.descriptionText.modifyStyle.width = width;
        this.descriptionText.modifyStyle.maxWidth = this.width + "px";
        this.descriptionText.modifyStyle.maxHeight = "400px";
        this.descriptionText.modifyStyle.overflowY = "auto";
        this.descriptionText.modifyStyle.overflowX = "hidden";
        this.descriptionText.modifyStyle.wordWrap = "break-word";
    }
    addInfo(title, infos, color) {
        const paragraph = document.createElement('p');
        this.descriptionText.modifyElement.appendChild(paragraph);
        for (let info of infos) {
            const strongTitle = document.createElement('strong');
            paragraph.appendChild(strongTitle);
            strongTitle.textContent = title + info.champion.name;
            strongTitle.style.color = color;
            const img = document.createElement('img');
            paragraph.appendChild(img);
            img.style.width = "25px";
            img.style.height = "25px";
            img.src = info.champion.getImageSrcPath();
            const descriptionParagraph = document.createElement('textarea');
            paragraph.appendChild(descriptionParagraph);
            descriptionParagraph.style.display = "block";
            descriptionParagraph.textContent += info.description;
            descriptionParagraph.style.width = (this.width - 50) + "px";
            descriptionParagraph.style.height = "100px";
            descriptionParagraph.readOnly = this.readOnly;
            descriptionParagraph.addEventListener('input', () => {
                info.description = descriptionParagraph.value;
            });
        }
    }
    display(ui) {
        clearChildren(this.descriptionText.modifyElement);
        const champion = ui.getChampion();
        if (champion !== null) {
            this.image.modifyElement.src = getImagePath(champion.src);
            this.nameText.modifyElement.textContent = champion.name;
            this.image.modifyElement.alt = champion.name;
            this.addInfo("Good against ", champion.goodAgainst, "#ff0000");
            this.addInfo("Bad against ", champion.badAgainst, "#ff0000");
            this.addInfo("Good with ", champion.goodWith, "#00ff00");
            this.addInfo("Bad with ", champion.badWith, "#00ff00");
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
class ChampionSelectUI extends UIElement {
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
            ChampionSelectUI.popUp.display(this);
            let x = e.clientX, y = e.clientY;
            const w = ChampionSelectUI.popUp.modifyElement.clientWidth, h = ChampionSelectUI.popUp.modifyElement.clientHeight;
            if ((x + w) > window.innerWidth)
                x += window.innerWidth - (x + w);
            if ((y + h) > window.innerHeight)
                y += window.innerHeight - (y + h);
            ChampionSelectUI.popUp.modifyStyle.left = x + "px";
            ChampionSelectUI.popUp.modifyStyle.top = y + "px";
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
    getChampion() {
        return this.champion;
    }
    reset() {
        this.synergyText.modifyElement.textContent = "";
        this.counterText.modifyElement.textContent = "";
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
            const champ = ui.getChampion();
            if (champ === null)
                continue;
            const infoIndex = infos.findIndex(v => v.champion === champ);
            if (infoIndex !== -1) {
                const info = infos[infoIndex], zeroIndexInfo = infos[0];
                infos[0] = info;
                infos.splice(0, 1);
                infos.push(zeroIndexInfo);
                champScore.champions.push(champ);
                champScore.score += info.score;
            }
        }
        return champScore;
    }
    evaluatePick(friendlyTeam, enemyTeam) {
        const champion = this.getChampion();
        if (champion === null) {
            this.synergyText.modifyElement.textContent = "";
            this.counterText.modifyElement.textContent = "";
            return;
        }
        this.synergyScore = this.evaluateChamps(friendlyTeam, champion.goodWith);
        this.synergyText.modifyElement.textContent = this.synergyScore.score.toString();
        this.counterScore = this.evaluateChamps(enemyTeam, champion.goodAgainst);
        this.counterText.modifyElement.textContent = this.counterScore.score.toString();
    }
    evaluateBan(friendlyTeam, enemyTeam) {
        const champion = this.getChampion();
        if (champion === null) {
            this.synergyText.modifyElement.textContent = "";
            this.counterText.modifyElement.textContent = "";
            return;
        }
        this.synergyScore = this.evaluateChamps(enemyTeam, champion.goodWith);
        this.synergyText.modifyElement.textContent = this.synergyScore.score.toString();
        this.counterScore = this.evaluateChamps(friendlyTeam, champion.goodAgainst);
        this.counterText.modifyElement.textContent = this.counterScore.score.toString();
    }
}
ChampionSelectUI.popUp = new PopUpInfo();
class ChampionSelectSetUI extends ChampionSelectUI {
    constructor() {
        super(...arguments);
        this.value = null;
        this.onSetEvents = [];
    }
    addOnSet(func) {
        this.onSetEvents.push(func);
    }
    removeOnSet(func) {
        const index = this.onSetEvents.findIndex(v => v === func);
        if (index !== -1)
            this.onSetEvents.splice(index, 1);
    }
    triggerOnSet(oldValue) {
        for (let func of this.onSetEvents)
            func(this, this.value, oldValue);
    }
    set(value) {
        const oldValue = this.value;
        this.value = value;
        const champion = this.getChampionValue();
        if (champion !== null) {
            this.champion = champion;
            this.imageButton.modifyElement.src = champion.getImageSrcPath();
            this.imageButton.modifyElement.alt = champion.name;
            this.text.modifyElement.textContent = champion.name;
            this.triggerOnSet(oldValue);
            return true;
        }
        this.value = null;
        this.champion = null;
        this.imageButton.modifyElement.src = getImagePath(this.src);
        this.imageButton.modifyElement.alt = "No champion.";
        this.text.modifyElement.textContent = "";
        this.triggerOnSet(oldValue);
        return false;
    }
}
class ChampionUI extends ChampionSelectSetUI {
    constructor(src, w, h) {
        super(src, w, h);
        this.blueSideSelectedImage = ChampionUI.getSideSelectedImage("BlueFadeOut.png", w, h);
        this.modifyElement.appendChild(this.blueSideSelectedImage.modifyElement);
        this.redSideSelectedImage = ChampionUI.getSideSelectedImage("RedFadeOut.png", w, h);
        this.modifyElement.appendChild(this.redSideSelectedImage.modifyElement);
    }
    static getSideSelectedImage(src, w, h) {
        const sideImage = new ImageUI();
        sideImage.modifyElement.src = getImagePath(src);
        sideImage.modifyStyle.width = w + "px";
        sideImage.modifyStyle.height = h + "px";
        sideImage.modifyStyle.transform = "rotate(270deg)";
        sideImage.modifyStyle.position = "absolute";
        sideImage.modifyStyle.visibility = "hidden";
        sideImage.modifyStyle.opacity = "75%";
        sideImage.modifyStyle.pointerEvents = "none";
        return sideImage;
    }
    getChampionValue() {
        return this.value;
    }
    reset() {
        super.reset();
        this.value.available = true;
        this.imageButton.modifyStyle.filter = "grayscale(0%)";
        this.blueSideSelectedImage.modifyStyle.visibility = "hidden";
        this.redSideSelectedImage.modifyStyle.visibility = "hidden";
    }
    ban() {
        this.value.available = false;
        this.imageButton.modifyStyle.filter = "grayscale(100%)";
    }
    pick() {
        this.value.available = false;
    }
    bluePick() {
        this.pick();
        this.blueSideSelectedImage.modifyStyle.visibility = "visible";
    }
    redPick() {
        this.pick();
        this.redSideSelectedImage.modifyStyle.visibility = "visible";
    }
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
class SideUI extends ChampionSelectSetUI {
    constructor(src, w, h, side) {
        super(src, w, h);
        this.side = side;
    }
    getChampionValue() {
        if (this.value === null)
            return null;
        const champ = this.value.getChampion();
        return (champ !== null && champ.available) ? champ : null;
    }
    reset() {
        super.reset();
        this.set(null);
        this.imageButton.modifyElement.src = getImagePath(this.src);
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
            this.getPickImage(), this.getPickImage(), this.getPickImage(), this.getPickImage(), this.getPickImage()
        ];
        for (let img of this.picks)
            this.add(img);
    }
    evaluate(func) {
        for (let ui of this.picks) {
            func(ui);
        }
        for (let ui of ChampionData.UIs) {
            func(ui);
        }
    }
    evaluatePicks() {
        this.evaluate(ui => ui.evaluatePick(this.picks, this.enemySide.picks));
    }
    evaluateBans() {
        this.evaluate(ui => ui.evaluateBan(this.picks, this.enemySide.picks));
    }
    getBanImage() {
        const ui = new SideUI(this.banSrc, 50, 50, this);
        ui.imageButton.modifyStyle.opacity = defaultValue.opacity + "%";
        ui.text.modifyStyle.position = "absolute";
        ui.synergyText.modifyStyle.top = "25%";
        ui.counterText.modifyStyle.top = "25%";
        SideLayoutUI.pickableUI(ui);
        ui.imageButton.modifyEvents.addOnClick(() => {
            if (ui.side === Side.blue)
                evaluateBans(ui.side, Side.red);
            else
                evaluateBans(ui.side, Side.blue);
        });
        ui.addOnSet((source, champ, oldChamp) => {
            if (champ === null)
                return;
            champ.ban();
            evaluateBans(this, this.enemySide);
        });
        return ui;
    }
    getPickImage() {
        const ui = new SideUI(this.pickSrc, 75, 75, this);
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
        ui.imageButton.modifyEvents.addOnClick(() => {
            if (ui.side === Side.blue)
                evaluatePicks(ui.side, Side.red);
            else
                evaluatePicks(ui.side, Side.blue);
        });
        ui.addOnSet((source, champ, oldChamp) => {
            if (champ === null)
                return;
            if (this === Side.blue)
                champ.bluePick();
            else
                champ.redPick();
            evaluatePicks(this, this.enemySide);
        });
        return ui;
    }
    static resetOldChampEvent(source, value, oldValue) {
        if (oldValue !== null)
            oldValue.reset();
    }
    static pickableUI(ui) {
        ui.addOnSet(SideLayoutUI.resetOldChampEvent);
        ui.imageButton.modifyEvents.addOnClick(() => {
            pick.setEvent = null;
            pick.setChampionEvent = null;
            headerText.modifyElement.textContent = "Champion Select";
            pick.set(ui);
        });
    }
}
const ChampionData = {
    UIs: [],
    clear: () => {
        for (let champion of Champion.ALL)
            champion.clear();
    },
    load: data => {
        for (let d of data) {
            const champ = Champion.get(d.name);
            for (let ga of d.goodAgainst) {
                champ.addGoodAgainst(Champion.get(ga.name), ga.details, ga.score);
            }
            for (let gw of d.goodWith) {
                champ.addGoodWith(Champion.get(gw.name), gw.details, gw.score);
            }
        }
    }
};
const ChampionFilter = {
    sort: null
};
function evaluatePicks(friendlyTeam, enemyTeam) {
    friendlyTeam.evaluatePicks();
    enemyTeam.evaluatePicks();
    for (let ui of ChampionData.UIs)
        ui.evaluatePick(friendlyTeam.picks, enemyTeam.picks);
    if (ChampionFilter.sort !== null)
        ChampionFilter.sort();
}
function evaluateBans(friendlyTeam, enemyTeam) {
    friendlyTeam.evaluateBans();
    enemyTeam.evaluateBans();
    for (let ui of ChampionData.UIs)
        ui.evaluateBan(friendlyTeam.picks, enemyTeam.picks);
    if (ChampionFilter.sort !== null)
        ChampionFilter.sort();
}
const Side = {
    blue: new SideLayoutUI("BanBanner.png", "BlueBanner.png"),
    red: new SideLayoutUI("BanBanner.png", "RedBanner.png"),
    width: 200
};
Side.blue.modifyStyle.width = Side.width + "px";
Side.blue.modifyStyle.float = "left";
Side.red.modifyStyle.width = Side.width + "px";
Side.red.modifyStyle.float = "right";
Side.red.modifyStyle.direction = "rtl";
for (let ui of Side.red.picks) {
    ui.hoverImage.modifyStyle.transform = "rotate(180deg)";
    ui.text.modifyStyle.textAlign = "right";
    ui.text.modifyStyle.left = "-10px";
}
Side.blue.enemySide = Side.red;
Side.red.enemySide = Side.blue;
const pick = new (class Pick {
    constructor() {
        this.ui = null;
        this.setEvent = null;
        this.setChampionEvent = null;
    }
    set(ui) {
        if (this.ui !== null) {
            this.ui.text.modifyStyle.color = "white";
            if (FileUtility.getName(this.ui.imageButton.modifyElement.src) === this.ui.src) {
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
        if (this.ui === null || !this.ui.set(ui))
            return;
        if (ChampionFilter.sort !== null)
            ChampionFilter.sort();
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
const Random = {
    getRandomArbitrary: (min, max) => Math.random() * (max - min) + min,
    getRandomInt: (min, max) => Math.floor(Math.random() * max) + min
};
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
    bg.controls = false;
    bg.loop = true;
    bg.muted = true;
    bg.play();
    const bgSource = document.createElement('source');
    bg.appendChild(bgSource);
    bgSource.type = "video/webm";
    (() => {
        class Background {
            constructor(src, width, height) {
                this.src = src;
                this.width = width;
                this.height = height;
            }
        }
        const backgrounds = [
            new Background("Ionia.webm", 10, 30),
        ];
        const selectedBG = backgrounds[Random.getRandomInt(0, backgrounds.length)];
        bgSource.src = getImagePath(selectedBG.src);
        bg.style.minWidth = (100 + selectedBG.width) + "%";
        bg.style.minHeight = (100 + selectedBG.height) + "%";
        bg.style.left = -selectedBG.width + "%";
        bg.style.top = -selectedBG.height + "%";
    })();
    const champSelectDiv = document.createElement('div');
    UI.body.appendChild(champSelectDiv);
    champSelectDiv.style.position = "relative";
    champSelectDiv.style.display = "inline-block";
    const searchInputField = new InputFieldUI();
    champSelectDiv.appendChild(searchInputField.modifyElement);
    searchInputField.modifyStyle.display = "inline-block";
    searchInputField.modifyStyle.opacity = "50%";
    const roleDropdown = document.createElement('select');
    champSelectDiv.appendChild(roleDropdown);
    roleDropdown.style.opacity = "50%";
    (() => {
        const allOp = document.createElement('option');
        roleDropdown.appendChild(allOp);
        allOp.textContent = "All";
        const topOp = document.createElement('option');
        roleDropdown.appendChild(topOp);
        topOp.textContent = "Top";
        const middleOp = document.createElement('option');
        roleDropdown.appendChild(middleOp);
        middleOp.textContent = "Middle";
        const bottomOp = document.createElement('option');
        roleDropdown.appendChild(bottomOp);
        bottomOp.textContent = "Bottom";
        const supportOp = document.createElement('option');
        roleDropdown.appendChild(supportOp);
        supportOp.textContent = "Support";
        const jungleOp = document.createElement('option');
        roleDropdown.appendChild(jungleOp);
        jungleOp.textContent = "Jungle";
    })();
    const sortDropdown = document.createElement('select');
    champSelectDiv.appendChild(sortDropdown);
    sortDropdown.style.opacity = "50%";
    (() => {
        const nameSortOp = document.createElement('option');
        sortDropdown.appendChild(nameSortOp);
        nameSortOp.textContent = "Name";
        const synergySortOp = document.createElement('option');
        sortDropdown.appendChild(synergySortOp);
        synergySortOp.textContent = "Synergy";
        const counterSortOp = document.createElement('option');
        sortDropdown.appendChild(counterSortOp);
        counterSortOp.textContent = "Counter";
    })();
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
    grid.modifyStyle.overflowY = "auto";
    grid.modifyStyle.height = "590px";
    UI.addOnResize(() => {
        const width = UI.body.clientWidth;
        const gw = gridWidth * (width / 200);
        grid.modifyStyle.width = gw + "px";
        champSelectDiv.style.left = UI.getPercentage((width / 2) + (gw / 2) + Side.width, width) + "%";
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
        const ui = new ChampionUI(src, 75, 75);
        ChampionData.UIs.push(ui);
        const champion = new Champion(name, src);
        ui.set(champion);
        ui.imageButton.modifyEvents.addOnClick(() => pick.setChampion(ui));
        grid.add(ui);
    }
    const visibleData = {
        name: "",
        role: Role.All,
        civilization: Civilization.All,
        mode: Mode.All,
        check: () => {
            for (let ui of ChampionData.UIs) {
                const champion = ui.getChampion();
                ui.modifyStyle.display = (champion.name.toLowerCase().startsWith(visibleData.name) &&
                    EnumUtility.hasFlag(champion.role, visibleData.role) &&
                    EnumUtility.hasFlag(champion.civilization, visibleData.civilization) &&
                    EnumUtility.hasFlag(champion.mode, visibleData.mode)) ? "inline-grid" : "none";
            }
        }
    };
    searchInputField.modifyEvents.addOnInput(() => {
        visibleData.name = searchInputField.modifyElement.value.toLowerCase();
        visibleData.check();
    });
    roleDropdown.addEventListener('change', () => {
        visibleData.role = (roleDropdown.selectedIndex === 0) ? Role.All : roleDropdown.selectedIndex;
        visibleData.check();
    });
    sortDropdown.addEventListener('change', () => {
        switch (sortDropdown.selectedIndex) {
            case 0:
                ChampionFilter.sort = () => {
                    ChampionFilter.sort = null;
                    ChampionData.UIs.sort((a, b) => {
                        const nameA = a.getChampion().name.toLowerCase(), nameB = b.getChampion().name.toLowerCase();
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
                ChampionFilter.sort = () => {
                    ChampionData.UIs.sort((a, b) => {
                        const diff = b.getSynergyScore() - a.getSynergyScore();
                        if (diff === 0)
                            return b.getCounterScore() - a.getCounterScore();
                        return diff;
                    });
                };
                break;
            default:
                ChampionFilter.sort = () => {
                    ChampionData.UIs.sort((a, b) => {
                        const diff = b.getCounterScore() - a.getCounterScore();
                        if (diff === 0)
                            return b.getSynergyScore() - a.getSynergyScore();
                        return diff;
                    });
                };
                break;
        }
        const sortChampUIArray = ChampionFilter.sort;
        ChampionFilter.sort = () => {
            sortChampUIArray();
            clearChildren(grid.modifyElement);
            for (let champ of ChampionData.UIs)
                grid.modifyElement.appendChild(champ.modifyElement);
        };
        ChampionFilter.sort();
    });
    numbersCheckInputField.modifyElement.checked = true;
    numbersCheckInputField.modifyEvents.addOnChange(() => {
        function setUIs(vis) {
            function setUI(ui) {
                ui.highlightedText.modifyStyle.visibility = vis;
                ui.synergyText.modifyStyle.visibility = vis;
                ui.counterText.modifyStyle.visibility = vis;
            }
            for (let ui of ChampionData.UIs)
                setUI(ui);
            for (let ui of Side.blue.picks)
                setUI(ui);
            for (let ui of Side.blue.bans)
                setUI(ui);
            for (let ui of Side.red.picks)
                setUI(ui);
            for (let ui of Side.red.bans)
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
            for (let ui of Side.blue.picks) {
                action(Side.blue, ui, Side.blue.pickSrc);
            }
            for (let ui of Side.red.picks) {
                action(Side.blue, ui, Side.red.pickSrc);
            }
            for (let ui of Side.blue.bans) {
                action(Side.blue, ui, Side.blue.banSrc);
            }
            for (let ui of Side.red.bans) {
                action(Side.blue, ui, Side.red.banSrc);
            }
        }
        function reset() {
            pick.setEvent = null;
            pick.setChampionEvent = null;
            pick.set(null);
            headerText.modifyElement.textContent = "Champion Select";
            for (let ui of ChampionData.UIs) {
                ui.reset();
            }
            actionOnAllSideImages((side, ui, originalSrc) => {
                ui.reset();
                ui.imageButton.modifyStyle.opacity = defaultValue.opacity + "%";
                ui.text.modifyElement.textContent = "";
            });
        }
        const phaseDiv = document.createElement('div');
        UI.body.appendChild(phaseDiv);
        const phaseBtn = getTextUI("Phase");
        phaseDiv.appendChild(phaseBtn.modifyElement);
        phaseBtn.modifyStyle.display = "inline-block";
        phaseBtn.modifyStyle.width = "100px";
        const phaseDropdown = document.createElement('select');
        phaseDiv.appendChild(phaseDropdown);
        (() => {
            const proPhaseOp = document.createElement('option');
            phaseDropdown.appendChild(proPhaseOp);
            proPhaseOp.textContent = "Pro";
            const rankedPhaseOp = document.createElement('option');
            phaseDropdown.appendChild(rankedPhaseOp);
            rankedPhaseOp.textContent = "Ranked";
        })();
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
                    headerText.modifyElement.textContent = data.title;
                    pick.setChampionEvent = data.action;
                    pick.set(data.ui);
                    evaluatePicks(data.friendlyTeam, data.enemyTeam);
                }
                else {
                    headerText.modifyElement.textContent = "Champion Select";
                    pick.setEvent = null;
                    pick.setChampionEvent = null;
                    pick.set(null);
                }
            }
            function addBanSrcEvent(title, ui, friendlyTeam, enemyTeam) {
                srcData.data.push({
                    action: () => nextSrcEvent(),
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
            switch (phaseDropdown.selectedIndex) {
                case 0:
                    addBanSrcEvent("Blue Ban", Side.blue.bans[0], Side.blue, Side.red);
                    addBanSrcEvent("Red Ban", Side.red.bans[0], Side.red, Side.blue);
                    addBanSrcEvent("Blue Ban", Side.blue.bans[1], Side.blue, Side.red);
                    addBanSrcEvent("Red Ban", Side.red.bans[1], Side.red, Side.blue);
                    addBanSrcEvent("Blue Ban", Side.blue.bans[2], Side.blue, Side.red);
                    addBanSrcEvent("Red Ban", Side.red.bans[2], Side.blue, Side.red);
                    addPickSrcEvent("Blue Pick", Side.blue.picks[0], Side.blue, Side.red);
                    addPickSrcEvent("Red Pick", Side.red.picks[0], Side.red, Side.blue);
                    addPickSrcEvent("Red Pick", Side.red.picks[1], Side.red, Side.blue);
                    addPickSrcEvent("Blue Pick", Side.blue.picks[1], Side.blue, Side.red);
                    addPickSrcEvent("Blue Pick", Side.blue.picks[2], Side.blue, Side.red);
                    addPickSrcEvent("Red Pick", Side.red.picks[2], Side.red, Side.blue);
                    addBanSrcEvent("Blue Ban", Side.blue.bans[3], Side.blue, Side.red);
                    addBanSrcEvent("Red Ban", Side.red.bans[3], Side.red, Side.blue);
                    addBanSrcEvent("Blue Ban", Side.blue.bans[4], Side.blue, Side.red);
                    addBanSrcEvent("Red Ban", Side.red.bans[4], Side.red, Side.blue);
                    addPickSrcEvent("Red Pick", Side.red.picks[3], Side.red, Side.blue);
                    addPickSrcEvent("Blue Pick", Side.blue.picks[3], Side.blue, Side.red);
                    addPickSrcEvent("Blue Pick", Side.blue.picks[4], Side.blue, Side.red);
                    addPickSrcEvent("Red Pick", Side.red.picks[4], Side.red, Side.blue);
                    break;
                default:
                    addPickSrcEvent("Blue Pick", Side.blue.picks[0], Side.blue, Side.red);
                    addPickSrcEvent("Red Pick", Side.red.picks[0], Side.red, Side.blue);
                    addPickSrcEvent("Red Pick", Side.red.picks[1], Side.red, Side.blue);
                    addPickSrcEvent("Blue Pick", Side.blue.picks[1], Side.blue, Side.red);
                    addPickSrcEvent("Blue Pick", Side.blue.picks[2], Side.blue, Side.red);
                    addPickSrcEvent("Red Pick", Side.red.picks[2], Side.red, Side.blue);
                    addPickSrcEvent("Red Pick", Side.red.picks[3], Side.red, Side.blue);
                    addPickSrcEvent("Blue Pick", Side.blue.picks[3], Side.blue, Side.red);
                    addPickSrcEvent("Blue Pick", Side.blue.picks[4], Side.blue, Side.red);
                    addPickSrcEvent("Red Pick", Side.red.picks[4], Side.red, Side.blue);
                    break;
            }
            nextSrcEvent();
        });
        const resetBtn = getTextUI("Reset");
        resetBtn.modifyStyle.width = "100px";
        resetBtn.modifyEvents.addOnClick(() => reset());
    })();
})();
(() => {
    const aatrox = Champion.get("Aatrox"), ahri = Champion.get("Ahri"), akali = Champion.get("Akali"), alistar = Champion.get("Alistar"), amumu = Champion.get("Amumu"), anivia = Champion.get("Anivia"), annie = Champion.get("Annie"), aphelios = Champion.get("Aphelios"), ashe = Champion.get("Ashe"), aurelionSol = Champion.get("Aurelion Sol"), azir = Champion.get("Azir"), bard = Champion.get("Bard"), blitzcrank = Champion.get("Blitzcrank"), brand = Champion.get("Brand"), braum = Champion.get("Braum"), caitlyn = Champion.get("Caitlyn"), camille = Champion.get("Camille"), cassiopeia = Champion.get("Cassiopeia"), choGath = Champion.get("Cho'Gath"), corki = Champion.get("Corki"), darius = Champion.get("Darius"), diana = Champion.get("Diana"), drMundo = Champion.get("Dr. Mundo"), draven = Champion.get("Draven"), ekko = Champion.get("Ekko"), elise = Champion.get("Elise"), evelynn = Champion.get("Evelynn"), ezreal = Champion.get("Ezreal"), fiddlesticks = Champion.get("Fiddlesticks"), fiora = Champion.get("Fiora"), fizz = Champion.get("Fizz"), galio = Champion.get("Galio"), gangplank = Champion.get("Gangplank"), garen = Champion.get("Garen"), gnar = Champion.get("Gnar"), gragas = Champion.get("Gragas"), graves = Champion.get("Graves"), hecarim = Champion.get("Hecarim"), heimerdinger = Champion.get("Heimerdinger"), illaoi = Champion.get("Illaoi"), irelia = Champion.get("Irelia"), ivern = Champion.get("Ivern"), janna = Champion.get("Janna"), jarvanIV = Champion.get("Jarvan IV"), jax = Champion.get("Jax"), jayce = Champion.get("Jayce"), jhin = Champion.get("Jhin"), jinx = Champion.get("Jinx"), kaiSa = Champion.get("Kai'Sa"), kalista = Champion.get("Kalista"), karma = Champion.get("Karma"), karthus = Champion.get("Karthus"), kassadin = Champion.get("Kassadin"), katarina = Champion.get("Katarina"), kayle = Champion.get("Kayle"), kayn = Champion.get("Kayn"), kennen = Champion.get("Kennen"), khaZix = Champion.get("Kha'Zix"), kindred = Champion.get("Kindred"), kled = Champion.get("Kled"), kogMaw = Champion.get("Kog'Maw"), leBlanc = Champion.get("LeBlanc"), leeSin = Champion.get("Lee Sin"), leona = Champion.get("Leona"), lissandra = Champion.get("Lissandra"), lucian = Champion.get("Lucian"), lulu = Champion.get("Lulu"), lux = Champion.get("Lux"), malphite = Champion.get("Malphite"), malzahar = Champion.get("Malzahar"), maokai = Champion.get("Maokai"), masterYi = Champion.get("Master Yi"), missFortune = Champion.get("Miss Fortune"), mordekaiser = Champion.get("Mordekaiser"), morgana = Champion.get("Morgana"), nami = Champion.get("Nami"), nasus = Champion.get("Nasus"), nautilus = Champion.get("Nautilus"), neeko = Champion.get("Neeko"), nidalee = Champion.get("Nidalee"), nocturne = Champion.get("Nocturne"), nunu = Champion.get("Nunu"), olaf = Champion.get("Olaf"), orianna = Champion.get("Orianna"), ornn = Champion.get("Ornn"), pantheon = Champion.get("Pantheon"), poppy = Champion.get("Poppy"), pyke = Champion.get("Pyke"), qiyana = Champion.get("Qiyana"), quinn = Champion.get("Quinn"), rakan = Champion.get("Rakan"), rammus = Champion.get("Rammus"), rekSai = Champion.get("Rek'Sai"), renekton = Champion.get("Renekton"), rengar = Champion.get("Rengar"), riven = Champion.get("Riven"), rumble = Champion.get("Rumble"), ryze = Champion.get("Ryze"), sejuani = Champion.get("Sejuani"), senna = Champion.get("Senna"), sett = Champion.get("Sett"), shaco = Champion.get("Shaco"), shen = Champion.get("Shen"), shyvana = Champion.get("Shyvana"), singed = Champion.get("Singed"), sion = Champion.get("Sion"), sivir = Champion.get("Sivir"), skarner = Champion.get("Skarner"), sona = Champion.get("Sona"), soraka = Champion.get("Soraka"), swain = Champion.get("Swain"), sylas = Champion.get("Sylas"), syndra = Champion.get("Syndra"), tahmKench = Champion.get("Tahm Kench"), taliyah = Champion.get("Taliyah"), talon = Champion.get("Talon"), taric = Champion.get("Taric"), teemo = Champion.get("Teemo"), thresh = Champion.get("Thresh"), tristana = Champion.get("Tristana"), trundle = Champion.get("Trundle"), tryndamere = Champion.get("Tryndamere"), twistedFate = Champion.get("Twisted Fate"), twitch = Champion.get("Twitch"), udyr = Champion.get("Udyr"), urgot = Champion.get("Urgot"), varus = Champion.get("Varus"), vayne = Champion.get("Vayne"), veigar = Champion.get("Veigar"), velKoz = Champion.get("Vel'Koz"), vi = Champion.get("Vi"), viktor = Champion.get("Viktor"), vladimir = Champion.get("Vladimir"), volibear = Champion.get("Volibear"), warwick = Champion.get("Warwick"), wukong = Champion.get("Wukong"), xayah = Champion.get("Xayah"), xerath = Champion.get("Xerath"), xinZhao = Champion.get("Xin Zhao"), yasuo = Champion.get("Yasuo"), yorick = Champion.get("Yorick"), yuumi = Champion.get("Yuumi"), zac = Champion.get("Zac"), zed = Champion.get("Zed"), ziggs = Champion.get("Ziggs"), zilean = Champion.get("Zilean"), zoe = Champion.get("Zoe"), zyra = Champion.get("Zyra");
    const toDoDescription = "TO DO: details!";
    aatrox.role = Role.Top;
    aatrox.civilization = Civilization.Darkness;
    aatrox.mode = Mode.Tank | Mode.ADC | Mode.PowerEngager;
    aatrox.addGoodAgainst(gangplank, toDoDescription);
    aatrox.addGoodAgainst(darius, toDoDescription);
    aatrox.addGoodAgainst(galio, toDoDescription);
    aatrox.addGoodWith(gnar, toDoDescription);
    aatrox.addGoodWith(yasuo, toDoDescription);
    aatrox.addGoodWith(azir, toDoDescription);
    ahri.role = Role.Middle;
    ahri.civilization = Civilization.Fire;
    ahri.mode = Mode.APC;
    ahri.addGoodAgainst(choGath, toDoDescription);
    ahri.addGoodAgainst(azir, toDoDescription);
    ahri.addGoodAgainst(viktor, toDoDescription);
    ahri.addGoodWith(jax, toDoDescription);
    ahri.addGoodWith(riven, toDoDescription);
    ahri.addGoodWith(irelia, toDoDescription);
    akali.role = Role.Middle;
    akali.civilization = Civilization.Fire;
    akali.mode = Mode.ADC | Mode.Burster | Mode.Sly | Mode.PowerEngager;
    akali.addGoodAgainst(nasus, toDoDescription);
    akali.addGoodAgainst(garen, toDoDescription);
    akali.addGoodAgainst(poppy, toDoDescription);
    akali.addGoodAgainst(aurelionSol, "Akali will get up in the face of Aurelion Sol and make it difficult for him to get off. She can hide in her shroud and to avoid being blasted away, as long as she makes sure to avoid his stars from revealing her position. Her ultimate can close the gap and so can her shuriken.");
    akali.addGoodWith(diana, toDoDescription);
    akali.addGoodWith(leBlanc, toDoDescription);
    akali.addGoodWith(katarina, toDoDescription);
    amumu.role = Role.Jungle;
    amumu.civilization = Civilization.Fire;
    amumu.mode = Mode.Tank | Mode.Utility | Mode.APC;
    amumu.addGoodAgainst(graves, toDoDescription);
    amumu.addGoodAgainst(shyvana, toDoDescription);
    amumu.addGoodAgainst(leeSin, toDoDescription);
    amumu.addGoodWith(katarina, toDoDescription);
    amumu.addGoodWith(fiddlesticks, toDoDescription);
    amumu.addGoodWith(morgana, toDoDescription);
    anivia.role = Role.Middle;
    anivia.civilization = Civilization.Water | Civilization.Nature;
    anivia.mode = Mode.APC;
    anivia.addGoodAgainst(kayle, toDoDescription);
    anivia.addGoodAgainst(azir, toDoDescription);
    anivia.addGoodAgainst(akali, toDoDescription);
    anivia.addGoodWith(jarvanIV, toDoDescription);
    anivia.addGoodWith(drMundo, toDoDescription);
    anivia.addGoodWith(vayne, toDoDescription);
    annie.role = Role.Middle;
    annie.civilization = Civilization.Fire;
    annie.mode = Mode.APC;
    annie.addGoodAgainst(diana, toDoDescription);
    annie.addGoodAgainst(jayce, toDoDescription);
    annie.addGoodAgainst(viktor, toDoDescription);
    annie.addGoodWith(jinx, toDoDescription);
    annie.addGoodWith(amumu, toDoDescription);
    annie.addGoodWith(lucian, toDoDescription);
    aphelios.role = Role.Bottom;
    aphelios.civilization = Civilization.Nature | Civilization.Water | Civilization.Light;
    aphelios.mode = Mode.ADC | Mode.Utility | Mode.SplitPusher | Mode.EpicKiller;
    ashe.role = Role.Bottom;
    ashe.civilization = Civilization.Water | Civilization.Light;
    ashe.mode = Mode.ADC;
    ashe.addGoodAgainst(corki, toDoDescription);
    ashe.addGoodAgainst(lucian, toDoDescription);
    ashe.addGoodAgainst(sivir, toDoDescription);
    ashe.addGoodWith(leona, toDoDescription);
    ashe.addGoodWith(janna, toDoDescription);
    ashe.addGoodWith(thresh, toDoDescription);
    aurelionSol.role = Role.Top | Role.Middle;
    aurelionSol.civilization = Civilization.Water | Civilization.Nature;
    aurelionSol.mode = Mode.APC;
    aurelionSol.addGoodAgainst(zoe, "Zoe wants to keep her distance? So does Aurelion Sol does too!");
    aurelionSol.addGoodAgainst(taliyah, "Taliyah can get Aurelion Sol in a bad position with her earth bump, but Aurelion Sol benefits from his stars as he can kit while dealing damage.");
    aurelionSol.addGoodAgainst(heimerdinger, "Heimerdinger's turrets cannot reach Aurelion Sol when his stars are outter-orbiting, Aurelion Sol does not need to get into the range of Heimerdinger's turrets to farm. Aurelion Sol can kit around easily while dealing damage with his stars, dodging any energized rays the turrets might throw at you, and his rockets, and his stun. Can easily escape from his ultimate sentry as well. ");
    aurelionSol.addGoodWith(morgana, "Morgana keeps the enemies at bay with her skillshot and ultimate. Spell shield may not be so useful on Aurelion Sol as it is not wise for him to get close to the enemies but can let him heard engage to clean up or chase down.");
    azir.role = Role.Middle;
    azir.civilization = Civilization.Nature | Civilization.Water;
    azir.mode = Mode.APC;
    azir.addGoodAgainst(yasuo, "Azir can ultimate away Yasuo if he gets too close. Be careful for his windshield when thrusting your soliders as it can halt their movement. Other than that, there should be no worry.");
    azir.addGoodAgainst(gangplank, "Azir's basic attack has no travel time, it is faster than Gangplank's gun, use this to destroy barrels before he can make them explode. Azir also like to keep his distance, so barrels should not be much of a problem as long as Azir can kit well.");
    azir.addGoodAgainst(heimerdinger, "Azir can send his soliders to clear Heimerdinger's turrets.");
    azir.addGoodWith(teemo, "Azir rather use his soliders to attack, Teemo's blind is ineffective. Teemo's shrooms can be annoying, Azir should equip himself with a red flare.");
    azir.addGoodWith(yasuo, "Azir can sending multiple enemies flying with his ultimate, perfect for Yasuo to follow up.");
    azir.addGoodWith(alistar, "Alistar will make Azir's life easier with his stuns and knockups. Alistar can push away enemies if they get too close or direct them into the soliders with a headbutt. He can also smash to send enemies flying which can be followed up with Azir's ultimate.");
    bard.role = Role.Support;
    bard.civilization = Civilization.Zero;
    bard.mode = Mode.Utility | Mode.APC;
    bard.addGoodAgainst(veigar, toDoDescription);
    bard.addGoodAgainst(nautilus, toDoDescription);
    bard.addGoodAgainst(braum, toDoDescription);
    bard.addGoodWith(sion, toDoDescription);
    bard.addGoodWith(heimerdinger, toDoDescription);
    bard.addGoodWith(jhin, toDoDescription);
    blitzcrank.role = Role.Support;
    blitzcrank.civilization = Civilization.Fire;
    blitzcrank.mode = Mode.Utility | Mode.APC;
    blitzcrank.addGoodAgainst(lux, toDoDescription);
    blitzcrank.addGoodAgainst(zyra, toDoDescription);
    blitzcrank.addGoodAgainst(nami, toDoDescription);
    blitzcrank.addGoodWith(jinx, toDoDescription);
    blitzcrank.addGoodWith(vayne, toDoDescription);
    blitzcrank.addGoodWith(ezreal, toDoDescription);
    brand.role = Role.Middle | Role.Support;
    brand.civilization = Civilization.Water | Civilization.Nature;
    brand.mode = Mode.Utility | Mode.APC;
    brand.addGoodAgainst(velKoz, toDoDescription);
    brand.addGoodAgainst(rakan, toDoDescription);
    brand.addGoodAgainst(braum, toDoDescription);
    brand.addGoodWith(amumu, toDoDescription);
    brand.addGoodWith(sona, toDoDescription);
    brand.addGoodWith(maokai, toDoDescription);
    braum.role = Role.Support;
    braum.civilization = Civilization.Zero;
    braum.mode = Mode.Utility | Mode.Tank;
    braum.addGoodAgainst(fiddlesticks, toDoDescription);
    braum.addGoodAgainst(karma, toDoDescription);
    braum.addGoodAgainst(lux, toDoDescription);
    braum.addGoodWith(lucian, toDoDescription);
    braum.addGoodWith(ezreal, toDoDescription);
    braum.addGoodWith(twitch, toDoDescription);
    caitlyn.role = Role.Bottom;
    caitlyn.civilization = Civilization.Water;
    caitlyn.mode = Mode.ADC;
    caitlyn.addGoodAgainst(ezreal, toDoDescription);
    caitlyn.addGoodAgainst(ziggs, toDoDescription);
    caitlyn.addGoodAgainst(xayah, toDoDescription);
    caitlyn.addGoodWith(leona, toDoDescription);
    caitlyn.addGoodWith(thresh, toDoDescription);
    caitlyn.addGoodWith(nami, toDoDescription);
    camille.role = Role.Top;
    camille.civilization = Civilization.Fire;
    camille.mode = Mode.Tank | Mode.ADC;
    camille.addGoodAgainst(cassiopeia, toDoDescription);
    camille.addGoodAgainst(garen, toDoDescription);
    camille.addGoodAgainst(drMundo, toDoDescription);
    camille.addGoodWith(bard, toDoDescription);
    camille.addGoodWith(thresh, toDoDescription);
    camille.addGoodWith(galio, toDoDescription);
    cassiopeia.role = Role.Middle;
    cassiopeia.civilization = Civilization.Water | Civilization.Nature;
    cassiopeia.mode = Mode.APC | Mode.Utility;
    cassiopeia.addGoodAgainst(ryze, toDoDescription);
    cassiopeia.addGoodAgainst(azir, toDoDescription);
    cassiopeia.addGoodAgainst(zed, toDoDescription);
    cassiopeia.addGoodWith(teemo, toDoDescription);
    cassiopeia.addGoodWith(singed, toDoDescription);
    cassiopeia.addGoodWith(yorick, toDoDescription);
    choGath.role = Role.Top | Role.Middle;
    choGath.civilization = Civilization.Nature;
    choGath.mode = Mode.Tank | Mode.APC | Mode.Utility | Mode.EpicKiller | Mode.Scaler;
    choGath.addGoodAgainst(galio, toDoDescription);
    choGath.addGoodAgainst(pantheon, toDoDescription);
    choGath.addGoodAgainst(gragas, toDoDescription);
    choGath.addGoodWith(yasuo, toDoDescription);
    choGath.addGoodWith(lulu, toDoDescription);
    choGath.addGoodWith(aatrox, toDoDescription);
    corki.role = Role.Bottom;
    corki.civilization = Civilization.Fire | Civilization.Water;
    corki.mode = Mode.ADC;
    corki.addGoodAgainst(diana, toDoDescription);
    corki.addGoodAgainst(ryze, toDoDescription);
    corki.addGoodAgainst(ziggs, toDoDescription);
    corki.addGoodWith(leona, toDoDescription);
    corki.addGoodWith(thresh, toDoDescription);
    corki.addGoodWith(blitzcrank, toDoDescription);
    darius.role = Role.Top;
    darius.mode = Mode.ADC | Mode.Tank;
    darius.addGoodAgainst(nautilus, toDoDescription);
    darius.addGoodAgainst(galio, toDoDescription);
    darius.addGoodAgainst(choGath, toDoDescription);
    darius.addGoodWith(draven, toDoDescription);
    darius.addGoodWith(olaf, toDoDescription);
    darius.addGoodWith(fiora, toDoDescription);
    diana.role = Role.Middle;
    diana.mode = Mode.APC;
    diana.addGoodAgainst(zed, toDoDescription);
    diana.addGoodAgainst(leBlanc, toDoDescription);
    diana.addGoodAgainst(lux, toDoDescription);
    diana.addGoodAgainst(aurelionSol, "");
    diana.addGoodWith(akali, toDoDescription);
    diana.addGoodWith(yasuo, toDoDescription);
    diana.addGoodWith(kassadin, toDoDescription);
    drMundo.role = Role.Top | Role.Jungle;
    drMundo.mode = Mode.Tank;
    drMundo.addGoodAgainst(darius, toDoDescription);
    drMundo.addGoodAgainst(teemo, toDoDescription);
    drMundo.addGoodAgainst(irelia, toDoDescription);
    drMundo.addGoodWith(anivia, toDoDescription);
    drMundo.addGoodWith(olaf, toDoDescription);
    drMundo.addGoodWith(jax, toDoDescription);
    draven.role = Role.Bottom;
    draven.mode = Mode.ADC;
    draven.addGoodAgainst(corki, toDoDescription);
    draven.addGoodAgainst(sivir, toDoDescription);
    draven.addGoodAgainst(lucian, toDoDescription);
    draven.addGoodWith(thresh, toDoDescription);
    draven.addGoodWith(darius, toDoDescription);
    draven.addGoodWith(leona, toDoDescription);
    ekko.role = Role.Middle | Role.Jungle;
    ekko.mode = Mode.Tank | Mode.APC;
    ekko.addGoodAgainst(azir, toDoDescription);
    ekko.addGoodAgainst(karma, toDoDescription);
    ekko.addGoodAgainst(zed, toDoDescription);
    ekko.addGoodWith(galio, toDoDescription);
    ekko.addGoodWith(bard, toDoDescription);
    ekko.addGoodWith(lulu, toDoDescription);
    elise.role = Role.Jungle;
    elise.mode = Mode.APC | Mode.Utility;
    elise.addGoodAgainst(choGath, toDoDescription);
    elise.addGoodAgainst(rekSai, toDoDescription);
    elise.addGoodAgainst(udyr, toDoDescription);
    elise.addGoodWith(rengar, toDoDescription);
    elise.addGoodWith(blitzcrank, toDoDescription);
    elise.addGoodWith(karma, toDoDescription);
    evelynn.role = Role.Jungle;
    evelynn.mode = Mode.ADC | Mode.Burster | Mode.Sly;
    evelynn.addGoodAgainst(graves, toDoDescription);
    evelynn.addGoodAgainst(skarner, toDoDescription);
    evelynn.addGoodAgainst(nidalee, toDoDescription);
    evelynn.addGoodWith(choGath, toDoDescription);
    evelynn.addGoodWith(shen, toDoDescription);
    evelynn.addGoodWith(orianna, toDoDescription);
    ezreal.role = Role.Bottom;
    ezreal.addGoodAgainst(varus, toDoDescription);
    ezreal.addGoodAgainst(lucian, toDoDescription);
    ezreal.addGoodAgainst(kalista, toDoDescription);
    ezreal.addGoodWith(sona, toDoDescription);
    ezreal.addGoodWith(taric, toDoDescription);
    ezreal.addGoodWith(leona, toDoDescription);
    fiddlesticks.role = Role.Support | Role.Jungle;
    fiddlesticks.addGoodAgainst(graves, toDoDescription);
    fiddlesticks.addGoodAgainst(amumu, toDoDescription);
    fiddlesticks.addGoodAgainst(rekSai, toDoDescription);
    fiddlesticks.addGoodWith(amumu, toDoDescription);
    fiddlesticks.addGoodWith(galio, toDoDescription);
    fiddlesticks.addGoodWith(kennen, toDoDescription);
    fiora.role = Role.Top;
    fiora.addGoodAgainst(galio, toDoDescription);
    fiora.addGoodAgainst(choGath, toDoDescription);
    fiora.addGoodAgainst(nautilus, toDoDescription);
    fiora.addGoodWith(darius, toDoDescription);
    fiora.addGoodWith(volibear, toDoDescription);
    fiora.addGoodWith(ahri, toDoDescription);
    fizz.role = Role.Middle;
    fizz.addGoodAgainst(ryze, toDoDescription);
    fizz.addGoodAgainst(aurelionSol, toDoDescription);
    fizz.addGoodAgainst(syndra, toDoDescription);
    fizz.addGoodWith(talon, toDoDescription);
    fizz.addGoodWith(amumu, toDoDescription);
    fizz.addGoodWith(nami, toDoDescription);
    galio.role = Role.Top;
    galio.addGoodAgainst(drMundo, toDoDescription);
    galio.addGoodAgainst(poppy, toDoDescription);
    galio.addGoodAgainst(mordekaiser, toDoDescription);
    galio.addGoodWith(katarina, toDoDescription);
    galio.addGoodWith(wukong, toDoDescription);
    galio.addGoodWith(nunu, toDoDescription);
    gangplank.role = Role.Top;
    gangplank.addGoodAgainst(lissandra, toDoDescription);
    gangplank.addGoodAgainst(galio, toDoDescription);
    gangplank.addGoodAgainst(shen, toDoDescription);
    gangplank.addGoodWith(amumu, toDoDescription);
    gangplank.addGoodWith(nunu, toDoDescription);
    gangplank.addGoodWith(twistedFate, toDoDescription);
    garen.role = Role.Top;
    garen.addGoodAgainst(malphite, toDoDescription);
    garen.addGoodAgainst(shen, toDoDescription);
    garen.addGoodAgainst(gangplank, toDoDescription);
    garen.addGoodWith(lux, toDoDescription);
    garen.addGoodWith(darius, toDoDescription);
    garen.addGoodWith(aatrox, toDoDescription);
    gnar.role = Role.Top;
    gnar.addGoodAgainst(garen, toDoDescription);
    gnar.addGoodAgainst(yorick, toDoDescription);
    gnar.addGoodAgainst(xinZhao, toDoDescription);
    gnar.addGoodWith(aatrox, toDoDescription);
    gnar.addGoodWith(jarvanIV, toDoDescription);
    gnar.addGoodWith(braum, toDoDescription);
    gragas.role = Role.Jungle;
    gragas.addGoodAgainst(diana, toDoDescription);
    gragas.addGoodAgainst(leeSin, toDoDescription);
    gragas.addGoodAgainst(udyr, toDoDescription);
    gragas.addGoodWith(ashe, toDoDescription);
    gragas.addGoodWith(malphite, toDoDescription);
    gragas.addGoodWith(yasuo, toDoDescription);
    graves.role = Role.Middle | Role.Jungle;
    graves.addGoodAgainst(shyvana, toDoDescription);
    graves.addGoodAgainst(olaf, toDoDescription);
    graves.addGoodAgainst(xinZhao, toDoDescription);
    graves.addGoodWith(taric, toDoDescription);
    graves.addGoodWith(leona, toDoDescription);
    graves.addGoodWith(thresh, toDoDescription);
    hecarim.role = Role.Jungle;
    hecarim.addGoodAgainst(wukong, toDoDescription);
    hecarim.addGoodAgainst(graves, toDoDescription);
    hecarim.addGoodAgainst(rekSai, toDoDescription);
    hecarim.addGoodWith(orianna, toDoDescription);
    hecarim.addGoodWith(zilean, toDoDescription);
    hecarim.addGoodWith(malphite, toDoDescription);
    heimerdinger.role = Role.Middle | Role.Bottom;
    heimerdinger.addGoodAgainst(illaoi, toDoDescription);
    heimerdinger.addGoodAgainst(camille, toDoDescription);
    heimerdinger.addGoodAgainst(shen, toDoDescription);
    heimerdinger.addGoodWith(blitzcrank, toDoDescription);
    heimerdinger.addGoodWith(thresh, toDoDescription);
    heimerdinger.addGoodWith(vi, toDoDescription);
    illaoi.role = Role.Top;
    illaoi.addGoodAgainst(galio, toDoDescription);
    illaoi.addGoodAgainst(shen, toDoDescription);
    illaoi.addGoodAgainst(jayce, toDoDescription);
    illaoi.addGoodWith(galio, toDoDescription);
    illaoi.addGoodWith(camille, toDoDescription);
    illaoi.addGoodWith(lulu, toDoDescription);
    irelia.role = Role.Top | Role.Middle;
    irelia.addGoodAgainst(nasus, toDoDescription);
    irelia.addGoodAgainst(poppy, toDoDescription);
    irelia.addGoodAgainst(rengar, toDoDescription);
    irelia.addGoodWith(riven, toDoDescription);
    irelia.addGoodWith(ahri, toDoDescription);
    irelia.addGoodWith(malphite, toDoDescription);
    ivern.role = Role.Jungle;
    ivern.addGoodAgainst(udyr, toDoDescription);
    ivern.addGoodAgainst(fiddlesticks, toDoDescription);
    ivern.addGoodAgainst(shyvana, toDoDescription);
    ivern.addGoodWith(yasuo, toDoDescription);
    ivern.addGoodWith(xayah, toDoDescription);
    ivern.addGoodWith(riven, toDoDescription);
    janna.role = Role.Support;
    janna.addGoodAgainst(annie, toDoDescription);
    janna.addGoodAgainst(nautilus, toDoDescription);
    janna.addGoodAgainst(taric, toDoDescription);
    janna.addGoodWith(yasuo, toDoDescription);
    janna.addGoodWith(draven, toDoDescription);
    janna.addGoodWith(ashe, toDoDescription);
    jarvanIV.role = Role.Jungle;
    jarvanIV.addGoodAgainst(rekSai, toDoDescription);
    jarvanIV.addGoodAgainst(olaf, toDoDescription);
    jarvanIV.addGoodAgainst(xinZhao, toDoDescription);
    jarvanIV.addGoodWith(orianna, toDoDescription);
    jarvanIV.addGoodWith(gnar, toDoDescription);
    jarvanIV.addGoodWith(katarina, toDoDescription);
    jax.role = Role.Top;
    jax.addGoodAgainst(tahmKench, toDoDescription);
    jax.addGoodAgainst(nautilus, toDoDescription);
    jax.addGoodAgainst(ekko, toDoDescription);
    jax.addGoodWith(ahri, toDoDescription);
    jax.addGoodWith(pantheon, toDoDescription);
    jax.addGoodWith(teemo, toDoDescription);
    jayce.role = Role.Top;
    jayce.addGoodAgainst(drMundo, toDoDescription);
    jayce.addGoodAgainst(urgot, toDoDescription);
    jayce.addGoodAgainst(cassiopeia, toDoDescription);
    jayce.addGoodWith(nidalee, toDoDescription);
    jayce.addGoodWith(skarner, toDoDescription);
    jayce.addGoodWith(leona, toDoDescription);
    jhin.role = Role.Bottom;
    jhin.addGoodAgainst(ezreal, toDoDescription);
    jhin.addGoodAgainst(corki, toDoDescription);
    jhin.addGoodAgainst(lucian, toDoDescription);
    jhin.addGoodWith(leona, toDoDescription);
    jhin.addGoodWith(bard, toDoDescription);
    jhin.addGoodWith(thresh, toDoDescription);
    jinx.role = Role.Bottom;
    jinx.addGoodAgainst(sivir, toDoDescription);
    jinx.addGoodAgainst(kalista, toDoDescription);
    jinx.addGoodAgainst(ashe, toDoDescription);
    jinx.addGoodWith(leona, toDoDescription);
    jinx.addGoodWith(blitzcrank, toDoDescription);
    jinx.addGoodWith(thresh, toDoDescription);
    kaiSa.role = Role.Bottom;
    kaiSa.addGoodAgainst(corki, toDoDescription);
    kaiSa.addGoodAgainst(kalista, toDoDescription);
    kaiSa.addGoodAgainst(ashe, toDoDescription);
    kaiSa.addGoodWith(leona, toDoDescription);
    kaiSa.addGoodWith(thresh, toDoDescription);
    kaiSa.addGoodWith(zac, toDoDescription);
    kalista.role = Role.Bottom;
    kalista.addGoodAgainst(corki, toDoDescription);
    kalista.addGoodAgainst(lucian, toDoDescription);
    kalista.addGoodAgainst(varus, toDoDescription);
    kalista.addGoodWith(tahmKench, toDoDescription);
    kalista.addGoodWith(alistar, toDoDescription);
    kalista.addGoodWith(thresh, toDoDescription);
    karma.role = Role.Middle | Role.Support;
    karma.addGoodAgainst(veigar, toDoDescription);
    karma.addGoodAgainst(zilean, toDoDescription);
    karma.addGoodAgainst(morgana, toDoDescription);
    karma.addGoodWith(jinx, toDoDescription);
    karma.addGoodWith(ezreal, toDoDescription);
    karma.addGoodWith(vayne, toDoDescription);
    karthus.role = Role.Middle | Role.Jungle;
    karthus.addGoodAgainst(yasuo, toDoDescription);
    karthus.addGoodAgainst(twistedFate, toDoDescription);
    karthus.addGoodAgainst(kassadin, toDoDescription);
    karthus.addGoodWith(kayle, toDoDescription);
    karthus.addGoodWith(amumu, toDoDescription);
    karthus.addGoodWith(yorick, toDoDescription);
    kassadin.role = Role.Middle;
    kassadin.addGoodAgainst(azir, "Kassadin can close the gap between Azir and him very easily with his ultimate. If Azir uses his ultimate to get Kassadin off, Kassadin can use his ultimate again after a short delay to teleport right back to him.");
    kassadin.addGoodAgainst(karma, toDoDescription);
    kassadin.addGoodAgainst(leBlanc, toDoDescription);
    kassadin.addGoodAgainst(aurelionSol, "Kassadin will get near Aurelion Sol, exactly what he does not want. He also has a mage shield protecting his from some star damage. Kassadin will usually stay within the inner-layer of stars, so Aurelion Sol better be running!");
    kassadin.addGoodWith(diana, toDoDescription);
    kassadin.addGoodWith(ahri, toDoDescription);
    kassadin.addGoodWith(leeSin, toDoDescription);
    katarina.role = Role.Middle;
    katarina.addGoodAgainst(ryze, toDoDescription);
    katarina.addGoodAgainst(syndra, toDoDescription);
    katarina.addGoodWith(amumu, toDoDescription);
    katarina.addGoodWith(galio, toDoDescription);
    katarina.addGoodWith(morgana, toDoDescription);
    kayle.role = Role.Top;
    kayle.addGoodAgainst(garen, toDoDescription);
    kayle.addGoodAgainst(poppy, toDoDescription);
    kayle.addGoodAgainst(galio, toDoDescription);
    kayle.addGoodWith(ezreal, toDoDescription);
    kayle.addGoodWith(katarina, toDoDescription);
    kayle.addGoodWith(karthus, toDoDescription);
    kennen.role = Role.Top;
    kennen.addGoodAgainst(shen, toDoDescription);
    kennen.addGoodAgainst(quinn, toDoDescription);
    kennen.addGoodAgainst(mordekaiser, toDoDescription);
    kennen.addGoodWith(amumu, toDoDescription);
    kennen.addGoodWith(vladimir, toDoDescription);
    kennen.addGoodWith(fiddlesticks, toDoDescription);
    khaZix.role = Role.Jungle;
    khaZix.addGoodAgainst(diana, toDoDescription);
    khaZix.addGoodAgainst(graves, toDoDescription);
    khaZix.addGoodAgainst(olaf, toDoDescription);
    khaZix.addGoodWith(rengar, toDoDescription);
    khaZix.addGoodWith(xinZhao, toDoDescription);
    khaZix.addGoodWith(nasus, toDoDescription);
    kindred.role = Role.Jungle;
    kindred.addGoodAgainst(rekSai, toDoDescription);
    kindred.addGoodAgainst(xinZhao, toDoDescription);
    kindred.addGoodAgainst(fiddlesticks, toDoDescription);
    kindred.addGoodWith(galio, toDoDescription);
    kindred.addGoodWith(sion, toDoDescription);
    kindred.addGoodWith(zed, toDoDescription);
    kled.role = Role.Top;
    kled.addGoodAgainst(rengar, toDoDescription);
    kled.addGoodAgainst(choGath, toDoDescription);
    kled.addGoodAgainst(quinn, toDoDescription);
    kled.addGoodAgainst(azir, "Kled can completely destroy Azir with his ultimate or if he lands a pull with his hook. Kled's ultimate cannot be stopped, so Azir must get out of the way before it's too late.");
    kled.addGoodWith(galio, toDoDescription);
    kled.addGoodWith(camille, toDoDescription);
    kled.addGoodWith(masterYi, toDoDescription);
    kogMaw.role = Role.Bottom;
    kogMaw.addGoodAgainst(corki, toDoDescription);
    kogMaw.addGoodAgainst(jhin, toDoDescription);
    kogMaw.addGoodAgainst(lucian, toDoDescription);
    kogMaw.addGoodWith(nunu, toDoDescription);
    kogMaw.addGoodWith(lulu, toDoDescription);
    kogMaw.addGoodWith(nami, toDoDescription);
    leBlanc.role = Role.Middle;
    leBlanc.addGoodAgainst(ryze, toDoDescription);
    leBlanc.addGoodAgainst(karma, toDoDescription);
    leBlanc.addGoodAgainst(lux, toDoDescription);
    leBlanc.addGoodAgainst(viktor, "LeBlanc can get in and out very quickly. Viktor won't be able to land a stun with his gravitational field and landing his laser can be difficult when facinh a flashy enemy.");
    leBlanc.addGoodWith(akali, toDoDescription);
    leBlanc.addGoodWith(veigar, toDoDescription);
    leBlanc.addGoodWith(alistar, toDoDescription);
    leeSin.role = Role.Jungle;
    leeSin.addGoodAgainst(choGath, toDoDescription);
    leeSin.addGoodAgainst(aatrox, toDoDescription);
    leeSin.addGoodAgainst(rengar, toDoDescription);
    leeSin.addGoodWith(yasuo, toDoDescription);
    leeSin.addGoodWith(teemo, toDoDescription);
    leeSin.addGoodWith(aatrox, toDoDescription);
    leona.role = Role.Support;
    leona.addGoodAgainst(lux, toDoDescription);
    leona.addGoodAgainst(lulu, toDoDescription);
    leona.addGoodAgainst(nami, toDoDescription);
    leona.addGoodWith(jhin, toDoDescription);
    leona.addGoodWith(draven, toDoDescription);
    leona.addGoodWith(xayah, toDoDescription);
    lissandra.role = Role.Middle;
    lissandra.addGoodAgainst(veigar, toDoDescription);
    lissandra.addGoodAgainst(leBlanc, toDoDescription);
    lissandra.addGoodAgainst(cassiopeia, toDoDescription);
    lissandra.addGoodWith(sejuani, toDoDescription);
    lissandra.addGoodWith(trundle, toDoDescription);
    lissandra.addGoodWith(amumu, toDoDescription);
    lucian.role = Role.Bottom;
    lucian.addGoodAgainst(ezreal, toDoDescription);
    lucian.addGoodAgainst(vayne, toDoDescription);
    lucian.addGoodAgainst(corki, toDoDescription);
    lucian.addGoodWith(braum, toDoDescription);
    lucian.addGoodWith(thresh, toDoDescription);
    lucian.addGoodWith(leona, toDoDescription);
    lulu.role = Role.Support;
    lulu.addGoodAgainst(lux, toDoDescription);
    lulu.addGoodAgainst(rakan, toDoDescription);
    lulu.addGoodAgainst(annie, toDoDescription);
    lulu.addGoodWith(vayne, toDoDescription);
    lulu.addGoodWith(caitlyn, toDoDescription);
    lulu.addGoodWith(ezreal, toDoDescription);
    lux.role = Role.Middle;
    lux.addGoodAgainst(ryze, toDoDescription);
    lux.addGoodAgainst(galio, toDoDescription);
    lux.addGoodAgainst(akali, toDoDescription);
    lux.addGoodWith(ezreal, toDoDescription);
    lux.addGoodWith(garen, toDoDescription);
    lux.addGoodWith(jinx, toDoDescription);
    malphite.role = Role.Top;
    malphite.addGoodAgainst(nautilus, toDoDescription);
    malphite.addGoodAgainst(poppy, toDoDescription);
    malphite.addGoodAgainst(irelia, toDoDescription);
    malphite.addGoodWith(yasuo, toDoDescription);
    malphite.addGoodWith(orianna, toDoDescription);
    malphite.addGoodWith(katarina, toDoDescription);
    malzahar.role = Role.Middle;
    malzahar.addGoodAgainst(akali, toDoDescription);
    malzahar.addGoodAgainst(karma, toDoDescription);
    malzahar.addGoodAgainst(vladimir, toDoDescription);
    malzahar.addGoodWith(warwick, toDoDescription);
    malzahar.addGoodWith(amumu, toDoDescription);
    malzahar.addGoodWith(jarvanIV, toDoDescription);
    maokai.role = Role.Top;
    maokai.addGoodAgainst(shen, toDoDescription);
    maokai.addGoodAgainst(gragas, toDoDescription);
    maokai.addGoodAgainst(kled, toDoDescription);
    maokai.addGoodWith(ryze, toDoDescription);
    maokai.addGoodWith(vladimir, toDoDescription);
    maokai.addGoodWith(swain, toDoDescription);
    masterYi.role = Role.Jungle;
    masterYi.addGoodAgainst(trundle, toDoDescription);
    masterYi.addGoodAgainst(diana, toDoDescription);
    masterYi.addGoodAgainst(wukong, toDoDescription);
    masterYi.addGoodWith(ashe, toDoDescription);
    masterYi.addGoodWith(aatrox, toDoDescription);
    masterYi.addGoodWith(ahri, toDoDescription);
    missFortune.role = Role.Bottom;
    missFortune.addGoodAgainst(corki, toDoDescription);
    missFortune.addGoodAgainst(ezreal, toDoDescription);
    missFortune.addGoodAgainst(xayah, toDoDescription);
    missFortune.addGoodWith(sona, toDoDescription);
    missFortune.addGoodWith(leona, toDoDescription);
    missFortune.addGoodWith(blitzcrank, toDoDescription);
    mordekaiser.role = Role.Top;
    mordekaiser.addGoodAgainst(shen, toDoDescription);
    mordekaiser.addGoodAgainst(malphite, toDoDescription);
    mordekaiser.addGoodAgainst(irelia, toDoDescription);
    mordekaiser.addGoodWith(yorick, toDoDescription);
    mordekaiser.addGoodWith(malphite, toDoDescription);
    mordekaiser.addGoodWith(wukong, toDoDescription);
    morgana.role = Role.Support;
    morgana.addGoodAgainst(veigar, toDoDescription);
    morgana.addGoodAgainst(lux, toDoDescription);
    morgana.addGoodAgainst(rakan, toDoDescription);
    morgana.addGoodWith(jinx, toDoDescription);
    morgana.addGoodWith(caitlyn, toDoDescription);
    morgana.addGoodWith(varus, toDoDescription);
    nami.role = Role.Support;
    nami.addGoodAgainst(trundle, toDoDescription);
    nami.addGoodAgainst(lux, toDoDescription);
    nami.addGoodAgainst(rakan, toDoDescription);
    nami.addGoodWith(vayne, toDoDescription);
    nami.addGoodWith(jinx, toDoDescription);
    nami.addGoodWith(caitlyn, toDoDescription);
    nasus.role = Role.Top;
    nasus.addGoodAgainst(galio, toDoDescription);
    nasus.addGoodAgainst(malphite, toDoDescription);
    nasus.addGoodAgainst(poppy, toDoDescription);
    nasus.addGoodWith(renekton, toDoDescription);
    nasus.addGoodWith(zed, toDoDescription);
    nasus.addGoodWith(khaZix, toDoDescription);
    nautilus.role = Role.Top | Role.Support;
    nautilus.addGoodAgainst(karma, toDoDescription);
    nautilus.addGoodAgainst(brand, toDoDescription);
    nautilus.addGoodAgainst(leona, toDoDescription);
    nautilus.addGoodWith(yasuo, toDoDescription);
    nautilus.addGoodWith(draven, toDoDescription);
    nautilus.addGoodWith(ezreal, toDoDescription);
    neeko.role = Role.Middle;
    neeko.addGoodAgainst(leeSin, toDoDescription);
    neeko.addGoodAgainst(rengar, toDoDescription);
    neeko.addGoodAgainst(rekSai, toDoDescription);
    neeko.addGoodWith(morgana, toDoDescription);
    neeko.addGoodWith(katarina, toDoDescription);
    neeko.addGoodWith(fiddlesticks, toDoDescription);
    nidalee.role = Role.Jungle;
    nidalee.addGoodAgainst(graves, toDoDescription);
    nidalee.addGoodAgainst(rengar, toDoDescription);
    nidalee.addGoodAgainst(rekSai, toDoDescription);
    nidalee.addGoodWith(caitlyn, toDoDescription);
    nidalee.addGoodWith(varus, toDoDescription);
    nidalee.addGoodWith(jayce, toDoDescription);
    nocturne.role = Role.Jungle;
    nocturne.addGoodAgainst(rengar, toDoDescription);
    nocturne.addGoodAgainst(pantheon, toDoDescription);
    nocturne.addGoodAgainst(sejuani, toDoDescription);
    nocturne.addGoodWith(twistedFate, toDoDescription);
    nocturne.addGoodWith(shen, toDoDescription);
    nocturne.addGoodWith(rengar, toDoDescription);
    nunu.role = Role.Jungle;
    nunu.addGoodAgainst(graves, toDoDescription);
    nunu.addGoodAgainst(skarner, toDoDescription);
    nunu.addGoodAgainst(shyvana, toDoDescription);
    nunu.addGoodWith(vayne, toDoDescription);
    nunu.addGoodWith(kogMaw, toDoDescription);
    nunu.addGoodWith(caitlyn, toDoDescription);
    olaf.role = Role.Jungle;
    olaf.addGoodAgainst(fiddlesticks, toDoDescription);
    olaf.addGoodAgainst(hecarim, toDoDescription);
    olaf.addGoodAgainst(shaco, toDoDescription);
    olaf.addGoodWith(darius, toDoDescription);
    olaf.addGoodWith(blitzcrank, toDoDescription);
    olaf.addGoodWith(aatrox, toDoDescription);
    orianna.role = Role.Middle;
    orianna.addGoodAgainst(ryze, toDoDescription);
    orianna.addGoodAgainst(gangplank, toDoDescription);
    orianna.addGoodAgainst(diana, toDoDescription);
    orianna.addGoodWith(malphite, toDoDescription);
    orianna.addGoodWith(yasuo, toDoDescription);
    orianna.addGoodWith(jarvanIV, toDoDescription);
    ornn.role = Role.Top | Role.Middle | Role.Support | Role.Jungle;
    ornn.mode = Mode.Tank | Mode.Utility | Mode.ADC;
    ornn.addGoodAgainst(galio, toDoDescription);
    ornn.addGoodAgainst(malphite, toDoDescription);
    ornn.addGoodAgainst(shen, toDoDescription);
    ornn.addGoodWith(janna, toDoDescription);
    ornn.addGoodWith(lulu, toDoDescription);
    ornn.addGoodWith(thresh, toDoDescription);
    pantheon.role = Role.Top | Role.Jungle;
    pantheon.addGoodAgainst(drMundo, toDoDescription);
    pantheon.addGoodAgainst(nasus, toDoDescription);
    pantheon.addGoodAgainst(nautilus, toDoDescription);
    pantheon.addGoodWith(taric, toDoDescription);
    pantheon.addGoodWith(jax, toDoDescription);
    pantheon.addGoodWith(sion, toDoDescription);
    poppy.role = Role.Top;
    poppy.addGoodAgainst(illaoi, toDoDescription);
    poppy.addGoodAgainst(olaf, toDoDescription);
    poppy.addGoodAgainst(kled, toDoDescription);
    poppy.addGoodWith(sion, toDoDescription);
    poppy.addGoodWith(vayne, toDoDescription);
    poppy.addGoodWith(choGath, toDoDescription);
    pyke.role = Role.Bottom;
    pyke.addGoodAgainst(velKoz, toDoDescription);
    pyke.addGoodAgainst(zoe, toDoDescription);
    pyke.addGoodAgainst(annie, toDoDescription);
    pyke.addGoodWith(missFortune, toDoDescription);
    pyke.addGoodWith(jhin, toDoDescription);
    pyke.addGoodWith(kaiSa, toDoDescription);
    qiyana.role = Role.Middle | Role.Jungle;
    qiyana.addGoodAgainst(xerath, toDoDescription);
    qiyana.addGoodAgainst(viktor, toDoDescription);
    qiyana.addGoodAgainst(neeko, toDoDescription);
    quinn.role = Role.Top;
    quinn.addGoodAgainst(tryndamere, toDoDescription);
    quinn.addGoodAgainst(jax, toDoDescription);
    quinn.addGoodAgainst(renekton, toDoDescription);
    quinn.addGoodWith(leona, toDoDescription);
    quinn.addGoodWith(thresh, toDoDescription);
    quinn.addGoodWith(nami, toDoDescription);
    rakan.role = Role.Support;
    rakan.addGoodAgainst(lux, toDoDescription);
    rakan.addGoodAgainst(karma, toDoDescription);
    rakan.addGoodAgainst(tahmKench, toDoDescription);
    rakan.addGoodWith(xayah, toDoDescription);
    rakan.addGoodWith(missFortune, toDoDescription);
    rakan.addGoodWith(jhin, toDoDescription);
    rengar.role = Role.Jungle;
    rengar.addGoodAgainst(shyvana, toDoDescription);
    rengar.addGoodAgainst(vi, toDoDescription);
    rengar.addGoodAgainst(evelynn, toDoDescription);
    rengar.addGoodWith(khaZix, toDoDescription);
    rengar.addGoodWith(orianna, toDoDescription);
    rengar.addGoodWith(elise, toDoDescription);
    riven.role = Role.Top;
    riven.addGoodAgainst(volibear, toDoDescription);
    riven.addGoodAgainst(tahmKench, toDoDescription);
    riven.addGoodAgainst(galio, toDoDescription);
    riven.addGoodWith(irelia, toDoDescription);
    riven.addGoodWith(yasuo, toDoDescription);
    riven.addGoodWith(ahri, toDoDescription);
    rumble.role = Role.Top;
    rumble.addGoodAgainst(drMundo, toDoDescription);
    rumble.addGoodAgainst(nasus, toDoDescription);
    rumble.addGoodAgainst(malphite, toDoDescription);
    rumble.addGoodWith(jarvanIV, toDoDescription);
    rumble.addGoodWith(amumu, toDoDescription);
    rumble.addGoodWith(sona, toDoDescription);
    ryze.role = Role.Top;
    ryze.addGoodAgainst(ekko, toDoDescription);
    ryze.addGoodAgainst(corki, toDoDescription);
    ryze.addGoodAgainst(kassadin, toDoDescription);
    ryze.addGoodWith(maokai, toDoDescription);
    ryze.addGoodWith(jax, toDoDescription);
    ryze.addGoodWith(ahri, toDoDescription);
    sejuani.role = Role.Jungle;
    sejuani.addGoodAgainst(rammus, toDoDescription);
    sejuani.addGoodAgainst(shyvana, toDoDescription);
    sejuani.addGoodAgainst(volibear, toDoDescription);
    sejuani.addGoodWith(lissandra, toDoDescription);
    sejuani.addGoodWith(talon, toDoDescription);
    sejuani.addGoodWith(katarina, toDoDescription);
    senna.role = Role.Bottom | Role.Support;
    senna.addGoodAgainst(janna, toDoDescription);
    senna.addGoodAgainst(bard, toDoDescription);
    senna.addGoodWith(lucian, toDoDescription);
    senna.addGoodWith(jhin, toDoDescription);
    senna.addGoodWith(vayne, toDoDescription);
    sett.role = Role.Top;
    sett.addGoodAgainst(yasuo, toDoDescription);
    sett.addGoodAgainst(camille, toDoDescription);
    shaco.role = Role.Jungle;
    shaco.addGoodAgainst(udyr, toDoDescription);
    shaco.addGoodAgainst(graves, toDoDescription);
    shaco.addGoodAgainst(jax, toDoDescription);
    shaco.addGoodWith(galio, toDoDescription);
    shaco.addGoodWith(bard, toDoDescription);
    shaco.addGoodWith(talon, toDoDescription);
    shen.role = Role.Top;
    shen.addGoodAgainst(tahmKench, toDoDescription);
    shen.addGoodAgainst(rengar, toDoDescription);
    shen.addGoodAgainst(gragas, toDoDescription);
    shen.addGoodWith(twistedFate, toDoDescription);
    shen.addGoodWith(zed, toDoDescription);
    shen.addGoodWith(akali, toDoDescription);
    shyvana.role = Role.Jungle;
    shyvana.addGoodAgainst(nocturne, toDoDescription);
    shyvana.addGoodAgainst(leeSin, toDoDescription);
    shyvana.addGoodAgainst(hecarim, toDoDescription);
    shyvana.addGoodWith(yasuo, toDoDescription);
    shyvana.addGoodWith(shen, toDoDescription);
    shyvana.addGoodWith(nautilus, toDoDescription);
    singed.role = Role.Top;
    singed.addGoodAgainst(shen, toDoDescription);
    singed.addGoodAgainst(jax, toDoDescription);
    singed.addGoodAgainst(illaoi, toDoDescription);
    singed.addGoodWith(cassiopeia, toDoDescription);
    singed.addGoodWith(volibear, toDoDescription);
    singed.addGoodWith(teemo, toDoDescription);
    sion.role = Role.Top;
    sion.addGoodAgainst(illaoi, toDoDescription);
    sion.addGoodAgainst(nasus, toDoDescription);
    sion.addGoodAgainst(shen, toDoDescription);
    sion.addGoodWith(pantheon, toDoDescription);
    sion.addGoodWith(poppy, toDoDescription);
    sion.addGoodWith(talon, toDoDescription);
    sivir.role = Role.Bottom;
    sivir.addGoodAgainst(ezreal, toDoDescription);
    sivir.addGoodAgainst(xayah, toDoDescription);
    sivir.addGoodAgainst(lucian, toDoDescription);
    sivir.addGoodWith(leona, toDoDescription);
    sivir.addGoodWith(soraka, toDoDescription);
    sivir.addGoodWith(taric, toDoDescription);
    skarner.role = Role.Jungle;
    skarner.addGoodAgainst(nocturne, toDoDescription);
    skarner.addGoodAgainst(olaf, toDoDescription);
    skarner.addGoodAgainst(shaco, toDoDescription);
    skarner.addGoodWith(jayce, toDoDescription);
    skarner.addGoodWith(heimerdinger, toDoDescription);
    skarner.addGoodWith(thresh, toDoDescription);
    sona.role = Role.Support;
    sona.addGoodAgainst(karma, toDoDescription);
    sona.addGoodAgainst(velKoz, toDoDescription);
    sona.addGoodAgainst(lulu, toDoDescription);
    sona.addGoodWith(ezreal, toDoDescription);
    sona.addGoodWith(missFortune, toDoDescription);
    sona.addGoodWith(caitlyn, toDoDescription);
    soraka.role = Role.Support;
    soraka.addGoodAgainst(veigar, toDoDescription);
    soraka.addGoodAgainst(morgana, toDoDescription);
    soraka.addGoodAgainst(velKoz, toDoDescription);
    soraka.addGoodWith(ezreal, toDoDescription);
    soraka.addGoodWith(sivir, toDoDescription);
    soraka.addGoodWith(urgot, toDoDescription);
    swain.role = Role.Top;
    swain.addGoodAgainst(illaoi, toDoDescription);
    swain.addGoodAgainst(shen, toDoDescription);
    swain.addGoodAgainst(garen, toDoDescription);
    swain.addGoodWith(vladimir, toDoDescription);
    swain.addGoodWith(maokai, toDoDescription);
    swain.addGoodWith(alistar, toDoDescription);
    sylas.role = Role.Middle;
    sylas.addGoodAgainst(zoe, toDoDescription);
    sylas.addGoodAgainst(xerath, toDoDescription);
    sylas.addGoodAgainst(swain, toDoDescription);
    syndra.role = Role.Middle;
    syndra.addGoodAgainst(ryze, toDoDescription);
    syndra.addGoodAgainst(diana, toDoDescription);
    syndra.addGoodAgainst(kennen, toDoDescription);
    syndra.addGoodWith(zac, toDoDescription);
    syndra.addGoodWith(zilean, toDoDescription);
    syndra.addGoodWith(nami, toDoDescription);
    tahmKench.role = Role.Top | Role.Support;
    tahmKench.addGoodAgainst(karma, toDoDescription);
    tahmKench.addGoodAgainst(taric, toDoDescription);
    tahmKench.addGoodAgainst(brand, toDoDescription);
    tahmKench.addGoodWith(jinx, toDoDescription);
    tahmKench.addGoodWith(jhin, toDoDescription);
    taliyah.role = Role.Middle;
    taliyah.addGoodAgainst(ryze, toDoDescription);
    taliyah.addGoodAgainst(veigar, toDoDescription);
    taliyah.addGoodAgainst(syndra, toDoDescription);
    taliyah.addGoodWith(talon, toDoDescription);
    taliyah.addGoodWith(twistedFate, toDoDescription);
    taliyah.addGoodWith(kindred, toDoDescription);
    talon.role = Role.Middle;
    talon.addGoodAgainst(karma, toDoDescription);
    talon.addGoodAgainst(lissandra, toDoDescription);
    talon.addGoodAgainst(ekko, toDoDescription);
    talon.addGoodWith(zed, toDoDescription);
    talon.addGoodWith(fizz, toDoDescription);
    talon.addGoodWith(sejuani, toDoDescription);
    taric.role = Role.Support;
    taric.addGoodAgainst(leona, toDoDescription);
    taric.addGoodAgainst(karma, toDoDescription);
    taric.addGoodAgainst(lulu, toDoDescription);
    taric.addGoodWith(graves, toDoDescription);
    taric.addGoodWith(ezreal, toDoDescription);
    taric.addGoodWith(vayne, toDoDescription);
    teemo.role = Role.Top;
    teemo.addGoodAgainst(choGath, toDoDescription);
    teemo.addGoodAgainst(garen, toDoDescription);
    teemo.addGoodAgainst(poppy, toDoDescription);
    teemo.addGoodWith(cassiopeia, toDoDescription);
    teemo.addGoodWith(leeSin, toDoDescription);
    teemo.addGoodWith(blitzcrank, toDoDescription);
    thresh.role = Role.Support;
    thresh.addGoodAgainst(lux, toDoDescription);
    thresh.addGoodAgainst(karma, toDoDescription);
    thresh.addGoodAgainst(veigar, toDoDescription);
    thresh.addGoodWith(vayne, toDoDescription);
    thresh.addGoodWith(draven, toDoDescription);
    thresh.addGoodWith(lucian, toDoDescription);
    tristana.role = Role.Bottom;
    tristana.addGoodAgainst(corki, toDoDescription);
    tristana.addGoodAgainst(kalista, toDoDescription);
    tristana.addGoodAgainst(lucian, toDoDescription);
    tristana.addGoodWith(leona, toDoDescription);
    tristana.addGoodWith(thresh, toDoDescription);
    tristana.addGoodWith(alistar, toDoDescription);
    trundle.role = Role.Jungle;
    trundle.addGoodAgainst(garen, toDoDescription);
    trundle.addGoodAgainst(sion, toDoDescription);
    trundle.addGoodAgainst(nasus, toDoDescription);
    trundle.addGoodWith(lissandra, toDoDescription);
    trundle.addGoodWith(vayne, toDoDescription);
    trundle.addGoodWith(jarvanIV, toDoDescription);
    tryndamere.role = Role.Top;
    tryndamere.addGoodAgainst(nautilus, toDoDescription);
    tryndamere.addGoodAgainst(choGath, toDoDescription);
    tryndamere.addGoodAgainst(garen, toDoDescription);
    tryndamere.addGoodWith(aatrox, toDoDescription);
    tryndamere.addGoodWith(ashe, toDoDescription);
    tryndamere.addGoodWith(zilean, toDoDescription);
    tryndamere.role = Role.Middle;
    twistedFate.addGoodAgainst(azir, toDoDescription);
    twistedFate.addGoodAgainst(akali, toDoDescription);
    twistedFate.addGoodAgainst(ryze, toDoDescription);
    twistedFate.addGoodWith(nocturne, toDoDescription);
    twistedFate.addGoodWith(shen, toDoDescription);
    twistedFate.addGoodWith(aatrox, toDoDescription);
    twitch.role = Role.Bottom;
    twitch.addGoodAgainst(corki, toDoDescription);
    twitch.addGoodAgainst(sivir, toDoDescription);
    twitch.addGoodAgainst(kalista, toDoDescription);
    twitch.addGoodWith(taric, toDoDescription);
    twitch.addGoodWith(leona, toDoDescription);
    twitch.addGoodWith(braum, toDoDescription);
    udyr.role = Role.Jungle;
    udyr.addGoodAgainst(graves, toDoDescription);
    udyr.addGoodAgainst(leeSin, toDoDescription);
    udyr.addGoodAgainst(nidalee, toDoDescription);
    udyr.addGoodWith(ahri, toDoDescription);
    udyr.addGoodWith(ryze, toDoDescription);
    udyr.addGoodWith(leBlanc, toDoDescription);
    urgot.role = Role.Top;
    urgot.addGoodAgainst(jarvanIV, toDoDescription);
    urgot.addGoodAgainst(fiora, toDoDescription);
    urgot.addGoodAgainst(sivir, toDoDescription);
    urgot.addGoodWith(soraka, toDoDescription);
    urgot.addGoodWith(taric, toDoDescription);
    urgot.addGoodWith(janna, toDoDescription);
    varus.role = Role.Bottom;
    varus.addGoodAgainst(corki, toDoDescription);
    varus.addGoodAgainst(sivir, toDoDescription);
    varus.addGoodAgainst(ashe, toDoDescription);
    varus.addGoodWith(leona, toDoDescription);
    varus.addGoodWith(thresh, toDoDescription);
    varus.addGoodWith(nami, toDoDescription);
    vayne.role = Role.Bottom;
    vayne.addGoodAgainst(ziggs, toDoDescription);
    vayne.addGoodAgainst(sivir, toDoDescription);
    vayne.addGoodAgainst(jhin, toDoDescription);
    vayne.addGoodWith(thresh, toDoDescription);
    vayne.addGoodWith(nunu, toDoDescription);
    vayne.addGoodWith(nami, toDoDescription);
    veigar.role = Role.Middle;
    veigar.addGoodAgainst(diana, toDoDescription);
    veigar.addGoodAgainst(talon, toDoDescription);
    veigar.addGoodAgainst(akali, toDoDescription);
    veigar.addGoodWith(leBlanc, toDoDescription);
    veigar.addGoodWith(warwick, toDoDescription);
    veigar.addGoodWith(amumu, toDoDescription);
    velKoz.role = Role.Middle | Role.Support;
    velKoz.addGoodAgainst(swain, toDoDescription);
    velKoz.addGoodAgainst(galio, toDoDescription);
    velKoz.addGoodAgainst(viktor, toDoDescription);
    velKoz.addGoodWith(amumu, toDoDescription);
    velKoz.addGoodWith(aatrox, toDoDescription);
    velKoz.addGoodWith(leona, toDoDescription);
    vi.role = Role.Jungle;
    vi.addGoodAgainst(nidalee, toDoDescription);
    vi.addGoodAgainst(shaco, toDoDescription);
    vi.addGoodAgainst(elise, toDoDescription);
    vi.addGoodAgainst(azir, "Vi can cast her ultimate on Azir and there is no way she can be stopped. Vi has a dash that can close the gap between her and Azir, making Azir's attack futile which he gets punched in the face.");
    vi.addGoodWith(yasuo, toDoDescription);
    vi.addGoodWith(caitlyn, toDoDescription);
    vi.addGoodWith(orianna, toDoDescription);
    viktor.role = Role.Middle;
    viktor.mode = Mode.APC;
    viktor.addGoodAgainst(ryze, "Viktor's ultimate can cancel Ryze's ultimate (I think?). Viktor's range is further than Ryze's.");
    viktor.addGoodAgainst(katarina, "Viktor can cancel Katarina's ultimate with his ultimate. Katarina must be moving or she will be stunned in Viktor's gravitational field. A good Katarina can avoid this, but in low-elo, most don't predict the ultimate cancel.");
    viktor.addGoodWith(jarvanIV, "Jarvan IV can trap enemies within his ultimate which allows for Viktor's ultimate to maximize damage. Hard CC can be chained with Jarvan IV's CC dash and Viktor's gravitational field.");
    viktor.addGoodWith(sona, "Sona makes is easy to cast a good ultimate, the move speed she gives you can be used for poking, like a hit and run.");
    viktor.addGoodWith(malzahar, "Malzahar keeps enemies in one place with his ultimate, perfect for Viktor's ultimate! Landing a gravitional stun will allow Malzahar's summons to deal damage instead of chasing.");
    vladimir.role = Role.Top | Role.Middle;
    vladimir.addGoodAgainst(ryze, toDoDescription);
    vladimir.addGoodAgainst(gangplank, toDoDescription);
    vladimir.addGoodAgainst(yasuo, toDoDescription);
    vladimir.addGoodWith(swain, toDoDescription);
    vladimir.addGoodWith(kennen, toDoDescription);
    vladimir.addGoodWith(zed, toDoDescription);
    volibear.role = Role.Jungle;
    volibear.addGoodAgainst(hecarim, toDoDescription);
    volibear.addGoodAgainst(leeSin, toDoDescription);
    volibear.addGoodAgainst(amumu, toDoDescription);
    volibear.addGoodWith(yasuo, toDoDescription);
    volibear.addGoodWith(teemo, toDoDescription);
    volibear.addGoodWith(ashe, toDoDescription);
    warwick.role = Role.Jungle;
    warwick.addGoodAgainst(poppy, toDoDescription);
    warwick.addGoodAgainst(leeSin, toDoDescription);
    warwick.addGoodAgainst(skarner, toDoDescription);
    warwick.addGoodWith(galio, toDoDescription);
    warwick.addGoodWith(kled, toDoDescription);
    warwick.addGoodWith(bard, toDoDescription);
    wukong.role = Role.Jungle;
    wukong.addGoodAgainst(gragas, toDoDescription);
    wukong.addGoodAgainst(trundle, toDoDescription);
    wukong.addGoodAgainst(jayce, toDoDescription);
    wukong.addGoodAgainst(aurelionSol, "Wukong can up into Aurelion Sol's face and keep there with his ultimate. Wukong can close the gap easily with his dash, and he can get close by using his invisibility when he makes a clone.");
    wukong.addGoodWith(galio, toDoDescription);
    wukong.addGoodWith(bard, toDoDescription);
    wukong.addGoodWith(sion, toDoDescription);
    xayah.role = Role.Bottom;
    xayah.addGoodAgainst(corki, toDoDescription);
    xayah.addGoodAgainst(lucian, toDoDescription);
    xayah.addGoodAgainst(kalista, toDoDescription);
    xayah.addGoodWith(rakan, toDoDescription);
    xayah.addGoodWith(sona, toDoDescription);
    xayah.addGoodWith(galio, toDoDescription);
    xerath.role = Role.Middle;
    xerath.addGoodAgainst(azir, toDoDescription);
    xerath.addGoodAgainst(lissandra, toDoDescription);
    xerath.addGoodAgainst(viktor, toDoDescription);
    xerath.addGoodWith(jarvanIV, toDoDescription);
    xerath.addGoodWith(quinn, toDoDescription);
    xerath.addGoodWith(varus, toDoDescription);
    xinZhao.role = Role.Jungle;
    xinZhao.addGoodAgainst(rengar, toDoDescription);
    xinZhao.addGoodAgainst(olaf, toDoDescription);
    xinZhao.addGoodAgainst(nocturne, toDoDescription);
    xinZhao.addGoodWith(yasuo, toDoDescription);
    xinZhao.addGoodWith(pantheon, toDoDescription);
    xinZhao.addGoodWith(blitzcrank, toDoDescription);
    yasuo.role = Role.Middle;
    yasuo.addGoodAgainst(drMundo, toDoDescription);
    yasuo.addGoodAgainst(yorick, toDoDescription);
    yasuo.addGoodAgainst(galio, toDoDescription);
    yasuo.addGoodWith(malphite, toDoDescription);
    yasuo.addGoodWith(wukong, toDoDescription);
    yasuo.addGoodWith(alistar, toDoDescription);
    yorick.role = Role.Top;
    yorick.addGoodAgainst(nasus, toDoDescription);
    yorick.addGoodAgainst(kennen, toDoDescription);
    yorick.addGoodAgainst(vladimir, toDoDescription);
    yorick.addGoodWith(mordekaiser, toDoDescription);
    yorick.addGoodWith(vayne, toDoDescription);
    yorick.addGoodWith(cassiopeia, toDoDescription);
    yuumi.role = Role.Support;
    yuumi.addGoodAgainst(lux, toDoDescription);
    yuumi.addGoodAgainst(annie, toDoDescription);
    yuumi.addGoodAgainst(ezreal, toDoDescription);
    yuumi.addGoodWith(vayne, toDoDescription);
    yuumi.addGoodWith(caitlyn, toDoDescription);
    yuumi.addGoodWith(jinx, toDoDescription);
    zac.role = Role.Support | Role.Jungle;
    zac.addGoodAgainst(wukong, toDoDescription);
    zac.addGoodAgainst(trundle, toDoDescription);
    zac.addGoodAgainst(skarner, toDoDescription);
    zac.addGoodWith(yasuo, toDoDescription);
    zac.addGoodWith(orianna, toDoDescription);
    zac.addGoodWith(syndra, toDoDescription);
    zed.role = Role.Middle;
    zed.addGoodAgainst(ryze, toDoDescription);
    zed.addGoodAgainst(azir, toDoDescription);
    zed.addGoodAgainst(taliyah, toDoDescription);
    zed.addGoodWith(talon, toDoDescription);
    zed.addGoodWith(vi, toDoDescription);
    zed.addGoodWith(nasus, toDoDescription);
    ziggs.role = Role.Middle;
    ziggs.addGoodAgainst(aurelionSol, toDoDescription);
    ziggs.addGoodAgainst(gangplank, toDoDescription);
    ziggs.addGoodAgainst(cassiopeia, toDoDescription);
    ziggs.addGoodWith(amumu, toDoDescription);
    ziggs.addGoodWith(jarvanIV, toDoDescription);
    ziggs.addGoodWith(kennen, toDoDescription);
    zilean.role = Role.Middle;
    zilean.addGoodAgainst(braum, toDoDescription);
    zilean.addGoodAgainst(alistar, toDoDescription);
    zilean.addGoodAgainst(zyra, toDoDescription);
    zilean.addGoodWith(aatrox, toDoDescription);
    zilean.addGoodWith(syndra, toDoDescription);
    zilean.addGoodWith(hecarim, toDoDescription);
    zoe.role = Role.Middle;
    zoe.addGoodAgainst(azir, toDoDescription);
    zoe.addGoodAgainst(orianna, toDoDescription);
    zoe.addGoodAgainst(ryze, toDoDescription);
    zoe.addGoodWith(thresh, toDoDescription);
    zoe.addGoodWith(bard, toDoDescription);
    zoe.addGoodWith(zilean, toDoDescription);
    zyra.role = Role.Middle | Role.Support;
    zyra.addGoodAgainst(lux, toDoDescription);
    zyra.addGoodAgainst(bard, toDoDescription);
    zyra.addGoodAgainst(annie, toDoDescription);
    zyra.addGoodWith(ashe, toDoDescription);
    zyra.addGoodWith(yasuo, toDoDescription);
    zyra.addGoodWith(amumu, toDoDescription);
})();
