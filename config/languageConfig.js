import axios from "axios";
import { useState, useEffect } from "react";
import _ from "lodash";

import EN_int from "../lang/lang_en.json";
import MS_int from "../lang/lang_ms.json";
import CZ_int from "../lang/lang_cz.json";
import TH_int from "../lang/lang_th.json";
import AR_int from "../lang/lang_ar.json";
import DE_int from "../lang/lang_de.json";
import EL_int from "../lang/lang_el.json";
import ES_int from "../lang/lang_es.json";
import FR_int from "../lang/lang_fr.json";
import HI_int from "../lang/lang_hi.json";
import HU_int from "../lang/lang_hu.json";
import ID_int from "../lang/lang_id.json";
import IT_int from "../lang/lang_it.json";
import NL_int from "../lang/lang_nl.json";
import PL_int from "../lang/lang_pl.json";
import PT_int from "../lang/lang_pt.json";
import TR_int from "../lang/lang_tr.json";
import VI_int from "../lang/lang_vi.json";
import ZH_HANS_int from "../lang/lang_zh-hans.json";
import ZH_TW_int from "../lang/lang_zh-tw.json";

export const languages = {
  en: EN_int,
  ms: MS_int,
  cz: CZ_int,
  th: TH_int,
  ar: AR_int,
  de: DE_int,
  el: EL_int,
  es: ES_int,
  fr: FR_int,
  hi: HI_int,
  hu: HU_int,
  id: ID_int,
  it: IT_int,
  nl: NL_int,
  pl: PL_int,
  pt: PT_int,
  tr: TR_int,
  vi: VI_int,
  "zh-hans": ZH_HANS_int,
  "zh-tw": ZH_TW_int,
};

export const languagesList = [
  { value: "en", label: "English", flag: "gb" },
  { value: "cz", label: "Česky", flag: "cz" },
  { value: "ms", label: "Malay", flag: "ms" },
  { value: "th", label: "ภาษาไทย", flag: "th" },
  { value: "ar", label: "العربية", flag: "sa" },
  { value: "de", label: "Deutsch", flag: "de" },
  { value: "el", label: "Ελληνικά", flag: "gr" },
  { value: "es", label: "Español", flag: "es" },
  { value: "fr", label: "Français", flag: "fr" },
  { value: "hi", label: "हिन्दी", flag: "in" },
  { value: "hu", label: "Magyar", flag: "hu" },
  { value: "id", label: "Bahasa Indonesia", flag: "id" },
  { value: "it", label: "Italiano", flag: "it" },
  { value: "nl", label: "Nederlands", flag: "nl" },
  { value: "pl", label: "Polski", flag: "pl" },
  { value: "pt", label: "Português", flag: "pt" },
  { value: "tr", label: "Türkçe", flag: "tr" },
  { value: "vi", label: "Tiếng Việt", flag: "vn" },
  { value: "zh-hans", label: "简体中文", flag: "cn" },
  { value: "zh-tw", label: "繁體中文", flag: "tw" },
];

export const localeToFlagMap = languagesList
  .map((el) => ({ [el.value]: el.flag }))
  .reduce((a, b) => ({ ...a, ...b }), {});

const mapObject = (obj, fn) =>
  Object.fromEntries(Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)]));

export const i18n = (langObject, page, targetLocale) => {
  if (_.hasIn(langObject, page)) {
    return _.get(langObject, page);
  }
  if (typeof langObject === "undefined") {
    return mapObject(_.get(languages.en, page), (v, k) => `[missing - ${k}]`);
  }
  return mapObject(_.get(languages.en, page), (v, k) => `[missing - ${k}]`);
};

export const usei18n = (langObject, page, targetLocale) => {
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState("false");

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        setLoading(true);
        await axios({
          method: "post",
          maxBodyLength: Infinity,
          url: "/api/googleTranslate",
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify({
            targetLanguage: targetLocale,
            pageObject: _.get(languages.en, page),
          }),
        }).then((res) => {
          setResult(res.data);
        });
      } catch (error) {
        setLoading(null);
        setResult(mapObject(_.get(languages.en, page), (v, k) => "[missing]"));
      }
    };

    if (!_.hasIn(langObject, page)) {
      fetchTranslations();
    }
  }, [langObject]);
  return [result, loading];
};
