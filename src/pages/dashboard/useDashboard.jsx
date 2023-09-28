import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../helpers/Constants";

const useDashboard = () => {
  const initialValues = {
    clients: [],
    pets: [],
    medicaments: [],
    consults: [],
  };
  const [data, setData] = useState(initialValues);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const initialValuesAux = {
        clients: [],
        pets: [],
        medicaments: [],
        consults: [],
      };
      const clients = await axios.get(`${baseUrl}/api/client`);
      const pets = await axios.get(`${baseUrl}/api/pet`);
      const medicaments = await axios.get(`${baseUrl}/api/medicament`);
      const consults = await axios.get(`${baseUrl}/api/consult`);
      if (Array.isArray(clients.data)) {
        initialValuesAux.clients = clients.data;
      }
      if (Array.isArray(pets.data)) {
        initialValuesAux.pets = pets.data;
      }
      if (Array.isArray(medicaments.data)) {
        initialValuesAux.medicaments = medicaments.data;
      }
      if (Array.isArray(consults.data)) {
        initialValuesAux.consults = consults.data;
      }
      setData(initialValuesAux);
    } catch (error) {
      console.log(error);
    }
  };
  return { data };
};

export default useDashboard;
