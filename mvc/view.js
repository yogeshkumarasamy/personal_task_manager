export class View {
    constructor() {
        this.container = this.getElement('#root');

        this.appHeader = this.createNode({ 'element': 'header', 'class': ['header'] },
            [
                { 'element': 'h1', 'text': 'Sprint 1' },
                { 'element': 'button', 'text': 'Add List',  'id': 'add-list' }
            ]);

        this.listModal = this.createNode({ 'element': 'div', 'class': ['modal', 'list'], 'subElement': 'form', 'subContainer': true },
            [
                { 'element': 'label', 'text': 'Create List' },
                { 'element': 'input', 'text': null, 'id': 'mainList', 'type': 'text', 'placeholder': '', 'value':'' },
                { 'element': 'button', 'text': 'Add', 'id': 'add-list-item' },
                { 'element': 'span', 'text': 'X', 'id': 'close-add-list' }
            ]   
        );
        this.cardModal = this.createNode({ 'element': 'div', 'class': ['modal', 'card'], 'subElement': 'form', 'subContainer': true },
            [
                { 'element': 'input', 'text': null, 'id': 'desc', 'type': 'text', 'placeholder': 'card description' },
                { 'element': 'button', 'text': 'Delete Card' },
                { 'element': 'textarea', 'text': null },
                { 'element': 'button', 'text': 'Add Comment' },
                { 'element': 'p', 'text': 'Comment Text 10 Aug 2015' }
            ]);

        this.listDisplay = this.createNode({ 'element': 'section', 'class': ['list-container'] }, null);

        this.container.append(this.appHeader, this.listModal, this.cardModal, this.listDisplay);

        // List Area
    }

    createNode(parent, children) {
        let container = this.createElement(parent.element);
        let subContainer = (parent.subContainer) ? this.createElement(parent.subElement) : false;
        if (subContainer && parent.subClass) {
            subContainer.classList.add(...parent.subClass);
        }
        container.classList.add(...parent.class);
        if (children) {
            children.forEach((child) => {
                if (child.element != "input") {
                    let el = this.createElement(child.element);
                    if (child.text) {
                        el.textContent = child.text;
                    }
                    if (child.class) {
                        el.classList.add(child.class);
                    }
                    if(child.id) {
                        el.id = child.id;
                    }
                    if (!subContainer) {
                        container.append(el);
                    } else {
                        subContainer.append(el);
                    }
                } else {
                    let el = this.createElement(child.element);
                    el.type = child.type;
                    el.value = child.value;
                    el.placeholder = child.placeholder;
                    el.id = child.id;
                    if (!subContainer) {
                        container.append(el);
                    } else {
                        subContainer.append(el);
                    }
                }
            })
        }
        if (subContainer) {
            container.append(subContainer);
        }
        console.log(container);
        return container;
    }

    // createElementWithContent
    createElementWithText(element, text, cls) {
        let el = this.createElement(element);
        el.textContent = text;
        if (cls) {
            el.classList.add(cls);
        }
        return el;
    }

    // Create an element with an optional CSS class
    createElement(tag, className) {
        const element = document.createElement(tag);
        if (className) element.classList.add(className);
        return element
    }

    // Retrieve an element from the DOM
    getElement(selector) {
        const element = document.querySelector(selector);
        return element;
    }

    displayLists(data) {
        // Remove noRecord div if record present
        if (this.listDisplay.firstChild) {
            this.listDisplay.removeChild(this.listDisplay.firstChild);
        }
        if (data.lists.length === 0) {
            let noRecord = this.createElementWithText('div', 'No Lists Present in App!!! Try Add lists !!!', 'no-list');
            this.listDisplay.append(noRecord);
        } else {
            this.listDisplay.innerHTML = '';
            data.lists.forEach((rec) => {
                let listCol = this.createElement('div', 'list');                
                listCol.id = `list-${rec.id}`;
                let listHeader = this.createElement('div', 'list-header');
                let deleteButton = this.createElement('button', 'deletebtn');
                deleteButton.id = `delete_${rec.id}`;
                deleteButton.textContent = 'Delete';
                let h2 = this.createElementWithText('h2', rec.name);                
                let span = this.createElement('span');
                span.textContent = 'Edit';
                span.id=`edit_${rec.id}`;
                span.classList.add('editbtn');
                listHeader.append(h2, span, deleteButton);
                let cards = this.createElement('div', 'cards');
                let addCardsBtn = this.createElement('button', 'cards-add');
                addCardsBtn.textContent = 'Add Cards';
                addCardsBtn.id = `add-cards_${rec.id}`;
                cards.append(addCardsBtn);
                listCol.append(listHeader, cards);                
                this.listDisplay.append(listCol);
            })
        }
    }

    getListValue(handler, selector, id) {
        let listValue = this.getElement(selector);
        if (listValue.value) {
            handler(listValue.value, id);
            listValue.value = '';
            document.querySelector('.modal.list').classList.remove('show');
        }                
    }       
    bindUpdateListModal(value) {
        this.updateListModal = this.createNode({ 'element': 'div', 'class': ['modal', 'list', 'update'], 'subElement': 'form', 'subContainer': true },
            [
                { 'element': 'label', 'text': 'Update List' },
                { 'element': 'input', 'text': null, 'id': 'updateList', 'type': 'text', 'placeholder': '', 'value': value.name },
                { 'element': 'button', 'text': 'Update', 'id': `update-list_${value.id}` },
                { 'element': 'span', 'text': 'X', 'id': 'close-update' }
            ]
        );
        this.container.append(this.updateListModal);
    }
    bindHandleAppClick(handler) {
        document.addEventListener('click', function(e){
            handler(e);
         });
    }
}


