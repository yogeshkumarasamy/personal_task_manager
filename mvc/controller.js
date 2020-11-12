export class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Binding onList Changed in model to keep model and view sync whenever model changes
        this.model.bindOnListChanged(this.onListChanged);

        this.view.bindShowModal(this.handleShowModal, '.header button');
        this.view.bindHideModal(this.handleHideModal, '.modal.list span');
        this.view.bindAddList(this.handleAddList, '.modal.list button');
        this.view.bindListClick(this.handleListClick);


        this.onListChanged(this.model.data); //To set initial data
    }
    onListChanged = (data) => {
        this.view.displayLists(data);
    }
    handleAddList = (listText) => {
        console.log('invoked');
        this.model.addList(listText);        
    }
    handleShowModal = (el) => {
        el.classList.add('show');
    }
    handleHideModal = (el) => {
        el.classList.remove('show');
    }
    handleListClick = (ev) => {
        // this.model.deleteList(ev.target.id);
        let action = ev.target.classList.value;        
        let listId = document.querySelector('#'+ev.target.id).parentElement.parentElement.id;
        if(action === 'deletebtn') {
            this.model.deleteList(listId);
        } else if( action === 'editbtn') {   
            console.log(this.model.getList(listId));
        }       

    }
}
