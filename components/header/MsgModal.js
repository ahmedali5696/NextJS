import Modal from "react-modal";
import ContactForm from "./ContactForm";

Modal.setAppElement("#__next");

export default function MsgModal({ toggle, isOpen }) {

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={toggle}
      contentLabel="msg-modal"
      id="msg-modal"
      className="msg_modal"
      overlayClassName="msg_modal__overlay"
      closeTimeoutMS={200}
      aria-labelledby="show-dialog"
    >
      <button className=" font-bold absolute right-6 top-4" onClick={toggle}>X</button>
      <header className=" text-center">
        <h3 className="mb-4 font-bold text-lg md:text-xl heading-black">Send a Message</h3>
        <p className="mb-4 p-main-style">Let&apos;s get this conversation start. Tell us a bit about your self, and we&apos;ll get in touch as soon as we can.</p>
      </header>

      <ContactForm />
    </Modal>
  );
}