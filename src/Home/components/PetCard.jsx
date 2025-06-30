import { useState, useEffect } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import "./../styles/PetCard.css";
import { useNavigate } from "react-router-dom";
import { useFavoritesStore } from "../../hooks/useFavoritesStore";
import { useAdoptionStore } from "../../hooks/useAdoptionStore";
import { useChatStore } from "../../hooks/useChatStore";

const PetCard = ({ pet }) => {
  const navigate=useNavigate();

  const { favoritos, toggleFavorito, loadFavoritos } = useFavoritesStore();
  const { sendAdoptionRequest } = useAdoptionStore();
  const { mensajesPorMascota, loadMensajes, sendMensaje, isLoading } = useChatStore();
  const mensajes = mensajesPorMascota[pet.id] || [];
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const { nombre, edad, sexo, tamanio, info_adicional, estado, imagen_url } = pet;

  const [showModal, setShowModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false); // para el modal de chat

  useEffect(() => {
    loadFavoritos();
  }, []);

  useEffect(() => {
  if (showChatModal) {
    loadMensajes(pet.id);
  }
}, [showChatModal]);


const isFavorito = favoritos.includes(pet.id);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const estadoConfig = {
    Adoptado: { color: "#E2574C", icon: "❤️" },
    "En Adopción": { color: "#F4A525", icon: "💛" },
  };

  const handleShare = () => {
    const shareData = {
      title: `Conocé a ${nombre}`,
      text: `${nombre} es un/a ${sexo} de ${edad}. Tamaño: ${tamanio}. ${info_adicional}`,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData)
        .then(() => console.log("Compartido con éxito"))
        .catch((err) => console.error("Error al compartir", err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      Swal.fire("Enlace copiado al portapapeles");
    }
  };

  
const handleAdopt = async () => {
  const result = await sendAdoptionRequest(pet.id);

  if (result.ok) {
    Swal.fire({
      icon: "success",
      title: "¡Gracias por adoptar!",
      text: result.msg,
      confirmButtonColor: "#3085d6",
    });
  } else {
    const isAlreadyRequested = result.status === 409;

    Swal.fire({
      icon: "warning",
      title: isAlreadyRequested ? "Ya te postulaste" : "Error",
      text: isAlreadyRequested
        ? `Ya estás postulado para adoptar a ${nombre}.`
        : result.msg,
      confirmButtonColor: "#d33",
    });
  }
};


  const handleFavorite = async() => {
    const state = await toggleFavorito(pet.id);
   if(state && state==201){
      Swal.fire({
        icon: "success",
        title: "Añadido a favoritos",
        text: `${nombre} fue añadido/a a tus favoritos ❤️`,
        confirmButtonColor: "#3085d6",
      })
    }else if(state && state==200){
      Swal.fire({
          icon: "success",
          title: "Eliminado de favoritos",
          text: `${nombre} fue eliminado/a de tus favoritos ❤️`,
          confirmButtonColor: "#3085d6",
        })
    }else{
      Swal.fire({
          icon: "error",
          title: "Error",
          text: `${nombre} no pudo ser añadido/a a tus favoritos`,
          confirmButtonColor: "#3085d6",
      })
    }
  };

  const handleChat = () => {
    setShowChatModal(true);
  };

  const handleCloseChatModal = () => {
    setShowChatModal(false);
  };

  const handleEnviarMensaje = async () => {
  if (!nuevoMensaje.trim()) return;
  await sendMensaje(pet.id, nuevoMensaje);
  setNuevoMensaje("");
};

  return (
    <Card className="pet-card shadow rounded-4 m-2">
      <div
        className="estado-header d-flex justify-content-between align-items-center px-3 py-3"
        style={{ backgroundColor: estadoConfig[estado]?.color || "#D9B391" }}
      >
        <span>{estadoConfig[estado]?.icon}</span>
        <div className="d-flex align-items-center gap-2">
          <i className="bi bi-heart-fill heart-icon-estado"
            style={{ color: estado === "Adoptado" ? "#E2574C" : "#F4A525" }}></i>
          <strong>{estado}</strong>
        </div>
        <span>
          <Button variant="light" className="icon-btn" onClick={handleShare}>
            <i className="bi bi-share-fill"></i>
          </Button>
        </span>
      </div>

      <Card.Img variant="top" src={imagen_url} className="pet-img" />

      <Card.Body className="text-center">
        <h5 className="fw-bold">{nombre}</h5>
        <p><strong>Edad:</strong> {edad}</p>
        <p><strong>Sexo:</strong> {sexo}</p>
        <p><strong>Tamaño:</strong> {tamanio}</p>

        <p className="info_adicional text-muted small">
          {info_adicional?.slice(0, 10)}...
          <span className="ver-mas" onClick={handleShow}>Ver más</span>
        </p>

        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{nombre}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <img src={imagen_url} alt={nombre} className="img-fluid rounded mb-3" />
            <p><strong>Edad:</strong> {edad}</p>
            <p><strong>Sexo:</strong> {sexo}</p>
            <p><strong>Tamaño:</strong> {tamanio}</p>
            <p><strong>Descripción:</strong> {info_adicional}</p>
            <Button className="icon-btn" onClick={handleShare}>
              <i className="bi bi-share-fill me-2"></i>Compartir
            </Button>
          </Modal.Body>
        </Modal>

      <Modal show={showChatModal} onHide={handleCloseChatModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Chat sobre {nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            {isLoading ? (
              <p>Cargando mensajes...</p>
            ) : mensajes.length === 0 ? (
              <p>No hay mensajes aún.</p>
            ) : (
              mensajes.map((msg, idx) => (
                <div key={idx}>
                  <strong>{msg.autor}</strong>: {msg.mensaje}
                  <br />
                  <small className="text-muted">{new Date(msg.fecha).toLocaleString()}</small>
                  <hr />
                </div>
              ))
            )}
          </div>

          <div className="d-flex mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Escribí tu mensaje..."
              value={nuevoMensaje}
              onChange={(e) => setNuevoMensaje(e.target.value)}
            />
            <Button variant="primary" onClick={handleEnviarMensaje} className="ms-2">
              Enviar
            </Button>
          </div>
        </Modal.Body>
      </Modal>


        <div className="d-flex justify-content-around align-items-center gap-3 my-3 flex-wrap">
          <Button variant="light" className="btn-marron" size="sm" onClick={handleAdopt}>
            Adoptar
          </Button>

          <Button variant="light" className="icon-btn" onClick={handleChat}>
            <i className="bi bi-wechat"></i>
          </Button>

          <Button variant="light" className="icon-btn" onClick={handleFavorite}>
            <i
              className="bi bi-suit-heart-fill"
              style={{ color: isFavorito ? "red" : "gray" }}
            ></i>
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PetCard;
