export class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        // Binding onList Changed in model to keep model and view sync whenever model changes
        this.model.bindOnListChanged(this.onListChanged);
        this.view.bindHandleAppClick(this.handleAppClick); //Event delegation Pattern  
        this.onListChanged(this.model.data); //To set initial data
    }
    onListChanged = (data) => {
        this.view.displayLists(data);
    }
    handleAddList = (listText) => {
        this.model.addList(listText);
    }
    handleEditList = (text, id) => {
        this.model.editList(id, text);
    }
    handleShowModal = (selector) => {
        let el = document.querySelector(selector);
        el.classList.add('show');
    }
    handleHideModal = (selector) => {
        let el = document.querySelector(selector);
        el.classList.remove('show');
    }

    handleAppClick = (ev) => {
        let actionItem = ev.target.id;
        let [action, id] = ev.target.id.split('_');
        id = (id) ? parseInt(id) : null;
        switch (action) {
            case "add-list":
                this.handleShowModal('.modal.list');
                break;
            case "close-add-list":
                this.handleHideModal('.modal.list');
            case "add-list-item":
                this.view.getListValue(this.handleAddList, '#mainList');
                this.handleHideModal('.modal.list');
                break;
            case "delete":
                this.model.deleteList(id);
                break;
            case "edit":
                this.view.bindUpdateListModal(this.model.getList(id));
                this.handleShowModal('.modal.update');
                break;
            case "close-update":
                this.handleHideModal('.modal.update');
                document.querySelector('.modal.list.update').remove();
                break;
            case "update-list":
                this.view.getListValue(this.handleEditList, '#updateList', id);
                this.handleHideModal('.modal.update');
                document.querySelector('.modal.list.update').remove();
                break;
            default:
                return;
        }
    }
}
