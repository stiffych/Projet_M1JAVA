// Installation nécessaire avant d'utiliser ce code:
// npm install @react-pdf/renderer

import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

// Styles pour le PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  section: {
    marginBottom: 10,
  },
  header: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  label: {
    fontWeight: "bold",
  },
});

// Composant pour générer le PDF
const PDFGenerator = ({ data }) => {
  const {
    numero,
    objet,
    date,
    contenu,
    nom_departement_expediteur,
    nom_departement_destinataire,
  } = data;

  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.header}>Détails du Document</Text>

        <View style={styles.section}>
          <Text>
            <Text style={styles.label}>Numéro : </Text>
            {numero}
          </Text>
        </View>

        <View style={styles.section}>
          <Text>
            <Text style={styles.label}>Objet : </Text>
            {objet}
          </Text>
        </View>

        <View style={styles.section}>
          <Text>
            <Text style={styles.label}>Date : </Text>
            {date}
          </Text>
        </View>

        <View style={styles.section}>
          <Text>
            <Text style={styles.label}>Contenu : </Text>
            {contenu}
          </Text>
        </View>

        <View style={styles.section}>
          <Text>
            <Text style={styles.label}>Nom Département (Expéditeur) : </Text>
            {nom_departement_expediteur}
          </Text>
        </View>

        <View style={styles.section}>
          <Text>
            <Text style={styles.label}>Nom Département (Destinataire) : </Text>
            {nom_departement_destinataire}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

const GetPdf = ({ data }) => {
  return (
    <div>
      <PDFDownloadLink
        document={<PDFGenerator data={data} />}
        fileName={`document_${data.numero}.pdf`}
      >
        {({ loading }) =>
          loading ? "Génération du PDF..." : "Télécharger le PDF"
        }
      </PDFDownloadLink>
    </div>
  );
};

export { GetPdf, PDFGenerator };
