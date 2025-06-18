import React from "react";
import { Card, Button } from "react-bootstrap";
import "./PetCard.css";
const PetCard = ({ pet }) => {
  const { nombre, edad, sexo, tamanio, descripcion, estado, imagen_url } = pet;

  const estadoConfig = {
    Adoptado: {
      color: "#E2574C",
      icon: "❤️",
    },
    "En Adopción": {
      color: "#F4A525",
      icon: "💛",
    },
  };

  return (
    <Card className="pet-card shadow rounded-4 m-2">
      <div
        className="estado-header d-flex justify-content-between align-items-center px-3 py-3"
        style={{ backgroundColor: estadoConfig[estado]?.color || "#D9B391" }}
      >
        <span>{estadoConfig[estado]?.icon}</span>
        <div className="d-flex align-items-center gap-2">
          <i className="bi bi-heart-fill heart-icon-estado"></i>
          <strong>{estado}</strong>
        </div>
        <span>
          <Button variant="light" className="icon-btn">
          <i className="bi bi-share-fill"></i>
          </Button>
        </span>
      </div>

      <Card.Img variant="top" src={imagen_url} className="pet-img" />

      <Card.Body className="text-center">
        <h5 className="fw-bold">{nombre}</h5>
        <p>
          <strong>Edad:</strong> {edad}
        </p>
        <p>
          <strong>Sexo:</strong> {sexo}
        </p>
        <p>
          <strong>Tamaño:</strong> {tamanio}
        </p>

        <p className="descripcion">
          {descripcion} <span className="text">... más</span>
        </p>

        <div className="d-flex justify-content-around align-items-center gap-3 my-3 flex-wrap">
          <Button variant="light" className="btn-marron" size="sm">
            Adoptar
          </Button>

          <Button variant="light" className="icon-btn">
            <i className="bi bi-suit-heart"></i>
          </Button>

          <Button variant="light" className="icon-btn">
            <i className="bi bi-wechat"></i>
          </Button>

          <Button variant="light" className="icon-btn">
            <i className="bi bi-bookmark"></i>
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PetCard;
