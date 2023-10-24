
import { FaUser, FaArchive, FaUsers } from "react-icons/fa";

import {
  MdDashboard,
  MdContacts,
  MdOutlineProductionQuantityLimits,
  MdContactPage,
  MdOutlineCardMembership,
  MdOutlineSettingsApplications,
  MdOutlineSocialDistance,
  MdOutlineInventory,
} from "react-icons/md";
import { MdCategory } from "react-icons/md";
import { RiAdminFill, RiPagesFill } from "react-icons/ri";
import { AiFillCalendar, AiFillShop } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import {GiClothes} from "react-icons/gi";
import {SiCivicrm} from "react-icons/si"
import {BsCardHeading} from "react-icons/bs";
import {FiHelpCircle} from "react-icons/fi";
import {
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
} from "../Images";

export const routes = [
  {
    path: "/admin",
    name: "Dashboard",
    icon: MdDashboard,
  }, 
 
];
export const routesUser=[
  {
    path: "/profile",
    name: "Utilisateurs",
    icon: FaUser,
  },
  {
    path: "/parrain",
    name: "Parrains",
    icon: MdContactPage,
  },
  {
    path: "/contacts",
    name: "Contacts",
    icon: MdContacts,
  },
  {
    path: "/coach",
    name: "Coachs",
    icon: FaUsers,
  },
]
export const routesHabillemnts=[
  {
    path: "/category",
    name: "Catégories",
    icon: BiCategoryAlt,
  },
  {
    path: "/souscategory",
    name: "Sous Catégories",
    icon: MdCategory,
  },
]
export const routesCRM=[
  {
    path: "/banner",
    name: "Entête",
    icon: BsCardHeading,
  },
  {
    path: "/GIF",
    name: "Informations de l’application",
    icon: MdOutlineSettingsApplications,
  },
  {
    path: "/shop",
    name: "Informations de la boutique",
    icon: AiFillShop,
  },
  {
    path: "/infos",
    name: "Fonctionnement de l’application",
    icon: FiHelpCircle,
  },
  // {
  //   path: "/ResSoc",
  //   name: "Réseaux sociaux",
  //   icon: MdOutlineSocialDistance,
  // },
  // {
  //   path: "/footer",
  //   name: "Pieds de page",
  //   icon: RiPagesFill,
  // },
  {
    path: "/ResApropos",
    name: "Pieds de page",
    icon: RiPagesFill,
  },
  
]
export const routesRDV=[
  {
    path: "/rendezvous",
    name: "Rendez-vous",
    icon: AiFillCalendar,
  },
  
]
export const hbAb=[
  {
    path: "/habillement",
    name: "Habillements",
    icon: GiClothes,
  },
  {
    path: "/inventaires",
    name: "Inventaires",
    icon: MdOutlineInventory,
  },
  {
  path: "/abonnements",
  name: "Abonnements",
  icon: MdOutlineCardMembership,
},
]
export const historique=[
  {
    path: "/historiques",
    name: "Historique",
    icon: FaArchive,
  },
]

export const user =
  "https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60";

export const foods = [
  {
    id: 1,
    image: image1,
    name: "cheese burger",
    price: "10",
    details: [
      {
        image: image1,
        desc: "lorem dsndnajdng adnad",
      },
      {
        image: image1,
        desc: "lorem dsndnajdng adnad",
      },
      {
        image: image1,
        desc: "lorem dsndnajdng adnad",
      },
    ],
  },

  {
    id: 2,
    image: image2,
    name: "cheese burger",
    price: "10",
    details: [
      {
        image: image1,
        desc: "lorem dsndnajdng adnad",
      },
      {
        image: image1,
        desc: "lorem dsndnajdng adnad",
      },
      {
        image: image1,
        desc: "lorem dsndnajdng adnad",
      },
    ],
  },
  {
    id: 3,
    image: image3,
    name: "cheese burger",
    price: "10",
    details: [
      {
        image: image1,
        desc: "lorem dsndnajdng adnad",
      },
      {
        image: image1,
        desc: "lorem dsndnajdng adnad",
      },
      {
        image: image1,
        desc: "lorem dsndnajdng adnad",
      },
    ],
  },
  {
    id: 4,
    image: image4,
    name: "cheese burger",
    price: "10",
    details: [
      {
        image: image1,
        desc: "lorem dsndnajdng adnad",
      },
      {
        image: image1,
        desc: "lorem dsndnajdng adnad",
      },
      {
        image: image1,
        desc: "lorem dsndnajdng adnad",
      },
    ],
  },
  {
    id: 5,
    image: image5,
    name: "cheese burger",
    price: "10",
    details: [
      {
        image: image1,
        desc: "lorem dsndnajdng adnad",
      },
      {
        image: image1,
        desc: "lorem dsndnajdng adnad",
      },
      {
        image: image1,
        desc: "lorem dsndnajdng adnad",
      },
    ],
  },
  {
    id: 6,
    image: image6,
    name: "cheese burger",
    price: "10",
    details: [
      {
        image: image1,
        desc: "lorem dsndnajdng adnad",
      },
      {
        image: image1,
        desc: "lorem dsndnajdng adnad",
      },
      {
        image: image1,
        desc: "lorem dsndnajdng adnad",
      },
    ],
  },
  {
    id: 7,
    image: image7,
    name: "cheese burger",
    price: "10",
    details: [
      {
        image: image1,
        desc: "lorem dsndnajdng adnad",
      },
      {
        image: image1,
        desc: "lorem dsndnajdng adnad",
      },
      {
        image: image1,
        desc: "lorem dsndnajdng adnad",
      },
    ],
  },
];
