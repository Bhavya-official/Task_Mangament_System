import Form from "./Form";

function EditTask({ populate, task }) {
    const hideModal = ()=>{
      window.$(`#b${task._id}`).modal('hide');
      document.getElementsByClassName('modal-backdrop')[0].classList.remove('modal-backdrop', 'show');
    }
    return (
    <div class="modal fade" id={`b${task._id}`} tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-md">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="ModalLabel">Edit Task</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <Form populate={populate} task={task} isUpdate={true} key={task._id} onHide={hideModal}/>
          </div>
        </div>
      </div>
    </div>

    );
}

export default EditTask