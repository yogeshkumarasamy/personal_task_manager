let data = {
    "board": "Sprint 1",
    "lists": [{
        "id": 1,
        "name": "Backlog Items",
        "cards": []            
    },
    {
        "id": 2,
        "name": "Todo",
        "cards": []            
    },
    {
        "id": 3,
        "name": "In Progress",
        "cards": []            
    },
    {
        "id": 4,
        "name": "Done",
        "cards": []            
    },
    {
        "id": 5,
        "name": "Closed",
        "cards": []            
    }
]
};
const prepareInitData = (data) => {
    return data;
}

export const appInitData = prepareInitData(data);

export const idGenerator = (arr) => {
    const id = (arr.length > 0) ? arr[arr.length - 1].id + 1 : 1;
    return id;
}
export const fetchList = (arr, id) => {
    const fetchedList = arr.find((list) => { return list.id === parseInt(id); });
    return fetchedList;
}
export const updateList = (arr, id, text) => {
    const updatedList = arr.map((list) => {
        (list.id === id) ? list.name = text : list;
        return list;
    });
    return updatedList;
}
export const removeList = (arr, id) => {
    const removedList = arr.filter((list) => {
        return list.id != id;
    });
    return removedList;
}
export const updateCard = (arr, id, cardId, data) => {
    const updatedCard = arr.map((list) => {
        if (list.id === id) {
            list.cards = list.cards.map((card) => {
                if (card.id === cardId) {
                    card = { ...data };
                }
                return card;
            });
        }        
        return list;
    });
    return updatedCard;
}
export const removeCard = (arr, id, cardId) => {
    const removedCard = arr.map((list) => {
        if( list.id === id ) {
            list.cards = list.cards.filter((card) => {
                return card.id != cardId;
            })
        }
        return list;
    });
    return removedCard;
}