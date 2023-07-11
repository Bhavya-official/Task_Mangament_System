import Form from "./Form";

function AddTask({ populate }) {
  const hideModal = ()=>{
    window.$(`#modal`).modal('hide');
    document.getElementsByClassName('modal-backdrop')[0].classList.remove('modal-backdrop', 'show');
  }
    return (
    <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-md">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="ModalLabel">Add Task</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <Form populate={populate} task={{}} isUpdate={false} key={Math.random()} onHide={hideModal} />
          </div>
        </div>
      </div>
    </div>

       );
}

export default AddTask