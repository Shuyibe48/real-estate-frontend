import React from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

// TailwindCSS styles for the component
const styles = StyleSheet.create({
  page: {
    padding: 20,
    flexDirection: "column",
    backgroundColor: "#f9fafb",
  },
  section: {
    margin: 10,
    padding: 10,
    border: "1px solid #e5e7eb",
    borderRadius: 5,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "bold",
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
  },
});

const InvoiceDocument = ({ invoiceData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Invoice</Text>
        <Text style={styles.text}>
          Invoice Number: {invoiceData.invoiceNumber}
        </Text>
        <Text style={styles.text}>Date: {invoiceData.date}</Text>
        <Text style={styles.text}>
          Customer Name: {invoiceData.customerName}
        </Text>
        <Text style={styles.text}>Amount: {invoiceData.amount}</Text>
      </View>
    </Page>
  </Document>
);

const InvoiceComponent = ({ invoiceData }) => {
  return (
    <div className="rounded-md shadow-md w-full mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Invoice</h2>
        <p className="text-sm text-gray-600 mb-2">
          <strong>Invoice Number:</strong> {invoiceData.invoiceNumber}
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <strong>Date:</strong> {invoiceData.date}
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <strong>Customer Name:</strong> {invoiceData.customerName}
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <strong>Amount: $</strong>{invoiceData.amount}
        </p>
        <div className="text-center">
          <PDFDownloadLink
            document={<InvoiceDocument invoiceData={invoiceData} />}
            fileName={`invoice_${invoiceData.invoiceNumber}.pdf`}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            {({ loading }) =>
              loading ? "Preparing document..." : "Download Invoice"
            }
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
};

export default InvoiceComponent;
