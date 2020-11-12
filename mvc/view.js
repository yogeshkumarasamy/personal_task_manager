export class View {
    constructor() {
        this.container = this.getElement('#root');

        this.appHeader = this.createNode({ 'element': 'header', 'class': ['header'] },
            [
                { 'element': 'h1', 'text': 'Sprint 1' },
                { 'element': 'button', 'text': 'Add List' }
            ]);

        this.listModal = this.createNode({ 'element': 'div', 'class': ['modal', 'list'], 'subElement': 'form', 'subContainer': true },
            [
                { 'element': 'label', 'text': 'Create List' },
                { 'element': 'input', 'text': null, 'id': 'mainList', 'type': 'text', 'placeholder': '' },
                { 'element': 'button', 'text': 'Add' },
                { 'element': 'span', 'text': 'X' }
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
                    if (!subContainer) {
                        container.append(el);
                    } else {
                        subContainer.append(el);
                    }
                } else {
                    let el = this.createElement(child.element);
                    el.type = child.type;
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
            let noRecord = this.createElementWithText('div', 'No Lists to show', 'no-list');
            this.listDisplay.append(noRecord);
        } else {
            this.listDisplay.innerHTML = '';
            data.lists.forEach((rec) => {
                let listCol = this.createElement('div', 'list');                
                listCol.id = rec.id;
                let listHeader = this.createElement('div', 'list-header');
                let deleteButton = this.createElement('button', 'deletebtn');
                deleteButton.id = `delete${rec.id}`;
                deleteButton.textContent = 'Delete';
                let h2 = this.createElementWithText('h2', rec.name);                
                let span = this.createElement('span');
                span.textContent = 'Edit';
                span.id=`edit${rec.id}`;
                span.classList.add('editbtn');
                listHeader.append(h2, span, deleteButton);
                let cards = this.createElement('div', 'cards');
                let addCardsBtn = this.createElement('button', 'cards-add');
                addCardsBtn.textContent = 'Add Cards';
                addCardsBtn.id = `add-cards-${rec.id}`;
                cards.append(addCardsBtn);
                listCol.append(listHeader, cards);                
                this.listDisplay.append(listCol);
            })
        }
    }

    bindAddList(handler, selector) {
        document.querySelector(selector).addEventListener('click', event => {
        console.log('triggering modal click');
            event.preventDefault();
            let listValue = this.getElement('#mainList');
            console.log(listValue.value);
            if (listValue.value) {
                handler(listValue.value);
                listValue.value = '';
                document.querySelector('.modal.list').classList.remove('show');
            }
        })
    }

    bindShowModal(handler, selector) {
        document.querySelector(selector).addEventListener('click', event => {
            let listModal = this.getElement('.modal.list');
            handler(listModal);
        })
    }
    bindHideModal(handler, selector) {
        document.querySelector(selector).addEventListener('click', event => {
            let listModal = this.getElement('.modal.list');
            handler(listModal);
        })
    }
    bindListClick(handler) {
        document.querySelector('.list-container').addEventListener('click', event => {
            handler(event);
        })
    }
}


