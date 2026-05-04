import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportToCSV(leads: any[], filename: string) {
  const headers = ["Business Name", "Niche", "Address", "Website", "Phone"];
  const rows = leads.map(l => [
    l.name,
    l.categories[0] || "General",
    l.address,
    l.website || "N/A",
    l.phone || "N/A"
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map(r => r.map(cell => `"${cell}"`).join(","))
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportToPDF(leads: any[], filename: string) {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(22);
  doc.setTextColor(0, 35, 102); // Royal Blue
  doc.text("ProspectFlow Intelligence Dossier", 14, 20);
  
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Generated on ${new Date().toLocaleDateString()}`, 14, 28);

  const tableData = leads.map(l => [
    l.name,
    l.categories[0] || "General",
    l.address,
    l.website || "N/A",
    l.phone || "N/A"
  ]);

  autoTable(doc, {
    head: [["Business Name", "Niche", "Address", "Website", "Phone"]],
    body: tableData,
    startY: 35,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [0, 35, 102] }, // Royal Blue
  });

  doc.save(`${filename}.pdf`);
}
