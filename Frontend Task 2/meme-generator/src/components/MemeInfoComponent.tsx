interface MemeInfoComponentProps {
  id: string;
  name: string;
  url: string;
}

function MemeInfoComponent({ id, name, url }: MemeInfoComponentProps) {
  const modalId = `modal-${id}`;

  return (
    <div className="col">
      <div className="card shadow-sm h-100">
        <img
          src={url}
          className="card-img-top"
          alt={name}
          style={{ maxHeight: "200px", objectFit: "cover" }}
        />
        <div className="card-body d-flex flex-column justify-content-between">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">ID: {id}</p>

          <div className="buttons">
            {/* Button of modal */}
            <button
              type="button"
              className="btn btn-primary mx-2"
              data-bs-toggle="modal"
              data-bs-target={`#${modalId}`}
              style={{ marginLeft: "0px" }}
            >
              View Full Image
            </button>

            {/* Button of creating meme */}
            <a
              href={`/memecreate/${id}`}
              className="btn btn-primary my-2 mx-2"
              target="_blank"
              style={{ textDecoration: "none", color: "white" }}
            >
              Create Meme
            </a>
          </div>

          {/* Modal */}
          <div
            className="modal fade"
            id={modalId}
            tabIndex={-1}
            aria-labelledby={`${modalId}Label`}
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id={`${modalId}Label`}>
                    Full Image
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <img
                    style={{ maxWidth: "100%", maxHeight: "80vh" }}
                    src={url}
                    alt={name}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemeInfoComponent;
