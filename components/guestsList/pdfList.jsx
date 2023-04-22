"use client";
import { Page, Text, View, Document } from "@react-pdf/renderer";

const PDFList = ({ attend }) => {
  return (
    <Document>
      <Page size="A4" style={{ padding: 100 }}>
        <View style={{ width: "100%"}}>
          <Text style={{ fontSize: 15, textAlign: "center", color:"#b09494", fontWeight: "extrabold"}}>Quince años Giovana</Text>
          <Text style={{ fontSize: 13, fontWeight: "bold"}}>Invitados confirmados:</Text>
          {attend.length > 1 ? (
            <View>
              {attend.map((a) => {
                return (
                  <Text style={{ fontSize: 10}}>
                    {a.lastname} {a.firstname}{" "}
                    {a.amount_guests > 1
                      ? `  -    ( ${a.amount_guests} )`
                      : null}
                  </Text>
                );
              })}
            </View>
          ) : null}
        </View>
      </Page>
    </Document>
  );
};
export default PDFList;