/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
import React, { useState } from "react";

const TermsOfUse = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleContent = () => {
    setIsExpanded(!isExpanded);
  };

  const renderContent = () => {
    if (isExpanded) {
      return (
        <>
          <h2>Réservation et paiement</h2>
          <p>
            Pour réserver un vêtement, vous devez effectuer un paiement en ligne
            via notre plateforme de paiement sécurisée. Le paiement doit être
            effectué intégralement avant la livraison du vêtement.
          </p>

          
          <h2>Durée de location</h2>
          <p>
            La durée de location est déterminée par le type de vêtement que vous
            avez loué et est spécifiée lors de la réservation. Si vous souhaitez
            prolonger la durée de location, vous devez contacter notre service
            clientèle au moins 24 heures avant la fin de la période de location
            initiale.
          </p>

          <h2>Livraison et retour</h2>
          <p>
            Nous livrons les vêtements à l'adresse que vous avez spécifiée lors
            de la réservation. Vous êtes responsable de la réception du vêtement
            à l'adresse de livraison convenue. Vous devez retourner le vêtement
            à notre adresse de retour avant la fin de la période de location
            spécifiée. Si vous ne retournez pas le vêtement à temps, des frais
            supplémentaires seront facturés.
          </p>

          <h2>État du vêtement</h2>
          <p>
            Les vêtements que vous louez sont en bon état et ont été
            soigneusement inspectés avant leur envoi. Vous devez retourner le
            vêtement dans le même état que vous l'avez reçu. Si le vêtement est
            endommagé, déchiré, taché ou malodorant, vous serez facturé pour les
            réparations ou le remplacement du vêtement.
          </p>

          <h2>Annulation de réservation</h2>
          <p>
            Si vous souhaitez annuler une réservation, vous devez nous contacter
            au moins 24 heures avant la date de livraison convenue. Si vous
            annulez une réservation moins de 24 heures avant la date de
            livraison, des frais d'annulation seront facturés.
          </p>

          <h2>Responsabilité</h2>
          <p>
            Nous ne sommes pas responsables des blessures, des pertes ou des
            dommages que vous pourriez subir lors de l'utilisation de nos
            vêtements loués. Vous êtes responsable de l'utilisation et de la
            manipulation appropriées des vêtements.
          </p>

          <h2>Modification des termes et conditions</h2>
          <p>
            Nous nous réservons le droit de modifier ces termes et conditions à
            tout moment. Les modifications prendront effet immédiatement après
            leur publication sur notre site web. Il est de votre responsabilité
            de consulter régulièrement les termes et conditions pour rester
            informé des modifications éventuelles.
          </p>
          <p>
            <a href="#" onClick={toggleContent}>
              Afficher moins ▲
            </a>
          </p>
        </>
      );
    } else {
      return (
        <>
          <p>
            Bienvenue chez notre service de location de vêtements. Nous sommes
            heureux de vous offrir la possibilité de louer des vêtements pour
            une durée déterminée en échange d'un paiement.
          </p>
          <p className="text-dark">
            <b>
              <i className="fa fa-edit" /> En utilisant notre service de
              location de vêtements, vous acceptez les termes et conditions
              suivantes :
            </b>
          </p>
          <p>
            <a href="#" onClick={toggleContent}>
              Afficher plus ▼
            </a>
          </p>
        </>
      );
    }
  };

  return (
    <div className="container">
      <header>
        <h1 className="text-center pt-2">

        </h1>
      </header>
      <div className="content">
        <h2>Introduction</h2>
        {renderContent()}
      </div>
      <footer>
        <p>
          © {new Date().getFullYear()} All Rights Reserved.{" "}
          <i className="fa fa-heart-o" aria-hidden="true" />
          by{""}
          <a href="https://www.ipactconsult.com" target="_blank">
            {""}Ipact consult inc.
          </a>
        </p>
      </footer>
    </div>
  );
};

export default TermsOfUse;
