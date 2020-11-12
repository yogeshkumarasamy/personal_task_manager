import { storageTest, setStorage, getStorage } from "../util/storage-util.js";
import { appInitData, idGenerator, fetchList, updateList, removeList, updateCard, removeCard } from "../util/util.js";

const fetchKey = "appData";

export class Model {
    constructor() {
        if (storageTest() === true) {
            this.data = getStorage(fetchKey) || appInitData; //Setting data to local storage
        }
    }

    bindOnListChanged(callback) {
        this.onListChanged = callback;
    }
    addCard(id, cardData) {
        const findList = fetchList(this.data.lists, id);
        const card = {
            "id": idGenerator(findList.cards),
            "title": cardData.title,
            "description": cardData.description,
            "comments": cardData.comments
        };
        this.data.lists = this.data.lists.map((list) => {
            (list.id === id) ? list.cards.push(card) : list;
            return list;
        });
        setStorage(fetchKey, this.data);     

    }
    editCard(listId, cardId, cardData) {
        const card = {
            "id": cardId,
            "title": cardData.title,
            "description": cardData.description,
            "comments": cardData.comments
        };
        this.data.lists = updateCard(this.data.lists, listId, cardId, card);
        setStorage(fetchKey, this.data);

    }
    deleteCard(listId, cardId) {
        this.data.lists = removeCard(this.data.lists, listId, cardId);
        setStorage(fetchKey, this.data);
    }
    addList(listName) {
        if(this.data.lists.length >= 5) {
            alert('Max column attained!!! You cannot add more columns to board');
            return;
        }
        const list = {
            id: idGenerator(this.data.lists),
            name: listName,
            cards: []
        };
        this.data.lists.push(list);
        
        this.onListChanged(this.data);
        setStorage(fetchKey, this.data);
        
    }

    editList(id, updateText) {
        this.data.lists = updateList(this.data.lists, id, updateText);
        this.onListChanged(this.data);
        setStorage(fetchKey, this.data);
    }
    getList(id) {
        return fetchList(this.data.lists, id); 
    }
    deleteList(id) {
        this.data.lists = removeList(this.data.lists, id);
        setStorage(fetchKey, this.data);        
        this.onListChanged(this.data);
    }
}
