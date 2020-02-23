class ChampionInfo {
    constructor(championList, targetChampionList, title, description, score) {
        this.championList = championList;
        this.targetChampionList = targetChampionList;
        this.title = title;
        this.description = description;
        this.score = score;
    }
    get targetChampion() {
        return this.targetChampionList.champion;
    }
    getChampion(champion) {
        return this.championList.champion !== champion ? this.championList.champion : this.targetChampion;
    }
    isEither(champion) {
        return this.targetChampion === champion || this.championList.champion === champion;
    }
    static loadDetails(details, w) {
        const descriptionParagraph = document.createElement('textarea');
        descriptionParagraph.style.display = "block";
        descriptionParagraph.textContent += details;
        descriptionParagraph.style.width = w + "px";
        descriptionParagraph.style.height = "100px";
        descriptionParagraph.style.resize = "none";
        return descriptionParagraph;
    }
    static loadTitle(champion, info, title, w, color) {
        const pInfo = document.createElement('p');
        pInfo.style.width = w + "px";
        const strongTitle = document.createElement('strong');
        pInfo.appendChild(strongTitle);
        strongTitle.textContent = title + info.getChampion(champion).name;
        strongTitle.style.color = color;
        strongTitle.style.fontFamily = defaultValue.fontFamily;
        const img = document.createElement('img');
        pInfo.appendChild(img);
        img.style.width = "25px";
        img.style.height = "25px";
        img.src = info.getChampion(champion).getImageSrcPath();
        return pInfo;
    }
    static load(champion, info, title, color, w) {
        const pInfo = this.loadTitle(champion, info, title, w, color);
        const descriptionParagraph = this.loadDetails(info.description, w);
        pInfo.appendChild(descriptionParagraph);
        descriptionParagraph.readOnly = true;
        return pInfo;
    }
    static loadEditable(info, title, color, w, infos, parent) {
        const pInfo = this.loadTitle(infos.champion, info, title, w, color);
        const deleteBtn = ButtonUtility.getCloseButton(25, 25);
        pInfo.appendChild(deleteBtn.modifyElement);
        deleteBtn.modifyStyle.display = "inline-block";
        deleteBtn.modifyStyle.float = "right";
        deleteBtn.modifyEvents.addOnClick(() => {
            infos.remove(info.targetChampion);
            info.championList.remove(infos.champion);
            parent.removeChild(pInfo);
        });
        const descriptionParagraph = this.loadDetails(info.description, w);
        pInfo.appendChild(descriptionParagraph);
        descriptionParagraph.addEventListener('input', () => info.description = descriptionParagraph.value);
        return pInfo;
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
    Civilization[Civilization["None"] = 0] = "None";
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
        this.civilization = Civilization.None;
        this.mode = Mode.None;
        this.available = true;
        this.name = name;
        this.src = src;
        this.goodAgainst = new GoodAgainstChampionInfoList(this);
        this.goodWith = new GoodWithChampionInfoList(this);
        this.badAgainst = new BadAgainstChampionInfoList(this);
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
    clear() {
        this.goodAgainst.clear();
        this.badAgainst.clear();
        this.goodWith.clear();
    }
}
Champion.ALL = [];
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
        document.body.style.width = "100%";
        document.body.style.height = "100%";
        this.body = document.createElement('div');
        this.body.style.position = "fixed";
        this.body.style.backgroundColor = "transparent";
        document.body.appendChild(this.body);
        this.addOnResize(() => {
            this.body.style.width = window.innerWidth + "px";
            this.body.style.height = window.innerHeight + "px";
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
class SelectUI extends UIElement {
    constructor() {
        super(document.createElement('select'));
    }
    addOption(text) {
        const op = document.createElement('option');
        this.modifyElement.appendChild(op);
        op.textContent = text;
        return op;
    }
    getOption(index) {
        return this.modifyElement.options[index];
    }
    get length() {
        return this.modifyElement.options.length;
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
        this.modifyStyle.position = "relative";
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
        this.text.modifyStyle.position = "absolute";
        this.text.modifyStyle.lineHeight = "0px";
        this.text.modifyElement.textContent = text;
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
class ImageButtonUI extends ImageUI {
    constructor() {
        super();
        this.modifyStyle.cursor = "pointer";
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
var ArrayUtility;
(function (ArrayUtility) {
    function remove(arr, item) {
        const index = arr.findIndex(v => v === item);
        if (index !== -1) {
            arr.splice(index, 1);
            return true;
        }
        return false;
    }
    ArrayUtility.remove = remove;
})(ArrayUtility || (ArrayUtility = {}));
function getImagePath(fileName) {
    return "Images/" + fileName;
}
function clearChildren(element) {
    while (element.firstChild)
        element.removeChild(element.firstChild);
}
var TextUtility;
(function (TextUtility) {
    function getTextUI(textContent = "", border = 1, hexColor = "#000000") {
        const text = new TextUI(textContent);
        text.modifyStyle.color = "white";
        text.modifyStyle.fontFamily = defaultValue.fontFamily;
        text.modifyStyle.userSelect = "none";
        text.modifyStyle.textShadow = `${hexColor} 0px 0px ${border}px, ${hexColor} 0px 0px ${border}px, ${hexColor} 0px 0px ${border}px, ${hexColor} 0px 0px ${border}px, ${hexColor} 0px 0px ${border}px, ${hexColor} 0px 0px ${border}px`;
        return text;
    }
    TextUtility.getTextUI = getTextUI;
})(TextUtility || (TextUtility = {}));
var EnumUtility;
(function (EnumUtility) {
    function hasFlag(value, check) {
        return (value & check) === check;
    }
    EnumUtility.hasFlag = hasFlag;
})(EnumUtility || (EnumUtility = {}));
var FileUtility;
(function (FileUtility) {
    function getName(path) {
        return path.replace(/^.*[\\\/]/, '');
    }
    FileUtility.getName = getName;
})(FileUtility || (FileUtility = {}));
var MathUtility;
(function (MathUtility) {
    function clampElement(x, y, element) {
        const w = element.clientWidth, h = element.clientHeight;
        if ((x + w) > window.innerWidth)
            x += window.innerWidth - (x + w);
        if ((y + h) > window.innerHeight)
            y += window.innerHeight - (y + h);
        return { x, y };
    }
    MathUtility.clampElement = clampElement;
})(MathUtility || (MathUtility = {}));
const PointerUtility = new (class PointerUtility {
    constructor() {
        this.position = { x: 0, y: 0 };
        this.moveEvents = [];
        window.addEventListener('pointermove', e => {
            this.position.x = e.clientX;
            this.position.y = e.clientY;
            for (let func of this.moveEvents)
                func(this);
        });
    }
    addOnMove(func) {
        this.moveEvents.push(func);
    }
})();
var ButtonUtility;
(function (ButtonUtility) {
    function getButton(text, w = 100, h = 30) {
        const btn = new ButtonUI(text, w, h);
        btn.setColor("rgb(0, 0, 0)");
        btn.setHoverColor("rgb(100, 100, 100)");
        btn.modifyText.modifyStyle.color = "white";
        btn.modifyStyle.display = "inline-block";
        btn.modifyStyle.fontFamily = defaultValue.fontFamily;
        return btn;
    }
    ButtonUtility.getButton = getButton;
    function getCloseButton(w, h) {
        const closeBtn = new ButtonUI("X", w, h);
        closeBtn.setColor("black");
        closeBtn.setHoverColor("red");
        closeBtn.modifyText.modifyStyle.color = "white";
        closeBtn.modifyText.modifyStyle.fontFamily = defaultValue.fontFamily;
        return closeBtn;
    }
    ButtonUtility.getCloseButton = getCloseButton;
})(ButtonUtility || (ButtonUtility = {}));
const popUpInfo = new (class PopUpInfo extends UIElement {
    constructor() {
        super(document.createElement('div'));
        this.width = 400;
        const width = this.width + "px";
        this.modifyStyle.backgroundColor = "black";
        this.modifyStyle.zIndex = "100";
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
        const addDiv = document.createElement('div');
        this.modifyElement.appendChild(addDiv);
        addDiv.style.position = "absolute";
        addDiv.style.display = "inline-line";
        addDiv.style.top = "0px";
        addDiv.style.right = "0px";
        this.editInfoButton = new ButtonUI("Edit", 100, 30);
        addDiv.appendChild(this.editInfoButton.modifyElement);
        this.editInfoButton.setColor("rgba(0, 0, 0, 0.5)");
        this.editInfoButton.setHoverColor("rgba(100, 100, 100, 1)");
        this.editInfoButton.modifyText.modifyStyle.color = "white";
        this.editInfoButton.modifyText.modifyStyle.fontFamily = defaultValue.fontFamily;
        this.editInfoButton.modifyStyle.display = "inline-block";
        this.editInfoButton.modifyEvents.addOnClick(() => championInfoEdit.show());
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
        this.hide();
    }
    display(ui) {
        clearChildren(this.descriptionText.modifyElement);
        const champion = ui.getChampion();
        if (champion !== null) {
            this.image.modifyElement.src = getImagePath(champion.src);
            this.nameText.modifyElement.textContent = champion.name;
            this.image.modifyElement.alt = champion.name;
            this.editInfoButton.modifyStyle.visibility = "visible";
            championInfoEdit.champion = champion;
            for (let info of champion.goodAgainst.getInfos())
                this.descriptionText.modifyElement.appendChild(ReadOnlyChampionInfoUI.getGoodAgainst(champion, info, this.width).modifyElement);
            for (let info of champion.badAgainst.getInfos())
                this.descriptionText.modifyElement.appendChild(ReadOnlyChampionInfoUI.getBadAgainst(champion, info, this.width).modifyElement);
            for (let info of champion.goodWith.getInfos())
                this.descriptionText.modifyElement.appendChild(ReadOnlyChampionInfoUI.getGoodWith(champion, info, this.width).modifyElement);
        }
        else {
            this.image.modifyElement.src = getImagePath(ui.src);
            this.image.modifyElement.alt = "No image.";
            this.nameText.modifyElement.textContent = "No champion selected!";
            this.descriptionText.modifyElement.textContent = "";
            this.editInfoButton.modifyStyle.visibility = "hidden";
            clearChildren(this.descriptionText.modifyElement);
        }
        this.modifyStyle.display = "block";
    }
    hide() {
        this.modifyStyle.display = "none";
    }
})();
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
            popUpInfo.display(this);
            const pos = MathUtility.clampElement(e.clientX - 5, e.clientY - 5, popUpInfo.modifyElement);
            popUpInfo.modifyStyle.left = pos.x + "px";
            popUpInfo.modifyStyle.top = pos.y + "px";
        });
        this.text = TextUtility.getTextUI();
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
            const text = TextUtility.getTextUI("", 4, color);
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
            if (this.champion === null || !numbersCheckInputField.modifyElement.checked)
                return;
            miniPopUpInfo.display(this.champion);
        });
        this.imageButton.modifyEvents.addOnPointerLeave(() => {
            this.hoverImage.modifyStyle.visibility = "hidden";
            miniPopUpInfo.hide();
        });
        this.imageButton.modifyStyle.width = width;
        this.imageButton.modifyStyle.height = height;
        this.hoverImage.modifyStyle.width = width;
        this.hoverImage.modifyStyle.height = height;
    }
    getChampion() {
        return this.champion;
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
            if (champ === null || this.champion == champ)
                continue;
            const infoList = infos.getInfos();
            const infoIndex = infoList.findIndex(v => v.isEither(champ));
            if (infoIndex !== -1) {
                const info = infoList[infoIndex];
                infos.moveToFront(infoIndex);
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
        this.synergyText.modifyElement.textContent = "";
        this.counterText.modifyElement.textContent = "";
        this.triggerOnSet(oldValue);
        return false;
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
        this.set(null);
        this.imageButton.modifyElement.src = getImagePath(this.src);
        this.synergyText.modifyElement.textContent = "";
        this.counterText.modifyElement.textContent = "";
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
                DataUtility.evaluateBans(ui.side, Side.red);
            else
                DataUtility.evaluateBans(ui.side, Side.blue);
        });
        ui.addOnSet((source, champ, oldChamp) => {
            if (champ !== null)
                champ.ban();
            DataUtility.evaluateBans(this, this.enemySide);
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
                DataUtility.evaluatePicks(ui.side, Side.red);
            else
                DataUtility.evaluatePicks(ui.side, Side.blue);
        });
        ui.addOnSet((source, champ, oldChamp) => {
            if (champ !== null) {
                if (this === Side.blue)
                    champ.bluePick();
                else
                    champ.redPick();
            }
            DataUtility.evaluatePicks(this, this.enemySide);
        });
        return ui;
    }
    static resetOldChampEvent(source, value, oldValue) {
        if (oldValue !== null)
            oldValue.reset();
    }
    static pickableUI(ui) {
        ui.addOnSet(this.resetOldChampEvent);
        ui.imageButton.modifyEvents.addOnClick(() => {
            pick.setEvent = null;
            pick.setChampionEvent = null;
            headerText.modifyElement.textContent = "Champion Select";
            pick.set(ui);
        });
    }
}
class InputFieldUI extends UIElement {
    constructor() {
        super(document.createElement('input'));
    }
}
const numbersCheckInputField = new InputFieldUI();
numbersCheckInputField.modifyElement.type = "checkbox";
const ChampionData = {
    UIs: [],
    clear: () => {
        for (let champion of Champion.ALL)
            champion.clear();
    },
    load: data => {
        for (let d of data) {
            const champ = Champion.get(d.name);
            if (d.role)
                champ.role = d.role;
            if (d.civilization)
                champ.civilization = d.civilization;
            if (d.mode)
                champ.mode = d.mode;
            if (d.goodAgainst) {
                for (let ga of d.goodAgainst) {
                    champ.goodAgainst.add(Champion.get(ga.name), ga.title, ga.details, ga.score);
                }
            }
            if (d.goodWith) {
                for (let gw of d.goodWith) {
                    champ.goodWith.add(Champion.get(gw.name), gw.title, gw.details, gw.score);
                }
            }
        }
    },
    save: () => {
        function loadData(champion, info) {
            return {
                name: info.getChampion(champion).name,
                title: info.title,
                details: info.description,
                score: info.score
            };
        }
        const data = [];
        for (let champion of Champion.ALL) {
            const d = {
                name: champion.name,
                role: champion.role,
                civilization: champion.civilization,
                mode: champion.mode
            };
            let hasData = false;
            if (champion.goodAgainst.length > 0) {
                hasData = true;
                d.goodAgainst = [];
                for (let info of champion.goodAgainst.getInfos())
                    d.goodAgainst.push(loadData(champion, info));
            }
            if (champion.goodWith.length > 0) {
                hasData = true;
                d.goodWith = [];
                for (let info of champion.goodWith.getInfos())
                    d.goodWith.push(loadData(champion, info));
            }
            if (hasData)
                data.push(d);
        }
        return data;
    }
};
const ChampionFilter = {
    sort: null
};
var DataUtility;
(function (DataUtility) {
    function evaluatePicks(friendlyTeam, enemyTeam) {
        friendlyTeam.evaluatePicks();
        enemyTeam.evaluatePicks();
        for (let ui of ChampionData.UIs)
            ui.evaluateBan(enemyTeam.picks, friendlyTeam.picks);
        if (ChampionFilter.sort !== null)
            ChampionFilter.sort();
    }
    DataUtility.evaluatePicks = evaluatePicks;
    function evaluateBans(friendlyTeam, enemyTeam) {
        friendlyTeam.evaluateBans();
        enemyTeam.evaluateBans();
        for (let ui of ChampionData.UIs)
            ui.evaluateBan(friendlyTeam.picks, enemyTeam.picks);
        if (ChampionFilter.sort !== null)
            ChampionFilter.sort();
    }
    DataUtility.evaluateBans = evaluateBans;
})(DataUtility || (DataUtility = {}));
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
const championInfoEdit = new (class ChampionInfoEdit extends UIElement {
    constructor() {
        super(document.createElement('div'));
        this.champion = null;
        this.modifyStyle.zIndex = "110";
        this.modifyStyle.position = "fixed";
        this.modifyStyle.left = "0px";
        this.modifyStyle.top = "0px";
        this.modifyStyle.width = "100%";
        this.modifyStyle.height = "100%";
        this.backgroundDiv = document.createElement('div');
        this.modifyElement.appendChild(this.backgroundDiv);
        this.backgroundDiv.style.backgroundColor = "black";
        this.backgroundDiv.style.opacity = "50%";
        this.backgroundDiv.style.width = "100%";
        this.backgroundDiv.style.height = "100%";
        this.backgroundDiv.style.position = "fixed";
        this.championImageUI = new ImageUI();
        this.modifyElement.appendChild(this.championImageUI.modifyElement);
        this.championImageUI.modifyStyle.position = "relative";
        this.championImageUI.modifyStyle.width = "100px";
        this.championImageUI.modifyStyle.height = "100px";
        const infoDiv = document.createElement('div');
        this.modifyElement.appendChild(infoDiv);
        infoDiv.style.display = "inline-block";
        infoDiv.style.verticalAlign = "top";
        this.championNameTextUI = new TextUI("");
        infoDiv.appendChild(this.championNameTextUI.modifyElement);
        this.championNameTextUI.modifyStyle.position = "relative";
        this.championNameTextUI.modifyStyle.fontFamily = defaultValue.fontFamily;
        this.championNameTextUI.modifyStyle.color = "#ffffff";
        this.championNameTextUI.modifyStyle.display = "inline-block";
        this.championNameTextUI.modifyStyle.verticalAlign = "top";
        this.infoSelectUI = new SelectUI();
        infoDiv.appendChild(this.infoSelectUI.modifyElement);
        this.infoSelectUI.modifyStyle.position = "relative";
        this.infoSelectUI.modifyStyle.verticalAlign = "top";
        this.infoSelectUI.addOption("Good Against");
        this.infoSelectUI.addOption("Good With");
        this.championSelectUI = new SelectUI();
        infoDiv.appendChild(this.championSelectUI.modifyElement);
        this.championSelectUI.modifyStyle.position = "relative";
        this.championSelectUI.modifyStyle.verticalAlign = "top";
        const addBtn = new ButtonUI("Add", 50, 30);
        infoDiv.appendChild(addBtn.modifyElement);
        addBtn.setColor("rgb(0, 0, 0)");
        addBtn.setHoverColor("rgb(100, 100, 100)");
        addBtn.modifyText.modifyStyle.color = "white";
        addBtn.modifyStyle.position = "relative";
        addBtn.modifyStyle.display = "inline-block";
        addBtn.modifyStyle.verticalAlign = "top";
        addBtn.modifyText.modifyStyle.fontFamily = defaultValue.fontFamily;
        addBtn.modifyEvents.addOnClick(() => {
            this.addInfo();
        });
        const roleDiv = document.createElement('div');
        infoDiv.appendChild(roleDiv);
        this.topImageButtonUI = this.getRoleImageButtonUI("Top", Role.Top);
        roleDiv.appendChild(this.topImageButtonUI.modifyElement);
        this.middleImageButtonUI = this.getRoleImageButtonUI("Middle", Role.Middle);
        roleDiv.appendChild(this.middleImageButtonUI.modifyElement);
        this.bottomImageButtonUI = this.getRoleImageButtonUI("Bottom", Role.Bottom);
        roleDiv.appendChild(this.bottomImageButtonUI.modifyElement);
        this.supportImageButtonUI = this.getRoleImageButtonUI("Support", Role.Support);
        roleDiv.appendChild(this.supportImageButtonUI.modifyElement);
        this.jungleImageButtonUI = this.getRoleImageButtonUI("Jungle", Role.Jungle);
        roleDiv.appendChild(this.jungleImageButtonUI.modifyElement);
        this.detailsDiv = document.createElement('div');
        this.modifyElement.appendChild(this.detailsDiv);
        this.goodAgainstDiv = this.getDiv();
        this.goodWithDiv = this.getDiv();
        const closeBtn = ButtonUtility.getCloseButton(50, 50);
        this.modifyElement.appendChild(closeBtn.modifyElement);
        closeBtn.modifyText.modifyStyle.fontSize = "28px";
        closeBtn.modifyStyle.position = "absolute";
        closeBtn.modifyStyle.right = "0px";
        closeBtn.modifyStyle.top = "0px";
        closeBtn.modifyEvents.addOnClick(() => this.hide());
        this.hide();
    }
    hide() {
        this.modifyStyle.display = "none";
    }
    static hasRoleFlag(value, checkRole) {
        return EnumUtility.hasFlag(value, checkRole) ? "100%" : "50%";
    }
    getRoleImageButtonUI(roleName, role) {
        const roleImageButtonUI = new ImageButtonUI();
        roleImageButtonUI.modifyElement.src = getImagePath(`Role${roleName}Icon.png`);
        roleImageButtonUI.modifyStyle.position = "relative";
        roleImageButtonUI.modifyStyle.width = "25px";
        roleImageButtonUI.modifyStyle.height = "25px";
        roleImageButtonUI.modifyEvents.addOnClick(() => {
            if (EnumUtility.hasFlag(this.champion.role, role))
                this.champion.role ^= role;
            else
                this.champion.role |= role;
            roleImageButtonUI.modifyStyle.opacity = ChampionInfoEdit.hasRoleFlag(this.champion.role, role);
        });
        return roleImageButtonUI;
    }
    getDiv() {
        const div = document.createElement('div');
        this.detailsDiv.appendChild(div);
        div.style.overflowY = "auto";
        div.style.display = "inline-block";
        div.style.padding = "10px";
        div.style.position = "relative";
        div.style.width = "420px";
        div.style.height = "400px";
        return div;
    }
    show() {
        this.championNameTextUI.modifyElement.textContent = this.champion.name;
        this.championImageUI.modifyElement.src = this.champion.getImageSrcPath();
        this.topImageButtonUI.modifyStyle.opacity = ChampionInfoEdit.hasRoleFlag(this.champion.role, Role.Top);
        this.middleImageButtonUI.modifyStyle.opacity = ChampionInfoEdit.hasRoleFlag(this.champion.role, Role.Middle);
        this.bottomImageButtonUI.modifyStyle.opacity = ChampionInfoEdit.hasRoleFlag(this.champion.role, Role.Bottom);
        this.supportImageButtonUI.modifyStyle.opacity = ChampionInfoEdit.hasRoleFlag(this.champion.role, Role.Support);
        this.jungleImageButtonUI.modifyStyle.opacity = ChampionInfoEdit.hasRoleFlag(this.champion.role, Role.Jungle);
        clearChildren(this.goodAgainstDiv);
        clearChildren(this.goodWithDiv);
        for (let info of this.champion.goodAgainst.getInfos()) {
            this.goodAgainstDiv.appendChild(this.getGoodAgainst(info, this.champion.goodAgainst).modifyElement);
        }
        for (let info of this.champion.goodWith.getInfos()) {
            this.goodWithDiv.appendChild(this.getGoodWith(info, this.champion.goodWith).modifyElement);
        }
        this.modifyStyle.display = "block";
    }
    getGoodAgainst(info, infos) {
        return EditableChampionInfoUI.getGoodAgainst(info, 400, infos, this.goodAgainstDiv);
    }
    getGoodWith(info, infos) {
        return EditableChampionInfoUI.getGoodWith(info, 400, infos, this.goodWithDiv);
    }
    addInfo(details = "One does not simply write a detailed summary.", score = 1) {
        const champion = Champion.get(this.championSelectUI.modifyElement.options[this.championSelectUI.modifyElement.selectedIndex].text);
        switch (this.infoSelectUI.modifyElement.selectedIndex) {
            case 0:
                if (this.champion.goodAgainst.add(champion, "", details, score))
                    this.goodAgainstDiv.appendChild(this.getGoodAgainst(this.champion.goodAgainst.get(this.champion.goodAgainst.length - 1), this.champion.goodAgainst).modifyElement);
                break;
            default:
                if (this.champion.goodWith.add(champion, "", details, score))
                    this.goodWithDiv.appendChild(this.getGoodWith(this.champion.goodWith.get(this.champion.goodWith.length - 1), this.champion.goodWith).modifyElement);
                break;
        }
    }
})();
class ChampionInfoList {
    constructor(champion) {
        this.infos = [];
        this.champion = champion;
    }
    get(index) {
        return this.infos[index];
    }
    getInfos() {
        return this.infos;
    }
    moveToFront(index) {
        const info = this.infos[index], zeroIndexInfo = this.infos[0];
        this.infos[0] = info;
        this.infos.splice(0, 1);
        this.infos.push(zeroIndexInfo);
    }
    get length() {
        return this.infos.length;
    }
    clear() {
        this.infos.length = 0;
    }
    addChampionInfo(championInfo, oppositeInfos) {
        const info = this.infos.find(v => v.getChampion(this.champion) === championInfo.targetChampion);
        if (info === undefined) {
            this.infos.push(championInfo);
            if (this !== oppositeInfos)
                oppositeInfos.infos.push(championInfo);
            return true;
        }
        return false;
    }
    removeChampionInfo(targetChampion, oppositeInfos) {
        const championInfo = this.infos.find(v => v.targetChampion === targetChampion);
        if (championInfo !== undefined && ArrayUtility.remove(this.infos, championInfo)) {
            if (this !== oppositeInfos)
                ArrayUtility.remove(oppositeInfos.infos, championInfo);
            return true;
        }
        return false;
    }
}
class GoodAgainstChampionInfoList extends ChampionInfoList {
    add(targetChampion, title, details, score) {
        const info = new ChampionInfo(this, targetChampion.badAgainst, title, details, score);
        return this.addChampionInfo(info, targetChampion.badAgainst);
    }
    remove(targetChampion) {
        return this.removeChampionInfo(targetChampion, targetChampion.badAgainst);
    }
}
class GoodWithChampionInfoList extends ChampionInfoList {
    add(targetChampion, title, details, score) {
        const info = new ChampionInfo(this, targetChampion.goodWith, title, details, score);
        return this.addChampionInfo(info, targetChampion.goodWith);
    }
    remove(targetChampion) {
        return this.removeChampionInfo(targetChampion, targetChampion.goodWith);
    }
}
class BadAgainstChampionInfoList extends ChampionInfoList {
    add(targetChampion, title, details, score) {
        const info = new ChampionInfo(this, targetChampion.goodAgainst, title, details, score);
        return this.addChampionInfo(info, targetChampion.goodAgainst);
    }
    remove(targetChampion) {
        return this.removeChampionInfo(targetChampion, targetChampion.goodAgainst);
    }
}
class ReadOnlyChampionInfoUI extends UIElement {
    constructor(champion, info, title, color, w) {
        super(ChampionInfo.load(champion, info, title, color, w));
    }
    static getGoodAgainst(champion, info, w) {
        return new ReadOnlyChampionInfoUI(champion, info, "Good Against ", "#ffffff", w);
    }
    static getGoodWith(champion, info, w) {
        return new ReadOnlyChampionInfoUI(champion, info, "Good With ", "#ffffff", w);
    }
    static getBadAgainst(champion, info, w) {
        return new ReadOnlyChampionInfoUI(champion, info, "Bad Against ", "#ffffff", w);
    }
    static getBadWith(champion, info, w) {
        return new ReadOnlyChampionInfoUI(champion, info, "Bad With ", "#ffffff", w);
    }
}
class EditableChampionInfoUI extends UIElement {
    constructor(info, title, color, w, infos, parent) {
        super(ChampionInfo.loadEditable(info, title, color, w, infos, parent));
    }
    static getGoodAgainst(info, w, infos, parent) {
        return new EditableChampionInfoUI(info, "Good Against ", "#ffffff", w, infos, parent);
    }
    static getGoodWith(info, w, infos, parent) {
        return new EditableChampionInfoUI(info, "Good With ", "#ffffff", w, infos, parent);
    }
    static getBadAgainst(info, w, infos, parent) {
        return new EditableChampionInfoUI(info, "Bad Against ", "#ffffff", w, infos, parent);
    }
    static getBadWith(info, w, infos, parent) {
        return new EditableChampionInfoUI(info, "Bad With ", "#ffffff", w, infos, parent);
    }
}
class ChampionScore {
    constructor() {
        this.champions = [];
        this.score = 0;
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
var _a;
const miniPopUpInfo = new (_a = class MiniPopUpInfo extends UIElement {
        constructor() {
            super(document.createElement('div'));
            this.modifyStyle.position = "fixed";
            this.modifyStyle.backgroundColor = "black";
            this.modifyStyle.zIndex = "99";
            this.modifyStyle.pointerEvents = "none";
            this.modifyEvents.addOnPointerLeave(() => this.hide());
            this.goodAgainstDiv = this.getBackground("BlueFadeOut.png", "GA");
            this.goodWithDiv = this.getBackground("BlueFadeOut.png", "GW");
            this.badAgainstDiv = this.getBackground("RedFadeOut.png", "BA");
            PointerUtility.addOnMove(source => {
                const pos = MathUtility.clampElement(source.position.x + 10, source.position.y + 10, this.modifyElement);
                this.modifyStyle.left = pos.x + "px";
                this.modifyStyle.top = pos.y + "px";
            });
            this.hide();
        }
        getBackground(imgName, title) {
            const holderDiv = document.createElement('div');
            this.modifyElement.appendChild(holderDiv);
            holderDiv.style.display = "block";
            holderDiv.style.backgroundImage = `url(${getImagePath(imgName)})`;
            holderDiv.style.backgroundRepeat = "no-repeat";
            holderDiv.style.backgroundSize = "100% 100%";
            holderDiv.style.padding = "0px";
            holderDiv.style.margin = "0px";
            holderDiv.style.whiteSpace = "nowrap";
            const dummyDiv = document.createElement('div');
            holderDiv.appendChild(dummyDiv);
            dummyDiv.style.height = MiniPopUpInfo.width + "px";
            dummyDiv.style.width = MiniPopUpInfo.width + "px";
            dummyDiv.style.padding = "0px";
            dummyDiv.style.margin = "0px";
            dummyDiv.style.display = "inline-block";
            dummyDiv.style.position = "relative";
            const textUI = TextUtility.getTextUI(title);
            dummyDiv.appendChild(textUI.modifyElement);
            textUI.modifyStyle.width = "100%";
            textUI.modifyStyle.height = "100%";
            textUI.modifyStyle.position = "absolute";
            textUI.modifyStyle.textAlign = "center";
            textUI.modifyStyle.fontSize = "12px";
            const div = document.createElement('div');
            holderDiv.appendChild(div);
            div.style.height = MiniPopUpInfo.width + "px";
            div.style.minWidth = MiniPopUpInfo.width + "px";
            div.style.display = "inline-block";
            div.style.padding = "0px";
            div.style.margin = "0px";
            return div;
        }
        static getImage(champion) {
            const img = new ImageUI();
            img.modifyElement.src = champion.getImageSrcPath();
            img.modifyStyle.width = this.width + "px";
            img.modifyStyle.height = this.width + "px";
            return img;
        }
        static loadImages(champion, holder, infos) {
            for (let info of infos.getInfos()) {
                const img = this.getImage(info.getChampion(champion));
                holder.appendChild(img.modifyElement);
            }
        }
        display(champion) {
            clearChildren(this.goodAgainstDiv);
            clearChildren(this.goodWithDiv);
            clearChildren(this.badAgainstDiv);
            MiniPopUpInfo.loadImages(champion, this.goodAgainstDiv, champion.goodAgainst);
            MiniPopUpInfo.loadImages(champion, this.goodWithDiv, champion.goodWith);
            MiniPopUpInfo.loadImages(champion, this.badAgainstDiv, champion.badAgainst);
            this.modifyStyle.display = "block";
        }
        hide() {
            this.modifyStyle.display = "none";
        }
    },
    _a.width = 40,
    _a)();
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
const Random = {
    getRandomArbitrary: (min, max) => Math.random() * (max - min) + min,
    getRandomInt: (min, max) => Math.floor(Math.random() * max) + min
};
const headerText = TextUtility.getTextUI("Champion Select", 4);
headerText.modifyStyle.textAlign = "center";
headerText.modifyStyle.fontSize = "32px";
headerText.modifyStyle.margin = "0px";
headerText.modifyStyle.cursor = "default";
(() => {
    document.body.style.overflowX = "auto";
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
    numbersCheckDiv.appendChild(numbersCheckInputField.modifyElement);
    numbersCheckInputField.modifyStyle.display = "inline-block";
    const numbersCheckText = TextUtility.getTextUI();
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
        championInfoEdit.championSelectUI.addOption(name);
    }
    const visibleData = {
        name: "",
        role: Role.None,
        civilization: Civilization.None,
        mode: Mode.None,
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
        visibleData.role = (roleDropdown.selectedIndex === 0) ? 0 : (1 << (roleDropdown.selectedIndex - 1));
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
        phaseDiv.style.position = "relative";
        const phaseBtn = ButtonUtility.getButton("Phase");
        phaseDiv.appendChild(phaseBtn.modifyElement);
        const phaseDropdown = document.createElement('select');
        phaseDiv.appendChild(phaseDropdown);
        phaseDropdown.style.position = "absolute";
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
                    if (data.pickPhase)
                        DataUtility.evaluatePicks(data.friendlyTeam, data.enemyTeam);
                    else
                        DataUtility.evaluateBans(data.friendlyTeam, data.enemyTeam);
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
                    enemyTeam,
                    pickPhase: false
                });
            }
            function addPickSrcEvent(title, ui, friendlyTeam, enemyTeam) {
                srcData.data.push({
                    action: () => nextSrcEvent(),
                    title,
                    ui,
                    friendlyTeam,
                    enemyTeam,
                    pickPhase: true
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
        const resetBtn = ButtonUtility.getButton("Reset");
        resetBtn.modifyEvents.addOnClick(() => reset());
        const downloadDiv = document.createElement('div');
        UI.body.appendChild(downloadDiv);
        const downloadDataBtn = ButtonUtility.getButton("Save As", 100, 30);
        downloadDiv.appendChild(downloadDataBtn.modifyElement);
        const downloadDataInputField = new InputFieldUI();
        downloadDiv.appendChild(downloadDataInputField.modifyElement);
        downloadDataInputField.modifyStyle.position = "relative";
        downloadDataInputField.modifyStyle.top = "-10px";
        downloadDataBtn.modifyEvents.addOnClick(() => {
            const refDownload = document.createElement('a');
            refDownload.href = "data:text/json;charset=uft-8," + encodeURIComponent(JSON.stringify(ChampionData.save()));
            let fileName = downloadDataInputField.modifyElement.value;
            if (fileName === "")
                fileName = "Untitled";
            refDownload.download = fileName + ".json";
            refDownload.click();
        });
        const loadDataTextUI = TextUtility.getTextUI("Load Data: ");
        UI.body.appendChild(loadDataTextUI.modifyElement);
        const loadDataInput = new InputFieldUI();
        loadDataTextUI.modifyElement.appendChild(loadDataInput.modifyElement);
        loadDataInput.modifyElement.type = "file";
        loadDataInput.modifyElement.accept = ".json";
        loadDataInput.modifyEvents.addOnChange(() => {
            const files = loadDataInput.modifyElement.files;
            for (let i = 0, count = files.length; i < count; i++) {
                const file = files[i];
                const b = file.slice();
                b.text().then(e => {
                    ChampionData.clear();
                    ChampionData.load(JSON.parse(e));
                });
            }
        });
        const clearDataBtn = ButtonUtility.getButton("Clear");
        clearDataBtn.modifyEvents.addOnClick(() => ChampionData.clear());
    })();
})();
(() => {
    ChampionData.clear();
    ChampionData.load(JSON.parse(`[{"name":"Aatrox","role":1,"civilization":0,"mode":0,"goodAgainst":[{"name":"Gangplank","title":"Good against Gangplank","details":"TO DO: details!","score":1},{"name":"Darius","title":"Good against Darius","details":"TO DO: details!","score":1},{"name":"Galio","title":"Good against Galio","details":"TO DO: details!","score":1},{"name":"Viktor","title":"Good against Viktor","details":"TO DO: details!","score":1},{"name":"Azir","title":"Good against Azir","details":"TO DO: details!","score":1},{"name":"Malphite","title":"Good against Malphite","details":"TO DO: details!","score":1},{"name":"Malzahar","title":"Good against Malzahar","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Gnar","title":"Good with Gnar","details":"TO DO: details!","score":1},{"name":"Yasuo","title":"Good with Yasuo","details":"TO DO: details!","score":1},{"name":"Azir","title":"Good with Azir","details":"TO DO: details!","score":1},{"name":"Cho'Gath","title":"Good with Cho'Gath","details":"TO DO: details!","score":1},{"name":"Garen","title":"Good with Garen","details":"TO DO: details!","score":1},{"name":"Lee Sin","title":"Good with Lee Sin","details":"TO DO: details!","score":1},{"name":"Master Yi","title":"Good with Master Yi","details":"TO DO: details!","score":1},{"name":"Olaf","title":"Good with Olaf","details":"TO DO: details!","score":1},{"name":"Tryndamere","title":"Good with Tryndamere","details":"TO DO: details!","score":1},{"name":"Twisted Fate","title":"Good with Twisted Fate","details":"TO DO: details!","score":1},{"name":"Vel'Koz","title":"Good with Vel'Koz","details":"TO DO: details!","score":1},{"name":"Zilean","title":"Good with Zilean","details":"TO DO: details!","score":1}]},{"name":"Ahri","role":2,"civilization":0,"mode":0,"goodAgainst":[{"name":"Cho'Gath","title":"Good against Cho'Gath","details":"TO DO: details!","score":1},{"name":"Azir","title":"Good against Azir","details":"TO DO: details!","score":1},{"name":"Viktor","title":"Good against Viktor","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Jax","title":"Good with Jax","details":"TO DO: details!","score":1},{"name":"Riven","title":"Good with Riven","details":"TO DO: details!","score":1},{"name":"Irelia","title":"Good with Irelia","details":"TO DO: details!","score":1},{"name":"Fiora","title":"Good with Fiora","details":"TO DO: details!","score":1},{"name":"Kassadin","title":"Good with Kassadin","details":"TO DO: details!","score":1},{"name":"Master Yi","title":"Good with Master Yi","details":"TO DO: details!","score":1},{"name":"Ryze","title":"Good with Ryze","details":"TO DO: details!","score":1},{"name":"Udyr","title":"Good with Udyr","details":"TO DO: details!","score":1}]},{"name":"Akali","role":3,"civilization":0,"mode":0,"goodAgainst":[{"name":"Nasus","title":"Good against Nasus","details":"TO DO: details!","score":1},{"name":"Garen","title":"Good against Garen","details":"TO DO: details!","score":1},{"name":"Poppy","title":"Good against Poppy","details":"TO DO: details!","score":1},{"name":"Aurelion Sol","title":"Good against Aurelion Sol","details":"Akali will get up in the face of Aurelion Sol and make it difficult for him to get off. She can hide in her shroud and to avoid being blasted away, as long as she makes sure to avoid his stars from revealing her position. Her ultimate can close the gap and so can her shuriken.","score":1}],"goodWith":[{"name":"Diana","title":"Good with Diana","details":"TO DO: details!","score":1},{"name":"LeBlanc","title":"Good with LeBlanc","details":"TO DO: details!","score":1},{"name":"Katarina","title":"Good with Katarina","details":"TO DO: details!","score":1},{"name":"Shen","title":"Good with Shen","details":"TO DO: details!","score":1}]},{"name":"Alistar","role":8,"civilization":0,"mode":0,"goodWith":[{"name":"Azir","title":"Good with Azir","details":"Alistar will make Azir's life easier with his stuns and knockups. Alistar can push away enemies if they get too close or direct them into the soliders with a headbutt. He can also smash to send enemies flying which can be followed up with Azir's ultimate.","score":1},{"name":"Kalista","title":"Good with Kalista","details":"TO DO: details!","score":1},{"name":"LeBlanc","title":"Good with LeBlanc","details":"TO DO: details!","score":1},{"name":"Swain","title":"Good with Swain","details":"TO DO: details!","score":1},{"name":"Tristana","title":"Good with Tristana","details":"TO DO: details!","score":1},{"name":"Yasuo","title":"Good with Yasuo","details":"TO DO: details!","score":1}]},{"name":"Amumu","role":16,"civilization":0,"mode":0,"goodAgainst":[{"name":"Graves","title":"Good against Graves","details":"TO DO: details!","score":1},{"name":"Shyvana","title":"Good against Shyvana","details":"TO DO: details!","score":1},{"name":"Lee Sin","title":"Good against Lee Sin","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Katarina","title":"Good with Katarina","details":"TO DO: details!","score":1},{"name":"Fiddlesticks","title":"Good with Fiddlesticks","details":"TO DO: details!","score":1},{"name":"Morgana","title":"Good with Morgana","details":"TO DO: details!","score":1},{"name":"Annie","title":"Good with Annie","details":"TO DO: details!","score":1},{"name":"Brand","title":"Good with Brand","details":"TO DO: details!","score":1},{"name":"Fizz","title":"Good with Fizz","details":"TO DO: details!","score":1},{"name":"Gangplank","title":"Good with Gangplank","details":"TO DO: details!","score":1},{"name":"Karthus","title":"Good with Karthus","details":"TO DO: details!","score":1},{"name":"Kennen","title":"Good with Kennen","details":"TO DO: details!","score":1},{"name":"Lissandra","title":"Good with Lissandra","details":"TO DO: details!","score":1},{"name":"Malzahar","title":"Good with Malzahar","details":"TO DO: details!","score":1},{"name":"Rumble","title":"Good with Rumble","details":"TO DO: details!","score":1},{"name":"Veigar","title":"Good with Veigar","details":"TO DO: details!","score":1},{"name":"Vel'Koz","title":"Good with Vel'Koz","details":"TO DO: details!","score":1},{"name":"Ziggs","title":"Good with Ziggs","details":"TO DO: details!","score":1},{"name":"Zyra","title":"Good with Zyra","details":"TO DO: details!","score":1}]},{"name":"Anivia","role":2,"civilization":0,"mode":0,"goodAgainst":[{"name":"Kayle","title":"Good against Kayle","details":"TO DO: details!","score":1},{"name":"Azir","title":"Good against Azir","details":"TO DO: details!","score":1},{"name":"Akali","title":"Good against Akali","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Jarvan IV","title":"Good with Jarvan IV","details":"TO DO: details!","score":1},{"name":"Dr. Mundo","title":"Good with Dr. Mundo","details":"TO DO: details!","score":1},{"name":"Vayne","title":"Good with Vayne","details":"TO DO: details!","score":1}]},{"name":"Annie","role":10,"civilization":0,"mode":0,"goodAgainst":[{"name":"Diana","title":"Good against Diana","details":"TO DO: details!","score":1},{"name":"Jayce","title":"Good against Jayce","details":"TO DO: details!","score":1},{"name":"Viktor","title":"Good against Viktor","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Amumu","title":"Good with Annie","details":"TO DO: details!","score":1},{"name":"Jinx","title":"Good with Jinx","details":"TO DO: details!","score":1},{"name":"Lucian","title":"Good with Lucian","details":"TO DO: details!","score":1}]},{"name":"Ashe","role":4,"civilization":0,"mode":0,"goodAgainst":[{"name":"Corki","title":"Good against Corki","details":"TO DO: details!","score":1},{"name":"Lucian","title":"Good against Lucian","details":"TO DO: details!","score":1},{"name":"Sivir","title":"Good against Sivir","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Leona","title":"Good with Leona","details":"TO DO: details!","score":1},{"name":"Janna","title":"Good with Janna","details":"TO DO: details!","score":1},{"name":"Thresh","title":"Good with Thresh","details":"TO DO: details!","score":1},{"name":"Gragas","title":"Good with Gragas","details":"TO DO: details!","score":1},{"name":"Master Yi","title":"Good with Master Yi","details":"TO DO: details!","score":1},{"name":"Tryndamere","title":"Good with Tryndamere","details":"TO DO: details!","score":1},{"name":"Volibear","title":"Good with Volibear","details":"TO DO: details!","score":1},{"name":"Zyra","title":"Good with Zyra","details":"TO DO: details!","score":1}]},{"name":"Aurelion Sol","role":3,"civilization":0,"mode":0,"goodAgainst":[{"name":"Zoe","title":"Good against Zoe","details":"Zoe wants to keep her distance? So does Aurelion Sol does too!","score":1},{"name":"Taliyah","title":"Good against Taliyah","details":"Taliyah can get Aurelion Sol in a bad position with her earth bump, but Aurelion Sol benefits from his stars as he can kit while dealing damage.","score":1},{"name":"Heimerdinger","title":"Good against Heimerdinger","details":"Heimerdinger's turrets cannot reach Aurelion Sol when his stars are outter-orbiting, Aurelion Sol does not need to get into the range of Heimerdinger's turrets to farm. Aurelion Sol can kit around easily while dealing damage with his stars, dodging any energized rays the turrets might throw at you, and his rockets, and his stun. Can easily escape from his ultimate sentry as well. ","score":1}],"goodWith":[{"name":"Morgana","title":"Good with Morgana","details":"Morgana keeps the enemies at bay with her skillshot and ultimate. Spell shield may not be so useful on Aurelion Sol as it is not wise for him to get close to the enemies but can let him heard engage to clean up or chase down.","score":1}]},{"name":"Azir","role":2,"civilization":0,"mode":0,"goodAgainst":[{"name":"Yasuo","title":"Good against Yasuo","details":"Azir can ultimate away Yasuo if he gets too close. Be careful for his windshield when thrusting your soliders as it can halt their movement. Other than that, there should be no worry.","score":1},{"name":"Gangplank","title":"Good against Gangplank","details":"Azir's basic attack has no travel time, it is faster than Gangplank's gun, use this to destroy barrels before he can make them explode. Azir also like to keep his distance, so barrels should not be much of a problem as long as Azir can kit well.","score":1},{"name":"Heimerdinger","title":"Good against Heimerdinger","details":"Azir can send his soliders to clear Heimerdinger's turrets.","score":1}],"goodWith":[{"name":"Aatrox","title":"Good with Azir","details":"TO DO: details!","score":1},{"name":"Alistar","title":"Good with Azir","details":"Alistar will make Azir's life easier with his stuns and knockups. Alistar can push away enemies if they get too close or direct them into the soliders with a headbutt. He can also smash to send enemies flying which can be followed up with Azir's ultimate.","score":1},{"name":"Teemo","title":"Good with Teemo","details":"Azir rather use his soliders to attack, Teemo's blind is ineffective. Teemo's shrooms can be annoying, Azir should equip himself with a red flare.","score":1},{"name":"Yasuo","title":"Good with Yasuo","details":"Azir can sending multiple enemies flying with his ultimate, perfect for Yasuo to follow up.","score":1}]},{"name":"Bard","role":8,"civilization":0,"mode":0,"goodAgainst":[{"name":"Veigar","title":"Good against Veigar","details":"TO DO: details!","score":1},{"name":"Nautilus","title":"Good against Nautilus","details":"TO DO: details!","score":1},{"name":"Braum","title":"Good against Braum","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Sion","title":"Good with Sion","details":"TO DO: details!","score":1},{"name":"Heimerdinger","title":"Good with Heimerdinger","details":"TO DO: details!","score":1},{"name":"Jhin","title":"Good with Jhin","details":"TO DO: details!","score":1},{"name":"Camille","title":"Good with Camille","details":"TO DO: details!","score":1},{"name":"Ekko","title":"Good with Ekko","details":"TO DO: details!","score":1},{"name":"Shaco","title":"Good with Shaco","details":"TO DO: details!","score":1},{"name":"Warwick","title":"Good with Warwick","details":"TO DO: details!","score":1},{"name":"Wukong","title":"Good with Wukong","details":"TO DO: details!","score":1},{"name":"Zoe","title":"Good with Zoe","details":"TO DO: details!","score":1}]},{"name":"Blitzcrank","role":8,"civilization":0,"mode":0,"goodAgainst":[{"name":"Lux","title":"Good against Lux","details":"TO DO: details!","score":1},{"name":"Zyra","title":"Good against Zyra","details":"TO DO: details!","score":1},{"name":"Nami","title":"Good against Nami","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Jinx","title":"Good with Jinx","details":"TO DO: details!","score":1},{"name":"Vayne","title":"Good with Vayne","details":"TO DO: details!","score":1},{"name":"Ezreal","title":"Good with Ezreal","details":"TO DO: details!","score":1},{"name":"Corki","title":"Good with Corki","details":"TO DO: details!","score":1},{"name":"Elise","title":"Good with Elise","details":"TO DO: details!","score":1},{"name":"Heimerdinger","title":"Good with Heimerdinger","details":"TO DO: details!","score":1},{"name":"Miss Fortune","title":"Good with Miss Fortune","details":"TO DO: details!","score":1},{"name":"Olaf","title":"Good with Olaf","details":"TO DO: details!","score":1},{"name":"Teemo","title":"Good with Teemo","details":"TO DO: details!","score":1},{"name":"Xin Zhao","title":"Good with Xin Zhao","details":"TO DO: details!","score":1}]},{"name":"Brand","role":8,"civilization":0,"mode":0,"goodAgainst":[{"name":"Vel'Koz","title":"Good against Vel'Koz","details":"TO DO: details!","score":1},{"name":"Rakan","title":"Good against Rakan","details":"TO DO: details!","score":1},{"name":"Braum","title":"Good against Braum","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Amumu","title":"Good with Brand","details":"TO DO: details!","score":1},{"name":"Sona","title":"Good with Sona","details":"TO DO: details!","score":1},{"name":"Maokai","title":"Good with Maokai","details":"TO DO: details!","score":1}]},{"name":"Braum","role":8,"civilization":0,"mode":0,"goodAgainst":[{"name":"Fiddlesticks","title":"Good against Fiddlesticks","details":"TO DO: details!","score":1},{"name":"Karma","title":"Good against Karma","details":"TO DO: details!","score":1},{"name":"Lux","title":"Good against Lux","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Lucian","title":"Good with Lucian","details":"TO DO: details!","score":1},{"name":"Ezreal","title":"Good with Ezreal","details":"TO DO: details!","score":1},{"name":"Twitch","title":"Good with Twitch","details":"TO DO: details!","score":1},{"name":"Gnar","title":"Good with Gnar","details":"TO DO: details!","score":1}]},{"name":"Caitlyn","role":4,"civilization":0,"mode":0,"goodAgainst":[{"name":"Ezreal","title":"Good against Ezreal","details":"TO DO: details!","score":1},{"name":"Ziggs","title":"Good against Ziggs","details":"TO DO: details!","score":1},{"name":"Xayah","title":"Good against Xayah","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Leona","title":"Good with Leona","details":"TO DO: details!","score":1},{"name":"Thresh","title":"Good with Thresh","details":"TO DO: details!","score":1},{"name":"Nami","title":"Good with Nami","details":"TO DO: details!","score":1},{"name":"Lulu","title":"Good with Lulu","details":"TO DO: details!","score":1},{"name":"Morgana","title":"Good with Morgana","details":"TO DO: details!","score":1},{"name":"Nidalee","title":"Good with Nidalee","details":"TO DO: details!","score":1},{"name":"Nunu","title":"Good with Nunu","details":"TO DO: details!","score":1},{"name":"Sona","title":"Good with Sona","details":"TO DO: details!","score":1},{"name":"Vi","title":"Good with Vi","details":"TO DO: details!","score":1},{"name":"Yuumi","title":"Good with Yuumi","details":"TO DO: details!","score":1}]},{"name":"Camille","role":1,"civilization":0,"mode":0,"goodAgainst":[{"name":"Cassiopeia","title":"Good against Cassiopeia","details":"TO DO: details!","score":1},{"name":"Garen","title":"Good against Garen","details":"TO DO: details!","score":1},{"name":"Dr. Mundo","title":"Good against Dr. Mundo","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Bard","title":"Good with Camille","details":"TO DO: details!","score":1},{"name":"Thresh","title":"Good with Thresh","details":"TO DO: details!","score":1},{"name":"Galio","title":"Good with Galio","details":"TO DO: details!","score":1},{"name":"Illaoi","title":"Good with Illaoi","details":"TO DO: details!","score":1},{"name":"Kled","title":"Good with Kled","details":"TO DO: details!","score":1}]},{"name":"Cassiopeia","role":2,"civilization":0,"mode":0,"goodAgainst":[{"name":"Ryze","title":"Good against Ryze","details":"TO DO: details!","score":1},{"name":"Azir","title":"Good against Azir","details":"TO DO: details!","score":1},{"name":"Zed","title":"Good against Zed","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Teemo","title":"Good with Teemo","details":"TO DO: details!","score":1},{"name":"Singed","title":"Good with Singed","details":"TO DO: details!","score":1},{"name":"Yorick","title":"Good with Yorick","details":"TO DO: details!","score":1}]},{"name":"Cho'Gath","role":19,"civilization":0,"mode":0,"goodAgainst":[{"name":"Galio","title":"Good against Galio","details":"TO DO: details!","score":1},{"name":"Pantheon","title":"Good against Pantheon","details":"TO DO: details!","score":1},{"name":"Gragas","title":"Good against Gragas","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Aatrox","title":"Good with Cho'Gath","details":"TO DO: details!","score":1},{"name":"Yasuo","title":"Good with Yasuo","details":"TO DO: details!","score":1},{"name":"Lulu","title":"Good with Lulu","details":"TO DO: details!","score":1},{"name":"Evelynn","title":"Good with Evelynn","details":"TO DO: details!","score":1},{"name":"Poppy","title":"Good with Poppy","details":"TO DO: details!","score":1}]},{"name":"Corki","role":6,"civilization":0,"mode":0,"goodAgainst":[{"name":"Diana","title":"Good against Diana","details":"TO DO: details!","score":1},{"name":"Ryze","title":"Good against Ryze","details":"TO DO: details!","score":1},{"name":"Ziggs","title":"Good against Ziggs","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Blitzcrank","title":"Good with Corki","details":"TO DO: details!","score":1},{"name":"Leona","title":"Good with Leona","details":"TO DO: details!","score":1},{"name":"Thresh","title":"Good with Thresh","details":"TO DO: details!","score":1}]},{"name":"Darius","role":1,"civilization":0,"mode":0,"goodAgainst":[{"name":"Nautilus","title":"Good against Nautilus","details":"TO DO: details!","score":1},{"name":"Galio","title":"Good against Galio","details":"TO DO: details!","score":1},{"name":"Cho'Gath","title":"Good against Cho'Gath","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Draven","title":"Good with Draven","details":"TO DO: details!","score":1},{"name":"Olaf","title":"Good with Olaf","details":"TO DO: details!","score":1},{"name":"Fiora","title":"Good with Fiora","details":"TO DO: details!","score":1},{"name":"Garen","title":"Good with Garen","details":"TO DO: details!","score":1}]},{"name":"Diana","role":2,"civilization":0,"mode":0,"goodAgainst":[{"name":"Zed","title":"Good against Zed","details":"TO DO: details!","score":1},{"name":"LeBlanc","title":"Good against LeBlanc","details":"TO DO: details!","score":1},{"name":"Lux","title":"Good against Lux","details":"TO DO: details!","score":1},{"name":"Aurelion Sol","title":"Good against Aurelion Sol","details":"","score":1}],"goodWith":[{"name":"Akali","title":"Good with Diana","details":"TO DO: details!","score":1},{"name":"Yasuo","title":"Good with Yasuo","details":"TO DO: details!","score":1},{"name":"Kassadin","title":"Good with Kassadin","details":"TO DO: details!","score":1}]},{"name":"Dr. Mundo","role":17,"civilization":0,"mode":0,"goodAgainst":[{"name":"Darius","title":"Good against Darius","details":"TO DO: details!","score":1},{"name":"Teemo","title":"Good against Teemo","details":"TO DO: details!","score":1},{"name":"Irelia","title":"Good against Irelia","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Anivia","title":"Good with Dr. Mundo","details":"TO DO: details!","score":1},{"name":"Olaf","title":"Good with Olaf","details":"TO DO: details!","score":1},{"name":"Jax","title":"Good with Jax","details":"TO DO: details!","score":1}]},{"name":"Draven","role":4,"civilization":0,"mode":0,"goodAgainst":[{"name":"Corki","title":"Good against Corki","details":"TO DO: details!","score":1},{"name":"Sivir","title":"Good against Sivir","details":"TO DO: details!","score":1},{"name":"Lucian","title":"Good against Lucian","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Darius","title":"Good with Draven","details":"TO DO: details!","score":1},{"name":"Thresh","title":"Good with Thresh","details":"TO DO: details!","score":1},{"name":"Leona","title":"Good with Leona","details":"TO DO: details!","score":1},{"name":"Janna","title":"Good with Janna","details":"TO DO: details!","score":1},{"name":"Nautilus","title":"Good with Nautilus","details":"TO DO: details!","score":1}]},{"name":"Ekko","role":18,"civilization":0,"mode":0,"goodAgainst":[{"name":"Azir","title":"Good against Azir","details":"TO DO: details!","score":1},{"name":"Karma","title":"Good against Karma","details":"TO DO: details!","score":1},{"name":"Zed","title":"Good against Zed","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Bard","title":"Good with Ekko","details":"TO DO: details!","score":1},{"name":"Galio","title":"Good with Galio","details":"TO DO: details!","score":1},{"name":"Lulu","title":"Good with Lulu","details":"TO DO: details!","score":1}]},{"name":"Elise","role":16,"civilization":0,"mode":0,"goodAgainst":[{"name":"Cho'Gath","title":"Good against Cho'Gath","details":"TO DO: details!","score":1},{"name":"Rek'Sai","title":"Good against Rek'Sai","details":"TO DO: details!","score":1},{"name":"Udyr","title":"Good against Udyr","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Blitzcrank","title":"Good with Elise","details":"TO DO: details!","score":1},{"name":"Rengar","title":"Good with Rengar","details":"TO DO: details!","score":1},{"name":"Karma","title":"Good with Karma","details":"TO DO: details!","score":1}]},{"name":"Evelynn","role":16,"civilization":0,"mode":0,"goodAgainst":[{"name":"Graves","title":"Good against Graves","details":"TO DO: details!","score":1},{"name":"Skarner","title":"Good against Skarner","details":"TO DO: details!","score":1},{"name":"Nidalee","title":"Good against Nidalee","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Cho'Gath","title":"Good with Evelynn","details":"TO DO: details!","score":1},{"name":"Shen","title":"Good with Shen","details":"TO DO: details!","score":1},{"name":"Orianna","title":"Good with Orianna","details":"TO DO: details!","score":1}]},{"name":"Ezreal","role":6,"civilization":0,"mode":0,"goodAgainst":[{"name":"Varus","title":"Good against Varus","details":"TO DO: details!","score":1},{"name":"Lucian","title":"Good against Lucian","details":"TO DO: details!","score":1},{"name":"Kalista","title":"Good against Kalista","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Blitzcrank","title":"Good with Ezreal","details":"TO DO: details!","score":1},{"name":"Braum","title":"Good with Ezreal","details":"TO DO: details!","score":1},{"name":"Sona","title":"Good with Sona","details":"TO DO: details!","score":1},{"name":"Taric","title":"Good with Taric","details":"TO DO: details!","score":1},{"name":"Leona","title":"Good with Leona","details":"TO DO: details!","score":1},{"name":"Karma","title":"Good with Karma","details":"TO DO: details!","score":1},{"name":"Kayle","title":"Good with Kayle","details":"TO DO: details!","score":1},{"name":"Lulu","title":"Good with Lulu","details":"TO DO: details!","score":1},{"name":"Lux","title":"Good with Lux","details":"TO DO: details!","score":1},{"name":"Nautilus","title":"Good with Nautilus","details":"TO DO: details!","score":1},{"name":"Soraka","title":"Good with Soraka","details":"TO DO: details!","score":1}]},{"name":"Fiddlesticks","role":24,"civilization":0,"mode":0,"goodAgainst":[{"name":"Graves","title":"Good against Graves","details":"TO DO: details!","score":1},{"name":"Amumu","title":"Good against Amumu","details":"TO DO: details!","score":1},{"name":"Rek'Sai","title":"Good against Rek'Sai","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Amumu","title":"Good with Fiddlesticks","details":"TO DO: details!","score":1},{"name":"Galio","title":"Good with Galio","details":"TO DO: details!","score":1},{"name":"Kennen","title":"Good with Kennen","details":"TO DO: details!","score":1},{"name":"Neeko","title":"Good with Neeko","details":"TO DO: details!","score":1}]},{"name":"Fiora","role":1,"civilization":0,"mode":0,"goodAgainst":[{"name":"Galio","title":"Good against Galio","details":"TO DO: details!","score":1},{"name":"Cho'Gath","title":"Good against Cho'Gath","details":"TO DO: details!","score":1},{"name":"Nautilus","title":"Good against Nautilus","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Ahri","title":"Good with Fiora","details":"TO DO: details!","score":1},{"name":"Darius","title":"Good with Fiora","details":"TO DO: details!","score":1},{"name":"Volibear","title":"Good with Volibear","details":"TO DO: details!","score":1}]},{"name":"Fizz","role":2,"civilization":0,"mode":0,"goodAgainst":[{"name":"Ryze","title":"Good against Ryze","details":"TO DO: details!","score":1},{"name":"Aurelion Sol","title":"Good against Aurelion Sol","details":"TO DO: details!","score":1},{"name":"Syndra","title":"Good against Syndra","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Amumu","title":"Good with Fizz","details":"TO DO: details!","score":1},{"name":"Talon","title":"Good with Talon","details":"TO DO: details!","score":1},{"name":"Nami","title":"Good with Nami","details":"TO DO: details!","score":1}]},{"name":"Galio","role":11,"civilization":0,"mode":0,"goodAgainst":[{"name":"Dr. Mundo","title":"Good against Dr. Mundo","details":"TO DO: details!","score":1},{"name":"Poppy","title":"Good against Poppy","details":"TO DO: details!","score":1},{"name":"Mordekaiser","title":"Good against Mordekaiser","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Camille","title":"Good with Galio","details":"TO DO: details!","score":1},{"name":"Ekko","title":"Good with Galio","details":"TO DO: details!","score":1},{"name":"Fiddlesticks","title":"Good with Galio","details":"TO DO: details!","score":1},{"name":"Katarina","title":"Good with Katarina","details":"TO DO: details!","score":1},{"name":"Wukong","title":"Good with Wukong","details":"TO DO: details!","score":1},{"name":"Nunu","title":"Good with Nunu","details":"TO DO: details!","score":1},{"name":"Illaoi","title":"Good with Illaoi","details":"TO DO: details!","score":1},{"name":"Kindred","title":"Good with Kindred","details":"TO DO: details!","score":1},{"name":"Kled","title":"Good with Kled","details":"TO DO: details!","score":1},{"name":"Shaco","title":"Good with Shaco","details":"TO DO: details!","score":1},{"name":"Warwick","title":"Good with Warwick","details":"TO DO: details!","score":1},{"name":"Xayah","title":"Good with Xayah","details":"TO DO: details!","score":1}]},{"name":"Gangplank","role":3,"civilization":0,"mode":0,"goodAgainst":[{"name":"Lissandra","title":"Good against Lissandra","details":"TO DO: details!","score":1},{"name":"Galio","title":"Good against Galio","details":"TO DO: details!","score":1},{"name":"Shen","title":"Good against Shen","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Amumu","title":"Good with Gangplank","details":"TO DO: details!","score":1},{"name":"Nunu","title":"Good with Nunu","details":"TO DO: details!","score":1},{"name":"Twisted Fate","title":"Good with Twisted Fate","details":"TO DO: details!","score":1}]},{"name":"Garen","role":1,"civilization":0,"mode":0,"goodAgainst":[{"name":"Malphite","title":"Good against Malphite","details":"TO DO: details!","score":1},{"name":"Shen","title":"Good against Shen","details":"TO DO: details!","score":1},{"name":"Gangplank","title":"Good against Gangplank","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Aatrox","title":"Good with Garen","details":"TO DO: details!","score":1},{"name":"Darius","title":"Good with Garen","details":"TO DO: details!","score":1},{"name":"Lux","title":"Good with Lux","details":"TO DO: details!","score":1}]},{"name":"Gnar","role":1,"civilization":0,"mode":0,"goodAgainst":[{"name":"Garen","title":"Good against Garen","details":"TO DO: details!","score":1},{"name":"Yorick","title":"Good against Yorick","details":"TO DO: details!","score":1},{"name":"Xin Zhao","title":"Good against Xin Zhao","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Aatrox","title":"Good with Gnar","details":"TO DO: details!","score":1},{"name":"Braum","title":"Good with Gnar","details":"TO DO: details!","score":1},{"name":"Jarvan IV","title":"Good with Jarvan IV","details":"TO DO: details!","score":1}]},{"name":"Gragas","role":16,"civilization":0,"mode":0,"goodAgainst":[{"name":"Diana","title":"Good against Diana","details":"TO DO: details!","score":1},{"name":"Lee Sin","title":"Good against Lee Sin","details":"TO DO: details!","score":1},{"name":"Udyr","title":"Good against Udyr","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Ashe","title":"Good with Gragas","details":"TO DO: details!","score":1},{"name":"Malphite","title":"Good with Malphite","details":"TO DO: details!","score":1},{"name":"Yasuo","title":"Good with Yasuo","details":"TO DO: details!","score":1}]},{"name":"Graves","role":18,"civilization":0,"mode":0,"goodAgainst":[{"name":"Shyvana","title":"Good against Shyvana","details":"TO DO: details!","score":1},{"name":"Olaf","title":"Good against Olaf","details":"TO DO: details!","score":1},{"name":"Xin Zhao","title":"Good against Xin Zhao","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Taric","title":"Good with Taric","details":"TO DO: details!","score":1},{"name":"Leona","title":"Good with Leona","details":"TO DO: details!","score":1},{"name":"Thresh","title":"Good with Thresh","details":"TO DO: details!","score":1}]},{"name":"Hecarim","role":16,"civilization":0,"mode":0,"goodAgainst":[{"name":"Wukong","title":"Good against Wukong","details":"TO DO: details!","score":1},{"name":"Graves","title":"Good against Graves","details":"TO DO: details!","score":1},{"name":"Rek'Sai","title":"Good against Rek'Sai","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Orianna","title":"Good with Orianna","details":"TO DO: details!","score":1},{"name":"Zilean","title":"Good with Zilean","details":"TO DO: details!","score":1},{"name":"Malphite","title":"Good with Malphite","details":"TO DO: details!","score":1}]},{"name":"Heimerdinger","role":15,"civilization":0,"mode":0,"goodAgainst":[{"name":"Illaoi","title":"Good against Illaoi","details":"TO DO: details!","score":1},{"name":"Camille","title":"Good against Camille","details":"TO DO: details!","score":1},{"name":"Shen","title":"Good against Shen","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Bard","title":"Good with Heimerdinger","details":"TO DO: details!","score":1},{"name":"Blitzcrank","title":"Good with Heimerdinger","details":"TO DO: details!","score":1},{"name":"Thresh","title":"Good with Thresh","details":"TO DO: details!","score":1},{"name":"Vi","title":"Good with Vi","details":"TO DO: details!","score":1},{"name":"Skarner","title":"Good with Skarner","details":"TO DO: details!","score":1}]},{"name":"Illaoi","role":1,"civilization":0,"mode":0,"goodAgainst":[{"name":"Galio","title":"Good against Galio","details":"TO DO: details!","score":1},{"name":"Shen","title":"Good against Shen","details":"TO DO: details!","score":1},{"name":"Jayce","title":"Good against Jayce","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Camille","title":"Good with Illaoi","details":"TO DO: details!","score":1},{"name":"Galio","title":"Good with Illaoi","details":"TO DO: details!","score":1},{"name":"Lulu","title":"Good with Lulu","details":"TO DO: details!","score":1}]},{"name":"Irelia","role":3,"civilization":0,"mode":0,"goodAgainst":[{"name":"Nasus","title":"Good against Nasus","details":"TO DO: details!","score":1},{"name":"Poppy","title":"Good against Poppy","details":"TO DO: details!","score":1},{"name":"Rengar","title":"Good against Rengar","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Ahri","title":"Good with Irelia","details":"TO DO: details!","score":1},{"name":"Riven","title":"Good with Riven","details":"TO DO: details!","score":1},{"name":"Malphite","title":"Good with Malphite","details":"TO DO: details!","score":1}]},{"name":"Ivern","role":16,"civilization":0,"mode":0,"goodAgainst":[{"name":"Udyr","title":"Good against Udyr","details":"TO DO: details!","score":1},{"name":"Fiddlesticks","title":"Good against Fiddlesticks","details":"TO DO: details!","score":1},{"name":"Shyvana","title":"Good against Shyvana","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Yasuo","title":"Good with Yasuo","details":"TO DO: details!","score":1},{"name":"Xayah","title":"Good with Xayah","details":"TO DO: details!","score":1},{"name":"Riven","title":"Good with Riven","details":"TO DO: details!","score":1}]},{"name":"Janna","role":8,"civilization":0,"mode":0,"goodAgainst":[{"name":"Annie","title":"Good against Annie","details":"TO DO: details!","score":1},{"name":"Nautilus","title":"Good against Nautilus","details":"TO DO: details!","score":1},{"name":"Taric","title":"Good against Taric","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Ashe","title":"Good with Janna","details":"TO DO: details!","score":1},{"name":"Draven","title":"Good with Janna","details":"TO DO: details!","score":1},{"name":"Yasuo","title":"Good with Yasuo","details":"TO DO: details!","score":1},{"name":"Ornn","title":"Good with Ornn","details":"TO DO: details!","score":1},{"name":"Urgot","title":"Good with Urgot","details":"TO DO: details!","score":1}]},{"name":"Jarvan IV","role":16,"civilization":0,"mode":0,"goodAgainst":[{"name":"Rek'Sai","title":"Good against Rek'Sai","details":"TO DO: details!","score":1},{"name":"Olaf","title":"Good against Olaf","details":"TO DO: details!","score":1},{"name":"Xin Zhao","title":"Good against Xin Zhao","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Anivia","title":"Good with Jarvan IV","details":"TO DO: details!","score":1},{"name":"Gnar","title":"Good with Jarvan IV","details":"TO DO: details!","score":1},{"name":"Orianna","title":"Good with Orianna","details":"TO DO: details!","score":1},{"name":"Katarina","title":"Good with Katarina","details":"TO DO: details!","score":1},{"name":"Malzahar","title":"Good with Malzahar","details":"TO DO: details!","score":1},{"name":"Rumble","title":"Good with Rumble","details":"TO DO: details!","score":1},{"name":"Trundle","title":"Good with Trundle","details":"TO DO: details!","score":1},{"name":"Viktor","title":"Good with Viktor","details":"Jarvan IV can trap enemies within his ultimate which allows for Viktor's ultimate to maximize damage. Hard CC can be chained with Jarvan IV's CC dash and Viktor's gravitational field.","score":1},{"name":"Xerath","title":"Good with Xerath","details":"TO DO: details!","score":1},{"name":"Ziggs","title":"Good with Ziggs","details":"TO DO: details!","score":1}]},{"name":"Jax","role":1,"civilization":0,"mode":0,"goodAgainst":[{"name":"Tahm Kench","title":"Good against Tahm Kench","details":"TO DO: details!","score":1},{"name":"Nautilus","title":"Good against Nautilus","details":"TO DO: details!","score":1},{"name":"Ekko","title":"Good against Ekko","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Ahri","title":"Good with Jax","details":"TO DO: details!","score":1},{"name":"Dr. Mundo","title":"Good with Jax","details":"TO DO: details!","score":1},{"name":"Pantheon","title":"Good with Pantheon","details":"TO DO: details!","score":1},{"name":"Teemo","title":"Good with Teemo","details":"TO DO: details!","score":1},{"name":"Ryze","title":"Good with Ryze","details":"TO DO: details!","score":1}]},{"name":"Jayce","role":3,"civilization":0,"mode":0,"goodAgainst":[{"name":"Dr. Mundo","title":"Good against Dr. Mundo","details":"TO DO: details!","score":1},{"name":"Urgot","title":"Good against Urgot","details":"TO DO: details!","score":1},{"name":"Cassiopeia","title":"Good against Cassiopeia","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Nidalee","title":"Good with Nidalee","details":"TO DO: details!","score":1},{"name":"Skarner","title":"Good with Skarner","details":"TO DO: details!","score":1},{"name":"Leona","title":"Good with Leona","details":"TO DO: details!","score":1}]},{"name":"Jhin","role":4,"civilization":0,"mode":0,"goodAgainst":[{"name":"Ezreal","title":"Good against Ezreal","details":"TO DO: details!","score":1},{"name":"Corki","title":"Good against Corki","details":"TO DO: details!","score":1},{"name":"Lucian","title":"Good against Lucian","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Bard","title":"Good with Jhin","details":"TO DO: details!","score":1},{"name":"Leona","title":"Good with Leona","details":"TO DO: details!","score":1},{"name":"Thresh","title":"Good with Thresh","details":"TO DO: details!","score":1},{"name":"Pyke","title":"Good with Pyke","details":"TO DO: details!","score":1},{"name":"Rakan","title":"Good with Rakan","details":"TO DO: details!","score":1},{"name":"Senna","title":"Good with Senna","details":"TO DO: details!","score":1},{"name":"Tahm Kench","title":"Good with Tahm Kench","details":"TO DO: details!","score":1}]},{"name":"Jinx","role":4,"civilization":0,"mode":0,"goodAgainst":[{"name":"Sivir","title":"Good against Sivir","details":"TO DO: details!","score":1},{"name":"Kalista","title":"Good against Kalista","details":"TO DO: details!","score":1},{"name":"Ashe","title":"Good against Ashe","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Annie","title":"Good with Jinx","details":"TO DO: details!","score":1},{"name":"Blitzcrank","title":"Good with Jinx","details":"TO DO: details!","score":1},{"name":"Leona","title":"Good with Leona","details":"TO DO: details!","score":1},{"name":"Thresh","title":"Good with Thresh","details":"TO DO: details!","score":1},{"name":"Karma","title":"Good with Karma","details":"TO DO: details!","score":1},{"name":"Lux","title":"Good with Lux","details":"TO DO: details!","score":1},{"name":"Morgana","title":"Good with Morgana","details":"TO DO: details!","score":1},{"name":"Nami","title":"Good with Nami","details":"TO DO: details!","score":1},{"name":"Tahm Kench","title":"Good with Tahm Kench","details":"TO DO: details!","score":1},{"name":"Yuumi","title":"Good with Yuumi","details":"TO DO: details!","score":1}]},{"name":"Kai'Sa","role":4,"civilization":0,"mode":0,"goodAgainst":[{"name":"Corki","title":"Good against Corki","details":"TO DO: details!","score":1},{"name":"Kalista","title":"Good against Kalista","details":"TO DO: details!","score":1},{"name":"Ashe","title":"Good against Ashe","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Leona","title":"Good with Leona","details":"TO DO: details!","score":1},{"name":"Thresh","title":"Good with Thresh","details":"TO DO: details!","score":1},{"name":"Zac","title":"Good with Zac","details":"TO DO: details!","score":1},{"name":"Pyke","title":"Good with Pyke","details":"TO DO: details!","score":1}]},{"name":"Kalista","role":4,"civilization":0,"mode":0,"goodAgainst":[{"name":"Corki","title":"Good against Corki","details":"TO DO: details!","score":1},{"name":"Lucian","title":"Good against Lucian","details":"TO DO: details!","score":1},{"name":"Varus","title":"Good against Varus","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Alistar","title":"Good with Kalista","details":"TO DO: details!","score":1},{"name":"Tahm Kench","title":"Good with Tahm Kench","details":"TO DO: details!","score":1},{"name":"Thresh","title":"Good with Thresh","details":"TO DO: details!","score":1}]},{"name":"Karma","role":11,"civilization":0,"mode":0,"goodAgainst":[{"name":"Veigar","title":"Good against Veigar","details":"TO DO: details!","score":1},{"name":"Zilean","title":"Good against Zilean","details":"TO DO: details!","score":1},{"name":"Morgana","title":"Good against Morgana","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Elise","title":"Good with Karma","details":"TO DO: details!","score":1},{"name":"Ezreal","title":"Good with Karma","details":"TO DO: details!","score":1},{"name":"Jinx","title":"Good with Karma","details":"TO DO: details!","score":1},{"name":"Vayne","title":"Good with Vayne","details":"TO DO: details!","score":1}]},{"name":"Karthus","role":18,"civilization":0,"mode":0,"goodAgainst":[{"name":"Yasuo","title":"Good against Yasuo","details":"TO DO: details!","score":1},{"name":"Twisted Fate","title":"Good against Twisted Fate","details":"TO DO: details!","score":1},{"name":"Kassadin","title":"Good against Kassadin","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Amumu","title":"Good with Karthus","details":"TO DO: details!","score":1},{"name":"Kayle","title":"Good with Kayle","details":"TO DO: details!","score":1},{"name":"Yorick","title":"Good with Yorick","details":"TO DO: details!","score":1}]},{"name":"Kassadin","role":2,"civilization":0,"mode":0,"goodAgainst":[{"name":"Azir","title":"Good against Azir","details":"Kassadin can close the gap between Azir and him very easily with his ultimate. If Azir uses his ultimate to get Kassadin off, Kassadin can use his ultimate again after a short delay to teleport right back to him.","score":1},{"name":"Karma","title":"Good against Karma","details":"TO DO: details!","score":1},{"name":"LeBlanc","title":"Good against LeBlanc","details":"TO DO: details!","score":1},{"name":"Aurelion Sol","title":"Good against Aurelion Sol","details":"Kassadin will get near Aurelion Sol, exactly what he does not want. He also has a mage shield protecting his from some star damage. Kassadin will usually stay within the inner-layer of stars, so Aurelion Sol better be running!","score":1}],"goodWith":[{"name":"Ahri","title":"Good with Kassadin","details":"TO DO: details!","score":1},{"name":"Diana","title":"Good with Kassadin","details":"TO DO: details!","score":1},{"name":"Lee Sin","title":"Good with Lee Sin","details":"TO DO: details!","score":1}]},{"name":"Katarina","role":2,"civilization":0,"mode":0,"goodAgainst":[{"name":"Ryze","title":"Good against Ryze","details":"TO DO: details!","score":1},{"name":"Syndra","title":"Good against Syndra","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Akali","title":"Good with Katarina","details":"TO DO: details!","score":1},{"name":"Amumu","title":"Good with Katarina","details":"TO DO: details!","score":1},{"name":"Galio","title":"Good with Katarina","details":"TO DO: details!","score":1},{"name":"Jarvan IV","title":"Good with Katarina","details":"TO DO: details!","score":1},{"name":"Morgana","title":"Good with Morgana","details":"TO DO: details!","score":1},{"name":"Kayle","title":"Good with Kayle","details":"TO DO: details!","score":1},{"name":"Malphite","title":"Good with Malphite","details":"TO DO: details!","score":1},{"name":"Neeko","title":"Good with Neeko","details":"TO DO: details!","score":1},{"name":"Sejuani","title":"Good with Sejuani","details":"TO DO: details!","score":1}]},{"name":"Kayle","role":1,"civilization":0,"mode":0,"goodAgainst":[{"name":"Garen","title":"Good against Garen","details":"TO DO: details!","score":1},{"name":"Poppy","title":"Good against Poppy","details":"TO DO: details!","score":1},{"name":"Galio","title":"Good against Galio","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Ezreal","title":"Good with Kayle","details":"TO DO: details!","score":1},{"name":"Karthus","title":"Good with Kayle","details":"TO DO: details!","score":1},{"name":"Katarina","title":"Good with Kayle","details":"TO DO: details!","score":1}]},{"name":"Kennen","role":1,"civilization":0,"mode":0,"goodAgainst":[{"name":"Shen","title":"Good against Shen","details":"TO DO: details!","score":1},{"name":"Quinn","title":"Good against Quinn","details":"TO DO: details!","score":1},{"name":"Mordekaiser","title":"Good against Mordekaiser","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Amumu","title":"Good with Kennen","details":"TO DO: details!","score":1},{"name":"Fiddlesticks","title":"Good with Kennen","details":"TO DO: details!","score":1},{"name":"Vladimir","title":"Good with Vladimir","details":"TO DO: details!","score":1},{"name":"Ziggs","title":"Good with Ziggs","details":"TO DO: details!","score":1}]},{"name":"Kha'Zix","role":16,"civilization":0,"mode":0,"goodAgainst":[{"name":"Diana","title":"Good against Diana","details":"TO DO: details!","score":1},{"name":"Graves","title":"Good against Graves","details":"TO DO: details!","score":1},{"name":"Olaf","title":"Good against Olaf","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Rengar","title":"Good with Rengar","details":"TO DO: details!","score":1},{"name":"Xin Zhao","title":"Good with Xin Zhao","details":"TO DO: details!","score":1},{"name":"Nasus","title":"Good with Nasus","details":"TO DO: details!","score":1}]},{"name":"Kindred","role":16,"civilization":0,"mode":0,"goodAgainst":[{"name":"Rek'Sai","title":"Good against Rek'Sai","details":"TO DO: details!","score":1},{"name":"Xin Zhao","title":"Good against Xin Zhao","details":"TO DO: details!","score":1},{"name":"Fiddlesticks","title":"Good against Fiddlesticks","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Galio","title":"Good with Kindred","details":"TO DO: details!","score":1},{"name":"Sion","title":"Good with Sion","details":"TO DO: details!","score":1},{"name":"Zed","title":"Good with Zed","details":"TO DO: details!","score":1},{"name":"Taliyah","title":"Good with Taliyah","details":"TO DO: details!","score":1}]},{"name":"Kled","role":1,"civilization":0,"mode":0,"goodAgainst":[{"name":"Rengar","title":"Good against Rengar","details":"TO DO: details!","score":1},{"name":"Cho'Gath","title":"Good against Cho'Gath","details":"TO DO: details!","score":1},{"name":"Quinn","title":"Good against Quinn","details":"TO DO: details!","score":1},{"name":"Azir","title":"Good against Azir","details":"Kled can completely destroy Azir with his ultimate or if he lands a pull with his hook. Kled's ultimate cannot be stopped, so Azir must get out of the way before it's too late.","score":1}],"goodWith":[{"name":"Camille","title":"Good with Kled","details":"TO DO: details!","score":1},{"name":"Galio","title":"Good with Kled","details":"TO DO: details!","score":1},{"name":"Master Yi","title":"Good with Master Yi","details":"TO DO: details!","score":1},{"name":"Warwick","title":"Good with Warwick","details":"TO DO: details!","score":1}]},{"name":"Kog'Maw","role":4,"civilization":0,"mode":0,"goodAgainst":[{"name":"Corki","title":"Good against Corki","details":"TO DO: details!","score":1},{"name":"Jhin","title":"Good against Jhin","details":"TO DO: details!","score":1},{"name":"Lucian","title":"Good against Lucian","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Nunu","title":"Good with Nunu","details":"TO DO: details!","score":1},{"name":"Lulu","title":"Good with Lulu","details":"TO DO: details!","score":1},{"name":"Nami","title":"Good with Nami","details":"TO DO: details!","score":1}]},{"name":"LeBlanc","role":2,"civilization":0,"mode":0,"goodAgainst":[{"name":"Ryze","title":"Good against Ryze","details":"TO DO: details!","score":1},{"name":"Karma","title":"Good against Karma","details":"TO DO: details!","score":1},{"name":"Lux","title":"Good against Lux","details":"TO DO: details!","score":1},{"name":"Viktor","title":"Good against Viktor","details":"LeBlanc can get in and out very quickly. Viktor won't be able to land a stun with his gravitational field and landing his laser can be difficult when facinh a flashy enemy.","score":1}],"goodWith":[{"name":"Akali","title":"Good with LeBlanc","details":"TO DO: details!","score":1},{"name":"Alistar","title":"Good with LeBlanc","details":"TO DO: details!","score":1},{"name":"Veigar","title":"Good with Veigar","details":"TO DO: details!","score":1},{"name":"Udyr","title":"Good with Udyr","details":"TO DO: details!","score":1}]},{"name":"Lee Sin","role":16,"civilization":0,"mode":0,"goodAgainst":[{"name":"Cho'Gath","title":"Good against Cho'Gath","details":"TO DO: details!","score":1},{"name":"Aatrox","title":"Good against Aatrox","details":"TO DO: details!","score":1},{"name":"Rengar","title":"Good against Rengar","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Aatrox","title":"Good with Lee Sin","details":"TO DO: details!","score":1},{"name":"Kassadin","title":"Good with Lee Sin","details":"TO DO: details!","score":1},{"name":"Yasuo","title":"Good with Yasuo","details":"TO DO: details!","score":1},{"name":"Teemo","title":"Good with Teemo","details":"TO DO: details!","score":1}]},{"name":"Leona","role":8,"civilization":0,"mode":0,"goodAgainst":[{"name":"Lux","title":"Good against Lux","details":"TO DO: details!","score":1},{"name":"Lulu","title":"Good against Lulu","details":"TO DO: details!","score":1},{"name":"Nami","title":"Good against Nami","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Ashe","title":"Good with Leona","details":"TO DO: details!","score":1},{"name":"Caitlyn","title":"Good with Leona","details":"TO DO: details!","score":1},{"name":"Corki","title":"Good with Leona","details":"TO DO: details!","score":1},{"name":"Draven","title":"Good with Leona","details":"TO DO: details!","score":1},{"name":"Ezreal","title":"Good with Leona","details":"TO DO: details!","score":1},{"name":"Graves","title":"Good with Leona","details":"TO DO: details!","score":1},{"name":"Jayce","title":"Good with Leona","details":"TO DO: details!","score":1},{"name":"Jhin","title":"Good with Leona","details":"TO DO: details!","score":1},{"name":"Jinx","title":"Good with Leona","details":"TO DO: details!","score":1},{"name":"Kai'Sa","title":"Good with Leona","details":"TO DO: details!","score":1},{"name":"Xayah","title":"Good with Xayah","details":"TO DO: details!","score":1},{"name":"Lucian","title":"Good with Lucian","details":"TO DO: details!","score":1},{"name":"Miss Fortune","title":"Good with Miss Fortune","details":"TO DO: details!","score":1},{"name":"Quinn","title":"Good with Quinn","details":"TO DO: details!","score":1},{"name":"Sivir","title":"Good with Sivir","details":"TO DO: details!","score":1},{"name":"Tristana","title":"Good with Tristana","details":"TO DO: details!","score":1},{"name":"Twitch","title":"Good with Twitch","details":"TO DO: details!","score":1},{"name":"Varus","title":"Good with Varus","details":"TO DO: details!","score":1},{"name":"Vel'Koz","title":"Good with Vel'Koz","details":"TO DO: details!","score":1}]},{"name":"Lissandra","role":2,"civilization":0,"mode":0,"goodAgainst":[{"name":"Veigar","title":"Good against Veigar","details":"TO DO: details!","score":1},{"name":"LeBlanc","title":"Good against LeBlanc","details":"TO DO: details!","score":1},{"name":"Cassiopeia","title":"Good against Cassiopeia","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Amumu","title":"Good with Lissandra","details":"TO DO: details!","score":1},{"name":"Sejuani","title":"Good with Sejuani","details":"TO DO: details!","score":1},{"name":"Trundle","title":"Good with Trundle","details":"TO DO: details!","score":1}]},{"name":"Lucian","role":6,"civilization":0,"mode":0,"goodAgainst":[{"name":"Ezreal","title":"Good against Ezreal","details":"TO DO: details!","score":1},{"name":"Vayne","title":"Good against Vayne","details":"TO DO: details!","score":1},{"name":"Corki","title":"Good against Corki","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Annie","title":"Good with Lucian","details":"TO DO: details!","score":1},{"name":"Braum","title":"Good with Lucian","details":"TO DO: details!","score":1},{"name":"Leona","title":"Good with Lucian","details":"TO DO: details!","score":1},{"name":"Thresh","title":"Good with Thresh","details":"TO DO: details!","score":1},{"name":"Senna","title":"Good with Senna","details":"TO DO: details!","score":1}]},{"name":"Lulu","role":8,"civilization":0,"mode":0,"goodAgainst":[{"name":"Lux","title":"Good against Lux","details":"TO DO: details!","score":1},{"name":"Rakan","title":"Good against Rakan","details":"TO DO: details!","score":1},{"name":"Annie","title":"Good against Annie","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Caitlyn","title":"Good with Lulu","details":"TO DO: details!","score":1},{"name":"Cho'Gath","title":"Good with Lulu","details":"TO DO: details!","score":1},{"name":"Ekko","title":"Good with Lulu","details":"TO DO: details!","score":1},{"name":"Ezreal","title":"Good with Lulu","details":"TO DO: details!","score":1},{"name":"Illaoi","title":"Good with Lulu","details":"TO DO: details!","score":1},{"name":"Kog'Maw","title":"Good with Lulu","details":"TO DO: details!","score":1},{"name":"Vayne","title":"Good with Vayne","details":"TO DO: details!","score":1},{"name":"Ornn","title":"Good with Ornn","details":"TO DO: details!","score":1}]},{"name":"Lux","role":10,"civilization":0,"mode":0,"goodAgainst":[{"name":"Ryze","title":"Good against Ryze","details":"TO DO: details!","score":1},{"name":"Galio","title":"Good against Galio","details":"TO DO: details!","score":1},{"name":"Akali","title":"Good against Akali","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Ezreal","title":"Good with Lux","details":"TO DO: details!","score":1},{"name":"Garen","title":"Good with Lux","details":"TO DO: details!","score":1},{"name":"Jinx","title":"Good with Lux","details":"TO DO: details!","score":1}]},{"name":"Malphite","role":1,"civilization":0,"mode":0,"goodAgainst":[{"name":"Nautilus","title":"Good against Nautilus","details":"TO DO: details!","score":1},{"name":"Poppy","title":"Good against Poppy","details":"TO DO: details!","score":1},{"name":"Irelia","title":"Good against Irelia","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Gragas","title":"Good with Malphite","details":"TO DO: details!","score":1},{"name":"Hecarim","title":"Good with Malphite","details":"TO DO: details!","score":1},{"name":"Irelia","title":"Good with Malphite","details":"TO DO: details!","score":1},{"name":"Katarina","title":"Good with Malphite","details":"TO DO: details!","score":1},{"name":"Yasuo","title":"Good with Yasuo","details":"TO DO: details!","score":1},{"name":"Orianna","title":"Good with Orianna","details":"TO DO: details!","score":1},{"name":"Mordekaiser","title":"Good with Mordekaiser","details":"TO DO: details!","score":1}]},{"name":"Malzahar","role":2,"civilization":0,"mode":0,"goodAgainst":[{"name":"Akali","title":"Good against Akali","details":"TO DO: details!","score":1},{"name":"Karma","title":"Good against Karma","details":"TO DO: details!","score":1},{"name":"Vladimir","title":"Good against Vladimir","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Amumu","title":"Good with Malzahar","details":"TO DO: details!","score":1},{"name":"Jarvan IV","title":"Good with Malzahar","details":"TO DO: details!","score":1},{"name":"Warwick","title":"Good with Warwick","details":"TO DO: details!","score":1},{"name":"Viktor","title":"Good with Viktor","details":"Malzahar keeps enemies in one place with his ultimate, perfect for Viktor's ultimate! Landing a gravitional stun will allow Malzahar's summons to deal damage instead of chasing.","score":1}]},{"name":"Maokai","role":1,"civilization":0,"mode":0,"goodAgainst":[{"name":"Shen","title":"Good against Shen","details":"TO DO: details!","score":1},{"name":"Gragas","title":"Good against Gragas","details":"TO DO: details!","score":1},{"name":"Kled","title":"Good against Kled","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Brand","title":"Good with Maokai","details":"TO DO: details!","score":1},{"name":"Ryze","title":"Good with Ryze","details":"TO DO: details!","score":1},{"name":"Vladimir","title":"Good with Vladimir","details":"TO DO: details!","score":1},{"name":"Swain","title":"Good with Swain","details":"TO DO: details!","score":1}]},{"name":"Master Yi","role":16,"civilization":0,"mode":0,"goodAgainst":[{"name":"Trundle","title":"Good against Trundle","details":"TO DO: details!","score":1},{"name":"Diana","title":"Good against Diana","details":"TO DO: details!","score":1},{"name":"Wukong","title":"Good against Wukong","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Aatrox","title":"Good with Master Yi","details":"TO DO: details!","score":1},{"name":"Ahri","title":"Good with Master Yi","details":"TO DO: details!","score":1},{"name":"Ashe","title":"Good with Master Yi","details":"TO DO: details!","score":1},{"name":"Kled","title":"Good with Master Yi","details":"TO DO: details!","score":1}]},{"name":"Miss Fortune","role":4,"civilization":0,"mode":0,"goodAgainst":[{"name":"Corki","title":"Good against Corki","details":"TO DO: details!","score":1},{"name":"Ezreal","title":"Good against Ezreal","details":"TO DO: details!","score":1},{"name":"Xayah","title":"Good against Xayah","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Blitzcrank","title":"Good with Miss Fortune","details":"TO DO: details!","score":1},{"name":"Leona","title":"Good with Miss Fortune","details":"TO DO: details!","score":1},{"name":"Sona","title":"Good with Sona","details":"TO DO: details!","score":1},{"name":"Pyke","title":"Good with Pyke","details":"TO DO: details!","score":1},{"name":"Rakan","title":"Good with Rakan","details":"TO DO: details!","score":1}]},{"name":"Mordekaiser","role":1,"civilization":0,"mode":0,"goodAgainst":[{"name":"Shen","title":"Good against Shen","details":"TO DO: details!","score":1},{"name":"Malphite","title":"Good against Malphite","details":"TO DO: details!","score":1},{"name":"Irelia","title":"Good against Irelia","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Malphite","title":"Good with Mordekaiser","details":"TO DO: details!","score":1},{"name":"Yorick","title":"Good with Yorick","details":"TO DO: details!","score":1},{"name":"Wukong","title":"Good with Wukong","details":"TO DO: details!","score":1}]},{"name":"Morgana","role":10,"civilization":0,"mode":0,"goodAgainst":[{"name":"Veigar","title":"Good against Veigar","details":"TO DO: details!","score":1},{"name":"Lux","title":"Good against Lux","details":"TO DO: details!","score":1},{"name":"Rakan","title":"Good against Rakan","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Amumu","title":"Good with Morgana","details":"TO DO: details!","score":1},{"name":"Aurelion Sol","title":"Good with Morgana","details":"Morgana keeps the enemies at bay with her skillshot and ultimate. Spell shield may not be so useful on Aurelion Sol as it is not wise for him to get close to the enemies but can let him heard engage to clean up or chase down.","score":1},{"name":"Caitlyn","title":"Good with Morgana","details":"TO DO: details!","score":1},{"name":"Jinx","title":"Good with Morgana","details":"TO DO: details!","score":1},{"name":"Katarina","title":"Good with Morgana","details":"TO DO: details!","score":1},{"name":"Varus","title":"Good with Varus","details":"TO DO: details!","score":1},{"name":"Neeko","title":"Good with Neeko","details":"TO DO: details!","score":1}]},{"name":"Nami","role":8,"civilization":0,"mode":0,"goodAgainst":[{"name":"Trundle","title":"Good against Trundle","details":"TO DO: details!","score":1},{"name":"Lux","title":"Good against Lux","details":"TO DO: details!","score":1},{"name":"Rakan","title":"Good against Rakan","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Caitlyn","title":"Good with Nami","details":"TO DO: details!","score":1},{"name":"Fizz","title":"Good with Nami","details":"TO DO: details!","score":1},{"name":"Jinx","title":"Good with Nami","details":"TO DO: details!","score":1},{"name":"Kog'Maw","title":"Good with Nami","details":"TO DO: details!","score":1},{"name":"Vayne","title":"Good with Vayne","details":"TO DO: details!","score":1},{"name":"Quinn","title":"Good with Quinn","details":"TO DO: details!","score":1},{"name":"Syndra","title":"Good with Syndra","details":"TO DO: details!","score":1},{"name":"Varus","title":"Good with Varus","details":"TO DO: details!","score":1}]},{"name":"Nasus","role":1,"civilization":0,"mode":0,"goodAgainst":[{"name":"Galio","title":"Good against Galio","details":"TO DO: details!","score":1},{"name":"Malphite","title":"Good against Malphite","details":"TO DO: details!","score":1},{"name":"Poppy","title":"Good against Poppy","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Kha'Zix","title":"Good with Nasus","details":"TO DO: details!","score":1},{"name":"Renekton","title":"Good with Renekton","details":"TO DO: details!","score":1},{"name":"Zed","title":"Good with Zed","details":"TO DO: details!","score":1}]},{"name":"Nautilus","role":10,"civilization":0,"mode":0,"goodAgainst":[{"name":"Karma","title":"Good against Karma","details":"TO DO: details!","score":1},{"name":"Brand","title":"Good against Brand","details":"TO DO: details!","score":1},{"name":"Leona","title":"Good against Leona","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Draven","title":"Good with Nautilus","details":"TO DO: details!","score":1},{"name":"Ezreal","title":"Good with Nautilus","details":"TO DO: details!","score":1},{"name":"Yasuo","title":"Good with Yasuo","details":"TO DO: details!","score":1},{"name":"Shyvana","title":"Good with Shyvana","details":"TO DO: details!","score":1}]},{"name":"Neeko","role":2,"civilization":0,"mode":0,"goodAgainst":[{"name":"Lee Sin","title":"Good against Lee Sin","details":"TO DO: details!","score":1},{"name":"Rengar","title":"Good against Rengar","details":"TO DO: details!","score":1},{"name":"Rek'Sai","title":"Good against Rek'Sai","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Fiddlesticks","title":"Good with Neeko","details":"TO DO: details!","score":1},{"name":"Katarina","title":"Good with Neeko","details":"TO DO: details!","score":1},{"name":"Morgana","title":"Good with Neeko","details":"TO DO: details!","score":1}]},{"name":"Nidalee","role":16,"civilization":0,"mode":0,"goodAgainst":[{"name":"Graves","title":"Good against Graves","details":"TO DO: details!","score":1},{"name":"Rengar","title":"Good against Rengar","details":"TO DO: details!","score":1},{"name":"Rek'Sai","title":"Good against Rek'Sai","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Caitlyn","title":"Good with Nidalee","details":"TO DO: details!","score":1},{"name":"Jayce","title":"Good with Nidalee","details":"TO DO: details!","score":1},{"name":"Varus","title":"Good with Varus","details":"TO DO: details!","score":1}]},{"name":"Nocturne","role":16,"civilization":0,"mode":0,"goodAgainst":[{"name":"Rengar","title":"Good against Rengar","details":"TO DO: details!","score":1},{"name":"Pantheon","title":"Good against Pantheon","details":"TO DO: details!","score":1},{"name":"Sejuani","title":"Good against Sejuani","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Twisted Fate","title":"Good with Twisted Fate","details":"TO DO: details!","score":1},{"name":"Shen","title":"Good with Shen","details":"TO DO: details!","score":1},{"name":"Rengar","title":"Good with Rengar","details":"TO DO: details!","score":1}]},{"name":"Nunu","role":16,"civilization":0,"mode":0,"goodAgainst":[{"name":"Graves","title":"Good against Graves","details":"TO DO: details!","score":1},{"name":"Skarner","title":"Good against Skarner","details":"TO DO: details!","score":1},{"name":"Shyvana","title":"Good against Shyvana","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Caitlyn","title":"Good with Nunu","details":"TO DO: details!","score":1},{"name":"Galio","title":"Good with Nunu","details":"TO DO: details!","score":1},{"name":"Gangplank","title":"Good with Nunu","details":"TO DO: details!","score":1},{"name":"Kog'Maw","title":"Good with Nunu","details":"TO DO: details!","score":1},{"name":"Vayne","title":"Good with Vayne","details":"TO DO: details!","score":1}]},{"name":"Olaf","role":16,"civilization":0,"mode":0,"goodAgainst":[{"name":"Fiddlesticks","title":"Good against Fiddlesticks","details":"TO DO: details!","score":1},{"name":"Hecarim","title":"Good against Hecarim","details":"TO DO: details!","score":1},{"name":"Shaco","title":"Good against Shaco","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Aatrox","title":"Good with Olaf","details":"TO DO: details!","score":1},{"name":"Blitzcrank","title":"Good with Olaf","details":"TO DO: details!","score":1},{"name":"Darius","title":"Good with Olaf","details":"TO DO: details!","score":1},{"name":"Dr. Mundo","title":"Good with Olaf","details":"TO DO: details!","score":1}]},{"name":"Orianna","role":2,"civilization":0,"mode":0,"goodAgainst":[{"name":"Ryze","title":"Good against Ryze","details":"TO DO: details!","score":1},{"name":"Gangplank","title":"Good against Gangplank","details":"TO DO: details!","score":1},{"name":"Diana","title":"Good against Diana","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Evelynn","title":"Good with Orianna","details":"TO DO: details!","score":1},{"name":"Hecarim","title":"Good with Orianna","details":"TO DO: details!","score":1},{"name":"Jarvan IV","title":"Good with Orianna","details":"TO DO: details!","score":1},{"name":"Malphite","title":"Good with Orianna","details":"TO DO: details!","score":1},{"name":"Yasuo","title":"Good with Yasuo","details":"TO DO: details!","score":1},{"name":"Rengar","title":"Good with Rengar","details":"TO DO: details!","score":1},{"name":"Vi","title":"Good with Vi","details":"TO DO: details!","score":1},{"name":"Zac","title":"Good with Zac","details":"TO DO: details!","score":1}]},{"name":"Ornn","role":3,"civilization":0,"mode":0,"goodAgainst":[{"name":"Galio","title":"Good against Galio","details":"TO DO: details!","score":1},{"name":"Malphite","title":"Good against Malphite","details":"TO DO: details!","score":1},{"name":"Shen","title":"Good against Shen","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Janna","title":"Good with Ornn","details":"TO DO: details!","score":1},{"name":"Lulu","title":"Good with Ornn","details":"TO DO: details!","score":1},{"name":"Thresh","title":"Good with Thresh","details":"TO DO: details!","score":1}]},{"name":"Pantheon","role":17,"civilization":0,"mode":0,"goodAgainst":[{"name":"Dr. Mundo","title":"Good against Dr. Mundo","details":"TO DO: details!","score":1},{"name":"Nasus","title":"Good against Nasus","details":"TO DO: details!","score":1},{"name":"Nautilus","title":"Good against Nautilus","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Jax","title":"Good with Pantheon","details":"TO DO: details!","score":1},{"name":"Taric","title":"Good with Taric","details":"TO DO: details!","score":1},{"name":"Sion","title":"Good with Sion","details":"TO DO: details!","score":1},{"name":"Xin Zhao","title":"Good with Xin Zhao","details":"TO DO: details!","score":1}]},{"name":"Poppy","role":17,"civilization":0,"mode":0,"goodAgainst":[{"name":"Illaoi","title":"Good against Illaoi","details":"TO DO: details!","score":1},{"name":"Olaf","title":"Good against Olaf","details":"TO DO: details!","score":1},{"name":"Kled","title":"Good against Kled","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Cho'Gath","title":"Good with Poppy","details":"TO DO: details!","score":1},{"name":"Sion","title":"Good with Sion","details":"TO DO: details!","score":1},{"name":"Vayne","title":"Good with Vayne","details":"TO DO: details!","score":1}]},{"name":"Pyke","role":8,"civilization":0,"mode":0,"goodAgainst":[{"name":"Vel'Koz","title":"Good against Vel'Koz","details":"TO DO: details!","score":1},{"name":"Zoe","title":"Good against Zoe","details":"TO DO: details!","score":1},{"name":"Annie","title":"Good against Annie","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Jhin","title":"Good with Pyke","details":"TO DO: details!","score":1},{"name":"Kai'Sa","title":"Good with Pyke","details":"TO DO: details!","score":1},{"name":"Miss Fortune","title":"Good with Pyke","details":"TO DO: details!","score":1}]},{"name":"Qiyana","role":18,"civilization":0,"mode":0,"goodAgainst":[{"name":"Xerath","title":"Good against Xerath","details":"TO DO: details!","score":1},{"name":"Viktor","title":"Good against Viktor","details":"TO DO: details!","score":1},{"name":"Neeko","title":"Good against Neeko","details":"TO DO: details!","score":1}]},{"name":"Quinn","role":1,"civilization":0,"mode":0,"goodAgainst":[{"name":"Tryndamere","title":"Good against Tryndamere","details":"TO DO: details!","score":1},{"name":"Jax","title":"Good against Jax","details":"TO DO: details!","score":1},{"name":"Renekton","title":"Good against Renekton","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Leona","title":"Good with Quinn","details":"TO DO: details!","score":1},{"name":"Nami","title":"Good with Quinn","details":"TO DO: details!","score":1},{"name":"Thresh","title":"Good with Thresh","details":"TO DO: details!","score":1},{"name":"Xerath","title":"Good with Xerath","details":"TO DO: details!","score":1}]},{"name":"Rakan","role":8,"civilization":0,"mode":0,"goodAgainst":[{"name":"Lux","title":"Good against Lux","details":"TO DO: details!","score":1},{"name":"Karma","title":"Good against Karma","details":"TO DO: details!","score":1},{"name":"Tahm Kench","title":"Good against Tahm Kench","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Jhin","title":"Good with Rakan","details":"TO DO: details!","score":1},{"name":"Miss Fortune","title":"Good with Rakan","details":"TO DO: details!","score":1},{"name":"Xayah","title":"Good with Xayah","details":"TO DO: details!","score":1}]},{"name":"Renekton","role":1,"civilization":0,"mode":0,"goodWith":[{"name":"Nasus","title":"Good with Renekton","details":"TO DO: details!","score":1}]},{"name":"Rengar","role":16,"civilization":0,"mode":0,"goodAgainst":[{"name":"Shyvana","title":"Good against Shyvana","details":"TO DO: details!","score":1},{"name":"Vi","title":"Good against Vi","details":"TO DO: details!","score":1},{"name":"Evelynn","title":"Good against Evelynn","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Elise","title":"Good with Rengar","details":"TO DO: details!","score":1},{"name":"Kha'Zix","title":"Good with Rengar","details":"TO DO: details!","score":1},{"name":"Nocturne","title":"Good with Rengar","details":"TO DO: details!","score":1},{"name":"Orianna","title":"Good with Rengar","details":"TO DO: details!","score":1}]},{"name":"Riven","role":1,"civilization":0,"mode":0,"goodAgainst":[{"name":"Volibear","title":"Good against Volibear","details":"TO DO: details!","score":1},{"name":"Tahm Kench","title":"Good against Tahm Kench","details":"TO DO: details!","score":1},{"name":"Galio","title":"Good against Galio","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Ahri","title":"Good with Riven","details":"TO DO: details!","score":1},{"name":"Irelia","title":"Good with Riven","details":"TO DO: details!","score":1},{"name":"Ivern","title":"Good with Riven","details":"TO DO: details!","score":1},{"name":"Yasuo","title":"Good with Yasuo","details":"TO DO: details!","score":1}]},{"name":"Rumble","role":3,"civilization":0,"mode":0,"goodAgainst":[{"name":"Dr. Mundo","title":"Good against Dr. Mundo","details":"TO DO: details!","score":1},{"name":"Nasus","title":"Good against Nasus","details":"TO DO: details!","score":1},{"name":"Malphite","title":"Good against Malphite","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Amumu","title":"Good with Rumble","details":"TO DO: details!","score":1},{"name":"Jarvan IV","title":"Good with Rumble","details":"TO DO: details!","score":1},{"name":"Sona","title":"Good with Sona","details":"TO DO: details!","score":1}]},{"name":"Ryze","role":1,"civilization":0,"mode":0,"goodAgainst":[{"name":"Ekko","title":"Good against Ekko","details":"TO DO: details!","score":1},{"name":"Corki","title":"Good against Corki","details":"TO DO: details!","score":1},{"name":"Kassadin","title":"Good against Kassadin","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Ahri","title":"Good with Ryze","details":"TO DO: details!","score":1},{"name":"Jax","title":"Good with Ryze","details":"TO DO: details!","score":1},{"name":"Maokai","title":"Good with Ryze","details":"TO DO: details!","score":1},{"name":"Udyr","title":"Good with Udyr","details":"TO DO: details!","score":1}]},{"name":"Sejuani","role":16,"civilization":0,"mode":0,"goodAgainst":[{"name":"Rammus","title":"Good against Rammus","details":"TO DO: details!","score":1},{"name":"Shyvana","title":"Good against Shyvana","details":"TO DO: details!","score":1},{"name":"Volibear","title":"Good against Volibear","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Katarina","title":"Good with Sejuani","details":"TO DO: details!","score":1},{"name":"Lissandra","title":"Good with Sejuani","details":"TO DO: details!","score":1},{"name":"Talon","title":"Good with Talon","details":"TO DO: details!","score":1}]},{"name":"Senna","role":12,"civilization":0,"mode":0,"goodAgainst":[{"name":"Janna","title":"Good against Janna","details":"TO DO: details!","score":1},{"name":"Bard","title":"Good against Bard","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Jhin","title":"Good with Senna","details":"TO DO: details!","score":1},{"name":"Lucian","title":"Good with Senna","details":"TO DO: details!","score":1},{"name":"Vayne","title":"Good with Vayne","details":"TO DO: details!","score":1}]},{"name":"Sett","role":3,"civilization":0,"mode":0,"goodAgainst":[{"name":"Yasuo","title":"Good against Yasuo","details":"TO DO: details!","score":1},{"name":"Camille","title":"Good against Camille","details":"TO DO: details!","score":1}]},{"name":"Shaco","role":16,"civilization":0,"mode":0,"goodAgainst":[{"name":"Udyr","title":"Good against Udyr","details":"TO DO: details!","score":1},{"name":"Graves","title":"Good against Graves","details":"TO DO: details!","score":1},{"name":"Jax","title":"Good against Jax","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Bard","title":"Good with Shaco","details":"TO DO: details!","score":1},{"name":"Galio","title":"Good with Shaco","details":"TO DO: details!","score":1},{"name":"Talon","title":"Good with Talon","details":"TO DO: details!","score":1}]},{"name":"Shen","role":1,"civilization":0,"mode":0,"goodAgainst":[{"name":"Tahm Kench","title":"Good against Tahm Kench","details":"TO DO: details!","score":1},{"name":"Rengar","title":"Good against Rengar","details":"TO DO: details!","score":1},{"name":"Gragas","title":"Good against Gragas","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Akali","title":"Good with Shen","details":"TO DO: details!","score":1},{"name":"Evelynn","title":"Good with Shen","details":"TO DO: details!","score":1},{"name":"Nocturne","title":"Good with Shen","details":"TO DO: details!","score":1},{"name":"Twisted Fate","title":"Good with Twisted Fate","details":"TO DO: details!","score":1},{"name":"Zed","title":"Good with Zed","details":"TO DO: details!","score":1},{"name":"Shyvana","title":"Good with Shyvana","details":"TO DO: details!","score":1}]},{"name":"Shyvana","role":16,"civilization":0,"mode":0,"goodAgainst":[{"name":"Nocturne","title":"Good against Nocturne","details":"TO DO: details!","score":1},{"name":"Lee Sin","title":"Good against Lee Sin","details":"TO DO: details!","score":1},{"name":"Hecarim","title":"Good against Hecarim","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Nautilus","title":"Good with Shyvana","details":"TO DO: details!","score":1},{"name":"Shen","title":"Good with Shyvana","details":"TO DO: details!","score":1},{"name":"Yasuo","title":"Good with Yasuo","details":"TO DO: details!","score":1}]},{"name":"Singed","role":1,"civilization":0,"mode":0,"goodAgainst":[{"name":"Shen","title":"Good against Shen","details":"TO DO: details!","score":1},{"name":"Jax","title":"Good against Jax","details":"TO DO: details!","score":1},{"name":"Illaoi","title":"Good against Illaoi","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Cassiopeia","title":"Good with Singed","details":"TO DO: details!","score":1},{"name":"Volibear","title":"Good with Volibear","details":"TO DO: details!","score":1},{"name":"Teemo","title":"Good with Teemo","details":"TO DO: details!","score":1}]},{"name":"Sion","role":1,"civilization":0,"mode":0,"goodAgainst":[{"name":"Illaoi","title":"Good against Illaoi","details":"TO DO: details!","score":1},{"name":"Nasus","title":"Good against Nasus","details":"TO DO: details!","score":1},{"name":"Shen","title":"Good against Shen","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Bard","title":"Good with Sion","details":"TO DO: details!","score":1},{"name":"Kindred","title":"Good with Sion","details":"TO DO: details!","score":1},{"name":"Pantheon","title":"Good with Sion","details":"TO DO: details!","score":1},{"name":"Poppy","title":"Good with Sion","details":"TO DO: details!","score":1},{"name":"Talon","title":"Good with Talon","details":"TO DO: details!","score":1},{"name":"Wukong","title":"Good with Wukong","details":"TO DO: details!","score":1}]},{"name":"Sivir","role":4,"civilization":0,"mode":0,"goodAgainst":[{"name":"Ezreal","title":"Good against Ezreal","details":"TO DO: details!","score":1},{"name":"Xayah","title":"Good against Xayah","details":"TO DO: details!","score":1},{"name":"Lucian","title":"Good against Lucian","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Leona","title":"Good with Sivir","details":"TO DO: details!","score":1},{"name":"Soraka","title":"Good with Soraka","details":"TO DO: details!","score":1},{"name":"Taric","title":"Good with Taric","details":"TO DO: details!","score":1}]},{"name":"Skarner","role":16,"civilization":0,"mode":0,"goodAgainst":[{"name":"Nocturne","title":"Good against Nocturne","details":"TO DO: details!","score":1},{"name":"Olaf","title":"Good against Olaf","details":"TO DO: details!","score":1},{"name":"Shaco","title":"Good against Shaco","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Heimerdinger","title":"Good with Skarner","details":"TO DO: details!","score":1},{"name":"Jayce","title":"Good with Skarner","details":"TO DO: details!","score":1},{"name":"Thresh","title":"Good with Thresh","details":"TO DO: details!","score":1}]},{"name":"Sona","role":8,"civilization":0,"mode":0,"goodAgainst":[{"name":"Karma","title":"Good against Karma","details":"TO DO: details!","score":1},{"name":"Vel'Koz","title":"Good against Vel'Koz","details":"TO DO: details!","score":1},{"name":"Lulu","title":"Good against Lulu","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Brand","title":"Good with Sona","details":"TO DO: details!","score":1},{"name":"Caitlyn","title":"Good with Sona","details":"TO DO: details!","score":1},{"name":"Ezreal","title":"Good with Sona","details":"TO DO: details!","score":1},{"name":"Miss Fortune","title":"Good with Sona","details":"TO DO: details!","score":1},{"name":"Rumble","title":"Good with Sona","details":"TO DO: details!","score":1},{"name":"Viktor","title":"Good with Viktor","details":"Sona makes is easy to cast a good ultimate, the move speed she gives you can be used for poking, like a hit and run.","score":1},{"name":"Xayah","title":"Good with Xayah","details":"TO DO: details!","score":1}]},{"name":"Soraka","role":8,"civilization":0,"mode":0,"goodAgainst":[{"name":"Veigar","title":"Good against Veigar","details":"TO DO: details!","score":1},{"name":"Morgana","title":"Good against Morgana","details":"TO DO: details!","score":1},{"name":"Vel'Koz","title":"Good against Vel'Koz","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Ezreal","title":"Good with Soraka","details":"TO DO: details!","score":1},{"name":"Sivir","title":"Good with Soraka","details":"TO DO: details!","score":1},{"name":"Urgot","title":"Good with Urgot","details":"TO DO: details!","score":1}]},{"name":"Swain","role":3,"civilization":0,"mode":0,"goodAgainst":[{"name":"Illaoi","title":"Good against Illaoi","details":"TO DO: details!","score":1},{"name":"Shen","title":"Good against Shen","details":"TO DO: details!","score":1},{"name":"Garen","title":"Good against Garen","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Alistar","title":"Good with Swain","details":"TO DO: details!","score":1},{"name":"Maokai","title":"Good with Swain","details":"TO DO: details!","score":1},{"name":"Vladimir","title":"Good with Vladimir","details":"TO DO: details!","score":1}]},{"name":"Sylas","role":2,"civilization":0,"mode":0,"goodAgainst":[{"name":"Zoe","title":"Good against Zoe","details":"TO DO: details!","score":1},{"name":"Xerath","title":"Good against Xerath","details":"TO DO: details!","score":1},{"name":"Swain","title":"Good against Swain","details":"TO DO: details!","score":1}]},{"name":"Syndra","role":2,"civilization":0,"mode":0,"goodAgainst":[{"name":"Ryze","title":"Good against Ryze","details":"TO DO: details!","score":1},{"name":"Diana","title":"Good against Diana","details":"TO DO: details!","score":1},{"name":"Kennen","title":"Good against Kennen","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Nami","title":"Good with Syndra","details":"TO DO: details!","score":1},{"name":"Zac","title":"Good with Zac","details":"TO DO: details!","score":1},{"name":"Zilean","title":"Good with Zilean","details":"TO DO: details!","score":1}]},{"name":"Tahm Kench","role":9,"civilization":0,"mode":0,"goodAgainst":[{"name":"Karma","title":"Good against Karma","details":"TO DO: details!","score":1},{"name":"Taric","title":"Good against Taric","details":"TO DO: details!","score":1},{"name":"Brand","title":"Good against Brand","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Jhin","title":"Good with Tahm Kench","details":"TO DO: details!","score":1},{"name":"Jinx","title":"Good with Tahm Kench","details":"TO DO: details!","score":1},{"name":"Kalista","title":"Good with Tahm Kench","details":"TO DO: details!","score":1}]},{"name":"Taliyah","role":2,"civilization":0,"mode":0,"goodAgainst":[{"name":"Ryze","title":"Good against Ryze","details":"TO DO: details!","score":1},{"name":"Veigar","title":"Good against Veigar","details":"TO DO: details!","score":1},{"name":"Syndra","title":"Good against Syndra","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Kindred","title":"Good with Taliyah","details":"TO DO: details!","score":1},{"name":"Talon","title":"Good with Talon","details":"TO DO: details!","score":1},{"name":"Twisted Fate","title":"Good with Twisted Fate","details":"TO DO: details!","score":1}]},{"name":"Talon","role":2,"civilization":0,"mode":0,"goodAgainst":[{"name":"Karma","title":"Good against Karma","details":"TO DO: details!","score":1},{"name":"Lissandra","title":"Good against Lissandra","details":"TO DO: details!","score":1},{"name":"Ekko","title":"Good against Ekko","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Fizz","title":"Good with Talon","details":"TO DO: details!","score":1},{"name":"Sejuani","title":"Good with Talon","details":"TO DO: details!","score":1},{"name":"Shaco","title":"Good with Talon","details":"TO DO: details!","score":1},{"name":"Sion","title":"Good with Talon","details":"TO DO: details!","score":1},{"name":"Taliyah","title":"Good with Talon","details":"TO DO: details!","score":1},{"name":"Zed","title":"Good with Zed","details":"TO DO: details!","score":1}]},{"name":"Taric","role":8,"civilization":0,"mode":0,"goodAgainst":[{"name":"Leona","title":"Good against Leona","details":"TO DO: details!","score":1},{"name":"Karma","title":"Good against Karma","details":"TO DO: details!","score":1},{"name":"Lulu","title":"Good against Lulu","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Ezreal","title":"Good with Taric","details":"TO DO: details!","score":1},{"name":"Graves","title":"Good with Taric","details":"TO DO: details!","score":1},{"name":"Pantheon","title":"Good with Taric","details":"TO DO: details!","score":1},{"name":"Sivir","title":"Good with Taric","details":"TO DO: details!","score":1},{"name":"Vayne","title":"Good with Vayne","details":"TO DO: details!","score":1},{"name":"Twitch","title":"Good with Twitch","details":"TO DO: details!","score":1},{"name":"Urgot","title":"Good with Urgot","details":"TO DO: details!","score":1}]},{"name":"Teemo","role":1,"civilization":0,"mode":0,"goodAgainst":[{"name":"Cho'Gath","title":"Good against Cho'Gath","details":"TO DO: details!","score":1},{"name":"Garen","title":"Good against Garen","details":"TO DO: details!","score":1},{"name":"Poppy","title":"Good against Poppy","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Azir","title":"Good with Teemo","details":"Azir rather use his soliders to attack, Teemo's blind is ineffective. Teemo's shrooms can be annoying, Azir should equip himself with a red flare.","score":1},{"name":"Blitzcrank","title":"Good with Teemo","details":"TO DO: details!","score":1},{"name":"Cassiopeia","title":"Good with Teemo","details":"TO DO: details!","score":1},{"name":"Jax","title":"Good with Teemo","details":"TO DO: details!","score":1},{"name":"Lee Sin","title":"Good with Teemo","details":"TO DO: details!","score":1},{"name":"Singed","title":"Good with Teemo","details":"TO DO: details!","score":1},{"name":"Volibear","title":"Good with Volibear","details":"TO DO: details!","score":1}]},{"name":"Thresh","role":8,"civilization":0,"mode":0,"goodAgainst":[{"name":"Lux","title":"Good against Lux","details":"TO DO: details!","score":1},{"name":"Karma","title":"Good against Karma","details":"TO DO: details!","score":1},{"name":"Veigar","title":"Good against Veigar","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Ashe","title":"Good with Thresh","details":"TO DO: details!","score":1},{"name":"Caitlyn","title":"Good with Thresh","details":"TO DO: details!","score":1},{"name":"Camille","title":"Good with Thresh","details":"TO DO: details!","score":1},{"name":"Corki","title":"Good with Thresh","details":"TO DO: details!","score":1},{"name":"Draven","title":"Good with Thresh","details":"TO DO: details!","score":1},{"name":"Graves","title":"Good with Thresh","details":"TO DO: details!","score":1},{"name":"Heimerdinger","title":"Good with Thresh","details":"TO DO: details!","score":1},{"name":"Jhin","title":"Good with Thresh","details":"TO DO: details!","score":1},{"name":"Jinx","title":"Good with Thresh","details":"TO DO: details!","score":1},{"name":"Kai'Sa","title":"Good with Thresh","details":"TO DO: details!","score":1},{"name":"Kalista","title":"Good with Thresh","details":"TO DO: details!","score":1},{"name":"Lucian","title":"Good with Thresh","details":"TO DO: details!","score":1},{"name":"Ornn","title":"Good with Thresh","details":"TO DO: details!","score":1},{"name":"Quinn","title":"Good with Thresh","details":"TO DO: details!","score":1},{"name":"Skarner","title":"Good with Thresh","details":"TO DO: details!","score":1},{"name":"Vayne","title":"Good with Vayne","details":"TO DO: details!","score":1},{"name":"Tristana","title":"Good with Tristana","details":"TO DO: details!","score":1},{"name":"Varus","title":"Good with Varus","details":"TO DO: details!","score":1},{"name":"Zoe","title":"Good with Zoe","details":"TO DO: details!","score":1}]},{"name":"Tristana","role":4,"civilization":0,"mode":0,"goodAgainst":[{"name":"Corki","title":"Good against Corki","details":"TO DO: details!","score":1},{"name":"Kalista","title":"Good against Kalista","details":"TO DO: details!","score":1},{"name":"Lucian","title":"Good against Lucian","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Alistar","title":"Good with Tristana","details":"TO DO: details!","score":1},{"name":"Leona","title":"Good with Tristana","details":"TO DO: details!","score":1},{"name":"Thresh","title":"Good with Tristana","details":"TO DO: details!","score":1}]},{"name":"Trundle","role":16,"civilization":0,"mode":0,"goodAgainst":[{"name":"Garen","title":"Good against Garen","details":"TO DO: details!","score":1},{"name":"Sion","title":"Good against Sion","details":"TO DO: details!","score":1},{"name":"Nasus","title":"Good against Nasus","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Jarvan IV","title":"Good with Trundle","details":"TO DO: details!","score":1},{"name":"Lissandra","title":"Good with Trundle","details":"TO DO: details!","score":1},{"name":"Vayne","title":"Good with Vayne","details":"TO DO: details!","score":1}]},{"name":"Tryndamere","role":1,"civilization":0,"mode":0,"goodAgainst":[{"name":"Nautilus","title":"Good against Nautilus","details":"TO DO: details!","score":1},{"name":"Cho'Gath","title":"Good against Cho'Gath","details":"TO DO: details!","score":1},{"name":"Garen","title":"Good against Garen","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Aatrox","title":"Good with Tryndamere","details":"TO DO: details!","score":1},{"name":"Ashe","title":"Good with Tryndamere","details":"TO DO: details!","score":1},{"name":"Zilean","title":"Good with Zilean","details":"TO DO: details!","score":1}]},{"name":"Twisted Fate","role":2,"civilization":0,"mode":0,"goodAgainst":[{"name":"Azir","title":"Good against Azir","details":"TO DO: details!","score":1},{"name":"Akali","title":"Good against Akali","details":"TO DO: details!","score":1},{"name":"Ryze","title":"Good against Ryze","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Aatrox","title":"Good with Twisted Fate","details":"TO DO: details!","score":1},{"name":"Gangplank","title":"Good with Twisted Fate","details":"TO DO: details!","score":1},{"name":"Nocturne","title":"Good with Twisted Fate","details":"TO DO: details!","score":1},{"name":"Shen","title":"Good with Twisted Fate","details":"TO DO: details!","score":1},{"name":"Taliyah","title":"Good with Twisted Fate","details":"TO DO: details!","score":1}]},{"name":"Twitch","role":4,"civilization":0,"mode":0,"goodAgainst":[{"name":"Corki","title":"Good against Corki","details":"TO DO: details!","score":1},{"name":"Sivir","title":"Good against Sivir","details":"TO DO: details!","score":1},{"name":"Kalista","title":"Good against Kalista","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Braum","title":"Good with Twitch","details":"TO DO: details!","score":1},{"name":"Leona","title":"Good with Twitch","details":"TO DO: details!","score":1},{"name":"Taric","title":"Good with Twitch","details":"TO DO: details!","score":1}]},{"name":"Udyr","role":16,"civilization":0,"mode":0,"goodAgainst":[{"name":"Graves","title":"Good against Graves","details":"TO DO: details!","score":1},{"name":"Lee Sin","title":"Good against Lee Sin","details":"TO DO: details!","score":1},{"name":"Nidalee","title":"Good against Nidalee","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Ahri","title":"Good with Udyr","details":"TO DO: details!","score":1},{"name":"LeBlanc","title":"Good with Udyr","details":"TO DO: details!","score":1},{"name":"Ryze","title":"Good with Udyr","details":"TO DO: details!","score":1}]},{"name":"Urgot","role":1,"civilization":0,"mode":0,"goodAgainst":[{"name":"Jarvan IV","title":"Good against Jarvan IV","details":"TO DO: details!","score":1},{"name":"Fiora","title":"Good against Fiora","details":"TO DO: details!","score":1},{"name":"Sivir","title":"Good against Sivir","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Janna","title":"Good with Urgot","details":"TO DO: details!","score":1},{"name":"Soraka","title":"Good with Urgot","details":"TO DO: details!","score":1},{"name":"Taric","title":"Good with Urgot","details":"TO DO: details!","score":1}]},{"name":"Varus","role":4,"civilization":0,"mode":0,"goodAgainst":[{"name":"Corki","title":"Good against Corki","details":"TO DO: details!","score":1},{"name":"Sivir","title":"Good against Sivir","details":"TO DO: details!","score":1},{"name":"Ashe","title":"Good against Ashe","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Leona","title":"Good with Varus","details":"TO DO: details!","score":1},{"name":"Morgana","title":"Good with Varus","details":"TO DO: details!","score":1},{"name":"Nami","title":"Good with Varus","details":"TO DO: details!","score":1},{"name":"Nidalee","title":"Good with Varus","details":"TO DO: details!","score":1},{"name":"Thresh","title":"Good with Varus","details":"TO DO: details!","score":1},{"name":"Xerath","title":"Good with Xerath","details":"TO DO: details!","score":1}]},{"name":"Vayne","role":5,"civilization":0,"mode":0,"goodAgainst":[{"name":"Ziggs","title":"Good against Ziggs","details":"TO DO: details!","score":1},{"name":"Sivir","title":"Good against Sivir","details":"TO DO: details!","score":1},{"name":"Jhin","title":"Good against Jhin","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Anivia","title":"Good with Vayne","details":"TO DO: details!","score":1},{"name":"Blitzcrank","title":"Good with Vayne","details":"TO DO: details!","score":1},{"name":"Karma","title":"Good with Vayne","details":"TO DO: details!","score":1},{"name":"Lulu","title":"Good with Vayne","details":"TO DO: details!","score":1},{"name":"Nami","title":"Good with Vayne","details":"TO DO: details!","score":1},{"name":"Nunu","title":"Good with Vayne","details":"TO DO: details!","score":1},{"name":"Poppy","title":"Good with Vayne","details":"TO DO: details!","score":1},{"name":"Senna","title":"Good with Vayne","details":"TO DO: details!","score":1},{"name":"Taric","title":"Good with Vayne","details":"TO DO: details!","score":1},{"name":"Thresh","title":"Good with Vayne","details":"TO DO: details!","score":1},{"name":"Trundle","title":"Good with Vayne","details":"TO DO: details!","score":1},{"name":"Yorick","title":"Good with Yorick","details":"TO DO: details!","score":1},{"name":"Yuumi","title":"Good with Yuumi","details":"TO DO: details!","score":1}]},{"name":"Veigar","role":6,"civilization":0,"mode":0,"goodAgainst":[{"name":"Diana","title":"Good against Diana","details":"TO DO: details!","score":1},{"name":"Talon","title":"Good against Talon","details":"TO DO: details!","score":1},{"name":"Akali","title":"Good against Akali","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Amumu","title":"Good with Veigar","details":"TO DO: details!","score":1},{"name":"LeBlanc","title":"Good with Veigar","details":"TO DO: details!","score":1},{"name":"Warwick","title":"Good with Warwick","details":"TO DO: details!","score":1}]},{"name":"Vel'Koz","role":10,"civilization":0,"mode":0,"goodAgainst":[{"name":"Swain","title":"Good against Swain","details":"TO DO: details!","score":1},{"name":"Galio","title":"Good against Galio","details":"TO DO: details!","score":1},{"name":"Viktor","title":"Good against Viktor","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Aatrox","title":"Good with Vel'Koz","details":"TO DO: details!","score":1},{"name":"Amumu","title":"Good with Vel'Koz","details":"TO DO: details!","score":1},{"name":"Leona","title":"Good with Vel'Koz","details":"TO DO: details!","score":1}]},{"name":"Vi","role":16,"civilization":0,"mode":0,"goodAgainst":[{"name":"Nidalee","title":"Good against Nidalee","details":"TO DO: details!","score":1},{"name":"Shaco","title":"Good against Shaco","details":"TO DO: details!","score":1},{"name":"Elise","title":"Good against Elise","details":"TO DO: details!","score":1},{"name":"Azir","title":"Good against Azir","details":"Vi can cast her ultimate on Azir and there is no way she can be stopped. Vi has a dash that can close the gap between her and Azir, making Azir's attack futile which he gets punched in the face.","score":1}],"goodWith":[{"name":"Caitlyn","title":"Good with Vi","details":"TO DO: details!","score":1},{"name":"Heimerdinger","title":"Good with Vi","details":"TO DO: details!","score":1},{"name":"Orianna","title":"Good with Vi","details":"TO DO: details!","score":1},{"name":"Yasuo","title":"Good with Yasuo","details":"TO DO: details!","score":1},{"name":"Zed","title":"Good with Zed","details":"TO DO: details!","score":1}]},{"name":"Viktor","role":2,"civilization":0,"mode":0,"goodAgainst":[{"name":"Ryze","title":"Good against Ryze","details":"Viktor's ultimate can cancel Ryze's ultimate (I think?). Viktor's range is further than Ryze's.","score":1},{"name":"Katarina","title":"Good against Katarina","details":"Viktor can cancel Katarina's ultimate with his ultimate. Katarina must be moving or she will be stunned in Viktor's gravitational field. A good Katarina can avoid this, but in low-elo, most don't predict the ultimate cancel.","score":1}],"goodWith":[{"name":"Jarvan IV","title":"Good with Viktor","details":"Jarvan IV can trap enemies within his ultimate which allows for Viktor's ultimate to maximize damage. Hard CC can be chained with Jarvan IV's CC dash and Viktor's gravitational field.","score":1},{"name":"Malzahar","title":"Good with Viktor","details":"Malzahar keeps enemies in one place with his ultimate, perfect for Viktor's ultimate! Landing a gravitional stun will allow Malzahar's summons to deal damage instead of chasing.","score":1},{"name":"Sona","title":"Good with Viktor","details":"Sona makes is easy to cast a good ultimate, the move speed she gives you can be used for poking, like a hit and run.","score":1}]},{"name":"Vladimir","role":3,"civilization":0,"mode":0,"goodAgainst":[{"name":"Ryze","title":"Good against Ryze","details":"TO DO: details!","score":1},{"name":"Gangplank","title":"Good against Gangplank","details":"TO DO: details!","score":1},{"name":"Yasuo","title":"Good against Yasuo","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Kennen","title":"Good with Vladimir","details":"TO DO: details!","score":1},{"name":"Maokai","title":"Good with Vladimir","details":"TO DO: details!","score":1},{"name":"Swain","title":"Good with Vladimir","details":"TO DO: details!","score":1},{"name":"Zed","title":"Good with Zed","details":"TO DO: details!","score":1}]},{"name":"Volibear","role":16,"civilization":0,"mode":0,"goodAgainst":[{"name":"Hecarim","title":"Good against Hecarim","details":"TO DO: details!","score":1},{"name":"Lee Sin","title":"Good against Lee Sin","details":"TO DO: details!","score":1},{"name":"Amumu","title":"Good against Amumu","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Ashe","title":"Good with Volibear","details":"TO DO: details!","score":1},{"name":"Fiora","title":"Good with Volibear","details":"TO DO: details!","score":1},{"name":"Singed","title":"Good with Volibear","details":"TO DO: details!","score":1},{"name":"Teemo","title":"Good with Volibear","details":"TO DO: details!","score":1},{"name":"Yasuo","title":"Good with Yasuo","details":"TO DO: details!","score":1}]},{"name":"Warwick","role":16,"civilization":0,"mode":0,"goodAgainst":[{"name":"Poppy","title":"Good against Poppy","details":"TO DO: details!","score":1},{"name":"Lee Sin","title":"Good against Lee Sin","details":"TO DO: details!","score":1},{"name":"Skarner","title":"Good against Skarner","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Bard","title":"Good with Warwick","details":"TO DO: details!","score":1},{"name":"Galio","title":"Good with Warwick","details":"TO DO: details!","score":1},{"name":"Kled","title":"Good with Warwick","details":"TO DO: details!","score":1},{"name":"Malzahar","title":"Good with Warwick","details":"TO DO: details!","score":1},{"name":"Veigar","title":"Good with Warwick","details":"TO DO: details!","score":1}]},{"name":"Wukong","role":17,"civilization":0,"mode":0,"goodAgainst":[{"name":"Gragas","title":"Good against Gragas","details":"TO DO: details!","score":1},{"name":"Trundle","title":"Good against Trundle","details":"TO DO: details!","score":1},{"name":"Jayce","title":"Good against Jayce","details":"TO DO: details!","score":1},{"name":"Aurelion Sol","title":"Good against Aurelion Sol","details":"Wukong can up into Aurelion Sol's face and keep there with his ultimate. Wukong can close the gap easily with his dash, and he can get close by using his invisibility when he makes a clone.","score":1}],"goodWith":[{"name":"Bard","title":"Good with Wukong","details":"TO DO: details!","score":1},{"name":"Galio","title":"Good with Wukong","details":"TO DO: details!","score":1},{"name":"Mordekaiser","title":"Good with Wukong","details":"TO DO: details!","score":1},{"name":"Sion","title":"Good with Wukong","details":"TO DO: details!","score":1},{"name":"Yasuo","title":"Good with Yasuo","details":"TO DO: details!","score":1}]},{"name":"Xayah","role":4,"civilization":0,"mode":0,"goodAgainst":[{"name":"Corki","title":"Good against Corki","details":"TO DO: details!","score":1},{"name":"Lucian","title":"Good against Lucian","details":"TO DO: details!","score":1},{"name":"Kalista","title":"Good against Kalista","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Galio","title":"Good with Xayah","details":"TO DO: details!","score":1},{"name":"Ivern","title":"Good with Xayah","details":"TO DO: details!","score":1},{"name":"Leona","title":"Good with Xayah","details":"TO DO: details!","score":1},{"name":"Rakan","title":"Good with Xayah","details":"TO DO: details!","score":1},{"name":"Sona","title":"Good with Xayah","details":"TO DO: details!","score":1}]},{"name":"Xerath","role":2,"civilization":0,"mode":0,"goodAgainst":[{"name":"Azir","title":"Good against Azir","details":"TO DO: details!","score":1},{"name":"Lissandra","title":"Good against Lissandra","details":"TO DO: details!","score":1},{"name":"Viktor","title":"Good against Viktor","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Jarvan IV","title":"Good with Xerath","details":"TO DO: details!","score":1},{"name":"Quinn","title":"Good with Xerath","details":"TO DO: details!","score":1},{"name":"Varus","title":"Good with Xerath","details":"TO DO: details!","score":1}]},{"name":"Xin Zhao","role":16,"civilization":0,"mode":0,"goodAgainst":[{"name":"Rengar","title":"Good against Rengar","details":"TO DO: details!","score":1},{"name":"Olaf","title":"Good against Olaf","details":"TO DO: details!","score":1},{"name":"Nocturne","title":"Good against Nocturne","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Blitzcrank","title":"Good with Xin Zhao","details":"TO DO: details!","score":1},{"name":"Kha'Zix","title":"Good with Xin Zhao","details":"TO DO: details!","score":1},{"name":"Pantheon","title":"Good with Xin Zhao","details":"TO DO: details!","score":1},{"name":"Yasuo","title":"Good with Yasuo","details":"TO DO: details!","score":1}]},{"name":"Yasuo","role":3,"civilization":0,"mode":0,"goodAgainst":[{"name":"Dr. Mundo","title":"Good against Dr. Mundo","details":"TO DO: details!","score":1},{"name":"Yorick","title":"Good against Yorick","details":"TO DO: details!","score":1},{"name":"Galio","title":"Good against Galio","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Aatrox","title":"Good with Yasuo","details":"TO DO: details!","score":1},{"name":"Alistar","title":"Good with Yasuo","details":"TO DO: details!","score":1},{"name":"Azir","title":"Good with Yasuo","details":"Azir can sending multiple enemies flying with his ultimate, perfect for Yasuo to follow up.","score":1},{"name":"Cho'Gath","title":"Good with Yasuo","details":"TO DO: details!","score":1},{"name":"Diana","title":"Good with Yasuo","details":"TO DO: details!","score":1},{"name":"Gragas","title":"Good with Yasuo","details":"TO DO: details!","score":1},{"name":"Ivern","title":"Good with Yasuo","details":"TO DO: details!","score":1},{"name":"Janna","title":"Good with Yasuo","details":"TO DO: details!","score":1},{"name":"Lee Sin","title":"Good with Yasuo","details":"TO DO: details!","score":1},{"name":"Malphite","title":"Good with Yasuo","details":"TO DO: details!","score":1},{"name":"Nautilus","title":"Good with Yasuo","details":"TO DO: details!","score":1},{"name":"Orianna","title":"Good with Yasuo","details":"TO DO: details!","score":1},{"name":"Riven","title":"Good with Yasuo","details":"TO DO: details!","score":1},{"name":"Shyvana","title":"Good with Yasuo","details":"TO DO: details!","score":1},{"name":"Vi","title":"Good with Yasuo","details":"TO DO: details!","score":1},{"name":"Volibear","title":"Good with Yasuo","details":"TO DO: details!","score":1},{"name":"Wukong","title":"Good with Yasuo","details":"TO DO: details!","score":1},{"name":"Xin Zhao","title":"Good with Yasuo","details":"TO DO: details!","score":1},{"name":"Zac","title":"Good with Zac","details":"TO DO: details!","score":1},{"name":"Zyra","title":"Good with Zyra","details":"TO DO: details!","score":1}]},{"name":"Yorick","role":1,"civilization":0,"mode":0,"goodAgainst":[{"name":"Nasus","title":"Good against Nasus","details":"TO DO: details!","score":1},{"name":"Kennen","title":"Good against Kennen","details":"TO DO: details!","score":1},{"name":"Vladimir","title":"Good against Vladimir","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Cassiopeia","title":"Good with Yorick","details":"TO DO: details!","score":1},{"name":"Karthus","title":"Good with Yorick","details":"TO DO: details!","score":1},{"name":"Mordekaiser","title":"Good with Yorick","details":"TO DO: details!","score":1},{"name":"Vayne","title":"Good with Yorick","details":"TO DO: details!","score":1}]},{"name":"Yuumi","role":8,"civilization":0,"mode":0,"goodAgainst":[{"name":"Lux","title":"Good against Lux","details":"TO DO: details!","score":1},{"name":"Annie","title":"Good against Annie","details":"TO DO: details!","score":1},{"name":"Ezreal","title":"Good against Ezreal","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Caitlyn","title":"Good with Yuumi","details":"TO DO: details!","score":1},{"name":"Jinx","title":"Good with Yuumi","details":"TO DO: details!","score":1},{"name":"Vayne","title":"Good with Yuumi","details":"TO DO: details!","score":1}]},{"name":"Zac","role":16,"civilization":0,"mode":0,"goodAgainst":[{"name":"Wukong","title":"Good against Wukong","details":"TO DO: details!","score":1},{"name":"Trundle","title":"Good against Trundle","details":"TO DO: details!","score":1},{"name":"Skarner","title":"Good against Skarner","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Kai'Sa","title":"Good with Zac","details":"TO DO: details!","score":1},{"name":"Orianna","title":"Good with Zac","details":"TO DO: details!","score":1},{"name":"Syndra","title":"Good with Zac","details":"TO DO: details!","score":1},{"name":"Yasuo","title":"Good with Zac","details":"TO DO: details!","score":1}]},{"name":"Zed","role":2,"civilization":0,"mode":0,"goodAgainst":[{"name":"Ryze","title":"Good against Ryze","details":"TO DO: details!","score":1},{"name":"Azir","title":"Good against Azir","details":"TO DO: details!","score":1},{"name":"Taliyah","title":"Good against Taliyah","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Kindred","title":"Good with Zed","details":"TO DO: details!","score":1},{"name":"Nasus","title":"Good with Zed","details":"TO DO: details!","score":1},{"name":"Shen","title":"Good with Zed","details":"TO DO: details!","score":1},{"name":"Talon","title":"Good with Zed","details":"TO DO: details!","score":1},{"name":"Vi","title":"Good with Zed","details":"TO DO: details!","score":1},{"name":"Vladimir","title":"Good with Zed","details":"TO DO: details!","score":1}]},{"name":"Ziggs","role":2,"civilization":0,"mode":0,"goodAgainst":[{"name":"Aurelion Sol","title":"Good against Aurelion Sol","details":"TO DO: details!","score":1},{"name":"Gangplank","title":"Good against Gangplank","details":"TO DO: details!","score":1},{"name":"Cassiopeia","title":"Good against Cassiopeia","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Amumu","title":"Good with Ziggs","details":"TO DO: details!","score":1},{"name":"Jarvan IV","title":"Good with Ziggs","details":"TO DO: details!","score":1},{"name":"Kennen","title":"Good with Ziggs","details":"TO DO: details!","score":1}]},{"name":"Zilean","role":10,"civilization":0,"mode":0,"goodAgainst":[{"name":"Braum","title":"Good against Braum","details":"TO DO: details!","score":1},{"name":"Alistar","title":"Good against Alistar","details":"TO DO: details!","score":1},{"name":"Zyra","title":"Good against Zyra","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Aatrox","title":"Good with Zilean","details":"TO DO: details!","score":1},{"name":"Hecarim","title":"Good with Zilean","details":"TO DO: details!","score":1},{"name":"Syndra","title":"Good with Zilean","details":"TO DO: details!","score":1},{"name":"Tryndamere","title":"Good with Zilean","details":"TO DO: details!","score":1},{"name":"Zoe","title":"Good with Zoe","details":"TO DO: details!","score":1}]},{"name":"Zoe","role":2,"civilization":0,"mode":0,"goodAgainst":[{"name":"Azir","title":"Good against Azir","details":"TO DO: details!","score":1},{"name":"Orianna","title":"Good against Orianna","details":"TO DO: details!","score":1},{"name":"Ryze","title":"Good against Ryze","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Bard","title":"Good with Zoe","details":"TO DO: details!","score":1},{"name":"Thresh","title":"Good with Zoe","details":"TO DO: details!","score":1},{"name":"Zilean","title":"Good with Zoe","details":"TO DO: details!","score":1}]},{"name":"Zyra","role":10,"civilization":0,"mode":0,"goodAgainst":[{"name":"Lux","title":"Good against Lux","details":"TO DO: details!","score":1},{"name":"Bard","title":"Good against Bard","details":"TO DO: details!","score":1},{"name":"Annie","title":"Good against Annie","details":"TO DO: details!","score":1}],"goodWith":[{"name":"Amumu","title":"Good with Zyra","details":"TO DO: details!","score":1},{"name":"Ashe","title":"Good with Zyra","details":"TO DO: details!","score":1},{"name":"Yasuo","title":"Good with Zyra","details":"TO DO: details!","score":1}]}]`));
})();
