from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Image
from reportlab.lib.styles import getSampleStyleSheet

def generar_pdf(ticket, qr_path, output_path):

    doc = SimpleDocTemplate(output_path)
    styles = getSampleStyleSheet()

    contenido = []

    contenido.append(Paragraph(f"Nombre: {ticket.nombre}", styles["Normal"]))
    contenido.append(Paragraph(f"CURP: {ticket.curp}", styles["Normal"]))
    contenido.append(Paragraph(f"Turno: {ticket.turno}", styles["Normal"]))
    contenido.append(Paragraph(f"Estatus: {ticket.estatus}", styles["Normal"]))

    contenido.append(Image(qr_path, width=100, height=100))

    doc.build(contenido)