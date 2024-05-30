import TripleDes from "crypto-js/tripledes";
import PKCS7Padding from "crypto-js/pad-pkcs7";
import ECB from "crypto-js/mode-ecb";
import encUTF8 from "crypto-js/enc-utf8";
import { DateTime } from "luxon";

export default function handler(req, res) {
  return new Promise((resolve, reject) => {
    const {
      product = "av_ideas",
      userId = "testUser",
      language = "en",
    } = req.body;

    const date = DateTime.now()
      .setZone("Atlantic/Reykjavik")
      .toFormat("yyyyMMddHHmmss");

    const key = "!yws=g^K!3y+q+KSCFR#ez%u";
    const baseURL = "https://site.recognia.com/tiomarkets/serve.shtml?tkn=";

    const requestString = `page=${product}&usi=${userId}&aci=${date}&lang=${language}`;

    const encrypted = TripleDes.encrypt(
      encUTF8.parse(requestString),
      encUTF8.parse(key),
      {
        mode: ECB,
        padding: PKCS7Padding,
      }
    ).toString();

    res.status(200).json({ url: `${baseURL}${encodeURIComponent(encrypted)}` });
  });
}
