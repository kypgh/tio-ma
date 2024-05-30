export const formatDate = (date) => {
  const newDate = new Date(date);
  const options = {
    timeZone: "GMT",
    hour12: false,
    hour: "numeric",
    minute: "numeric",
  };
  const formattedDate = newDate
    .toLocaleDateString("en-US", {
      timeZone: "GMT",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(",", "");
  const formattedTime = newDate.toLocaleTimeString("en-US", options);

  const output = `${formattedDate} ${formattedTime} GMT`;
  return output;
};

export const cookieParse = (cookieString) => {
  let cookieArray = cookieString.split("; ");
  const cookieObject = cookieArray.reduce((a, b) => {
    a[b.split("=")[0]] = b.split("=")[1];
    return { ...a };
  }, {});
  return cookieObject;
};

export const formatArrayForSelect = (array) => {
  if (!array) return [];

  return array.map((el) => {
    if (typeof el === "string" || typeof el === "number") {
      return {
        value: el,
        label: el,
      };
    }
    if (typeof el === "object") {
      return {
        value: el.value,
        label: el.label || el.name || el.value,
      };
    }
    return el;
  });
};

// prettier-ignore
export const CURRENCY_SYMBOLS = Object.freeze({
  USD: "$", EUR: "€", GBP: "£", AUD: "$", CAD: "$", CHF: "Fr", CNY: "¥", DKK: "kr", HKD: "$", INR: "₹", 
  JPY: "¥", KRW: "₩", NZD: "$", PLN: "zł", RUB: "₽", SEK: "kr", SGD: "$", THB: "฿", TRY: "₺", ZAR: "R", 
  BTC:'₿', ETH:'Ξ', USDT:'₮', USDC: "USDC"
});

export const CRYPTO_CURRENCIES = Object.freeze(["BTC", "ETH", "USDT"]);

/**
 *
 * @param {string | number} amount
 * @param {string} currency
 * @returns
 */
export function formatCurrency(amount, currency) {
  try {
    if (!currency) return amount;
    if (isNaN(amount)) return "NaN";
    if (!amount) amount = 0;
    if (CRYPTO_CURRENCIES.includes(currency.toUpperCase())) {
      return `${currency.toUpperCase()} ${parseFloat(amount).toFixed(6)}`;
    }
    return parseFloat(amount).toLocaleString("en", {
      style: "currency",
      currency,
    });
  } catch (err) {
    console.error(err);
    if (isNaN(amount)) return "NaN";
    const symbol = CURRENCY_SYMBOLS[currency] ?? currency;
    return symbol + amount;
  }
}

export function getCurrencyDigits(currency) {
  return CRYPTO_CURRENCIES.includes(currency?.toUpperCase()) ? 6 : 2;
}

export function parseError(err, path) {
  // Check for Joi validation error
  const joiDetail = err?.details?.[0];
  if (joiDetail) {
    return joiDetail.message;
  }

  // Check for HTTP or axios error
  const httpDetail = err?.response?.data;
  if (httpDetail) {
    const httpMessage =
      (httpDetail.details?.[0]?.path?.includes(path) &&
        httpDetail.details?.[0]?.message) ||
      httpDetail.details?.[0]?.message ||
      httpDetail.message;

    return httpMessage || "An HTTP error occurred";
  }

  // Return generic error message
  return err.message || "An error occurred";
}

export const findWithAttr = (array, attr, value) => {
  for (let i = 0; i < array.length; i += 1) {
    if (array[i][attr] === value) {
      return i;
    }
  }
  return -1;
};
