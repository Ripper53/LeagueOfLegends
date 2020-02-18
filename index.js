class ChampionInfo {
    constructor(champion, title, description) {
        this.score = 1;
        this.champion = champion;
        this.title = title;
        this.description = description;
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
    addGoodAgainst(champion, description) {
        this.addChampionInfo(this.goodAgainst, champion.badAgainst, champion, description, new ChampionInfo(champion, "Good against " + champion.name, description), new ChampionInfo(this, "Bad against " + this.name, description));
    }
    addGoodWith(champion, description) {
        this.addChampionInfo(this.goodWith, champion.goodWith, champion, description, new ChampionInfo(champion, "Good with " + champion.name, description), new ChampionInfo(this, "Good with " + this.name, description));
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
        this.modifyStyle.position = "relative";
        const width = w + "px", height = h + "px";
        this.src = src;
        this.imageButton = new ImageButtonUI();
        this.modifyElement.appendChild(this.imageButton.modifyElement);
        this.imageButton.modifyElement.src = getImagePath(this.src);
        this.imageButton.modifyStyle.cursor = "pointer";
        this.imageButton.modifyElement.oncontextmenu = e => {
            ChampionUI.popUp.display(this);
            let x = e.clientX, y = e.clientY;
            const w = ChampionUI.popUp.modifyElement.clientWidth, h = ChampionUI.popUp.modifyElement.clientHeight;
            if ((x + w) > window.innerWidth)
                x -= w;
            if ((y + h) > window.innerHeight)
                y -= h;
            ChampionUI.popUp.modifyStyle.left = x + "px";
            ChampionUI.popUp.modifyStyle.top = y + "px";
            return false;
        };
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
        const getHighlightedTextUI = () => {
            const text = getTextUI("", 4, "#ffffff");
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
        this.highlightedText = getHighlightedTextUI();
        this.highlightedText.modifyStyle.color = "yellow";
        this.synergyText = getHighlightedTextUI();
        this.synergyText.modifyStyle.textAlign = "left";
        this.synergyText.modifyStyle.color = "blue";
        this.counterText = getHighlightedTextUI();
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
    evaluateChamps(team, infos) {
        const champs = new ChampionScore();
        for (let ui of team) {
            const champ = ui.champion;
            if (champ === null)
                continue;
            const compareFunc = (v) => v.champion === champ;
            const info = infos.find(compareFunc);
            if (info !== undefined) {
                champs.champions.push(champ);
                champs.score += info.score;
            }
        }
        return champs;
    }
    evaluatePick(friendlyTeam, enemyTeam) {
        if (this.champion === null) {
            this.synergyText.modifyElement.textContent = "";
            this.counterText.modifyElement.textContent = "";
            return;
        }
        const synergyChamps = this.evaluateChamps(friendlyTeam, this.champion.goodWith);
        this.synergyText.modifyElement.textContent = synergyChamps.score.toString();
        const counterChamps = this.evaluateChamps(enemyTeam, this.champion.goodAgainst);
        this.counterText.modifyElement.textContent = counterChamps.score.toString();
    }
    evaluateBan(friendlyTeam, enemyTeam) {
        if (this.champion === null) {
            this.synergyText.modifyElement.textContent = "";
            this.counterText.modifyElement.textContent = "";
            return;
        }
        const synergyChamps = this.evaluateChamps(friendlyTeam, this.champion.badWith);
        this.synergyText.modifyElement.textContent = (-synergyChamps.score).toString();
        const counteredByChamps = this.evaluateChamps(enemyTeam, this.champion.badAgainst);
        this.counterText.modifyElement.textContent = (-counteredByChamps.score).toString();
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
    evaluatePicks() {
        for (let ui of this.picks) {
            ui.evaluatePick(this.picks, this.enemySide.picks);
        }
    }
    evaluateBans() {
        for (let ui of this.bans) {
            ui.evaluateBan(this.bans, this.enemySide.bans);
        }
    }
    getBanImage() {
        const ui = getChampionUI(this.banSrc, 50, 50);
        ui.imageButton.modifyStyle.opacity = defaultValue.opacity + "%";
        ui.text.modifyStyle.position = "absolute";
        ui.synergyText.modifyStyle.top = "25%";
        ui.counterText.modifyStyle.top = "25%";
        SideLayoutUI.pickableUI(ui);
        ui.imageButton.modifyEvents.addOnClick(() => this.evaluateBans());
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
        ui.imageButton.modifyEvents.addOnClick(() => this.evaluatePicks());
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
        "Fiddlesticks",
        "Fiora",
        "Fizz",
        "Galio",
        "Gangplank",
        "Garen",
        "Gnar",
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
        "Zed",
        "Ziggs",
        "Zilean",
        "Zyra"
    ];
    const championUIs = [];
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
                }
                else {
                    pick.setChampionEvent = () => {
                        pick.setChampionEvent = null;
                        pick.set(null);
                    };
                }
            }
            function evaluateBan(friendlyTeam, enemyTeam) {
                for (let ui of championUIs)
                    ui.evaluateBan(friendlyTeam.picks, enemyTeam.picks);
            }
            function addBanSrcEvent(title, ui, friendlyTeam, enemyTeam) {
                srcData.data.push({
                    action: selectedUI => {
                        selectedUI.ban();
                        nextSrcEvent();
                        evaluateBan(friendlyTeam, enemyTeam);
                    },
                    title,
                    ui
                });
            }
            function evaluatePick(friendlyTeam, enemyTeam) {
                for (let ui of championUIs)
                    ui.evaluatePick(friendlyTeam.picks, enemyTeam.picks);
            }
            function addPickSrcEvent(title, ui, friendlyTeam, enemyTeam) {
                srcData.data.push({
                    action: () => {
                        nextSrcEvent();
                        evaluatePick(friendlyTeam, enemyTeam);
                    },
                    title,
                    ui
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
            pick.setEvent = null;
            pick.set(null);
            pick.setEvent = () => {
                pick.setEvent = null;
                nextSrcEvent();
                evaluatePick(blueSide, redSide);
            };
            pick.set(blueSide.bans[0]);
        });
    })();
})();
(() => {
    const aatrox = Champion.get("Aatrox"), ahri = Champion.get("Ahri"), akali = Champion.get("Akali"), alistar = Champion.get("Alistar"), amumu = Champion.get("Amumu"), anivia = Champion.get("Anivia"), annie = Champion.get("Annie"), aphelios = Champion.get("Aphelios"), ashe = Champion.get("Ashe"), aurelionSol = Champion.get("Aurelion Sol"), azir = Champion.get("Azir"), bard = Champion.get("Bard"), blitzcrank = Champion.get("Blitzcrank"), brand = Champion.get("Brand"), braum = Champion.get("Braum"), caitlyn = Champion.get("Caitlyn"), camille = Champion.get("Camille"), cassiopeia = Champion.get("Cassiopeia"), choGath = Champion.get("Cho'Gath"), corki = Champion.get("Corki"), darius = Champion.get("Darius"), diana = Champion.get("Diana"), drMundo = Champion.get("Dr. Mundo"), draven = Champion.get("Draven"), ekko = Champion.get("Ekko"), elise = Champion.get("Elise"), evelynn = Champion.get("Evelynn"), ezreal = Champion.get("Ezreal"), fiddlesticks = Champion.get("Fiddlesticks"), fiora = Champion.get("Fiora"), fizz = Champion.get("Fizz"), galio = Champion.get("Galio"), gangplank = Champion.get("Gangplank"), garen = Champion.get("Garen"), gnar = Champion.get("Gnar"), gragas = Champion.get("Gragas"), graves = Champion.get("Graves"), hecarim = Champion.get("Hecarim"), heimerdinger = Champion.get("Heimerdinger"), illaoi = Champion.get("Illaoi"), irelia = Champion.get("Irelia"), invern = Champion.get("Ivern"), janna = Champion.get("Janna"), jarvanIV = Champion.get("Jarvan IV"), jax = Champion.get("Jax"), jayce = Champion.get("Jayce"), jhin = Champion.get("Jhin"), jinx = Champion.get("Jinx"), kaiSa = Champion.get("Kai'Sa"), kalista = Champion.get("Kalista"), karma = Champion.get("Karma"), karthus = Champion.get("Karthus"), kassadin = Champion.get("Kassadin"), katarina = Champion.get("Katarina"), kayle = Champion.get("Kayle"), kayn = Champion.get("Kayn"), kennen = Champion.get("Kennen"), khaZix = Champion.get("Kha'Zix"), kindred = Champion.get("Kindred"), kled = Champion.get("Kled"), kogMaw = Champion.get("Kog'Maw"), leBlanc = Champion.get("LeBlanc"), leeSin = Champion.get("Lee Sin"), leona = Champion.get("Leona"), lissandra = Champion.get("Lissandra"), lucian = Champion.get("Lucian"), lulu = Champion.get("Lulu"), lux = Champion.get("Lux"), malphite = Champion.get("Malphite"), malzahar = Champion.get("Malzahar"), maokai = Champion.get("Maokai"), masterYi = Champion.get("Master Yi"), missFortune = Champion.get("Miss Fortune"), mordekaiser = Champion.get("Mordekaiser"), morgana = Champion.get("Morgana"), nami = Champion.get("Nami"), nasus = Champion.get("Nasus"), nautilus = Champion.get("Nautilus"), neeko = Champion.get("Neeko"), nidalee = Champion.get("Nidalee"), nocturne = Champion.get("Nocturne"), nunu = Champion.get("Nunu"), olaf = Champion.get("Olaf"), orianna = Champion.get("Orianna"), ornn = Champion.get("Ornn"), pantheon = Champion.get("Pantheon"), poppy = Champion.get("Poppy"), pyke = Champion.get("Pyke"), qiyana = Champion.get("Qiyana"), quinn = Champion.get("Quinn"), rakan = Champion.get("Rakan"), rammus = Champion.get("Rammus"), rekSai = Champion.get("Rek'Sai"), renekton = Champion.get("Renekton"), rengar = Champion.get("Rengar"), riven = Champion.get("Riven"), rumble = Champion.get("Rumble"), ryze = Champion.get("Ryze"), sejuani = Champion.get("Sejuani"), senna = Champion.get("Senna"), sett = Champion.get("Sett"), shaco = Champion.get("Shaco"), shen = Champion.get("Shen"), shyvana = Champion.get("Shyvana"), singed = Champion.get("Singed"), sion = Champion.get("Sion"), sivir = Champion.get("Sivir"), skarner = Champion.get("Skarner"), sona = Champion.get("Sona"), soraka = Champion.get("Soraka"), swain = Champion.get("Swain"), sylas = Champion.get("Sylas"), syndra = Champion.get("Syndra"), tahmKench = Champion.get("Tahm Kench"), taliyah = Champion.get("Taliyah"), talon = Champion.get("Talon"), taric = Champion.get("Taric"), teemo = Champion.get("Teemo"), thresh = Champion.get("Thresh"), tristana = Champion.get("Tristana"), trundle = Champion.get("Trundle"), tryndamere = Champion.get("Tryndamere"), twistedFate = Champion.get("Twisted Fate"), twitch = Champion.get("Twitch"), udyr = Champion.get("Udyr"), urgot = Champion.get("Urgot"), varus = Champion.get("Varus"), vayne = Champion.get("Vayne"), veigar = Champion.get("Veigar"), velKoz = Champion.get("Vel'Koz"), vi = Champion.get("Vi"), viktor = Champion.get("Viktor"), vladimir = Champion.get("Vladimir"), volibear = Champion.get("Volibear"), warwick = Champion.get("Warwick"), wukong = Champion.get("Wukong"), xayah = Champion.get("Xayah"), xerath = Champion.get("Xerath"), xinZhao = Champion.get("Xin Zhao"), yasuo = Champion.get("Yasuo"), yorick = Champion.get("Yorick"), yuumi = Champion.get("Yuumi"), zac = Champion.get("Zac"), zed = Champion.get("Zed");
    aatrox.addGoodAgainst(gangplank, "TO DO");
    aatrox.addGoodAgainst(darius, "TO DO");
    aatrox.addGoodAgainst(galio, "TO DO");
    aatrox.addGoodWith(gnar, "TO DO");
    aatrox.addGoodWith(yasuo, "TO DO");
    aatrox.addGoodWith(azir, "TO DO");
    ahri.addGoodAgainst(choGath, "TO DO");
    ahri.addGoodAgainst(azir, "TO DO");
    ahri.addGoodAgainst(viktor, "TO DO");
    ahri.addGoodWith(jax, "TO DO");
    ahri.addGoodWith(riven, "TO DO");
    ahri.addGoodWith(irelia, "TO DO");
    akali.addGoodAgainst(nasus, "TO DO");
    akali.addGoodAgainst(garen, "TO DO");
    akali.addGoodAgainst(poppy, "TO DO");
    akali.addGoodWith(diana, "TO DO");
    akali.addGoodWith(leBlanc, "TO DO");
    akali.addGoodWith(katarina, "TO DO");
    amumu.addGoodAgainst(graves, "TO DO");
    amumu.addGoodAgainst(shyvana, "TO DO");
    amumu.addGoodAgainst(leeSin, "TO DO");
    amumu.addGoodWith(katarina, "TO DO");
    amumu.addGoodWith(fiddlesticks, "TO DO");
    amumu.addGoodWith(morgana, "TO DO");
    anivia.addGoodAgainst(kayle, "TO DO");
    anivia.addGoodAgainst(azir, "TO DO");
    anivia.addGoodAgainst(akali, "TO DO");
    anivia.addGoodWith(jarvanIV, "TO DO");
    anivia.addGoodWith(drMundo, "TO DO");
    anivia.addGoodWith(vayne, "TO DO");
    annie.addGoodAgainst(diana, "TO DO");
    annie.addGoodAgainst(jayce, "TO DO");
    annie.addGoodAgainst(viktor, "TO DO");
    annie.addGoodWith(jinx, "TO DO");
    annie.addGoodWith(amumu, "TO DO");
    annie.addGoodWith(lucian, "TO DO");
    ashe.addGoodAgainst(corki, "TO DO");
    ashe.addGoodAgainst(lucian, "TO DO");
    ashe.addGoodAgainst(sivir, "TO DO");
    ashe.addGoodWith(leona, "TO DO");
    ashe.addGoodWith(janna, "TO DO");
    ashe.addGoodWith(thresh, "TO DO");
    azir.addGoodAgainst(yasuo, "TO DO");
    azir.addGoodAgainst(taliyah, "TO DO");
    azir.addGoodAgainst(syndra, "TO DO");
    azir.addGoodWith(aatrox, "TO DO");
    azir.addGoodWith(yasuo, "TO DO");
    azir.addGoodWith(alistar, "TO DO");
    ashe.addGoodAgainst(corki, "TO DO");
    ashe.addGoodAgainst(lucian, "TO DO");
    ashe.addGoodAgainst(sivir, "TO DO");
    ashe.addGoodWith(leona, "TO DO");
    ashe.addGoodWith(janna, "TO DO");
    ashe.addGoodWith(thresh, "TO DO");
    ashe.addGoodAgainst(corki, "TO DO");
    ashe.addGoodAgainst(lucian, "TO DO");
    ashe.addGoodAgainst(sivir, "TO DO");
    ashe.addGoodWith(leona, "TO DO");
    ashe.addGoodWith(janna, "TO DO");
    ashe.addGoodWith(thresh, "TO DO");
    ashe.addGoodAgainst(corki, "TO DO");
    ashe.addGoodAgainst(lucian, "TO DO");
    ashe.addGoodAgainst(sivir, "TO DO");
    ashe.addGoodWith(leona, "TO DO");
    ashe.addGoodWith(janna, "TO DO");
    ashe.addGoodWith(thresh, "TO DO");
})();
