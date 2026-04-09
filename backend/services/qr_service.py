import qrcode

def generar_qr(curp: str, filename: str):
    img = qrcode.make(curp)
    img.save(filename)