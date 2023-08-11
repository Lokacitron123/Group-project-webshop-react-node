import "./Contact.css";

const Contact = () => {
  return (
      <div className="contact">
      <h3>Contact</h3>
      <form className="contact__container">
        <div>
          <label>Fullständigt namn</label>
          <input type="text" />
        </div>

        <div>
          <label>E-post</label>
          <input type="email" />
        </div>

        <div>
          <label>Telefonnummer</label>
          <input type="tel" />
        </div>

        <div>
          <label>Meddelande</label>
          <textarea></textarea>
        </div>

        <button>Skicka</button>

      </form>
      </div>
  );
};

export default Contact;
