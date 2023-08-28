import QRCode from "qrcode";
import { createCanvas, loadImage } from "canvas";
import axios from "axios";

const generateQrCode = async (img: any) => {
  try {
    const qrCode = QRCode.toDataURL(img);

    return qrCode;
  } catch (error) {
    console.log(error);
  }
};

export default generateQrCode;
